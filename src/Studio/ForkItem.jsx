import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { deepClone } from "@mui/x-data-grid/internals";
import { BuildNewHistory, saveItemToDb } from "./StudioFunctions";
import { urlizeString } from "../GlobalFunctions";

export default function ForkItem({ item, lang, handleGoto, addRemoveItemInMemory, handleNewItemChange, db }) {
    const [ forkPopup, setConfirmPopup ] = useState(true)
    const [ versions, setVersions ] =useState([])
    const [ forkConfirmed, setForkConfirmed ] = useState(false)
    const [ newVerNum, setNewVerNum ] = useState("")
    const [ newMajVerNum, setNewMajVerNum ] = useState("")
    const [ newMinVerNum, setNewMinVerNum ] = useState("")

    console.log("FORK ITEM", item)

    useEffect(() => {
        if (item) {
           const items = db.filter(i => i.iId === item.iId)
            console.log("Versions", items)
            setVersions(items)
        }
    }, [ item, db ])

    useEffect(() => {
        if (item && versions.length !== 0 ) {
            // get next available major version number
            const newMajVerNum = versions.reduce((max, i) => {
                const majVerNum = parseInt(i.verNum.split(".")[0], 10);
                return Math.max(max, majVerNum);
              }, 0) + 1;
            const newMinVerNum = "0"
            setNewMajVerNum(newMajVerNum)
            setNewMinVerNum(newMinVerNum)
            setNewVerNum( newMajVerNum + "." + newMinVerNum )
        }
    }, [ item, versions ])

    useEffect(() => {
        if ( forkConfirmed && newVerNum !== "") {
            console.log("READY TO PROMOTE")
            const forkedItem = deepClone(item)
            // UPDATE NEW ITEM
            forkedItem.verNum = newMajVerNum + "." + newMinVerNum
            forkedItem.majId = forkedItem.iId + "." + newMajVerNum
            forkedItem.minId = forkedItem.majId + "." + newMinVerNum
             // CREATE NEW HISTORY RECORD
            const newHistory = BuildNewHistory( forkedItem.verNum )
            newHistory.description.en = `Forked version ${item.verNum} to new version ${forkedItem.verNum}`
            forkedItem.history.unshift(newHistory)
            saveItemToDb( forkedItem ).then((r) => {
                if (r === 'success') {
                    // Add the item to memory
                    addRemoveItemInMemory(forkedItem)
                    handleNewItemChange(null)
                    handleGoto( `/${lang}/studio/${forkedItem.type.toLowerCase()}/${urlizeString(forkedItem.title[ lang ])}/${forkedItem.minId}` )

                }
            })
        }
    }, [ forkConfirmed, item, newVerNum, newMajVerNum, newMinVerNum, addRemoveItemInMemory, handleGoto, handleNewItemChange, lang ])


    function handleConfirmation(value){
        setForkConfirmed(value)
        setConfirmPopup(false)
        if (value === false) {
            // Redirect item view
            handleGoto( `/${lang}/studio/${item.type.toLowerCase()}/${urlizeString(item.title[ lang ])}/${item.minId}` )
        }
    }

    return (
        <Dialog open={ forkPopup }>
            <DialogTitle>{ `Fork "${item.title[lang]}" to a new version?` }</DialogTitle>
            <Box display="flex" textAlign="center" justifyContent="center" padding="20px">
                <span></span>
                <Button variant="contained" style={{ margin:"4px" }} onClick={ () => { handleConfirmation(true) }} >CONFIRM</Button>
                <Button variant="outlined" style={{ margin:"4px" }} onClick={ () => { handleConfirmation(false) }} >CANCEL</Button>
            </Box>
        </Dialog>
    )
}
