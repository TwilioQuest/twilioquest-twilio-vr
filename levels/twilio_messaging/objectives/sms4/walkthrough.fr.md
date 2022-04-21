# Configurer un gestionnaire de fallback

Pour déverrouiller ce coffre, vous devez configurer un moyen de gérer les erreurs susceptibles de rendre votre application SMS indisponible. Si votre application est en panne, il est recommandé d'avoir configuré un message de sauvegarde pour informer les utilisateurs que votre application rencontre des difficultés (mais que vous essayez de résoudre le problème, bien sûr&nbsp;!).

Nous allons découvrir les meilleures pratiques, la configuration de votre callback, puis nous verrons comment utiliser le [verbe Message](https://www.twilio.com/docs/sms/twiml/message) à partir d'un TwiML Bin hébergé.

## Qu'est-ce qu'un fallback&nbsp;?

En tant que développeur, il est recommandé d'anticiper, mais aussi de se préparer aux erreurs. Cette opération s'effectue généralement par le biais d'un mécanisme, typiquement appelé «&nbsp;fallback&nbsp;». La plupart des langages de programmation ont une sorte de mot-clé le long des lignes `try` et `catch`. La logique est la suivante&nbsp;: essayez un peu de code. S'il ne fonctionne pas, identifiez l'erreur et traitez-la pour votre utilisateur. Vous retombez sur le cas de traitement des erreurs.

Twilio vous offre cette fonctionnalité en tant que développeur pour les messages entrants.

## Hélas, les erreurs sont inévitables.

Comme dans la vraie vie, des erreurs se produisent. Certaines de ces erreurs, telles que TwiML mal formé, peuvent entraîner la panne de votre application. Lorsque Twilio contacte votre application et attend des instructions TwiML, il ne sait pas comment gérer une erreur qui a «&nbsp;surgi&nbsp;» du code.

Pour quelle autre raison envisageriez-vous un plan de sauvegarde&nbsp;? Le réseau est peut-être lent et votre serveur ne peut pas fournir de réponse en temps voulu. Vous ne voulez pas laisser la personne qui envoie le message attendre indéfiniment&nbsp;!

## OK, je suis convaincu. Comment créer un fallback&nbsp;?

Sur l'écran de modification de votre numéro de téléphone, sous la section **Messaging** (Messagerie), vous trouverez un champ appelé `Primary Handler Fails` (sous le gestionnaire «&nbsp;A message comes in&nbsp;» (Message entrant) que vous avez défini dans une barrière précédente).

- Dans le menu déroulant, sélectionnez «&nbsp;TwiML&nbsp;»
- Cliquez sur le bouton `+` (plus) qui s'affiche pour créer un TwiML Bin
- Donnez-lui un nom convivial, par exemple "Backup Message bin"&nbsp;("Corbeille de messages de sauvegarde")
- Ajoutez vos instructions TwiML pour envoyer votre message de sauvegarde

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>We're sorry. We are currently experience difficulties. Please try again later. 🍰 </Message>
</Response>
```

(L'émoji "part de gâteau" 🍰 réconfortant est purement facultatif.)

Une fois que la vérification `Valid Messaging TwiML` s'affiche, cliquez sur **Create** (Créer) pour enregistrer votre nouveau TwiML Bin de sauvegarde.

Enfin, n'oubliez pas d'appuyer sur le bouton **Save** (Enregistrer) sur l'écran de modification de votre numéro de téléphone pour enregistrer vos changements.

## Cassons des trucs&nbsp;!

D'accord, si vous souhaitez vérifier que votre gestionnaire de sauvegarde (backup handler) fonctionne, vous devez délibérément rendre le TwiML Bin, qui gère un message entrant, inopérant. Twilio va alors examiner le TwiML Bin que vous avez défini sous «&nbsp;Primary Handler fails&nbsp;» (Échec du gestionnaire principal). Pour invalider facilement vos instructions TwiML principales, écrivez le tag `<Response>` de TwiML «&nbsp;On Incoming Response&nbsp;» (En cas de réponse entrante) tout en minuscule `<response>`. **Enregistrez** temporairement cette modification, puis envoyez un SMS à votre numéro de téléphone.

Avez-vous reçu votre message de sauvegarde en réponse&nbsp;? C'est l'une des rares fois où vous serez ravi de recevoir un message d'erreur.

Vous devez maintenant saisir votre numéro dans le champ et appuyer sur le bouton **HACK**, comme tout développeur consciencieux&nbsp;!

(N'oubliez pas de **réparer** votre TwiML Bin principal. Les plans de backup sont très utiles, mais ils ne doivent pas devenir permanents.)