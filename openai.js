const {OpenAI} = require("openai")

const Model = "gpt-4o-mini-2024-07-18"
const BasePrompt = `
minecraftのmodの翻訳を手伝ってください。
今からjson形式のデータを渡されたら、以下のルールに沿って翻訳を行ってください。

### 翻訳のルール
・文章は日本語に翻訳してください
・jsonデータのtextという名前のフィールドのみ翻訳してください
・jsonデータの形式はそのまま残してください
・「$(red)fire$()」のように「$(color)...$()」で囲まれた文章はその中身のみ翻訳し、翻訳後に同じ記述で囲いなおしてください
・minecraftの特殊文字におけるMOTDコードは翻訳時には除外し、翻訳後に元の位置に戻してください
・jsonのみが入力された場合はjsonのみを返答してください

### 入力例
{
    "hoge": {
        "key": "no translate",
        "text": "\\u00A70Did you get the $(red)5 rotten flesh$()"
    }
}

### 期待する出力結果
{
    "hoge": {
        "key": "no translate",
        "text": "\\u00A70$(red)腐った肉5個$()は手に入ったか"
    }
}
`

class OpenAITranslator {
    constructor(apiKey) {
        this.client = new OpenAI({
            apiKey: apiKey
        })
    }
    async translate(jsonString) {
        const response = await this.client.chat.completions.create({
            model: Model,
            messages: [
                {
                    role: "system",
                    content: [
                        {
                            type: "text",
                            text: BasePrompt
                        }
                    ]
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: jsonString
                        }
                    ]
                }
            ]
        })

        if (response.choices && response.choices[0].message) {
            const translatedText = response.choices[0].message.content
            return translatedText
        }

        return ""
    }
}

module.exports = OpenAITranslator