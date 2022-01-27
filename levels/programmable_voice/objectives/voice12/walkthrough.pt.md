# Sentindo-se rejeitado

Pode haver uma hora em que você queira proibir uma chamada de executar seu manipulador de chamadas recebidas. Cada chamada recebida custa dinheiro e, embora seja um número relativamente pequeno, as chamadas indesejadas podem aumentar com o tempo. O caso de uso comum aqui é impedir chamadas de spam.

Temos boas notícias! Se você sabe que o autor da chamada é um remetente de spam, você pode `<Reject>` a chamada recebida e não precisará pagar por ela. Você pode definir o atributo `reason` como `"busy"` ou `"rejected"` para alterar o fluxo, por exemplo: `<Reject reason="busy">`

No caso desse baú, você fará exatamente isso. Você definirá um número de telefone que suspeita ser de um remetente de spam e rejeitará todas as chamadas desse número específico. Você responderá com um sinal de ocupado.

## Escrever a função

Você pode resolver esse desafio usando qualquer tipo de solução dinâmica. Vamos aprender a resolver o problema usando uma função do Twilio.

Vamos criar uma nova função acessando Console >> Runtime >> Functions. A partir de então, pressione o botão **+** e selecione o modelo em **branco**. Dê à função um **Function Name** (nome de função) de `No spammers allowed` e um caminho `/no-spammers`. Primeiro, pense em um número real que você pode usar para testar a rejeição.

O pseudocódigo será o seguinte:

- Se o número de entrada corresponder ao seu número de spam pretendido:
  - Rejeite a chamada com um sinal de ocupado.
- Caso contrário:
  - Diga "Olá, meu amigo confiável!"

Faça essa tentativa usando suas habilidades da função, mas se precisar de ajuda, consulte o spoiler.

<details>
    <summary>Spoiler – A solução da função</summary>
O objeto `event` tem todos os valores de solicitação do Twilio, incluindo `From`, que armazena as informações do autor da chamada.

```javascript
exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  if (event.From === '+12095550136') {
    twiml.reject({ reason: 'busy' });
  } else {
    twiml.say('Hello my trustworthy friend');
  }
  callback(null, twiml);
};
```

Todos os verbos do Voice TwiML são expostos externamente ao objeto `VoiceResponse`, para que você possa chamar o método de rejeição para produzir essa tag. Observe como os parâmetros são incluídos como um objeto JavaScript, com a chave sendo o nome do atributo e o valor sendo o valor.

</details>
## Verificar se funciona

Conecte a função ao número de entrada (\<%= env.TQ_TWILIO_NUMBER.value %>) e ligue para ele usando o número do remetente de spam suspeito. Você deve ouvir o sinal de ocupado. Agora, ligue de outro número. Você deve ouvir a mensagem falada.

Depois disso, insira o número do remetente de spam e pressione o botão **HACK**.

## Saiba mais

- [Tutorial – Bloquear chamadas de spam e chamadas robotizadas](https://www.twilio.com/docs/voice/tutorials/block-spam-calls-and-robocalls-node-js)