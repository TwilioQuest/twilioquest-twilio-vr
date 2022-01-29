module.exports = async function(helper) {
  const phoneNumber = helper.env['TQ_TWILIO_NUMBER'];
  try {
    const number = await helper.findPhoneNumber(phoneNumber);
    const phoneNumberLink = `<a href="https://www.twilio.com/console/phone-numbers/${
      number.sid
    }">${phoneNumber}</a>`;

    if (!number.voiceUrl) {
      throw helper.world.getTranslatedString('twilio_vr.voice2.validator.error.onIncomingCall', { phoneNumberLink });
    }
    const $ = await helper.fakeCall(
      number.voiceUrl,
      number.phoneNumber,
      helper.fakeNumber
    );
    
    // Find Gather
    if ($('Gather').length === 0) {
      throw helper.world.getTranslatedString('twilio_vr.voice7.validator.error.includeVerb', { phoneNumberLink });
    }
    // Ensure Say is nested inside
    if ($('Gather Say').length === 0) {
      throw helper.world.getTranslatedString('twilio_vr.voice7.validator.error.shouldNest', { phoneNumberLink });
    }

    // Grab action, if present - otherwise loop
    let actionUrl = $('Gather').attr('action');
    if (!actionUrl) {
      actionUrl = number.voiceUrl;
    }

    // Test the action URL
    const inputString = '123*';
    const $action = await helper.fakeCall(
      actionUrl,
      number.phoneNumber,
      helper.fakeNumber,
      { Digits: inputString }
    );

    // Ensure the response contains a <say> tag with text that contains the
    // input string
    let found = false;
    $action('Say').each((i, elem) => {
      const t = $action(elem).text();
      if (t.includes(inputString)) {
        found = true;
      }
    });

    if (!found) {
      throw helper.world.getTranslatedString('twilio_vr.voice7.validator.error.notSayTag');
    }

    helper.success(helper.world.getTranslatedString('twilio_vr.voice7.validator.success'));
  } catch (e) {
    helper.fail(e);
  }
};
