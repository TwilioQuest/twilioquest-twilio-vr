# Liberté de parole

Pour ouvrir ce coffre, vous devez recueillir l'entrée vocale d'un appelant en utilisant speech, plutôt que de rassembler les tonalités DTMF. Speech fournit une approche mains libres pratique pour utiliser un système de SVI (Serveur Vocal Interactif).

Avec certains paramètres supplémentaires, vous pouvez utiliser `<Gather>` pour la fonction vocale.

## Entrée

Un paramètre nommé `input` est disponible sur `<Gather>`. Sa valeur par défaut est `dtmf`. Vous pouvez le définir sur `speech` ou `dtmf speech` pour accepter les deux.

Lors de la collecte d'informations auprès de l'utilisateur, il est recommandé de l'informer des options disponibles.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather input="speech" action="https://is-a-hotdog.net/sandwich.php">
        <Say>A hotdog is a sandwich. Is this statement true? Please answer yes or no.</Say>
    </Gather>
</Response>
```

Une fois que l'appelant arrête de parler pendant 5&nbsp;secondes, `<Gather>` va PUBLIER vers l'`action` associée. Cette publication comprend une valeur de champ nommée `SpeechResult` qui contient la transcription de la requête vocale.

## Hints

Une bonne pratique pour optimiser la fluidité de votre application consiste à inclure des `hints`. Cela permettra à `<Gather>` de déterminer ce que l'appelant est le plus susceptible de dire. Les hints (indices) sont séparés par une virgule.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather input="speech" hints="monday,tuesday,wednesday,thursday,friday">
        <Say>Which day of the week is your favorite? You can say any day of the week Monday thru Friday.</Say>
    </Gather>
</Response>
```

Cet exemple permet de reconnaître ces mots spécifiques. Il est possible que votre appelant dise autre chose, mais cela permet de définir le modèle auquel votre application s'attend.

## Écrire le TwiML

Avec les éléments `input` et `hints`, nous pouvons passer à la création de la partie TwiML requise. Pour ce faire, commencez par créer un nouveau [TwiML Bin](https://www.twilio.com/console/runtime/twiml-bins). Écrivez ensuite votre code pour recueillir des informations à partir de l'invite&nbsp;:

**Qu'aimeriez-vous faire&nbsp;? Vous pouvez indiquer des choses comme&nbsp;: heures, réinitialisation ou agent.**

Si vous avez besoin d'aide, jetez un œil au spoiler. Vous pouvez le faire&nbsp;!

<details>
    <summary>Spoiler: la solution TwiML Bin</summary>
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather input="speech" hints="hours,reset,agent">
        <Say>What would you like to do? You can say things like: hours, reset, or agent.</Say>
    </Gather>
</Response>
```

REMARQUE&nbsp;: nous n'avons pas encore construit d'`action` pour gérer la réponse. Nous allons le faire maintenant&nbsp;!

</details>
## Traitement de l'action

Pour ouvrir ce coffre, vous devez traiter la requête de Twilio. Pour ce faire, nous pouvons utiliser une solution sans serveur, comme une fonction. Tout d'abord, [créez une nouvelle fonction](https://www.twilio.com/console/runtime/functions/manage) et choisissez le modèle _vide_.

L'idée ici est d'examiner ce qui a été soumis. Cette valeur se trouve dans `event.SpeechResult`. Une solution courante consiste à utiliser une [instruction `switch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) sur cette valeur, puis à traiter chaque cas séparément.

Voici ce qui doit se produire pour chaque résultat&nbsp;:

_reset (réinitialiser_)&nbsp;: `<Say>` «&nbsp;Votre code PIN a été réinitialisé&nbsp;» _heures_&nbsp;: `<Say>` «&nbsp;Nous sommes ouverts de 9&nbsp;h&nbsp;00 à 17&nbsp;h&nbsp;00&nbsp;» _agent_&nbsp;: `<Say>` «&nbsp;Connexion à l'agent suivant disponible&nbsp;»

Après avoir écrit la fonction, **enregistrez**-la, **copiez** l'URL et **collez**-la dans votre paramètre `action` `<Gather>`. REMARQUE&nbsp;: si vous souhaitez déboguer la fonction, n'oubliez pas que l'utilisation d'instructions `console.log` fera apparaître vos messages dans la section Logs de la page Fonction. Cette fonction est pratique lorsque vous traitez des données vocales&nbsp;!

Besoin d'aide pour écrire la fonction&nbsp;? Jetez un œil au spoiler.

<details>
    <summary>Spoiler: La solution de fonction</summary>
```javascript
exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  switch (event.SpeechResult.toLowerCase()) {
    case 'agent':
      twiml.say('Here is an agent');
      break;
    case 'hours':
      twiml.say('Our hours are 9 to 5');
      break;
    case 'reset':
      twiml.say('We have reset your pin');
      break;
    default:
      console.log(
        `I heard ${event.SpeechResult} at a confidence rating of ${Math.round(
          event.Confidence * 100
        )} percent`
      );
  }
  callback(null, twiml);
};
```

REMARQUE&nbsp;: Étant donné que `console.log` se trouve dans la branche `default` de l'instruction `switch`, elle s'exécutera uniquement si toutes les autres options échouent.

</details>
## Vérifier que tout fonctionne

Connectez votre \[numéro de téléphone entrant (\<%= env.TQ_TWILIO_NUMBER.value %>)](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>) à votre TwiML Bin et donnez-lui une sonnerie. Répondez avec chacune des différentes options. Obtenez-vous la bonne réponse à chaque fois&nbsp;? N'oubliez pas que si vous rencontrez des problèmes, vous pouvez consulter vos logs pour voir la transcription.

Lorsque vous êtes satisfait de vos résultats, appuyez sur le bouton HACK&nbsp;!