module.exports = async function(helper) {
  // Number of characters in the expected e.164 format
  const phoneNumber = helper.env['TQ_TWILIO_NUMBER'];
  const cedricNumber = '+19473334160';

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

    if ($('Dial').length !== 1) {
      throw helper.world.getTranslatedString('twilio_vr.voice10.twiml_attached', { phoneNumberLink });
    }

    if (!$('Dial').text().includes(cedricNumber)) {
      throw helper.world.getTranslatedString('twilio_vr.voice10.cedric_number', { cedricNumber });
    }

    helper.success(helper.world.getTranslatedString('twilio_vr.voice10.success'));
  } catch (e) {
    helper.fail(e);
  }
};
