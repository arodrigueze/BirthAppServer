class Validations {
  /* Method for validate if string is empty
    @param word
    String to be validated
    */
  isEmptyString(word) {
    if (word.length === 0 || word.isEmpty || word.trim().length === 0) return true;
    return false;
  }

  /* Method for validate if object
    is not undefined or null
    @param obj
    object to be validated
    */
  isEmptyObject(obj) {
    if (obj === undefined) return true;
    if (obj === null) return true;
    return false;
  }

  /* Method for normalize team name
    @param teamName
    team name remove uppercase and white spaces
    */
  normalizeTeamName(teamName) {
    let team;
    team = teamName.toLowerCase();
    team = team.trim();

    const words = team.split(' ');

    team = '';
    for (let i = 0; i < words.length; i += 1) {
      if (!this.isEmptyString(words[i])) {
        team = team.concat(words[i]).concat(' ');
      }
    }
    team = team.trim();
    return team;
  }
}
module.exports = Validations;
