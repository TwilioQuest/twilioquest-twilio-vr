# Liberdade de expressão

Você não só pode obter tons DTMF de seu autor da chamada, como também aceitar a fala. O [verbo `<Gather>` do TwiML](https://www.twilio.com/docs/voice/twiml/gather) define um parâmetro chamado [`input`](https://www.twilio.com/docs/voice/twiml/gather#input) que você pode definir como `"speech"`. Para ajudar a compreender melhor a solicitação de fala, você pode (e deve) fornecer [`"hints"`](https://www.twilio.com/docs/voice/twiml/gather#hints) separadas por vírgula como um atributo.

Um fluxo comum para isso é colocar em seu aplicativo `<Say>` as opções disponíveis e pedir ao autor da chamada para dizê-las. As informações coletadas são postadas no campo `SpeechResult` mediante solicitação da Twilio.

Para abrir este baú, você deve fazer um aplicativo de Programmable Voice compatível com fala. Vamos imaginar que você está fazendo um URA para um banco. Quando o usuário liga, ele pode perguntar o horário de funcionamento, redefinir sua senha ou, por fim, pedir para falar com um agente.

Conecte seu número de entrada para obter informações de `<Gather>` `"speech"` pelo prompt: **O que você gostaria de fazer? Você pode dizer coisas como: horas, redefinir ou agente.**

Forneça dicas de correspondência e lide com as respostas para as seguintes solicitações de `SpeechResult`:

_redefinir_: `<Say>` "Seu pin foi redefinido" _horário_: `<Say>` "Nosso horário é de 9 às 5" _agente_: `<Say>` "Conectando você ao nosso próximo agente disponível"

_OBSERVAÇÃO – se você tiver problemas:_ Lembre-se de que você sempre pode gerar os valores `SpeechResult` e `Confidence` da solicitação da Twilio para ajudar a depurar suas interações.