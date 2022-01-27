# Como enviar mensagens MMS de saída

Observação: Esta orientação destina-se somente a números de telefone dos EUA e do Canadá.

Você pode usar a [API RESTful](https://www.twilio.com/docs/sms/api) da Twilio para enviar um MMS de saída, assim como fez quando enviou sua primeira mensagem SMS. Para abrir esse baú, você seguirá as mesmas etapas que usou para enviar uma mensagem SMS, dessa vez com um acréscimo muito importante: _o URL da mídia que você deseja enviar_.

## O que preciso para enviar uma mensagem MMS?

Assim como fez quando enviou uma mensagem SMS, você autenticará a solicitação enviada à API da Twilio. Ao fazer a solicitação, você passará três parâmetros:

- **MediaUrl (e/ou corpo):** O Twilio precisa de algum conteúdo para enviar em sua mensagem: um MediaUrl, um corpo ou ambos! Você precisa informar à API da Twilio onde encontrar a imagem que deseja enviar no MMS, e deve fazer isso passando um [MediaUrl (imagem)](https://www.twilio.com/docs/sms/api/message-resource#create-a-message-resource).
- **To (Para):** O número de telefone para o qual você quer enviar a mensagem. Se você estiver usando uma conta de avaliação, este deve ser um dos [números de telefone verificados](https://www.twilio.com/console/phone-numbers/verified).
- **From (De):** O número de telefone programável do Twilio do qual a mensagem será enviada. Você pode usar um número de telefone configurado anteriormente (verifique a IU de **Configurações**) ou [qualquer número de telefone compatível com SMS que você tenha](https://www.twilio.com/console/phone-numbers/incoming).

## Como fazer uma solicitação de API

É você quem decide como será enviada a solicitação à API da Twilio. Você pode usar uma das [bibliotecas auxiliares](https://www.twilio.com/docs/libraries) do Twilio ou o seguinte comando [cURL](https://curl.haxx.se/docs/manual.html), substituindo suas próprias credenciais e URL de mídia:

```
curl -X POST'https://api.twilio.com/2010-04-01/Accounts/AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages.json' \
--data-urlencode "From=+15017122661" \
--data-urlencode "To=+15017122661" \
--data-urlencode 'MediaUrl=https://i.ytimg.com/vi/U_JbTHp6uzI/maxresdefault.jpg' \
-u AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:[AuthToken]
```

Veja como seria usar a [biblioteca auxiliar do Python](https://www.twilio.com/docs/sms/tutorials/how-to-send-sms-messages-python):

```python
from twilio.rest import Client

# your account sid and auth token from twilio.com/console
account_sid = 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
auth_token = 'your_auth_token'
client = Client(account_sid, auth_token)

message = client.messages.create(
    media_url="https://i.ytimg.com/vi/U_JbTHp6uzI/maxresdefault.jpg",
    body="Why isn't that an API?",
    from_="+15017122661",
    to="+15558675310"
)

print(message.sid)
```

Se você usar o QuestIDE, uma amostra de código [Node.js](https://nodejs.org/) editável será carregada para você. No entanto, os parâmetros não serão pré-carregados, de modo que, desta vez, você precisará preencher os parâmetros por conta própria.

## Abrindo o baú

Ao fazer a solicitação de API, você receberá uma mensagem SID para o MMS. É possível afirmar que é um MMS quando começar com _MM_. Copie o SID do MMS e insira-o na interface de hack. Depois de clicar em `HACK`, o TwilioQuest analisará sua conta da Twilio e verificará se a mensagem com esse SID contém um MediaUrl.