# \<Gather>の循環

`<Gather>`タグ([docs](https://www.twilio.com/docs/voice/twiml/gather))を使用し、[DTMF](https://www.twilio.com/docs/glossary/what-is-dtmf)トーン(キーパッドのタッチトーン)でユーザー入力を収集します。入力を収集した後、`<Gather>`タグの`action`&nbsp;URLにより返されたTwiMLは、`<Say>`タグでユーザーにより入力された`Digits`を**繰り返す**必要があります。

**コードエディタ**でこの行動を実装したコードが提供されます。エディタで<em><i class="fa fa-play"></i></em>を押し、アプリケーションを実行します。また、この課題の完了には、関数、TwiML Bin、または自分のコードも使用できます。電話番号が設定されている\[your phone number is configured](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>)かを必ず確認し、適切なURLを使用してください。