# Como enviar uma mensagem SMS

Neste ponto, presumimos que você concluiu seu Treinamento básico e configurou sua conta da Twilio e o número de telefone Twilio durante esse processo. Agora chegou a hora de colocar tudo isso em prática e enviar uma mensagem de texto. A Twilio fornece uma [API RESTful](https://www.twilio.com/docs/sms/api) que possibilita o envio de mensagens SMS de forma programática (e a realização de muitas outras coisas úteis).

Para passar por essa barreira, você precisará usar a API da Twilio para enviar uma mensagem de texto e recuperar o ID exclusivo da mensagem enviada.

## Lembre-me: o que é mesmo uma API?

A Twilio fornece uma API que possibilita o envio de mensagens de texto de forma programática, mas o que é uma API? [API](https://www.twilio.com/docs/glossary/what-is-an-api) significa “Application Programming Interface”.

Uma analogia simples para uma API é um garçom em um restaurante. A API é o garçom, a cozinha é o serviço (Twilio) e o cliente é o cliente/consumidor da API (seu código). Em um restaurante, o cliente pede um prato ao garçom e o garçom leva para a cozinha a solicitação a ser atendida. O cliente não tem ideia de como o prato foi preparado. Tudo o que ele quer é o alimento conforme solicitado. Da mesma forma, seu código fará uma solicitação por meio da API da Twilio para algum recurso, nesse caso, criando uma mensagem de texto de saída em seu nome. A Twilio deixou de lado todas as complexidades do envio de uma mensagem.Tudo o que você precisa fazer é dizer à API que deseja enviar uma mensagem SMS.

Você escreve um código para interagir com a API da Twilio fazendo solicitações HTTP a determinados pontos de extremidade para criar, ler, atualizar ou excluir recursos de mensagem.

## De quais informações preciso para enviar uma mensagem SMS?

Ao fazer uma solicitação de API para a Twilio, além de passar a você nossas credenciais de autenticação, precisamos fornecer pelo menos três parâmetros:

- **Body (Corpo):** O texto exato da mensagem que queremos enviar.
- **To (Para):** O número de telefone para o qual você quer enviar a mensagem. Se você estiver usando uma conta de avaliação, este deve ser um dos [números de telefone verificados](https://www.twilio.com/console/phone-numbers/verified).
- **From (De):** O número de telefone programável do Twilio do qual a mensagem será enviada. Você pode usar um número de telefone configurado anteriormente (verifique a IU de **Configurações**) ou [qualquer número de telefone Twilio compatível com SMS que você tenha](https://www.twilio.com/console/phone-numbers/incoming).

## Como fazer uma solicitação de API

Você pode fazer uma solicitação à [API REST da Twilio](https://www.twilio.com/docs/sms/api) em qualquer ambiente de programação ou ferramenta que ofereça suporte a solicitações HTTP. A Twilio fornece uma variedade de [bibliotecas auxiliares](https://www.twilio.com/docs/libraries) do lado do servidor para muitas linguagens de programação comuns que facilitam esse processo.

Para enviar uma mensagem SMS, você interage com o [recurso de mensagem](https://www.twilio.com/docs/sms/api/message-resource). O envio de uma solicitação HTTP POST para esse endpoint da API resultará na criação (e envio) de uma nova mensagem.

O seguinte comando [cURL](https://curl.haxx.se/docs/manual.html) (quando configurado com os parâmetros necessários em vez de espaços reservados) envia uma mensagem da sua conta.

```
curl -X POST https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages.json \
--data-urlencode "From=+15017122661" \
--data-urlencode "Body=Body" \
--data-urlencode "To=+15017122661" \
-u ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_auth_token
```

A documentação da Twilio contém [amostras de código para muitas linguagens de programação](https://www.twilio.com/docs/sms/api/message-resource#create-a-message-resource), mostrando como é possível enviar mensagens SMS usando a biblioteca auxiliar do Twilio para esse ambiente. Veja um [exemplo usando nossa biblioteca auxiliar do Python](https://www.twilio.com/docs/sms/api/message-resource?code-sample=code-create-a-message&code-language=Python&code-sdk-version=6.x):

```python
from twilio.rest import Client

# Your Account Sid and Auth Token from twilio.com/console
account_sid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
auth_token = 'your_auth_token'
client = Client(account_sid, auth_token)

message = client.messages.create(
    from_='+15017122661',
    body='body',
    to='+15558675310'
)

print(message.sid)
```

Compare os exemplos do cURL e do Python acima. Essas amostras parecem diferentes porque a sintaxe varia de uma linguagem para outra, mas o conceito da API principal é o mesmo. Em cada um, estamos criando e enviando uma mensagem fazendo uma solicitação POST para o endpoint de mensagens da API da Twilio com três parâmetros: um número `from`, um número `to` e um texto `body`.

Se você usar o QuestIDE, uma amostra de código editável [Node.js](https://nodejs.org/) será carregada para você, preenchida previamente com a maioria dos parâmetros necessários da configuração do TwilioQuest.

## Concluindo o desafio

Ao fazer a solicitação de API, o SID da mensagem será um dos dados que a solicitação devolve. Copie esse valor e cole-o na interface de hack à direita. Quando você clica no botão *HACK*, o TwilioQuest consultará sua conta da Twilio e confirmará a existência dessa mensagem. Se existir, você ganhou!