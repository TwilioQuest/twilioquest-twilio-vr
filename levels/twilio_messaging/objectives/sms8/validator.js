module.exports = async function(helper) {
  try {
    const number = await helper.findPhoneNumber(helper.env.TQ_TWILIO_NUMBER);
    if (!number.smsUrl) {
      throw helper.world.getTranslatedString('twilio_vr.sms7.validator.configure_phone');
    }
    const $ = await helper.fakeMessage(
      number.smsUrl,
      number.phoneNumber,
      '+15033088404'
    );
    if ($('Response > Redirect').length < 1) {
      throw helper.world.getTranslatedString('twilio_vr.sms8.validator.redirect');
    }

    helper.success(helper.world.getTranslatedString('twilio_vr.sms8.validator.success'));
  } catch (e) {
    helper.fail(e);
  }
};
