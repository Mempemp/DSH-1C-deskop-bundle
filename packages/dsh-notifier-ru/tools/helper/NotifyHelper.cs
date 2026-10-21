// dsh-notify-helper — нативный helper уведомлений DSH (замена toast.ps1 + goto.ps1).
//
// Зачем: powershell.exe — console subsystem (вспышка окна при клике по тосту),
// холодный старт 0.5–2 с и первый кандидат на блокировку AppLocker/WDAC в корп.
// сетях. Этот exe — GUI subsystem (окна нет никогда), старт мгновенный, зависит
// только от .NET Framework 4.5+ (System.Runtime.WindowsRuntime — часть фреймворка).
//
// Режимы:
//   dsh-notify-helper.exe toast --payload <base64(UTF-8 JSON {title,message,silent,session})>
//   dsh-notify-helper.exe toast --title "..." --message "..." [--silent] [--session <id>]
//   dsh-notify-helper.exe goto --url "dsh-notify://goto/<sessionId>"
//
// toast: регистрирует AUMID и протокол dsh-notify:// на себя, показывает WinRT
// тост с launch="dsh-notify://goto/<session>" (или dsh://open без сессии),
// activationType="protocol" — как toast.ps1, только без PowerShell.
// goto: дёргает GET <apiBase>/api/dsh-notifier/goto?session=<id> (apiBase из
// runtime.json, который host переписывает при каждом старте), затем открывает
// dsh://open для подъёма окна. Все сбои молчаливы: вызывает тост, некому
// показать ошибку.
//
// WinRT зовётся через reflection (как это делает PowerShell 5.1): SDK-шного
// Windows.winmd на машине пользователя нет, а проекция WinRT в desktop CLR
// доступна по имени типа "ContentType=WindowsRuntime" без доп. сборок.
//
// Сборка (tools/helper/build.ps1 делает ровно это):
//   csc.exe /nologo /target:winexe /optimize+ /out:dsh-notify-helper.exe
//     /r:<facade>\System.Runtime.WindowsRuntime.dll NotifyHelper.cs

using System;
using System.IO;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;

internal static class NotifyHelper
{
    private const string AppId = "DSH.dsh-notifier";
    private const string ProtocolScheme = "dsh-notify";

    [STAThread]
    private static int Main(string[] args)
    {
        if (args.Length == 0)
            return 1;
        try
        {
            switch (args[0])
            {
                case "toast": return RunToast(ParseOptions(args));
                case "goto": return RunGoto(ParseOptions(args));
                default: return 1;
            }
        }
        catch (Exception error)
        {
            // Helper вызывается из тоста/хоста — ошибку некому показать.
            // Диагностика: DSH_NOTIFY_HELPER_LOG=<файл> включает запись сбоя.
            Log(error);
            return 1;
        }
    }

    private static void Log(Exception error)
    {
        try
        {
            string file = Environment.GetEnvironmentVariable("DSH_NOTIFY_HELPER_LOG");
            if (string.IsNullOrEmpty(file))
                return;
            File.AppendAllText(file, DateTime.Now.ToString("s") + " " + error + Environment.NewLine, Encoding.UTF8);
        }
        catch { }
    }

    private static System.Collections.Generic.Dictionary<string, string> ParseOptions(string[] args)
    {
        var map = new System.Collections.Generic.Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        for (int i = 1; i < args.Length; i++)
        {
            string a = args[i];
            if (!a.StartsWith("--", StringComparison.Ordinal))
                continue;
            string key = a.Substring(2);
            if (i + 1 < args.Length && !args[i + 1].StartsWith("--", StringComparison.Ordinal))
                map[key] = args[++i];
            else
                map[key] = "true";
        }
        return map;
    }

    // ── toast ────────────────────────────────────────────────────────────────

    private static int RunToast(System.Collections.Generic.Dictionary<string, string> opt)
    {
        string title = "", message = "", session = "";
        bool silent = false;

        string payload;
        if (opt.TryGetValue("payload", out payload))
        {
            // Тот же контракт, что у toast.ps1: один base64-токен, JSON внутри.
            string json = Encoding.UTF8.GetString(Convert.FromBase64String(payload));
            title = JsonString(json, "title");
            message = JsonString(json, "message");
            session = JsonString(json, "session");
            silent = Regex.IsMatch(json, "\"silent\"\\s*:\\s*true");
        }
        else
        {
            opt.TryGetValue("title", out title);
            opt.TryGetValue("message", out message);
            opt.TryGetValue("session", out session);
            silent = opt.ContainsKey("silent");
        }

        RegisterAppId();
        RegisterProtocol();

        string launch = session.Length > 0
            ? ProtocolScheme + "://goto/" + session
            : "dsh://open";

        ShowToast(title ?? "", message ?? "", launch, silent);
        return 0;
    }

    private static void ShowToast(string title, string message, string launch, bool silent)
    {
        Type managerType = WinRtType("Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications");
        Type templateEnum = WinRtType("Windows.UI.Notifications.ToastTemplateType, Windows.UI.Notifications");
        Type toastType = WinRtType("Windows.UI.Notifications.ToastNotification, Windows.UI.Notifications");

        object templateType = Enum.Parse(templateEnum, "ToastText02");
        object template = managerType.GetMethod("GetTemplateContent", BindingFlags.Public | BindingFlags.Static)
            .Invoke(null, new[] { templateType });

        object documentElement = GetProp(template, "DocumentElement");
        Call(documentElement, "SetAttribute", "launch", launch);
        Call(documentElement, "SetAttribute", "activationType", "protocol");

        object texts = Call(template, "GetElementsByTagName", "text");
        SetText(texts, 0, title);
        SetText(texts, 1, message);

        if (silent)
        {
            object audio = Call(template, "CreateElement", "audio");
            Call(audio, "SetAttribute", "silent", "true");
            Call(documentElement, "AppendChild", audio);
        }

        object toast = Activator.CreateInstance(toastType, template);
        object notifier = managerType
            .GetMethod("CreateToastNotifier", BindingFlags.Public | BindingFlags.Static, null, new[] { typeof(string) }, null)
            .Invoke(null, new object[] { AppId });
        Call(notifier, "Show", toast);
    }

    private static void SetText(object nodeList, uint index, string value)
    {
        // WinRT-проекция в desktop CLR экспонирует индексатор как метод Item(uint),
        // а не как get_Item — проверено на живом XmlNodeList.
        var indexer = nodeList.GetType().GetMethod("Item") ?? nodeList.GetType().GetMethod("get_Item");
        object node = indexer.Invoke(nodeList, new object[] { index });
        object template = GetProp(node, "OwnerDocument");
        object textNode = Call(template, "CreateTextNode", value);
        Call(node, "AppendChild", textNode);
    }

    // ── goto ─────────────────────────────────────────────────────────────────

    private static int RunGoto(System.Collections.Generic.Dictionary<string, string> opt)
    {
        string url;
        if (!opt.TryGetValue("url", out url))
            return 1;
        var m = Regex.Match(url, "^dsh-notify://goto/([A-Za-z0-9\\-]+)");
        if (!m.Success)
            return 1;
        string session = m.Groups[1].Value;

        // runtime.json пишет host при каждом старте — читаем фактический apiBase.
        string dshHome = Environment.GetEnvironmentVariable("DSH_HOME");
        if (string.IsNullOrEmpty(dshHome))
            dshHome = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), ".dsh");
        string runtimeFile = Path.Combine(dshHome, "dsh-notifier-ru", "runtime.json");
        string apiBase = null;
        try
        {
            string json = File.ReadAllText(runtimeFile, Encoding.UTF8);
            apiBase = JsonString(json, "apiBase");
        }
        catch { /* нет runtime — окно всё равно поднимем */ }

        if (!string.IsNullOrEmpty(apiBase))
        {
            try
            {
                var request = (System.Net.HttpWebRequest)System.Net.WebRequest.Create(
                    apiBase + "/api/dsh-notifier/goto?session=" + Uri.EscapeDataString(session));
                request.Method = "GET";
                request.Timeout = 5000;
                using (request.GetResponse()) { }
            }
            catch { /* host недоступен — просто поднимаем окно */ }
        }

        try
        {
            System.Diagnostics.Process.Start("dsh://open");
        }
        catch { /* протокол dsh:// не зарегистрирован — больше сделать нечего */ }
        return 0;
    }

    // ── регистрация ─────────────────────────────────────────────────────────

    private static void RegisterAppId()
    {
        try
        {
            using (var key = Microsoft.Win32.Registry.CurrentUser.CreateSubKey(
                @"SOFTWARE\Classes\AppUserModelId\" + AppId))
            {
                if (key != null)
                    key.SetValue("DisplayName", "DSH", Microsoft.Win32.RegistryValueKind.String);
            }
        }
        catch { /* реестр недоступен — тост всё равно пробуем показать */ }
    }

    private static void RegisterProtocol()
    {
        try
        {
            string exe = Assembly.GetExecutingAssembly().Location;
            using (var key = Microsoft.Win32.Registry.CurrentUser.CreateSubKey(
                @"SOFTWARE\Classes\" + ProtocolScheme))
            {
                if (key != null)
                    key.SetValue("URL Protocol", "", Microsoft.Win32.RegistryValueKind.String);
            }
            using (var command = Microsoft.Win32.Registry.CurrentUser.CreateSubKey(
                @"SOFTWARE\Classes\" + ProtocolScheme + @"\shell\open\command"))
            {
                if (command != null)
                    command.SetValue("", "\"" + exe + "\" goto --url \"%1\"", Microsoft.Win32.RegistryValueKind.String);
            }
        }
        catch { /* не зарегистрировалось — клик по тосту просто не сработает */ }
    }

    // ── утилиты ─────────────────────────────────────────────────────────────

    private static Type WinRtType(string name)
    {
        return Type.GetType(name + ", ContentType=WindowsRuntime", true);
    }

    private static object GetProp(object target, string name)
    {
        return target.GetType().GetProperty(name).GetValue(target, null);
    }

    private static object Call(object target, string method, params object[] args)
    {
        return target.GetType().GetMethod(method).Invoke(target, args);
    }

    // Минимальный разбор своего же JSON (payload пишет наш host): поля простые,
    // внешних зависимостей ради Json.NET не тащим.
    private static string JsonString(string json, string name)
    {
        var m = Regex.Match(json, "\"" + name + "\"\\s*:\\s*\"((?:[^\"\\\\]|\\\\.)*)\"");
        if (!m.Success)
            return "";
        return Regex.Replace(m.Groups[1].Value, "\\\\(u[0-9a-fA-F]{4}|.)", match =>
        {
            string esc = match.Groups[1].Value;
            if (esc.StartsWith("u", StringComparison.Ordinal))
                return ((char)Convert.ToInt32(esc.Substring(1), 16)).ToString();
            switch (esc)
            {
                case "n": return "\n";
                case "r": return "\r";
                case "t": return "\t";
                default: return esc;
            }
        });
    }
}
