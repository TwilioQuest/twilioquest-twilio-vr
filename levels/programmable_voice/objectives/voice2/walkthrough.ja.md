# スピークイージー

このバリアを突破するには、英語以外の言語で発信者に話しかけるスキルが必要になります。[`<Say>`TwiML動詞](https://www.twilio.com/docs/voice/twiml/say)では、さまざまな言語と声にアクセスできます。

タスクに適した音声を使用し、ユーザー体験をカスタマイズできます。別の言語でコミュニケーションをとる際には、アプリケーションに文化的な信憑性を持たせるため、それに適したボイスキャラクターを使用することが重要です。

## Say属性

ほとんどのTwiMLエレメントには、設定オプションがあります。通常、**属性**を使用してこれを実現しています。各`TwiML`タグには、事前設定された属性セットがあります。例えば`<Say>`タグでは、[`language`](https://www.twilio.com/docs/voice/twiml/say#attributes-language)属性を設定できます。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say language="es-MX">Hola, mundo</Say>
</Response>
```

属性名`language`の後に等号(`=`）が続き、さらに二重引用符に囲まれた値(ここでは`"es-MX"`）が続きます。

TwilioのTwiMLは[数多くの言語](https://www.twilio.com/docs/voice/twiml/say#attributes-language)をサポートしています。上記のTwiMLの例では、`es-MX`が使用されています。`es`はスペイン語、`MX`はメキシコの方言であることを選択するものです。

このTwiMLで応答するよう、着信通話を設定してみましょう。指定した言語に基づいて、新しいデフォルトの音声が使用されます。

## Amazon Polly

Amazon Pollyの流れるような発音は、世界中の聞き手に、高品質の音声出力を届けるために役立ちます。

このタスクを完了するため、Amazon Pollyの`"es-US"`、またはラテンアメリカのロケールを使用し、`"Miguel"`の音声を使用します。

TwiMLで音声を指定するため、**voice**属性を使用します。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say language="es-US" voice="Polly.Miguel">Hola, mundo</Say>
</Response>
```

上記のコードを新しいTwiML Binに記述し、\[それを自分の番号の着信通話ハンドラーに関連付けます](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>)

## 新しい音声を聞く

それでは、自分の電話番号に電話しましょう(\<%= env.TQ_TWILIO_NUMBER.value %>）。Mucho gusto Miguel! 実際にスペイン語の世界への挨拶が聞こえます。

[**HACK**]ボタンを押して、このバリアを突破し、次の冒険に進みましょう!