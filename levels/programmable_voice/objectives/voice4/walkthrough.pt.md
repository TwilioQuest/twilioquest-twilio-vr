# Saia e divirta-se

Você pode enviar áudio para os autores das chamadas usando o [verbo `<Play>` do TwiML](https://www.twilio.com/docs/voice/twiml/play). Isso pode proporcionar uma experiência de alta qualidade para o autor da chamada, pois nada soa mais humano do que um humano. Esse verbo `<Play>` também é frequentemente usado para reproduzir músicas para os autores das chamadas.

## Criar e hospedar arquivos de áudio personalizados

**Observação:** Se você não quiser criar áudio personalizado, poderá usar um arquivo de áudio público existente. Se você quiser usar nosso arquivo de áudio padrão ou um arquivo de áudio publicamente acessível na Internet, vá diretamente para a seção "Conectar tudo" abaixo.

`<Play>` aceita vários formatos de arquivos de áudio: `mp3`, `wav`, `aiff`, `gsm` e `μ-law`. Embora não esteja no escopo deste objetivo, você deverá localizar recursos on-line para criar um arquivo de áudio em qualquer um dos formatos compatíveis.

Se você quiser criar um arquivo de áudio personalizado, precisará hospedá-lo na Internet para que o Twilio possa acessá-lo.

Hospedar um arquivo é relativamente simples se você tiver um servidor da Web. Você o coloca em um diretório acessível publicamente e poderá então acessar o arquivo via URL.

Mas e se você não tiver um servidor da Web? Suponha que você esteja usando um TwiML Bin, que é hospedado por nós. É nesse ponto que os **Ativos** (assets) entram em _jogo_ (veja o que eu fiz lá 😉).

### Criar um ativo de áudio com tempo de execução

No console, navegue até [**Tempo de execução**](https://www.twilio.com/console/runtime/overview) > [**Ativos**](https://www.twilio.com/console/runtime/assets/public).

Arraste e solte o arquivo de áudio que deseja usar em qualquer lugar da página para carregá-lo. Você verá que os ativos criam um novo URL para você. Este é o valor que você vai passar para a chamada `<Play>`. Copie-o para a área de transferência e vamos conectar tudo.

## Conectar tudo

Modifique o TwiML retornado pela sua \[chamada recebida](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>) para usar a nova palavra-chave `<Play>`. Se você ainda não carregou um arquivo de áudio próprio, temos uma demonstração clássica em mp3 que você pode usar.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Play>http://demo.twilio.com/docs/classic.mp3</Play>
</Response>
```

Ligue para seu número de telefone (\<%= env.TQ_TWILIO_NUMBER.value %>). Verifique se o arquivo de áudio é reproduzido. Pronto!

Agora, pressione o botão **HACK** para que possamos arrombar esse baú e continuar sua jornada!