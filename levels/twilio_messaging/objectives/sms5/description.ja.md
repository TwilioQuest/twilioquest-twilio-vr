# TwiML Binでできること

Twilio番号への着信SMSを受信すると、[TwiML](https://www.twilio.com/docs/sms/twiml)を使用してどのように応答するかをTwilioに伝えることができます。独自のサーバーから動的にTwiMLを生成できますが、[TwiML Bin](https://www.twilio.com/console/twiml-bins)を使用し、多くのバックエンドロジックを必要としない応答の命令を素早く設定することもできます。

このオブジェクティブを完了するには、Twilio番号を設定\[configure your Twilio number](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>)してTwiML Binを使用し、`<Message>` TwiMLタグの使用により単純な応答を返送します。メッセージは好みの内容にできます。TwiML Binの指示を使用して着信メッセージに応答するように番号を設定したら、[*HACK*]ボタンをクリックします。番号をチェックして機能していることを確認します!