# Manipulador cuidadoso

Para destrancar esse baú, você precisará definir uma maneira de lidar com erros que possam ocorrer no seu aplicativo de voz.

Abordaremos as práticas recomendadas, mostraremos como configurar um retorno de chamada e, em seguida, analisaremos como usar o [verbo `<Say>`](https://www.twilio.com/docs/voice/twiml/say) de um TwiML Bin hospedado.

## Erros são inevitáveis

Ninguém é perfeito...nem mesmo Cedric. É provável que, em algum momento, haja um erro em seu código.

Há também circunstâncias que estão fora de seu controle. Por exemplo, se você estiver respondendo de seu próprio servidor, talvez ele não forneça uma resposta em tempo hábil. Você não quer deixar o chamador esperando indefinidamente, você quer fornecer um fallback.

A maioria das linguagens de programação tem um mecanismo de fallback integrado, algum tipo de palavra-chave parecida com `try` e `catch`. A lógica é: tente algum código e, se ele não funcionar, pegue o erro e trate dele para o seu usuário.

O Twilio fornece essa funcionalidade para você em chamadas recebidas.

## Criar um fallback

Na tela de edição do seu [<%= env.TQ_TWILIO_NUMBER.value %> número de telefone](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID.value %>), na seção **Voz e fax**, você verá um campo identificado como `Primary Handler Fails`. Escolha TwiML no primeiro menu suspenso e crie um novo TwiML Bin clicando no botão de adição nessa linha.

Nomeie o seu TwiML Bin como `Please Call Again`. Adicione algum TwiML no corpo para fazer a conversão do texto em fala, portanto:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>We are currently experiencing difficulties. Please call again.</Say>
</Response>
```

Supondo que você não esteja enfrentando dificuldades no momento 😉, você verá uma verificação do `Valid Voice TwiML`. Clique em **Create** (Criar) para salvar seu novo TwiML Bin e em **Save** (Salvar) para salvar a configuração do número.

## Verifique se ele funciona quando as outras coisas não funcionam

Para verificar se a manipulação de erros funciona, vá em frente e bagunce seu TwiML recebido de propósito. Minha maneira favorita de fazer isso é intencionalmente colocar a tag `<Response>` do TwiML de "Chamada recebida" toda em letras minúsculas `<response>`. **Save** (Salve) essa alteração temporariamente e, em seguida, ligue para o seu número de telefone. Bom trabalho! Agora, **fix** (corrija) seu manipulador de chamadas recebidas!

Depois, pressione o botão **HACK** para que possamos arrombar esse baú e seguir para a próxima aventura!