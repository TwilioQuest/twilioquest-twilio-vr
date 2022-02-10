# Envoi de messages MMS sortants

Remarques&nbsp;: Cet objectif concerne uniquement les numéros de téléphone aux États-Unis et au Canada.

Vous pouvez utiliser l'[API RESTful](https://www.twilio.com/docs/sms/api) de Twilio pour envoyer un MMS sortant, comme vous l'avez fait lorsque vous avez envoyé votre premier SMS. Pour ouvrir ce coffre, vous devez suivre les mêmes étapes que pour envoyer un SMS, mais avec un ajout très important&nbsp;: _l'URL du média que vous souhaitez envoyer_.

## De quoi ai-je besoin pour envoyer un message MMS&nbsp;?

Tout comme lorsque vous envoyez un SMS, vous devez authentifier la requête que vous envoyez à l'API de Twilio. Lorsque vous soumettez la requête, vous transmettez trois paramètres&nbsp;:

- **MediaUrl (et/ou Body)&nbsp;:** Twilio a besoin d'un contenu pour envoyer votre message&nbsp;: MediaUrl, Body ou les deux&nbsp;! Vous devez indiquer à l'API de Twilio où trouver l'image que vous souhaitez envoyer dans votre MMS en transmettant un [MediaUrl (image)](https://www.twilio.com/docs/sms/api/message-resource#create-a-message-resource).
- **À&nbsp;:** Le numéro de téléphone du destinataire du message. Si vous utilisez un compte d'essai, il doit s'agir de l'un de vos [numéros de téléphone vérifiés](https://www.twilio.com/console/phone-numbers/verified).
- **De&nbsp;:** Le numéro de téléphone programmable Twilio à partir duquel le message est envoyé. Vous pouvez utiliser un numéro de téléphone que vous avez configuré précédemment (consultez l'interface utilisateur **Paramètres**) ou [tout numéro de téléphone compatible aux SMS dont vous êtes propriétaire](https://www.twilio.com/console/phone-numbers/incoming).

## Préparer une requête API

C'est à vous de déterminer la manière dont vous envoyez la requête à l'API de Twilio. Vous pouvez utiliser l'une des [librairies de Twilio](https://www.twilio.com/docs/libraries) ou la commande [cURL](https://curl.haxx.se/docs/manual.html) suivante, en remplaçant vos propres informations d'identification et URL de média&nbsp;:

```
curl -X POST'https://api.twilio.com/2010-04-01/Accounts/AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages.json' \
--data-urlencode "From=+15017122661" \
--data-urlencode "To=+15017122661" \
--data-urlencode 'MediaUrl=https://i.ytimg.com/vi/U_JbTHp6uzI/maxresdefault.jpg' \
-u AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:[AuthToken]
```

En utilisant la [librairie de Python](https://www.twilio.com/docs/sms/tutorials/how-to-send-sms-messages-python), voici à quoi cela ressemblerait&nbsp;:

```python
from twilio.rest import Client

# your account sid and auth token from twilio.com/console
account_sid = 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
auth_token = 'your_auth_token'
client = Client(account_sid, auth_token)

message = client.messages.create(
    media_url="https://i.ytimg.com/vi/U_JbTHp6uzI/maxresdefault.jpg",
    body="Why isn't that an API?",
    from_="+15017122661",
    to="+15558675310"
)

print(message.sid)
```

Si vous utilisez le QuestIDE, un modèle de code [Node.js](https://nodejs.org/) modifiable sera chargé pour vous. Cependant, les paramètres ne seront pas préchargés pour vous, vous devrez donc les remplir vous-même cette fois-ci.

## Ouverture du coffre

Lorsque vous soumettez la requête de l'API, vous recevez un SID de message pour votre MMS. Vous pouvez dire qu'il s'agit d'un MMS, car il commence par _MM_. Copiez le SID de votre MMS et saisissez-le dans l'interface de hacking. Une fois que vous avez appuyé sur `HACK`, TwilioQuest vérifie votre compte Twilio et confirme que le SID de votre message contient une MediaUrl.