# 成功のためのPIN設定

この宝箱をこじ開けるため、PINエントリーシステムに対して、より配慮の行き届いたユーザー体験をデザインします。ユーザー体験は重要です。みなさんは、発信者に期待することを明確に記した手順書を提供したいと考えています。入力する数字の桁数を発信者に通知するのが最適です。

発信者への通知に加え、`<Gather>`リクエストの入力桁数を制限することも良いアイデアです。これを行うには、`<Gather>`の`numDigits`パラメーターを使用します。

## 制限なし

追加設定のない[`<Gather>`&nbsp;TwiML動詞](https://www.twilio.com/docs/voice/twiml/gather)は、子TwiMLの完了後5秒待機してから、結果を送信します。デフォルトでは、`*`を押すと送信され、待機を回避できます。エンターキーのようなものと考えてください。具体的には、[`finishOnKey`](https://www.twilio.com/docs/voice/twiml/gather#finishonkey)属性を使用してこれを上書きできます。

これを省くには、[`numDigits`](https://www.twilio.com/docs/voice/twiml/gather#numdigits)属性を使用する方法があります。この属性を追加すると、入力がその桁数になるとすぐに`Digits`が送信されます。

## TwiMLの記述

発信者には「4桁のPINを入力してください」という音声で入力を促します。これを行うには、まず新しい[TwiML Bin](https://www.twilio.com/console/runtime/twiml-bins)を作成します。次に、発信者から**正確に**4桁の数字を収集するためのコードを記述します。ヘルプが必要な場合はスポイラーをチェックしてください。できました!

<details>
    <summary>スポイラー: TwiML Binソリューション</summary>
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather numDigits="4">
        <Say>Please enter your four digit pin</Say>
    </Gather>
</Response>
```

</details>
## 動作を検証する

そのTwiML Binを、自分の番号(\[\<%= env.TQ_TWILIO_NUMBER.value %>](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>))の「A call comes in」ハンドラーに関連付けます。その番号に電話をかけ、4桁の番号を入力します。ここで恐ろしい`<Gather>`ループを作成したことに気付くはずです。この原因は、`action`を宣言していないことにあります。この宝箱を恐れる必要はありませんが、actionを宣言していない場合、再びこの問題に対処するときに同じことを繰り返すということを肝に銘じてください。

[**HACK**]ボタンを押し、アイテムを獲得しましょう!