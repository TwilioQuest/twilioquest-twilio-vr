# 関数ジャンクション

[Twilio関数](https://www.twilio.com/docs/runtime/functions)を[作成](https://www.twilio.com/console/runtime/functions/manage)し、着信通話に応答します。関数には、最終的に、Voice TwiMLの応答を返すロジックが含まれている必要があります。ただし、**発信者の電話番号に指定した特定のプリフィックスが含まれる場合**、応答は変わります(右のハックUIでお知らせください）。

例えば、発信者が`+1503`で始まる番号から発信している場合、次のように応答します。`<Say>Keep Portland weird!</Say>`.発信者の電話番号がそのプリフィックスで始まらない場合には、何か別のことを`<Say>`(応答）します。

\[自分の電話番号](https://www.twilio.com/console/phone-numbers/\<%= env.TQ_TWILIO_NUMBER_SID ? env.TQ_TWILIO_NUMBER_SID.value : '' %>)の音声URLが、このように機能する関数に接続されます。[*HACK*]ボタンをクリックします。関数で「遊び」を取り込むようにしましょう。