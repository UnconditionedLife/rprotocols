import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { deepClone } from "@mui/x-data-grid/internals";
import { BuildNewHistory, saveItemToDb } from "./StudioFunctions";
import { urlizeString } from "../GlobalFunctions";

export default function PromoteItem({ item, lang, handleGoto, addRemoveItemInMemory, handleNewItemChange }) {
    const [ confirmPopup, setConfirmPopup ] = useState(true)
    const [ confirmed, setConfirmed ] = useState(false)

    console.log("PROMOTE ITEM", item)

    useEffect(() => {
        if (confirm) {
            console.log("READY TO PROMOTE")
            const promotedItem = deepClone(item)
            const newMajVer = "1"
            const newVerNum = "1.0"
            promotedItem.verNum = newVerNum
            promotedItem.majId = promotedItem.iId + "." + newMajVer
            promotedItem.minId = promotedItem.iId + "." + newVerNum
             // CREATE NEW HISTORY RECORD
            const newHistory = BuildNewHistory( newVerNum )
            newHistory.description.en = "Promoted to version 1.0"
            promotedItem.history.unshift(newHistory)
            saveItemToDb( promotedItem ).then((r) => {
                if (r === 'success') {
                    // Remove the item from memory so we don't see duplicates
                    addRemoveItemInMemory(promotedItem, item.minId)
                    handleNewItemChange(null)
                    handleGoto( `/${lang}/studio/${promotedItem.type.toLowerCase()}/${urlizeString(promotedItem.title[ lang ])}/${promotedItem.minId}` )

                }
            })
            
            //saveItem
            //handleGoto
        }
    }, [ confirmed, item ])

    // const currentVersion = item.verNum.split(".")[0]
    // const currentSubVersion = item.verNum.split(".")[1]

    // if (currentVersion === "0") {
    //     // SHOW POP-UP
        
    // }

    function handleConfirmation(value){
        setConfirmed(value)
        setConfirmPopup(false)
    }

    return (
        <Dialog open={ confirmPopup }>
            <DialogTitle>{ `Ready to promote "${item.title[lang]}" to Version 1.0?` }</DialogTitle>
            <Box display="flex" textAlign="center" justifyContent="center" padding="20px">
                <span></span>
                <Button variant="contained" style={{ margin:"4px" }} onClick={ () => { handleConfirmation(true) }} >CONFIRM</Button>
                <Button variant="outlined" style={{ margin:"4px" }} onClick={ () => { handleConfirmation(false) }} >CANCEL</Button>
            </Box>
        </Dialog>
    )
}
