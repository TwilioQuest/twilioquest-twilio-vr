# Utilisation du verbe \<Redirect>

Le système de messagerie TwiML a un autre atout caché&nbsp;: le verbe `<Redirect>`. Pour mettre la main sur le butin de ce coffre, vous allez passer le contrôle d'une réponse de type Message à une deuxième URL de type Webhook qui renverra également du TwiML.

Lorsque vous utilisez le verbe `<Redirect>` dans vos instructions TwiML, vous dites à Twilio d'effectuer un autre rappel HTTP vers une URL différente. (Ce n'est pas la même chose que transférer un message, comme nous l'avons vu avec l'attribut `to` du verbe `<Message>`.) Tout comme le verbe `<Message>`, le verbe `<Redirect>` se trouve à l'intérieur d'une paire de tags `<Response>...</Response>`&nbsp;:

```
<Response>
  <Message>Ahoy there!</Message>
  <Redirect>https://www.foo.com/nextInstructions</Redirect>
</Response>
```

Vous pouvez utiliser `<Redirect>` pour compartimenter une partie de la logique de votre Message Response et créer une application plus complexe. Par exemple, la première URL (celle que vous avez définie dans la console) peut renvoyer un `<Message>`, puis utiliser le verbe `<Redirect>` pour transmettre le contrôle de Response à un autre ensemble d'instructions TwiML.

Il est important de noter que les instructions après `<Redirect>`, y compris `<Message>`, seront ignorées car le contrôle passe à un autre webhook.

## URL absolues et relatives

Le «&nbsp;nom&nbsp;» du verbe `<Redirect>` correspond à l'URL d'un autre document TwiML. Twilio va faire une demande pour cette URL et attendre TwiML en réponse.

L'URL peut être **absolue**&nbsp;: `<Redirect>http://www.foo.com/nextInstructions</Redirect>`

ou elle peut être **relative** à l'URL actuelle&nbsp;: `<Redirect>/nextInstructions</Redirect>`

## Utilisation du client Twilio avec `<Redirect>`

Les exemples que vous avez vus ci-dessus utilisaient du TwiML «&nbsp;brut&nbsp;», avec les tags du verbe `<Redirect>`. Si vous utilisez l'une des librairies côté serveur de Twilio, vous pouvez appeler l'une des méthodes intégrées pour générer les tags de verbe `<Redirect>` à votre place. Par exemple, dans Node.js, l'envoi d'un texte avec «&nbsp;Hello World&nbsp;!&nbsp;» et le passage de contrôle de réponse se présentent comme suit&nbsp;:

```
const MessagingResponse = require('twilio').twiml.MessagingResponse;


const response = new MessagingResponse();
const message = response.message();
message.body('Hello World!');
response.redirect('https://demo.twilio.com/welcome/sms/');

```

Dans Python, la syntaxe est différente, mais les résultats sont les mêmes&nbsp;:

```
from twilio.twiml.messaging_response import Message, Redirect, MessagingResponse

response = MessagingResponse()
response.message("Hello World!")
response.redirect('https://demo.twilio.com/welcome/sms/')
```

Twilio est flexible&nbsp;: il s'attend simplement à ce que votre URL webhook renvoie du TwiML. À vous de choisir comment le générer. Lorsque vous vous faites la main avec le verbe `<Redirect>`, vous pouvez l'écrire de la manière qui vous semble la plus logique (ou même des deux).

## Essayez-le&nbsp;!

Vous disposez de nombreuses options `<Redirect>` pour relier différents webhooks possibles&nbsp;: les TwiML Bins, les fonctions Twilio et votre propre code hébergé que vous écrivez dans QuestIDE ou une autre application. Essayez même d'en combiner plusieurs. Si vous utilisez un TwiML Bin, vous pouvez écrire un fichier TwiML brut et le transmettre à un autre TwiML Bin, à une fonction ou à votre propre code hébergé avec un `<Redirect>`.

Reliez du TwiML selon la méthode de votre choix (TwiML Bin, fonction, application Web) qui utilise le verbe `<Redirect>`. Si vous utilisez le QuestIDE, une application Web de base avec une route est créée pour vous. Assurez-vous de mettre à jour la première route pour inclure TwiML `<Redirect>`, puis créez une deuxième route qui renvoie un second `<Message>`.

Après avoir créé votre TwiML `<Redirect>`, configurez votre numéro de téléphone pour appeler l'URL de votre webhook lorsque vous recevez un SMS entrant. Une fois que vous avez testé qu'il fonctionne, saisissez votre numéro de téléphone Twilio dans l'interface Hack et appuyez sur **HACK**. Nous allons vérifier que l'URL de votre webhook renvoie `<Redirect>`. Si c'est le cas, le coffre s'ouvrira pour révéler le butin qu'il renferme&nbsp;!