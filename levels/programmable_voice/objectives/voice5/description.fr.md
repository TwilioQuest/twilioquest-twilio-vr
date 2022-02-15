# Jonction de Functions

[Créez](https://www.twilio.com/console/runtime/functions/manage) une Function [fFunction Twilio](https://www.twilio.com/docs/runtime/functions) pour répondre à un appel entrant. Votre fonction doit contenir une logique qui finit par renvoyer une réponse Voice TwiML. Cependant, la réponse peut varier **si le numéro de téléphone de l'appelant contient un préfixe spécial**&nbsp;: vous devez le spécifier (et le mentionner dans l'interface utilisateur HACK à droite).

Par exemple, si l'appelant appelle à partir d'un numéro commençant par `+1503`, vous pouvez répondre par&nbsp;: `<Say>Keep Portland weird!</Say>`. Si le numéro de téléphone de l'appelant ne commence pas par ce préfixe, vous devez utiliser `<Say>` pour autre chose.

Quand l'URL Voice de [votre numéro de téléphone](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) est connectée à une Function qui se comporte de cette manière, cliquez sur le bouton *HACK*. Nous voulons juste que vous mettiez le «&nbsp;fun&nbsp;» de Function en pratique.