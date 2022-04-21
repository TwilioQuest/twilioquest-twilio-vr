# Sentiment de rejet

Il peut arriver que vous souhaitiez empêcher un appel d'exécuter votre gestionnaire d'appels entrants. N'oubliez pas que chaque appel entrant vous coûte de l'argent. Même si les appels indésirables sont relativement peu nombreux, ils peuvent finir par s'accumuler. Le cas d'usage le plus courant ici est l'arrêt des appels spams.

Bonne nouvelle&nbsp;! Si vous savez que l'appelant est un spammeur, vous pouvez `<Reject>` l'appel. Ainsi, vous n'aurez pas à payer pour l'appel entrant. Pour modifier le flux, définissez l'attribut `reason` sur `"busy"` ou `"rejected"`, par exemple&nbsp;: `<Reject reason="busy">`

C'est exactement ce que vous allez faire pour ce coffre. Vous allez définir un numéro de téléphone suspecté d'être un spammeur et rejeter tous les appels de ce numéro spécifique. Ils recevront un signal occupé.

## Écrire la fonction

Vous pouvez résoudre ce problème à l'aide de n'importe quelle solution dynamique. Découvrez comment résoudre le problème à l'aide d'une Function Twilio.

Créez une nouvelle fonction en accédant à Console >> Runtime >> Fonctions. À partir de là, appuyez sur le bouton **+** et choisissez le template **vierge**. Attribuez le **nom de fonction** `No spammers allowed` et le chemin d'accès `/no-spammers` à la fonction. Commencez par réfléchir à un nombre réel à utiliser pour tester le rejet.

Le pseudo-code est au format suivant&nbsp;:

- Si le numéro entrant correspond à votre numéro de spam test&nbsp;:
  - Rejeter l'appel avec un signal occupé.
- Sinon&nbsp;:
  - Dites «&nbsp;Bonjour, mon ami de confiance&nbsp;!&nbsp;»

Faites un essai à l'aide de vos compétences, mais si vous avez besoin d'aide, consultez le spoiler.

<details>
    <summary>Spolier: Solution de la fonction</summary>
N'oubliez pas que l'objet `event` possède toutes les valeurs de requête Twilio, y compris `From` qui stocke les informations de l'appelant.

```javascript
exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  if (event.From === '+12095550136') {
    twiml.reject({ reason: 'busy' });
  } else {
    twiml.say('Hello my trustworthy friend');
  }
  callback(null, twiml);
};
```

Tous les verbes Voice TwiML sont exposés hors de l'objet `VoiceResponse`. Par conséquent, appelez la méthode reject pour produire ce tag. Notez comment les paramètres sont inclus en tant qu'objet JavaScript, la clé étant le nom de l'attribut et la valeur étant la valeur.

</details>
## Vérifier le fonctionnement

Reliez votre fonction à votre numéro entrant (\<%= env.TQ_TWILIO_NUMBER.value %>) et appelez-la à partir du numéro du spammeur suspect. Vous devriez entendre le signal occupé. Maintenant, testez donc un appel d'un autre numéro. Vous devriez entendre le message vocal.

Si vous avez terminé, entrez le numéro du spammeur et appuyez sur le bouton **HACK**.

## En savoir plus

- [Tutoriel&nbsp;: Bloquer les appels spams et les appels automatiques](https://www.twilio.com/docs/voice/tutorials/block-spam-calls-and-robocalls-node-js)