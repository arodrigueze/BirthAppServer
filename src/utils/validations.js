class Validations {
    constructor() {
    }

    /*Method for validate if string is empty
    @param word
    String to be validated
    */
    isEmptyString(word) {
        if (word.length === 0 || word.isEmpty || word.trim().length === 0) return true;
        else return false;
    };

    /*Method for validate if object 
    is not undefined or null
    @param obj
    object to be validated
    */
    isEmptyObject(obj) {
        if (obj == undefined) return true;
        if (obj == null) return true;
        else return false;
    };

    /*Method for normalize team name 
    @param teamName
    team name remove uppercase and white spaces
    */
    normalizeTeamName(teamName) {
        var team;
        team = teamName.toLowerCase();
        team = team.trim();
        var words = team.split(" ");
        team = "";
        for (var i = 0; i < words.length; i++) {
            if (!this.isEmptyString(words[i])) team += words[i] + " ";
        }
        team = team.trim();
        return team;
    };
}
module.exports = Validations;