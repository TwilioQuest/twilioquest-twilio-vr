# 外部に対し\<Play>(再生)する

`<Play>` TwiMLタグ([docs](https://www.twilio.com/docs/voice/twiml/play))は、発信者に音声ファイルを再生します。保留の音楽や、事前に録音した音声による挨拶を流すこともできます。この課題を克服するには、お使いのアプリに\[自分の電話番号\](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>)を設定し、`<Play>`タグを使用します。コードで使用する音声ファイルが必要な場合には、以下をお勧めします。

```bash
http://demo.twilio.com/docs/classic.mp3
```

上記の音声ファイルを使用する場合には、テストのため**まず自分の電話番号にかけてください**。みなさんの電話番号の音声URLが、`<Play>`タグを使用するTwiMLを返した後、[*HACK*]ボタンをクリックします。