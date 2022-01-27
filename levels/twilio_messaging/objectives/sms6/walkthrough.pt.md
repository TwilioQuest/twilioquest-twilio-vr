# Como expandir as mensagens do TwiML com modelos

Você viu o TwiML e usou-o para responder a uma mensagem de entrada, mas há mais coisas que você pode fazer com isso! No texto a seguir, você aprenderá sobre os atributos **para** (to) do verbo da `<Message>` e como usar modelos.

## Como encaminhar sua mensagem para um número diferente

Digamos que você deseja encaminhar todas as mensagens de entrada para seu número pessoal? Com o atributo `to` do TwiML no verbo da `<Message>`, você pode especificar um número para o qual o Twilio transmitirá a mensagem.

Para adicionar o atributo `to` ao verbo da `<Message>`, coloque-o entre colchetes angulares:

```
<Message to="+16175551212">
```

## TwiML: Agora com modelos Mustache

Ao configurar seu TwiML, você pode usar os modelos Mustache para atualizar dinamicamente (em tempo real) sua mensagem quando ela for executada. Os [modelos Mustache](https://mustache.github.io/mustache.5.html) recebem esse nome por causa das chaves curvas `{{...}}` que se parecem um pouco com um bigode virado de lado.

Quando o Twilio faz uma solicitação para seu aplicativo (neste exemplo, um TwiML Bin), você pode acessar algumas das informações na solicitação. Dê uma olhada no seguinte exemplo:

```
<Response>
	<Message>{{From}} said "{{Body}}"</Message>
</Response>
```

Quando o Twilio verificar as instruções do TwiML sobre como responder a uma mensagem recebida, ele substituirá o valor `{{From}}` pelo número de telefone **de** e o valor de `{{Body}}` pelo **corpo** da mensagem recebida.

## Coloque tudo em funcionamento

Crie um novo TwiML Bin para encaminhar uma mensagem de entrada para o seu próprio número de telefone celular. Você precisará usar:

1. o verbo da `<Message>` e o atributo `to`
2. o modelo Mustache para capturar o `Body` e o número de `From` (dica: dê uma olhada no exemplo acima).

Não se esqueça de configurar seu número de telefone Twilio para seu novo TwiML Bin na configuração “uma mensagem é recebida”.

## Como fazer os testes

Envie uma mensagem para o seu número Twilio, ou melhor ainda, peça a um amigo que envie uma mensagem texto para o seu número Twilio! Se você escreveu o TwiML corretamente, deve receber uma mensagem de texto em seu próprio número informando o corpo e o número de telefone do remetente original.

Depois de confirmar esta etapa, insira seu número de telefone **Twilio** na interface à direita e pressione o botão _HACK_ para ganhar seus pontos!