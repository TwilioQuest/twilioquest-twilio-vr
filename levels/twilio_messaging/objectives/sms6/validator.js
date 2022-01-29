module.exports = async function(helper) {
  
  const requestParams = {
    Body: 'Ahoy!',
    From: '+12095551212',
  };

  try {
    const number = await helper.findPhoneNumber(helper.env.TQ_TWILIO_NUMBER);
    if (!number.smsUrl) {
      throw helper.world.getTranslatedString('twilio_vr.sms6.validator.missing_fields');
    }
    const $ = await helper.fakeMessage(
      number.smsUrl,
      number.phoneNumber,
      '+15033088404',
      requestParams
    );
    if ($('Response > Message[to]').length === 0) {
      throw helper.world.getTranslatedString('twilio_vr.sms6.validator.to_attribute');
    }
    if (
      !$.text().includes(requestParams.From) ||
      !$.text().includes(requestParams.Body)
    ) {
      throw helper.world.getTranslatedString('twilio_vr.sms6.validator.include_from_body');
    }

    helper.success(helper.world.getTranslatedString('twilio_vr.sms5.validator.you_dit_it'));
  } catch (e) {
    helper.fail(e);
  }
};
