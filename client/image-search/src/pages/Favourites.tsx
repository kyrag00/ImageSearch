// export const Favourites = ({}) => {
//     return <>
//     <h2>Favourite pictures</h2>
    {/* <ul>
        {savedImages.map((savedImage, index) => (
            <li key={index}>
                <img src={savedImage.link} alt="img" />
            </li>
        ))}

    </ul> */}
//     </>
// }
import {IPicture} from "./Main"

interface ISavedImages {
    savedImages: IPicture[];
}

export const Favourites = ({savedImages}: ISavedImages) => {
       

    return <>
    <h2>Favourite pictures</h2>
    {savedImages.map((image, index) => (
       <div key={index}>
       <img src={image.link} alt={`Liked image ${index + 1}`} />
   </div> 
    ))}
    </>
}