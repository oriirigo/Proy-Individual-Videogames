import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
const navigate=useNavigate()
    return (
        <nav  >
            <div >
                <img onClick={()=> navigate('/home')}  alt='VideoGames ENTRAR' />
                <SearchBar ></SearchBar>
            </div>
            <div >
                <NavLink  to='/create'>Create your own</NavLink>
                
            </div>
        </nav>
    )
}