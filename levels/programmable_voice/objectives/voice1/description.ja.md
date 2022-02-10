# 注意が必要なハンドラー

このオブジェクティブを完了するには、自分の電話番号を設定\[configure your phone number](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>)し、プライマリハンドラーが失敗した場合に備え、音声通話のためのフォールバックハンドラーを準備します。備えあれば憂いなしです。

[TwiML Bin](https://www.twilio.com/console/twiml-bins)は、便利で信頼できるバックアッププランです。TwiMLで`<Say>` TwiMLタグを使用し、発信者に対し、アプリで少々問題が発生していることを音声応答で示します。電話番号に信頼できるバックアップを設定し、[*HACK*]ボタンをクリックします。すべて順調に進めば、<i>みなさんに</i>経験値を差し上げます。