# 1つの\<Redirect>(リダイレクト)

TwiML`<Redirect>`タグ([docs](https://www.twilio.com/docs/sms/twiml/redirect))を使用し、メッセージ応答のコントロールを別のURLに渡します。これは、Webアプリケーションから動的にTwiMLを生成しており、TwilioにWebhookリクエストを別のルートにリダイレクトさせたい場合に最も役立ちます。

このオブジェクティブを完了するには、`<Redirect>` TwiMLタグを使用するハンドラーで\[Twilio番号を設定\](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>)します。これを行うには、独自のコード、**コードエディタ**、[TwiML Bin](https://www.twilio.com/console/twiml-bins)、または[Function](https://www.twilio.com/console/functions/manage)を使用します。`<Redirect>`タグを含むTwiMLを返すURLを使用して番号を設定したら、[*HACK*]ボタンをクリックすると、正しい方向に向かっている(リダイレクト)ことが確認されます。