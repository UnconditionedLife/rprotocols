
import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Studio from './Studio/Studio.jsx';
import Root from './Root.jsx';
import COOP2 from './COOP2.jsx';
import CollabHomePage from './Collab/HomePage.jsx';
import SessionsPage from './Collab/SessionsPage.jsx';
import SessionsFormPage from './Collab/SessionsFormPage.jsx';
import LangSwitcher from './LangSwitcher.jsx';
import HomeSwitcher from './HomeSwitcher.jsx';
import './i18n';

// const theSite = import.meta.env.VITE_SITE;
// const TheHomePage = (theSite == 'rCollabs') ? CollabHomePage : ProtocolsHome

const langChoice = localStorage.getItem("i18nextLng")
const defaultLang = langChoice ? langChoice : "en"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        // element: <div>Hello World!</div>,
        errorElement: <Studio />,
        //from404={ true }

        children: [
            // COLLABS or PROTOCOLS
            {
                path: "/",
                element: <LangSwitcher lang={ defaultLang } />
            },
            
            {
                path: "/:lang",
                element: <HomeSwitcher />
                // <Studio PageNotFound={ false }/>
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

            // DYNAMIC ROUTES
            { 
                path: "/:lang/:area",
                element: <Studio />
            },
            { 
                path: "/:lang/:area/:action",
                element: <Studio />
            },
            { 
                path: "/:lang/:area/:action/:value1",
                element: <Studio />
            },
            { 
                path: "/:lang/:area/:action/:value1/:value2",
                element: <Studio />
            },
            { 
                path: "/:lang/coop2",
                element: <COOP2/>
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('main')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
