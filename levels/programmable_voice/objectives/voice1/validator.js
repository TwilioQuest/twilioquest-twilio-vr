const { NiceError, handleError } = require('../../validation');

module.exports = async function(helper) {
  const phoneNumber = helper.env['TQ_TWILIO_NUMBER'];
  const phoneNumberLink = `<a href="https://www.twilio.com/console/phone-numbers/${
    helper.env['TQ_TWILIO_NUMBER_SID']
  }">${phoneNumber}</a>`;

  try {
    const number = await helper.findPhoneNumber(phoneNumber);

    if (!number.voiceFallbackUrl) {
      throw helper.world.getTranslatedString('twilio_vr.voice1.validator.error.primaryHandler', { phoneNumberLink });
    }
    const $ = await helper.fakeCall(
      number.voiceFallbackUrl,
      number.phoneNumber,
      helper.fakeNumber,
      { ErrorUrl: number.voiceUrl }
    );
    if ($('Response > Say').length < 1) {
      throw helper.world.getTranslatedString('twilio_vr.voice1.validator.error.sayVerb', { phoneNumberLink });
    }

    helper.success(helper.world.getTranslatedString('twilio_vr.voice1.validator.success'));
  } catch (e) {
    handleError(e, helper, helper.world.getTranslatedString('twilio_vr.voice1.validator.error.TwinMLValidation', { phoneNumberLink }));
  }
};
