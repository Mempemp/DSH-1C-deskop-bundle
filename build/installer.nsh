!ifndef BUILD_UNINSTALLER
  !ifndef ONE_CLICK
    !include "LogicLib.nsh"
    !include "nsDialogs.nsh"
    !include "WinMessages.nsh"
    !include "installer-catalog-labels.nsh"

    Var DshWelcomePage
    Var DshDirectoryEdit
    Var DshCatalogList
    Var DshLogoImage
    Var DshExistingInstall
    Var DshDirectoryNormalizationActive
    Var DshUserInstDir

    !macro customInstallMode
      StrCpy $isForceCurrentInstall "1"
      StrCpy $isForceMachineInstall "0"
    !macroend

    !macro customWelcomePage
      Page custom DshWelcomeCreate DshWelcomeLeave
    !macroend

    Function DshHideBackShowInstall
      GetDlgItem $0 $HWNDPARENT 3
      EnableWindow $0 0
      ShowWindow $0 ${SW_HIDE}
      GetDlgItem $0 $HWNDPARENT 1
      ${If} $DshExistingInstall == "1"
        SendMessage $0 ${WM_SETTEXT} 0 "STR:Update"
      ${Else}
        SendMessage $0 ${WM_SETTEXT} 0 "STR:Install"
      ${EndIf}
    FunctionEnd

    Function DshDetectExistingInstall
      StrCpy $DshExistingInstall "0"
      IfFileExists "$INSTDIR\${APP_FILENAME}.exe" 0 +2
        StrCpy $DshExistingInstall "1"
    FunctionEnd

    Function DshNormalizeDriveRoot
      ${If} $DshDirectoryNormalizationActive == "1"
        Return
      ${EndIf}

      ${NSD_GetText} $DshDirectoryEdit $0
      StrLen $1 $0

      ; Accept both forms produced by typing or the Windows folder picker:
      ; "D:" and "D:\". Any non-root directory is left untouched.
      ${If} $1 == 2
        StrCpy $2 $0 1 1
        ${If} $2 != ":"
          Return
        ${EndIf}
        StrCpy $3 "$0\${APP_FILENAME}"
      ${ElseIf} $1 == 3
        StrCpy $2 $0 1 1
        ${If} $2 != ":"
          Return
        ${EndIf}
        StrCpy $2 $0 1 2
        ${If} $2 != "\"
          Return
        ${EndIf}
        StrCpy $3 "$0${APP_FILENAME}"
      ${Else}
        Return
      ${EndIf}

      StrCpy $DshDirectoryNormalizationActive "1"
      StrCpy $INSTDIR $3
      ${NSD_SetText} $DshDirectoryEdit $3
      StrCpy $DshDirectoryNormalizationActive "0"
    FunctionEnd

    Function DshDirectoryChanged
      Pop $0
      Call DshNormalizeDriveRoot
      Call DshDetectExistingInstall
      Call DshHideBackShowInstall
    FunctionEnd

    Function DshBrowseDirectory
      nsDialogs::SelectFolderDialog "Select installation folder" $INSTDIR
      Pop $0
      ${If} $0 != "error"
        ${NSD_SetText} $DshDirectoryEdit $0
        Call DshNormalizeDriveRoot
        Call DshDetectExistingInstall
        Call DshHideBackShowInstall
      ${EndIf}
    FunctionEnd

    Function DshWelcomeCreate
      nsDialogs::Create 1018
      Pop $DshWelcomePage

      InitPluginsDir
      File "/oname=$PLUGINSDIR\installer-logo.bmp" "${BUILD_RESOURCES_DIR}\installer-logo.bmp"

      ${If} $INSTDIR == ""
        StrCpy $INSTDIR "$LOCALAPPDATA\Programs\${PRODUCT_FILENAME}"
      ${EndIf}

      Call DshDetectExistingInstall

      ${NSD_CreateBitmap} 0u 0u 36u 20u
      Pop $0
      ${NSD_SetImage} $0 "$PLUGINSDIR\installer-logo.bmp" $DshLogoImage

      ${If} $DshExistingInstall == "1"
        ${NSD_CreateLabel} 40u 2u 240u 16u "Update DSH Desktop"
      ${Else}
        ${NSD_CreateLabel} 40u 2u 240u 16u "DSH Desktop"
      ${EndIf}
      Pop $0
      CreateFont $1 "Segoe UI" 12 600
      SendMessage $0 ${WM_SETFONT} $1 0

      ${NSD_CreateLabel} 0u 24u 280u 12u "Installation folder"
      Pop $0

      ${NSD_CreateText} 0u 38u 220u 12u "$INSTDIR"
      Pop $DshDirectoryEdit
      ${NSD_OnChange} $DshDirectoryEdit DshDirectoryChanged

      ${NSD_CreateButton} 226u 36u 54u 14u "Browse..."
      Pop $0
      ${NSD_OnClick} $0 DshBrowseDirectory

      ${If} $DshExistingInstall == "1"
        ${NSD_CreateLabel} 0u 58u 280u 10u "This update replaces the app and bundled plugins:"
      ${Else}
        ${NSD_CreateLabel} 0u 58u 280u 10u "This installation includes:"
      ${EndIf}
      Pop $0

      ${NSD_CreateListBox} 0u 70u 280u 56u ""
      Pop $DshCatalogList
      !insertmacro DshFillCatalogList $DshCatalogList

      Call DshNormalizeDriveRoot
      Call DshHideBackShowInstall

      nsDialogs::Show

      ${NSD_FreeImage} $DshLogoImage
    FunctionEnd

    Function DshWelcomeLeave
      ${NSD_GetText} $DshDirectoryEdit $INSTDIR
      Call DshNormalizeDriveRoot
      ${NSD_GetText} $DshDirectoryEdit $INSTDIR
      StrCpy $DshUserInstDir $INSTDIR
      Call DshDetectExistingInstall
      ${If} $DshExistingInstall == "1"
        nsExec::ExecToLog '"$SYSDIR\taskkill.exe" /F /IM "${APP_FILENAME}.exe"'
      ${EndIf}
      CreateDirectory "$INSTDIR"
    FunctionEnd

    ; electron-builder's hidden PAGE_INSTALL_MODE calls setInstallModePerUser,
    ; which overwrites $INSTDIR with %LocalAppData%\Programs (or the last
    ; HKCU InstallLocation). Restore the folder from the wizard before files copy.
    !macro customPageAfterChangeDir
      Page custom DshApplyChosenDirectory
    !macroend

    Function DshApplyChosenDirectory
      ${If} $DshUserInstDir != ""
        StrCpy $INSTDIR $DshUserInstDir
      ${EndIf}
      Abort
    FunctionEnd

    ; Accept any directory path the user types, even if it does not exist yet.
    !macro preInit
    !macroend
    Function .onVerifyInstDir
      ; Always pass — we create the directory in DshWelcomeLeave.
    FunctionEnd

  !endif

  ; A single customInstall macro: electron-builder inserts it once, so defining
  ; it twice (once per branch) would not compile.
  ;
  ; Enable Win32 long paths (260+ char limit bypass) on Windows 10/11
  ; to avoid ENOENT errors on deeply nested workspace or plugin paths.
  ;
  ; Add Windows Defender exclusions for the install and data directories.
  ; Without this, Defender scans every one of the ~44,000 JS/Node files on
  ; first launch, which can take 60–120 s on some machines before the Harness
  ; becomes ready. Adding the paths here means new files extracted during
  ; install are already covered before the user ever double-clicks the app.
  ;
  ; PowerShell is always present on Windows 10/11. -ErrorAction SilentlyContinue
  ; means a non-elevated install (where the Defender API requires admin) fails
  ; silently rather than aborting — the app still runs, just with the first-
  ; launch scan. Re-running the installer as admin adds the exclusions.
  ;
  ; Profile data lives in %APPDATA%, not $INSTDIR. Drop the catalog stamp so
  ; the next launch force-applies bundled plugins/skills/MCP even when the
  ; user had a newer market version of a catalog plugin.
  !macro customInstall
    WriteRegDWORD HKLM "SYSTEM\CurrentControlSet\Control\FileSystem" "LongPathsEnabled" 1
    ; Direct attempt (succeeds if installer was executed as Administrator)
    nsExec::ExecToLog 'powershell.exe -NonInteractive -NoProfile -ExecutionPolicy Bypass -Command "Add-MpPreference -ExclusionPath \"$INSTDIR\" -ErrorAction SilentlyContinue; Add-MpPreference -ExclusionPath \"$APPDATA\dsh-desktop\" -ErrorAction SilentlyContinue"'
    ; When running non-elevated (default user install), invoke elevated PowerShell via runas to apply Defender exclusions and enable LongPaths in HKLM.
    ; If UAC is accepted, Defender exclusion takes effect and avoids scanning 20,000+ files on first launch.
    ${IfNot} ${Silent}
      ExecShell "runas" 'powershell.exe' '-NonInteractive -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -Command "Add-MpPreference -ExclusionPath \"$INSTDIR\" -ErrorAction SilentlyContinue; Add-MpPreference -ExclusionPath \"$APPDATA\dsh-desktop\" -ErrorAction SilentlyContinue; Set-ItemProperty -Path \"HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem\" -Name \"LongPathsEnabled\" -Value 1 -ErrorAction SilentlyContinue"'
    ${EndIf}
    ; CHECK_APP_RUNNING force-kills the previous process, so will-quit never
    ; clears the session marker. Same-version overwrite would otherwise look
    ; like an unclean-exit. Delete is a no-op when the file is absent.
    Delete "$APPDATA\dsh-desktop\desktop-service\session.json"
    Delete "$APPDATA\dsh-desktop\harness\.desktop-catalog-applied"
    Delete "$APPDATA\dsh-desktop-dev\harness\.desktop-catalog-applied"
  !macroend
!endif
