const { app, dialog, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

const Executer = require("./executer")
const ModExecuter = require("./modExecuter")
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

    win.on("close", () => {
        util.setMainWindow(null)
    })
    win.on("closed", () => {
        util.setMainWindow(null)
    })

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
        const type = args.type
        const distPath = path.join(__dirname, "dist")
        const cachePath = path.join(__dirname, "cache")

        util.outputLog("translate start!!")
        try {
            if (type === "mod") {
                const executer = new ModExecuter(apiKey, targetPath, distPath, cachePath)
                executer.execute()
            }
            else if (type === "questgiver") {
                const executer = new Executer(apiKey, targetPath, distPath, true)
                executer.execute()
            }
            else {
                const executer = new Executer(apiKey, targetPath, distPath, true)
                executer.execute()
            }
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