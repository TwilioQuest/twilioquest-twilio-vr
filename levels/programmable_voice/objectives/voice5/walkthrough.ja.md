# 関数ジャンクション

Twilio Functionは、サーバーに格納されたコードであり、特定のイベントに基づいて実行されます。このバリアを乗り越えるには、関数を使用して受信音声通話に応答します。今回は、着信通話の電話番号の**プリフィックス**に基づいて異なる応答をする、新しい**関数**を作成する方法を説明します。

## プリフィックス

プリフィックスとは、一連の文字の最初の部分です。一般に電話番号は、特定のプリフィックスを使用し、場所を定義します。電話番号の最初の部分は国コードです。通常、その後に地理的場所をさらに絞り込むコードが続きます。

この課題の目標は、音声通話着信の発信元が、選択した地理的場所として定義されている所であるかを判断することです。

<details>
  <summary>特定のプリフィックスの例</summary>
米国の番号は国コード`+1`で始まります。特定地域の番号をグループ化する市外局番もあります。オレゴン州ポートランド市に拠点を置く番号の市外局番は`503`です。したがって、番号`(503) 555-1212`のプリフィックスは`+1503`になります。

ドイツのベルリンにある番号を見てみましょう。ドイツの国コードは`+49`です。[ドイツの電話番号](https://en.wikipedia.org/wiki/Telephone_numbers_in_Germany)に地域の番号があります。ベルリンの市外局番は`030`です。ですから、ベルリンのプリフィックスは`+49030`として定義します。

</details>
## 関数を作成する

まず、Twilioコンソールの[[**Functions**](https://www.twilio.com/console/runtime/functions/manage)]に移動します。`+`ボタンをクリックし、新しい関数を作成します。テンプレートのリストから、[**+ Blank**]を選択し、次に[**Create**]をクリックします。

[**Function Name**]フィールドを使用すると、関数の検索も、後で使用することも容易になります。新しい関数に`Prefix Checker`という名前を付けます。

関数では、サブドメイン名がランダムに生成されます。これは、[**Path**]フィールドの編集不可能な部分です。URLに続く編集可能なフィールドに、パス名`/prefix-checker`を入力します。

[**Code**]フィールドに、ボイラープレートのJavaScriptがあります。

```javascript
exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();
  // twiml.say("Hello World");
  callback(null, twiml);
};
```

このコードが外国語のように見えたとしても、恐れる必要はありません。思い出していただけるよう、以下にJavaScriptを記載しました。JavaScriptの基礎が身に付いている場合は、このセクションを省略してください。

<details>
    <summary><strong>JavaScriptの復習</strong></summary>
JavaScriptはプロトタイプベースの言語です。関数型プログラミング(FP）の概念と、オブジェクト指向プログラミング(OOP）機能の一部をサポートします。この概念の組み合わせは、通常、いずれかのパラダイムでコーディングする開発者を混乱させることが知られています。

コードの最初の行は、概念的な衝突の顕著な例です。

```javascript
exports.handler = function(context, event, callback) {
```

この行では、`exports`が**オブジェクト**です。**property** `handler`は、新しく作成された無名`function`に割り当てられます。3つの**パラメーター**は、その無名関数の`context`、`event`、`callback`により定義されます。

ここで注意が必要な点は、`exports`が、モジュールにより使用される関数の公開を支援する特別なオブジェクトであるということです。`handler`関数をエクスポートすることで、特別なイベントを処理するために呼び出す必要のある関数を定義します。その定義されたイベントが発生すると、Twilioはこの関数を呼び出し、上記のパラメーターに一致する3つの引数を渡します。

ここではこれらのパラメーターについて簡単に説明しますが、最初に変数を少し確認してみましょう。

<details>
    <summary>変数の復習</summary>
後で参照できるように、名前を付けます。変数は、以前に作成された値を参照するコード内の名前です。後から名前で値を参照できるように変数を作成します。

```javascript
let twiml = new Twilio.twiml.VoiceResponse();
```

この行は、`twiml`という名前の新しい変数を作成します。[`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)ステートメントは、無名関数本体で使用できる新しい名前付き変数を定義します。

</details>
```javascript
let twiml = new Twilio.twiml.VoiceResponse();
```

この行は、`twiml`という名前の新しい変数を作成し、`Twilio.twiml.VoiceResponse`の**インスタンス**を保管します。`Twilio`モジュールはどの関数でも使用できます。ここでは、必要に応じて`VoiceResponse`オブジェクトを使用する方法を少し見ていきます。

```javascript
// twiml.say("Hello World");
```

この行の先頭にある二重スラッシュ`//`は、コードの読者向けの**コメント**を入力する方法の例を示しています。この行はコメントアウトされているため、コードは実行されません。コードは、`VoiceResponse`オブジェクトとどのように相互作用するかを確認するために、意図的にここに残されています。

この行は、コメント解除された場合、`twiml`インスタンスの**メソッド**`say`を呼び出してから、**文字列**`"Hello World"`を渡します。戻り値をキャプチャしないため、このメソッドは`twiml`インスタンスを直接変更する必要があることに気付くでしょう。

これについては、もう少し詳しく説明します。その前に、文字列について簡単に復習しましょう。

<details>
    <summary>文字列の復習</summary>
文字列は、誕生日パーティーのバナーのように、すべて一緒につながれた一連の文字を表します。JavaScriptでは、引用符により囲むことで文字列を作成できます。

```javascript
let lyrics = 'Never gonna give you up';
let singer = 'Rick Astley';
```

一重引用符`'`または二重引用符`"`を使用して文字列を作成できます。文字列はオブジェクトであるため、[多くのメソッド](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)を使用できます。

```javascript
lyrics.toUppercase(); // returns "NEVER GONNA GIVE YOU UP"
```

</details>
</details>
### Handler引数

`handler`関数は、以下の引数を受け取ります。

#### `context`

現在の関数のコンテキストをもたらすオブジェクトです。関数はアカウントに関連付けられるため、アカウントの資格情報にアクセスできます。`context.getTwilioClient()`メソッドを使用すると、認証されたクライアントにアクセスできます。

#### `event`

`event`引数には、ハンドラーをトリガーしたイベントに特有の情報が含まれます。このケースでは、`event`は[`HTTP`リクエスト(着信する音声通話からの）](https://www.twilio.com/docs/voice/twiml#request-parameters)を表します。HTTP POSTキー値のペアは、このオブジェクトにプロパティとして適用されているため、`event.From`など、必要なプロパティに便利にアクセスできます。

#### `callback`

この`callback`は渡される**関数**です。2つのパラメーターを期待します。エラーに該当する場合とその応答

```javascript
callback('Oh no something bad happened!');
```

または、成功した場合

```javascript
callback(null, twiml);
```

[関数呼び出し](https://www.twilio.com/docs/runtime/functions/invocation)の詳細については、ドキュメントをご覧ください

## VoiceResponse

以下はデフォルトのボイラープレートコードです

```javascript
let twiml = new Twilio.twiml.VoiceResponse();
```

`Twilio`モジュールは、`twiml`応答を生成する便利なツールを提供します。`VoiceResponse`は、使用可能なすべての[Programmable VoiceのTwiML動詞](https://www.twilio.com/docs/voice/twiml)をサポートします。

```javascript
exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();
  twiml.say('Hello World');
  callback(null, twiml);
};
```

<details>
    <summary>生成されたTwiML</summary>
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>Hello World</Say>
</Response>
```

</details>
このObjectiveについては、発信者の電話番号が特定のプリフィックスに一致する場合、話をします。

## すべてをまとめる

一致するプリフィックスの確認に便利な方法の1つは、JavaScriptの文字列メソッドの`startsWith`を使用することです。このメソッドはブール値(trueまたはfalse）を返します。

```javascript
'watermelon'.startsWith('water'); // returns true
```

`startswith`を使用すると、発信者のプリフィックスを確認できます。例えば、以下のコードは、オレゴン州ポートランドのプリフィックス、`+1503`を確認し、お決まりの返答をします。

```javascript
if (event.From.startsWith('+1503')) {
  twiml.say('Keep Portland Weird!');
}
```

<details>
    <summary>完全な関数</summary>
```javascript
exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();
  twiml.say('Hello World');
  if (event.From.startsWith('+1503')) {
    twiml.say('Keep Portland Weird!');
  }
  callback(null, twiml);
};
```

このコードは、着信電話番号にプリフィックス`+1503`がついている**場合**、次のTwiML応答を生成します:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>Hello World</Say>
    <Say>Keep Portland Weird</Say>
</Response>
```

</details>
このコードは、確認する対象のプリフィックスに合わせて作成できます。ここでのオブジェクティブは、特定の場所に基づいて応答を変えることです。

## 動作を検証

関数を[**Save**]すると、サーバーに展開されたかを確認できます。

着信番号\[incoming number](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>)に移動して、[**Call comes in**]セクションで[**Function**]を選択し、次に関数の[**Prefix Checker**]を選択します。

対象のプリフィックスに一致する番号を使用し、着信通話をかけます。メッセージが流れます。次に、対象のプリフィックスに一致しない番号から着信通話をかけます。

ここで確認しましょう。確認する**prefix**を入力し、[**HACK**]ボタンを押します。

このバリアを克服しましょう。