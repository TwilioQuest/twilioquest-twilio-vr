module.exports = async function(helper) {
  try {
    const number = await helper.findPhoneNumber(helper.env.TQ_TWILIO_NUMBER);
    if (!number.smsUrl) {
      throw helper.world.getTranslatedString('twilio_vr.sms7.validator.configure_phone');
    }

    if (!number.smsUrl.includes('twil.io')) {
      throw helper.world.getTranslatedString('twilio_vr.sms7.validator.missing_url');
    }

    const $ = await helper.fakeMessage(
      number.smsUrl,
      number.phoneNumber,
      '+15033088404'
    );
    if ($('Response > Message').length < 1) {
      throw helper.world.getTranslatedString('twilio_vr.sms7.validator.use_message_response');
    }

    helper.success(helper.world.getTranslatedString('twilio_vr.sms7.validator.success'));
  } catch (e) {
    helper.fail(e);
  }
};
