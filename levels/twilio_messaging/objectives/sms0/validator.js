module.exports = async helper => {
  const { messageSid } = helper.validationFields;

  try {
    const client = helper.getTwilioClient();
    if (!messageSid) {
      throw helper.world.getTranslatedString('twilio_vr.sms0.validator.required_sid');
    }

    const message = await client.messages(messageSid).fetch();
    if (message.body === helper.world.getTranslatedString('twilio_vr.sms0.validator.dance')) {
      throw helper.world.getTranslatedString('twilio_vr.sms0.validator.dont_take_our_word');
    }

    helper.success(helper.world.getTranslatedString('twilio_vr.sms0.validator.success', { message: message.body }));
  } catch (e) {
    helper.fail(e, {
      20404: helper.world.getTranslatedString('twilio_vr.sms0.validator.sid_error'),
    });
  }
};
