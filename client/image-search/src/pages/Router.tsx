import { createBrowserRouter } from "react-router-dom";
import { Favourites } from "./Favourites";
import { Layout } from "./Layout";
import { Main } from "./Main";
import { NotFound } from "./NotFound";

export const router = createBrowserRouter([
    {
        path: "/", 
        element: <Layout/>,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Main/>,
                index: true,
            },
            {
                path: "/favs",
                element: <Favourites/>
            },
    
        ]
    }
    ])
