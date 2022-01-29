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
    const $plays = $('Response > Play');
    if ($plays.length < 1) {
      throw helper.world.getTranslatedString('twilio_vr.voice4.validator.error.playVerb', { phoneNumberLink });
    }
    const audioUrl = $plays
      .eq(0)
      .text()
      .trim();
    if (!audioUrl || audioUrl === '') {
      throw helper.world.getTranslatedString('twilio_vr.voice4.validator.error.urlInclude');
    }
    const response = await helper.fakeRequest(audioUrl, {}, undefined, 'GET');
    if (response.status >= 400) {
      throw helper.world.getTranslatedString('twilio_vr.voice4.validator.error.invalidAudioFile', { audioUrl, responseStatus: response.status });
    }
    const contentType = response.headers.get('Content-Type');
    if (!contentType.toLowerCase().startsWith('audio')) {
      throw helper.world.getTranslatedString('twilio_vr.voice4.validator.error.notAudioFile', { audioUrl, contentType });
    }

    helper.success(helper.world.getTranslatedString('twilio_vr.voice4.validator.success'));
  } catch (e) {
    helper.fail(e);
  }
};
