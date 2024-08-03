const { contextBridge, ipcRenderer } = require("electron/renderer")

contextBridge.exposeInMainWorld("electronAPI", {
    test: (text) => ipcRenderer.send("test", text),
    showErrorDialog: (text) => ipcRenderer.send("dialog:showErrorDialog", text),
    openDirectory: () => ipcRenderer.invoke("dialog:openDirectory"),
})