const {Router} = require('express');
const axios = require('axios');
const router = Router();
const {Genres, Videogame, Platforms}=require('../db');
const API_KEY='ca270b38f3904e17bf2cc64bc7f8da4b'
 
const getApi = async(req) =>{
 
  let infoApi1 = await axios.get(`http://api.rawg.io/api/games?key=${API_KEY}&page_size=40`);
  let infoApi2 = await axios.get(`http://api.rawg.io/api/games?key=${API_KEY}&page=4&page_size=40`);
  let infoApi3 = await axios.get(`http://api.rawg.io/api/games?key=${API_KEY}&page=9&page_size=20`);
  let games=[];
 
 
  infoApi1.data.results.map(element=>{
      games.push({
          id: element.id,
          name: element.name,
          description:element.description,
          released: element.released,
          image: element.background_image,
          rating: element.rating,
          genres: element.genres.map(e => {
            return {
                name: e.name,
                
            }
        }),
        platforms: element.parent_platforms.map(e => {
            return {
                name: e.platform.name
            }
        }),
      })
  })
 
  infoApi2.data.results.map(element=>{
      games.push({
          id: element.id,
          name: element.name,
          description:element.description,
          released: element.released,
          image: element.background_image,
          rating: element.rating,
          genres: element.genres.map(e => {
            return {
                name: e.name,
              
            }
        }),
        platforms: element.parent_platforms.map(e => {
            return {
                name: e.platform.name
            }
        }),
      })
  })
 
 infoApi3.data.results.map(element=>{
      games.push({
          id: element.id,
          name: element.name,
          description:element.description,
          released: element.released,
          image: element.background_image,
          rating: element.rating,
          genres: element.genres.map(e => {
            return {
                name: e.name,
                
            }
        }),
        platforms: element.parent_platforms.map(e => {
            return {
                name: e.platform.name
            }
        }),
      })
  })

  return games;
};
 
 

 
const getDb = async function () {  
  const dataBd = await Videogame.findAll({
      include: [
          {
              model: Genres,
              attributes: ["name"],
              through: {
                  attributes: []
              }
          },
          {
              model: Platforms,
              attributes: ["name"],
              through: {
                  attributes: []
              }
          }
      ]
  })
  return dataBd
}

 
 
 
const getVideoGames = async() =>{
  let gamesApi = await getApi(); 
  let gamesDb = await getDb(); 
  let allGames = gamesApi.concat(gamesDb) 
  return allGames;
};
 
 
router.get('/videogames',async(req,res)=>{
  const {name}=req.query
 const videoGamesTotal=await getVideoGames();
 try {
  if(name){
    let videogameName= await videoGamesTotal.filter(e => e.name.toLowerCase().replace(/ /g, "").includes(name.toLowerCase().replace(/ /g, "")));
    videogameName.length ?
    res.status(200).send(videogameName):
    res.status(404).send('Videogame NOT FOUND')
  }else{
    res.status(200).send(videoGamesTotal)
  }
 } catch (error) {
   console.log(error)
 }
});
 
router.get('/genres',async(req,res)=>{
  const genresApi=await axios.get(`http://api.rawg.io/api/genres?key=${API_KEY}`);
  const genresTotal= genresApi.data.results.map(el=>el.name);
   genresTotal.forEach(el=>
    Genres.findOrCreate({
      where:{
        name:el
      }
    }))
    const allGender=await Genres.findAll();
    res.send(allGender)
});
 
router.get('/platforms/lists/parents', async (req, res) => {  
  var apiresult = await axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY}`)
  var apivgplat = apiresult.data.results.map(p => p.name)
  apivgplat.forEach(el=>{
    Platforms.findOrCreate({
      where:{
        name:el
      }
    })
  })
  const allPlatforms=await Platforms.findAll();
  res.send(allPlatforms)
})  
 
 
 
router.post('/videogame',async(req,res)=>{
  const{name, description, released, rating, image,genres,platforms, createdDb} = req.body;
 
  if (name && description && genres && platforms){
  let videogameCreate=await Videogame.create({
    name,
    description,
    released,
    rating,
    image,
    createdDb
  })
 
  let genreDb=await Genres.findAll({
    where:{name:genres}
  })
 
  let platDb=await Platforms.findAll({
    where:{name:platforms}
  })
 
  await videogameCreate.addPlatforms(platDb);
  await videogameCreate.addGenres(genreDb);
  res.status(200).send('Videogame created!')
}else{
  return res.status(404).send("Complete form correctly")
}
})
 
router.get('/videogame/:id',async(req,res)=>{
  const id=req.params.id;
  const allVideogames=await getVideoGames()
 
  if(id){
    let videogameId= await allVideogames.filter(el => el.id == id);
    videogameId.length?
    res.status(200).send(videogameId):
    res.status(404).send('Error: game not found')  }
})
 
 
module.exports=router
