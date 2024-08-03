const { app, dialog, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

const Executer = require("./executer")
const util = require("./util")

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '/preload.js')
        }
    })
    win.setMenu(null)
    util.setMainWindow(win)

    ipcMain.on("dialog:showErrorDialog", async (event, text) => {
        await dialog.showMessageBox({
            type: "error",
            title: "Error",
            message: text
        })
    })

    ipcMain.handle("dialog:openDirectory", async () => {
        const {canceled, filePaths} = await dialog.showOpenDialog({
            properties: ["openDirectory"]
        })
        if (!canceled) {
            return filePaths[0]
        }
        return ""
    })

    ipcMain.handle("startTranslate", async (_, args) => {
        const apiKey = args.apiKey
        const targetPath = args.path
        const distPath = path.join(__dirname, "dist")

        util.outputLog("translate start!!")
        try {
            const executer = new Executer(apiKey, targetPath, distPath, true)
            executer.execute()
        }
        catch(e) {
            await dialog.showMessageBox({
                type: "error",
                title: "Error",
                message: e
            })
        }

    })

    win.loadFile('./static/index.html')
}

app.whenReady().then(() => {
    createWindow()
})