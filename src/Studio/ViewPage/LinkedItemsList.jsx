import { Box, Grid } from "@mui/material";
import LinkedItemRow from "./LinkedItemRow";
import { DataGrid } from '@mui/x-data-grid';
import { urlizeString } from "../../GlobalFunctions";
import NeedIcon from '/NeedIcon-reverse.svg';
import ProtocolIcon from '/ProtocolIcon-reverse.svg';

// import { GridCellParams } from '@mui/x-data-grid'


export default function LinkedItemsList(props) {
    const { links, lang, handleGoto } = props;
    // const [ domains, setDomains ] = useState(null)

    
    // if ( links === null ) return null


    const columns =[
        { field: "type", headerName: "", width: 40, minWidth: 40, align: 'center',
            renderCell: (params) => (
                <div  style={{
                    backgroundColor:"black !important",
                }}>
                    { getIcon(params.value) }
                </div>
         )},
        { field: "title", 
            headerName: "", 
            width: 290,
            renderCell: (params) => (
                <div
                  style={{
                    fontWeight: 'bold',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                {params.value}
                </div>
            ),
            sortable: true,
            hideSortIcons: false,
            filterable: false
         },
        { field: "description", headerName: "", width: 230,
            renderCell: (params) => (
                <div
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                {params.value}
                </div>
            )
        },
        { field: "follows", headerName: "", width: 55 },
        { field: "adopts", headerName: "", width: 60 },
    ]

    // Build Rows
    const rows = []
    links.forEach((i) => {

        const type = i.type === "Need" ? 1 : 0
        rows.push({
            id: i.minId,
            type: type,
            title: i.title[ lang ],
            description: i.description[ lang ],
            follows: "follow",
            adopts: "adopt",
        })
    })
    
    rows.sort((a, b) => a.type - b.type)

    const getRowClassName = (params) => {
        if (params.row.type === 1) return 'needRow'
        if (params.row.type === 0) return 'protocolRow'
    }

    const handleRowClick = (params) => {
        const type = params.row.type === 1 ? "need" : "protocol"
        const title = urlizeString(params.row.title)
        const id = params.row.id
        handleGoto( `/${lang}/studio/${type}/${title}/${id}` )
    }

    function getIcon(value) {
        return value === 1 ? <img src={ NeedIcon } style={{ marginTop:'6px' }} height='18px' alt="Need Icon" /> : <img src={ ProtocolIcon } style={{ marginTop:'6px' }} height='18px' alt="Need Icon" />
    }


    if (rows.length === 0) return null

    return (
        <Box sx={{ flexGrow: 0, marginLeft:"-4px", marginRight:"-4px" }} overflow='visible'>
            <DataGrid
                columns={ columns }
                rows={ rows }
                pageSizeOptions={ [100] }
                rowHeight={30}
                columnHeaderHeight={ 40 }
                autoHeight={ true }
                getRowClassName={getRowClassName}
                density="standard"
                onRowClick={handleRowClick}
            />
        </Box>

        

        // <Box alignSelf='center' marginTop='0px'>
        //     <Box display='flex' maxWidth='744px' flexWrap='wrap' justifyContent='center'>
        //         { searchResults.map((item, index) => (
        //             <LinkedItemRow key={item.majId} item={ item } index={ index } level='domain' handleGoto={ handleGoto }></LinkedItemRow>
        //         ))}
        //     </Box>
        // </Box>
    )
}