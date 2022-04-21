# Un gestionnaire averti

Pour déverrouiller ce coffre, vous devez configurer un moyen de gérer les erreurs susceptibles de se produire dans votre application Voice.

Nous allons passer en revue les meilleures pratiques et vous montrer comment configurer votre callback. Ensuite, nous verrons comment utiliser le [verbe `<Say>`](https://www.twilio.com/docs/voice/twiml/say) à partir d'un TwiML Bin hébergé.

## Les erreurs sont inévitables

Personne n'est parfait… Pas même Cédric. Il est probable qu'une erreur se soit glissée dans votre code à un moment donné.

Il y a aussi des facteurs que vous ne pouvez pas contrôler. Par exemple, si vous répondez à partir de votre propre serveur, il est possible que celui-ci ne fournisse pas de réponse dans les délais impartis. Si vous ne voulez pas que votre appelant attende indéfiniment, alors vous devez proposer une solution de secours.

La plupart des langages de programmation sont dotés d'un mécanisme de fallback intégré&nbsp;: une sorte de mot-clé dans les lignes `try` et `catch`. La logique est la suivante&nbsp;: essayez un code et, s'il ne fonctionne pas, détectez l'erreur et réglez-la pour votre utilisateur.

Twilio vous offre cette fonctionnalité pour les appels entrants.

## Créer la solution de secours

Sur l'écran d'édition de votre \[\<%= env.TQ_TWILIO_NUMBER.value %> Numéro de téléphone](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>), sous la section **Voice \& Fax** (Voice et fax), vous verrez un champ intitulé `Primary Handler Fails`. Choisissez TwiML dans la première liste déroulante, puis créez un nouveau TwiML Bin en cliquant sur le bouton «&nbsp;Plus&nbsp;» de cette ligne.

Donnez un nom à votre TwiML Bin, comme `Please Call Again`. Ajoutez un peu de TwiML dans le corps du texte pour que la synthèse vocale Text to Speech ressemble à ce qui suit&nbsp;:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>We are currently experiencing difficulties. Please call again.</Say>
</Response>
```

En supposant que vous ne rencontrez pas de difficultés pour le moment 😉, vous devriez voir une vérification `Valid Voice TwiML`. Cliquez sur **Create** (Créer) pour enregistrer votre nouveau TwiML Bin, puis **enregistrez** la configuration de votre numéro.

## Faire en sorte que quelque chose marche quand plus rien ne fonctionne

Pour vérifier que votre gestionnaire d'erreurs fonctionne, vous allez devoir faire exprès de saboter votre TwiML entrant. Ma méthode préférée consiste à faire en sorte que le tag TwiML `<Response>` «&nbsp;Appel entrant&nbsp;» soit délibérément écrit en minuscules `<response>`. **Enregistrez** cette modification temporairement, puis appelez votre numéro de téléphone. Bien joué&nbsp;! Maintenant, **réparez** votre gestionnaire d'appels entrants&nbsp;!

Il est temps d'appuyer sur le bouton **HACK** pour ouvrir le coffre et continuer l'aventure&nbsp;!