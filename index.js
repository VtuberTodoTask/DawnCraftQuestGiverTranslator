const { app, dialog, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '/preload.js')
        }
    })
    win.setMenu(null)

    ipcMain.on("test", (event, text) => {
        console.log(text)
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

    win.loadFile('./static/index.html')
}

app.whenReady().then(() => {
    createWindow()
})