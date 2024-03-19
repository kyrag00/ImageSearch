import { useAuth0 } from "@auth0/auth0-react";
import { ChangeEvent, useState, createContext, useContext } from "react";
import "../styles/home(Main).css"
import { Favourites } from "./Favourites";
import axios from "axios";

//url/link is needed
export interface IPicture { 
    link: string;
    // title: string;
    // [key: string] : any
}

const SavedImagesContext = createContext<IPicture[]>([]);
export const useSavedImages = () => useContext(SavedImagesContext);

export const Main = () => {
  const { isAuthenticated } = useAuth0();
  const [searchLink, setSearchLink] = useState("");
  const [images, setImages] = useState<IPicture[]>([]);
  const [searchTime, setSearchTime] = useState<string | null>(null)

  const [savedImages, setSavedImages] = useState<IPicture[]>([]);

//   const fetchSavedImages = async() => {
//     try {
//         const response = await axios.get("http//localhost:3000/favs")
//         setSavedImages(response.data)
//     } catch (error) {
//         console.log("error fetching the saved images", error)
//     }
//   }

//   useEffect(() => {
//     fetchSavedImages()
//   }, [])

const {user} = useAuth0();

  const handleSaveClick = async (imageLink: string) => {
    try {
        await axios.post("http://localhost:3000/favs/:user", { link: imageLink, user: user?.nickname });
      } catch (error) {
        console.log("Error saving image:", error);
      }
      console.log(user)
  }
  

    const search = async () => {
    try {
        const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${import.meta.env.VITE_GOOGLE_API_KEY}&cx=37c21eb6c26d647ab&num=10&searchType=image&q=${searchLink}`);

        const data = await response.json()

        setSearchTime(data.searchInformation.formattedSearchTime);

        if (data.items) {
            const fetchedImages: IPicture[] = data.items.map((item: any) => ({link: item.link}))
            // ({...item}))
            
            // ({
            //     link: item.link,
            //     title: item.title
            // }))
            setImages(fetchedImages);
            console.log(fetchedImages);
        }
    }
     catch (error) {
        console.error("Error fetching imgs", error);
    }
    return searchTime;
    }
    
    const handleInputChange = (event:ChangeEvent<HTMLInputElement>) => {
        setSearchLink(event.target.value)
    }


  return (
    <SavedImagesContext.Provider value={savedImages}>
    <>
      <h2>Image Search</h2>

      {isAuthenticated && (
        <>
          <input type="text" value={searchLink} onChange={handleInputChange}/>
          <button onClick={search}>Search</button>
          <p>The search took: {searchTime} ms</p>
          <section className="pictures">
            {images.map((image) => (
                <div key={image.link}>
                <img src={image.link} alt={"Saved image"} />
                <button onClick={() => handleSaveClick(image.link)}>Save</button>
                </div>
            ))}
          </section>
          <Favourites />
        </>
      )}
    </>
  </SavedImagesContext.Provider>
  );
 }