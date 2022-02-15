# Vous pouvez le répéter

Parfois, vous devez vous répéter pour être entendu. C'est également vrai lorsque vous créez une application vocale. Le tag `<Say>` possède un attribut `loop` ([docs](https://www.twilio.com/docs/voice/twiml/say#attributes)) que vous pouvez utiliser pour répéter un message plusieurs fois.

L'objectif ici est de configurer l'application TwiML que vous utilisez [pour votre numéro de téléphone](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) pour utiliser le tag `<Say>` et l'attribut `loop` ensemble.  Répondez aux appels entrants en disant `"Anything worth doing is worth doing twice."` … deux fois. Plus précisément, vous devez définir l'attribut `loop` sur `2`.

**Vous en êtes capable&nbsp;! Vous en êtes capable&nbsp;!**