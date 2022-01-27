# Uso do Functions quando os TwiML Bins simplesmente não funcionam

Vamos dar uma olhada no Twilio Runtime Functions: o código do Node.js hospedado que você pode usar para responder a mensagens SMS recebidas.

Os TwiML Bins oferecem uma ótima solução para respostas estáticas ou um tanto modelares, mas, às vezes, você precisa de mais do que isso. Talvez seja necessário chamar uma API externa ou escrever um código que gere uma resposta aleatória. E, assim como os TwiML Bins, as funções são hospedadas, por isso você não precisa se preocupar em ativar um servidor para hospedar seu código. Em outras palavras, quando você precisa escrever um código para uma resposta, o Twilio Runtime Function é uma ótima opção hospedada.

Para passar por esse obstáculo, você usará o Twilio Functions para criar uma bola 8 que devolve uma resposta mágica para as perguntas do SMS recebidas.

## Como começar com apenas uma resposta

Para saber como o Twilio Functions funciona, vamos começar com uma resposta estática, muito semelhante a um TwiML Bin, e criar a partir daí.

Ao criar uma função Twilio, você escreve o código Node.js que pode responder a eventos do webhook (neste caso, um SMS de entrada), assim como vimos usando os TwiML Bins

Navegue até a seção “Functions” do console do Twilio e pressione o botão + (mais) para criar uma nova função:

<center>
  <img src="images/programmable_sms/create_function.png" />
</center>
No menu pop-up, selecione o modelo **Hello SMS** (Olá SMS) para usar um modelo de função que já tenha alguma funcionalidade útil do TwiML importada.

Dê à sua nova função um nome fácil, talvez algo como “Bola 8” e adicione um URL de caminho exclusivo:

<center>
  <img src="images/programmable_sms/8ball-function.png" />
</center>
Na seção configuração, você verá um pouco do código Node.js previamente preenchido no editor. Selecionamos o modelo “Hello SMS”, de modo que o código Node.js é configurado para retornar uma mensagem “Olá, mundo” a uma mensagem SMS de entrada. Para esse passo a passo, vamos escrever o código a partir do zero. Por isso, exclua as três linhas internas da função, deixando apenas a estrutura externa:

```
exports.handler = function(context, event, callback) {
...
};
```

Substitua as linhas que acabou de excluir por esse código que 1) cria uma variável `twiml` e a define com uma string que contém as tags do TwiML com as quais você já está familiarizado. Preencha a resposta de sua preferência para uma pergunta sim-não entre as tags do verbo da `<Message>...</Message>`:

```js
let twiml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <Response>
    <Message>Don't hold your breath.</Message>
  </Response>
`;
```

Por fim, precisamos dizer à nossa função para retornar esta string como TwiML criando uma resposta da Twilio e definindo o `twiml` que criamos como corpo com o método do `setBody`:

```js
let response = new Twilio.Response();
response.setBody(twiml);
```

Em seguida, precisamos garantir que nossa resposta seja enviada como `xml`, para que possamos adicionar o cabeçalho do tipo de conteúdo apropriado:

```js
response.appendHeader('content-type', 'text/xml');
```

Na parte inferior, antes da chave de fechamento do método do `handler`, certifique-se de chamar a função de retorno de chamada, passando `null` como o primeiro argumento e `response` como o segundo:

```js
callback(null, response);
```

## Como configurar seu número de telefone e testar

De volta à seção Números de telefone do console, selecione o número de telefone Twilio que deseja configurar. Em **A MESSAGE COMES IN** (UMA MENSAGEM É RECEBIDA):

1. Selecione **Function** (Função) no primeiro menu suspenso
2. Selecione a função “Bola 8” que criamos

<center>
  <img src="images/programmable_sms/message_comes_in_function.png" />
</center>
Este fluxo já está começando a parecer familiar?

Envie uma mensagem de texto para seu número Twilio para confirmar que você retornou... a única resposta possível.

Até este ponto, fizemos a mesma coisa que poderíamos fazer com um TwiML Bin. A verdadeira magia das funções é a capacidade de criar respostas mais dinâmicas. Vamos aprender isso em seguida!

## Agora, com respostas reais!

Você já jogou com uma [Bola 8 mágica](https://en.wikipedia.org/wiki/Magic_8-Ball) antes? Você faz à Bola 8 uma pergunta sim-não enquanto a sacode, e magicamente, aparece uma resposta em sua pequena janela de visualização. Vamos implementar a mesma coisa, mas com um JavaScript que pode ser executado em Twilio Functions.

Primeiro, exclua as estruturas internas do seu método de manipulador. Você deve voltar a uma estrutura vazia:

```javascript
exports.handler = function(context, event, callback) {
  // ...
};
```

Precisamos criar uma lista de respostas possíveis que possibilite uma escolha. Podemos colocar alguma coisa da Bola 8 mágica padrão em uma matriz de JavaScript, mas você pode facilmente substituir ou adicionar algo criado por você mesmo.

```javascript
let answers = [
  'It is certain.',
  'As I see it, yes.',
  'Without a doubt.',
  'Yes - definitely.',
  'Outlook good.',
  'Most likely.',
  'Reply hazy, try again.',
  'Ask again later.',
  'Better not tell you now.',
  "Don't count on it.",
  'My reply is no.',
  'My sources say no.',
  'Very doubtful.',
  'Outlook not so good.'
];
```

Em seguida, entre essas muitas respostas, queremos selecionar uma aleatoriamente para retornar à pessoa que enviou uma pergunta. Para fazer isso, podemos usar o método `Math.random` para selecionar um número entre 0 e o comprimento da matriz de `answers`: `Math.random() * answers.length`

No entanto, o método `Math.random` do JavaScript retorna um número de [ponto flutuante](https://en.wikipedia.org/wiki/Floating-point_arithmetic#Floating-point_numbers) e queremos um inteiro arredondado. Podemos usar `Math.floor` para obter o maior número inteiro menor ou igual ao número aleatório que geramos: `Math.floor(Math.random() * answers.length)`.

Por fim, queremos usar o número aleatório que geramos para acessar uma resposta dentro da matriz de `answers` e armazená-la na variável `yourAnswer`. Juntas, as estruturas internas de sua função devem ter esta aparência agora:

```javascript
let answers = [
  'It is certain.',
  'As I see it, yes.',
  'Without a doubt.',
  'Yes - definitely.',
  'Outlook good.',
  'Most likely.',
  'Reply hazy, try again.',
  'Ask again later.',
  'Better not tell you now.',
  "Don't count on it.",
  'My reply is no.',
  'My sources say no.',
  'Very doubtful.',
  'Outlook not so good.',
];
let yourAnswer = answers[Math.floor(Math.random() * answers.length)];
```

## Como apresentar o Twilio Node.js Client

Em nosso primeiro exemplo, retornamos ao TwiML bruto, em toda a sua glória entre colchetes angulares, mas era um pouco complicado de digitar. Como as Twilio Functions são escritas em Node.js, podemos usar o [Cliente Node.js](https://www.twilio.com/docs/libraries/node) da Twilio para criar nossas instruções do TwiML. O Twilio Client já está disponível para uso em sua função, de modo que não é necessário importá-lo/solicitá-lo.

Dê uma olhada no seguinte código:

```javascript
let response = new Twilio.twiml.MessagingResponse();
response.message(yourAnswer);
```

Em vez de usar as tags `<Response>` e `<Message`>, o Twilio Client remove a maior parte disso com métodos que podemos chamar para criar o TwiML para nós. Para criar um novo `<Response>`, podemos chamar o método `MessagingResponse` e podemos usar o método `message` em vez de escrever as tags `<Message>...</Message>` manualmente.

Não se esqueça de retornar a chamada no final da função, antes do fechamento das chaves `}`: `callback(null, response);`

## Busque as respostas para a sua pergunta!

Como você já configurou seu número de telefone Twilio para chamar sua função Bola 8, deve conseguir enviar sua pergunta e receber uma resposta. Desta vez, no entanto, deve ser algo novo e incrível!

(Não está satisfeito com a resposta à sua pergunta? Continue enviando mensagens de texto até receber a resposta desejada!)

Há muito mais que você pode fazer com Functions, mas vamos continuar nossa missão SMS por enquanto. Digite seu número de telefone à direita, clique em _HACK_  e sigamos em frente!