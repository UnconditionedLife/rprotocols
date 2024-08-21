import { Navigate } from 'react-router-dom';

export default function LangSwitcher({ selectedLang }) {
    const langRoute = `/${selectedLang}/home`
    
    return <Navigate to={ langRoute } replace />
}