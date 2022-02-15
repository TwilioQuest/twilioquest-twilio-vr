# Dites «&nbsp;Hello&nbsp;»

Pour accomplir cette mission, vous devez traiter un appel téléphonique entrant sur votre numéro de téléphone Twilio. Votre application accueillera l'appelant avec la phrase «&nbsp;Hello World!&nbsp;»

Nous allons passer en revue les commandes que vous êtes censé envoyer, comment nous les transmettre, et enfin, nous les relierons à votre numéro de téléphone afin qu'il réponde lors de l'appel.

## Présentation de TwiML

TwiML, Twilio Markup Language, définit la façon dont vous souhaitez que votre application fonctionne. Il ressemble beaucoup à HTML, Hypertext Markup Language, qui est utilisé dans votre navigateur Web pour afficher différents éléments.

Voici un exemple HTML&nbsp;:

```html
<html>
  <head>
    <title>Hello World, HTML version</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
```

Les éléments sont définis à l'aide de

- Tags d'ouverture
- Nom de l'élément délimité par `<` et `>`
- Tags de fermeture, qui délimitent le nom avec `</` et `>`

Remarquez comment vous pouvez imbriquer des éléments dans d'autres éléments. Par exemple, l'élément `head` est imbriqué dans l'élément parent `html` et `title` est imbriqué dans l'élément `head`.

Comme vous le verrez, TwiML fonctionne de façon similaire. Voici le fichier TwiML nécessaire pour prononcer la phrase «&nbsp;Hello World!&nbsp;»&nbsp;:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>Hello, World!</Say>
</Response>
```

Toutes les réponses Voice de TwiML doivent commencer par une tag `<Response>`. Toutes les autres tags sont imbriquées dans celle-ci.

Le [Verbe `<Say>`](https://www.twilio.com/docs/voice/twiml/say) exécute le TTS, synthèse vocale Text to Speech, en fonction de la valeur comprise entre les tags.

Vous avez probablement remarqué la déclaration `<?xml` en haut de l'extrait de code TwiML. TwiML est un super-ensemble d'XML, ou eXtensible Markup Language, un langage basé sur des tags. Cette ligne déclare essentiellement que nous acceptons de suivre les règles de XML. C'est-à-dire que nous acceptons d'ouvrir et de fermer des tags correspondantes tout en prenant la casse en considération. Par conséquent, les majuscules et les minuscules ont une importance&nbsp;: `<Response>` est une tag différente de `<RESPONSE>`.

## Configurer votre numéro de téléphone

Nous savons désormais de quel code TwiML nous avons besoin. Nous allons donc le relier à votre numéro de téléphone pour qu'il s'exécute lorsqu'un appel est reçu.

Accédez à la [section Numéro de téléphone de votre console](https://www.twilio.com/console/phone-numbers/incoming), et choisissez votre numéro \<%= env.TQ_TWILIO_NUMBER.value %>.

Dans la section **Voice \& Fax** (Voice et fax), vous verrez un message intitulé **A call comes in** (Appel entrant) suivi de deux champs. Vous avez plusieurs options ici…

Vous pouvez, si vous le voulez, activer un serveur Web et héberger une page de rendement pour le fichier TwiML qui traitera votre appel. Si vous sélectionnez cette option, vous devrez choisir **Webhook** dans la première liste déroulante, puis saisir l'URL vers laquelle Twilio peut trouver le TwiML que vous voulez rendre.

Une option plus simple consiste à nous laisser héberger votre réponse TwiML pour vous. Twilio propose un service appelé TwiML Bins qui vous évite d'avoir à installer et à exécuter un serveur Web. Les TwiML Bins constituent une solution idéale, car la réponse que nous prévoyons d'envoyer sera statique, c'est-à-dire qu'elle ne changera jamais. Pour cette option, choisissez **TwiML Bin** dans la première liste déroulante. Cliquez ensuite sur le bouton **plus** pour créer un nouveau bin.

Vos fichiers TwiML Bin s'afficheront ensuite dans la liste déroulante **Select a TwiML Bin** (Sélectionner un TwiML Bin).

## Créer votre TwiML Bin

Donnez un **nom sympa** à votre nouveau TwiML Bin. Il correspondra à ce que nous sélectionnerons plus tard dans la liste déroulante. Ensuite, vous pouvez saisir le code TwiML nécessaire ou le copier, tout simplement, à partir de l'exemple de code ci-dessus.

Si vous avez saisi toutes les informations correctement, une notification s'affiche pour vous informer que le Voice TwiML que vous avez entré est valide.

Cliquez sur le bouton **Create** (Créer) pour enregistrer votre TwiML Bin, puis assurez-vous d'**enregistrer** la configuration de votre numéro de téléphone.

## Appelez-vous

Maintenant que votre numéro de téléphone \[\<%= env.TQ_TWILIO_NUMBER.value %>](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>) est bien connecté, vous devriez l'appeler. Hello World, en effet&nbsp;!

Qu'attendez-vous pour appuyer sur le bouton **HACK** pour franchir cette barrière et passer à la suivante&nbsp;?