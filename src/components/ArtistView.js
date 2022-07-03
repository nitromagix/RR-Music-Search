// These components will be making separate API calls from the app
// component to serve specific data about our artist
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function ArtistView() {
   const { id } = useParams();
   const [artistData, setArtistData] = useState([]);

   const API_URL = `http://localhost:4444/album/${id}`;

   const justAlbums = artistData.filter(
      (entry) => entry.collectionType === "Album"
   );

   useEffect(() => {
      const fetchData = async () => {
         const response = await fetch(API_URL);
         const responseData = await response.json();
         // console.log(responseData);
         setArtistData(responseData.results);
      };
      fetchData();
   }, [id]);

   const renderAlbums = justAlbums.map((album, i) => {
      return (
         <div key={i}>
            <Link to={`/album/${album.collectionId}`}>
               <p>{album.collectionName}</p>
            </Link>
         </div>
      );
   });

   return (
      <div>
         <h2>Passed id: {id}</h2>
         <p>Artist Data Goes Here!</p>
         {renderAlbums}
      </div>
   );
}

export default ArtistView;
