import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import AlbumView from "./components/AlbumView";
import ArtistView from "./components/ArtistView";
import Gallery from "./components/Gallery";
import SearchBar from "./components/SearchBar";
import { DataContext } from "./context/DataContext";

function App() {
   let [search, setSearch] = useState("");
   let [message, setMessage] = useState("Search for Music!");
   let [data, setData] = useState([]);

   const API_URL = "http://localhost:4444/search/";

   useEffect(() => {
      if (search) {
         const fetchData = async () => {
            document.title = `${search} Music`;
            const response = await fetch(API_URL + search);
            const resData = await response.json();
            if (resData.results.length > 0) {
               setData(resData.results);
            } else {
               setMessage("Not Found");
            }
         };
         fetchData();
      }
   }, [search]);

   const handleSearch = (e, term) => {
      e.preventDefault();
      setSearch(term);
   };

   return (
      <div>
         <Router>
            <Routes>
               <Route
                  path="/"
                  element={
                     <Fragment>
                        <SearchBar handleSearch={handleSearch} />
                        <DataContext.Provider value={data}>
                           <Gallery />
                        </DataContext.Provider>
                     </Fragment>
                  }
               />
               <Route path="/album/:id" element={<AlbumView />} />
               <Route path="/artist/:id" element={<ArtistView />} />
            </Routes>
         </Router>

         {message}
      </div>
   );
}

export default App;
