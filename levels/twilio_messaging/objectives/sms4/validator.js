module.exports = async function(helper) {
  try {
    const number = await helper.findPhoneNumber(helper.env.TQ_TWILIO_NUMBER);

    if (!number.smsFallbackUrl) {
      throw helper.world.getTranslatedString('twilio_vr.sms4.validator.set_primary_handles');
    }

    const $twiml = await helper.fakeMessage(
      number.smsFallbackUrl,
      number.phoneNumber,
      '+15033088404',
      { ErrorUrl: number.smsUrl }
    );

    if ($twiml('Response > Message').length < 1) {
      throw helper.world.getTranslatedString('twilio_vr.sms4.validator.use_message_verb');
    }

    helper.success(helper.world.getTranslatedString('twilio_vr.sms4.validator.success'));
  } catch (e) {
    helper.fail(e);
  }
};
