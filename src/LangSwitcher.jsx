import { Navigate } from 'react-router-dom';

export default function LangSwitcher({ lang }) {
    const langRoute = `/${lang}/home`
    
    return <Navigate to={ langRoute } replace state={{ from404: false }}/>
}