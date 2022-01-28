import axios from "axios";


export function getVideoGames() {
  return async function (dispatch) {
    const result = await axios.get('http://localhost:3001/videogames');
    return dispatch({
      type: 'GET_VIDEOGAMES',
      payload: result.data
    })
  }
};

export function getNameVideoGames(name) {
  return async function (dispatch) {
    const result = await axios.get('http://localhost:3001/videogames?name=' + name);
    return dispatch({
      type: 'GET_NAME_VIDEOGAMES',
      payload: result.data
    })
  }
};


export function getPlatforms() {
  return async function (dispatch) {
    try {
      const plat= await axios.get('http://localhost:3001/platforms/lists/parents')
      return dispatch({
        type: "GET_PLATFORMS",
        payload: plat.data
      })
    } catch (error) {
      console.log(error)
    }
  }
};

export function getGenres() {
  return async function (dispatch) {
    try {
      const genres = await axios.get('http://localhost:3001/genres')
      return dispatch({
        type: "GET_GENRES",
        payload: genres.data
      })
    } catch (error) {
      console.log(error)
    }
  }
};

export function getDetail(id){
return async function(dispatch){
  try {
    const detail= await axios.get('http://localhost:3001/videogame/' +id)
    return dispatch({
      type:"GET_DETAIL",
      payload:detail.data
    })
  } catch (error) {
    console.log(error)
  }
}
}

export function postVideogame(payload){
  return async function(dispatch){
      const post=  await  axios.post('http://localhost:3001/videogame',payload)
    return post
  }
}

export const filterByGenre = function (payload) {
  return function (dispatch) {
    dispatch({
      type: "FILTER_BY_GENRE",
      payload
    });
  };
};


export const filterBySource = function (payload) {
  return function (dispatch) {
    dispatch({
      type: "FILTER_BY_SOURCE",
      payload
    });
  };
};

export const orderBy = function (params) {
  return function (dispatch) {
    dispatch({
      type: "ORDER_BY",
      payload: params
    })
  }

}







