var {question} = require('readline-sync');

function Cinema() {
    var movies = [];

    this.add = function(movie) {
        movies.push(movie);
    }

    this.getMovieNames = function() {
        for (id in movies) {
            console.log(movies[id].name);
        }
    }

    this.remove = function(movieName) {
        for (id in movies) {
            if (movies[id].name == movieName){
                movies.splice(id);
            }
        }
    }
    this.findMovieItem = function(movieName){
        for (id in movies) {
            if (movies[id].name == movieName){
                return movies[id];
            }
            else{
                return "This movie does not exist."
            }
        }
    }
    this.findRatedMoviesNames = function(rating){
        var list = [];
        for (id in movies) {
            if (movies[id].rating == rating){
                list.push(movies[id]);
            }
        }
        return list;
    }
    this. getTotalMinutes = function(){
        var minutes = 0;
        for (id in movies) {
         minutes =+ movies[id].minutes;
        }
        return minutes;
    }
}

function Movie(name){
    this.name = name;

    var possibleRatings = ["G", "PG", "M","R13", "R15", "R16", "R18","RP13","RP16"];

    this.setMinutes = function(){
        console.table(possibleRatings);
        var minutes = NumberQuestion("How long is this movie in minutes? :", possibleRatings.length+1) -1;
        this.minutes = minutes;
    };
    this.setAudienceRating = function(){
        if(this.rating == null){
            var rating = possibleRatings[NumberQuestion("What rating does this movie have? :")];
            this.rating = rating;
        }
      else{
          console.log("This rating has already been set.")
      }
    }
    this.setNameAndMinutes = function(name, minutes){
        this.name = name;
        if(minutes < 0){
            this.minutes = minutes;
        }
        else{
            this.minutes = NumberQuestion(`Your minutes for ${name} are not valid. Please try again. :`);
        }
    }
    this.show = function(){
        console.log(`Movie: ${movie.name} \n Duration: ${movie.minutes} \n Rating ${movie.rating}`);
    }

}

////////////////////////////////////////////////////////////////////////////////
//Utils Functions
////////////////////////////////////////////////////////////////////////////////
function NumberQuestion(questionString, topLimit) {
    var questionBool = true; //for the while loop
    while (questionBool) {
        //ask the user a question
        var myQuestion = question(questionString);
        var newQuestion = 0;
        for (var i = 0; i < myQuestion.length; i++) {
            //better validation. dig through the string and pull out all the numbers. concat them and then parse them
            if (!isNaN(myQuestion[i])) {
                newQuestion += myQuestion[i];
            }
        }
        //parse the new hopefully char-less string
        newQuestion = parseInt(newQuestion);
        //if its a number return it. else deny the user and make them try again
        if (!isNaN(newQuestion) && newQuestion >= 0) {
            if(topLimit != null){
                if(newQuestion <= topLimit){
                    return newQuestion;
                }
                else{
                    console.log("The number you have chosen is too high. PLease try again.")
                }
            }
            else{
                return newQuestion;
            }
        } else {
            console.log("Answer is not a number. Please try again.")
        }
    }
}