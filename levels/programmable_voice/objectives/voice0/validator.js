const { NiceError, handleError } = require('../../validation');

module.exports = async function(helper) {
  const phoneNumber = helper.env['TQ_TWILIO_NUMBER'];
  const phoneNumberLink = `<a href="https://www.twilio.com/console/phone-numbers/${
    helper.env['TQ_TWILIO_NUMBER_SID']
  }">${phoneNumber}</a>`;

  try {
    const number = await helper.findPhoneNumber(phoneNumber);
    if (!number.voiceUrl) {
      throw helper.world.getTranslatedString('twilio_vr.voice0.validator.error.incomingValues', { phoneNumberLink });
    }

    // Request traversable TwiML from configured webhook URL - can throw for
    // a variety of error conditions (handled below in catch)
    const $ = await helper.fakeCall(
      number.voiceUrl,
      number.phoneNumber,
      helper.fakeNumber
    );

    // Ensure the <Say> tag is present
    if ($('Response > Say').length < 1) {
      throw helper.world.getTranslatedString('twilio_vr.voice0.validator.error.tagTwiML', { phoneNumberLink });
    }

    helper.success(helper.world.getTranslatedString('twilio_vr.voice0.validator.success'));
  } catch (e) {
    handleError(e, helper, helper.world.getTranslatedString('twilio_vr.voice0.validator.error.urlValidation', { phoneNumberLink }));
  }
};
