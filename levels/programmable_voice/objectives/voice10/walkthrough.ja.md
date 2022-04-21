# \<Dial>イン

`<Dial>`&nbsp;TwiML動詞を使用し、アプリケーションの途中で外線への発信を行うことができます。この機能を使用し、電話を転送するのが一般的なユースケースです。

## TwiML動詞: Dial

`<Dial>`動詞の本文は、[e.164形式](https://www.twilio.com/docs/glossary/what-e164)の電話番号を受け付けます。自動的に電話番号`(202) 555-0136`をダイヤルするTwiMLを作成するには、次のようにTwiMLを返します。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>+12025550136</Dial>
</Response>
```

## HACKの試行の完了

これを行うため、原材料を獲得します。残りはみなさん次第です。ハイレベルな手順は次のとおりです。

* `Dial`タグを使用するWebアプリケーション/関数/TwiML Binを作成し、着信を`+19473334160`に転送します。
* 自分の電話番号\[your phone number](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>)に対する着信電話が処理されるよう、そのアプリケーションを設定します。
* 自分の番号でテストします。
* 確実に動作する場合、[*HACK*]ボタンを押します。