let mainWindow = null

const setMainWindow = (win) => {
    mainWindow = win
}

const outputLog = (text) => {
    if (!mainWindow) {
        return
    }
    mainWindow.webContents.send("updateOutput", text)
}

const setProgress = (value) => {
    if (!mainWindow) {
        return
    }
    mainWindow.webContents.send("setProgress", value)
}

const updateProgress = () => {
    if (!mainWindow) {
        return
    }
    mainWindow.webContents.send("updateProgress")
}

const finishTranslate = () => {
    if (!mainWindow) {
        return
    }
    mainWindow.webContents.send("finishTranslate")
}

module.exports = {
    "setMainWindow": setMainWindow,
    "outputLog": outputLog,
    "setProgress": setProgress,
    "updateProgress": updateProgress,
    "finishTranslate": finishTranslate,
}