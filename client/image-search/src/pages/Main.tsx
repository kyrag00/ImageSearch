import { useAuth0 } from "@auth0/auth0-react";
import { ChangeEvent, useState } from "react";
import "../styles/home(Main).css"

interface IPicture {
    // link: string;
    // title: string;
    [key: string] : any
}

export const Main = () => {
  const { isAuthenticated } = useAuth0();
  const [searchLink, setSearchLink] = useState("");
  const [images, setImages] = useState<IPicture[]>([]);
  const [searchTime, setSearchTime] = useState<number | null>(null)

    const search = async () => {
        let searchTime: number = 0;
    try {
        const startTime = Date.now();
        const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${import.meta.env.VITE_GOOGLE_API_KEY}&cx=37c21eb6c26d647ab&num=10&searchType=image&q=${searchLink}`);

        const data = await response.json()
        const endTime = Date.now();
        const timeTaken = endTime - startTime;

        setSearchTime(timeTaken);

        if (data.searchInformation) {
            console.log('Search Information:', data.searchInformation);
            // const searchTime = data.searchInformation;
            // return searchTime
          }
        
        if (data.items) {
            const fetchedImages: IPicture[] = data.items.map((item: any) => 
            ({...item}))
            
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
    <>
      <h2>Image Search</h2>

      {isAuthenticated && (
        <>
          <input type="text" value={searchLink} onChange={handleInputChange}/>
          <button onClick={search}>Search</button>
          <p>The search took: {searchTime} ms</p>
          <section className="pictures">
            {images.map((image) => (
                <img key={image.link} src={image.link} alt={image.title} />
            ))}
          </section>
        </>
      )}
    </>
  );
};
