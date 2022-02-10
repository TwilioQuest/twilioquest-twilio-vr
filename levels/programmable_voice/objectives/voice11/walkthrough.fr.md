# Changement de direction

La redirection est une pratique très courante sur le Web. Vous avez certainement déjà vu une URL abrégée, comme [twil.io/saxd](https://twil.io/saxd). Ce lien raccourci vous redirige vers une autre URL plus difficile à mémoriser. Une autre méthode de redirection fréquente consiste à envoyer votre utilisateur vers un écran de connexion.

TwiML vous permet de faire la même chose&nbsp;: vous pouvez effectuer une redirection vers une autre réponse TwiML en utilisant le verbe `<Redirect>`.

## `<Redirect>`

Le verbe TwiML `<Redirect>` peut être placé dans votre code pour passer immédiatement le contrôle à une autre réponse TwiML. Le caractère immédiat est très _important_ ici. Rappelez-vous que TwiML se déroule dans l'ordre, du haut vers le bas. Si un `<Redirect>` est rencontré, la partie restante de votre réponse TwiML ne s'exécutera jamais.

Le corps du verbe `<Redirect>` doit pointer vers une autre URL qui héberge TwiML. Cette URL peut être soit entièrement qualifiée, ce qui signifie qu'elle inclut le domaine et le chemin d'accès, soit absolue, ce qui signifie qu'elle commence par un `/`, ou même qu'elle est relative au fichier TwiML actuel.

Cet exemple redirige vers une URL absolue, ce qui signifie qu'elle se trouve sur le même serveur.

**Hébergé sur**&nbsp;: https://twimlillionaire.net/good-tunes

```xml
<Response>
    <Redirect>/sax-roll</Redirect>
    <Say>Can you hear it still?</Say>
</Response>
```

Notez comment `/sax-roll` est hébergé sur le même serveur. La barre oblique signifie qu'elle est absolue et qu'elle commence à la racine.

**Hébergé sur**&nbsp;: https://twimlillionaire.net/sax-roll

```xml
<Response>
    <Say>Have you seen Epic Sax Guy yet? Google it.</Say>
</Response>
```

Rappelez-vous, le «&nbsp;Pouvez-vous encore l'entendre&nbsp;?&nbsp;» du verbe `<Say>` dans le fichier TwiML original `/good-tunes` ne se produira pas car il sera immédiatement redirigé lorsqu'il atteindra le tag `<Redirect>`.

## Vous comprenez&nbsp;?

Retournez à l'onglet **Objectif** et essayez de cocher les bonnes réponses dans le panneau **HACK**