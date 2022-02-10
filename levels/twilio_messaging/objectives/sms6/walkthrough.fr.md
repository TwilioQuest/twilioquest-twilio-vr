# Développement du langage TwiML avec des templates

Vous avez appris à utiliser TwiML pour répondre à un message entrant, mais vous pouvez l'utiliser pour tellement d'autres choses&nbsp;! Vous découvrirez ci-dessous l'attribut **to** du verbe `<Message>` et comment utiliser des templates.

## Transférer votre message vers un autre numéro

Imaginez que vous vouliez transférer tous les messages entrants vers votre numéro personnel&nbsp;? L'attribut `to` de TwiML sur le verbe `<Message>` vous permet de spécifier un numéro auquel Twilio va transférer le message.

Pour ajouter l'attribut `to` au verbe `<Message>`, placez-le entre crochets&nbsp;:

```
<Message to="+16175551212">
```

## TwiML&nbsp;: Désormais disponible avec les templates Mustache

Lorsque vous configurez votre TwiML, utilisez les templates Mustache pour mettre directement à jour votre message de manière dynamique lorsqu'il est exécuté. Les [Templates Mustache](https://mustache.github.io/mustache.5.html) sont ainsi nommés en raison des accolades `{{...}}` qui ressemblent un peu à une moustache en guidon tournée sur le côté.

Lorsque Twilio envoie une requête à votre application (dans cet exemple, un TwiML Bin), vous pouvez accéder à certaines des informations de la requête. Consultez l'exemple suivant&nbsp;:

```
<Response>
	<Message>{{From}} said "{{Body}}"</Message>
</Response>
```

Lorsque Twilio examine les instructions de TwiML pour savoir comment répondre à un message entrant, il remplace la valeur `{{From}}` par le numéro de téléphone de l'**expéditeur** et la valeur `{{Body}}` par le **corps** du message reçu.

## Assemblage

Créez un TwiML Bin pour transférer un message entrant vers votre propre numéro de téléphone portable. Vous devrez utiliser&nbsp;:

1. le verbe `<Message>` et l'attribut `to`
2. le template Mustache pour noter le texte `Body` et le numéro `From` (conseil&nbsp;: examinez plus en détail le code ci-dessus).

N'oubliez pas de configurer votre numéro de téléphone Twilio sur votre nouveau TwiML Bin sous le paramètre «&nbsp;A message comes in&nbsp;» (Message entrant).

## Effectuer un test

Envoyez un message à votre numéro Twilio ou, mieux encore, demandez à un ami de le faire&nbsp;! Si vous avez correctement écrit le TwiML, vous devriez recevoir un message texte sur votre propre numéro qui vous indique le corps et le numéro de téléphone de l'expéditeur d'origine.

Une fois que vous avez confirmé cette étape, saisissez votre numéro de téléphone **Twilio** dans l'interface à droite et appuyez sur le bouton _HACK_ pour remporter des points&nbsp;!