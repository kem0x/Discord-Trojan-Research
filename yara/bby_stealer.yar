rule bby_stealer
{
	meta:
		description = "Rule for bby stealer (after installed on system)"
		author = "lockness-Ko"
	strings:
		$get_token_script = "getTokenScript = '"
		$token_script_webpack = "window.webpackJsonp?"
		$token_script_gg = "delete gg"
		
		$injector_discord_path = "discordPath = join(dirname(require.main.filename), '..', 'app.asar'),"
		$injector_exec_javascript = "windows.webContents.executeJavaScript"
		
		$stealer_credit_cards = "let creditbro"
		$stealer_credit_cards_db = "creditcards.db"
		$stealer_linguistic_bro = /(credit|data)bro[0-9]?/
		$stealer_linguistic_homophobia = "gay = {"
		$stealer_linguistic_homophobia2 = "gay.data"
		
		$queries_logins = "SELECT origin_url, username_value, password_value FROM logins"
		$queries_cookies = "SELECT host_key, name, encrypted_value FROM cookies"
		$queries_autofill = "SELECT name, value FROM autofill"
		$queries_credit_cards = "SELECT name, value FROM credit_cards"
		
		// Token here refers to functions/vars/keywords/etc.
		$tokens_function_game_config = "stealGameConfig"
		$tokens_function_take_food = /take[C-P][a-z]{4,8}\(\)/
		
		$files_temp_ps1_is_in = "is in ./temp.ps1"
		$files_temp_ps1_exec = "type .\temp.ps1 | powershell.exe -noprofile -"
		
	condition:
		all of ($token_script*) or $get_token_script or all of ($files*) or all of ($tokens*) or all of ($queries*) or (all of ($stealer_credit_cards*) and $stealer_linguistic_bro) or any of ($stealer_linguistic_homophobia*) or all of ($injector*)
}