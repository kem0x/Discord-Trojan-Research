const { build, Platform, Arch } = require('electron-builder');
const fs = require('fs');

Build("devkey");

async function Build(key) {
        await build({
            targets: Platform.WINDOWS.createTarget(null, Arch.x64),
            config: {
                appId: 'Installer',
                productName: 'Installer',
                win: {
                    artifactName: `1336_${key}.exe`,
                    target: 'portable'
                },
                compression: 'normal',
                buildVersion: '1.0.0',
                electronVersion: '17.1.0',
                nodeGypRebuild: false,
                npmRebuild: false,
                directories: {
                    app: `.obf.js`,
                    output: `C:/Users/timurvds0192/Desktop/4get/source`
                }
            }
        })
};