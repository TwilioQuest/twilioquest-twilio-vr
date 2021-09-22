# プログラム可能な電話番号の取得

Twilioコンソールの[電話番号管理インターフェース](https://www.twilio.com/console/phone-numbers/incoming)に移動する。 このリストにある電話番号を使って、この課題をクリアすしてもいい。 電話番号を購入するために、*+*ボタンをクリックする。

<center>
<img src="images/basic_training/buy-number.png"/>
</center>

希望の国や市外局番の電話番号を検索する。 地球上のほぼすべての携帯電話にSMSメッセージを**配信**することは可能ですが、Twilioはすべての国でSMS配信に使用できる**現地**の電話番号を持っているわけではない。

「検索」をクリックすると、利用可能な電話番号のリストが表示される。SMSメッセージの送受信が可能なものを選ぶ。

<center>
<img src="images/basic_training/search-for-number.png"/>
</center>

電話番号を購入すると、お客様のTwilioアカウントから毎月いくらかの金額が引き落とされることになります（トライアルクレジットまたは実際の資金を使用）。新規Twilioアカウントの場合、プロモコード「TWILIOQUEST」をご利用いただくと、USD50の無料APIクレジットをご利用もらえる。 [コンソールのBillingセクション](https://www.twilio.com/console/billing)でこのプロモコードを使用して、アカウントをアップグレードできる。

ただし、TwilioQuestは、無料トライアルアカウントのみで完結する。 [トライアルアカウントにはいくつかの制限がある](https://support.twilio.com/hc/en-us/articles/223136107-How-does-Twilio-s-Free-Trial-work-)けど、TwilioQuestのAPIを習得しながら問題なく利用もらえる。

プログラム可能な電話番号を手に入れたのあと、TwilioQuestでTwilioにまつわる様々な課題に挑戦する準備ができている。

## 障壁をクリアする

SMSに対応した電話番号を[在庫](https://www.twilio.com/console/phone-numbers/incoming)から選ぶ。これは、アカウントに登録されている既存の電話番号でも、購入したばかりの新しい電話番号でも構いない。右側のテキストフィールドに電話番号を入力する。

電話番号は[E.164形式](https://www.twilio.com/docs/glossary/what-e164)で入力したほうがいい。今後、Twilioアプリやコードで電話番号を扱う際には、この形式を使用することを予定してください。バリデータはこの形式の電話番号しか受け付けない。例えば、米国の電話番号「(651) 867-5309」は、「+16518675309」と入力する必要がある。

「HACK」をクリックすると、TwilioQuestはこの電話番号がこのTwilioアカウントで所有されていることを確認する。TwilioQuestは、今後のチャレンジで使用するためにこの番号を保存する。