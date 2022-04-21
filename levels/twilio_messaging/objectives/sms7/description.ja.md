# Functionsでの「楽しみ」

[Twilio関数](https://www.twilio.com/console/functions/manage)を使用すると、Twilioのインフラストラクチャで実行される[Node.js](https://nodejs.org/en/)コードを記述できます。Functionsを使用すれば、着信メッセージの動的TwiML応答を作成できます。

**ヘルプ**セクションには、SMSベースの[magic 8-ball](https://en.wikipedia.org/wiki/Magic_8-Ball)のサンプルコードが含まれています。このコードを[Twilio Functions](https://www.twilio.com/console/functions/manage)としてデプロイし、\[Twilio番号を設定\](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>)して、この関数を使用して着信メッセージを処理します。magic 8-ball関数をデプロイしてテストしたら、[*HACK*]ボタンをクリックします。間違いなくこの課題を克服できるでしょう。