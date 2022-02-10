# Utiliser le verbe Play

Vous pouvez diffuser du son à vos appelants à l'aide du [verbe TwiML `<Play>`](https://www.twilio.com/docs/voice/twiml/play). Cela peut offrir une expérience de haute qualité à votre interlocuteur, car rien n'a l'air plus humain qu'un humain. Ce verbe `<Play>` est également fréquemment utilisé pour que les appelants écoutent de la musique.

## Créer et héberger des fichiers audio customisés

**Remarques&nbsp;:** Si vous ne souhaitez pas créer de fichier audio personnalisé, vous pouvez utiliser un fichier audio public existant. Si vous souhaitez utiliser notre fichier audio par défaut ou un fichier audio accessible au public sur Internet, passez à la section «&nbsp;Reliez tout ça&nbsp;!&nbsp;» ci-dessous.

`<Play>` accepte différents formats de fichiers audio&nbsp;: `mp3`, `wav`, `aiff`, `gsm` et `μ-law`. Même si cet objectif n'est pas pris en charge, vous devriez pouvoir trouver en ligne des ressources permettant de créer un fichier audio dans l'un des formats pris en charge.

Si vous souhaitez créer un fichier audio personnalisé, vous allez devoir l'héberger sur Internet pour que Twilio puisse y accéder.

L'hébergement d'un fichier est relativement simple si vous disposez d'un serveur Web. Placez-le dans un répertoire accessible au public. Vous pourrez ensuite accéder au fichier via une URL.

Mais que faire si vous ne disposez pas d'un serveur Web&nbsp;? Supposons que vous utilisiez un TwiML Bin, que nous hébergeons. C'est là que les **ressources** vont vous faire _play-sir_ (😉).

### Créer une ressource audio avec Runtime

Dans votre console, accédez à [**Runtime**](https://www.twilio.com/console/runtime/overview)&nbsp;> [**Ressources**](https://www.twilio.com/console/runtime/assets/public).

Faites glisser et déposez le fichier audio que vous souhaitez utiliser n'importe où sur la page pour le charger. Vous verrez que les ressources créent une nouvelle URL pour vous. Il s'agit de la valeur que vous souhaitez transmettre à l'appel `<Play>`. Copiez-la dans votre presse-papiers. Il est temps de relier tout cela.

## Reliez tout ça&nbsp;!

Modifiez le TwiML renvoyé par votre \[appel entrant](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>) pour utiliser le nouveau mot-clé `<Play>`. Si vous n'avez pas chargé votre propre fichier audio, nous mettons à votre disposition un mp3 de démo classique.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Play>http://demo.twilio.com/docs/classic.mp3</Play>
</Response>
```

N'hésitez pas à appeler votre numéro de téléphone (\<%= env.TQ_TWILIO_NUMBER.value %>). Vérifiez que votre fichier audio est joué. Vous avez les choses en main à présent&nbsp;!

Maintenant, appuyez sur le bouton **HACK** pour ouvrir ce coffre et poursuivre votre voyage&nbsp;!