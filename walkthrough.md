# &lt;Redirect&gt; Verbの使い方

メッセージングTwiMLには、もう一つの仕掛けがあるよ。このチェストの中の戦利品を手に入れるためには、Messageレスポンスの制御を、TwiMLを返す2つ目のWebhook URLに渡する。

TwiMLの命令で「<Redirect>」Verbを使用すると、Twilioに別のURLへのHTTPコールバックを指示することになる。これは、「<Message>」Verbの「to」属性で見たように、Messageを転送することとは異なる。「<Message>」Verbと同様に、「<Redirect>」Verbは一対の「<Response>...</Response>」タグの中に格納されている。

```
<Response>
  <Message>Ahoy there!</Message>
  <Redirect>https://www.foo.com/nextInstructions</Redirect>
</Response>
```

「<Redirect>」を使って、メッセージレスポンスのロジックの一部を区分けし、より複雑なアプリケーションを構築することができる。例えば、最初のURLでは「<Message>」を送り返し、「<Redirect>」Verbを使ってResponseコントロールを別のTwiML命令群に渡すことができるかもしれない。

注意していただきたいのは、「<Redirect>」以降の命令は、「<Message>」も含めて、別のWebhookに制御が移ってしまうため、無視されるということです。

## 絶対URLと相対URL

「<Redirect>」Verbの「名詞」は、別のTwiMLドキュメントのURLです。TwilioはこのURLに対してリクエストを行い、レスポンスとしてTwiMLを期待する。

**絶対**URLは可能です: 「<Redirect>http://www.foo.com/nextInstructions</Redirect>」

**r相対**URLもある: 「<Redirect>/nextInstructions</Redirect>」

## Twilioクライアントを使って「<Redirect>」する

上記の例では、「<Redirect>」Verbタグを含む生のTwiMLを使用している。Twilioのサーバーサイドヘルパーライブラリを使用している場合は、内蔵されているメソッドの1つを呼び出して、「<Redirect>」Verbタグを生成することができる。例えば、Node.jsでは、「Hello World!」と書かれたテキストを送信し、レスポンスコントロールを渡すと次のようになる。

```
const MessagingResponse = require('twilio').twiml.MessagingResponse;


const response = new MessagingResponse();
const message = response.message();
message.body('Hello World!');
response.redirect('https://demo.twilio.com/welcome/sms/');

```

Pythonでは、構文は異なりますが、結果は同じです。

```
from twilio.twiml.messaging_response import Message, Redirect, MessagingResponse

response = MessagingResponse()
response.message("Hello World!")
response.redirect('https://demo.twilio.com/welcome/sms/')
```

Twilioは柔軟性がある。 webhookのURLがTwiMLを返すことを期待しているだけです。どのように生成するかはあなた次第です。「<Redirect>」Verbを使って練習すれば、自分が納得できる方法で書くことができる。

## 試してみてください。

さまざまなwebhook間で「<Redirect>」するために、多くのオプションがある。TwiML Bins、Twilio Functions、そしてQuestIDEや他のアプリで書いた独自のホストコードなどです。 TwiML Binを使用すると、生のTwiMLを書いて、他のTwiML BinやTwilio Function、自分のホストコードに「<Redirect>」で制御を渡すことができる。

「<Redirect>」Verbを使ったお好みの方法で、いくつかのTwiMLを接続する。QuestIDEを使用すると、1つのルートを持つ基本的なWebアプリが作成される。最初のルートを更新して 「<Redirect>」 のTwiMLを含むようにし、2つ目「<Message>」 を返す2つ目のルートを作成してください。

「<Redirect>」のTwiMLを作成したら、SMSを受信したときにWebhook URLを呼び出すように電話番号を設定する。動作確認ができたら、HackインターフェースにTwilioの電話番号を入力し、**HACK**を押してください。Webhook URLが「<Redirect>」を返すかどうかを確認し、返ってきた場合は胸が開く。