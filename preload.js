const { contextBridge, ipcRenderer } = require("electron/renderer")

contextBridge.exposeInMainWorld("electronAPI", {
    showErrorDialog: (text) => ipcRenderer.send("dialog:showErrorDialog", text),
    openDirectory: () => ipcRenderer.invoke("dialog:openDirectory"),
    startTranslate: (args) => ipcRenderer.invoke("startTranslate", args),
    updateOutput: (callback) => ipcRenderer.on("updateOutput", (_, value) => callback(value)),
    setProgress: (callback) => ipcRenderer.on("setProgress", (_, value) => callback(value)),
    updateProgress: (callback) => ipcRenderer.on("updateProgress", (_, value) => callback(value)),
    finishTranslate: (callback) => ipcRenderer.on("finishTranslate", (_, value) => callback(value))
})