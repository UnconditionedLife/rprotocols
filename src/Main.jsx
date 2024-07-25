
import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import ProtocolsHome from './ProtocolsHome.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StudioExplore from './Studio/StudioExplore.jsx';
import Studio from './Studio/Studio.jsx';
import Root from './Root.jsx';
import COOP2 from './COOP2.jsx';
import CollabHomePage from './Collab/HomePage.jsx';
import SessionsPage from './Collab/SessionsPage.jsx';
import SessionsFormPage from './Collab/SessionsFormPage.jsx';
import AboutPage from './Collab/AboutPage.jsx';
import PrivacyPage from './Collab/PrivacyPage.jsx';


const theSite = import.meta.env.VITE_SITE;

const TheHomePage = (theSite == 'rCollabs') ? CollabHomePage : ProtocolsHome

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        // element: <div>Hello World!</div>,
        errorElement: <div>ERROR NOT FOUND</div>,
        children: [
            // COLLABS or PROTOCOLS
            {
                path: "/",
                element: <TheHomePage />
                // element: <StudioHome/>
                // <HomePage/>
            },
            // COLLABS
            {
                path: "/rcollabs",
                element: <CollabHomePage/>
            },
            {
                path: "/sessions/form",
                element: <SessionsFormPage/>
            },
            {
                path: "/sessions",
                element: <SessionsPage/>
            },

            // PROTOCOLS
            { 
                path: "/studio/explore",
                element: <StudioExplore/>
            },
            { 
                path: "/studio",
                element: <Studio />
            },
            { 
                path: "/studio/adopt/:itemId",
                element: <Studio />
            },
            { 
                path: "/studio/edit/:itemId",
                element: <Studio />
            },
            // { 
            //     path: "/studio/add-to/:parentId",
            //     element: <Studio />
            // },
            { 
                path: "/studio/add/",
                element: <Studio />
            },
            {
                path: "/studio/add-set/",
                element: <Studio />
            },
            { 
                path: "/studio/fork/",
                element: <Studio />
            },
            { 
                path: "/studio/search",
                element: <Studio />
            },
            { 
                path: "/studio/search/:searchTerm",
                element: <Studio />
            },
            // { 
            //     path: "/studio/view/:urlId",
            //     element: <Studio />
            // },
            // { 
            //     path: "/studio/view/:itemName/:urlId",
            //     element: <Studio />
            // },
            { 
                path: "/studio/need/:itemName/:urlId",
                element: <Studio />
            },
            { 
                path: "/studio/protocol/:itemName/:urlId",
                element: <Studio />
            },
            { 
                path: "/studio/guide/:itemName/:urlId",
                element: <Studio />
            },
            { 
                path: "/studio/guides",
                element: <Studio />
            },
            { 
                path: "privacy_protocols",
                element: <PrivacyPage/>
            },
            { 
                path: "coop2",
                element: <COOP2/>
            },
            { 
                path: "about",
                element: <AboutPage/>
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('main')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
)
