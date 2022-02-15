# プログラム可能な電話番号を取得する

Twilioコンソールの[電話番号管理インターフェイス](https://www.twilio.com/console/phone-numbers/incoming)に移動します。このリストの電話番号を使用し、この課題を完了できます。[_+_]ボタンをクリックして電話番号を購入します。

<center>
<img src="images/basic_training/buy-number.png"/>
</center>
希望する国または市外局番の電話番号を検索します。地球上のほぼすべての携帯電話にSMSメッセージを**配信**することができますが、SMS配信に使用できる**市内**電話番号がすべての国にあるわけではありません。

[Search]をクリックすると、利用可能な電話番号のリストが表示されます。SMSメッセージを送受信できるものを選択してください。

<center>
<img src="images/basic_training/search-for-number.png"/>
</center>
電話番号を購入すると、毎月Twilioアカウントから(トライアルクレジットまたは実際の資金を使用して）一定の金額が引き落とされます。

ただし、無料トライアルアカウントのみを使用してTwilioQuestを完了できます。[トライアルアカウントにはいくつかの制限があります](https://support.twilio.com/hc/en-us/articles/223136107-How-does-Twilio-s-Free-Trial-work-)が、TwilioQuestでAPIを学習するのには問題ありません。

プログラム可能な電話番号を取得すると、TwilioQuestでTwilio関連の多くの課題に取り組む準備が整います。

## バリアをクリアする

[在庫](https://www.twilio.com/console/phone-numbers/incoming)からSMS対応の電話番号を選択します。これは、アカウントの既存の電話番号でも、購入したばかりの新しい電話番号でもかまいません。右側のテキストフィールドに電話番号を入力します。

電話番号は[E.164形式](https://www.twilio.com/docs/glossary/what-e164)で入力する必要があります。今後Twilioアプリとコードで電話番号を操作する場合は、この形式の使用を計画する必要があります。バリデーターは、この形式の電話番号のみを受け入れます。例えば、米国の電話番号「(651）867-5309」は`+16518675309`と入力する必要があります。

[`HACK`]をクリックすると、TwilioQuestは、この電話番号をご利用のTwilioアカウントが所有していることを確認します。TwilioQuestは、今後の課題で使用するためにこの番号を保存します。