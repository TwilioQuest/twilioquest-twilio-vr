# O loop Gather

Concluir este desafio (idealmente) não será muito difícil se você estiver usando o **editor de código**. Se você abrir o editor e pressionar <em><i class="fa fa-play"></i></em>, terá um servidor Node.js em execução que contém um código que usa o verbo `<Gather>`.

Com esse servidor em execução, você conseguirá usar o [ngrok](https://ngrok.com/) para fornecer a este aplicativo local um URL público temporário. Depois de fazer isso, você pode atualizar a configuração do número de telefone no console do Twilio para usar esse URL do ngrok em um webhook de voz.

Se todas as opções acima funcionarem, quando você clicar no botão *HACK*, o TwilioQuest poderá validar se o loop Gather está funcionando como esperado.

## Recriar a magia

Se você estiver tentando recriar esse código em funções ou seu próprio código, observe algumas coisas:

* Por padrão, o [Gather](https://www.twilio.com/docs/voice/twiml/gather) usa **o mesmo URL como o URL atual do TwiML** para o URL `action` que recebe um parâmetro POST `Digits` depois que o `<Gather>` é concluído. Assim, você pode fazer com que a mesma rota em seu aplicativo se torne um "loop Gather".
* Quando o URL `action` for solicitado, ele receberá `Digits` como um parâmetro `POST`.

Para passar pela validação deste desafio, a resposta do seu URL `action` deve conter uma tag `<Say>` com a string exata de `Digits` inserida durante o `<Gather>` anterior.