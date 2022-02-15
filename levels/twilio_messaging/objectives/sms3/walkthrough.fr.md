# Configurer des URL status callback pour les messages

Lorsque vous envoyez un message avec Twilio, sous forme de SMS sortant ou de réponse à un SMS entrant, vous pouvez également spécifier un attribut `action` sur le verbe `<Message>` TwiML qui pointe vers une URL de webhook. Par exemple, lorsque votre message passe du statut «&nbsp;Sent&nbsp;» (Envoyé) à «&nbsp;Delivered&nbsp;» (Remis), Twilio envoie une requête à l'URL de webhook d'état que vous avez définie. Le code exécuté à cette URL peut prendre diverses actions en fonction de la requête envoyée par Twilio chaque fois que le statut du message change.

## Quels sont les statuts de message&nbsp;?

Voici quelques-uns des statuts de message que vous pouvez rencontrer&nbsp;:

- **Sent** (Envoyé)&nbsp;: L'opérateur en amont le plus proche a accepté le message.
- **Delivered** (Remis)&nbsp;: Twilio a reçu la confirmation de la livraison du message de l'opérateur en amont et, le cas échéant, du téléphone de destination.
- **Failed** (Échec)&nbsp;: Le message n'a pas pu être envoyé pour [diverses raisons](https://www.twilio.com/docs/sms/api/message-resource#delivery-related-errors).

Vous pouvez consulter les autres statuts sur [la page de référence API](https://www.twilio.com/docs/sms/api/message-resource#message-status-values).

## Configurer votre URL status callback

Vous avez découvert comment configurer une route dans une application Web pour répondre à un SMS entrant à votre numéro de téléphone Twilio. Maintenant, vous devez configurer une deuxième route. Celle-ci traitera les requêtes entrantes de Twilio lorsqu'il y a une mise à jour du statut de votre message de réponse.

Le code qui s'exécute dans la fonction correspondante peut tout faire. Pour franchir cette barrière, vous devrez saisir le `MessageSid` et le dernier statut que vous recevez. Où les trouver&nbsp;? Sur la `request` que Twilio envoie à votre application&nbsp;!

Souvenez-vous que Twilio envoie une requête à votre URL status callback à chaque fois que le statut de livraison de votre message est mis à jour. La requête contient les paramètres de requête standard de Twilio et [d'autres paramètres liés au statut](https://www.twilio.com/docs/sms/api/message-resource#statuscallback-request-parameters). Pour y accéder, consultez le `request.body`. Dans Node.js, cela ressemble à `request.body.MessageStatus` et à `request.body.MessageSid`.

Si je voulais l'afficher, il pourrait ressembler à ça dans Node.js et Express&nbsp;:

```
app.post('/status', (request) => {
  console.log(`Message SID ${request.body.MessageSid} has a status of ${request.body.MessageStatus}`);
});
```

Et dans une application Python Flask, cela se présenterait comme suit&nbsp;:

```
...
@app.route("/status", methods=["GET", "POST"])
def my_status_function():
    print(f"Message SID {request.values.get('MessageSid')} has a status of {request.values.get('MessageStatus')}")
```

## Utiliser l'attribut `action` TwiML

Lorsque vous créez un message avec TwiML, vous pouvez utiliser l'attribut `action` pour spécifier une URL de webhook. Un attribut se trouve à l'intérieur des tags `<...>` du verbe Message et donne plus d'informations à Twilio sur la façon d'envoyer le message en votre nom. Twilio envoie une requête à cette URL lorsque votre message se dirige vers sa destination.

```
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message action="https://your_url_here.com/status">Hello, World!</Message>
</Response>
```

_Remarques_&nbsp;: Vous n'avez pas besoin de définir l'attribut `action` sur l'URL complète si votre application contient également la route `status_callback`. Votre verbe `<Message>` peut avoir le format suivant&nbsp;: `<Message action="/status">Hello, World!</Message>`

Votre URL status callback doit pointer vers un code qui se soucie de ces mises à jour de statut. (Conseil&nbsp;: Pour cet exemple, il doit s'agir de la route que vous avez configurée pour les mises à jour de statut&nbsp;!)

## Relever le défi

Dans QuestIDE, votre propre code ou un TwiML Bin, répondez à un message entrant. Cette fois-ci, veillez à inclure l'attribut `action` sur le verbe `<Message>` que vous utilisez pour répondre.

Si vous utilisez QuestIDE, le squelette brut de l'application Web [Express.js](https://expressjs.com/) a été configuré. Vous devrez remplir les champs suivants&nbsp;:

1. La nouvelle route de l'URL status callbackURL (Conseil&nbsp;: peut-être quelque chose comme `/status`)
2. Le TwiML de messagerie pour répondre au SMS entrant avec l'attribut `action`
3. Le corps de la fonction qui est appelée lorsque Twilio envoie une requête à votre URL `status_callback` et imprime le `MessageSid` et le `MessageStatus`

Une fois que vous avez appuyé sur `RUN`, votre application Web démarre. Lorsque vous envoyez un SMS à votre numéro de téléphone Twilio, la requête de Twilio à votre application doit s'afficher dans la console. Une fois que votre application vous a renvoyé la réponse, votre code traitant la requête doit imprimer chaque mise à jour de statut que Twilio envoie à votre webhook&nbsp;! Copiez le message SID du message et mémorisez la dernière mise à jour d'état que vous recevez afin de pouvoir la saisir dans l'interface `HACK`.