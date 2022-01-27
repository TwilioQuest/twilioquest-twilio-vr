# Você pode dizer isso novamente

Para abrir esse baú, você vai selecionar a capacidade de repetir o que você diz. O [verbo `<Say>` do TwiML](https://www.twilio.com/docs/voice/twiml/say) fornece um atributo chamado [`loop`](https://www.twilio.com/docs/voice/twiml/say#attributes-loop) que faz o discurso de `<Say>` ser repetido inúmeras vezes.

## Tesouro extra: Loops infinitos

Um valor de `loop` especial `0` fará com que o texto convertido em fala seja repetido infinitamente até que o autor da chamada desligue. Meus filhos fizeram essa configuração com o texto `"Are we there yet?"`.

## Configurar o loop

Vamos tentar. Vamos preparar o TwiML para repetir a frase: **Tudo o que vale a pena fazer vale fazer em dobro.**

E, é claro, vamos dizer isso... duas vezes.

Para seu \[manipulador de chamadas recebidas](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>), verifique se o TwiML que você retornar usará o valor `loop`.

Se precisar de ajuda, clique para abrir o spoiler abaixo.

<details>
    <summary>Spoiler: O código TwiML</summary>
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say loop="2">Anything worth doing is worth doing twice.</Say>
</Response>
```

</details>
Não se esqueça de **Save** (Salvar) suas configurações de número de telefone!

## Faça o teste

Ligue para seu número de telefone (\<%= env.TQ_TWILIO_NUMBER.value %>). Se você ouvir a citação duas vezes, você conseguiu!

Agora, pressione o botão **HACK** para que possamos arrombar esse baú e continuar sua jornada!