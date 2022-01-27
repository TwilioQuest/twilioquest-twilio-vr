# Como configurar um manipulador de fallback

Para desbloquear este baú, você precisará configurar uma maneira de lidar com erros que podem tornar seu aplicativo SMS indisponível. Se o aplicativo estiver inativo, é conveniente ter uma mensagem de backup que informe delicadamente às pessoas que a execução do aplicativo está passando por dificuldades (mas que você está trabalhando nisso, é claro!).

Examinaremos as práticas recomendadas, como configurar seu retorno de chamada e, em seguida, analisaremos como usar o [verbo da mensagem](https://www.twilio.com/docs/sms/twiml/message) de um TwiML Bin hospedado.

## O que é um fallback?

Como desenvolvedor, uma prática recomendada é não apenas prever, mas também se preparar para erros. Isso geralmente é feito por meio de algum tipo de mecanismo, normalmente chamado de “fallback”. A maioria das linguagens de programação tem algum tipo de palavra-chave ao longo das linhas de `try` e de `catch`. A lógica é: tente usar algum código, se ele não funcionar, pegue o erro e trate-o para o seu usuário. Você aplica o fallback para o caso de tratamento de erro.

O Twilio oferece essa funcionalidade para você, como desenvolvedor, em relação às mensagens recebidas.

## Infelizmente, erros são inevitáveis.

Assim como na vida real, os erros acontecem. Alguns desses erros, como o TwiML incorreto, podem derrubar o seu aplicativo. Quando o Twilio entra em contato com seu aplicativo e espera algumas instruções do TwiML, ele não saberá como lidar com um erro que tenha “emergido” do código.

Por qual outra razão você pode querer um plano de backup? Talvez a rede esteja lenta e seu servidor não consiga fornecer uma resposta em tempo hábil. Você não quer que o remetente da mensagem espere indefinidamente!

## OK, você venceu. Como eu faço para criar um fallback?

Na tela de edição do seu número de telefone, na seção **Mensagens**, você encontrará um campo chamado `Primary Handler Fails` (abaixo do manipulador “uma mensagem é recebida” que você definiu em um obstáculo anterior).

- No menu suspenso, selecione “TwiML”
- Clique no botão `+` (mais) que aparece para criar um novo TwiML Bin
- Dê um nome fácil, talvez algo como “caixa de mensagens de backup”
- Adicione suas instruções do TwiML para enviar sua mensagem de backup

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>We're sorry. We are currently experience difficulties. Please try again later. 🍰 </Message>
</Response>
```

(O emoji conciliatório de fatia de bolo 🍰 é opcional, claro).

Depois de ver a verificação de `Valid Messaging TwiML`, clique em **Create** (Criar) para salvar seu novo TwiML Bin de backup.

Por fim, certifique-se de pressionar o botão **Save** (Salvar) na tela de edição de seu número de telefone para salvar suas alterações.

## Vamos ver se isso funciona mesmo!

Bem, se você quiser verificar se o gerenciador de backup está funcionando, deve invadir intencionalmente o TwiML Bin que trata uma mensagem entrada. Isso fará com que o Twilio se volte para o TwiML Bin definido em “Falha no manipulador principal”. Uma maneira fácil de invalidar suas instruções principais do TwiML é colocar a tag `<Response>` do TwiML “Na resposta de entrada” `<response>` totalmente em minúsculas. **Save** (Salvar) essa alteração temporariamente e envie um SMS para seu número de telefone.

Você recebeu sua mensagem de backup como resposta? Este é o momento em que você fica entusiasmado em ver uma mensagem de erro.

Agora você deve inserir seu número no campo e pressionar o botão **HACK** para ficar no seu modo de desenvolvedor consciente!

(Não se esqueça de **corrigir** seu TwiML Bin principal. Os planos de backup são excelentes, mas devem ser apenas isso, um backup.)