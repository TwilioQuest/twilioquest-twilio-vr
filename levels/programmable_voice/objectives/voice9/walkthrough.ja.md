# スピーチの自由

この宝箱を開くため、DTMFトーンの収集とは対照的に、スピーチを使用し、発信者からの入力を収集します。スピーチは、インタラクティブ音声応答、IVR、システムを使用し、ユーザーフレンドリーなハンズフリーアプローチを提供します。

いくつかの追加パラメーターにより、スピーチの`<Gather>`(収集)が可能になります。

## input

`<Gather>`で使用可能なパラメーターの名前は`input`です。デフォルトは`dtmf`です。これを`speech`に設定できます。もしくは`dtmf speech`に設定し、両方を承認できます。

ユーザーから入力を収集するとき、使用可能なオプションをユーザーに通知することが理想的です。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather input="speech" action="https://is-a-hotdog.net/sandwich.php">
        <Say>A hotdog is a sandwich. Is this statement true? Please answer yes or no.</Say>
    </Gather>
</Response>
```

発信者の発話が5秒間途切れた場合、`<Gather>`は関連する`action`にポストします。そのポストには、`SpeechResult`フィールドの値が含まれます。これには音声リクエストのトランスクリプトが格納されています。

## hints

アプリケーションのフローを支援するため、`hints`を含めることが有効です。これにより、`<Gather>`は、発信者がおそらく発言するであろう内容を判定できます。ヒントはコンマにより区切ります。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather input="speech" hints="monday,tuesday,wednesday,thursday,friday">
        <Say>Which day of the week is your favorite? You can say any day of the week Monday thru Friday.</Say>
    </Gather>
</Response>
```

この例は、これらの特定の用語の認識を支援するものです。発信者は他のことを言うこともできますが、これによりアプリケーションが予測するモデルの設定が支援されます。

## TwiMLの記述

`input`と`hints`について学習し、必要なTwiML部分を作成する準備が整いました。TwiMLを作成するため、まず新しい[TwiML Bin](https://www.twilio.com/console/runtime/twiml-bins)を作成します。その後、次のプロンプトから情報を収集するためのコードを記述します。

**何を実行したいですか?hours、reset、agentなどに関する音声発信が可能です。**

ヘルプが必要な場合はスポイラーをチェックしてください。できました!

<details>
    <summary>スポイラー: TwiML Binソリューション</summary>
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather input="speech" hints="hours,reset,agent">
        <Say>What would you like to do? You can say things like: hours, reset, or agent.</Say>
    </Gather>
</Response>
```

注記: 応答を処理する`action`を、まだ構築していません。これを次に行います。

</details>
## アクションの処理

この宝箱を完了するため、Twilioからのリクエストを処理します。その方法の1つが、関数のようなサーバー不要のソリューションを使用する方法です。まず、[新しい関数を作成し](https://www.twilio.com/console/runtime/functions/manage)、_Blank_テンプレートを選択します。

今回のコンセプトは、何が送信されたかを調べるというものです。この値は`event.SpeechResult`で見つかります。一般的なソリューションでは、この値の`switch`[ステートメント](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)を使用し、その次に各ケースを個別に処理します。

以下に、それぞれの結果で何が起こるかを示します。

_reset_: `<Say>` "Your pin has been reset" _hours_: `<Say>` "Our hours are 9 to 5" _agent_: `<Say>` "Connecting you to our next available agent"

関数を記述した後、**保存**してURLを**コピー**し、`<Gather>`の`action`パラメーターに**貼り付け**ます。注記: 関数をデバッグする場合、`console.log`ステートメントを使用すると、FunctionページのLogsセクションにメッセージが格納されます。これはスピーチを取り扱う際に便利です。

関数の記述にヘルプが必要ですか?スポイラーをチェックしてください。

<details>
    <summary>スポイラー: 関数ソリューション</summary>
```javascript
exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  switch (event.SpeechResult.toLowerCase()) {
    case 'agent':
      twiml.say('Here is an agent');
      break;
    case 'hours':
      twiml.say('Our hours are 9 to 5');
      break;
    case 'reset':
      twiml.say('We have reset your pin');
      break;
    default:
      console.log(
        `I heard ${event.SpeechResult} at a confidence rating of ${Math.round(
          event.Confidence * 100
        )} percent`
      );
  }
  callback(null, twiml);
};
```

注記: `console.log`は`switch`ステートメントの`default`ブランチにあるため、他のすべてのオプションが失われたときにのみ実行されます。

</details>
## 動作を検証

自分の着信電話番号\[incoming phone number(\<%= env.TQ_TWILIO_NUMBER.value %>)](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>)を自分のTwiML Binに関連付け、電話をかけてみます。次にそれぞれのオプションで返答します。どの場合も正しい返答が行われましたか?何か問題がある場合は、ログをチェックし、トランスクリプションを確認してください。

満足の行く結果が得られた場合は、[HACK]ボタンを押します。