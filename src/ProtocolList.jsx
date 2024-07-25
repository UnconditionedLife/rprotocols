// import { useLiveQuery, useDocument, useFireproof } from 'use-fireproof'
import { Box, Card, Button, CardActions, Typography } from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SignpostIcon from '@mui/icons-material/Signpost';

export default function ProtocolList(props) {
    const { protocols, handleEdit, handleSetCurrentProtocol } = props;

    const arrow = ">"

    return (
        <Box>
            { protocols.map((protocol) => (
                <Card key={protocol._id} style={{ margin:'8px', padding:'12px', width:'300px', minHeight:'80px', maxHeight:"120" }}>
                    <Typography variant="button" fontSize={"9px"}>
                        { protocol.contextName } { arrow } { protocol.domainName }<br/>
                        { arrow } { protocol.purposeName } <br/>
                    </Typography>
                    <SignpostIcon fontSize='medium' color='primary'/><br/>
                    <Typography variant="body1" color={"primary"}>
                        <span style={{ cursor: "pointer" }} onClick={() => { handleEdit(protocol, "protocol") }}>{ protocol.name }</span> <br/>
                    </Typography>
                    <Typography variant="body2" fontSize={"11px"} textAlign={'left'} style={{ whiteSpace: "pre-wrap" }}>
                        { protocol.description }
                    </Typography>
                    <Typography variant="caption" fontSize={9}>
                        { new Date(protocol.created).toLocaleString("en-US", { 
                            year: "numeric", month: "long", day: "numeric", 
                            hour: "numeric", minute: "numeric", timeZoneName: "short" }) }
                    </Typography>
                    <CardActions>
                        <Button style={{ fontSize:".65em", padding:"2px", margin:"0" }}
                            onClick={() => { handleSetCurrentProtocol(protocol._id) }} size="small">Expand Protocol</Button>
                    </CardActions>
                </Card>
            ))}
        </Box>
    )
}