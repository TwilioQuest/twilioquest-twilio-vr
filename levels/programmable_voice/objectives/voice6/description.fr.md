# Jolie Mustache

Vous pouvez utiliser le templating [Mustache](https://mustache.github.io/) pour rendre le contenu de votre TwiML Bin un peu plus dynamique. Les [paramètres standard envoyés dans une requête webhook Twilio Voice](https://www.twilio.com/docs/voice/twiml#request-parameters), ainsi que les [paramètres de chaîne de la requête](https://en.wikipedia.org/wiki/Query_string) ajoutés à l'URL de votre TwiML Bin, sont disponibles dans votre template. Pour relever ce défi, vous devez créer un TwiML Bin qui utilise le tag `<Say>` pour lire à voix haute un message dynamique au format&nbsp;:

<pre>
Hello! You are calling from {insert the caller phone number here}.
</pre>
Pour information&nbsp;: la variable `From` est l'une des valeurs dynamiques disponibles dans votre template et elle contient le numéro de téléphone de l'appelant. Quand l'URL Voice de [votre numéro de téléphone](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) dispose d'un TwiML Bin pouvant faire cela, cliquez sur le bouton *HACK*.