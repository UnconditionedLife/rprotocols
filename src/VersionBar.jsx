import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function VersionBar(props) {
    const { handleVersion, majorVersions, currentVersion } = props
    const [ versions, setVersions ] = useState([])

    const handleClick = (newVersion) => {
        handleVersion(newVersion)
    };

    console.log('majorVersions', majorVersions)

    useEffect(() => {

console.log('majorVersions', majorVersions)

        if ( majorVersions.length === 0 ) {
            setVersions([])
        } else {
            const tempVersions = []
            majorVersions.map((ver) => {
                const version = {
                    label: "Ver. " + ver + ".x",
                    variant: (Number(ver) === Number(currentVersion)) ? "" : "outlined",
                    value: ver
                }
                tempVersions.push(version)
            })
            setVersions(tempVersions)
        }
    }, [ majorVersions, currentVersion ])

    return (
        <Stack direction="row" spacing={1}>
            { versions.map((v) => (
                <Chip key={ v.value } label={ v.label }  color={ 'primary' } onClick={() => { handleClick(v.value)} } size="small" variant={ v.variant} />
            ))}
        </Stack>
    );
}