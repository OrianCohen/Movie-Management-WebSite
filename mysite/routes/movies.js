var express = require('express');
var router = express.Router();
const movieBL = require('../utilsBL/moviesBL')


router.get('/', function(req, res, next) {
    let sess = req.session;
    //If the user pass login page and autorize to acces our website
    if(sess.auth){
        if(sess.admin ? res.render('menu', {data : 'isAdmin'}) : res.render('menu', {data : 'isNotAdmin'}));
    }
    else{
        res.redirect('/login');
    }
  });

router.get('/createmovie', function(req, res, next) {
res.render('createmovie', { });
});

// Get data for new movie --> connect with moviesBL
router.post('/addMovie', async function(req, res, next) {
    let name = req.body.moviename;
    let language = req.body.movielanguage;
    let geners = req.body.genres;
    let sess = req.session;

    let result = await movieBL.createMovie(name, language, geners);
    if(result == 'Created!'){
        if(sess.admin){
            res.render('menu', {data : 'isAdmin'})
        }
        else{
            res.render('menu', {data : 'isNotAdmin'})
        }
        
    }
    else {
        res.render('createmovie', { });
    }
});

router.get('/searchmovie', function(req, res, next) {
    res.render('searchmovie', { });
  });

//Get data from user for search a movie
router.post('/getMovie', async function(req, res, next) {
    let nameSearchMovie = req.body.searchName
    let genreSearch = req.body.searchGenre
    let languageSearch = req.body.searchLang

    //Get a list of all movies data from json file
    let resultJson = await movieBL.searchMovieJsonFile()
    let getMovieByUserRequest = await resultJson.filter(x=> x.Name == nameSearchMovie && x.Language ==languageSearch && x.Generes ==genreSearch) //same as user search
    let getAllMoviesGenres = await resultJson.filter(x=> x.Generes ==genreSearch)//all the movies with the same genres   

    //Get a list of all movies from REST API
    let resultAPI = await movieBL.searchMovieRestApiUtil()
    //Get a list of movies only for the user request
    let getSearchUserAPI = await movieBL.getSearchMovieByUserRequestAPI(resultAPI, nameSearchMovie,languageSearch,genreSearch)
    //Get a list of all movies with the same genres
    let getSearchGenresAPI = await movieBL.getSearchMoviesBySameGenresAPI(resultAPI,genreSearch)

    if(!getSearchUserAPI){
        let getSearchUserAPI = []
    }
    if(!getSearchGenresAPI){
        let getSearchGenresAPI = []
    }
    if(!getMovieByUserRequest){
        let getMovieByUserRequest = []
    }
    if(!getAllMoviesGenres){
        let getAllMoviesGenres =[]
    }

    res.render('searchResults', {"dataJson": getMovieByUserRequest, "dataJsonGenres": getAllMoviesGenres , "dataAPI": getSearchUserAPI, "DataAPIGenres": getSearchGenresAPI});
});

router.get('/movieDataPageById/:id', async function(req, res, next){
    let id = req.params.id
    console.log(id)
    let resultAPI = await movieBL.searchMovieRestApiUtil()
    let requireData = await movieBL.getMovieByID(resultAPI,id)
    console.log(requireData)
    res.render('movieDataPage', {datax : requireData})
});


module.exports = router;
