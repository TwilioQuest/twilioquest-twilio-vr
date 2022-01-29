const levelInfo = require('./level.json');
const LEVEL = 'programmable_voice';

module.exports = function(event, world) {
  let levelComplete = true, description = '';
  for (let i = 0, l = levelInfo.objectives.length; i<l; i++) {
    let objectiveKey = levelInfo.objectives[i];
    if (!world.isObjectiveCompleted(objectiveKey, LEVEL)) {
      levelComplete = false; break;
    }
  }

  if (levelComplete) {
    description = world.getTranslatedString('twilio_vr.programmable_voice.events.success');
  } else {
    description = world.getTranslatedString('twilio_vr.programmable_voice.events.clearAll');
  }

  world.updateQuestStatus(LEVEL, world.getTranslatedString('twilio_vr.programmable_voice.events.title'), description, levelComplete);
};
