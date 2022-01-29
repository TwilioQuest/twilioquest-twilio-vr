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
    // Grab action
    const actionUrl = $('Gather').attr('action');
    if (!actionUrl) {
      throw helper.world.getTranslatedString('twilio_vr.voice9.define_action');
    }
    // Grab input
    const input = $('Gather').attr('input');
    if (!input || input !== 'speech') {
      throw helper.world.getTranslatedString('twilio_vr.voice9.gather_speech', { phoneNumberLink });
    }
    const words = ['agent', 'hours', 'reset'];
    let hints = $('Gather').attr('hints');
    if (!hints) {
      throw helper.world.getTranslatedString('twilio_vr.voice9.comma_separated', { phoneNumberLink });
    }
    hints = hints.split(',').map(hint => hint.toLowerCase().trim());
    if (hints.length < 3) {
      throw helper.world.getTranslatedString('twilio_vr.voice9.expected_hints', { hints: words.join(',') });
    }
    // Run action with 3 diff digits and verify all different...
    const calls = words.map(word =>
      helper.fakeCall(actionUrl, number.phoneNumber, helper.fakeNumber, {
        SpeechResult: word,
        Confidence: 0.99,
      })
    );
    // TODO: These will be cheerios. Use .text() or .html() to get them
    const $responses = await Promise.all(calls);
    for (let i = 0; i < words.length; i++) {
      for (let j = i + 1; j < words.length; j++) {
        if ($responses[i].text() === $responses[j].text()) {
          throw helper.world.getTranslatedString('twilio_vr.voice9.compare_words', { enteredWords: words[i], compareWords: words[j] });
        }
      }
    }

    helper.success(helper.world.getTranslatedString('twilio_vr.voice9.success'));
  } catch (e) {
    helper.fail(e);
  }
};
