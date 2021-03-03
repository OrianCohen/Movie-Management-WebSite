var express = require('express');
var router = express.Router();
const usersData = require('../utilsBL/usersBL')


router.get('/', async function(req, res, next) {
    let sess = req.session;
    //If the user pass login page and autorize to acces our website
    if(sess.auth){
        if(sess.admin){
            let allUsersData = await usersData.getAllUsersData();
            res.render('userManagement', {users : allUsersData})
        } 
        else {
            res.render('menu', {data : 'isNotAdmin'})
        }
    }
    else{
        res.redirect('/login');
    }
  });

  router.get('/addNewUser', async function(req, res, next) {
    res.render('userDataPage', {data : 'AddUser'});
    
  });

  //Add new user to our json file
  router.post('/addNewUserData', async function(req, res, next) {
    let username = req.body.username
    let pass = req.body.pwd
    let results = await usersData.addNewUserJson(username, pass)
    if(results == 'Added!'){
      res.redirect('/users')
    }
    else{
      res.render('menu', {data : 'isAdmin'})
    }
  });


  // Delete user from our data
  router.get('/deleteUser/:id', async function(req, res, next) {
    let userId = req.params.id
    let results = await usersData.deleteUser(userId)
    if(results == 'deleted!'){
      res.redirect('/users')
    }
    else{
      res.render('menu', {data : 'isAdmin'})
    }
  });

  router.get('/updateUserById/:id/', async function(req, res, next) {
    let userId = req.params.id
    let results = await usersData.getUserById(userId)
    res.render('userDataPage', {data : 'updateUsr', user : results});
  });

  // Update existing user
  router.post('/updateUserData/:id', async function(req, res, next){
    let idd = req.params.id
    let name = req.body.username
    let pwd = req.body.pwd
    let txid = req.body.txid
    let results = await usersData.updateUsers(idd,name,pwd,txid)
    if(results == 'updated!'){
      res.redirect('/users')
    }
    else{
      res.render('menu', {data : 'isAdmin'})
    }

  })

  module.exports = router;
