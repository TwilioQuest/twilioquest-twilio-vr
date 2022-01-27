# Este \<Dial> vai para 11

Configure \[seu número de telefone](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) para encaminhar uma chamada recebida para `+19473334160`. Use a tag `<Dial>` ([documentos](https://www.twilio.com/docs/voice/twiml/dial)) para essa finalidade. Fornecemos um esboço de um aplicativo que você pode usar no **code editor** (editor de código), mas desta vez vamos ver se você mesmo pode preencher mais espaços em branco. Você também pode concluir este desafio com seu próprio código ou TwiML Bins.

Para passar pela validação, seu [URL de voz do número de telefone](https://www.twilio.com/console/phone-numbers/<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>) deve retornar o TwiML que usa a tag `Dial` para encaminhar uma chamada para `+19473334160`. Ele DEVE discar esse número específico. Quando seu app estiver pronto, pressione o botão *HACK*.

**OBSERVAÇÃO:** As contas de teste só podem ligar para [números verificados](https://www.twilio.com/console/phone-numbers/verified). No entanto, você ainda pode criar um app que retorne o TwiML para cumprir este desafio.