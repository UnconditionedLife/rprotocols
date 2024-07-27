import { useMemo, useRef } from 'react';
import { TextField, Autocomplete } from '@mui/material';

export default function NeedSelector(props) {
    const { formState, needsList, handleEditAddParent, lang } = props;
    const inputRef = useRef(null);

    // console.log('Needs List', needsList)
    const sortedNeeds = useMemo(() => {
        const reducedList = needsList.map(need => ({
            majId: need.majId,
            title: need.title[ lang ]
        })).filter((i) => formState.majId !== i.majId)
        reducedList.push( { majId: "1", title: "  Add a Parent Need" } )
        return reducedList.sort(function(a, b) {
            let textA = a.title.toUpperCase();
            let textB = b.title.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
      }, [lang, needsList, formState ]);

    if (!sortedNeeds) return null

    const newParent = { majId: "1", title: " Add a Parent Need" }

    return (
        <Autocomplete id="need-selector" key={ sortedNeeds.majId } sx={{ width:'100%' }}
            options={ sortedNeeds } autoHighlight clearOnEscape
            value={ newParent }
            isOptionEqualToValue={(option, value) => option.majId === value.majId}
            getOptionLabel={(option) => { return option.title || '' }}
            onChange={(event, newValue) => {
                handleEditAddParent( newValue )
                inputRef.current.blur();
            }}
            renderOption={(props, option) => ( <li {...props} key={option.majId}>{ option.title }</li>
            )}
            renderInput={(params) => (
                <TextField {...params} label="" size='small' 
                    inputRef={ inputRef } variant="standard"/>
            )}
        />
    )
}