import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function LanguageBar(props) {
    const { handleLanguage, lang } = props

    const handleClick = (newLang) => {
        // console.info('You clicked the Language.');
        handleLanguage(newLang)
    };

    const enColor = (lang === 'en') ? "primary" : "default"
    const esColor = (lang === 'es') ? "primary" : "default"
    const ptColor = (lang === 'pt') ? "primary" : "default"

    return (
        <Box alignSelf='center' marginTop='16px'>
            <Stack direction="row" spacing={1}>
                <Chip label="English"  color={ enColor } onClick={() => { handleClick('en')} } size="small" variant="outlined" />
                <Chip label="Español" color={ esColor } onClick={() => { handleClick('es')} } size="small" variant="outlined" />
                <Chip label="Português" color={ ptColor } onClick={() => { handleClick('pt')} } size="small" variant="outlined" />
            </Stack>
        </Box>
    );
}