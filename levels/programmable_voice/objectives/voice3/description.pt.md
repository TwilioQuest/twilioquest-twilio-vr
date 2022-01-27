# Você pode dizer isso novamente

Às vezes, você precisa repetir para ser ouvido. Isso também se aplica a quando você está criando um aplicativo de voz. A tag `<Say>` tem um atributo `loop` ([documentos](https://www.twilio.com/docs/voice/twiml/say#attributes)) que você pode usar para repetir uma mensagem várias vezes.

O objetivo aqui é configurar o aplicativo TwilML que você está usando [para seu número de telefone](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) para usar a tag `<Say>` e o atributo `loop` juntos.  Atenda às chamadas recebidas dizendo `"Anything worth doing is worth doing twice."` duas vezes. Especificamente, você deve definir o atributo `loop` como `2`.

**Você conseguiu! Você conseguiu!**