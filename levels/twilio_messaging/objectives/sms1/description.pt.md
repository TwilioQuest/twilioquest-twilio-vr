# Gritar de volta

Para liberar essa barreira, você precisará enviar uma mensagem de resposta de um número em sua conta da Twilio (usando [TwiML](https://www.twilio.com/docs/sms/twiml)) que contenha o texto "regras do TwilioQuest". Depois de fazer isso, clique no botão *HACK* à direita.

O TwilioQuest examinará as últimas 100 mensagens enviadas de sua conta e procurará uma **mensagem de resposta TwiML** (NÃO uma mensagem de API de saída) que contenha o texto **"regras do TwilioQuest"**. Se encontrarmos um, você será vitorioso!