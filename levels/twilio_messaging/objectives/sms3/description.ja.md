# メッセージの監視機能

このオブジェクティブでは、`<Message>`タグ([docs](https://www.twilio.com/docs/sms/twiml/message#attributes-action))の`action`属性を使用して着信メッセージの[ステータスコールバック](https://support.twilio.com/hc/en-us/articles/360008989454-Tracking-the-Delivery-Status-of-an-Outbound-Twilio-SMS-or-MMS-Message)を設定するようにお願いします。独自のWebアプリ、**コードエディタ**、または2つの[関数](https://www.twilio.com/console/functions/manage)を使用し、2つのルート/ハンドラーを設定する必要があります。着信メッセージに応答するためにTwilio番号で使用する\[you'll use with your Twilio number\](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>)ものと、返信メッセージの配信ステータスに関するステータスコールバックを受信するために使用するものです。

ステータスコールバックURLハンドラーで、**メッセージSID**と発信応答メッセージの**ステータス**を出力します。これらは、右側の検証入力フィールドに入力する必要がある値です。メッセージSIDとその最終ステータスを取得したら、[*HACK*]ボタンをクリックします。