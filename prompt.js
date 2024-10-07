const QuestGiverPrompt = `
minecraftのmodの翻訳を手伝ってください。
今からjson形式のデータを渡されたら、以下のルールに沿って翻訳を行ってください。

### 翻訳のルール
・文章は日本語に翻訳してください。
・翻訳時、単語はマインクラフトの翻訳ガイドラインを厳守してください。
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

const ModPrompt = `
minecraftのmodの翻訳を手伝ってください。
今からjson形式のデータを渡されたら、以下のルールに沿って翻訳を行ってください。

### 翻訳のルール
・文章は日本語に翻訳してください。
・翻訳時、単語はマインクラフトの翻訳ガイドラインを厳守してください。
・jsonデータの内容を全て翻訳してください。
・jsonデータの形式はそのまま残してください
・「$(red)fire$()」のように「$(color)...$()」で囲まれた文章はその中身のみ翻訳し、翻訳後に同じ記述で囲いなおしてください
・minecraftの特殊文字におけるMOTDコードは翻訳時には除外し、翻訳後に元の位置に戻してください
・jsonのみが入力された場合はjsonのみを返答してください

### 入力例
{
    "item.magistuarmory.steel_chainmail": "Steel Chainmail",
}

### 期待する出力結果
{
    "item.magistuarmory.steel_chainmail": "鋼鉄のチェーンメイル",
}
`

module.exports = {
    "QuestGiverPrompt": QuestGiverPrompt,
    "ModPrompt": ModPrompt,
}