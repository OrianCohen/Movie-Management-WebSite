var express = require('express');
var router = express.Router();
const movieBL = require('../utilsBL/moviesBL')


router.get('/', function(req, res, next) {
    let sess = req.session;
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

// get data for new movie --> connect with moviesBL
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
    try{
        let resultJson = await movieBL.searchMovieJsonFile()
        if(resultJson){
            let finalData = resultJson.filter(x=> x.Name == nameSearchMovie && x.Language ==languageSearch && x.Generes ==genreSearch)
            let finalDataGenr = resultJson.filter(x=> x.Generes ==genreSearch)
        }

    }
    catch(err){
        let finalData = []
        let finalDataGenr = []
        console.log(err)
    }


    //Get a listof all movies from REST API
    let resultAPI = movieBL.searchMovieRestApiUtil(nameSearchMovie,languageSearch,genreSearch)
    // let finalData2 = await resultAPI.filter(x=> x.name == nameSearchMovie && x.language ==languageSearch && x.genres ==genreSearch)

    // console.log(resultJson)
    // console.log(finalData)
    res.render('searchResults', { });
  });


  module.exports = router;
