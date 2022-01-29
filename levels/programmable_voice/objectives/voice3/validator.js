module.exports = async function(helper) {
  const phoneNumber = helper.env['TQ_TWILIO_NUMBER'];

  try {
    const number = await helper.findPhoneNumber(phoneNumber);
    const phoneNumberLink = `<a href="https://www.twilio.com/console/phone-numbers/${
      number.sid
    }">${phoneNumber}</a>`;

    if (!number.voiceUrl) {
      throw helper.world.getTranslatedString('twilio_vr.voice2.validator.error.onIncomingCall', { phoneNumberLink });
    }
    const $ = await helper.fakeCall(
      number.voiceUrl,
      number.phoneNumber,
      helper.fakeNumber,
      { ErrorUrl: number.voiceUrl }
    );
    if ($('Response > Say').length < 1) {
      throw helper.world.getTranslatedString('twilio_vr.voice3.validator.error.sayVerb', { phoneNumberLink });
    }
    if ($('Response > Say[loop="2"]').length < 1) {
      throw helper.world.getTranslatedString('twilio_vr.voice3.validator.error.loopAttribute', { phoneNumberLink });
    }

    helper.success(helper.world.getTranslatedString('twilio_vr.voice3.validator.success'));
  } catch (e) {
    helper.fail(e);
  }
};
