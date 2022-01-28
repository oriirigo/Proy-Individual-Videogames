import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import AddVideoGame from './components/AddVideoGame/AddVideoGame';
import VideoGameDetail from './components/VideoGameDetail/VideoGameDetail';




function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route  exact path="/home" element={<HomePage/>}/> 
        <Route  exact path="/videogame" element={<AddVideoGame/>}/> 
        <Route exact path="/detail/:id" element={<VideoGameDetail/>}/>
        </Routes>
    </div>
  
    </BrowserRouter>
  )
}

export default App;
