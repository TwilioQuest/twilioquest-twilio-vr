# クールなMustache(口ひげ)

このObjectiveを完了するには、着信する音声通話から得た情報を動的に取り込む方法と、その情報を応答に使用する方法を学ぶ必要があります。

## Mustacheテンプレート

TwiML Binには、プレースホルダーを作成する方法があります。Mustacheテンプレート作成言語を使用し、動的な情報を持たせるプレースホルダーです。

Mustacheでは、キーを{{ }}(2重波括弧)で囲むことにより、プレースホルダーまたは**タグ**を定義できます。`{{ }}`.頭を傾けて見ると、ライブラリーの名前の由来が分かります。波括弧(`{`)が口ひげの形に似ているのです。

TwiMLには、どのようなタグも含めることができ、Mustacheがタグを対応する値に置き換えます。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>We have got the perfect job for you in {{ ToCity }}</Say>
</Response>
```

着信通話のハンドラーとして使用すると、`ToCity`は、発信者が住む市の名前に置き換えられます。

## 着信するリクエストを使用する

[着信通話から得られる値はたくさん](https://www.twilio.com/docs/voice/twiml#request-parameters)あります。それらのどの値も、テンプレートの中で使用できます。

大文字と小文字は区別されることに注意してください。すべて小文字の`{{ from }}`は、みなさんが必要とする先頭が大文字の`{{ From }}`とは異なります。

カスタム値の追加もできます。

## カスタム値を追加する

着信するHTTP POSTリクエストから得られる値を取り込むだけでなく、それ以外の値の追加もできます。これはクエリ文字列を使用して行います。これは、`?`の後に続くURLの一部であり、`key=value`のペアの形式を`&`で区切ります。

例えば、URL `https://techrecruiter.us?FirstName=Bob&LastName=Blahblah`にはクエリ文字列があり、`FirstName`と`LastName`の両方の値が含まれています。このURLがTwiML Binならば、それらの値をプレースホルダーに置換できました。

### TwiML Binを作成する

まず、このエクササイズ用に新しいTwiML Binを作成します。

[コンソール](https://www.twilio.com/console)に移動し、サイドメニューから[[TwiML Bins](https://www.twilio.com/console/runtime/twiml-bins)]を選択します。ここから、`+`ボタンを使用し、新しいTwiML Binを作成できます。

テンプレートを使用するため、`Mustache Example`に**フレンドリー名**を設定します。このTwiML Binにより、動的な挨拶をさせ、発信者にどこから発信しているかを伝えます。

このTwiMLは以下のようになります。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Hello {{ Name }}! This call is coming from {{ From }}</Say>
</Response>
```

[**Create**]ボタンをクリックし、新しいTwiML Binを保存します。

気が付かれたかと思いますが、ここでは`Name`パラメーターを渡す必要があります。

作成したばかりのBinのページの上部に、[**URL**]というフィールドがあります。そのフィールドの端にあるコピーリンクをクリックし、そのURLをクリップボードにコピーします。

## URLを設定する

自分の電話番号\[Phone Number](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>)を探します。

[**A Call Comes In**]の下の[**Voice \& Fax**]セクションで[**Webhook**]を選択し、TwiML Bin URLを貼り付けます。

URLの最後に、クエリ文字列`?Name=`を追加し、等号の右側に自分の名前を**入力**します。こうすると、Mustacheは`{{ Name }}`タグをみなさんの名前に置き換えることができます。

変更内容とともに電話番号の**保存**も忘れないでください。

## 自分自身に電話をかける

次に、自分の電話番号(\<%= env.TQ_TWILIO_NUMBER.value %>)に電話をかけます。みなさんの名前が聞こえ、電話番号がおかしな風に読み上げられます。

これで、テンプレートを使用した、メッセージの動的変更ができました。準備した後、[**HACK**]ボタンを押しましょう。

## 詳細はこちら

- [TwiML Binのチュートリアル](https://www.twilio.com/docs/runtime/tutorials/twiml-bins)