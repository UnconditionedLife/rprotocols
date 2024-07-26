import { useMemo } from 'react';
import { TextField, Autocomplete } from '@mui/material';

export default function NeedSelector(props) {
    const { formState, needsList, handleParentChange, lang } = props;

    // console.log('Needs List', needsList)
    const sortedNeeds = useMemo(() => {
        const reducedList = needsList.map(need => ({
            majId: need.majId,
            title: need.title[ lang ]
        })).filter((i) => formState.majId !== i.majId)
        return reducedList.sort(function(a, b) {
            let textA = a.title.toUpperCase();
            let textB = b.title.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });

      }, [lang, needsList, formState ]);

    const selectedValues = useMemo(
        () => sortedNeeds.find((sortedNeed) => sortedNeed.majId === formState.needMajId),
        [ sortedNeeds, formState.needMajId ],
    );

    // const selectedValue = useMemo(() => { 
    //     // console.log("formState.needMajId", formState.needMajId, formState)
    //     return sortedNeeds.find((sortedNeed) => sortedNeed.majId === formState.needMajId)
    // }, [ sortedNeeds, formState ]);

    if (!sortedNeeds) return null

// console.log("selectedValue", selectedValue)


    return (
        <Autocomplete id="need-selector" key={ sortedNeeds.majId } sx={{ width:'100%' }}
            options={ sortedNeeds } autoHighlight clearOnEscape
            value={ selectedValues }
            isOptionEqualToValue={(option, value) => option.majId === value.majId}
            getOptionLabel={(option) => { return option.title || '' }}
            onChange={(event, newValue) => {
                handleParentChange(newValue.majId, needsList.find(need => need.majId === newValue.majId).title)
            }}
            renderOption={(props, option) => ( <li {...props} key={option.majId}>{ option.title }</li>
            )}
            renderInput={(params) => (
                <TextField {...params} label="Parent Need" required size='small' variant="standard"/>
            )}
        />
    )
}