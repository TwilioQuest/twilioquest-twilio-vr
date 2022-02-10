# Utiliser des fonctions lorsque les TwiML Bins ne suffisent pas

Examinons les Functions Runtime de Twilio&nbsp;: le code Hosted Node.js que vous pouvez utiliser pour répondre aux messages SMS entrants.

Les TwiML Bins constituent une excellente solution pour les réponses statiques ou légèrement modélisées, mais parfois, il vous faudra aller plus loin. Vous devrez peut-être appeler une API externe ou écrire un code qui génère une réponse aléatoire. Et tout comme les TwiML Bins, les fonctions sont hébergées, vous n'avez donc pas à vous soucier de faire tourner un serveur pour héberger votre code. En d'autres termes, lorsque vous devez écrire un bout de code pour une réponse, les Functions Runtime de Twilio constituent une excellente option hébergée.

Pour franchir cette barrière, vous utiliserez les Functions Twilio pour créer une boule magique numéro 8 qui renvoie une réponse magique aux questions de SMS entrants.

## Tout commence avec une seule réponse

Pour découvrir comment fonctionnent les Functions Twilio, nous allons commencer par une réponse statique, comme un TwiML Bin, puis nous nous en servirons de base pour construire.

Lorsque vous créez une Function Twilio, vous écrivez un code [Node.js](https://en.wikipedia.org/wiki/Node.js). Celui-ci peut répondre aux événements webhook (dans ce cas, un SMS entrant), comme nous l'avons vu avec les TwiML Bins.

Accédez à la section «&nbsp;Functions&nbsp;» de la console Twilio et appuyez sur le bouton + (plus) pour créer une nouvelle fonction&nbsp;:

<center>
  <img src="images/programmable_sms/create_function.png" />
</center>
Dans le menu pop-up, sélectionnez le modèle **Hello SMS** pour utiliser un modèle de Function qui possède déjà une fonctionnalité TwiML utile importée.

Donnez un nom sympa à votre nouvelle fonction, par exemple «&nbsp;Boule magique numéro 8&nbsp;», et ajoutez une URL unique de chemin d'accès&nbsp;:

<center>
  <img src="images/programmable_sms/8ball-function.png" />
</center>
Dans la section Configuration, vous verrez un peu de code Node.js prérempli dans l'éditeur. Nous avons sélectionné le modèle «&nbsp;Hello SMS&nbsp;», de sorte que le code Node.js est configuré pour renvoyer un message «&nbsp;Hello World&nbsp;» à un message SMS entrant. Nous allons écrire le code de A à Z pour cette démonstration. Alors, supprimez les trois lignes internes de la fonction, en laissant uniquement la structure externe&nbsp;:

```
exports.handler = function(context, event, callback) {
...
};
```

Remplacez les lignes que vous venez de supprimer par ce code qui 1) crée une variable `twiml` et la définit par une chaîne de caractères contenant les tags TwiML que vous connaissez déjà. Indiquez votre réponse préférée à une question fermée (Oui/Non) entre les tags de verbe `<Message>...</Message>`&nbsp;:

```js
let twiml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <Response>
    <Message>Don't hold your breath.</Message>
  </Response>
`;
```

Enfin, nous devons demander à notre fonction de renvoyer cette chaîne en tant que TwiML en créant une réponse Twilio et en définissant le `twiml` que nous avons créé en tant que corps du message avec la méthode `setBody`&nbsp;:

```js
let response = new Twilio.Response();
response.setBody(twiml);
```

Ensuite, nous devons nous assurer que notre réponse est envoyée en tant que `xml`, afin d'ajouter un en-tête approprié pour le type de contenu&nbsp;:

```js
response.appendHeader('content-type', 'text/xml');
```

En bas, juste avant l'accolade fermante de la méthode `handler`, assurez-vous d'appeler la fonction de rappel, en passant par `null` comme premier argument et par `response` comme second argument&nbsp;:

```js
callback(null, response);
```

## Configurer le numéro de téléphone et le tester

Dans la section Numéros de téléphone de la console, sélectionnez le numéro de téléphone Twilio que vous souhaitez configurer. SOUS **A MESSAGE COMES IN** (MESSAGE ENTRANT)&nbsp;:

1. Sélectionnez **Function** (Fonction) dans le premier menu déroulant
2. Sélectionnez la fonction «&nbsp;Boule magique numéro 8&nbsp;» que nous avons créée

<center>
  <img src="images/programmable_sms/message_comes_in_function.png" />
</center>
Ce flux commence-t-il à vous rappeler quelque chose&nbsp;?

Envoyez un SMS à votre numéro Twilio pour confirmer que vous recevez… la seule réponse possible.

Jusqu'à présent, nous avons suivi les mêmes étapes qu'avec un TwiML Bin. La véritable magie des fonctions réside dans leur capacité à créer des réponses plus dynamiques. Voyons de quoi il en retourne&nbsp;!

## Maintenant, avec des réponses réelles&nbsp;!

Avez-vous déjà joué avec une [boule magique numéro 8](https://en.wikipedia.org/wiki/Magic_8-Ball)&nbsp;? Vous posez une question Oui/Non à la boule magique numéro 8 tout en la secouant, et comme par magie, la réponse apparaît sur la boule. Nous allons reproduire la même chose, mais avec un JavaScript qui peut s'exécuter dans votre Function Twilio.

Tout d'abord, supprimez les rouages de votre méthode de gestionnaire. Vous devez obtenir une structure vide&nbsp;:

```javascript
exports.handler = function(context, event, callback) {
  // ...
};
```

Nous devons trouver une liste de réponses possibles parmi lesquelles choisir. Nous pouvons placer des éléments de la boule magique numéro 8 standard dans un tableau JavaScript, mais vous pouvez facilement substituer ou ajouter les vôtres.

```javascript
let answers = [
  'It is certain.',
  'As I see it, yes.',
  'Without a doubt.',
  'Yes - definitely.',
  'Outlook good.',
  'Most likely.',
  'Reply hazy, try again.',
  'Ask again later.',
  'Better not tell you now.',
  "Don't count on it.",
  'My reply is no.',
  'My sources say no.',
  'Very doubtful.',
  'Outlook not so good.'
];
```

Ensuite, parmi ces nombreuses réponses, nous souhaitons en sélectionner une au hasard pour la renvoyer à la personne qui a envoyé une question. Pour ce faire, nous pouvons utiliser la méthode `Math.random` pour sélectionner un nombre compris entre 0 et la longueur `answers` du tableau&nbsp;: `Math.random() * answers.length`

Cependant, la méthode `Math.random` de JavaScript renvoie un nombre décimal et nous avons besoin d'un nombre entier. Nous pouvons utiliser `Math.floor` pour obtenir le plus grand nombre entier inférieur ou égal au nombre aléatoire que nous avons généré&nbsp;: `Math.floor(Math.random() * answers.length)`.

Enfin, nous voulons utiliser le nombre aléatoire que nous avons généré pour accéder à une réponse dans le tableau `answers` et l'enregistrer dans la variable `yourAnswer`. Dans l'ensemble, les rouages de votre fonction doivent ressembler à ceci maintenant&nbsp;:

```javascript
let answers = [
  'It is certain.',
  'As I see it, yes.',
  'Without a doubt.',
  'Yes - definitely.',
  'Outlook good.',
  'Most likely.',
  'Reply hazy, try again.',
  'Ask again later.',
  'Better not tell you now.',
  "Don't count on it.",
  'My reply is no.',
  'My sources say no.',
  'Very doubtful.',
  'Outlook not so good.',
];
let yourAnswer = answers[Math.floor(Math.random() * answers.length)];
```

## Présentation du client Node.js de Twilio

Dans notre premier exemple, nous avons renvoyé du TwiML brut, dans toute sa splendeur, entre crochets, mais c'était un peu difficile à taper. Comme les Functions Twilio sont écrites dans Node.js, nous pouvons utiliser le [client Node.js de Twilio](https://www.twilio.com/docs/libraries/node) pour créer nos instructions Twilio. Le client Twilio est déjà disponible pour votre fonction. Il n'est donc pas nécessaire de l'importer/de l'exiger.

Consultez le code suivant&nbsp;:

```javascript
let response = new Twilio.twiml.MessagingResponse();
response.message(yourAnswer);
```

Au lieu d'utiliser les tags `<Response>` et `<Message`>, le client Twilio extrait la plupart de ces éléments à distance, avec des méthodes que nous pouvons appeler pour créer le fichier TwiML à notre place. Pour créer une nouvelle `<Response>`, nous pouvons appeler la méthode `MessagingResponse` et nous pouvons utiliser la méthode `message` au lieu d'écrire les tags `<Message>...</Message>` manuellement.

N'oubliez pas d'utiliser un rappel (callback) à la fin de la Function, juste avant l'accolade fermante `}`&nbsp;: `callback(null, response);`

## Recherchez la ou les réponses à votre question&nbsp;!

Comme vous avez déjà configuré votre numéro de téléphone Twilio pour appeler votre fonction boule magique numéro 8, vous devriez être en mesure d'envoyer votre question et de recevoir une réponse. Mais cette fois-ci, ce sera quelque chose de nouveau et d'excitant&nbsp;!

(La réponse à votre question ne vous plaît pas&nbsp;? Continuez à envoyer des SMS jusqu'à ce que vous obteniez la réponse que vous souhaitez&nbsp;!)

Il y a beaucoup d'autres choses que vous pouvez faire avec Functions, mais poursuivons notre mission SMS pour le moment. Saisissez votre numéro de téléphone sur la droite, et appuyez sur _HACK_ pour continuer&nbsp;!