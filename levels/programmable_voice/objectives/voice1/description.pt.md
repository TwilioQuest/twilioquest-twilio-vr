# Manipulador cuidadoso

Para concluir este objetivo, [configure seu número de telefone](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) para ter um manipulador de fallback para chamadas de voz se o manipulador principal falhar. Sempre vale a pena ter um "Plano B".

Um [TwiML Bin](https://www.twilio.com/console/twiml-bins) é um plano de backup prático e confiável. Use a tag TwiML `<Say>` em seu TwiML para dar uma resposta aos autores da chamada indicando que seu aplicativo está com problemas. Depois de configurar o seu número com um backup confiável, clique no botão *HACK*. Se tudo estiver certo, nós ajudaremos <i>você</i> com um pouco de XP.