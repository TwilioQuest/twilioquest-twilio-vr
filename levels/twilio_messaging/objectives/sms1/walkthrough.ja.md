# TwilioがWebhookを使用する仕組み

Twilioは、[Webhook](https://www.twilio.com/docs/glossary/what-is-a-webhook)と呼ばれるコールバックメカニズムを使用し、番号の1つが着信SMSメッセージを受信したことをアプリケーションに通知します。Twilioは、POST本文を使うか[着信テキストに関する情報](https://www.twilio.com/docs/sms/twiml#twilios-request-to-your-application)(送信元の番号やメッセージの内容など)を含むクエリパラメーターを使って指定したURLに、HTTP POSTまたはGETリクエストを送信します。

これについてはよくご存じでしょう。着信SMSメッセージを処理する際にWebhookを使用してきたためです。[**A MESSAGE COMES IN**]でTwiML BinまたはTwilio関数を選択するとき、内部の特定URLにリクエストを送信するようにTwilioを設定していました。

### Webhook URLを設定する

着信SMSを受信するための最初のステップは、電話番号の1つが着信テキストを受信したときにTwilioが要求するURLを設定することです。[コンソールでプログラム可能な電話番号](https://www.twilio.com/console/phone-numbers/incoming)を見つけ、その1つをクリックして設定します。

<center>
  <img src="images/programmable_sms/active-numbers.png" />
</center>
電話番号設定ページで、設定の\[**Messaging**]セクションまで下にスクロールします。2つのドロップダウンメニューの隣にあるラベル[**A MESSAGE COMES IN**]を探します。

<center>
  <img src="images/console/sms_webhooks.png" />
</center>
ここで、できることを数字で分類してみましょう。

1. 着信メッセージを処理するためのオプションを選択します。この演習ではWebhookが必要ですが、着信SMSを処理する方法は他にもたくさんあり、別の機会に検討します。

2. 繰り返しになりますが、「Webhook」を選択します。ただし、これまで見てきたように、Twilioがアプリに送信するHTTPリクエストを処理する方法は他にもあります。例えば、TwiML Binや関数などです。

3. ここで、サーバー側アプリケーションのURLを設定します。これは、TwilioがHTTPリクエストを送信できるパブリックURLでなければなりません。コードがノートPCで実行されているときに設定する方法が分かりませんか?この後説明します。

4. リクエストの送信時にTwilioが使用するHTTPメソッドを設定します。GETまたはPOSTのいずれかです。GETリクエストは、着信メッセージに関するデータを[クエリパラメーター](https://en.wikipedia.org/wiki/Query_string)として受信します。POSTリクエストには、[URLエンコードされたPOST本文](https://stackoverflow.com/questions/14551194/how-are-parameters-sent-in-an-http-post-request)が含まれます。

### サーバー側コードを記述してTwilio Webhookリクエストを処理する

次に、Twilioからの着信Webhookリクエストを処理するコードを作成する方法を見てみましょう。誰かがあなたのTwilio電話番号にテキストを送信したとき、TwilioにWebhook URLでTwiML命令を探すように指示しました。(以前は、TwiML Binまたは関数を設定したURLでこれらの命令を探すようにTwilioに指示していました。)ここで、独自のWebアプリケーションを作成してリクエストを処理し、理想的なTwiMLを生成できます。

HTTPリクエストを受け入れて、それに応じて(つまり、すべてのリクエストに応じて)XMLをレンダリングできる任意のプログラミング言語またはフレームワークを使用し、Twilioから送られたそれらのリクエストを処理できます。Webアプリケーションはいくつか処理を行う必要があります。

1. 着信リクエストを処理し、関数に適切にルーティングします
2. TwiMLを返します(「未加工の」TwiML、または[サーバー側のヘルパーライブラリー](https://www.twilio.com/docs/libraries)を使用して関数呼び出しで生成します)

QuestIDEの使用を選択した場合、Node.jsで([Express](https://expressjs.com/) Webフレームワークを使用して)TwiMLで応答するサンプルコードが次のように表示されます。

```js
const http = require('http');
const express = require('express');
const { urlencoded } = require('body-parser');

// Set up our express web application
const PORT = 8767;
const app = express();
app.use(urlencoded({ extended: false }));

// Create a route to handle incoming SMS messages
// This is where the magic happens!
app.post('/sms', (request, response) => {
  console.log(
    `Incoming message from ${request.body.From}: ${request.body.Body}`
  );
  // Here, we're writing and returning raw TwiML
  response.type('text/xml');
  response.send(`
    <Response>
      <Message>I'm busy questing right now!</Message>
    </Response>
  `);
});

// Create and run an HTTP server which can handle incoming requests
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Express server listening on localhost:${PORT}`);
});
```

## 別の言語とフレームワークを使用する

QuestIDEを使用しない場合は、多くの一般的なプログラミング言語で着信SMSを処理する方法を示すチュートリアルを利用できます。この場合もまだこの課題を完了できます。TwilioQuestの外でいつものエディタ/IDEを使うだけです!

- [C# / .NET](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-csharp)
- [Java](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-java)
- [Python](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-python)
- [PHP](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-php)
- [Ruby](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-ruby)
- [Node.js(QuestIDEではなく独自のノードを使用)](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-node-js)

例えば、着信メッセージに応答する小さなPython [Flask](http://flask.pocoo.org/) Webアプリケーションは次のようになります。

```
from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse

app = Flask(__name__)

# Create a route to handle incoming SMS messages
# This is where the magic happens!
@app.route("/sms", methods=['GET', 'POST'])
def sms_ahoy_reply():
    print(f'Incoming message from {request.values.get("From")}: ${request.values.get("Body")}')

    # Here, we're generating TwiML using the Python helper library
    resp = MessagingResponse()
    resp.message("I'm busy questing right now!")

    return str(resp)

if __name__ == "__main__":
    app.run(port=8767)
```

### ノートPC上で動作させているアプリにURLがありません!テストだけを目的としてインターネットにコードをデプロイする必要がありますか?

そうですね、Webアプリケーションは[Heroku](https://www.heroku.com/)、[Digital Ocean](https://www.digitalocean.com/)、または[Azure](https://azure.microsoft.com/en-us/)に簡単にデプロイできます。しかし、そのワークフローは理想的ではありません。そのため、Webhookを使用したローカル開発には[ngrok](https://ngrok.com/)というツールをお勧めします。

一言で言えば、ngrokを使用すると、ノートPCで実行されているWebアプリにパブリックURLを付与できます。この方法によって、Twilio Webhook設定にngrok URLを使用できます。開発用コンピューターのngrokクライアントは、これらのリクエストを指定ローカルアプリケーション/ポートに転送します。

コンピューターにセットアップする方法については、[ngrokドキュメント](https://ngrok.com/docs)を参照してください。[ngrokの使用方法に関する役立つTwilioブログ投稿](https://www.twilio.com/blog/2015/09/6-awesome-reasons-to-use-ngrok-when-testing-webhooks.html)もあります。そのシンプルなコマンドラインインターフェイスは、Webhookリクエストをあらゆる種類のアプリケーションに転送するように機能するはずです。独自のコードを記述している場合でも、組み込みのIDEを使用している場合でも、ngrokはWebhookへの公開URLの付与に役立ちます。