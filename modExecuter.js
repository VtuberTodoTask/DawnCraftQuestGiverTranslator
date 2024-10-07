const path = require("node:path")
const unzipper = require("unzipper")
const CommentJSON = require("comment-json")

const File = require("./files")
const OpenAITranslator = require("./openai")
const util = require("./util")
const prompt = require("./prompt")

class ModExecuter {
    /**
     * 
     * @param {string} apiKey 
     * @param {string} targetPath 
     * @param {string} distPath 
     * @param {string} cachePath
     */
    constructor(apiKey, targetPath, distPath, cachePath) {
        const file = new File(targetPath)
        if (!file.isExists() || !file.isDirectory()) {
            throw new Error(`${targetPath} is not found.`)
        }

        const dist = new File(distPath)
        if (!dist.isExists()) {
            dist.makeDirectory()
        }
        const cache = new File(cachePath)
        if (!cache.isExists()) {
            cache.makeDirectory()
        }

        this.file = file
        this.dist = dist
        this.cache = cache
        this.apiKey = apiKey
    }

    async execute() {
        const fileList = this.file.getFileList()
        util.setProgress(fileList.length)
        const translater = new OpenAITranslator(this.apiKey)

        const result = {}
        for (const index in fileList) {
            const child = fileList[index]
            if (child && child.isJarFile()) {
                util.outputLog(`check file!: ${child.path}`)
                const cacheBaseDist = new File(path.join(this.cache.path, child.getBaseName()))
                if (!cacheBaseDist.isExists()) {
                    cacheBaseDist.makeDirectory()
                }

                const directory = await unzipper.Open.file(child.path)
                for (const fileIndex in directory.files) {
                    const file = directory.files[fileIndex]
                    if (file.path.match(/en_us.json/)) {
                        const cacheDist = new File(path.join(cacheBaseDist.path, `cache_${fileIndex}.json`))
                        if (cacheDist.isExists()) {
                            Object.assign(result, JSON.parse(cacheDist.getContent()))
                            continue
                        }

                        util.outputLog(`translate file!: ${file.path}`)
                        const content = (await file.buffer()).toString()
                        try {
                            const contentJSON = CommentJSON.parse(content)
                            
                            // modによってはjsonの大きさが半端ないことになるので、細かく分けて処理する
                            let translateTarget = {}
                            const translatedResult = {}
                            for (const key in contentJSON) {
                                translateTarget[key] = contentJSON[key]
                                if (Object.keys(translateTarget).length >= 10) {
                                    console.log(translateTarget)
                                    const translated = await translater.translate(JSON.stringify(translateTarget), prompt.ModPrompt)
                                    console.log(translated)
                                    Object.assign(result, JSON.parse(translated))
                                    Object.assign(translatedResult, JSON.parse(translated))
                                    translateTarget = {};
                                }
                            }
                            if (Object.keys(translateTarget).length > 0) {
                                console.log(translateTarget)
                                const translated = await translater.translate(JSON.stringify(translateTarget), prompt.ModPrompt)
                                console.log(translated)
                                Object.assign(result, JSON.parse(translated))
                                Object.assign(translatedResult, JSON.parse(translated))
                            }
                            
                            cacheDist.writeContent(JSON.stringify(translatedResult, null, "\t"))
                        }
                        catch(e) {
                            util.outputLog(e)
                            console.log(content)
                            console.log(e)
                        }
                    }
                }
            }
            console.log(result)
            util.updateProgress()
        }

        const distFile = new File(path.join(this.dist.path, "ja_jp.json"))
        distFile.writeContent(JSON.stringify(result, null, "\t"))
        util.finishTranslate()
    }
}

module.exports = ModExecuter