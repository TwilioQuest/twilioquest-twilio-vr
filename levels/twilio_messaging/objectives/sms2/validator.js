module.exports = async function(helper) {
  const { messageSid } = helper.validationFields;

  try {
    const client = helper.getTwilioClient();
    if (!messageSid) {
      throw new Error(helper.world.getTranslatedString('twilio_vr.sms2.validator.required_sid'));
    }

    // First, check to see if the message was sent at all...
    const mms = await client.messages(messageSid).fetch();
    console.log(mms);

    // Ensure it was an MMS - the SID should start with "MM"
    if (!mms.sid.startsWith('MM')) {
      throw new Error(helper.world.getTranslatedString('twilio_vr.sms2.validator.mms_message_mm'));
    }

    let successMessage = helper.world.getTranslatedString('twilio_vr.messaging.sms2.validator.success');

    // Try and fetch the media for the message, if it has been created
    const media = await client.messages(messageSid).media.list();
    if (media[0]) {
      const url = `https://api.twilio.com${media[0].uri}`.replace('.json', '');
      successMessage += `
        ${helper.world.getTranslatedString('twilio_vr.sms2.validator.look_familiar')} <br/>
        <img src="${url}" style="width:80%;margin:10px auto;display:block;"/>
      `;
    }

    // Display happy message
    helper.success(successMessage);
  } catch (e) {
    console.log(e);
    if (e.status === 404) {
      helper.fail(helper.world.getTranslatedString('twilio_vr.sms2.validator.message_not_found'));
    } else {
      helper.fail(e.message);
    }
  }
};
