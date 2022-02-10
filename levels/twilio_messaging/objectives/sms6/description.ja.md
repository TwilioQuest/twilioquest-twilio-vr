# 今テンプレートで得るたくさんのもの

TwiML Binの[Mustacheテンプレート](https://www.twilio.com/docs/runtime/tutorials/twiml-bins#nice-mustache)機能を使用し、返信メッセージの本文をより動的にします。Twilio番号を設定\[Configure your Twilio number\](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>)し、TwiML Binを使用して着信メッセージに応答します(まだ応答していない場合)。TwiML Binでテンプレートを使用すると、`<Message>`タグの本体は次のようになります:

```html
Message from {{From}}: {{Body}}
```

この機能を`<Message>`タグの`to`属性と組み合わせます。`to`を自分の携帯電話番号に設定します。これで、Twilio番号に送信されたSMSはすべて、個人の携帯電話番号に転送されます。これを設定したら、[*HACK*]ボタンをクリックし、番号で転送アクションの準備ができていることを確認します。