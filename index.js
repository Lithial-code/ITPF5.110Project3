/* var {
    question
} = require('readline-sync'); */

function Cinema() {
    this.movies = [];

    this.add = function (movie) {
        this.movies.push(movie);
    }
    this.findMovieById = function (id) {
        return this.movies[id];
    }
    this.getMovieNames = function () {
        for (id in movies) {
            console.log(movies[id].name);
        }
    }

    this.remove = function (movieName) {
        for (id in this.movies) {
            if (this.movies[id].name == movieName) {
                this.movies.splice(id, 1);
            }
        }
    }
    this.findMovieItem = function (movieName) {
        for (id in movies) {
            if (movies[id].name == movieName) {
                return movies[id];
            } else {
                return "This movie does not exist."
            }
        }
    }
    this.findRatedMoviesNames = function (rating) {
        var list = [];
        for (id in movies) {
            if (movies[id].rating == rating) {
                list.push(movies[id]);
            }
        }
        return list;
    }
    this.getTotalMinutes = function () {
        var minutes = 0;
        for (id in movies) {
            minutes = +movies[id].minutes;
        }
        return minutes;
    }
}

function Movie(name) {
    this.name = name;

    var possibleRatings = ["G", "PG", "M", "R13", "R15", "R16", "R18", "RP13", "RP16"];

    this.setMinutes = function (minutes) {
        // var minutes = NumberQuestion("How long is this movie in minutes? :", possibleRatings.length + 1) - 1;
        this.minutes = minutes;
    };
    this.setAudienceRating = function (int) {
        if (this.rating == null) {
            var rating = possibleRatings[int];
            this.rating = rating;
        } else {
            return "This rating has already been set.";
        }
    }
    this.setNameAndMinutes = function (name, minutes) {
        this.name = name;
        if (minutes < 0) {
            this.minutes = minutes;
        } else {
            this.minutes = NumberQuestion(`Your minutes for ${name} are not valid. Please try again. :`);
        }
    }
    this.show = function () {
        return `Movie: ${movie.name} \n Duration: ${movie.minutes} \n Rating ${movie.rating}`;
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
            if (topLimit != null) {
                if (newQuestion <= topLimit) {
                    return newQuestion;
                } else {
                    console.log("The number you have chosen is too high. PLease try again.")
                }
            } else {
                return newQuestion;
            }
        } else {
            console.log("Answer is not a number. Please try again.")
        }
    }
}

function ValidateNumber(number) {
    if (number >= 0) {
        return number;
    }
}

function BuildTable(obj) {
    console.log(obj);
    var table = document.getElementById('table');
    var tbody = document.createElement('tbody');
    var tr = document.createTextNode('');

    for (var i = 0; i < obj.length; i++) {
        if (obj[i] == null) {
            return;
        } else {
            console.log(`obj name: ${obj[i].name}`);
            var tr = tbody.insertRow();
            var tdName = tr.insertCell();
            tdName.appendChild(document.createTextNode(obj[i].name));
            var tdMin = tr.insertCell();
            tdMin.appendChild(document.createTextNode(obj[i].minutes));
            var tdRating = tr.insertCell();
            tdRating.appendChild(document.createTextNode(obj[i].rating));
            var tdButton = tr.insertCell();
            var deleteButton = document.createElement('button');
            deleteButton.innerHTML = "Delete"
            deleteButton.setAttribute('class', 'mdl-button mdl-js-button mdl-button--raised delete');
            deleteButton.setAttribute('id', `button-${i}`);
            deleteButton.setAttribute('onclick', `deleteButton(${i})`);
            tdButton.appendChild(deleteButton);

            tr.appendChild(tdName);
            tr.appendChild(tdMin);
            tr.appendChild(tdRating);
            tr.appendChild(tdButton);
        }
    }
    tbody.appendChild(tr);
    if (table.children.length == 1) {
        table.appendChild(tbody);
    } else if (table.children.length == 2) {
        table.replaceChild(tbody, table.children[1]);
    }
}
var cinema = new Cinema();
var movieNames = ["John wick", "John wick 2", "John wick 3"];
var movieMinutes = [103, 105, 135];
for (var i = 0; i < 3; i++) {
    var movie = new Movie(movieNames[i]);
    movie.setMinutes(movieMinutes[i]);
    movie.setAudienceRating(i)
    cinema.add(movie);
}
BuildTable(cinema.movies);

function buttonFunction() {
    var title = document.getElementById('title');
    var minutes = document.getElementById('minutes');
    var movie = new Movie(title.value);
    movie.setMinutes(minutes.value);
    cinema.add(movie);
    BuildTable(cinema.movies);
}

function deleteButton(buttonId) {
    var rowsMovieName = cinema.movies[buttonId].name;
    cinema.remove(rowsMovieName);
    BuildTable(cinema.movies);
}
