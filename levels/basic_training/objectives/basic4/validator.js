module.exports = (helper, callback) => {
  const phoneNumber = helper.getNormalizedInput('phoneNumber');

  if (!phoneNumber) {
    return helper.fail(helper.world.getTranslatedString('twilio_vr.basic4.validator.error.providePhone'));
  }

  let c;

  try {
    c = helper.getTwilioClient();
  } catch (e) {
    return helper.fail(e.message);
  }

  function respondWithError() {
    helper.fail(helper.world.getTranslatedString('twilio_vr.basic4.validator.error.validAccount'));
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
          helper.world.getTranslatedString('twilio_vr.basic4.validator.success'),
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
