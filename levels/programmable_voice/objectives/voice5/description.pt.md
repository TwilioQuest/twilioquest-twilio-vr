# Junção da função

[Criar](https://www.twilio.com/console/runtime/functions/manage) uma [função do Twilio](https://www.twilio.com/docs/runtime/functions) para responder a uma chamada recebida. Sua função deve conter lógica que, em última análise, retorna uma resposta de voz do TwiML. No entanto, a resposta deve ser diferente **se o número de telefone do autor da chamada contiver um prefixo especial:** que você especifica (e nos conta na IU do hack à direita).

Por exemplo, se o autor da chamada estiver ligando de um número que começa com `+1503`, você poderá responder com: `<Say>Keep Portland weird!</Say>`. Se o número de telefone do autor da chamada não começar com esse prefixo, você `<Say>` outra coisa.

Quando o URL de voz de [seu número de telefone](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : %>) estiver conectado a uma função que se comporte desta forma, clique no botão *HACK*. Vamos garantir que você coloque a "diversão" em funcionamento.