import { useSavedImages } from "./Main";
import "../styles/home(Main).css"

export const Favourites = () => {

    const savedImages = useSavedImages();
    
    return <>
    <h2>Saved Images</h2>
    <section className="pictures">
    {savedImages.map((image, index) => (
       <div key={index}>
       <img src={image.link} alt={`Liked image ${index + 1}`} />
   </div> 
    ))}
    </section>
    </>
}