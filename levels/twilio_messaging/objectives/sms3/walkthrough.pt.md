# Configuração de retornos de chamada de status para mensagens

Quando você envia uma mensagem com o Twilio, como um SMS de saída ou uma resposta a um SMS de entrada, também pode especificar um atributo `action` com o uso do verbo `<Message>` no TwiML, que aponta para um URL de webhook. Quando o status da mensagem muda de “Enviado” para “Entregue”, por exemplo, o Twilio fará uma solicitação para o URL de webhook de status que você definiu. O código em execução nesse URL pode realizar uma variedade de ações com base na solicitação que o Twilio envia sempre que o status da mensagem muda.

## Quais são os status de mensagem?

Alguns dos status de mensagem que você pode encontrar são:

- Sent (**Enviado)**: A operadora upstream mais próxima aceitou a mensagem.
- Delivered (**Entregue)**: O Twilio recebeu a confirmação da entrega da mensagem da operadora upstream e, quando disponível, o aparelho de destino.
- Failed (**Com falha)**: A mensagem não pôde ser enviada por [várias razões](https://www.twilio.com/docs/sms/api/message-resource#delivery-related-errors).

Você pode ver os outros status na [página referência da API](https://www.twilio.com/docs/sms/api/message-resource#message-status-values).

## Como configurar o URL de retorno de chamada de status

Vimos como configurar uma rota em um aplicativo da Web para responder a uma mensagem SMS de entrada em seu número de telefone Twilio. Agora precisamos configurar uma segunda rota, que irá lidar com as solicitações de entrada do Twilio quando houver uma atualização sobre o status da sua mensagem de resposta.

O código que é executado na função correspondente pode fazer o que você quiser. Para passar por essa barreira, você precisará inserir o `MessageSid` e o último status recebido. Onde você pode encontrar essas informações? Na `request` que o Twilio enviar ao seu aplicativo!

Lembre-se de que o Twilio envia uma solicitação ao URL de retorno de chamada de status sempre que tem uma atualização sobre o status de entrega da sua mensagem. A solicitação conterá os parâmetros de solicitação padrão do Twilio, bem como [alguns parâmetros adicionais relacionados ao status](https://www.twilio.com/docs/sms/api/message-resource#statuscallback-request-parameters). Você pode acessá-los analisando o `request.body`. No Node.js, isso se parece com o `request.body.MessageStatus` com e com o `request.body.MessageSid`.

Se eu quisesse imprimir isso, ficaria mais ou menos assim no Node.js e no Express:

```
app.post('/status', (request) => {
  console.log(`Message SID ${request.body.MessageSid} has a status of ${request.body.MessageStatus}`);
});
```

E, em um aplicativo Flask do Python, ficaria assim:

```
...
@app.route("/status", methods=["GET", "POST"])
def my_status_function():
    print(f"Message SID {request.values.get('MessageSid')} has a status of {request.values.get('MessageStatus')}")
```

## Usando o atributo `action` do TwiML

Quando você cria uma mensagem com TwiML, pode usar o atributo `action` para especificar um URL de webhook. Um atributo fica dentro das tags `<...>` dos verbos da mensagem e oferece mais informações ao Twilio sobre como enviar a mensagem em seu nome. O Twilio fará uma solicitação para esse URL à medida que sua mensagem caminha para seu destino.

```
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message action="https://your_url_here.com/status">Hello, World!</Message>
</Response>
```

_Observação_: Não é necessário definir o atributo `action` para o URL completo se seu aplicativo também contiver a rota `status_callback`. O verbo de sua `<Message>` pode ser mais ou menos assim: `<Message action="/status">Hello, World!</Message>`

O URL de retorno de chamada de status deve apontar para algum código que trata dessas atualizações de status. (Dica: Neste exemplo, essa deve ser a rota que você configurou para as atualizações de status!)

## Concluindo o desafio

No QuestIDE, o seu próprio código ou um TwiML Bin responde a uma mensagem de entrada. Desta vez, você deverá obrigatoriamente incluir o atributo `action` no verbo da `<Message>` que você usa para responder.

Se você usar o QuestIDE, o esqueleto simples do aplicativo da Web do [Express.js](https://expressjs.com/) foi configurado. Você precisará preencher:

1. A nova rota para o URL de retorno de chamada de status (dica: talvez algo parecido com `/status`)
2. O TwiML de mensagens para responder ao SMS de entrada com o atributo `action`
3. O corpo da função que será chamada quando o Twilio enviar um pedido para o seu URL de `status_callback` e imprimir o `MessageSid` e o `MessageStatus`

Assim que você clicar em `RUN`, seu aplicativo da Web será iniciado. Ao enviar um texto para o número de telefone Twilio, você verá a solicitação do Twilio para o aplicativo no console. E assim que seu aplicativo enviar de volta a resposta, o código que manipula a solicitação deve imprimir cada atualização de status que seu webhook recebe do Twilio! Copie o SID da mensagem e lembre-se da última atualização de status recebida para que você possa inseri-la na interface do `HACK`.