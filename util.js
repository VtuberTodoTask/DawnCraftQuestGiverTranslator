let mainWindow = null

const setMainWindow = (win) => {
    mainWindow = win
}

const outputLog = (text) => {
    if (!mainWindow) {
        return
    }
    try {
        mainWindow.webContents.send("updateOutput", text)
    }
    catch(e) {
        console.log(e)
    }
}

const setProgress = (value) => {
    if (!mainWindow) {
        return
    }
    try {
        mainWindow.webContents.send("setProgress", value)
    }
    catch(e) {
        console.log(e)
    }
}

const updateProgress = () => {
    if (!mainWindow) {
        return
    }
    try {
        mainWindow.webContents.send("updateProgress")
    }
    catch(e) {
        console.log(e)
    }
}

const finishTranslate = () => {
    if (!mainWindow) {
        return
    }
    try {
        mainWindow.webContents.send("finishTranslate")
    }
    catch(e) {
        console.log(e)
    }
}

module.exports = {
    "setMainWindow": setMainWindow,
    "outputLog": outputLog,
    "setProgress": setProgress,
    "updateProgress": updateProgress,
    "finishTranslate": finishTranslate,
}