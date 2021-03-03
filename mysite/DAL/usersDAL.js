const { json } = require('express');
const jfile = require('jsonfile');

exports.getAllUsers = function(){
    return new Promise((result,reject)=>
    {
        jfile.readFile(__dirname +'/users.json',function(err,data){
            if(err){
                reject(err)
            }
            else{
                let allUsers = data.users
                result(allUsers)
            }
        })
    });
}


exports.createNewUser = function(obj){
    return new Promise((result,reject) => {
        jfile.readFile(__dirname + '/users.json', function(err,data){
            if(data){ // we will add the user to our json file
                data.users.push(obj)
                jfile.writeFile(__dirname + '/users.json', data, function(err2){
                    if((err2) ? reject(err2) : result('Added!'));
                })
            }
            else{
                reject(err)
            }
        })
    })
}


exports.deleteUserJSON = async function(obj){
    return new Promise((result,reject) => {
        jfile.writeFile(__dirname + '/users.json', obj, function(err){
            if(err){
                reject(err)
            }
            else{
                result('deleted!')
            }
        })
    })
}

exports.updateUserJSON = async function(obj,allExceptOne){
    return new Promise((result,reject) => {
        allExceptOne.users.push(obj)
        jfile.writeFile(__dirname + '/users.json', allExceptOne, function(err){
            if(err){
                reject(err)
            }
            else{
                result('updated!')
            }
        })
    })
}
