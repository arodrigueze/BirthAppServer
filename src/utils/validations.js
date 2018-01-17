/*Validation constructor */
function Validations() {
}

/*Validate if empty string*/
Validations.prototype.isEmptyString = function (word){
    if(word == undefined) return true;
    if(word == null) return true;
    if(word.length === 0 || word.isEmpty || word.trim().length === 0) return true;
    else return false;
};

/*Validate if empty string*/
Validations.prototype.isEmptyObject = function (word){
    if(word == undefined) return true;
    if(word == null) return true;
    else return false;
};

/*Method for validate a team creation */
Validations.prototype.normalizeTeamName = function (teamName) {

    console.log("team name on validation "+teamName);
    var team;
    team = teamName.toLowerCase();
    team = team.trim();
    
    var words = team.split(" ");
    team = "";
    for (i = 0; i < words.length; i++) { 
        if(!this.isEmptyString(words[i])) team += words[i]+" ";
    }
    team = team.trim();
    return team;
};

module.exports = Validations;