# もう一度言う

時には、聞いてもらうために、何度も繰り返す必要があります。これは音声アプリケーションの構築でも同様です。`<Say>`タグには`loop`属性([docs](https://www.twilio.com/docs/voice/twiml/say#attributes)）があり、これを使用し、メッセージを複数回繰り返すことができます。

ここでのオブジェクティブは、使用しているTwiMLアプリを\[自分の電話番号用](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>)に設定し、`<Say>`タグと`loop`属性を一緒に使用することです。  着信通話に対し、`"Anything worth doing is worth doing twice."`と2回言って応答します。具体的にいうと、`loop`属性を`2`に設定します。

**できました!できました!**