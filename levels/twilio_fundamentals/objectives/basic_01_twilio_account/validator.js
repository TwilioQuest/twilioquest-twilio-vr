const twilio = require('twilio');

module.exports = (context, callback) => {
  const { accountSid, authToken } = context.validationFields;

  if (!accountSid || !authToken) {
    return callback({
      message: `アカウントのSIDとauth tokenが必要から、テキストフィールドに入力してください。`,
    });
  }

  let c;

  try {
    c = twilio(accountSid, authToken);
  } catch (e) {
    return callback({
      message: `有効なTwilioアカウントのSIDが必要です。これはtwilio.com/consoleで確認でき、AC で始まる。`,
    });
  }

  c.api.accounts(accountSid).fetch((err, response) => {
    console.log(err, response);
    if (err) {
      callback({
        message: `Twilio資格情報を確認できなかった。資格情報が正しいことを確認して、もう一度お試しください。`,
      });
    } else {
      callback(null, {
        message: `凄い！資格情報はいいね。これは後で使うために保存しておく。`,
        env: [
          { name: 'TWILIO_ACCOUNT_SID', value: accountSid },
          { name: 'TWILIO_AUTH_TOKEN', value: authToken, concealed: true },
        ],
      });
    }
  });
};
