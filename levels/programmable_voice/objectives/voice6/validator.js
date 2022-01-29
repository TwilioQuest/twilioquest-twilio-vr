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
    const twimlUrl = new URL(number.voiceUrl);

    const $ = await helper.fakeCall(
      twimlUrl.toString(),
      number.phoneNumber,
      helper.fakeNumber
    );
    
    if (!$.text().includes(helper.fakeNumber)) {
      throw helper.world.getTranslatedString('twilio_vr.voice6.validator.error.numberNotFound');
    }

    helper.success(helper.world.getTranslatedString('twilio_vr.voice6.validator.success'));
  } catch (e) {
    helper.fail(e);
  }
};
