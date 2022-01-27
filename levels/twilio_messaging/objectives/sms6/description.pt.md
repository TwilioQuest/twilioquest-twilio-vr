# Tenho muito no meu modelo agora

Use o recurso [modelos do Mustache](https://www.twilio.com/docs/runtime/tutorials/twiml-bins#nice-mustache) do TwiML Bin para tornar o corpo das mensagens de resposta mais dinâmico. \[Configure seu número da Twilio](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) para usar um TwiML Bin para responder a uma mensagem recebida (se ainda não tiver). Usando modelos no TwiML Bin, o corpo da tag `<Message>` pode ser:

```html
Message from {{From}}: {{Body}}
```

Combine esse recurso com o atributo `to` da tag `<Message>`. Defina `to` como seu próprio número de telefone celular. Agora, qualquer SMS enviado para o seu número da Twilio será encaminhado para o seu número de celular pessoal! Depois de configurar isso, clique no botão *HACK* e vamos confirmar que seu número está pronto para a ação de encaminhamento.