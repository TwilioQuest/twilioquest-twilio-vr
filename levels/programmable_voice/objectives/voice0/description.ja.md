# 世界中からの通話に挨拶

[Programmable Voice API](https://www.twilio.com/docs/voice)を使用する最初のタスクは、Twilio番号を設定\[configure your Twilio number\](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>)し、着信通話に応答することです。電話番号に着信があると、Twilioは電話番号設定ページで指定\[specify in your phone number configuration page\](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>)したURLにHTTPリクエストを送信します。そのURLは、着信通話の処理方法をTwilioに指示する[TwiML](https://www.twilio.com/docs/voice/twiml)をレスポンスとして返す必要があります。

このオブジェクティブでは、[TwiML Bin](https://www.twilio.com/console/twiml-bins)を使用し、`<Say>`&nbsp;TwiMLタグを使用するTwiMLを記述して([docs](https://www.twilio.com/docs/voice/twiml/say)）発信者に`"Hello World!"`と音声で返信します。Twilio番号を設定\[Configure your Twilio number\](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>)し、このTwiML Binを使用して着信通話を処理します。

次に、実際にハローと言い、経験値を獲得します。