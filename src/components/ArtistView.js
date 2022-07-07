// These components will be making separate API calls from the app
// component to serve specific data about our artist
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NavButtons from "./NavButtons";

function ArtistView() {
   const { id } = useParams();
   const [artistData, setArtistData] = useState([]);

   const API_URL = `http://localhost:4444/album/${id}`;

   const justAlbums = artistData.filter(
      (entry) => entry.collectionType === "Album"
   );

   const renderAlbums = justAlbums.map((album, i) => {
      return (
         <div key={i}>
            <Link to={`/album/${album.collectionId}`}>
               <p>{album.collectionName}</p>
            </Link>
         </div>
      );
   });

   useEffect(() => {
      const fetchData = async () => {
         const response = await fetch(API_URL);
         const responseData = await response.json();
         setArtistData(responseData.results);
      };
      fetchData();
   }, [id]);

   return (
      <div>
         <h2>Passed id: {id}</h2>
         <h2>{artistData.length > 0 ? artistData[0].artistName : 'Loading...'}</h2>
         <NavButtons />
         {renderAlbums}
      </div>
   );
}

export default ArtistView;
