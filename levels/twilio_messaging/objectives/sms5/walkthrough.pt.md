# Como responder a uma mensagem de entrada

Você já respondeu a uma mensagem de texto. Talvez você não tenha notado, mas usou um dialeto XML chamado **TwiML** para dizer ao Twilio o que fazer quando receber uma mensagem de texto.

## O que é TwiML?

TwiML significa “Twilio Markup Language” e você pode encarar isso como um conjunto de instruções para que o Twilio faça algo em seu nome, como responder a uma mensagem de texto ou chamada de voz.

Na verdade, o TwiML é [XML](https://en.wikipedia.org/wiki/XML), que é um tipo de “linguagem de marcação” para codificar informações adicionais sobre alguns dados. Nesse caso, os dados são o corpo da mensagem que você deseja enviar de volta para a pessoa que enviou mensagens de texto. As informações adicionais são as instruções para o Twilio.

No exemplo abaixo, procure pelo corpo da mensagem. Em relação a ela, você verá muitas informações contidas nas `<tags>`.

A tag `<Response>` informa ao Twilio que você está criando um conjunto de instruções em TwiML. Cada vez que você responde com TwiML, você precisa criar um conjunto de tags `<Response>`...`</Response>` com a mensagem aninhada dentro delas.

O [verbo](https://www.twilio.com/docs/sms/twiml/message) [`<Message>`](https://www.twilio.com/docs/sms/twiml/message) é a verdadeira estrela do show nesse momento. Ele informa ao Twilio que você deseja enviar uma mensagem de texto de volta para a pessoa que enviou mensagens de texto.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>Oh hai Mark!</Message>
</Response>
```

O que dizer de uma linha estranha com a tag `<?xml...`? Essa é uma declaração de que vamos seguir as regras do XML, incluindo a abertura e o fechamento de tags, de uma maneira que diferencie maiúsculas de minúsculas. Incluímos isso porque o TwiML é, na realidade, um XML.

## Como configurar seu número de telefone

A primeira etapa para receber um SMS de entrada é configurar um URL que o Twilio solicitará quando um de seus números de telefone receber uma mensagem de texto. Localize [seus números de telefone programáveis no console ](https://www.twilio.com/console/phone-numbers/incoming) e clique em um deles para configurá-lo.

<center>
  <img src="images/programmable_sms/active-numbers.png" />
</center>
Na página de configuração do número de telefone, role para baixo até a seção **Messaging** (Mensagens) de configuração. Procure o rótulo A MESSAGE COMES IN (UMA MENSAGEM É RECEBIDA) ao lado de dois menus suspensos.

<center>
  <img src="images/programmable_sms/message_comes_in_twiml_bin.png" />
</center>
É aqui que você diz ao Twilio como ele deverá receber as instruções do TwiML. Você tem várias opções para retornar o TwiML, como ativar um servidor Web para fornecer o TwiML. Vamos chegar lá, mas esse obstáculo está muito relacionado com a familiarização com o próprio TwiML.

O Twilio fornece um serviço chamado “TwiML Bins” para armazenar e retornar as instruções do TwiML para você. (Isso significa que você não precisa configurar e executar um servidor Web para hospedar o TwiML!) Quando você deseja configurar uma resposta estática, os TwiML Bins são uma ótima solução.

No primeiro menu suspenso, selecione **TwiML** e pressione o botão “+” (mais) à direita para criar um novo TwiML Bin. Todos os TwiML Bins criados anteriormente aparecerão no menu suspenso à direita, mas vamos criar um a partir do zero para esse fim.

Você também pode criar TwiML Bins na seção [TwiML Bins](https://www.twilio.com/console/runtime/twiml-bins) do console do Twilio.

## Como uso o TwiML Bin?

Pense em um TwiML Bin como um pequeno contêiner para armazenar um conjunto específico de instruções do TwiML.

Primeiro, dê um **nome amigável** ao seu novo contêiner para identificá-lo, algo como “Meu primeiro TwiML Bin de mensagens”.

Na caixa de texto do TwiML, você pode escrever algumas instruções do TwiML sobre como responder. Observe que a declaração do `<?xml...` já foi adicionada para você. Você pode escrever o TwiML manualmente ou copiar do exemplo acima.

## Confira seu trabalho

Você criou um TwiML Bin e disse ao Twilio para usar esse conjunto de instruções para responder a uma mensagem de entrada em seu número de telefone Twilio. Chegou a hora de testar tudo isso!

Envie uma mensagem para o seu número de telefone Twilio e confirme se você recebeu a resposta desejada.

Assim que receber uma resposta, digite seu número de telefone Twilio no campo à direita e pressione o botão **HACK**. Verificaremos se você ativou um TwiML Bin para responder a uma mensagem de entrada, e o XP será seu!