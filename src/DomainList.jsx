// import { useLiveQuery, useDocument, useFireproof } from 'use-fireproof'
import { Box, Card, Button, CardActions, Typography } from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CategoryIcon from '@mui/icons-material/Category';

export default function DomainList(props) {
    const { domains, handleEdit, handleSetCurrentDomain } = props

    // {console.log("domains top of List Component", domains)}

    return (
        <Box>
            { domains.map((domain) => (
                <Card key={domain._id} style={{ margin:'8px', padding:'12px', width:'300px', minHeight:'80px', maxHeight:"120" }}>
                    <Typography variant="button" fontSize={"9px"}>
                        { domain.contextName } <br/>
                    </Typography>
                    <CategoryIcon fontSize='small' color='primary'/><br/>
                    { (domain.deleted) && 
                        <Typography variant="button" color={"error"}>
                            <span style={{ cursor: "pointer" }} onClick={() => { handleEdit(domain, "domain") }}>{ domain.name }</span> <br/>
                        </Typography>
                    }
                    { (!domain.deleted) &&
                        <Typography variant="button" color={"primary"}>
                            <span style={{ cursor: "pointer" }} onClick={() => { handleEdit(domain, "domain") }}>{ domain.name }</span> <br/>
                        </Typography>
                    }
                    <Typography variant="body2" align='left'>
                        { domain.description }
                    </Typography>
                    <Typography variant="caption" fontSize={9}>
                        { new Date(domain.created).toLocaleString("en-US", { 
                            year: "numeric", month: "long", day: "numeric", 
                            hour: "numeric", minute: "numeric", timeZoneName: "short" }) }
                    </Typography>
                    <CardActions>
                        <Button style={{ fontSize:".65em", padding:"2px", margin:"0" }}
                            onClick={() => { handleSetCurrentDomain(domain._id) }} size="small">View Purposes</Button>
                    </CardActions>
                </Card>
            ))}
        </Box>
    )
}