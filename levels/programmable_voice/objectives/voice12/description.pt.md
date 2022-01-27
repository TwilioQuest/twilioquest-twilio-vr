# Sentindo-se rejeitado

Você pode recusar uma chamada de forma programática usando o [`<Reject>` verbo TwiML](https://www.twilio.com/docs/voice/twiml/reject). Você pode até mesmo definir um motivo, o que alterará a experiência do autor da chamada. Definir o atributo `reason` como `"busy"` fará com que toque o sinal de ocupado. Deixar `reason` em branco ou defini-lo especificamente para o padrão de `"rejected"` irá reproduzir uma resposta padrão de fora de serviço.

Você não tem que pagar por chamadas `<Reject>`, portanto, essa é uma boa maneira de lidar com possíveis chamadas de spam recebidas.

Para abrir este baú, você deve bloquear um número específico. Primeiro, decida um número que seu código rejeitará e escreva o código para bloquear esse número condicionalmente. Depois de testar, insira esse número na interface **HACK** e pegue seu XP e seu doce espólio!