# SMSメッセージの送信

この時点で、基本トレーニングを完了し、そのプロセスを通じてTwilioアカウントとTwilio電話番号の両方を設定していることと思います。では、それらを実際に使ってテキストメッセージを送信してみましょう。Twilioは、プログラムでSMSメッセージを送信できる(そして他の多くの便利なことを実行できる)[RESTful API](https://www.twilio.com/docs/sms/api)を提供しています。

このバリアを乗り越えるには、Twilio APIを使用してテキストメッセージを送信し、送信したメッセージの固有IDを取得する必要があります。

## 思い出そう: APIとは?

Twilioは、プログラムでテキストメッセージを送信できるAPIを提供していますが、APIとは何ですか?[API](https://www.twilio.com/docs/glossary/what-is-an-api)は「アプリケーションプログラミングインターフェイス」の略です。

APIの簡単な例えは、レストランのウェイターです。APIはウェイター、キッチンはサービス(Twilio)、顧客はAPI(コード)のクライアント/コンシューマーです。レストランでは、顧客がウェイターに料理を注文し、ウェイターはそのリクエストをキッチンに持って行きます。顧客は料理がどのように準備されたかを知りません。彼らが求めているのは、リクエストした食べ物だけです。同様に、コードはTwilioのAPIを介してリソースをリクエストします。この場合、ユーザーに代わり、送信テキストメッセージを作成します。Twilioは、実際にメッセージを送信する際の複雑さをすべて抽象化しました。あなたがなすべきは、SMSメッセージを送りたいことをAPIに伝えることです。

メッセージリソースを作成、読み取り、更新、または削除するために特定のエンドポイントにHTTPリクエストを送信することにより、TwilioのAPIと対話するコードを記述します。

## SMSメッセージの送信に必要な情報

TwilioにAPIリクエストを行うときは、認証クレデンシャルを渡すことに加え、少なくとも3つのパラメーターを指定する必要があります。

- **本文:** 送信するメッセージ本文です。
- **To:** メッセージの送信先の電話番号。トライアルアカウントを使用している場合、これは[認証済みの電話番号](https://www.twilio.com/console/phone-numbers/verified)の1つでなければなりません。
- **From:** メッセージの送信元となるTwilioプログラム可能な電話番号。以前に設定した電話番号([**設定**]UIを確認)、または[所有しているSMS対応のTwilio電話番号](https://www.twilio.com/console/phone-numbers/incoming)を使用できます。

## APIリクエストの作成

HTTPリクエストの作成をサポートする任意のプログラミング環境またはツールから[TwilioのREST API](https://www.twilio.com/docs/sms/api)にリクエストを送信できます。Twilioは、このプロセスを容易にする一般的なプログラミング言語の多くに、さまざまなサーバー側[ヘルパーライブラリー](https://www.twilio.com/docs/libraries)を提供しています。

SMSメッセージを送信するには、[メッセージリソース](https://www.twilio.com/docs/sms/api/message-resource)を操作します。このAPIエンドポイントにHTTP POSTリクエストを送信すると、新しいメッセージが作成(ならびに送信)されます。

次の[cURL](https://curl.haxx.se/docs/manual.html)コマンドは、(プレースホルダーの代わりに必要なパラメーターを使用して設定されている場合)アカウントからメッセージを送信します。

```
curl -X POST https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages.json \
--data-urlencode "From=+15017122661" \
--data-urlencode "Body=Body" \
--data-urlencode "To=+15017122661" \
-u ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_auth_token
```

Twilioのドキュメントには、[多くのプログラミング言語のコードサンプル](https://www.twilio.com/docs/sms/api/message-resource#create-a-message-resource)が含まれており、その環境でTwilioヘルパーライブラリーを使用してSMSメッセージを送信する方法が示されています。[Pythonヘルパーライブラリーを使用した例](https://www.twilio.com/docs/sms/api/message-resource?code-sample=code-create-a-message&code-language=Python&code-sdk-version=6.x)を次に示します。

```python
from twilio.rest import Client

# Your Account Sid and Auth Token from twilio.com/console
account_sid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
auth_token = 'your_auth_token'
client = Client(account_sid, auth_token)

message = client.messages.create(
    from_='+15017122661',
    body='body',
    to='+15558675310'
)

print(message.sid)
```

上記のcURLとPythonの例を比較してください。構文は言語ごとに異なるため、これらサンプルの見え方は異なりますが、コアAPIの概念は同じです。それぞれで、`from`数、`to`数、`body`テキストの3つのパラメーターを使用してTwilio APIメッセージングエンドポイントにPOSTリクエストを送信することにより、メッセージを作成して送信しています。

QuestIDEを使用する場合、編集可能な[Node.js](https://nodejs.org/)コードサンプルが読み込まれ、TwilioQuest設定から必要なパラメーターのほとんどが事前に入力されます。

## 課題を完了する

APIリクエストを行うと、メッセージのSIDはリクエストにより返されるデータの1つになります。その値をコピーし、右側のハッキングインターフェイスに貼り付けます。[*HACK*]ボタンをクリックすると、TwilioQuestはTwilioアカウントにクエリを実行し、このメッセージが実際に存在することを確認します。存在していれば、あなたの勝ちです!