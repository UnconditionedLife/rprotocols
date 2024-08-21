import CardView from "./CardView";

export default function CardSlider({ items, studioSection, handleGoto, lang }) {

    return (
        <div className="scrolling-wrapper-flexbox">
            { items.map((item) => (
                <CardView key={ item.minId } item={ item } handleGoto={ handleGoto } studioSection={ studioSection } lang={ lang } />
            ))}
        </div>
    )
}