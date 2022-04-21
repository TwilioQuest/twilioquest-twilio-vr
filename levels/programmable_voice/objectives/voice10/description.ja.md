# この\<Dial>を11へ

自分の電話番号\[your phone number\](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>)を設定し、着信通話を`+19473334160`に転送します。今回は、`<Dial>`タグ([docs](https://www.twilio.com/docs/voice/twiml/dial))を使用します。これまで**コードエディタ**に参考となるアプリケーションのスタブを提供してきました。しかし今回は、みなさんが自分でより多くのブランクを埋められるかどうかを確認しましょう。自分のコードまたはTwiML Binを使用し、この課題を完了することもできます。

検証に合格するには、電話番号の音声URL\[phone number's voice URL](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>)が、`Dial`タグを使用するTwiMLを返し、着信を`+19473334160`へ転送する必要があります。それには、この特定の番号をダイヤルします。アプリの準備をし、[*HACK*]ボタンを押します。

**注記:** トライアルアカウントが呼び出せるのは[検証済みの番号](https://www.twilio.com/console/phone-numbers/verified)に限られます。ただし、TwiMLを返すアプリを記述し、この課題をクリアすることもできます。