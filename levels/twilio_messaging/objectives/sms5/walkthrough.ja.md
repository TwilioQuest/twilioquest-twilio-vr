# 着信メッセージに応答する

すでに一度テキストメッセージに返信しました。気づかなかったかもしれませんが、**TwiML**と呼ばれるXML方言を使用し、着信テキストを受信したときにTwilioに何をすべきかを指示しました。

## TwiMLとは何か?

TwiMLは「Twilio Markup Language」の略で、テキストメッセージや音声通話への応答など、Twilioがユーザーに代わり、何かを行うための一連の指示と考えることができます。

内部的には、TwiMLは[XML](https://en.wikipedia.org/wiki/XML)であり、一部のデータに関する追加情報をエンコードするための「マークアップ言語」の一種です。この場合、データとは、あなたにテキストメッセージを送信した人に返送するメッセージの本文です。追加情報は、Twilio命令です。

以下の例では、メッセージの本文を探します。その周囲には、`<tags>`内部に含まれている多くの情報が表示されます。

`<Response>`タグは、TwiML命令セットを作成していることをTwilioに通知します。TwiMLで応答するたびに、メッセージをネストした`<Response>`...`</Response>`タグのセットを作成する必要があります。

[`<Message>`動詞](https://www.twilio.com/docs/sms/twiml/message)はこのショーの真のスターです。あなたにテキストメッセージを送信した人にテキストメッセージを返送したいことをTwilioに伝えます。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>Oh hai Mark!</Message>
</Response>
```

`<?xml...`タグ付きの奇妙な線についてはどうですか?これは、大文字と小文字を区別する方法でタグを開いたり閉じたりするなど、XMLのルールに従うことを宣言しています。TwiMLは内部的にはXMLであるため、これを含めます。

## 電話番号を設定する

着信SMSを受信するための最初のステップは、電話番号の1つが着信テキストを受信したときにTwilioが要求するURLを設定することです。[コンソールでプログラム可能な電話番号](https://www.twilio.com/console/phone-numbers/incoming)を見つけ、その1つをクリックして設定します。

<center>
  <img src="images/programmable_sms/active-numbers.png" />
</center>
電話番号設定ページで、設定の\[**Messaging**]セクションまで下にスクロールします。2つのドロップダウンメニューの隣にあるラベル[**A MESSAGE COMES IN**]を探します。

<center>
  <img src="images/programmable_sms/message_comes_in_twiml_bin.png" />
</center>
ここでは、TwiML命令の受信をどのように想定するかをTwilioに指示します。TwiMLを提供するためにWebサーバーを起動するなど、TwiMLを返すためのいくつかのオプションがあります。このバリアは、TwiML自体に精通することを達成目標としています。

Twilioは、「TwiML Bin」と呼ばれるサービスを提供し、TwiML命令を保持して返します。(これは、TwiMLをホストするためにWebサーバーをセットアップして実行する必要がないことを意味します!)固定応答を設定するには、TwiML Binが最適なソリューションです。

最初のドロップダウンで、**TwiML**を選択し、右側の「+」(プラス)ボタンを押して新しいTwiML Binを作成します。以前に作成したTwiML Binは右側のドロップダウンに表示されますが、このオブジェクティブでは最初から作成します。

Twilioコンソールの[TwiML Bin](https://www.twilio.com/console/runtime/twiml-bins)セクションでも、TwiML Binを作成できます。

## TwiML Binの使用方法とは?

TwiML Binは、特定のTwiML命令のセットを保持するための小さなバケットと考えてください。

まず、新しいBinに「My first Messaging TwiML bin」のように**分かりやすい名前**を付けます。

TwiMLテキストボックスには、応答方法に関するTwiML命令をいくつか記述できます。`<?xml...`宣言がすでに追加されていることに注意してください。TwiMLを手動で作成するか、上記の例からコピーできます。

## 作業内容の確認

TwiML Binを作成し、その一連の手順を使用してTwilio電話番号の着信メッセージに返信するようにTwilioに指示しました。ここでテストを行います。

Twilio電話番号にメッセージを送信し、意図した返信が戻ることを確認します。

返信を受信したら、右側のフィールドにTwilio電話番号を入力し、[**HACK**]ボタンを押します。着信メッセージに応答するためにTwiML Binが接続されていることを確認します。これにより経験値を得られます。