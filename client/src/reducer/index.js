
const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    platforms:[],
    details:{}
}



export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_VIDEOGAMES':
      return {
                ...state,
                videogames: action.payload,
                 allVideogames: action.payload,
            }
        case 'GET_NAME_VIDEOGAMES':
            return {
                ...state,
                videogames:action.payload
                
            }
        case "GET_GENRES":
            return {
                ...state,
                genres: action.payload
            }
        case "GET_PLATFORMS":
            return{
                ...state,
                platforms:action.payload
            }
        case 'POST_GAME':
            return{
                ...state
            }
        case "GET_DETAIL":
            return{
                ...state,
                details:action.payload
            }
        case "DELETE":
            return{
                ...state,
                details:{}
            }
        case 'FILTER_BY_GENRE':

            const genreFilter = action.payload === "Todos" ? state.allVideogames :
                state.allVideogames.filter(e => {
                    for (let i = 0; i < e.genres?.length; i++) {
                        if (e.genres[i].name === action.payload) {
                            return true
                        }
                    }
                    return undefined
                })
            return {
                ...state,
                videogames: genreFilter
            }
        case 'FILTER_BY_SOURCE':
            const todosGames = state.allVideogames;
            const sourceFilter = action.payload === 'created' ? todosGames.filter(e => e.createdDb) : todosGames.filter(e => !e.createdDb);
            return {
                ...state,
                videogames: action.payload === 'All' ? state.allVideogames : sourceFilter
            }

        case "ORDER_BY":
            return {
                ...state,
                videogames: [...state.allVideogames].sort(action.payload),
            }
        default:
            return state;
    }

}


