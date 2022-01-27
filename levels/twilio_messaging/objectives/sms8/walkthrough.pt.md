# O uso do verbo \<Redirecionar>

O TwiML de mensagens tem mais um truque na manga: O verbo `<Redirect>`. Para adquirir o espólio dentro deste baú, você passará o controle de uma resposta de mensagem a uma segunda URL de webhook que também retornará TwiML.

Quando você usa o verbo `<Redirect>` nas instruções do TwiML, está pedindo ao Twilio para fazer outro retorno de chamada HTTP para um URL diferente. (Isso não é o mesmo que encaminhar a mensagem, como vimos com o atributo do verbo `<Message>` `to`.) Assim como o verbo da `<Message>`, o verbo `<Redirect>` vive dentro de um par de tags de `<Response>...</Response>`:

```
<Response>
  <Message>Ahoy there!</Message>
  <Redirect>https://www.foo.com/nextInstructions</Redirect>
</Response>
```

Você pode usar `<Redirect>` para compartimentalizar parte da lógica em sua resposta de mensagem e criar um aplicativo mais complexo. Por exemplo, o primeiro URL (aquele que você definiu no console) pode enviar de volta uma `<Message>` e, em seguida, usar o verbo `<Redirect>` para passar o controle de resposta para um conjunto diferente de instruções do TwiML.

É importante observar que as instruções após `<Redirect>`, incluindo `<Message>`, serão ignoradas porque o controle passa para outro webhook.

## URLs absolutos e relativos

O "substantivo" do verbo `<Redirect>` é um URL para um documento TwiML diferente. A Twilio fará uma solicitação para este URL e espera que o TwiML responda.

O URL pode ser **absoluto**: `<Redirect>http://www.foo.com/nextInstructions</Redirect>`

ou pode ser **relativo** ao URL atual: `<Redirect>/nextInstructions</Redirect>`

## Uso do Twilio Client para `<Redirect>`

Os exemplos que você viu acima usaram TwiML "bruto" com tags do verbo `<Redirect>`. Se você usar uma das bibliotecas auxiliares da Twilio no lado do servidor, poderá chamar um dos métodos integrados para gerar as tags do verbo `<Redirect>` para você. Por exemplo, em Node.js, enviar um texto com "Olá Mundo!" e passar o controle de resposta parece:

```
const MessagingResponse = require('twilio').twiml.MessagingResponse;


const response = new MessagingResponse();
const message = response.message();
message.body('Hello World!');
response.redirect('https://demo.twilio.com/welcome/sms/');

```

No Python, a sintaxe é diferente, mas os resultados são os mesmos:

```
from twilio.twiml.messaging_response import Message, Redirect, MessagingResponse

response = MessagingResponse()
response.message("Hello World!")
response.redirect('https://demo.twilio.com/welcome/sms/')
```

A Twilio é flexível, mas espera que o URL do seu webhook retorne o TwiML. A forma como você gera isso cabe a você. Quando você pratica com o verbo `<Redirect>`, você pode escrevê-lo da maneira que fizer sentido para você (ou mesmo ambas).

## Experimente!

Você tem muitas opções para fazer o `<Redirect>` entre diferentes webhooks possíveis: TwiML Bins, Twilio Functions e seu próprio código hospedado que você escreve no QuestIDE ou em outro aplicativo. Na verdade, tente encadear mais de um. Se você usar um TwiML Bin, poderá gravar TwiML bruto e passar o controle para outro TwiML Bin ou para uma função ou seu próprio código hospedado com um `<Redirect>`.

Faça algumas conexões de TwiML no método de sua escolha (TwiML Bin, Function, aplicativo web) que usa o verbo `<Redirect>`. Você pode usar o QuestIDE, um aplicativo básico da Web com uma rota que tenha sido criada para você. Certifique-se de atualizar a primeira rota para incluir TwiML `<Redirect>` e, em seguida, crie uma segunda rota que retorne uma segunda `<Message>`.

Depois de criar seu TwiML `<Redirect>`, configure seu número de telefone para chamar o URL do webhook quando receber um SMS. Depois de testar o funcionamento, introduza o número de telefone Twilio na interface Hack e clique em **HACK**. Verificaremos se o URL do seu webhook retorna `<Redirect>` e, em caso afirmativo, o baú se abrirá para revelar o prêmio dentro dele!