# Sentiment de rejet

Vous pouvez refuser un appel par programmation à l'aide du [verbe TwiML `<Reject>`](https://www.twilio.com/docs/voice/twiml/reject). Vous pouvez même définir un motif, ce qui modifiera l'expérience de l'appelant. Si vous définissez l'attribut `reason` sur `"busy"`, une sonnerie «&nbsp;occupé&nbsp;» se déclenchera. Si vous laissez l'attribut `reason` vide ou si vous le définissez spécifiquement sur la valeur par défaut `"rejected"`, une réponse standard «&nbsp;pas en service&nbsp;» se lancera.

Vous n'avez pas à payer pour les appels `<Reject>`, c'est donc un bon moyen de traiter les éventuels appels indésirables entrants.

Pour ouvrir ce coffre, vous devez bloquer un numéro spécifique. Tout d'abord, choisissez un numéro que votre code rejettera, puis écrivez le code pour bloquer ce numéro de manière conditionnelle. Après l'avoir testé, saisissez ce numéro dans l'interface **HACK** puis emparez-vous de votre XP et de votre joli butin&nbsp;!