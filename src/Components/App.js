import Header from "./Header";
import SimpleBottomNavigation from "./Nav.js";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Trending from "./Trending.js";
import Movies from "./Movies.js";
import TvSeries from "./TvSeries.js";
import Search from "./Search.js";
import Container from '@mui/material/Container';

function App() {
  return (
    <Router>
    <div>
    <Header />
      <div className="App">
            <Container>
              <Routes>
                <Route  path = "/" element={<Trending />} />
                <Route  path = "/Movies" element={<Movies />} />
                <Route path = "/Series" element={<TvSeries />} />
                <Route path = "/Search" element={<Search />} />
              </Routes>
            </Container>
      </div>
      <SimpleBottomNavigation />
    </div>
    </Router>
  );
}

export default App;
