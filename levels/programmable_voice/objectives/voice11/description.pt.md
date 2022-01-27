# Corte do redirecionador

Em qualquer ponto do seu TwiML, você pode mudar imediatamente para outro conjunto de instruções TwiML. Você pode fazer isso usando o [verbo `<Redirect>`](https://www.twilio.com/docs/voice/twiml/redirect). Quando um `<Redirect>` é encontrado, o controle imediatamente é transferido para o novo TwiML, o que significa que nenhuma instrução TwiML ocorrerá _depois_ que o `<Redirect>` não ocorrer.

Imagine o seguinte aplicativo:

_Hospedado em_: https://twimlionaire.com/hello-world

```xml
<Response>
    <Say>Hello World!</Say>
    <Redirect>/hello-cloud</Redirect>
    <Say>A redirect has occurred</Say>
</Response>
```

_Hospedado em_: https://twimlionaire.com/hello-cloud

```xml
<Response>
    <Say>Hello Cloud!</Say>
</Response>
```

Para abrir esse baú, verifique todas as linhas que seriam faladas quando o aplicativo é executado.