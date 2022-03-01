# Liberdade de expressão

Para abrir esse baú, você deve reunir dados de um autor da chamada usando fala, em vez de reunir os tons DTMF. A fala oferece uma abordagem de viva-voz simples ao uso de um sistema IVR (Interactive Voice Response, resposta interativa por voz).

`<Gather>` a fala é possível com alguns parâmetros adicionais.

## Entrada de Dados

Há um parâmetro disponível em `<Gather>` denominado `input`. O padrão é `dtmf`. Você pode configurá-lo como `speech` ou `dtmf speech` para aceitar ambos.

Ao reunir dados do usuário, uma prática recomendada é informá-lo sobre as opções disponíveis.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather input="speech" action="https://is-a-hotdog.net/sandwich.php">
        <Say>A hotdog is a sandwich. Is this statement true? Please answer yes or no.</Say>
    </Gather>
</Response>
```

Assim que o autor da chamada parar de falar por cinco segundos, o `<Gather>` fará o POST na `action` associada. Esse post conterá o valor do campo chamado `SpeechResult` que contém a transcrição da solicitação de voz.

## Dicas

Para ajudar no fluxo de seu aplicativo, uma prática recomendada é incluir `hints` para ajudar `<Gather>` a determinar o que o autor da chamada provavelmente está dizendo. As dicas são separadas por vírgula.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather input="speech" hints="monday,tuesday,wednesday,thursday,friday">
        <Say>Which day of the week is your favorite? You can say any day of the week Monday thru Friday.</Say>
    </Gather>
</Response>
```

Este exemplo ajuda a reconhecer essas palavras específicas. É possível que o autor da chamada diga outra coisa, mas isso ajuda a definir o modelo esperado pelo aplicativo.

## Como escrever o TwiML

Armados com `input` e `hints`, estamos prontos para criar a parte do TwiML necessária. Para fazer isso, primeiro crie um novo [TwiML Bin](https://www.twilio.com/console/runtime/twiml-bins). Em seguida, escreva seu código para coletar informações do prompt:

**O que você gostaria de fazer? Você pode dizer coisas como: horas, redefinir ou agente.**

Se precisar de ajuda, confira o spoiler. Você conseguiu!

<details>
    <summary>Spoiler: A solução TwiML Bin</summary>
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather input="speech" hints="hours,reset,agent">
        <Say>What would you like to do? You can say things like: hours, reset, or agent.</Say>
    </Gather>
</Response>
```

OBSERVAÇÃO: Ainda não criamos a `action` para lidar com a resposta. Faremos isso em seguida!

</details>
## Lidar com a ação

Para concluir este baú, você precisará lidar com a solicitação do Twilio. Uma maneira de fazer isso é usar uma solução sem servidor como uma função. Primeiro, [crie uma nova função](https://www.twilio.com/console/runtime/functions/manage) e escolha o modelo _em branco_.

O conceito aqui é que queremos inspecionar o que foi enviado. Este valor pode ser encontrado em `event.SpeechResult`. Uma solução comum é usar uma [instrução `switch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) sobre esse valor e, em seguida, manejar cada caso especificamente.

O seguinte é o que deve acontecer para cada resultado:

_redefinir_: `<Say>` "Seu pin foi redefinido" _horário_: `<Say>` "Nosso horário é de 9 às 5" _agente_: `<Say>` "Conectando você ao nosso próximo agente disponível"

Depois de escrever a função, **Save** (Salve), **Copy** (Copie) o URL e **Paste** (Cole) no seu parâmetro `action` `<Gather>`. OBSERVAÇÃO: Se você quiser depurar a função, lembre-se de que o uso de instruções `console.log` fará com que a seção Logs na página de funções contenha suas mensagens. Isso é útil ao lidar com a fala!

Precisa de ajuda para escrever a função? Confira o spoiler.

<details>
    <summary>Spoiler: A solução da função</summary>
```javascript
exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  switch (event.SpeechResult.toLowerCase()) {
    case 'agent':
      twiml.say('Here is an agent');
      break;
    case 'hours':
      twiml.say('Our hours are 9 to 5');
      break;
    case 'reset':
      twiml.say('We have reset your pin');
      break;
    default:
      console.log(
        `I heard ${event.SpeechResult} at a confidence rating of ${Math.round(
          event.Confidence * 100
        )} percent`
      );
  }
  callback(null, twiml);
};
```

OBSERVAÇÃO: Como `console.log` está na ramificação `default` da instrução `switch`, ele só será executado quando todas essas outras opções não forem encontradas.

</details>
## Verificar se funciona

Conecte seu [número de telefone de entrada (<%= env.TQ_TWILIO_NUMBER.value %>)](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID.value %>) ao seu TwiML Bin e faça uma chamada para ele. Responda usando cada uma das diferentes opções. Você obtém a resposta correta sempre? Lembre-se de que, se você estiver tendo problemas, verifique seus logs para ver a transcrição.

Assim que estiver satisfeito com os resultados, pressione o botão HACK!