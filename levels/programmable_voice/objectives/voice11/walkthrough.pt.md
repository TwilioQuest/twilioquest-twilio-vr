# Corte do redirecionador

O redirecionamento na Web é muito comum. É quase certo que você já recebeu um URL encurtado como [twil.io/saxd](https://twil.io/saxd). Esse link encurtado o redireciona para outro URL mais difícil de lembrar. Outro padrão comum para redirecionamentos é enviar seu usuário para uma tela de login.

O TwiML oferece a mesma capacidade, você pode redirecionar para outra resposta do TwiML usando o verbo `<Redirect>`.

## `<Redirect>`

O verbo `<Redirect>` do TwiML pode ser colocado em seu código para mudar imediatamente o controle para outra resposta do TwiML. É _importante_ entender o imediatismo. Lembre-se de que o TwiML acontece em ordem, de cima para baixo. Quando um `<Redirect>` for encontrado, a parte restante da sua resposta do TwiML nunca será executada.

O corpo do verbo `<Redirect>` deve apontar para outro URL que hospeda o TwiML. Esse URL pode ser totalmente qualificado, o que significa que ele inclui o domínio e o caminho, ou absoluto, o que significa que ele começa com um `/` ou está relacionado ao arquivo atual do TwiML.

Este exemplo redireciona para um URL absoluto, o que significa que ele está no mesmo servidor.

**Hospedado em**: https://twimlillionaire.net/good-tunes

```xml
<Response>
    <Redirect>/sax-roll</Redirect>
    <Say>Can you hear it still?</Say>
</Response>
```

Observe que `/sax-roll` está hospedado no mesmo servidor. A barra significa que ele é absoluto e começa na raiz.

**Hospedado em**: https://twimlillionaire.net/sax-roll

```xml
<Response>
    <Say>Have you seen Epic Sax Guy yet? Google it.</Say>
</Response>
```

Lembre-se de que "Você ainda consegue ouvi-lo?" do verbo `<Say>` no arquivo do TwiML `/good-tunes` original, não acontecerá porque ele será imediatamente redirecionado quando atingir a tag `<Redirect>`.

## Entendeu?

Volte para a guia **Objective** (Objetivo) e verifique as respostas corretas no painel **HACK**