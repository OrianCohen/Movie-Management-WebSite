const { json } = require('express');
const jfile = require('jsonfile');
const { path } = require('../app');


//connect with our json file, write to file the new movie
exports.addNewMovie = function(obj){
    return new Promise((result,reject)=>{
        jfile.writeFile(__dirname + '/newMovies.json',obj,function(err){
            if(err){
                reject(err)
            }
            else{
                result('Created!')
            }
        })
    })
}

exports.readFileMoies = function(){
    return new Promise((result,reject)=>{
        jfile.readFile(__dirname+ '/newMovies.json', function(err,data){
            if(err){
                reject(err)
            }
            else {
                // let allMovies = data.Movies
                result(data)
                
            }
        })
    })    
}