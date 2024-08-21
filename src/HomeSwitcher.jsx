import { Navigate, useParams } from 'react-router-dom';

export default function HomeSwitcher({ error404 }) {
    const { lang } = useParams()
    const langRoute = `/${lang}/home`

    console.log("SWITCHER 404", error404)
    
    if (error404 === true) return <Navigate to={ langRoute } replace state={{ from404: true }} />
    
    return <Navigate to={ langRoute } replace state={{ from404: false }}/>
}