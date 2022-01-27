# Digite seu pin para ganhar

O [`<Gather>` verbo TwiML tem algumas opções](https://www.twilio.com/docs/voice/twiml/gather) que permitem orientar a experiência do autor da chamada. Uma prática recomendada é informar ao autor da chamada o número de dígitos que ele deve inserir e continuar automaticamente depois de ter inserido esses dígitos.

Um exemplo comum disso é quando algo é dito como **"Por favor, insira seu pin de 4 dígitos"**. Isso indica claramente quantos dígitos são esperados. No entanto, sem qualquer codificação adicional, a espera de 5 segundos de `<Gather>` ainda ocorreria. Para corrigir isso, você pode limitar o número de dígitos aceitos. Você faz isso com o atributo `numDigits` no verbo `<Gather>`.

Para abrir este baú, colete uma senha de 4 dígitos do autor da chamada, definindo o atributo `numDigits` como 4.