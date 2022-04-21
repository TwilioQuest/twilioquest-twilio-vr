# もう一度言う

この宝箱を開くため、繰り返し言う能力を獲得します。`<Say>`&nbsp;[TwiML動詞](https://www.twilio.com/docs/voice/twiml/say)には、[`loop`](https://www.twilio.com/docs/voice/twiml/say#attributes-loop)属性があります。これを使用すると、`<Say>`スピーチは同じ文言を繰り返します。

## 追加の宝:  無限のループ

特別な`loop`値である、`0`を使用すると、音声合成(TTS）機能は、発信者が電話を切るまで永遠にスピーチを繰り返し続けます。私の子供たちは、このループを`"Are we there yet?"`のテキストに設定しています。

## ループを設定する

これを試してみましょう。TwiMLを、**Anything worth doing is worth doing twice**と繰り返すように設定します。****

もちろん、これは2回繰り返されます。

着信通話ハンドラー\[incoming call handler](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>)に対しては、みなさんが返すTwiMLが`loop`値を必ず使用するようにします。

ヘルプが必要な場合には、下のスポイラーをクリックし開いてください。

<details>
    <summary>スポイラー: TwiMLコード</summary>
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say loop="2">Anything worth doing is worth doing twice.</Say>
</Response>
```

</details>
電話番号の設定を**保存する**のを忘れないようにしてください。

## テストする

それでは、自分の電話番号(\<%= env.TQ_TWILIO_NUMBER.value %>）に電話しましょう。スピーチが2回繰り返されると成功です。

では、[**HACK**]ボタンを押して宝箱を開き、冒険を続けましょう。