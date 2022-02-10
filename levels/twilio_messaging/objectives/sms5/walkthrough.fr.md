# Répondre à un message entrant

Vous avez déjà répondu à un message texte. Vous n'avez peut-être pas remarqué, mais vous avez utilisé un dialecte XML appelé **TwiML** pour indiquer à Twilio quoi faire lorsque vous recevez un SMS entrant.

## Qu'est-ce que TwiML ?

TwiML est l'acronyme de «&nbsp;Twilio Markup Language&nbsp;» (langage de balisage de Twilio). Il s'agit d'un ensemble d'instructions pour que Twilio puisse agir en votre nom, comme répondre à un message texte ou à un appel vocal.

TwiML est essentiellement un document [XML](https://en.wikipedia.org/wiki/XML), un type de «&nbsp;Markup Language&nbsp;» permettant d'encoder des informations supplémentaires sur certaines données. Dans ce cas, les données sont le corps du message que vous souhaitez renvoyer à la personne qui vous a écrit. Les informations supplémentaires sont les instructions pour Twilio.

Dans l'exemple ci-dessous, recherchez le corps du message. Ce corps est encadré par de nombreuses informations, contenues dans des tags `<tags>`.

Le tag `<Response>` indique à Twilio que vous créez un ensemble d'instructions TwiML. Chaque fois que vous répondez avec TwiML, vous devez créer un ensemble de tags `<Response>`...`</Response>` contenant votre message.

Le [verbe `<Message>`](https://www.twilio.com/docs/sms/twiml/message) est la véritable vedette ici. Il indique à Twilio que vous souhaitez renvoyer un message texte à la personne qui vous a écrit.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>Oh hai Mark!</Message>
</Response>
```

Qu'en est-il de cette étrange ligne avec le tag `<?xml...`&nbsp;? Il s'agit d'une déclaration selon laquelle vous allez suivre les règles de XML, notamment les tags d'ouverture et de fermeture, en respectant la casse. Elle est incluse, car TwiML est au format XML.

## Configurer un numéro de téléphone

La première étape pour recevoir un SMS entrant consiste à configurer une URL que Twilio demande lorsqu'un de vos numéros de téléphone reçoit un SMS entrant. Recherchez [vos numéros de téléphone programmables dans la console](https://www.twilio.com/console/phone-numbers/incoming), puis cliquez sur l'un d'entre eux pour le configurer.

<center>
  <img src="images/programmable_sms/active-numbers.png" />
</center>
Faites défiler la page de configuration du numéro de téléphone jusqu'à la section **Messaging** (Messagerie). Recherchez le libellé **A MESSAGE COMES IN** (MESSAGE ENTRANT) à côté de deux menus déroulants.

<center>
  <img src="images/programmable_sms/message_comes_in_twiml_bin.png" />
</center>
C'est ici que vous expliquez à Twilio comment il va recevoir des instructions TwiML. Vous disposez de plusieurs options pour renvoyer du langage TwiML, telles que la rotation d'un serveur Web pour fournir le TwiML. Vous y arriverez, mais ce tag consiste à se familiariser avec le TwiML lui-même.

Twilio fournit un service appelé «&nbsp;TwiML Bins&nbsp;» permettant de conserver et de renvoyer les instructions TwiML à votre place. (Cela signifie que vous n'avez pas besoin de configurer et d'exécuter un serveur Web pour héberger TwiML&nbsp;!) Lorsque vous souhaitez configurer une réponse statique, les TwiML Bins sont une excellente solution.

Dans la première liste déroulante, sélectionnez **TwiML**, puis cliquez sur le bouton «&nbsp;+&nbsp;» (plus) à droite pour créer un tout nouveau TwiML Bin. Tous les TwiML Bins créés précédemment apparaissent dans la liste déroulante à droite. Cependant, pour cet objectif, vous allez en créer un à partir de zéro.

Vous pouvez également créer des TwiML Bins dans la section [TwiML Bins](https://www.twilio.com/console/runtime/twiml-bins) (Corbeilles TwiML) de la console Twilio.

## Comment puis-je utiliser le TwiML Bin&nbsp;?

Un TwiML Bin est comme un petit récipient qui stocke un ensemble spécifique d'instructions TwiML.

Tout d'abord, attribuez à votre nouvelle corbeille un **nom convivial** pour l'identifier, par exemple «&nbsp;Mon premier TwiML Bin de messagerie&nbsp;».

Dans la zone de texte TwiML, vous pouvez écrire des instructions TwiML pour savoir comment répondre. Notez que la déclaration `<?xml...` a déjà été ajoutée pour vous. Vous pouvez écrire le TwiML à la main ou copier l'exemple ci-dessus.

## Vérifier votre travail

Vous avez créé un TwiML Bin et demandé à Twilio d'utiliser cet ensemble d'instructions pour répondre à un message entrant sur votre numéro de téléphone Twilio. Il est temps de le tester&nbsp;!

Envoyez un message à votre numéro de téléphone Twilio et confirmez que vous recevez la réponse souhaitée.

Une fois que vous avez reçu une réponse, saisissez votre numéro de téléphone Twilio dans le champ à droite et appuyez sur le bouton **HACK**. Nous allons vérifier que vous avez connecté un TwiML Bin pour répondre à un message entrant et vous aurez réussi&nbsp;!