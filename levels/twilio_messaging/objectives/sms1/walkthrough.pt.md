# Como a Twilio usa webhooks

A Twilio usa um mecanismo de retorno de chamada chamado [webhooks](https://www.twilio.com/docs/glossary/what-is-a-webhook) para informar ao seu aplicativo que um de seus números recebeu uma mensagem SMS de entrada. A Twilio enviará uma solicitação HTTP POST ou GET para um URL que você especificar com um corpo POST ou parâmetros de consulta que contenham [informações sobre o texto recebido](https://www.twilio.com/docs/sms/twiml#twilios-request-to-your-application), como o número de origem e o conteúdo da mensagem.

Isso parece familiar? É porque você está trabalhando com webhooks para lidar com mensagens SMS recebidas! Quando você selecionou um TwiML Bin ou Twilio Function em **UMA MENSAGEM É RECEBIDA**, estava configurando a Twilio para enviar uma solicitação para um URL específico em segundo plano.

### Configurar um URL de webhook

A primeira etapa para receber um SMS de entrada é configurar um URL que a Twilio solicitará quando um de seus números de telefone receber um texto de entrada. Localize [seus números de telefone programáveis no console ](https://www.twilio.com/console/phone-numbers/incoming) e clique em um deles para configurá-lo.

<center>
  <img src="images/programmable_sms/active-numbers.png" />
</center>
Na página de configuração do número de telefone, role para baixo até a seção **Messaging** (Mensagens) de configuração. Procure o rótulo A MESSAGE COMES IN (UMA MENSAGEM É RECEBIDA) ao lado de dois menus suspensos.

<center>
  <img src="images/console/sms_webhooks.png" />
</center>
Vamos detalhar o que você pode fazer aqui pelos números.

1. Selecione uma opção para lidar com mensagens de entrada. Para este exercício, queremos webhooks, mas existem muitas outras formas de lidar com SMS de entrada, as quais exploraremos em outro momento.

2. Novamente, selecione “Webhook”, mas, como vimos, há outras maneiras de lidar com a solicitação HTTP que a Twilio envia ao seu aplicativo, como TwiML Bins e Functions.

3. Aqui, configure o URL para o aplicativo no lado do servidor. Ele deve ser um URL público para o qual a Twilio pode enviar uma solicitação HTTP. Não sabe como fazer isso quando seu código está em execução no notebook? Continue lendo, ajudaremos você com isso.

4. Configure um método HTTP que a Twilio usará ao enviar a solicitação. Pode ser GET ou POST. As solicitações GET receberão dados sobre a mensagem de entrada como [parâmetros de consulta](https://en.wikipedia.org/wiki/Query_string). As solicitações POST conterão um [corpo POST codificado por URL](https://stackoverflow.com/questions/14551194/how-are-parameters-sent-in-an-http-post-request).

### Escreva o código do lado do servidor para lidar com a solicitação webhook da Twilio

Em seguida, vamos ver como escrever um código que lida com a solicitação webhook de entrada da Twilio. Quando alguém envia SMS para seu número de telefone Twilio, a Twilio já sabe que deve procurar instruções TwiML no URL do webhook. (Anteriormente, a Twilio era orientada a procurar essas instruções em um URL em que havíamos configurado um TwiML Bin ou Function.) É aqui que você pode escrever seu próprio aplicativo da Web para lidar com as solicitações e gerar o TwiML de seus sonhos.

Você pode lidar com essas solicitações da Twilio usando qualquer linguagem de programação ou estrutura que aceite solicitações HTTP e renderize XML em resposta (assim como todas elas). Seu aplicativo da Web deve fazer algumas coisas:

1. Controlar a solicitação de entrada e encaminhá-la adequadamente para uma função
2. Retornar o TwiML (TwiML “bruto” ou usar uma [biblioteca auxiliar do lado do servidor](https://www.twilio.com/docs/libraries) para gerá-lo com chamadas de função)

Se você optar por usar o QuestIDE, receberá um exemplo de código que responde com TwiML em Node.js (usando a estrutura [Express](https://expressjs.com/) da Web) que se parece com isso:

```js
const http = require('http');
const express = require('express');
const { urlencoded } = require('body-parser');

// Set up our express web application
const PORT = 8767;
const app = express();
app.use(urlencoded({ extended: false }));

// Create a route to handle incoming SMS messages
// This is where the magic happens!
app.post('/sms', (request, response) => {
  console.log(
    `Incoming message from ${request.body.From}: ${request.body.Body}`
  );
  // Here, we're writing and returning raw TwiML
  response.type('text/xml');
  response.send(`
    <Response>
      <Message>I'm busy questing right now!</Message>
    </Response>
  `);
});

// Create and run an HTTP server which can handle incoming requests
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Express server listening on localhost:${PORT}`);
});
```

## Utilização de uma linguagem e uma estrutura diferentes

Se você preferir não usar o QuestIDE, temos tutoriais que mostram como lidar com SMS de entrada em muitas linguagens de programação conhecidas. Você ainda pode completar este desafio, estará apenas usando seu próprio editor/IDE fora do TwilioQuest!

- [C# / .NET](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-csharp)
- [Java](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-java)
- [Python](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-python)
- [PHP](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-php)
- [Ruby](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-ruby)
- [Node.js (usando seu próprio Node, não QuestIDE)](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-node-js)

Por exemplo, veja como seria um pequeno aplicativo da Web [Flask](http://flask.pocoo.org/) do Python criado para responder a uma mensagem de entrada:

```
from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse

app = Flask(__name__)

# Create a route to handle incoming SMS messages
# This is where the magic happens!
@app.route("/sms", methods=['GET', 'POST'])
def sms_ahoy_reply():
    print(f'Incoming message from {request.values.get("From")}: ${request.values.get("Body")}')

    # Here, we're generating TwiML using the Python helper library
    resp = MessagingResponse()
    resp.message("I'm busy questing right now!")

    return str(resp)

if __name__ == "__main__":
    app.run(port=8767)
```

### O aplicativo no meu notebook não tem um URL! Preciso implantar meu código na Internet apenas para testar isso?

Bem, você poderia implantar um aplicativo da Web em [Heroku](https://www.heroku.com/), [Digital Ocean](https://www.digitalocean.com/) ou [Azure](https://azure.microsoft.com/en-us/) muito facilmente. Mas esse não é o fluxo de trabalho ideal. Por isso recomendamos uma ferramenta chamada [ngrok](https://ngrok.com/) para o desenvolvimento local com webhooks.

Em poucas palavras, o ngrok permite que você dê um URL público ao aplicativo da Web em execução em seu notebook. Assim, você pode utilizar o seu URL ngrok na configuração do seu webhook Twilio. O cliente ngrok em seu computador de desenvolvimento encaminhará essas solicitações para qualquer aplicativo/porta local que você especificar.

Consulte a [documentação do ngrok](https://ngrok.com/docs) para obter orientações sobre como configurá-lo em seu computador. Há também uma [publicação útil do blog da Twilio sobre como usar o ngrok](https://www.twilio.com/blog/2015/09/6-awesome-reasons-to-use-ngrok-when-testing-webhooks.html). Sua interface de linha de comando simples deve funcionar para encaminhar solicitações webhook para qualquer tipo de aplicativo. O ngrok poderá ajudá-lo a dar ao seu webhook um URL público, não importa se você quer escrever seu próprio código ou usar o IDE incorporado.