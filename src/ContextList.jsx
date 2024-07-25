// import { useLiveQuery, useDocument, useFireproof } from 'use-fireproof'
import { Box, Card, Button, Typography, CardActions } from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MyLocationIcon from '@mui/icons-material/MyLocation';

export default function ContextList(props) {
    const { contextList, handleEdit, handleSetCurrentContext, display } = props

    return (
        <div>
            { display == 'large' && contextList.map((context) => (
                <Card key={context._id} style={{ margin:'8px', padding:'12px', width:'300px', minHeight:'80px', maxHeight:"120" }}>
                    <MyLocationIcon fontSize='small' color='primary'/><br/>
                    { (context.deleted) && 
                        <Typography variant="button" color={"error"}>
                            <span style={{ cursor: "pointer" }} onClick={() => { handleEdit(context, "context") }}>{ context.name }</span> <br/>
                        </Typography>
                    }
                    { (!context.deleted) &&
                        <Typography variant="button" color={"primary"}>
                            <span style={{ cursor: "pointer" }} onClick={() => { handleEdit(context, "context") }}>{ context.name }</span> <br/>
                        </Typography>
                    }
                    <Typography variant="body2" align='left'>
                        { context.description }
                    </Typography>
                    <Typography variant="caption" fontSize={9}>
                        { new Date(context.created).toLocaleString("en-US", { 
                            year: "numeric", month: "long", day: "numeric", 
                            hour: "numeric", minute: "numeric", timeZoneName: "short" }) }
                    </Typography>
                    <CardActions>
                        <Button style={{ fontSize:".65em", padding:"2px", margin:"0" }} onClick={() => { handleSetCurrentContext(context._id) }} size="small">View Domains</Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    )
}