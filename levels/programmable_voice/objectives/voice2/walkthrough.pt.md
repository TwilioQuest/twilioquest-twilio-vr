# Fale com facilidade

Para atravessar essa barreira, você precisará desenvolver a habilidade de falar com o autor da chamada em um idioma que não seja o inglês. O [verbo `<Say>` do TwiML](https://www.twilio.com/docs/voice/twiml/say) fornece acesso a muitos idiomas e vozes diferentes.

Usar a voz certa para a tarefa permite personalizar a experiência do usuário. Ao se comunicar em um idioma diferente, é essencial usar o personagem de voz certo para transmitir autenticidade cultural ao seu aplicativo.

## Cite atributos

A maioria dos elementos do TwiML fornece opções de configuração. Normalmente, isso é feito usando **atributos**. Cada tag do `TwiML` tem um conjunto predefinido de atributos. Por exemplo, a tag `<Say>` permite que você defina um atributo [`language`](https://www.twilio.com/docs/voice/twiml/say#attributes-language).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say language="es-MX">Hola, mundo</Say>
</Response>
```

Observe que o nome do atributo `language` é seguido por um sinal de igual `=` e, em seguida, por um valor entre aspas duplas, neste caso, `"es-MX"`.

O TwiML do Twilio é compatível com [muitos idiomas](https://www.twilio.com/docs/voice/twiml/say#attributes-language). O exemplo do TwiML acima usa `es-MX`. O `es` é para espanhol, e `MX` seleciona um dialeto do México.

Configure sua chamada recebida para responder com esse TwiML. Você notará que uma nova voz padrão, com base no idioma que especificamos, apareceu para salvar o dia.

## Amazon Polly

A pronúncia fluida de texto do Amazon Polly permite gerar saída de voz de alta qualidade para um público global.

Para realizar essa tarefa, precisamos usar o `"es-US"` do Amazon Polly, ou um idioma da América Latina, e escolher a voz do `"Miguel"`.

Para especificar uma voz no seu TwiML, você precisará usar o atributo **voz**.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say language="es-US" voice="Polly.Miguel">Hola, mundo</Say>
</Response>
```

Escreva o código acima em um novo TwiML Bin e \[conecte-o ao manipulador de chamadas recebidas no seu número](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>)

## Ouça sua nova voz

Ligue para seu número de telefone (\<%= env.TQ_TWILIO_NUMBER.value %>). Mucho gusto Miguel! Hola mundo, de fato!

Agora pressione o botão **HACK** para que possamos ajudar você a atravessar essa barreira e seguir para sua próxima aventura!