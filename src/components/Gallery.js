<<<<<<< HEAD
// Gallery.js
import { useContext } from 'react'
import { DataContext } from '../context/DataContext'
=======
>>>>>>> 676501d9bdc3e8cc8cf572fa6811b4f1ca1f8b1b
import GalleryItem from './GalleryItem'

function Gallery(){
    const data = useContext(DataContext)
    
    const display = data.map((item,index) => {
        return (
            <GalleryItem item={item} key={index} />
        )
    })
    return (
        <div>
            {display}
        </div>
    )
}

export default Gallery