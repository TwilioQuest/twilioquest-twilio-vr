# メッセージのステータスコールバックを設定する

Twilioを使用してメッセージを送信する場合(発信SMSまたは着信SMSへの応答として）、Webhook URLを指すTwiML `<Message>`動詞の`action`属性を指定することもできます。例えば、メッセージステータスが「送信済み」から「配信済み」に変わると、Twilioは設定したステータスWebhook URLにリクエストを送信します。そのURLで実行されているコードは、メッセージのステータスが変更されるたびにTwilioが送信するリクエストに基づき、さまざまなアクションを実行できます。

## メッセージステータスとは？

あなたが目にするメッセージステータスの一部は次のとおりです:

- **Sent(送信済み）**:  最寄りの上流キャリアがメッセージを受け入れました。
- **Delivered(配信済み）**:  Twilioは、上流キャリア、もしくは利用可能な場合、宛先ハンドセットからメッセージ配信の確認を受信しました。
- **Failed(失敗）**:  [さまざまな理由](https://www.twilio.com/docs/sms/api/message-resource#delivery-related-errors)でメッセージを送信できませんでした。

その他のステータスは、[APIリファレンスページ](https://www.twilio.com/docs/sms/api/message-resource#message-status-values)で確認できます。

## ステータスコールバックURLを設定する

Twilio電話番号で着信SMSメッセージに返信するためにWebアプリケーションでルートを設定する方法を見てきました。次に、2番目のルートを設定する必要があります。これは、返信メッセージのステータスが更新されたときにTwilioからの着信リクエストを処理します。

対応する関数で実行されるコードは、あらゆることを実行できます。このバリアを通過するには、`MessageSid`や、受け取る最後のステータスを入力する必要があります。それはどこにあるのでしょうか？Twilioがアプリケーションに送信する`request`上にあります!

Twilioは、メッセージの配信ステータスが更新されるたびに、ステータスコールバックURLにリクエストを送信することを思い出してください。リクエストには、Twilioの標準リクエストパラメーターと[いくつかの追加ステータス関連パラメーター](https://www.twilio.com/docs/sms/api/message-resource#statuscallback-request-parameters)が含まれます。`request.body`を参照することでアクセスできます。Node.jsでは、`request.body.MessageStatus`や`request.body.MessageSid`のようになっています。

これを出力する場合、Node.jsとExpressでは次のようになります。

```
app.post('/status', (request) => {
  console.log(`Message SID ${request.body.MessageSid} has a status of ${request.body.MessageStatus}`);
});
```

Python Flaskアプリでは、次のようになります。

```
...
@app.route("/status", methods=["GET", "POST"])
def my_status_function():
    print(f"Message SID {request.values.get('MessageSid')} has a status of {request.values.get('MessageStatus')}")
```

## TwiML `action`属性を使用する

TwiMLでメッセージを作成する場合、`action`属性を使用してWebhook URLを指定できます。属性はMessage動詞の`<...>`タグ内にあり、ユーザーに代わりメッセージを送信する方法に関する詳細情報をTwilioに提供します。Twilioは、メッセージが宛先に向けて移動するときに、そのURLにリクエストを送信します。

```
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message action="https://your_url_here.com/status">Hello, World!</Message>
</Response>
```

_注記_: アプリケーションに`status_callback`ルートも含まれている場合は、`action`属性を完全なURLに設定する必要はありません。`<Message>`動詞は次のようになります: `<Message action="/status">Hello, World!</Message>`

ステータスコールバックURLは、これらのステータスの更新を考慮したコードを指している必要があります。(ヒント:  この例では、これがステータス更新用に設定したルートである必要があります!）

## 課題を完了する

QuestIDEでは、独自のコードまたはTwiML Binが着信メッセージに応答します。今回は、返信に使用する`<Message>`動詞に`action`属性を必ず含めてください。

QuestIDEを使用する場合、[Express.js](https://expressjs.com/) Webアプリケーションのベアスケルトンがセットアップされています。以下を記入する必要があります。

1. ステータスコールバックURLの新しいルート(ヒント:  `/status`など）
2. `action`属性を使用して着信SMSに応答するメッセージングTwiML
3. Twilioが`status_callback` URLにリクエストを送信し、`MessageSid`と`MessageStatus`を出力するときに呼び出される関数の本文

`RUN`を押すと、Webアプリケーションが起動します。Twilioの電話番号にテキストを送信すると、アプリケーションに対するTwilioのリクエストがコンソールに表示されます。さらに、アプリケーションが応答を送り返すと、リクエストを処理するコードは、WebhookがTwilioから受信する各ステータス更新を出力する必要があります。メッセージSIDをコピーし、受信した最後のステータス更新を記憶して`HACK`インターフェイスに入力できるようにします。