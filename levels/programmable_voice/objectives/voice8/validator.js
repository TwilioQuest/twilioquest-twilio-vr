module.exports = async function(helper) {
  // Number of characters in the expected e.164 format
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
      helper.fakeNumber
    );

    // Find Gather
    if ($('Gather').length === 0) {
      throw helper.world.getTranslatedString('twilio_vr.voice7.validator.error.includeVerb', { phoneNumberLink });
    }
    // Ensure Say is nested inside
    if ($('Gather Say').length === 0) {
      throw helper.world.getTranslatedString('twilio_vr.voice7.validator.error.shouldNest', { phoneNumberLink });
    }
    // Grab numDigits
    if ($('Gather[numdigits="4"]').length === 0) {
      throw helper.world.getTranslatedString('twilio_vr.voice8.validator.error.numDigits');
    }

    helper.success(helper.world.getTranslatedString('twilio_vr.voice8.validator.success'));
  } catch (e) {
    helper.fail(e);
  }
};
