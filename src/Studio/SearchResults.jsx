import { Box } from "@mui/material";
import ButtonView from "./ButtonView";

export default function SearchResults(props) {
    const { searchResults, handleGoto } = props;
    // const [ domains, setDomains ] = useState(null)

    
    if ( searchResults === null ) return null

    // { (db === null) && <Box width='200px' height='200px' margin='50px' alignSelf='center' ><CircularProgress/></Box> }

    return (
        <Box alignSelf='center' marginTop='0px'>
            <Box display='flex' maxWidth='744px' flexWrap='wrap' justifyContent='center'>
                { searchResults.map((item, index) => (
                    <ButtonView key={item.majId} item={ item } index={ index } level='domain' handleGoto={ handleGoto }></ButtonView>
                ))}
            </Box>
        </Box>
    )
}