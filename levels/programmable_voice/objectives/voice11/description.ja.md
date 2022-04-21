# リダイレクト

TwiMLのどの時点でも、別のTwiML手順セットに切り替えることができます。これは、[`<Redirect>`動詞](https://www.twilio.com/docs/voice/twiml/redirect)を使用して行います。`<Redirect>`が発生すると、コントロールが即座に新しいTwiMLに転送されます。これは、発生予定のあらゆるTwiMLステートメントが、`<Redirect>`の_後_は発生しないことを意味します。

次のアプリケーションをイメージしてください。

_Hosted at_: https://twimlionaire.com/hello-world

```xml
<Response>
    <Say>Hello World!</Say>
    <Redirect>/hello-cloud</Redirect>
    <Say>A redirect has occurred</Say>
</Response>
```

_Hosted at_: https://twimlionaire.com/hello-cloud

```xml
<Response>
    <Say>Hello Cloud!</Say>
</Response>
```

この宝箱を開くため、アプリケーションの実行時に音声になるすべてのセリフを確認します。