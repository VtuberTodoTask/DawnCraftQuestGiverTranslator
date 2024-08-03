const path = require("node:path")

const File = require("./files")
const OpenAITranslator = require("./openai")
const util = require("./util")

class Executer {
    /**
     * 
     * @param {string} apiKey 
     * @param {string} targetPath 
     * @param {string} distPath 
     */
    constructor(apiKey, targetPath, distPath, isBase = false) {
        let file = new File(targetPath)
        if (!file.isExists() || !file.isDirectory()) {
            throw new Error(`${targetPath} is not found.`)
        }

        let dist = new File(distPath)
        if (!dist.isExists()) {
            dist.makeDirectory()
        }

        this.file = file
        this.dist = dist
        this.apiKey = apiKey
        this.isBase = isBase
    }

    async execute() {
        const fileList = this.file.getFileList()
        if(this.isBase) {
            util.setProgress(fileList.length)
        }

        for (const index in fileList) {
            const child = fileList[index]
            if (!child) {
                if (this.isBase) {
                    util.updateProgress()
                }
                continue
            }
            const childBaseName = child.getBaseName()
            if (child.isDirectory()) {
                util.outputLog(`check directory!: ${child.path}`)
                const childDistPath = path.join(this.dist.path, childBaseName) 
                const childExecuter = new Executer(this.apiKey, child.path, childDistPath)
                await childExecuter.execute()
                if (this.isBase) {
                    util.updateProgress()
                }
                continue
            }

            util.outputLog(`check file!: ${child.path}`)
            if (!child.isJSONFile()) {
                util.outputLog(`this is not jsonfile! ${child.getBaseName()}`)
                if (this.isBase) {
                    util.updateProgress()
                }
                continue
            }
            const translater = new OpenAITranslator(this.apiKey)
            const content = child.getContent()
            if (!content) {
                throw new Error(`cannot read file: ${child.path}`)
            }
            const translated = await translater.translate(content)
            if (!translated) {
                throw new Error(`translate failed!`)
            }
            const distFile = new File(path.join(this.dist.path, childBaseName))
            distFile.writeContent(translated)
            if (this.isBase) {
                util.updateProgress()
            }
        }

        if (this.isBase) {
            util.finishTranslate()
        }
    }
}

module.exports = Executer