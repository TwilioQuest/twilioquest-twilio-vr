# Saia e <Play>

A tag TwiML `<Play>` ([documentos](https://www.twilio.com/docs/voice/twiml/play)) reproduzirá um arquivo de áudio para o autor da chamada. Você pode usar isso para reproduzir músicas em espera ou usar saudações de voz pré-gravadas personalizadas. Para triunfar neste desafio, você deve configurar o aplicativo que está usando com [seu número de telefone](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID? env.TQ_TWILIO_NUMBER_SID.value : '' %>) para usar a tag `<Play>`. Se você precisar de um arquivo de áudio para usar com seu código, podemos sugerir o seguinte?

```bash
http://demo.twilio.com/docs/classic.mp3
```

Se você usar o arquivo de áudio acima, **ligue primeiro para o seu número** para... fins de teste. Quando o URL de voz do seu número retornar TwiML que usa a tag `<Play>`, clique no botão *HACK*.