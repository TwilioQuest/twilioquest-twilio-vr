const { NiceError, handleError } = require('../../validation');

module.exports = async function(helper) {
  const phoneNumber = helper.env['TQ_TWILIO_NUMBER'];
  const phoneNumberLink = `<a href="https://www.twilio.com/console/phone-numbers/${
    helper.env['TQ_TWILIO_NUMBER_SID']
  }">${phoneNumber}</a>`;

  try {
    const number = await helper.findPhoneNumber(phoneNumber);

    if (!number.voiceUrl) {
      throw new NiceError(helper.world.getTranslatedString('twilio_vr.voice2.validator.error.onIncomingCall', { phoneNumberLink }));
    }
    const $ = await helper.fakeCall(
      number.voiceUrl,
      number.phoneNumber,
      helper.fakeNumber,
      { ErrorUrl: number.voiceUrl }
    );
    if ($('Response > Say').length < 1) {
      throw new NiceError(helper.world.getTranslatedString('twilio_vr.voice2.validator.error.sayVerb', { phoneNumberLink }));
    }
    if ($('Response > Say[voice]').length < 1) {
      throw new NiceError(helper.world.getTranslatedString('twilio_vr.voice2.validator.error.voiceAttribute', { phoneNumberLink }));
    }
    if ($('Response > Say[language]').length < 1) {
      throw new NiceError(helper.world.getTranslatedString('twilio_vr.voice2.validator.error.languageAttribute', { phoneNumberLink }));
    }

    helper.success(helper.world.getTranslatedString('twilio_vr.voice2.validator.success'));
  } catch (e) {
    handleError(e, helper, helper.world.getTranslatedString('twilio_vr.voice2.validator.error.TwinMLValidation', { phoneNumberLink }));
  }
};
