# Comment Twilio utilise les webhooks

Twilio utilise un mécanisme de rappel appelé [webhooks](https://www.twilio.com/docs/glossary/what-is-a-webhook) pour indiquer à votre application que l'un de vos numéros a reçu un SMS entrant. Twilio enverra une requête HTTP POST ou GET vers une URL spécifiée avec un corps POST ou des paramètres de requête contenant des [informations sur le texte entrant](https://www.twilio.com/docs/sms/twiml#twilios-request-to-your-application), comme le numéro d'origine et le contenu du message.

Cela vous rappelle quelque chose&nbsp;? C'est parce que vous avez déjà travaillé avec des webhooks pour gérer les SMS entrants&nbsp;! Lorsque vous avez sélectionné un Twilio Bin ou une fonction Twilio sous **MESSAGE ENTRANT**, vous avez configuré Twilio pour qu'il envoie une requête à une URL spécifique.

### Configurer une URL Webhook

La première étape pour recevoir un SMS entrant consiste à configurer une URL que Twilio ira chercher lorsqu'un de vos numéros de téléphone reçoit un SMS entrant. Recherchez [vos numéros de téléphone programmables dans la console](https://www.twilio.com/console/phone-numbers/incoming), puis cliquez sur l'un d'entre eux pour le configurer.

<center>
  <img src="images/programmable_sms/active-numbers.png" />
</center>
Faites défiler la page de configuration du numéro de téléphone jusqu'à la section **Messaging** (Messagerie). Recherchez le libellé **A MESSAGE COMES IN** (MESSAGE ENTRANT) à côté de deux menus déroulants.

<center>
  <img src="images/console/sms_webhooks.png" />
</center>
Voyons ce que vous pouvez faire ici avec les chiffres.

1. Sélectionnez une option pour traiter des messages entrants. Pour cet exercice, nous voulons des webhooks, mais il existe de nombreuses autres façons de traiter les SMS entrants. Nous en parlerons plus tard.

2. Encore une fois, sélectionnez «&nbsp;Webhook&nbsp;». Mais comme nous l'avons vu, il existe d'autres moyens de traiter la requête HTTP que Twilio envoie à votre application, comme les TwiML Bins et les fonctions.

3. Ici, configurez l'URL de votre application côté serveur. Il doit s'agir d'une URL publique vers laquelle Twilio peut envoyer une requête HTTP. Vous ne savez pas comment procéder lorsque votre code est en cours d'exécution sur votre ordinateur&nbsp;? Lisez la suite, nous vous aiderons à résoudre ce problème.

4. Configurez une méthode HTTP que Twilio utilisera lors de l'envoi de la demande. Il peut s'agir de GET ou POST. Les requêtes GET reçoivent des données sur le message entrant en tant que [paramètres de requête](https://en.wikipedia.org/wiki/Query_string). Les requêtes POST contiennent un [corps POST avec URL encodée](https://stackoverflow.com/questions/14551194/how-are-parameters-sent-in-an-http-post-request).

### Écrire un code côté serveur pour traiter la demande de webhook Twilio

Voyons maintenant comment écrire le code qui traite la demande de webhook entrante de Twilio. Lorsque quelqu'un envoie un SMS à votre numéro de téléphone Twilio, vous indiquez à Twilio de rechercher les instructions TwiML dans l'URL de votre webhook. (Auparavant, nous avons demandé à Twilio de rechercher ces instructions dans une URL où nous avons configuré un TwiML Bin ou une fonction.) C'est ici que vous pouvez écrire votre propre application Web pour gérer les demandes et générer votre fichier TwiML idéal.

Vous pouvez traiter ces requêtes de Twilio à l'aide de n'importe quel langage ou framework de programmation capable d'accepter les requêtes HTTP et de fournir du XML en réponse (n'importe lequel, donc). Votre application Web doit pouvoir faire plusieurs choses&nbsp;:

1. Gérer la demande entrante et l'acheminer de manière appropriée vers une fonction
2. Renvoyer TwiML (soit TwiML «&nbsp;brut&nbsp;», soit en utilisant une [librairie d'aide côté serveur](https://www.twilio.com/docs/libraries) pour le générer avec des appels de fonction)

Si vous choisissez d'utiliser QuestIDE, vous recevrez un exemple de code qui répond avec TwiML dans Node.js (à l'aide du framework Web [Express](https://expressjs.com/)) qui ressemble à ceci&nbsp;:

```js
const http = require('http');
const express = require('express');
const { urlencoded } = require('body-parser');

// Set up our express web application
const PORT = 8767;
const app = express();
app.use(urlencoded({ extended: false }));

// Create a route to handle incoming SMS messages
// This is where the magic happens!
app.post('/sms', (request, response) => {
  console.log(
    `Incoming message from ${request.body.From}: ${request.body.Body}`
  );
  // Here, we're writing and returning raw TwiML
  response.type('text/xml');
  response.send(`
    <Response>
      <Message>I'm busy questing right now!</Message>
    </Response>
  `);
});

// Create and run an HTTP server which can handle incoming requests
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Express server listening on localhost:${PORT}`);
});
```

## Utiliser un langage et un framework différents

Si vous préférez ne pas utiliser QuestIDE, nous proposons des tutoriels qui vous expliquent comment traiter les SMS entrants dans de nombreux langages de programmation populaires. Vous pouvez toujours relever ce défi, mais vous n'utiliserez que votre propre éditeur/IDE en dehors de TwilioQuest&nbsp;!

- [C# / .NET](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-csharp)
- [Java](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-java)
- [Python](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-python)
- [PHP](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-php)
- [Ruby](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-ruby)
- [Node.js (en utilisant votre propre nœud, et non QuestIDE)](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-node-js)

Par exemple, voici à quoi ressemblerait une petite application Web Python [Flask](http://flask.pocoo.org/) pour répondre à un message entrant&nbsp;:

```
from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse

app = Flask(__name__)

# Create a route to handle incoming SMS messages
# This is where the magic happens!
@app.route("/sms", methods=['GET', 'POST'])
def sms_ahoy_reply():
    print(f'Incoming message from {request.values.get("From")}: ${request.values.get("Body")}')

    # Here, we're generating TwiML using the Python helper library
    resp = MessagingResponse()
    resp.message("I'm busy questing right now!")

    return str(resp)

if __name__ == "__main__":
    app.run(port=8767)
```

### L'application sur mon ordinateur n'a pas d'URL&nbsp;! Dois-je déployer mon code sur Internet uniquement pour la tester&nbsp;?

Eh bien, vous pouvez déployer une application Web sur [Heroku](https://www.heroku.com/), [Digital Ocean](https://www.digitalocean.com/) ou [Azure](https://azure.microsoft.com/en-us/) assez facilement. Mais ce workflow est loin d'être idéal. C'est pourquoi nous recommandons un outil appelé [ngrok](https://ngrok.com/) pour le développement local avec des webhooks.

En bref, ngrok vous permet de donner une URL publique à l'application Web exécutée sur votre ordinateur. De cette façon, vous pouvez utiliser votre URL ngrok dans votre configuration de webhook Twilio. Le client ngrok de votre ordinateur de développement transfère ensuite ces demandes à n'importe quel port ou application locale spécifiée.

Consultez la [documentation ngrok](https://ngrok.com/docs) pour obtenir des conseils afin de le configurer sur votre ordinateur. Il existe également un [article de blog pertinent de Twilio sur l'utilisation de ngrok](https://www.twilio.com/blog/2015/09/6-awesome-reasons-to-use-ngrok-when-testing-webhooks.html). Leur interface de ligne de commande simple fonctionne pour transférer les demandes de webhook vers n'importe quel type d'application en règle générale. Que vous écriviez votre propre code ou que vous utilisiez l'IDE intégré, ngrok peut vous aider à donner à votre webhook une URL publique.