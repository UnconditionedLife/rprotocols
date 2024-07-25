// import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box, Container } from '@mui/material';
import ProtocolCard from './ProtocolView';

export default function ProtocolCarousel(props) {
    const { protocols } = props

    return (
        <Container maxWidth="1200px" >
        <Carousel
          showArrows={true}
          showThumbs={false}
          infiniteLoop={true}
          useKeyboardArrows={true}
          autoPlay={false}
          stopOnHover={true}
          centerMode={true}
          interval={5000}
        >
          {protocols.map((protocol, i) => (
            <Box key={ i } height="455px" style={{ marginBottom:'28px', paddingBottom:'18px', paddingTop:'18px', overflow:'scroll'}}>
                <ProtocolCard item={ protocol } />
            </Box>
          ))}
        </Carousel>
      </Container>
    );
}