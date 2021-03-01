const { json } = require('express');
const jfile = require('jsonfile');
const { path } = require('../app');
const axiosDAL = require('axios')


//connect with our json file, write to file the new movie
exports.addNewMovie = function(obj){

return new Promise((results,reject)=> {
    jfile.readFile(__dirname+ '/newMovies.json', function(err,data){
        if(err) //if we dont have any file with this name
        {
            let resultData = {Movies : [obj]}
            jfile.writeFile(__dirname + '/newMovies.json', resultData, function(err){
                    if(err){
                        reject(err)
                    }
                    else{
                        results('Created!')
                    }
            })
        }
        else{
            data.Movies.push(obj)
            jfile.writeFile(__dirname + '/newMovies.json', data, function(err){
                if(err){
                    reject(err)
                }
                else{
                    results('Created!')
                }
        })
        }
    })
})

}

exports.readFileMoies = function(){
    return new Promise((result,reject)=>{
        jfile.readFile(__dirname + '/newMovies.json', function(err,data){
            if(err){
                reject(err)
            }
            else {
                let allMovies = data.Movies
                result(allMovies)
                
            }
        })
    })    
}

// Connected to web service REST API
exports.searchMovieRestApi = function(){
        return axiosDAL.get('https://api.tvmaze.com/shows');
}