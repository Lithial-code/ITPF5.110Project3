//The Cinema Obj
function Cinema() {
    //the array that holds the movies
    this.movies = [];
    this.possibleRatings = ["G", "PG", "M", "AO", " "];

    //this function takes in a movie and puts it in the array
    this.add = function (movie) {
        this.movies.push(movie);
    }

    //this function takes no parameter and will returns a string
    //that contains names of all the movies in the array
    this.getMovieNames = function () {
        var movieNamesList = "";
        for (var id = 0; id < this.movies.length; id++) {
            movieNamesList += this.movies[id].name + '\n';
        }
        return movieNamesList;
    }

    //this function removes a movie from the movies array. 
    this.remove = function (movieName) {
        for (var id = 0; id < this.movies.length; id++) {
            if (this.movies[id].name == movieName) {
                this.movies.splice(id, 1);
            }
        }
    }

    //this function returns a movie obj by name 
    this.findMovieItem = function (movieName) {
        console.log(`You are looking for ${movieName}`)
        for (var i = 0; i < this.movies.length; i++) {
            console.log(this.movies[i].name);
            if (this.movies[i].name == movieName) {
                return this.movies[i];
            }
        }
    }

    //this function takes in a rating and 
    //returns a list of all the movies with the same rating
    this.findRatedMoviesNames = function (ratingid) {
        var list = [];
        for (var i = 0; i < this.movies.length; i++) {
            console.log(this.movies[i].audienceRating)

            if (this.movies[i].audienceRating ==  this.possibleRatings[ratingid]) {
                list.push(this.movies[i]);
            }
        }
        return list;
    }

    //this function totals the minutes of all the movie objs
    // in the movies array and returns them
    this.getTotalMinutes = function () {
        var minutes = 0;
        for (var id = 0; id < this.movies.length; id++) {
            minutes += this.movies[id].minutes;
        }
        return minutes;
    }
}

function Movie() {

    //array of possible ratings. Used in creating the rating drop down box
    var possibleRatings = ["G", "PG", "M", "AO", " "];
    this.name = "movie name";
    this.minutes = -1;
    this.audienceRating = "unset";

    //setter for minutes. 
    //TODO input needs to be higher than 0. //DONE
    this.setMinutes = function (minutes) {
        // var minutes = NumberQuestion("How long is this movie in minutes? :", possibleRatings.length + 1) - 1;
        if (minutes > 0) {
            this.minutes = minutes;
        }
    };

    //setter for the audience rating
    //will only be set if its currently unset
    //takes in a variable to pull it from the array of possible ratings
    this.setAudienceRating = function (int) {
        // console.log(this.audienceRating);
        if (this.audienceRating == "unset" && int != possibleRatings.length) {
            //console.log("here");
            var rating = possibleRatings[int];
            this.audienceRating = rating;
            console.log(this.audienceRating);
        } else {
            return "This rating has already been set.";
        }
    }

    //takes in a name and a minutes. sets both variables on the movie obj
    //validates minutes by checking if is greater than 0
    this.setNameAndMinutes = function (name, minutes) {
        this.name = name;
        if (minutes > 0) {
            this.minutes = minutes;
        } else {
            this.minutes = NumberQuestion(`Your minutes for ${name} are not valid. Please try again. :`);
        }
    }
    
    //returns an excerpt of the movie
    this.show = function () {
        return `Movie: ${movie.name} Duration: ${movie.minutes} Rating ${movie.audienceRating}`;
    }
}

////////////////////////////////////////////////////////////////////////////////
//Utils Functions
////////////////////////////////////////////////////////////////////////////////

//Function for programmatically making the gui. its basically just dom manipulation with material classes being put in and values being set.
function BuildTable(obj) {
    var table = document.getElementById('table');
    var tbody = document.createElement('tbody');
    var tr = document.createTextNode('');

    for (var i = 0; i < obj.length; i++) {
        if (obj[i] == null) {
            return;
        } else {
            var tr = tbody.insertRow();
            var tdName = tr.insertCell();
            var tdMin = tr.insertCell();
            var tdRating = tr.insertCell();
            var tdButton = tr.insertCell();

            var nameInputDiv = document.createElement('div');
            nameInputDiv.setAttribute('class', 'name-input-div');

            var nameInput = document.createElement('input');
            nameInput.setAttribute('type', 'text');
            nameInput.value = obj[i].name;
            nameInput.setAttribute('name', obj[i].name);
            nameInput.setAttribute("class", 'name-input mdl-textfield__input toggleable');
            nameInput.readOnly = true;

            nameInputDiv.appendChild(nameInput);
            var minInputDiv = document.createElement('div');
            minInputDiv.setAttribute('class', "min-input-div mdl-textfield mdl-js-textfield");

            var minInput = document.createElement('input');
            minInput.value = obj[i].minutes;
            minInput.setAttribute('type', 'text');  
            minInput.setAttribute('name', obj[i].minutes);
            minInput.setAttribute("class", 'min-input toggleable mdl-textfield__input');
            minInput.setAttribute('pattern', '^\\d+$');
            minInput.readOnly = true;
            
            var minSpan = document.createElement('span');
            minSpan.setAttribute('class','mdl-textfield__error');
            minSpan.innerHTML = "Input is not a number!";

           
            minInputDiv.append(minInput);
            minInputDiv.append(minSpan);

            tdName.appendChild(nameInputDiv);
            tdMin.appendChild(minInputDiv);
            ratingDiv = document.createElement('div');
            ratingDiv.setAttribute('class', 'rating-div');
            ratingDiv.appendChild(document.createTextNode(obj[i].audienceRating))
            tdRating.appendChild(ratingDiv);

            var deleteButton = BuildDeleteButton(i);
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

//function that builds the delete buttons. takes in i for what number the button is
function BuildDeleteButton(i) {
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = "Delete"
    deleteButton.setAttribute('class', 'mdl-button mdl-js-button mdl-button--raised delete');
    deleteButton.setAttribute('id', `button-${i}`);
    deleteButton.setAttribute('onclick', `deleteButton(${i})`);
    return deleteButton;
    
}

//function for the x buttons to remove an item from the list.
function deleteButton(buttonId) {
    var rowsMovieName = cinema.movies[buttonId].name;
    cinema.remove(rowsMovieName);
    BuildTable(cinema.movies);
}

//function for adding a new movie to the list. Takes in the variables and then makes a new movie and puts it in the list
function addButton() {
    var name = document.getElementById('title');
    var minutes = document.getElementById('minutes');
    var rating = document.getElementById('dropdown');
    var movie = new Movie(title.value);
    movie.setNameAndMinutes(name.value, parseInt(minutes.value));
    movie.setAudienceRating(rating.value);
    cinema.add(movie);
    BuildTable(cinema.movies);
}

//function for the sort button
function sortButton(){
    var rating = document.getElementById("sort-dropdown").value;
    var list = cinema.findRatedMoviesNames(rating);
   /* console.log(rating);
    console.log(list);*/

    BuildTable(list);
}

//function to change the label next to the gettotalmins button to the total number of minutes.
function totalMins(){
    var rating = document.getElementById("mins-output");
    rating.value = 0;
    rating.value = cinema.getTotalMinutes();
}

//undoes changes to the table not including deletes
function cancelSortButton(){
    BuildTable(cinema.movies);
}

//makes the table editable or not. I think this still works
function toggleEditableButton() {
    var inputs = document.getElementsByClassName('toggleable');
    console.log(inputs.length);

    for (var i = 0; i < inputs.length; i++) {
            console.log(inputs[i]);
            inputs[i].readOnly =  !inputs[i].readOnly;
    }
}

//button to trigger the findMovie
function excerptButton(){
    var title = document.getElementById("excerpt-input").value;
    var list = [];
    var movie = cinema.findMovieItem(title);
    console.log(movie);
    list.push(movie);
    console.log(list);

    BuildTable(list);
}

/**********************Run Code************************/
var cinema = new Cinema();
var movieNames = ["John wick", "John wick 2", "John wick 3"];
var movieMinutes = [103, 105, 135];
for (var i = 0; i < 3; i++) {
    var movie = new Movie();
    movie.setNameAndMinutes(movieNames[i], movieMinutes[i]);
    // console.log(movie);
    movie.setAudienceRating(2)
    // console.log(movie);
     console.log(movie.show());
    cinema.add(movie);
}
BuildTable(cinema.movies);