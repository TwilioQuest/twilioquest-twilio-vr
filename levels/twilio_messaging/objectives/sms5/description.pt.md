# Estive lá, fiz isso

Ao receber um SMS no número da Twilio, você pode dizer ao Twilio como deseja responder usando o [TwiML](https://www.twilio.com/docs/sms/twiml). Você pode gerar o TwiML dinamicamente a partir do seu próprio servidor, mas também pode usar um [TwiML Bin](https://www.twilio.com/console/twiml-bins) para configurar rapidamente instruções para respostas que não precisam de muita lógica de back-end.

Para concluir este objetivo, [configure seu número Twilio](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) para usar um TwiML Bin para enviar uma resposta simples usando a tag TwiML `<Message>`. O conteúdo da mensagem pode ser qualquer coisa que você queira. Depois de configurar seu número para responder a mensagens recebidas usando as instruções do TwiML Bin, clique no botão *HACK*. Verificaremos seu número para garantir que ele esteja funcionando!