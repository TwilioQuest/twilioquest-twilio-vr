# Une erreur s'est produite… Fallback!

La sécurité, c'est bien, tout comme les plans de sauvegarde pour votre application SMS&nbsp;! En cas de problème avec l'URL de gestion des SMS entrants de Twilio, configurez un **gestionnaire de fallback** pour que vos utilisateurs reçoivent une réponse lorsqu'ils envoient un SMS à votre numéro.

\[Configurez votre numéro Twilio](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) pour définir un gestionnaire de fallback. Vous verrez une option permettant d'en configurer un s'afficher sous le texte **«&nbsp;PRIMARY HANDLER FAILS&nbsp;»** (ÉCHECS DU GESTIONNAIRE PRINCIPAL). Un [TwiML Bin](https://www.twilio.com/console/twiml-bins) est une solution pratique et fiable pour une réponse de fallback statique.

Une fois que vous avez configuré votre gestionnaire de fallback sur une URL qui renvoie le TwiML de messagerie, cliquez sur le bouton *HACK* et recevez votre récompense&nbsp;!