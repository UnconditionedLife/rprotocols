import { Box } from "@mui/material";
import { Fragment } from "react";

export default function Quote(props) {
    const { quote, author } = props;
    
    const quoteArr = quote.split('|')

    const lines = quoteArr.map((line, index) => {
        if (index +1 < quoteArr.length) { return <Fragment key={index}>{line}<br /></Fragment> }
        if (index +1 === quoteArr.length) { return <Fragment key={index}>{line}</Fragment> }
    });

    return (
        
        <Box className="quoteContainer">
        <span className='quote' >
            &ldquo;{ lines }&rdquo;<br/>
            <span style={{ fontFamily:'fantasy', fontSize:'1em' }}>{ author }</span>
        </span>
    </Box>
    )
}