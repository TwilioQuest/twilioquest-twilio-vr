module.exports = async function(helper) {
  try {
    const number = await helper.findPhoneNumber(helper.env.TQ_TWILIO_NUMBER);
    if (!number.smsUrl) {
      throw '「A Message Comes In」で電話番号を設定した？';
    }
    const $ = await helper.fakeMessage(
      number.smsUrl,
      number.phoneNumber,
      '+15033088404'
    );
    if ($('Response > Redirect').length < 1) {
      throw '困ったな。TwiMLでは必ずRedirect動詞を使うようにしましょう。';
    }

    helper.success('Redirectの能力はすごい！');
  } catch (e) {
    helper.fail(e);
  }
};
