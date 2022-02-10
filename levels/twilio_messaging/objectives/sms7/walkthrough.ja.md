# TwiML Binが機能しないときに関数を使用する

Twilio Runtime Functionsを見てみましょう。これは、着信SMSメッセージに応答するために使用できるTwilio環境にホストされたNode.jsコードです。

TwiML Binは、静的または簡単にテンプレート化された応答に最適なソリューションを提供しますが、場合によっては、さらに多くのことを行う必要があります。外部APIを呼び出すか、ランダムな応答を生成するコードを作成する必要があるかもしれません。また、TwiML Binと同様に、Functionsはホストされているため、コードをホストするためにサーバーを起動する心配はありません。つまり、応答用のコードを少し記述する必要がある場合、TwilioRuntime Functionsは優れたホストオプションです。

このバリアを通過するには、Twilio Functionsを使用し、着信SMSの質問に対する魔法の答えを返す8 Ballを作成します。

## たった1つの答えから始める

Twilio Functionsがどのように機能するかを学ぶために、TwiML Binのような固定応答から始めて、そこから構築します。

Twilio Functionsを作成するときは、TwiML Binを使用したときと同じように、Webhookイベント(この場合は着信SMS)に応答できる[Node.js](https://en.wikipedia.org/wiki/Node.js)コードを記述します。

Twilioコンソールの[Functions]セクションに移動し、[+](プラス)ボタンを押して新しい関数を作成します。

<center>
  <img src="images/programmable_sms/create_function.png" />
</center>
ポップアップメニューで、**Hello SMS**テンプレートを選択し、役立つTwiML機能がすでにインポートされている関数テンプレートを使用します。

新しい関数に分かりやすい名前(例えば「8 Ball」など)を付けて、固有パスURLを追加します。

<center>
  <img src="images/programmable_sms/8ball-function.png" />
</center>
[Configuration]セクションでは、エディタにすでに入力されているNode.jsコードが少し表示されます。「Hello SMS」テンプレートを選択したため、Node.jsコードは、「Hello World」メッセージを着信SMSメッセージに返すように設定されています。このチュートリアル用にコードを最初から作成するため、関数の内側の3行を削除し、外側のシェルだけを残します。

```
exports.handler = function(context, event, callback) {
...
};
```

削除した行を、1)`twiml`変数を作成して、すでに使い慣れているTwiMLタグを含む文字列で定義するこのコードに置き換えます。`<Message>...</Message>`動詞タグの間にあるイエス・ノーの質問に対するお気に入りの回答を入力します。

```js
let twiml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <Response>
    <Message>Don't hold your breath.</Message>
  </Response>
`;
```

最後に、Twilio応答を作成し、作成した`twiml`を`setBody`メソッドでBodyとして設定することにより、この文字列をTwiMLとして返すように関数に指示する必要があります。

```js
let response = new Twilio.Response();
response.setBody(twiml);
```

次に、応答が`xml`として送信されることを確認する必要があるため、適切なコンテンツタイプヘッダーを追加します。

```js
response.appendHeader('content-type', 'text/xml');
```

下部にある`handler`メソッドの閉じ中括弧の直前で、必ずコールバック関数を呼び出し、`null`を最初の引数、`response`を2番目の引数として渡します。

```js
callback(null, response);
```

## 自分の電話番号をセットアップしてテストする

コンソールの[Phone Numbers]セクションに戻り、設定するTwilio電話番号を選択します。[**A MESSAGE COMES IN**]で: 

1. 最初のドロップダウンメニューから[**Function**]を選択します。
2. 作成した「8 Ball」関数を選択します

<center>
  <img src="images/programmable_sms/message_comes_in_function.png" />
</center>
この流れを理解できてきましたか?

Twilio番号にテキストを送信し、考えられる唯一の応答が戻ってくることを確認します。

ここまでで、TwiML Binを使って実行できる同じことを実行してきました。関数の本当の魔法は、より動的な応答を作成する機能です。次にそれを学びましょう!

## さて、実際の回答を見てみましょう!

[Magic 8 Ball](https://en.wikipedia.org/wiki/Magic_8-Ball)で遊んだことはありますか?8 Ballを振っているときにイエス・ノーの質問をすると、魔法のように、小さなビューウィンドウに応答が表示されます。同じことを実装しますが、Twilio Functionsで実行できるJavaScriptを使用します。

まず、ハンドラーメソッドの中身を削除します。空のシェルに戻る必要があります。

```javascript
exports.handler = function(context, event, callback) {
  // ...
};
```

選択できる可能な応答のリストを考え出す必要があります。標準のMagic 8 Ballの一部をJavaScript配列に入れることができますが、独自のものに簡単に置き換えたり追加したりできます。

```javascript
let answers = [
  'It is certain.',
  'As I see it, yes.',
  'Without a doubt.',
  'Yes - definitely.',
  'Outlook good.',
  'Most likely.',
  'Reply hazy, try again.',
  'Ask again later.',
  'Better not tell you now.',
  "Don't count on it.",
  'My reply is no.',
  'My sources say no.',
  'Very doubtful.',
  'Outlook not so good.'
];
```

次に、これら多くの回答の中からランダムに1つを選択し、質問を送信した人に返します。これを行うには、`Math.random`メソッドを使用して、0から`answers`配列の長さ(`Math.random() * answers.length`)までの数値を選択します。

ただし、JavaScriptの`Math.random`メソッドは[浮動小数点](https://en.wikipedia.org/wiki/Floating-point_arithmetic#Floating-point_numbers)数を返すため、丸めた整数が必要です。`Math.floor`を使用し、生成した乱数以下の最大整数を取得できます:  `Math.floor(Math.random() * answers.length)`.

最後に、生成した乱数を使用して、`answers`配列内の回答にアクセスし、それを`yourAnswer`変数に保管します。全体として、関数の中身は次のようになります。

```javascript
let answers = [
  'It is certain.',
  'As I see it, yes.',
  'Without a doubt.',
  'Yes - definitely.',
  'Outlook good.',
  'Most likely.',
  'Reply hazy, try again.',
  'Ask again later.',
  'Better not tell you now.',
  "Don't count on it.",
  'My reply is no.',
  'My sources say no.',
  'Very doubtful.',
  'Outlook not so good.',
];
let yourAnswer = answers[Math.floor(Math.random() * answers.length)];
```

## Twilio Node.jsクライアントについて

最初の例では、山括弧をたくさん使って未加工のTwiMLを返しましたが、入力するのは少し面倒でした。Twilio FunctionsはNode.jsで記述されているため、Twilios [Node.jsクライアント](https://www.twilio.com/docs/libraries/node)を使用してTwiML命令を作成できます。Twilioクライアントはすでに関数で使用できるため、インポート/リクエストする必要はありません。

次のコードをご覧ください。

```javascript
let response = new Twilio.twiml.MessagingResponse();
response.message(yourAnswer);
```

Twilioクライアントは、`<Response>`タグと`<Message`>タグを使用する代わりに、TwiMLを作成するために呼び出すことができるメソッドを使用し、これらのほとんどを抽象化します。新しい`<Response>`を作成するには、`MessagingResponse`メソッドを呼び出し、`<Message>...</Message>`タグを手動で書き込む代わりに`message`メソッドを使用できます。

関数の最後で、中括弧を閉じる`}`前に、忘れずにコールバックしてください: `callback(null, response);`

## 質問に対する回答を探す!

8 Ball関数を呼び出すためにTwilio電話番号をすでに設定しているため、質問を送信すると返信が戻るはずです。ただし今回は、何か新しくてエキサイティングなものになるはずです!

(質問に対する回答に満足できない場合、望む返信を得られるまでテキストメッセージを続けてください!)

関数でできることは他にもたくさんありますが、引き続きSMSミッションを続けましょう。右側に電話番号を入力し、[_HACK_]を押して先に進みましょう!