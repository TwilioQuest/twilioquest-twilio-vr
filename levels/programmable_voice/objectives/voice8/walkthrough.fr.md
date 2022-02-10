# «&nbsp;Pin it&nbsp;» pour mieux réussir

Pour ouvrir ce coffre, vous devez concevoir une expérience utilisateur plus élaborée pour un système d'entrée de code PIN. L'expérience utilisateur est importante. Vous devez vous assurer de fournir des instructions claires sur ce que vous attendez de votre appelant. Une bonne pratique consiste à informer votre appelant du nombre de chiffres que vous souhaitez qu'il saisisse.

En plus d'informer votre appelant, il est également recommandé de limiter la requête `<Gather>` à ce nombre de chiffres. Pour ce faire, vous pouvez utiliser le paramètre `numDigits` de `<Gather>`.

## Sans limite

Sans configuration supplémentaire, le [verbe TwiML `<Gather>`](https://www.twilio.com/docs/voice/twiml/gather) attend 5&nbsp;secondes après la fin du TwiML enfant pour soumettre les résultats. Par défaut, vous pouvez également appuyer sur `*` pour soumettre sans attendre. Voyez cela comme une touche entrée. Vous pouvez remplacer cette valeur à l'aide de l'attribut [`finishOnKey`](https://www.twilio.com/docs/voice/twiml/gather#finishonkey).

Pour contourner ce problème, vous pouvez utiliser l'attribut [`numDigits`](https://www.twilio.com/docs/voice/twiml/gather#numdigits). L'ajout de cette option soumet `Digits` dès que le nombre de chiffres correspondants a été saisi.

## Écrire le TwiML

Nous allons demander à notre appelant : «&nbsp;Veuillez saisir votre code PIN à quatre chiffres&nbsp;». Pour ce faire, commencez par créer un nouveau [TwiML Bin](https://www.twilio.com/console/runtime/twiml-bins). Ensuite, écrivez votre code pour collecter **exactement** 4&nbsp;chiffres de la part de votre appelant. Si vous avez besoin d'aide, jetez un œil au spoiler. Vous pouvez le faire&nbsp;!

<details>
    <summary>Spoiler: la solution TwiML Bin</summary>
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather numDigits="4">
        <Say>Please enter your four digit pin</Say>
    </Gather>
</Response>
```

</details>
## Vérifier que tout fonctionne

Reliez ce TwiML Bin au gestionnaire «&nbsp;Appel entrant&nbsp;» de votre numéro (\[\<%= env.TQ_TWILIO_NUMBER.value %>](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>)). Appelez-le et saisissez 4&nbsp;chiffres. Vous remarquerez que nous avons créé cette redoutable boucle `<Gather>` car nous n'avons déclaré aucune `action`. Pas besoin de se fatiguer pour ce coffre, mais si vous rencontrez à nouveau ce problème, rappelez-vous que l'absence d'action implique une mise en boucle&nbsp;!

Appuyez sur le bouton **HACK** pour récupérer votre butin&nbsp;!