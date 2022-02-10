# Gatherループ

**コードエディタ**を使用すれば、この課題の完了はそれほど難しくないはずです。エディタを開いて<em><i class="fa fa-play"></i></em>を押すと、Node.jsサーバーが稼働し、そこには`<Gather>`動詞を使用するコードがあります。

サーバーが稼働しているときに、[ngrok](https://ngrok.com/)を使用し、このローカルアプリを一時的なパブリックURLに与えられます。それが完了した後、Twilioコンソールで自分の電話番号の設定を更新し、Voice Webhookでそのngrok URLを使用できます。

上記すべてが正常に動作する場合、[*HACK*]ボタンを押すと、TwilioQuestでGatherループが想定どおりに動作しているか検証できます。

## 魔法の再現

Functionsのこのコードまたは自身のコードの再現を試みている場合は、次のことに注目してください。

* デフォルトでは、[Gather](https://www.twilio.com/docs/voice/twiml/gather)は**現在のTwiML URLと同じURL**を`action`&nbsp;URLに使用します。このURLは、POSTパラメーターの`Digits`を、`<Gather>`完了後に受け取ります。この方法により、アプリケーションの中の同じルートを「Gatherループ」にすることができます。
* `action`&nbsp;URLをリクエストすると、`Digits`を`POST`パラメーターとして受け取ります。

この課題の検証をパスするには、あなたの`action`&nbsp;URLの応答に、`<Say>`タグと、その前の`<Gather>`実行中に入力された`Digits`の正確な文字列が含まれている必要があります。