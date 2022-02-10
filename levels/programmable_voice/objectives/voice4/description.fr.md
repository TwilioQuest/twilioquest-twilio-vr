# Utiliser le tag \<Play>

Le tag TwiML `<Play>` ([docs](https://www.twilio.com/docs/voice/twiml/play)) lit un fichier audio à l'appelant. Vous pouvez l'utiliser pour lire de la musique d'attente ou pour vous servir des messages d'accueil vocaux pré-enregistrés personnalisés. Pour relever ce défi, vous devez configurer l'application que vous utilisez avec \[votre numéro de téléphone](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) afin d'utiliser le tag `<Play>`. Si vous avez besoin d'un fichier audio à utiliser avec votre code, pouvons-nous vous suggérer ce qui suit&nbsp;?

```bash
http://demo.twilio.com/docs/classic.mp3
```

Si vous utilisez le fichier audio ci-dessus, **n'oubliez pas d'appeler d'abord votre numéro** pour... faire un test. Lorsque l'URL Voice de votre numéro renvoie du TwiML qui utilise le tag `<Play>`, cliquez sur le bouton *HACK*.