const sendButton = document.getElementById("send")
const selectButton = document.getElementById("select")
const apiInput = document.getElementById("api")
const pathInput = document.getElementById("path")

selectButton.onclick = async () => {
    const path = await window.electronAPI.openDirectory()
    pathInput.value = path
}

sendButton.onclick = () => {
    if (apiInput.value === "") {
        window.electronAPI.showErrorDialog("API key is not selected")
        return
    }
    if (pathInput.value === "") {
        window.electronAPI.showErrorDialog("Target directory is not selected")
        return
    }
}