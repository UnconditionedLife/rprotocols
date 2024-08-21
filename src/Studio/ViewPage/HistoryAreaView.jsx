import { useState, useEffect } from 'react';
import { Box } from '@mui/material'
import Accordion from '../../Accordion';
import HistoryFieldView from './HistoryFieldView';
import { BuildHistoryField } from '../StudioFunctions';

export default function HistoryAreaView(props) {
    const { item, history, lang, show } = props
    const [ contentShow, setContentShow ] = useState( 'none' )
    const [ fields, setFields ] = useState([])
    const [ limit, setLimit ] = useState( 5 )

    useEffect(() => {
        setContentShow( show ? 'flex' : 'none')
    }, [ show ])

    useEffect(() => {
        let limitedHistory = history
        if (limit !== -1) {
            const shorten = history.slice(0, limit)
            limitedHistory = shorten
        }

        setFields(BuildHistoryField(limitedHistory, lang))
    }, [ history, lang, limit ])

    function handleShow() {
        setContentShow( contentShow === 'none' ? 'flex' : 'none' )
    }

    function handleLimit() {
        if (limit === 5) 
            setLimit(-1)
        else
            setLimit(5)
    }

    const limitText = (limit === 5) ? 'View Full History' : 'View Last Five'

    if ( fields === undefined ) return null

    return (
        <Box className='iCardAreaContainer'>
            <Accordion version='hist' title='History' show={ contentShow } handleArea={ handleShow } />
            <Box display={ contentShow } className='iCardAreaContentBox-col'>
                <Box className='historyGridContainer'>
                    { fields.map((field, i) => (
                        <HistoryFieldView key={ 'hist-' + i } field={ field } />
                    ))}
                </Box>
                { (history.length > 5) &&
                    <Box width='100%' textAlign='center' className='textLink' onClick={ () => { handleLimit() } }>{ limitText }</Box>
                }
                <Box width='100%' textAlign='center' fontSize='.75rem' fontFamily='monospace'>{ item.minId }</Box>
            </Box>
        </Box>
    )
}