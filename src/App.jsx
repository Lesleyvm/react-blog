import './App.css'
import logo from './assets/logo-white.png'
import Home from "./pages/home/Home.jsx";
import {Route, Routes} from "react-router-dom";
import Feed from "./pages/feed/Feed.jsx";
// import Overzicht1 from "./pages/overzicht/Overzicht1.jsx";
import Navigation from "./components/navigation/Navigation.jsx";
import Blogposts from "./pages/blogposts/Blogposts.jsx";
import Overzicht from "./pages/overzicht/Overzicht.jsx";

function App() {
    return (
        <div className="page-container">
            <Navigation/>
            <img src={logo} alt="Company logo"/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/feed" element={<Feed/>}/>
                <Route path="/overzicht" element={<Overzicht/>}/>
                <Route path="/blogposts/:id" element={<Blogposts/>}/>
            </Routes>
        </div>
    )
}

export default App
