# クールなMustache(口ひげ）

[Mustache](https://mustache.github.io/)テンプレートを使用し、TwiML Binのコンテンツをさらにダイナミックにすることができます。[Twilio Voice Webhookリクエストで送信された標準パラメーター](https://www.twilio.com/docs/voice/twiml#request-parameters)と、TwiML BinのURLに追加された[クエリ文字列パラメーター](https://en.wikipedia.org/wiki/Query_string)をテンプレートで使用できます。この課題を克服するには、`<Say>`タグを使用して動的なメッセージを読み上げるTwiML Binを、次の形式で作成します。

<pre>
Hello! You are calling from {insert the caller phone number here}.
</pre>
参考: `From`変数は、テンプレートで使用できる動的な値の1つです。発信者の電話番号が入っています。\[自分の電話番号](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>)の音声URLのTwiML Binがこれを実行し、[*HACK*]ボタンを押します。