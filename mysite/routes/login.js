var express = require('express');
var router = express.Router();
const validUser = require('../utilsBL/usersBL')
const movieBL = require('../utilsBL/moviesBL')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', { });
});

//get log in data and check validation --> connect with usersBL
router.post('/getdata', async function(req,res,next){
    let user = req.body.username;
    let pwd = req.body.pwd;
    console.log(user)
    let valid = await validUser.validateUser(user,pwd)
    console.log(valid)
    console.log(valid[0]['isAdmin'])

    // let testUsers = await allUserDB.getAllUsersDB();
    // console.log('users from db')
    // console.log(testUsers)

    let sess = req.session;
  
    
    if(valid.length >0)
    {
        if(!sess.counter ? sess.counter=1 : sess.counter+=1);
        // if we dont have the user admin in our session we will save it if the user is admin
        if(!sess.admin){
            if(valid[0]['isAdmin']){
                sess.admin = true;
            }
        }
        if(!sess.auth){
            sess.auth=true;
        }
        if(sess.admin ? res.render('menu', {data : 'isAdmin'}) : res.render('menu', {data : 'isNotAdmin'}));
    }
    else{
        res.redirect('/login');
    }
    
});


// router.get('/createmovie', function(req, res, next) {
//     res.render('createmovie', { });
//   });

// // get data for new movie --> connect with moviesBL
// router.post('/addMovie', async function(req, res, next) {
//     let name = req.body.moviename;
//     let language = req.body.movielanguage;
//     let geners = req.body.genres;
//     let sess = req.session;

//     let result = await movieBL.createMovie(name, language, geners);
//     if(result == 'Created!'){
//         if(sess.admin){
//             res.render('menu', {data : 'isAdmin'})
//         }
//         else{
//             res.render('menu', {data : 'isNotAdmin'})
//         }
        
//     }
//     else {
//         res.render('createmovie', { });
//     }
// });



// router.get('/searchmovie', function(req, res, next) {
//     res.render('searchmovie', { });
//   });

//   //get data for search a movie
//   router.post('/getMovie', async function(req, res, next) {
//       let nameSearchMovie = req.body.searchName
//       let genreSearch = req.body.searchGenre
//       let languageSearch = req.body.searchLang
//     let result = await movieBL.searchMovie(nameSearchMovie,genreSearch,languageSearch)
//     console.log(result)
//     res.render('searchResults', { data: 'result'});
//   });


router.get('/userManagement', function(req, res, next) {
    res.render('userManagement', { });
  });
  

module.exports = router;
