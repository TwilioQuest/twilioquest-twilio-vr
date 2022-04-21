# Liberté de parole

Non seulement vous pouvez non seulement recueillir des tonalités DTMF de votre appelant, mais vous pouvez également accepter les données vocales. Le [verbe TwiML `<Gather>`](https://www.twilio.com/docs/voice/twiml/gather) définit un paramètre nommé [`input`](https://www.twilio.com/docs/voice/twiml/gather#input) que vous pouvez définir sur `"speech"`. Pour mieux comprendre la requête vocale, vous pouvez (et devez) fournir des [`"hints"`](https://www.twilio.com/docs/voice/twiml/gather#hints) comme attribut, séparés par des virgules.

Une façon courante de procéder consiste à demander à votre application `<Say>` de présenter les options disponibles, puis de demander à votre appelant de les énoncer. Les informations recueillies sont ensuite publiées dans le champ `SpeechResult` à la demande de Twilio.

Pour ouvrir ce coffre, vous devez écrire une application Programmable Voice qui accepte les données vocales. Imaginons que vous écrivez un SVI (Serveur Vocal Interactif) pour une banque. Lorsque l'utilisateur appelle, il peut demander les heures d'ouverture, réinitialiser son code PIN ou, pour finir, demander à parler à un agent.

Reliez votre numéro entrant pour `<Gather>` les informations `"speech"` de l'invite&nbsp;: **Qu'aimeriez-vous faire&nbsp;? Vous pouvez indiquer des choses comme&nbsp;: heures, réinitialisation ou agent.**

Fournissez des hints identiques et gérez les réponses aux requêtes `SpeechResult` suivantes&nbsp;:

_réinitialiser_&nbsp;: `<Say>` «&nbsp;Votre code PIN a été réinitialisé&nbsp;» _heures_&nbsp;: `<Say>` «&nbsp;Nous sommes ouverts de 9&nbsp;h&nbsp;00 à 17&nbsp;h&nbsp;00&nbsp;» _agent_&nbsp;: `<Say>` «&nbsp;Connexion à l'agent disponible&nbsp; suivant »

_REMARQUE&nbsp;- En cas de problème&nbsp;:_ N'oubliez pas que vous pouvez toujours générer les valeurs de requête Twilio `SpeechResult` et `Confidence` pour faciliter le débogage de vos interactions.