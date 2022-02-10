# エラーが発生しました...フォールバックしましょう!

安全こそ大切です。同様に、SMSアプリケーションにはバックアッププランも大切です。Twilioからの着信SMSメッセージを処理するURLに問題がある場合は、**フォールバックハンドラー**を構成して、ユーザーが自分の番号にテキストメッセージを送信したときに引き続き返信を受信できるようにすることができます。

Twilio番号を設定\[Configure your Twilio number\](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>)し、フォールバックハンドラーを設定します。**「PRIMARYHANDLERFAILS」**というテキストの下に、設定するオプションが表示されます。[TwiML Bin](https://www.twilio.com/console/twiml-bins)は、静的フォールバック応答のための便利で信頼性の高いソリューションです。

フォールバックハンドラーを、Messaging TwiMLを返すURLに設定したら、[*HACK*]ボタンをクリックして報酬を受け取ります。