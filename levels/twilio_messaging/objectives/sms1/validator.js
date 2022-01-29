module.exports = async helper => {
  try {
    const client = helper.getTwilioClient();
    const messages = await client.messages.list({ limit: 100 });
    const found = messages.find(
      msg =>
        msg.direction === 'outbound-reply' &&
        msg.body.toLowerCase().includes('twilioquest rules')
    );
    if (!found) {
      throw helper.world.getTranslatedString('twilio_vr.sms1.validator.reply_not_found');
    }

    helper.success(helper.world.getTranslatedString('twilio_vr.sms1.validator.success', { found: found.body }));
  } catch (e) {
    helper.fail(e);
  }
};
