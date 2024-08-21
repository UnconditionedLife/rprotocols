import { Box } from "@mui/material";
import ButtonView from "./ButtonView";

export default function SearchResults(props) {
    const { searchResults, handleGoto } = props;
    
    if ( searchResults === null ) return null

    return (
        <Box alignSelf='center' marginTop='30px'>
            <Box display='flex' maxWidth='744px' flexWrap='wrap' justifyContent='center'>
                { searchResults.map((item, index) => (
                    <ButtonView key={item.majId} item={ item } index={ index } level='domain' handleGoto={ handleGoto }></ButtonView>
                ))}
            </Box>
        </Box>
    )
}