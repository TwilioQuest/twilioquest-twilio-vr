module.exports = async function(helper) {
  // Number of characters in the expected e.164 format
  const US_BASED_LENGTH = 12;
  const INTL_LENGTH = 13;
  const phoneNumber = helper.env['TQ_TWILIO_NUMBER'];
  const { prefix } = helper.validationFields;

  if (!prefix || !prefix.startsWith('+') || prefix.length < 1) {
    return helper.fail(helper.world.getTranslatedString('twilio_vr.voice5.validator.error.invalidPrefix'));
  }

  const prefixWithoutPlus = prefix.replace('+', '');
  const newPrefix = parseInt(prefixWithoutPlus);

  if (isNaN(newPrefix)) {
    return helper.fail(helper.world.getTranslatedString('twilio_vr.voice5.validator.error.prefixNotANumber'));
  }
  
  const prefixedNumber = `${prefix}8675309`;
  const notPrefixedNumber = `+${newPrefix + 1}8675309`;

  try {
    const number = await helper.findPhoneNumber(phoneNumber);
    const phoneNumberLink = `<a href="https://www.twilio.com/console/phone-numbers/${
      number.sid
    }">${phoneNumber}</a>`;

    if (!number.voiceUrl) {
      throw helper.world.getTranslatedString('twilio_vr.voice2.validator.error.onIncomingCall', { phoneNumberLink });
    }

    const check = num => {
      return helper.fakeCall(number.voiceUrl, number.phoneNumber, num);
    };
    const $sameTwiml = await check(prefixedNumber);
    const $differentTwiml = await check(notPrefixedNumber);
    if ($sameTwiml('Say').text() === $differentTwiml('Say').text()) {
      throw helper.world.getTranslatedString('twilio_vr.voice5.validator.error.invalidSimulation', { prefixedNumber, notPrefixedNumber, prefix, phoneNumberLink });
    }

    helper.success(helper.world.getTranslatedString('twilio_vr.voice5.validator.success'));
  } catch (e) {
    helper.fail(e);
  }
};
