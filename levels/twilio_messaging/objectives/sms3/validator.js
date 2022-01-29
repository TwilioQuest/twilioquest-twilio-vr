module.exports = async helper => {
  const { messageSid, lastStatus } = helper.validationFields;

  try {
    const client = helper.getTwilioClient();
    if (!messageSid) {
      throw helper.world.getTranslatedString('twilio_vr.sms3.validator.required_sid');
    }
    if (!lastStatus) {
      throw helper.world.getTranslatedString('twilio_vr.sms3.validator.enter_status');
    }

    const message = await client.messages(messageSid).fetch();
    if (message.status != lastStatus) {
      throw helper.world.getTranslatedString('twilio_vr.sms3.validator.status_not_match');
    }

    helper.success(helper.world.getTranslatedString('twilio_vr.sms3.validator.success', { status: message.status }));
  } catch (e) {
    helper.fail(e, {
      20404: helper.world.getTranslatedString('twilio_vr.sms3.validator.general_error'),
    });
  }
};
