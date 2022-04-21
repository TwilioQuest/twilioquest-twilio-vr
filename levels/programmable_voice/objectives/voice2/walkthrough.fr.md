# Parler facilement

Pour franchir cette barrière, vous devrez utiliser une langue autre que l'anglais pour parler à votre interlocuteur. Le [verbe TwiML `<Say>`](https://www.twilio.com/docs/voice/twiml/say) permet d'accéder à de nombreuses langues et voix différentes.

Choisir la bonne voix pour une tâche particulière vous permet de personnaliser l'expérience de votre utilisateur. Lorsque vous communiquez dans une langue différente, il est essentiel d'utiliser le bon personnage vocal pour fournir à votre application une authenticité culturelle.

## Attributs Say

La plupart des éléments TwiML fournissent des options de configuration. En général, cela se fait à l'aide des **attributs**. Chaque tag `TwiML` possède un ensemble prédéfini d'attributs. Par exemple, le tag `<Say>` vous permet de définir un attribut [`language`](https://www.twilio.com/docs/voice/twiml/say#attributes-language).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say language="es-MX">Hola, mundo</Say>
</Response>
```

Notez que le nom de l'attribut `language` est suivi d'un signe égal `=`, puis d'une valeur entre guillemets droits et doubles, dans ce cas `"es-MX"`.

TwiML de Twilio prend en charge de [nombreuses langues](https://www.twilio.com/docs/voice/twiml/say#attributes-language). L'exemple TwiML ci-dessus utilise `es-MX`. `es` correspond à Español et `MX` sélectionne l'idiome du Mexique.

À vous de jouer&nbsp;: configurez votre appel entrant pour qu'il réponde avec ce TwiML. Vous remarquerez qu'une nouvelle voix par défaut, basée sur la langue que nous avons spécifiée, a fait son apparition, ce qui change la donne.

## Amazon Polly

La prononciation fluide de textes par Amazon Polly vous aide à fournir une sortie vocale de haute qualité à un public international.

Pour mener à bien cette tâche, nous devons utiliser les paramètres locaux d'Amazon Polly pour `"es-US"` ou Amérique latine, et choisir la voix de `"Miguel"`.

Pour spécifier une voix dans votre TwiML, vous devez utiliser l'attribut **Voice**.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say language="es-US" voice="Polly.Miguel">Hola, mundo</Say>
</Response>
```

Écrivez le code ci-dessus dans un nouveau TwiML Bin et \[reliez-le à votre gestionnaire d'appels entrants sur votre numéro](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>)

## Écouter la nouvelle voix

N'hésitez pas à appeler votre numéro de téléphone (\<%= env.TQ_TWILIO_NUMBER.value %>). Mucho gusto, Miguel! Hola mundo, indeed!

Vous devez maintenant appuyer sur le bouton **HACK** pour franchir cette barrière et passer à la proxima aventura&nbsp;!