# 発信MMSメッセージの送信

注記: このオブジェクティブは、アメリカとカナダの電話番号に限定されます。

最初のSMSメッセージを送信するときと同じように、Twilioの[RESTful API](https://www.twilio.com/docs/sms/api)を使用して発信MMSを送信できます。この宝箱を開くには、同じ手順に従いSMSメッセージを送信しますが、非常に重要な追加事項が1つあります。_送信するメディアのURL_です。

## MMSメッセージの送信に必要なもの

SMSメッセージを送信したときと同じように、TwilioのAPIに送信するリクエストを認証します。リクエストを行うときは、次の3つのパラメーターを渡します。

- **MediaUrl(もしくはBody):** Twilioでは、メッセージを送信するためのコンテンツが必要です。MediaUrl、Body、またはその両方です。[MediaUrl(イメージ)](https://www.twilio.com/docs/sms/api/message-resource#create-a-message-resource)を渡し、MMSで送信するイメージの場所をTwilioのAPIに指示する必要があります。
- **To:** メッセージの送信先の電話番号。トライアルアカウントを使用している場合、これは[認証済みの電話番号](https://www.twilio.com/console/phone-numbers/verified)の1つでなければなりません。
- **From:** メッセージの送信元となるプログラム可能なTwilio電話番号。以前に設定した電話番号([**設定**]UIを確認)、または[所有しているSMS対応の電話番号](https://www.twilio.com/console/phone-numbers/incoming)を使用できます。

## APIリクエストの作成

TwilioのAPIにリクエストを送信する方法は自由に選べます。Twilioの[ヘルパーライブラリー](https://www.twilio.com/docs/libraries)の1つまたは次の[cURL](https://curl.haxx.se/docs/manual.html)コマンドを使用し、独自のクレデンシャルとメディアURLを置き換えることができます。

```
curl -X POST'https://api.twilio.com/2010-04-01/Accounts/AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages.json' \
--data-urlencode "From=+15017122661" \
--data-urlencode "To=+15017122661" \
--data-urlencode 'MediaUrl=https://i.ytimg.com/vi/U_JbTHp6uzI/maxresdefault.jpg' \
-u AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:[AuthToken]
```

[Pythonヘルパーライブラリー](https://www.twilio.com/docs/sms/tutorials/how-to-send-sms-messages-python)を使用すると、次のようになります。

```python
from twilio.rest import Client

# your account sid and auth token from twilio.com/console
account_sid = 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
auth_token = 'your_auth_token'
client = Client(account_sid, auth_token)

message = client.messages.create(
    media_url="https://i.ytimg.com/vi/U_JbTHp6uzI/maxresdefault.jpg",
    body="Why isn't that an API?",
    from_="+15017122661",
    to="+15558675310"
)

print(message.sid)
```

QuestIDEを使用すると、編集可能な[Node.js](https://nodejs.org/)コードサンプルが読み込まれます。ただし、パラメーターは事前に読み込まれないため、今回は自分で入力する必要があります。

## 宝箱を開く

APIリクエストを行うと、MMSのメッセージSIDが返されます。_MM_で始まるため、MMSであることが分かります。MMSのSIDをコピーし、ハッキングインターフェイスに入力します。`HACK`を押すと、TwilioQuestはTwilioアカウントをチェックし、メッセージSIDにMediaUrlが含まれていることを確認します。