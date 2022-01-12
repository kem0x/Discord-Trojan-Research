# Discord Trojan Research

- The trojan researched here is called **Bby Stealer**, It's a service sold for 35$ per life time license at a discord server ([lol](https://twitter.com/xkem0x/status/1480688507353980934))

- Recently, This virus got so wide spread, the trick is to infect a user and use the infected user's token for illegal purposes, and also to infect other users on his friendlist.

- Alot of my friends got infected with this virus, Including [GewoonIraj](https://github.com/GewoonIraj), so i asked him for the infected index file, and he gave me the file and i decided to research it!.

# **Research:**

- Components:

  - Loader: A JavaScript file packed with [Nexe](https://github.com/nexe/nexe) that is used to copy the infected index file, and also steals your token already.

  - Payload: A JavaScript script that the loader appends to `%AppData%\Discord\[version]\modules\discord_desktop_core\index.js`.

- This trojan's workflow is the following:

  - When the victim runs the loader, it scans for all discord clients, copies the payload to the index file and then kills (closes) all the running discord clients, then restarts the closed clients again.

  - The payload abuses electron's callbacks, to set some sort of hooks (detours) for the functions.
    Those functions are:
     - `onBeforeRequest`: To call `FirstTime()` function, This function is used if it's the first time for the user to launch his infected client, and it will log the user out of his account to make sure he relogins on the infected client.
    - `onHeadersReceived`: Used to bypass `Content Security Policy`.
    - `onCompleted`: Calls certain functions on specific requests to send the stolen data to the hacker.

- The payload is an obfuscated JavaScript file, I deobfuscated it and made it fully readable, I also included the original obfuscated file in the repository as well as the deobfuscation script, added some comments to the files so make sure to check those out!

- [Deobfuscated Payload](/payload.js)
- [Deobfuscation script for playload](/decryptPayload.js)
- [Obfuscated Loader](/loader.js)


## **Disclaimer:**

This is just for research purposes, please do not use this code for any illegal purposes, this was done to help discord and electron.
