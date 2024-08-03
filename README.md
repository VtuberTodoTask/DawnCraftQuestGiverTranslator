## 概要
Y-RyuZU 様の MinecraftModsLocalizer を盛大にパクって作った DawnCraft の QuestGiver mod のクエストを翻訳するためのツールです。

```
Q. MinecraftModsLocalizer を Fork して作ったほうが早かったのでは？
A. わし、 Python わからん。あと Docker もわからん…
```

## 使い方
まだビルドして使ってもらわないといけないので、 node v22.5.1 の環境で以下のコマンド叩けばいけると思います。  

```
npm install
npm start
```

起動したら OpenAI API Key に OpenAI の API Key を入れてください。 API Key の取り方は調べれば出ます。有料なので未成年はごめんなさい。    
Target Path は Select ボタンを押すとディレクトリ選択画面になるので、 QuestGiver のクエストデータがあるディレクトリを選択してください  
（ CursedForge で DawnCraft を右クリック→フォルダを開く→出てきたエクスプローラーから   global_packs\required_data\DawnCraft_Datapack\data\quest_giver\quests とたどってください）  

入れ終わったら Send ボタンを押すと翻訳が始まり、翻訳結果が dist フォルダに出力されます。それをもともとのクエストデータがあるところに上書きしてください。  
なお、上書きする前にバックアップを取ることを強くおすすめします。  