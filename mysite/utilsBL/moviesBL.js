const movieDAL = require('../DAL/moviesDAL')

// add new movie --> connected with movieDAL
exports.createMovie = async function(name, language, geners)
{

    //build an object
    let  movieData = {
        Name: name, 
        Language: language, 
        Generes: geners}

        console.log(movieData)

        // Add the new OBJ movieData to newMovies.json file
        let result = await movieDAL.addNewMovie(movieData)
        return result
}

// Get all movies data from json file
exports.searchMovieJsonFile = async function(){
    try{
        let readFile = await movieDAL.readFileMoies()
        return(readFile)
    }
    catch(err){
        return(err)
    }

}

// Get all movies data from REST API (web services)
exports.searchMovieRestApiUtil = async function(){
    let resp1 = await movieDAL.searchMovieRestApi();
    let MoviesData = resp1.data;
    return MoviesData;
}

exports.getSearchMovieByUserRequestAPI = async function(MoviesData, nameMovie,languageSearch,genreSearch){
    let data = await MoviesData.filter(x=> x.name == nameMovie && x.language == languageSearch && x.genres.includes(genreSearch));
    return data;
}

exports.getSearchMoviesBySameGenresAPI = async function(MoviesData, genreSearch){
    let data = await MoviesData.filter((res) =>
    {
        if(res.genres){
            if(res.genres.includes(genreSearch)){
                return res
            }
        }
    });   
    return data;
}

exports.getMovieByID = async function(data,id){
    let movieData = await data.filter(x=> x.id == id)
    return movieData;
}


// exports.getLastId = async function(){
//     try{
//         let data = await movieDAL.readFileMoies()
//         console.log(data)
//         let current = filtered = data.filter((_, index) =>{
//             index >= data.length 
//         })
//         return current
//     }
//     catch(err){
//         return 1;
//     }
// }
