# Changement de direction

Dans votre TwiML, vous pouvez instantanément passer à un autre ensemble d'instructions TwiML à tout moment. Pour ce faire, utilisez le [verbe `<Redirect>`](https://www.twilio.com/docs/voice/twiml/redirect). Quand un `<Redirect>` est détecté, le contrôle est immédiatement transféré vers le nouveau TwiML, ce qui signifie que pour toute instruction TwiML survenant _par la suite_, `<Redirect>` ne se produira pas.

Imaginez l'application suivante&nbsp;:

_Hébergé sur_&nbsp;: https://twimlionaire.com/hello-world

```xml
<Response>
    <Say>Hello World!</Say>
    <Redirect>/hello-cloud</Redirect>
    <Say>A redirect has occurred</Say>
</Response>
```

_Hébergé sur_&nbsp;: https://twimlionaire.com/hello-cloud

```xml
<Response>
    <Say>Hello Cloud!</Say>
</Response>
```

Pour ouvrir ce coffre, vérifiez toutes les lignes qui seront prononcées lors de l'exécution de l'application.