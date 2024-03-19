import { useState } from "react";
import { useSavedImages } from "./Main";
import axios from "axios";
// import {IPicture} from "./Main"

// interface ISavedImages {
//     savedImages: IPicture[];
// }

// const savedImages: IPicture[] = []

export const Favourites = () => {

    const savedImages = useSavedImages();
    
    return <>
    <h2>Saved Images</h2>
    {savedImages.map((image, index) => (
       <div key={index}>
       <img src={image.link} alt={`Liked image ${index + 1}`} />
   </div> 
    ))}
    </>
}