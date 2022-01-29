// FIXME: This is a little wonky based on checkboxes not working just quite yet
function isChecked(helper, fieldName) {
  const val = helper.validationFields[fieldName];
  // This is making sure the field is not empty
  return val !== undefined && val.trim() !== '';
}

module.exports = async function(helper) {
  try {
    if (isChecked(helper, 'redirect')) {
      throw helper.world.getTranslatedString('twilio_vr.voice11.moves_to_next');
    }
    if (!isChecked(helper, 'helloWorld')) {
      throw helper.world.getTranslatedString('twilio_vr.voice11.line_would_ran');
    }
    if (!isChecked(helper, 'helloCloud')) {
      throw helper.world.getTranslatedString('twilio_vr.voice11.trick_question');
    }

    helper.success(helper.world.getTranslatedString('twilio_vr.voice11.success'));
  } catch (e) {
    helper.fail(e);
  }
};
