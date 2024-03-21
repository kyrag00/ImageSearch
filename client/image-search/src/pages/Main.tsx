import { useAuth0 } from "@auth0/auth0-react";
import { ChangeEvent, useState, createContext, useContext, useEffect } from "react";
import "../styles/home(Main).css"
import { Favourites } from "./Favourites";
import axios from "axios";

export interface IPicture { 
    link: string;
}

const SavedImagesContext = createContext<IPicture[]>([]);
export const useSavedImages = () => useContext(SavedImagesContext);

export const Main = () => {
  const { isAuthenticated } = useAuth0();
  const [searchLink, setSearchLink] = useState("");
  const [images, setImages] = useState<IPicture[]>([]);
  const [searchTime, setSearchTime] = useState<string | null>(null)
  const [correctedQuery, setCorrectedQuery] = useState<string | null>(null);

  const [savedImages, setSavedImages] = useState<IPicture[]>([]);

  const {user} = useAuth0();

  const handleSaveClick = async (imageLink: string) => {
    try {
        await axios.post(`http://localhost:3000/favs/${user?.nickname}`, { link: imageLink});
      } catch (error) {
        console.log("Error saving image:", error);
      }
      console.log(user)
  }
  
  
    const search = async () => {
    try {
        const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${import.meta.env.VITE_GOOGLE_API_KEY}&cx=37c21eb6c26d647ab&num=10&searchType=image&q=${searchLink}`);

        const data = await response.json()
        console.log(data);

        setSearchTime(data.searchInformation.formattedSearchTime);

        if (data.items) {
            const fetchedImages: IPicture[] = data.items.map((item: any) => ({link: item.link}))
            setImages(fetchedImages);
            console.log(fetchedImages);
        }

        if (data.spelling && data.spelling.correctedQuery) {
            setCorrectedQuery(data.spelling.correctedQuery);
        } 
        else {
            setCorrectedQuery(null)
        }
    }
     catch (error) {
        console.error("Error fetching imgs", error);
    }
    return searchTime;
    }

    useEffect(() => {
        const fetchSavedImages = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/favs/${user?.nickname}`);
            setSavedImages(response.data);
          } catch (error) {
            console.error("Error fetching saved images", error);
          }
        };
    
        if (isAuthenticated && user) {
          fetchSavedImages();
        }
      }, [isAuthenticated, user]);
    
    const handleInputChange = (event:ChangeEvent<HTMLInputElement>) => {
        setSearchLink(event.target.value)
    }

    const searchWithCorrectQuery = (correctedQuery: string) => {
        setSearchLink(correctedQuery)
        search()
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
        {correctedQuery && (
        <p>Did you mean: {""}
        <a href="#" onClick={() => searchWithCorrectQuery(correctedQuery)}>
            {correctedQuery}
        </a>
        </p>)}
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