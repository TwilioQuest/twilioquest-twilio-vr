# \<Dial>

É possível fazer uma chamada externa no seu aplicativo usando o verbo `<Dial>` do TwiML. Um caso de uso comum é usar essa funcionalidade para o encaminhamento de chamadas.

## Verbo "Dial" do TwiML

O corpo do verbo `<Dial>` aceita um número de telefone no [formato e.164](https://www.twilio.com/docs/glossary/what-e164). Para criar um TwiML que discou automaticamente o número `(202) 555-0136`, você retornaria um TwiML assim:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>+12025550136</Dial>
</Response>
```

## Conclusão da tentativa de hack

Você tem as matérias-primas para fazer isso. O resto é por sua conta. As etapas de alto nível são as seguintes:

* Crie um aplicativo da Web/função/TwiML Bin que use a tag `Dial` para encaminhar uma chamada recebida para `+19473334160`.
* Confirme se o aplicativo está configurado para atender chamadas recebidas em [seu número de telefone](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>).
* Teste seu número!
* Quando estiver confiante de que funciona, aperte o botão *HACK*.