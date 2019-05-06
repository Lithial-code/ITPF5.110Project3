var {question} = require('readline-sync');
function Cinema() {
    var movies = [];

    function add(movie) {
        movies.push(movie);
    }

    function getMovieNames() {
        for (id in movies) {
            console.log(movies[id].name);
        }
    }

    function remove(movieName) {
        for (id in movies) {
            if (movies[id].name == movieName){
                movies.splice(id);
            }
        }
    }
    function findMovieItem(movieName){
        for (id in movies) {
            if (movies[id].name == movieName){
                return movies[id];
            }
            else{
                return "This movie does not exist."
            }
        }
    }
    function findRatedMoviesNames(rating){
        var list = [];
        for (id in movies) {
            if (movies[id].rating == rating){
                list.push(movies[id]);
            }
        }
        return list;
    }
    function getTotalMinutes(){
        var minutes = 0;
        for (id in movies) {
         minutes =+ movies[id].minutes;
        }
        return minutes;
    }
}

function Movie(name, minutes, rating = null) {
    this.name = name;
    this.minutes = minutes;
    this.rating = rating;
    function setMinutes(){

    }
}