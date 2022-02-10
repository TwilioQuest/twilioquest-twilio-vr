# 外部に対し再生する

[`<Play>`&nbsp;TwiML動詞](https://www.twilio.com/docs/voice/twiml/play)を使用し、発信者に対し音声を再生できます。人間による音声により、発信者に高品質の経験を提供できます。この`<Play>`動詞は、発信者に向けて音楽を再生する場合にもよく使用されます。

## カスタムの音声ファイルを作成し、ホストする

**注記:** カスタム音声の作成を希望しない場合には、代わりに既存の公開された音声ファイルを使用できます。Twilioのデフォルトの音声ファイルや、インターネットで一般に公開されている音声ファイルを使用するには、下の「関連付ける」セクションに進んでください。

`<Play>`は、`mp3`、`wav`、`aiff`、`gsm`、`μ-law`などさまざまな形式をサポートします。このObjectiveでは取り扱いませんが、サポートされている形式により音声ファイルを作成するためのオンラインリソースを多数見つけることができるはずです。

カスタムの音声ファイルを作成する場合は、Twilioからアクセスできるよう、それをインターネット上にホストします。

Webサーバーをお持ちならば、ファイルのホスティングは比較的簡単です。アクセス可能な公開ディレクトリに置けば、URL経由でそのファイルにアクセスできるようになります。

Webサーバーをお持ちでない場合は、TwilioがホストするTwiML Binを使用していると仮定します。ここでは、**Assets**が_play_を行います(私がそこで実行したこと😉をご覧ください)。

### Runtimeにより音声アセットを作成する

コンソールで[[**Runtime**]](https://www.twilio.com/console/runtime/overview)&nbsp;>&nbsp;[[**Assets**]](https://www.twilio.com/console/runtime/assets/public)と移動します。

使用する音声ファイルをページにドラッグアンドドロップし、アップロードします。Assetsが新しいURLを作成します。これが、`<Play>`呼び出しに渡す値です。それをクリップボードにコピーし、関連付けます。

## 関連付ける

着信通話\[incoming call](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID.value %>)から返されたTwiMLを変更し、新しい`<Play>`キーワードを使用するようにします。音声ファイルをまだアップロードしていない場合には、デモ用のclassic.mp3をご用意しています。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Play>http://demo.twilio.com/docs/classic.mp3</Play>
</Response>
```

それでは、自分の電話番号(\<%= env.TQ_TWILIO_NUMBER.value %>)に電話しましょう。音声ファイルの再生を確認します。これで完成しました。

では、[**HACK**]ボタンを押して宝箱を開き、冒険を続けましょう。