const fs = require("node:fs")
const path = require("node:path")

class File {
    constructor(filePath) {
        this.path = filePath
    }
    isExists() {
        return fs.existsSync(this.path)
    }
    isDirectory() {
        if (!this.isExists()) {
            return false
        } 
        const stat = fs.statSync(this.path)
        return stat.isDirectory()
    }
    isJSONFile() {
        if (this.isDirectory()) {
            return false
        }
        return path.parse(this.path).ext === ".json"
    }
    isJarFile() {
        if (this.isDirectory()) {
            return false
        }
        return path.parse(this.path).ext === ".jar"
    }
    getBaseName() {
        return path.basename(this.path)
    }
    getFileList() {
        const fileList = fs.readdirSync(this.path).map((filePath) => {
            const file = new File(path.join(this.path, filePath))
            return file
        })
        return fileList
    }
    getContent() {
        if (this.isDirectory()) {
            return null
        }
        const content = fs.readFileSync(this.path)
        return content.toString()
    }
    writeContent(content) {
        fs.writeFileSync(this.path, content)
    }
    makeDirectory() {
        if (!fs.existsSync(this.path)) {
            fs.mkdirSync(this.path)
        }
    }
}

module.exports = File