module.exports = (helper, callback) => {
  const phoneNumber = helper.getNormalizedInput('phoneNumber');

  if (!phoneNumber) {
    return helper.fail(`アカウントに電話番号をご記入ください。`);
  }

  let c;

  try {
    c = helper.getTwilioClient();
  } catch (e) {
    return helper.fail(e.message);
  }

  function respondWithError() {
    helper.fail(`
      電話番号が見つかりなかった。 もう一度お試しください。　また、電話番号とTwilioの資格情報が正しいことを確認してください。
    `);
  }

  let found = false;

  // Validate that the configured phone number exists
  try {
    c.incomingPhoneNumbers.list({ phoneNumber }, (err, response) => {
      if (err || !response[0] || !response[0].phoneNumber === phoneNumber) {
        return respondWithError();
      } else {
        found = true;
        return helper.success(
          `
            いいね。アカウントにこのTwilioの電話番号が見つかった。 
            この番号を覚えておいて、今後のチャレンジで使用する。
          `,
          [
            { name: 'TWILIO_NUMBER', value: response[0].phoneNumber },
            { name: 'TWILIO_NUMBER_SID', value: response[0].sid },
          ]
        );
      }
    });
  } catch (e) {
    console.log(e);
  }

  // Return after a few seconds if the number isn't found
  setTimeout(() => {
    if (!found) {
      respondWithError();
    }
  }, 5000);
};
