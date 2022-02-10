# 注意が必要なハンドラー

この宝箱を開くため、音声アプリケーションで発生し得るエラーの処理方法を設定します。

ここでは、ベストプラクティスについて考え、コールバックの設定方法を説明した後、ホストされたTwiML Binから[`<Say>`動詞](https://www.twilio.com/docs/voice/twiml/say)を使用する方法を確認します。

## エラーは起こり得るもの

完璧な人は存在しません。Cedricでさえ、同様です。どこかで、コードにエラーが発生する場合があります。

みなさんではどうすることもできない状況も発生します。例えば、自分たちが所有するサーバーから応答している場合には、タイミング良く応答できないかもしれません。発信者をいつまでも待たせるわけにはいかないため、バックアップを用意します。

ほとんどのプログラミング言語には内蔵のフォールバックメカニズムが存在します。これは`try`/`catch`のようなやり方です。このロジックは、コードを試し(try)、それが機能しない場合にはエラーをキャッチ(catch)し、処理するというものです。

Twilioでは、この機能を着信通話用に提供しています。

## ファールバックを作成する

自分の\[\<%= env.TQ_TWILIO_NUMBER.value %>電話番号](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>)の編集画面の、[**Voice \& Fax**]セクションの下に、[`Primary Handler Fails`]フィールドがあります。最初のドロップダウンからTwiMLを選択し、次にその行の[＋]ボタンをクリックし、新しいTwiML Binを作成します。

TwiML Binに`Please Call Again`のような名前を付けます。TwiMLの本文に、TTS(テキストを音声に変換)するためのテキストを追加します。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>We are currently experiencing difficulties. Please call again.</Say>
</Response>
```

現在問題😉が発生していなければ、`Valid Voice TwiML`の検証が表示されるはずです。[**Create**]をクリックし、新しいTwiML Binを保存します。次に番号の設定を[**Save**]します。

## これだけは機能するよう確認

エラー処理が機能することを確認するために、故意に受信TwiMLを壊します。私の好きな方法は、「A Call Comes In」TwiML&nbsp;`<Response>`タグを、`<response>`のようにすべて小文字にすることです。この変更を一時的に**保存**し、電話番号に電話してみます。よくできました!ここで着信通話ハンドラーを**修正**します。

[**HACK**]ボタンを押し、この宝箱を開け、次の冒険に進みましょう!