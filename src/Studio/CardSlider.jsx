import { useState, useEffect } from "react"
import CardView from "./CardView";
import { useNavigate } from 'react-router-dom';

export default function CardSlider(props) {
    const { items, studioSection } = props;
    const [ goto, setGoto ] = useState(null)
    const navigate = useNavigate()
    
    const item = {
        header: {
            guideId: '018g5743-39c2-7f01-h22d-b149a13ws84a0',
            description: {
                en: "Guide for defining the employment agreement in a traditional hierarchical organization.",
                es: "Guía para definir el acuerdo de empleo en una organización jerárquica tradicional.",
                pt: "Guia para definir o acordo de emprego em uma organização hierárquica tradicional."
            },
            version: "1.2"
        },
        content: {
            title: {
                en: "Employment Agreement Guide",
                es: "Guía de Acuerdo de Empleo",
                pt: "Guia de Acordo de Emprego"
            },
        }
    }

    useEffect(() => {
        if (goto) {
          navigate( goto, { replace: true });
        }
    }, [goto, navigate]);

    function handleGoto(url) {
        setGoto(url)
    }


    return (
        <div className="scrolling-wrapper-flexbox">
            <CardView item={ item } handleGoto={ handleGoto } studioSection={ studioSection } />
            <CardView item={ item } handleGoto={ handleGoto } studioSection={ studioSection } />
            <CardView item={ item } handleGoto={ handleGoto } studioSection={ studioSection } />
            <CardView item={ item } handleGoto={ handleGoto } studioSection={ studioSection } />
            <CardView item={ item } handleGoto={ handleGoto } studioSection={ studioSection } />
            <CardView item={ item } handleGoto={ handleGoto } studioSection={ studioSection } />
            <CardView item={ item } handleGoto={ handleGoto } studioSection={ studioSection } />
            <CardView item={ item } handleGoto={ handleGoto } studioSection={ studioSection } />
            <CardView item={ item } handleGoto={ handleGoto } studioSection={ studioSection } />
            <CardView item={ item } handleGoto={ handleGoto } studioSection={ studioSection } />
        </div>
    )
}