# Aplicativo internacional de mistério

Para triunfar neste objetivo, você deve adicionar o atributo `language` à tag `<Say>` ([documentos](https://www.twilio.com/docs/voice/twiml/say#attributes-language)). Suas mensagens de conversão de texto em fala irão interpretar o texto usando o idioma correto.

Configure o TwiML que você está usando para [seu número de telefone](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) para retornar uma tag `<Say>` que usa um valor válido para o atributo `language`. Você pode testá-lo (para espanhol) usando o texto `hola, mundo`. Você pode especificar `es-US` como o atributo de idioma. Você também pode considerar tentar atributos `voice` diferentes, como `Polly.Miguel` que usa o [Amazon Polly](https://www.twilio.com/docs/voice/twiml/say/text-speech#amazon-polly) para conversão de texto em fala.

Depois de configurar seu número com um novo idioma, clique no botão *HACK*.