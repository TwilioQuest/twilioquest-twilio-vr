# Épingler pour mieux réussir

Le [verbe TwiML `<Gather>` dispose de plusieurs options](https://www.twilio.com/docs/voice/twiml/gather) qui vous permettront de guider l'expérience de votre interlocuteur. L'une des meilleures pratiques consiste à informer l'appelant du nombre de chiffres qu'il doit saisir, puis à continuer automatiquement après avoir saisi ces chiffres.

Ce message est un exemple typique&nbsp;: «&nbsp;**Veuillez saisir votre code PIN à 4 chiffres**&nbsp;». Le nombre de chiffres escompté est clairement énoncé. Cependant, sans code supplémentaire, l'attente de 5&nbsp;secondes de `<Gather>` aura toujours lieu. Pour résoudre ce problème, vous pouvez limiter le nombre de chiffres que vous acceptez en utilisant l'attribut `numDigits` du verbe `<Gather>`.

Pour ouvrir ce coffre, récupérez le code PIN à 4&nbsp;chiffres de l'appelant en définissant l'attribut `numDigits` sur 4.