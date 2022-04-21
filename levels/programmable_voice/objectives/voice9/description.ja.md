# スピーチの自由

発信者からDTMFトーンを収集するだけでなく、スピーチの承認も可能です。[`<Gather>` TwiML動詞](https://www.twilio.com/docs/voice/twiml/gather)では、パラメーター[`input`](https://www.twilio.com/docs/voice/twiml/gather#input)を定義します。これを、`"speech"`に設定できます。スピーチリクエストをより理解しやすくするため、コンマ区切りの[`"hints"`](https://www.twilio.com/docs/voice/twiml/gather#hints)を属性として提供することが可能(するべき)です。

このための一般的なフローとして、どのオプションが利用可能かを、みなさんのアプリケーションから`<Say>`(音声応答)するようにし、次に音声で伝えるよう発信者に依頼します。収集された情報は次に、Twilioからのリクエストの[`SpeechResult`]フィールドにポストされます。

この宝箱をこじ開けるため、スピーチを承認するProgrammable Voiceアプリケーションを記述します。銀行用のIVRを記述することを想像してください。ユーザーが電話をかけたとき、営業時間を尋ねるか、PINのリセットを依頼するか、エージェントとの対話を要求するかのいずれかを行うことができます。

着信番号を、次のプロンプトからの`<Gather>`&nbsp;`"speech"`情報に関連付けます。**何を実行したいですか?hours、reset、agentなどに関する音声発信が可能です。**

一致するヒントを提供し、次の`SpeechResult`リクエストへの応答を処理します。

_reset_: `<Say>` "Your pin has been reset" _hours_: `<Say>` "Our hours are 9 to 5" _agent_: `<Say>` "Connecting you to our next available agent"

_注記 - トラブルが発生した場合:_ いつでもTwilioリクエスト値の`SpeechResult`と`Confidence`を出力し、やり取りをデバッグに役立てることができます。