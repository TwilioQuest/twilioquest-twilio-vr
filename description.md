# &lt;Redirect&gt;とは

TwiMLの「<Redirect>」タグ([docs](https://www.twilio.com/docs/sms/twiml/redirect))を使って、メッセージレスポンスの制御を別のURLに渡すことができる。これは、WebアプリからTwiMLを動的に生成し、TwilioにWebhookリクエストを別のルートにリダイレクトさせたい場合によく使われる。

この目的を達成するためには、「<Redirect>」の TwiMLタグを使用するハンドラで[Twilio番号を設定](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>)する必要がある。これには自分のコード、**コードエディター**、[TwiML Bin](https://www.twilio.com/console/twiml-bins)、または[Function](https://www.twilio.com/console/functions/manage)を使用することができる。「<Redirect>」タグを含むTwiMLを返すURLを使って番号を設定したら、*HACK*のボタンをクリックしてください。