# Diga "Olá"

Para concluir esta missão, você deverá atender a uma chamada telefônica que será feita para o seu número de telefone Twilio. Seu aplicativo cumprimentará o chamador falando as palavras "Olá, mundo!"

Vamos mostrar os comandos que você precisa enviar, como fornecê-los a nós e, finalmente, os conectaremos ao seu número de telefone para que ele responda quando chamado.

## Apresentação do TwiML

O TwiML, Twilio Markup Language, define como você gostaria que seu aplicativo fluísse. Ele parece muito com o HTML, ou HyperText Markup Language, que é usado nos navegadores da Web para exibir elementos diferentes.

Veja alguns exemplos de HTML:

```html
<html>
  <head>
    <title>Hello World, HTML version</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
```

Os elementos são definidos usando

- Tags de abertura
- O nome do elemento cercado de `<` e `>`
- Tags de fechamento, que cercam o nome com `</` e `>`

Observe como você pode aninhar elementos dentro de outros elementos. Por exemplo, o elemento `head` é aninhado no elemento `html` pai e `title` é aninhado no elemento `head`.

Como você verá, o TwiML é semelhante. Aqui está o TwiML necessário para falar a frase "Olá, mundo!":

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>Hello, World!</Say>
</Response>
```

Todas as respostas de voz do TwiML devem começar com uma tag `<Response>`. Todas as outras tags são aninhadas dentro dessa tag.

O [`<Say>` Verbo](https://www.twilio.com/docs/voice/twiml/say) realizará o TTS (text to speech, conversão de texto em fala), com base no valor incluído entre as tags.

Você provavelmente notou a declaração `<?xml` na parte superior do trecho do código TwiML. XML, ou eXtensible Markup Language, é uma linguagem de marcação baseada em tag, da qual o TwiML é um superconjunto. Essencialmente, o que esta linha está declarando é que concordamos em seguir as regras do XML. Ou seja, concordamos com tags de abertura e fechamento que correspondem de maneira sensível a maiúsculas e minúsculas. Portanto, maiúsculas e minúsculas importam.&nbsp;`<Response>` é considerado uma tag diferente de `<RESPONSE>`.

## Configurar um número de telefone

Agora que sabemos qual é o TwiML que precisamos, vamos conectá-lo ao seu número de telefone para que ele seja executado quando uma chamada for recebida.

Acesse a [seção do número de telefone no console](https://www.twilio.com/console/phone-numbers/incoming) e escolha o número <%= env.TQ_TWILIO_NUMBER.value %>.

Na seção **Voz e fax**, você verá um prompt denominado **Chamada recebida** seguido por dois campos. Você tem algumas opções aqui...

Se estivesse disposto, você poderia acionar um servidor da Web e hospedar uma página para renderizar o TwiML que atenderia a sua chamada. Se escolher essa opção, você seleciona **Webhook** nesse primeiro menu suspenso e, em seguida, digita o URL onde o Twilio pode encontrar aquele TwiML que você estava renderizando.

Uma opção mais simples é nos permitir hospedar sua resposta TwiML para você. O Twilio oferece um serviço chamado TwiML Bins, que ajuda você a colocar um servidor da Web em funcionamento. Os TwiML Bins são uma solução ideal, pois a resposta que planejamos enviar será estática, ou seja, nunca mudará. Para essa opção, escolha **TwiML Bin** na primeira lista suspensa. Em seguida, clique no botão de **adição** para criar um novo bin.

Depois disso, seus TwiML Bins serão exibidos na lista suspensa **Selecionar um TwiML Bin**.

## Criar um TwiML Bin

Dê um **nome amigável** ao seu novo TwiML Bin. Nós o selecionaremos mais tarde no menu suspenso. Em seguida, digite o TwiML necessário ou apenas copie-o do exemplo de código acima.

Se tudo estiver digitado corretamente, você verá uma notificação informando que inseriu um Voice TwiML válido.

Clique no botão **Create** (Criar) para salvar seu TwiML Bin e, em seguida, escolha **Save** (Salvar) para salvar a configuração do número de telefone.

## Ligue para si mesmo

Agora que você tem um número de telefone [<%= env.TQ_TWILIO_NUMBER.value %>](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID.value %>) completamente configurado, você deve ligar para ele. Olá, mundo, mesmo!

Por que você não pressiona o botão **HACK** para que possamos ajudá-lo a atravessar essa barreira e chegar na próxima!