# Você recebeu um erro... Fallback!

Segurança é legal, assim como os planos de backup para seu aplicativo de SMS! Se houver um problema com o URL que lida com mensagens SMS de entrada da Twilio, você pode configurar um **manipulador de fallback** para garantir que seus usuários ainda recebam uma resposta ao enviar mensagens de texto para o seu número.

\[Configure seu número da Twilio](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) para ter um manipulador de fallback. Você verá uma opção para configurar um sob o texto **"FALHA NO MANIPULADOR PRINCIPAL"**. Um [TwiML Bin](https://www.twilio.com/console/twiml-bins) é uma solução prática e confiável para uma resposta estática de fallback.

Depois de configurar seu manipulador de fallback para um URL que retorna mensagens no TwiML, clique no botão *HACK* e receba sua recompensa!