# Un modèle à suivre

Utilisez la fonction de [modèles (templates) Mustache](https://www.twilio.com/docs/runtime/tutorials/twiml-bins#nice-mustache) de TwiML Bins pour que le corps de vos messages de réponse soit plus dynamique. \[Configurez votre numéro Twilio](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) pour utiliser un TwiML Bin afin de répondre à un message entrant (si ce n'est pas déjà fait). À l'aide de modèles de votre TwiML Bin, le corps du tag `<Message>` peut être&nbsp;:

```html
Message from {{From}}: {{Body}}
```

Associez cette fonction à l'attribut `to` du tag `<Message>`. Définissez `to` comme votre numéro de téléphone portable personnel. Désormais, tous les SMS envoyés à votre numéro Twilio seront transférés vers votre numéro de téléphone portable personnel&nbsp;! Une fois que vous l'avez configuré, cliquez sur le bouton *HACK* et nous validerons le fait que votre numéro est prêt pour le transfert.