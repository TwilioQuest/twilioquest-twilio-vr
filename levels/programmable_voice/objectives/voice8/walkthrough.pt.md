# Digite seu pin para ganhar

Se quiser arrombar esse baú, precisará projetar uma experiência de usuário mais bem pensada para um sistema de entrada de pin. A experiência do usuário é importante. Forneça instruções claras sobre o que você espera do autor da chamada. Uma prática recomendada é informar ao autor da chamada quantos dígitos você gostaria que ele inserisse.

Além de informar ao autor da chamada, também é uma boa ideia limitar a solicitação `<Gather>` a esse número de dígitos. Você pode fazer isso com o parâmetro `numDigits` de `<Gather>`.

## Sem limites

O [verbo `<Gather>` do TwiML](https://www.twilio.com/docs/voice/twiml/gather), sem nenhuma outra configuração, aguardará cinco segundos após a conclusão do TwiML filho para enviar os resultados. Por padrão, você também pode pressionar `*` para enviar e evitar ter de esperar. Pense nisso como a tecla Enter. Na verdade, você pode substituir isso usando o atributo [`finishOnKey`](https://www.twilio.com/docs/voice/twiml/gather#finishonkey).

Uma maneira de encurtar o caminho é usar o atributo [`numDigits`](https://www.twilio.com/docs/voice/twiml/gather#numdigits). Adicionar isso envia `Digits` assim que esse número de dígitos for inserido.

## Como escrever o TwiML

Vamos avisar nosso autor da chamada dizendo "digite seu pin de quatro dígitos". Para fazer isso, primeiro crie um novo [TwiML Bin](https://www.twilio.com/console/runtime/twiml-bins). Em seguida, escreva seu código para coletar **exatamente** quatro dígitos do autor da chamada. Se precisar de ajuda, consulte o spoiler. Você conseguiu!

<details>
    <summary>Spoiler: A solução TwiML Bin</summary>
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather numDigits="4">
        <Say>Please enter your four digit pin</Say>
    </Gather>
</Response>
```

</details>
## Verifique se está funcionando

Conecte esse TwiML Bin ao manipulador "Chamada recebida" do seu número ( \[\<%= env.TQ_TWILIO_NUMBER.value %>](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>) ). Faça uma chamada e insira os quatro dígitos. Você notará que criamos esse temido loop `<Gather>` porque nunca declaramos uma `action`. Não se desespere com esse baú, mas lembre-se de que não realizar nenhuma ação implica em criar um loop caso encontre este problema novamente!

Pressione o botão **HACK** para pegar sua parte!