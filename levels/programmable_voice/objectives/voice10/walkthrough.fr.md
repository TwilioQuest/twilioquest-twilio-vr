# \<Dial> entre en jeu

Il est possible de passer un appel externe au sein de votre application à l'aide du verbe TwiML `<Dial>`. Un cas d'utilisation fréquent consiste à utiliser cette fonctionnalité pour rediriger un appel.

## Entrer le verbe TwiML

Le corps du verbe `<Dial>` accepte un numéro de téléphone au [format e.164](https://www.twilio.com/docs/glossary/what-e164). Pour créer un fichier TwiML qui a composé automatiquement le numéro `(202) 555-0136`, vous devez rediriger TwiML comme suit&nbsp;:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>+12025550136</Dial>
</Response>
```

## Terminer la tentative de hack

Vous avez les clés nécessaires pour y parvenir. Tout est entre vos mains. Les étapes principales sont les suivantes&nbsp;:

* Créez une application Web / une fonction / un TwiML Bin qui utilise le tag `Dial` pour rediriger un appel entrant vers `+19473334160`.
* Assurez-vous que l'application est configurée pour gérer les appels entrants pour [votre numéro de téléphone] (https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>).
* Testez votre numéro&nbsp;!
* Lorsque vous avez la certitude qu'il fonctionne, appuyez sur le bouton *HACK*.