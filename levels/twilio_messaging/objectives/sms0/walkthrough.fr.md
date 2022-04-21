# Envoyer un SMS

À ce stade, vous avez normalement terminé votre formation de base et configuré votre compte et votre numéro de téléphone Twilio via ce processus. Il est maintenant temps d'utiliser tous ces éléments afin d'envoyer un message texte. Twilio fournit une [API RESTful](https://www.twilio.com/docs/sms/api) qui vous permet d'envoyer des SMS par programmation (et d'effectuer de nombreuses autres tâches utiles).

Pour franchir cette barrière, vous devez utiliser l'API de Twilio pour envoyer un message texte et récupérer l'ID unique du message envoyé.

## Rappel&nbsp;: qu'est-ce qu'une API&nbsp;?

Twilio fournit une API qui vous permet d'envoyer des messages texte par programmation, mais qu'est-ce qu'une API&nbsp;? [API](https://www.twilio.com/docs/glossary/what-is-an-api) signifie «&nbsp;Application Programming Interface&nbsp;» (Interface de programmation d'application).

L'API peut être comparée à un serveur dans un restaurant. L'API est le serveur, la cuisine est le service (Twilio) et le client est le client/consommateur de l'API (votre code). Dans un restaurant, le client commande un plat au serveur et le serveur transmet cette demande à la cuisine pour qu'elle soit traitée. Le client n'a aucune idée de la façon dont le plat a été préparé. Son seul souhait est de recevoir le plat qu'il a commandé. De la même façon, votre code va demander des ressources via l'API de Twilio. Dans ce cas, il va créer un message texte sortant en votre nom. Twilio a simplifié toutes les complexités liées à l'envoi du message. Il vous suffit d'indiquer à l'API que vous souhaitez envoyer un SMS.

Vous écrivez du code pour interagir avec l'API de Twilio via des requêtes HTTP vers certains endpoints pour créer, lire, mettre à jour ou supprimer des ressources de message.

## De quelles informations ai-je besoin pour envoyer un SMS&nbsp;?

Lorsque vous effectuez une requête API à Twilio, en plus de transmettre vos informations d'authentification, vous devez fournir au moins trois paramètres&nbsp;:

- **Body:** Le texte réel du message à envoyer.
- **To:** Le numéro de téléphone du destinataire du message. Si vous utilisez un compte d'essai, il doit s'agir de l'un de vos [numéros de téléphone vérifiés](https://www.twilio.com/console/phone-numbers/verified).
- **From:** Le numéro de téléphone programmable Twilio à partir duquel le message est envoyé. Vous pouvez utiliser un numéro de téléphone configuré précédemment (consultez l'interface utilisateur **Settings** (Paramètres)) ou [un numéro de téléphone Twilio compatible SMS dont vous êtes propriétaire](https://www.twilio.com/console/phone-numbers/incoming).

## Envoyer une requête API

Vous pouvez envoyer une requête à l'[API REST de Twilio](https://www.twilio.com/docs/sms/api) à partir de tous les environnements ou outils de programmation prenant en charge la création de requêtes HTTP. Twilio fournit diverses [librairies](https://www.twilio.com/docs/libraries) côté serveur pour de nombreux langages de programmation courants qui facilitent ce processus.

Pour envoyer un SMS, vous interagissez avec la [ressource de message](https://www.twilio.com/docs/sms/api/message-resource). L'envoi d'une requête HTTP POST à cet endpoint d'API entraîne la création (et l'envoi) d'un nouveau message.

La commande [cURL](https://curl.haxx.se/docs/manual.html) suivante envoie un message à partir de votre compte (lorsqu'elle est configurée avec les paramètres nécessaires au lieu des espaces réservés).

```
curl -X POST https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages.json \
--data-urlencode "From=+15017122661" \
--data-urlencode "Body=Body" \
--data-urlencode "To=+15017122661" \
-u ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_auth_token
```

La documentation Twilio contient des [exemples de code pour de nombreux langages de programmation](https://www.twilio.com/docs/sms/api/message-resource#create-a-message-resource), indiquant comment envoyer des SMS à l'aide de la librairie Twilio pour cet environnement. Voici [un exemple d'utilisation de la librairie Python](https://www.twilio.com/docs/sms/api/message-resource?code-sample=code-create-a-message&code-language=Python&code-sdk-version=6.x)&nbsp;:

```python
from twilio.rest import Client

# Your Account Sid and Auth Token from twilio.com/console
account_sid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
auth_token = 'your_auth_token'
client = Client(account_sid, auth_token)

message = client.messages.create(
    from_='+15017122661',
    body='body',
    to='+15558675310'
)

print(message.sid)
```

Comparez les exemples cURL et Python ci-dessus. Ces exemples sont différents, car la syntaxe varie d'une langue à l'autre, mais le concept principal d'API principal est le même. Dans chacun d'entre eux, un message est créé et envoyé via une requête POST à l'endpoint de messagerie de l'API Twilio selon trois paramètres&nbsp;: un numéro `from`, un numéro `to` et du texte `body`.

Si vous utilisez QuestIDE, un exemple de code [Node.js](https://nodejs.org/) modifiable est chargé pour vous, prérempli avec la plupart des paramètres nécessaires de votre configuration TwilioQuest.

## Relever le défi

Lorsque vous envoyez une requête API, le message SID du message est l'un des éléments de données renvoyés par la requête. Copiez cette valeur et collez-la dans l'interface de piratage à droite. Lorsque vous cliquez sur le bouton *HACK*, TwilioQuest interroge votre compte Twilio et s'assure que ce message existe bien. Si c'est le cas, vous avez gagné&nbsp;!