# Application internationale du Mystère

Pour réussir dans cet objectif, vous devez ajouter l'attribut `language` à votre tag `<Say>` ([docs](https://www.twilio.com/docs/voice/twiml/say#attributes-language)). Vos messages de synthèse vocale (text-to-speech) interpréteront ensuite votre texte en utilisant la langue appropriée.

Configurez le TwiML que vous utilisez pour \[votre numéro de téléphone](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) afin de renvoyer un tag `<Say>` qui utilise une valeur valide pour l'attribut `language`. Vous pouvez le tester (pour l'espagnol) à l'aide du texte `hola, mundo`. Vous pouvez spécifier `es-US` comme attribut de langue. Vous pouvez également essayer différents attributs `voice`, comme `Polly.Miguel` qui utilise [Amazon Polly](https://www.twilio.com/docs/voice/twiml/say/text-speech#amazon-polly) pour la synthèse vocale.

Une fois que vous avez configuré votre numéro avec un nouveau langage, cliquez sur le bouton *HACK*.