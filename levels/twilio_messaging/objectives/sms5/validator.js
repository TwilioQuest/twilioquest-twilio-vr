module.exports = async function(helper) {
  try {
    const number = await helper.findPhoneNumber(helper.env.TQ_TWILIO_NUMBER);
    if (!number.smsUrl) {
      throw helper.world.getTranslatedString('twilio_vr.sms5.validator.missing_fields');
    }
    const $ = await helper.fakeMessage(
      number.smsUrl,
      number.phoneNumber,
      '+15033088404'
    );
    if ($('Response > Message').length < 1) {
      throw `${helper.world.getTranslatedString('twilio_vr.sms5.validator.use_message_verb')}
              <p>
                <textarea style="border:none;width:100%;height:100px;">${$.html()}</textarea>
              </p>`;
    }

    helper.success(helper.world.getTranslatedString('twilio_vr.sms5.validator.you_dit_it'));
  } catch (e) {
    helper.fail(e);
  }
};
