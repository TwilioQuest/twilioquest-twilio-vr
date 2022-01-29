module.exports = async function(helper) {
  const phoneNumber = helper.env['TQ_TWILIO_NUMBER'];
  const { rejectedNumber } = helper.validationFields;

  try {
    const number = await helper.findPhoneNumber(phoneNumber);
    const phoneNumberLink = `<a href="https://www.twilio.com/console/phone-numbers/${
      number.sid
    }">${phoneNumber}</a>`;
    if (!number.voiceUrl) {
      throw helper.world.getTranslatedString('twilio_vr.voice2.validator.error.onIncomingCall', { phoneNumberLink });
    }
    if (!rejectedNumber) {
      throw helper.world.getTranslatedString('twilio_vr.voice12.fill_rejected');
    }
    const numbers = [helper.fakeNumber, rejectedNumber];
    const calls = numbers.map(num =>
      helper.fakeCall(number.voiceUrl, number.phoneNumber, num)
    );
    const $responses = await Promise.all(calls);
    if ($responses[0]('Reject').length !== 0) {
      throw helper.world.getTranslatedString('twilio_vr.voice12.rejected_error', { number: numbers[0], rejectNumber: numbers[1], phoneNumberLink });
    }

    if ($responses[1]('Reject').length === 0) {
      throw helper.world.getTranslatedString('twilio_vr.voice12.should_be_rejected', { numbers: numbers[0], phoneNumberLink });
    }

    if ($responses[1]('Reject[reason="busy"]').length === 0) {
      throw helper.world.getTranslatedString('twilio_vr.voice12.busy');
    }

    if ($responses[0]('Say').length === 0) {
      throw helper.world.getTranslatedString('twilio_vr.voice12.say_something');
    }

    helper.success(helper.world.getTranslatedString('twilio_vr.voice12.success'));
  } catch (e) {
    helper.fail(e);
  }
};
