const twilio = require('twilio');

module.exports = (helper) => {
  const { accountSid, authToken } = helper.validationFields;

  if (!accountSid || !authToken) {
    return helper.fail(helper.world.getTranslatedString('twilio_vr.basic3.validator.error.accountRequired'));
  }

  let c;

  try {
    c = twilio(accountSid, authToken);
  } catch (e) {
    return helper.fail(helper.world.getTranslatedString('twilio_vr.basic4.validator.error.validAccount'));
  }

  c.api.accounts(accountSid).fetch((err, response) => {
    console.log(err, response);
    if (err) {
      helper.fail(helper.world.getTranslatedString('twilio_vr.basic4.validator.error.notValidCredentials'));
    } else {
      helper.success(
        helper.world.getTranslatedString('twilio_vr.basic3.validator.success'),
        [
          { name: 'TWILIO_ACCOUNT_SID', value: accountSid },
          { name: 'TWILIO_AUTH_TOKEN', value: authToken, concealed: true },
        ]
      );
    }
  });
};
