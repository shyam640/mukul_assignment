import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Home} from "./pages/home";
import {Auth} from "./pages/auth";
import {CreateBlog} from "./pages/create-blog";
import {SavedBlog} from "./pages/saved-blog";
import {Navbar} from "./components/Navbar";

function App() {
  return (
  <div className="App">
  <Router>
    <Navbar/>
    <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/auth" element={<Auth/>}/>
       <Route path="/create-blog" element={<CreateBlog/>}/>
       <Route path="/saved-blog" element={<SavedBlog/>}/>
    </Routes>
  </Router>
  </div>
  );
}

export default App;
