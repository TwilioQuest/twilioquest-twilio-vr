# Jolie Mustache

Pour atteindre cet objectif, vous devez apprendre à inclure les informations d'un appel vocal entrant de manière dynamique, puis à utiliser ces informations dans votre réponse.

## Templates Mustache

Les TwiML Bins permettent de créer des espaces réservés pouvant contenir des informations dynamiques avec le langage de templating Mustache.

Mustache vous permet de définir un espace réservé, ou **tag**, en délimitant votre clé dans une accolade double&nbsp;: `{{ }}`. Si vous tournez la tête sur le côté, vous comprendrez comment la librairie a obtenu son nom. L'accolade `{` ressemble beaucoup à une moustache.

Vous pouvez inclure n'importe quel tag dans votre TwiML et Mustache le remplacera par la valeur correspondante.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>We have got the perfect job for you in {{ ToCity }}</Say>
</Response>
```

Lorsqu'il est utilisé comme gestionnaire d'appels entrants, `ToCity` est remplacé par le nom de la ville dans laquelle l'appelant vit.

## Utilisez la requête entrante

De [nombreuses valeurs sont disponibles pour l'appel entrant](https://www.twilio.com/docs/voice/twiml#request-parameters). Vous pouvez utiliser n'importe lequel de ces éléments dans votre template.

N'oubliez pas, ces éléments sont sensibles à la casse. Ainsi, `{{ from }}` tout en minuscules représente une valeur différente de celle de `{{ From }}` avec une majuscule.

Vous pouvez également ajouter des valeurs personnalisées.

## Ajouter des valeurs customisées

En plus de renseigner vos valeurs disponibles à partir de la requête HTTP POST entrante, vous pouvez également ajouter des valeurs supplémentaires. Pour ce faire, utilisez une chaîne de requête, qui est la partie de l'URL qui vient après `?` et dont les paires `key=value` sont séparées par `&`.

Par exemple, l'URL `https://techrecruiter.us?FirstName=Bob&LastName=Blahblah` possède une chaîne de requête qui contient à la fois les valeurs `FirstName` et `LastName`. Si cette URL était un TwiML Bin, vous pourriez remplacer ces valeurs par des espaces réservés.

### Créer un TwiML Bin

Commençons par créer un TwiML Bin pour cet exercice.

Accédez à votre [console](https://www.twilio.com/console) et, dans le menu latéral, choisissez [TwiML Bins](https://www.twilio.com/console/runtime/twiml-bins). À partir de là, vous pouvez créer un TwiML Bin à l'aide du bouton `+`.

Nous allons utiliser des templates, définissons donc un **nom sympa** sur `Mustache Example`. Faisons en sorte que ce TwiML Bin salue la personne de manière dynamique et indique à l'appelant d'où vient son appel.

Ce TwiML devrait ressembler à ceci&nbsp;:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Hello {{ Name }}! This call is coming from {{ From }}</Say>
</Response>
```

Cliquez sur le bouton **Create** (**Créer**) pour enregistrer votre nouveau TwiML Bin.

Vous avez peut-être remarqué qu'il nous faut encore transmettre ce paramètre `Name`.

En haut de la page du TwiML Bin que vous venez de créer, vous trouverez un champ intitulé **URL**. Cliquez sur le lien de copie à la fin de ce champ pour copier l'URL dans votre presse-papiers.

## Connecter l'URL

Localisez votre \[numéro de téléphone](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>).

Dans la section **Voice \& Fax** (Appel et fax), sous **A Call Comes In** (Appel entrant), sélectionnez **Webhook** et collez l'URL de votre TwiML Bin.

À la fin de l'URL, ajoutez la chaîne de caractères de la requête `?Name=`, puis **saisissez** votre nom à droite du signe égal. Cela permettra à Mustache de remplacer le tag `{{ Name }}` par votre nom.

N'oubliez pas d'**enregistrer** votre numéro de téléphone avec les modifications.

## Appelez-vous

Maintenant, appelez votre numéro de téléphone (\<%= env.TQ_TWILIO_NUMBER.value %>). Vous devriez entendre votre nom, puis votre numéro de téléphone sera tout bêtement lu.

Vous avez fait de l'excellent travail avec les templates pour modifier votre message de manière dynamique&nbsp;! Appuyez sur le bouton **HACK** lorsque vous êtes prêt à aller encore plus loin&nbsp;!

## En savoir plus

- [Tutoriel sur les TwiML Bins](https://www.twilio.com/docs/runtime/tutorials/twiml-bins)