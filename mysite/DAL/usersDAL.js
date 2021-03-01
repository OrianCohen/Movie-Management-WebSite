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