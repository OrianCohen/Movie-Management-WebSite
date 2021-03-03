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


module.exports = router;
