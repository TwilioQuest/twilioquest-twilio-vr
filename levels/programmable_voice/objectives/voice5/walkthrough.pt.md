# Junção da função

Uma função da Twilio é um código armazenado em nossos servidores e executado com base em um evento específico. Para atravessar essa barreira, você responderá a uma chamada de voz recebida com sua função. Continue lendo para saber como criar uma nova **Função** que responda de forma diferente com base no **prefixo** do número de telefone da chamada recebida.

## Prefixos

Um prefixo é o início de uma série de caracteres. Os números de telefone normalmente definem a localização usando prefixos específicos. A primeira parte do número é o código do país, geralmente seguido por outro código que delimita ainda mais sua localização geográfica.

O objetivo deste desafio é determinar se uma chamada de voz recebida está vindo de um número em uma localização geográfica definida por você.

<details>
  <summary>Exemplos de prefixo específico</summary>
Os números dos Estados Unidos da América começam com o código do país `+1`. Há também um código de área, que é usado para agrupar números em uma área específica. Os números baseados na cidade de Portland, Oregon, têm um código de área `503`. Portanto, o prefixo do número `(503) 555-1212` seria `+1503`.

Vamos dar uma olhada em um número de Berlim, na Alemanha. O código de país da Alemanha é `+49`. Os [números de telefone na Alemanha](https://en.wikipedia.org/wiki/Telephone_numbers_in_Germany) também suportam regiões geográficas. O código de área de Berlim é `030`. Você pode então definir o prefixo de Berlim como `+49030`.

</details>
## Criar uma função

Para começar, acesse [**Funções**](https://www.twilio.com/console/runtime/functions/manage) no console da Twilio. Clique no botão `+` para criar uma nova função e, na lista de modelos, escolha **+ em branco** e clique em **Criar**.

O campo **Nome da função** torna mais fácil encontrar nossa função e usá-la posteriormente. Nomeie sua nova função como `Prefix Checker`.

As funções darão a você um nome de subdomínio gerado aleatoriamente. Esta é a parte não editável do campo **Caminho**. No campo de texto editável, após esse URL, digite o nome do caminho `/prefix-checker`.

No campo **Código**, você notará um JavaScript padronizado.

```javascript
exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();
  // twiml.say("Hello World");
  callback(null, twiml);
};
```

Se esse código for parecido com uma língua estrangeira para você, não tenha medo. Incluímos abaixo uma pequena atualização sobre JavaScript para você. Se você já estiver familiarizado com os conceitos básicos de JavaScript, pode ignorar e seguir em frente.

<details>
    <summary><strong>Atualização do JavaScript</strong></summary>
JavaScript é uma linguagem baseada em protótipo. Ele é compatível com conceitos de FP (Functional Programming, programação funcional) e também com um toque de recursos OOP (Object-Oriented Programming, programação orientada a objetos). Essa combinação de conceitos é conhecida por confundir desenvolvedores que geralmente codificam em um ou outro paradigma.

A primeira linha desse código é um ótimo exemplo da colisão conceitual:

```javascript
exports.handler = function(context, event, callback) {
```

Nesta linha, `exports` é um **objeto**. A **propriedade** `handler` é atribuída a uma `function` anônima recém-criada. Três **parâmetros** são definidos por essa função anônima: `context`, `event` e `callback`.

Uma coisa importante a ser notada aqui é que `exports` é um objeto especial que auxilia na exposição de funções que o módulo usa. Ao exportar a função `handler`, definimos a função que deve ser chamada para lidar com um evento especial. Quando esse evento definido ocorrer, a Twilio chamará essa função, transmitindo os três argumentos que correspondem aos parâmetros mencionados acima.

Vamos saber mais sobre esses parâmetros em instantes, mas primeiro, vamos fazer uma pequena revisão das variáveis.

<details>
    <summary>Atualização sobre variáveis</summary>
Damos nomes às coisas para que depois possamos nos referir a elas. As variáveis são um nome em nosso código que se refere a um valor que foi criado anteriormente. Criamos variáveis para que possamos nos referir ao valor pelo nome posteriormente.

```javascript
let twiml = new Twilio.twiml.VoiceResponse();
```

Essa linha cria uma nova variável chamada `twiml`. A instrução [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) define uma nova variável nomeada disponível para o corpo da nossa função anônima.

</details>
```javascript
let twiml = new Twilio.twiml.VoiceResponse();
```

Essa linha cria uma nova variável chamada `twiml` e armazena uma **instância** de um `Twilio.twiml.VoiceResponse`. O módulo `Twilio` está incluído para uso em todas as funções. Veremos em breve como usar um objeto `VoiceResponse` para atender às nossas necessidades.

```javascript
// twiml.say("Hello World");
```

As barras duplas iniciais desta linha, `//`, demonstram como você pode fornecer **comentários** para os leitores do seu código. Como há um comentário nessa linha, o código não será executado. O código foi intencionalmente deixado aqui para você ver como é possível interagir com o objeto `VoiceResponse`.

Esta linha, se não estivesse comentada, chamaria o **método** `say` na instância `twiml` e passaria a **string** `"Hello World"`. Observe que esse método deve alterar a instância `twiml` diretamente, pois não capturamos nenhum valor de retorno.

Falaremos sobre isso em breve. Antes, vamos recapitular rapidamente o que são strings.

<details>
    <summary>Atualização sobre strings</summary>
As strings representam uma série de caracteres combinados, como bandeirinhas em uma festa de aniversário. No JavaScript, você pode criar strings colocando aspas ao redor delas:

```javascript
let lyrics = 'Never gonna give you up';
let singer = 'Rick Astley';
```

Você pode usar aspas simples `'` ou duplas `"` para criar uma string. Strings são objetos e, portanto, têm [muitos métodos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) disponíveis para elas.

```javascript
lyrics.toUppercase(); // returns "NEVER GONNA GIVE YOU UP"
```

</details>
</details>
### Argumentos do handler (manipulador)

A função `handler` recebe os seguintes argumentos:

#### `context`

Este é um objeto que fornece contexto para a função atual. Como a função está conectada à sua conta, ela tem acesso às credenciais da conta. O uso do método `context.getTwilioClient()` permitirá que você acesse um cliente autenticado.

#### `event`

O argumento `event` terá informações específicas do evento que acionou o handler. Em nosso caso, `event` representará a [solicitação `HTTP` de uma chamada de voz recebida](https://www.twilio.com/docs/voice/twiml#request-parameters). Você verá que os pares de chave-valor HTTP POST foram aplicados como propriedades neste objeto. Portanto, você pode acessar convenientemente as propriedades de que precisa desta forma: `event.From`

#### `callback`

Esta `callback` é uma **função** que é passada. Ela espera dois parâmetros: um erro, se aplicável, e a resposta:

```javascript
callback('Oh no something bad happened!');
```

ou com sucesso

```javascript
callback(null, twiml);
```

Leia os documentos para mais informações sobre [invocação de funções](https://www.twilio.com/docs/runtime/functions/invocation)

## VoiceResponse

Como o código padrão predefinido é exibido

```javascript
let twiml = new Twilio.twiml.VoiceResponse();
```

O módulo `Twilio` fornece uma ferramenta útil para gerar respostas `twiml`. `VoiceResponse` suporta todos os [verbos TwiML para Programmable Voice](https://www.twilio.com/docs/voice/twiml) disponíveis.

```javascript
exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();
  twiml.say('Hello World');
  callback(null, twiml);
};
```

<details>
    <summary>TwiML gerado</summary>
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>Hello World</Say>
</Response>
```

</details>
Para este objetivo, queremos dizer algo se o número de telefone do autor da chamada corresponder a um prefixo específico.

## Colocar tudo para funcionar

Uma maneira útil de verificar um prefixo correspondente é usar o método de string JavaScript `startsWith`. Esse método retorna um valor booleano (verdadeiro ou falso).

```javascript
'watermelon'.startsWith('water'); // returns true
```

Podemos usar `startswith` para verificar o prefixo do autor da chamada recebida. Por exemplo, este código verificará o prefixo `+1503` de Portland, OR, e responderá com o modo familiar.

```javascript
if (event.From.startsWith('+1503')) {
  twiml.say('Keep Portland Weird!');
}
```

<details>
    <summary>A função completa</summary>
```javascript
exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();
  twiml.say('Hello World');
  if (event.From.startsWith('+1503')) {
    twiml.say('Keep Portland Weird!');
  }
  callback(null, twiml);
};
```

Esse código vai gerar a seguinte resposta do TwiML **se** o número de telefone do autor da chamada tiver o prefixo `+1503`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>Hello World</Say>
    <Say>Keep Portland Weird</Say>
</Response>
```

</details>
Você pode tornar esse código específico para qualquer prefixo que esteja verificando. Nosso objetivo é tornar a resposta diferente com base em um local específico.

## Verificar se funciona

**Save** (Salve) sua função e você verá que ela foi implantada em nossos servidores.

Acesse seu \[número de entrada](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>) e, na seção **Call comes in** (Chamada recebida), selecione **Function** (função) e escolha a função **Prefix Checker** (Verificador de prefixo).

Faça uma chamada com um número que corresponda ao seu prefixo esperado. Você deve ouvir sua mensagem. Agora faça uma chamada que não corresponda ao seu prefixo.

Vamos verificá-la. Digite o **prefix** (prefixo) que devemos verificar e pressione o botão **HACK**.

Vamos romper essa barreira!