# Mustache agradável

Para concluir este objetivo, você precisa aprender a incluir informações de uma chamada de voz recebida dinamicamente e, em seguida, usar essas informações em sua resposta.

## Modelos de Mustache

Os TwiML Bins oferecem uma maneira de criar espaços reservados que podem conter informações dinâmicas com a linguagem de templates Mustache.

O Mustache permite que você defina um espaço reservado, ou **tag**, ao redor da chave com chaves duplas: `{{ }}`. Se você virar a cabeça para o lado, verá por que a biblioteca recebeu esse nome. A chave `{` parece muito com um bigode.

Você pode incluir qualquer tag no TwiML, e o Mustache a substituirá pelo valor correspondente.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>We have got the perfect job for you in {{ ToCity }}</Say>
</Response>
```

Quando usado como um manipulador de chamadas recebidas, `ToCity` será substituído pelo nome da cidade em que o autor da chamada vive.

## Usar a solicitação recebida

Há [muitos valores disponíveis na chamada recebida](https://www.twilio.com/docs/voice/twiml#request-parameters). Você pode usar qualquer um deles em seu modelo.

Lembre-se de que eles diferenciam maiúsculas e minúsculas, por isso, `{{ from }}` totalmente em letras minúsculas é um valor diferente do que você quer, que é `{{ From }}` com inicial maiúscula.

Você também pode adicionar valores personalizados.

## Adicionar valores personalizados

Além de preencher os valores disponíveis na solicitação HTTP POST de entrada, você também pode adicionar outros valores. Você pode fazer isso usando uma string de consulta, que é a parte do URL que vem após `?` e são pares `key=value` separados por um `&`.

Por exemplo, o URL `https://techrecruiter.us?FirstName=Bob&LastName=Blahblah` tem uma string de consulta que contém os valores `FirstName` e `LastName`. Se esse URL fosse um TwiML Bin, você poderia substituir esses valores por espaços reservados.

### Criar o TwiML Bin

Primeiro, vamos criar um novo TwiML Bin para este exercício.

Vá até o [console](https://www.twilio.com/console) e, no menu lateral, escolha [TwiML Bins](https://www.twilio.com/console/runtime/twiml-bins). A partir daqui, você pode criar um novo TwiML Bin usando o botão `+`.

Vamos usar modelos, portanto, precisamos definir o **Nome amigável** como `Mustache Example`. Vamos fazer esse TwiML Bin cumprimentar a pessoa dinamicamente e dizer ao autor da chamada de onde a chamada está vindo.

Esse TwiML deve ficar assim:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Hello {{ Name }}! This call is coming from {{ From }}</Say>
</Response>
```

Clique no botão **Criar** para salvar seu novo TwiML Bin.

Talvez você tenha notado que ainda precisamos passar esse parâmetro `Name`.

Na parte superior da página do bin que você acabou de criar, você encontrará um campo chamado **URL**. Clique no link de cópia no final desse campo para copiar o URL para a área de transferência.

## Conectar o URL

Localize seu [número de telefone](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID.value %>).

Na seção **Voz e fax**, em **A Call Comes In** (Chamada recebida), selecione **Webhook** e cole no seu URL do TwiML Bin.

No final do URL, anexe a string de consulta `?Name=` e **type** (digite) seu nome no lado direito dos sinais de igual. Isso permitirá que o Mustache substitua a tag `{{ Name }}` pelo seu nome.

Não se esqueça de **Salvar** seu número de telefone com as alterações.

## Ligue para si mesmo

Agora ligue para o seu número de telefone (<%= env.TQ_TWILIO_NUMBER.value %>). Você deve ouvir seu nome e, em seguida, uma leitura muito boba de seu número de telefone.

Você fez um ótimo trabalho usando modelos para fazer sua mensagem mudar dinamicamente! Pressione o botão **HACK** quando estiver pronto para arrasar!

## Saiba mais

- [Tutorial do TwiML Bins](https://www.twilio.com/docs/runtime/tutorials/twiml-bins)