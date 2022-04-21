# ミステリーに満ちたインターナショナルなアプリ

このオブジェクティブを達成するには、`<Say>`タグに`language`属性を追加します([docs](https://www.twilio.com/docs/voice/twiml/say#attributes-language))。次に、TTS(テキストを音声に変換)するメッセージは、適切な言語を使用し、テキストを解釈します。

使用しているTwiMLアプリを\[自分の電話番号\](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>)用に設定し、`<Say>`タグを返すようにします。このタグは、`language`属性の有効な値を使用します。スペイン語のテストには、`hola, mundo`を使用できます。language属性として、`es-US`を指定できます。また、音声合成(TTS)機能に別の`voice`属性を試すこともできます。例えば、[Amazon Polly](https://www.twilio.com/docs/voice/twiml/say/text-speech#amazon-polly)を使用する`Polly.Miguel`などです。

新しい言語を用いて番号を設定し、[*HACK*]ボタンをクリックします。