# Boucle Gather

Relever ce défi ne devrait (idéalement) pas être très difficile si vous utilisez l'**éditeur de code**. Si vous ouvrez l'éditeur et appuyez sur <em><i class="fa fa-play"></i></em>, un serveur Node.js s'exécute et il contient un code utilisant le verbe `<Gather>`.

Avec ce serveur en cours d'exécution, vous devriez pouvoir utiliser [ngrok](https://ngrok.com/) pour donner à cette application locale une URL publique temporaire. Une fois que vous avez terminé, vous pouvez mettre à jour la configuration de votre numéro de téléphone dans la console Twilio pour utiliser cette URL ngrok pour un webhook vocal.

Si tous les éléments ci-dessus fonctionnent, TwilioQuest devrait pouvoir confirmer que votre boucle Gather fonctionne comme prévu lorsque vous cliquez sur le bouton *HACK*.

## Recréer la magie

Si vous tentez de recréer ce code dans Functions ou dans votre propre code, prenez note de quelques points&nbsp;:

* Par défaut, [Gather](https://www.twilio.com/docs/voice/twiml/gather) utilise **la même URL que l'URL TwiML actuelle** pour l'URL `action` qui reçoit un paramètre POST `Digits` après l'exécution de `<Gather>`. De cette manière, vous pouvez faire en sorte que la même route dans votre application soit une «&nbsp;boucle Gather&nbsp;».
* Lorsque l'URL `action` est demandée, elle reçoit `Digits` en tant que paramètre `POST`.

Pour réussir à valider ce défi, la réponse de votre URL `action` doit contenir un tag `<Say>` avec la chaîne de caractères exacte de `Digits` saisis avec le `<Gather>` précédent.