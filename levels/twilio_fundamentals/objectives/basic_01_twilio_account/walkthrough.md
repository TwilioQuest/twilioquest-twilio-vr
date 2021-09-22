# Twilioのアカウント設定

この目的は[Twilioアカウントを取得して](https://www.twilio.com/try-twilio?utm_source=twilioquest-3)Twilioとの連携のために必要な資格情報を見つける。この資格情報はTwilioQuestによってコンピュータにローカルに保存される。Twilio関連 コードチャレンジの進捗状況を検証され、スピードアップするのために使用される。

## アカウントの資格情報の取得

[Twilioアカウントをサインアップ](https://www.twilio.com/try-twilio?utm_source=twilioquest-3)したの後、[コンソールホームページ](https://www.twilio.com/console)にTwilioのアカウントの資格情報が掲載されている。

<center>
<img src="images/basic_training/account-sid-auth-token.png" />
</center>

この値が何、使用されることも何疑問に思っているかもしれない。

- **Twilio Account SID:** [電話番号](https://www.twilio.com/console/phone-numbers/incoming),[発信者番号通知](https://www.twilio.com/console/phone-numbers/verified),[メッセージングサービス](https://www.twilio.com/console/sms/services),TwilioのAPIの使用に関連する色々なリソースの集合体で構成されるTwilioのアカウントのユニークな識別子。
- **Twilio Auth Token:** TwilioのアカウントへのAPIアクセス用のパスワード。この値の取り扱いに注意が必要で、[バージョンコントロールシステム](https://ja.wikipedia.org/wiki/バージョンコントロールシステム)にコミットすることのよくある間違いを犯さないでください。

その二つの値を[Twilio REST APIs](https://www.twilio.com/docs)へのアクセスのためにユーザーネームとパスワードとして一緒に使用する。

## アカウントのセキュリティに関する注意

自社の本番アプリケーションで使用しているTwilioアカウントの認証情報をTwilioQuestで使用することはお勧めしません。弊社の検証と自動化コードは、可能な限り目立たないように設計されているけど、TwilioQuestに自分の本番APIの資格情報へのアクセスをさせると、予期せぬ結果になることもある。TwilioQuestに特化して使用するために、[新しいプロジェクトを作成すること](https://www.twilio.com/console/projects/create)を検討した方がいい。

TwilioQuestが使用するために提供したAPI資格情報は、検証の成功した後、**設定**メニューで編集することができる。資格情報はいつでも変更・消去することができる。探索中に*O*キーを押すとか、画面上部のHUDバーにある**設定**アイコンをクリックして**設定**メニューを開きる。

## 障壁をクリアする
右側のテキストフィールドにTwilioアカウントのSIDとauth tokenの両方を入力し、*HACK*のボタンを押す。資格情報が検証され、それが正しければ、このチャレンジに勝利したことになる。