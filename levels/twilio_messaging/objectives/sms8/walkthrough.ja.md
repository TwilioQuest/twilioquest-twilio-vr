# \<Redirect>動詞の使用

メッセージングTwiMLには、もう1つのトリックがあります。`<Redirect>`動詞です。この宝箱の戦利品を獲得するには、メッセージ応答のコントロールを、同じくTwiMLを返す2番目のWebhook URLに渡します。

TwiML命令で`<Redirect>`動詞を使用すると、Twilioに別のURLへの異なるHTTPコールバックを作成するよう指示していることになります。(これは、`<Message>`動詞の`to`属性で見たように、メッセージの転送と同じではありません。)`<Message>`動詞と同じように、`<Redirect>`動詞は`<Response>...</Response>`タグのペア内にあります。

```
<Response>
  <Message>Ahoy there!</Message>
  <Redirect>https://www.foo.com/nextInstructions</Redirect>
</Response>
```

メッセージ応答のロジックの一部を区分化し、より複雑なアプリケーションを構築するために`<Redirect>`を使用できます。例えば、最初のURL(コンソールで設定したもの)が`<Message>`を返送し、`<Redirect>`動詞を使用してResponseコントロールを別のTwiML命令セットに渡す場合があります。

コントロールが別のWebhookに渡されるため、`<Message>`を含む`<Redirect>`後の命令は無視されることに十分注意します。

## 絶対URLと相対URL

`<Redirect>`動詞の「名詞」は、別のTwiMLドキュメントのURLです。TwilioはこのURLにリクエストを送信し、それに応じてTwiMLを想定します。

URLは、**絶対**: `<Redirect>http://www.foo.com/nextInstructions</Redirect>`

あるいは現在のURLへの**相対**: `<Redirect>/nextInstructions</Redirect>`のいずれかです。

## Twilioクライアントを使用した`<Redirect>`

上で見た例では、`<Redirect>`動詞タグ付きの「未加工の」TwiMLを使用しました。Twilioのサーバー側ヘルパーライブラリーの1つを使用する場合は、組み込みメソッドの1つを呼び出し、`<Redirect>`動詞タグを生成できます。例えば、Node.jsで、「Hello World!」を含むテキストを送信します。応答コントロールの受け渡しは次のようになります:

```
const MessagingResponse = require('twilio').twiml.MessagingResponse;


const response = new MessagingResponse();
const message = response.message();
message.body('Hello World!');
response.redirect('https://demo.twilio.com/welcome/sms/');

```

Pythonでは構文は異なりますが、結果は同じです:

```
from twilio.twiml.messaging_response import Message, Redirect, MessagingResponse

response = MessagingResponse()
response.message("Hello World!")
response.redirect('https://demo.twilio.com/welcome/sms/')
```

Twilioには柔軟性があります。Webhook URLがTwiMLを返すことだけを想定しています。どのように生成するかは自由です。`<Redirect>`動詞の練習をするときは、どちらでも好きな方法(あるいは両方)で動詞を記述できます。

## ぜひお試しください!

考えられるWebhook間で`<Redirect>`するためのオプションは数多くあります。TwiML Bin、Twilio関数、QuestIDEまたは別のアプリケーションで記述した独自のホストされているコードです。実際に、複数のチェーンをつなぎ合わせてみてください。TwiML Binを使用する場合は、未加工のTwiMLを記述し、別のTwiML Bin、関数、または`<Redirect>`を使用して独自にホストするコードにコントロールを渡すことができます。

`<Redirect>`動詞を使用する選択メソッド(TwiML Bin、関数、Webアプリケーション)にいくつかのTwiMLを接続します。QuestIDEを使用すると、1つのルートを持つ基本的なWebアプリケーションが作成されます。必ず最初のルートを更新して`<Redirect>` TwiMLを含めてから、2番目の`<Message>`を返す2番目のルートを作成してください。

`<Redirect>` TwiMLを作成したら、着信SMSを受信したときにWebhook URLを呼び出すように電話番号を設定します。動作をテストしたら、HackインターフェイスにTwilio電話番号を入力し、[**HACK**]を押します。Webhook URLにより`<Redirect>`が返されることを確認します。想定通りに返された場合は、宝箱が開いて戦利品が表示されます。