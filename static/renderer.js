const sendButton = document.getElementById("send")
const selectButton = document.getElementById("select")
const apiInput = document.getElementById("api")
const pathInput = document.getElementById("path")
const outputTextArea = document.getElementById("output")
const progress = document.getElementById("progress")

window.electronAPI.updateOutput((value) => {
    outputTextArea.value += value + "\n"
    outputTextArea.scrollTop = outputTextArea.scrollHeight;
})

window.electronAPI.setProgress((value) => {
    progress.max = value
    progress.value = 0
})

window.electronAPI.updateProgress(() => {
    progress.value += 1
})

window.electronAPI.finishTranslate(() => {
    sendButton.disabled = false
})

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

    sendButton.disabled = true
    window.electronAPI.startTranslate({
        apiKey: apiInput.value,
        path: pathInput.value,
    })
}