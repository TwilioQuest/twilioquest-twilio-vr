# 挨拶する

このミッション達成のため、Twilioの電話番号に着信する音声通話を処理します。アプリケーションは、音声で「Hello, World!」と発信者に挨拶します。

送信するコマンドやその使用方法についてウォークスルーします。最後に、着信時に応答するよう、自分の電話番号に関連付けます。

## TwiMLの紹介

TwiML(Twilio Markup Language）は、アプリケーションのフローを定義します。これは、HTML(HyperText Markup Language）に非常に似ています。HTMLは、さまざまなエレメントを表示するためにWebブラウザで使用されているものです。

以下はHTMLの例です。

```html
<html>
  <head>
    <title>Hello World, HTML version</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
```

エレメントの定義に使用するものは、以下のとおりです。

- オープニングタグ
- エレメント名。`<`と`>`で囲む
- クロージングタグ。名前を`</`と`>`で囲む

エレメントの内側に他のエレメントをネストできます。例えば、`head`エレメントは、親の`html`エレメントにネストされ、`title`は`head`エレメントにネストされています。

TwiMLはHTMLと類似しています。以下は、「Hello World!」というフレーズを言うために必要なTwiMLです。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>Hello, World!</Say>
</Response>
```

すべてのTwiML音声応答は、`<Response>`タグで始まる必要があります。その他のタグはすべて、そのタグの内側にネストされます。

[`<Say>`動詞](https://www.twilio.com/docs/voice/twiml/say)は、タグの間にある値について、音声合成(TTS）を実行します。

TwiMLコードスニペットの上に`<?xml`宣言があります。XML(eXtensible Markup Language）は、タグベースのマークアップ言語であり、TwiMLはそのスーパーセットです。基本的に、この行が宣言しているのは、XMLのルールに従うということです。つまり、大文字と小文字の別が一致する、オープニングタグとクロージングタグに同意するということです。このため、大文字と小文字の区別が重要です。`<Response>`は`<RESPONSE>`とは異なるタグとして認識されます。

## 電話番号を設定する

これで必要なTwiMLが分かりました。次に、そのTwiMLを電話番号に関連付け、着信時に実行されるようにします。

[コンソールの電話番号のセクション](https://www.twilio.com/console/phone-numbers/incoming)に移動し、自分の電話番号\<%= env.TQ_TWILIO_NUMBER.value %>を選択します。

[**Voice \& Fax**]セクションに、[**A call comes in**]というプロンプトと、その後に続く2つのフィールドが表示されます。ここでは、オプションがいくつかあります。

必要に応じ、Webサーバーを起動し、通話を処理するTwiMLを表示するページをホストします。このオプションを選択した場合、最初のドロップダウンから[**Webhook**]を選択し、Twilioが表示したTwiMLにアクセスできるURLを入力します。

より簡単な方法は、TwiMLレスポンスのホスティングをTwilioに任せることです。Twilioは、TwiML Binsというサービスを提供しています。これを使用すると、Webサーバーを稼働させておく必要がなくなります。ここで送信する応答は、決して変化しない静的なものであるため、TwiML Binは理想的なソリューションです。このオプションでは、最初のドロップダウンから、[**TwiML Bin**]を選択します。次に、[**＋**]ボタンをクリックし、新しいビンを作成します。

この後、TwiML Binが[**Select a TwiML Bin**]ドロップダウンに表示されます。

## TwiML Binを作成する

新しいTwiML Binに**フレンドリー名**を付けます。これを後でドロップダウンから選択します。次に、必要なTwiMLを入力するか、上記のコードサンプルをコピーします。

すべてを正しく入力すると、Valid Voice TwiMLを入力できたことを知らせる通知が表示されます。

[**Create**]ボタンをクリックし、TwiML Binを保存します。次に、[**Save**]をクリックし、電話番号の設定を保存します。

## 自分自身に電話をかける

電話番号\[\<%= env.TQ_TWILIO_NUMBER.value %>](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>)の設定が完了しました。次は電話をかけます。実際に世界への挨拶が聞こえます。

[**HACK**]ボタンを押して、このバリアを突破し、次に進みます。