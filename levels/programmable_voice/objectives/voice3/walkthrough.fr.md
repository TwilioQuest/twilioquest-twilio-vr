# Vous pouvez le répéter

Pour ouvrir ce coffre, vous allez pouvoir répéter ce que vous dites. Le `<Say>` [verbe TwiML](https://www.twilio.com/docs/voice/twiml/say) fournit un attribut nommé [`loop`](https://www.twilio.com/docs/voice/twiml/say#attributes-loop) qui entraîne la répétition de la parole `<Say>` autant de fois que nécessaire.

## Trésor supplémentaire&nbsp;: Boucles infinies

Une valeur `loop` spéciale de `0` entraîne la répétition permanente de votre synthèse vocale Text to Speech jusqu'à ce que l'appelant raccroche. Mes enfants ont effectué cette configuration avec le texte `"Are we there yet?"`.

## Configurer la boucle

Faites un essai. Configurez le TwiML de façon à répéter la citation&nbsp;: **Tout ce qui mérite d'être fait vaut la peine d'être fait deux fois.**

Et bien sûr, vous le direz... deux fois.

Pour votre \[gestionnaire d'appels entrants](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>), assurez-vous que le TwiML que vous renvoyez utilise la valeur `loop`.

Si vous avez besoin d'aide, cliquez sur le spoiler ci-dessous pour l'ouvrir.

<details>
    <summary>Spoiler: code TwiML</summary>
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say loop="2">Anything worth doing is worth doing twice.</Say>
</Response>
```

</details>
N'oubliez pas d'**enregistrer** vos paramètres de numéro de téléphone&nbsp;!

## Effectuer un test

N'hésitez pas à appeler votre numéro de téléphone (\<%= env.TQ_TWILIO_NUMBER.value %>). Si vous entendez la citation deux fois, vous avez réussi&nbsp;!

Maintenant, appuyez sur le bouton **HACK** pour ouvrir ce coffre et poursuivre votre voyage&nbsp;!