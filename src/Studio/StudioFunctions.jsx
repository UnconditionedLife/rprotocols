import dayjs from "dayjs"
import { wordCase, getUserName, getUserEmail, deepCopy, dynamoDbFormat, 
    getLatestDate, updateLocalStorage, nowDates, displayDate } from "../GlobalFunctions"
import { dbSaveItemAsync } from "../Database";

// BUILD THE SEARCH INDEX
    export function LoadIndex(d, index, lang) {

        d.forEach(i => {

            
            // console.log('indexItem', i)
            

            const row = {}
            row.id = i.minId,  // id is the default field used by the indexer
            row.title = i.title[ lang ] || 'Untitled',
            row.description = i.description[ lang ],
            row.author = i.history.map(h => h.author).join(", "),
            row.tags = i.tags[ lang ]
            row.needTitle = i.needTitle[ lang ]

            // console.log('indexItem', row)

            index.addDoc(row);
        })
    }

    export function validateFields( objArr ){
        const { formState, elements, protocols, historyRecord, lang } = objArr
        
        const requiredFields= [ 'title', 'description', 'tags', 'history:description' ]

        // if ( formState.type === 'Need' )
        //     requiredFields.push( 'title', 'description', 'tags', 'historyDescription')

        if ( formState.type === 'Protocol' || formState.type === 'Guide' ) {
            requiredFields.push( 'intro', 'closing')
        }

        if ( formState.type === 'Protocol' )
            requiredFields.push( )

        if ( formState.type === 'Guide' )
            requiredFields.push( )


        // console.log("ERROR FORM FIELDS", requiredFields)


        // CHECK REQUIRED FIELDS
        const errorFields = {}
        
        requiredFields.forEach((f) => {
            let group = 'formState'
            let field = f

            if (f.includes(':')) {
                const fieldArray = f.split(':')
                group = fieldArray[0]
                field = fieldArray[1]
            }

            if (group === 'formState') {
                // console.log(formState[field][lang], formState[field][lang].trim.length < 1 )
                if ( formState?.[field]?.[lang]) {
                    if ( formState?.[field]?.[lang].trim().length < 1 ) {
                        errorFields[field] = { error: '', helperText: '' }
                        errorFields[field].error = true
                        errorFields[field].helperText = 'Field is Require.'
                    }
                }
            }
            if (group === 'history') {
                if ( historyRecord[field]?.[lang] === undefined || historyRecord[field]?.[lang].trim().length < 1 ) {
                    errorFields['history' + wordCase(field)] = { error: '', helperText: '' }
                    errorFields['history' + wordCase(field)].error = true
                    errorFields['history' + wordCase(field)].helperText = 'Field is Require.'
                }
            }

            // console.log('errorsFields', errorFields)

        })

        return errorFields
    }

    export function BuildNewItem( type, needMajId, needTitle, title, description, tags ){
        const emptyLang = { en: "", es: "", pt: "" }
        const newIdObj = buildNowIds(type)

console.log('newIdObj', newIdObj)
console.log('needMajId', needMajId)
console.log('needTitle', needTitle)

        const basicItem = {
            iId: newIdObj.iId,
            year: newIdObj.year,
            majId: newIdObj.majId,
            minId: newIdObj.minId,
            type: wordCase(type),
            subtype: '',
            needMajId: needMajId,
            needTitle: needTitle,
            verNum: newIdObj.verNum,
            minDate: newIdObj.date,
            majDate: newIdObj.date,
            deleted: false,
            title: title || emptyLang,
            description: description || emptyLang,
            tags: tags || emptyLang,
            history: [
                // {
                //     date: newIdObj.date,
                //     author: getUserName(),
                //     contactInfo: getUserEmail(),
                //     description: "First version!",
                //     verNum: verNum,
                //     minId: newIdObj.minId
                // }
            ],
            comComments: [],
            comFollowNum: 0
        }
        if (type === 'Protocol' || type === 'Guide') {
            basicItem.regions = [
                {
                    level: 'continent',
                    location: 'GB'
                }
            ],
            basicItem.intro = emptyLang
            basicItem.closing = emptyLang
            basicItem.attribComment = emptyLang
            basicItem.attribLink = ""
            basicItem.definitions = [ { term: {}, definition: {} } ]
            basicItem.variables = [ { variable: {}, description: {} } ]
            basicItem.comAdoptNum = 0
            basicItem.comSupportNum = 0
            basicItem.comForkNum = 0
        }
        if (type === 'Protocol') {
            basicItem.elements = []
        }
        if (type === 'Guide') {
            basicItem.protocols = []
        }
        return basicItem
    }

function buildNowIds(type){

    // console.log('buildNowIds', type)
    
    const idObj = {}
    const dateObj = nowDates()
    const idDate = dateObj.id        //dayjs(now).utc().format('YYYYMMDDTHHmmssSSS')
    idObj.date =  dateObj.date         //dayjs(now).utc().format() //'YYYY-MM-DDTHH:mm:ssZ'
    idObj.year =  dateObj.year       //idObj.date.substring(0, 4)
    const uniqueNum = Math.floor(Math.random() * 10000);
    let typeToken
    if  (type === 'Need') typeToken = 'N'
    if (type === 'Protocol') typeToken = 'P' 
    if (type === 'Guide') typeToken = 'G'
    idObj.iId = `${typeToken}.${idDate}-${uniqueNum}`
    idObj.majId = idObj.iId + ".1"
    idObj.minId = idObj.iId + ".1.0"
    idObj.verNum = "1.0"
    return idObj
}

export function IncrementMinorVersion(oldVersion){
    return oldVersion.split('.')[0] + "." + String((Number(oldVersion.split('.')[1]) + 1))
}

export function DecrementMinorVersion(lastVer){
    // console.log("last Version", lastVer)
    const previousVer = lastVer.split('.')[0] + "." + String((Number(lastVer.split('.')[1]) - 1))
    // console.log("previous Version", previousVer)
    return previousVer
}

export function BuildNewHistory( newVersion ){
    return {
        date: nowDates().date,
        description: { "en": "", "es": "", "pt": "" },
        verNum: newVersion,
        author: getUserName(),
        contactInfo: getUserEmail()
    }
}

    export function AddIdToArray(array, prefix){
        array.forEach((item, index) => {
            item.id = prefix + "-" + (index + 1)
        });
        return array
    }

    export function BuildHistoryField(history, lang){
        const tempArray = []
        history.forEach((entry) => {
            tempArray.push("Ver. " + entry.verNum)
            tempArray.push(displayDate(entry.date))
            tempArray.push(entry.author)
            tempArray.push(entry.description[ lang ] || '{ empty description }' )
        })
        return tempArray
    }

    export function marshalRecord( item, elements, protocols, regions ){
        let updatedItem = deepCopy(item)
    
        if (updatedItem?.regions) {
            let updatedRegions = deepCopy(regions)
            updatedItem.regions = updatedRegions.map(obj => {
                const newObj = { ...obj } // Create a shallow copy of the object
                delete newObj.id // Remove the key
                return newObj
            });
        }
    
        if (updatedItem?.elements) {
            let updatedElements = deepCopy(elements)
            updatedItem.elements = updatedElements.map(obj => {
                const newObj = { ...obj } // Create a shallow copy of the object
                delete newObj.id // Remove the key
                return newObj
            });
        }
    
        if (updatedItem?.protocols) {
            let updatedProtocols = deepCopy(protocols)
            updatedItem.protocols = updatedProtocols.map(obj => {
                const newObj = { ...obj } // Create a shallow copy of the object
                delete newObj.id // Remove the key
                return newObj
            });
        }
    
        // console.log("data", updatedItem)

        return updatedItem
    }

    export async function saveItemToDb( usableItem ) {
        // console.log('called handle save item', item)

        // update edit date prior to saving
        const dateObj = nowDates()

console.log("dateObj", dateObj)

        usableItem.minDate = dateObj.date
        usableItem.year = dateObj.year
        usableItem.history[0].date = dateObj.date
        
        // format for API/DynamoDB Database
        let dbReadyItem = dynamoDbFormat(usableItem)
        
        // console.log("UpdatedItem", dbReadyItem)

        // Preprocess DynamoDB formatting the fields store in "data" attribute
        const pData =  preprocessData(dbReadyItem.data)
        
        // console.log("Preprocess Data", pData)
    
        dbReadyItem.data = pData

        // console.log("SENT TO SAVE:", dbReadyItem)

        return await dbSaveItemAsync(dbReadyItem).then((r) => {
            let error = ""
            if (typeof(r) === 'object' && r !== null) {
                if (Object.keys(r).length < 1 ) {
                    // console.log("Saved", r)
                    updateLocalStorage( [ usableItem ] )
                    return 'success'
                } else {
                    error = r
                }
            }  else {
                error = r
            }
            if (error !== '') console.error(error, dbReadyItem)
            return error
        }).catch((error) => {
            console.error("ERROR", error)
            console.error( "item", dbReadyItem)
            return error
        })
    }

    export function preprocessData(data) {
        const pData = {};

        // console.log('data', data)

        for (const key in data) {

            // console.log('data key', key)

          if (typeof data[key] === 'string') {
            pData[key] = { S: data[key] };
          } else if (typeof data[key] === 'number') {
            pData[key] = { N: data[key].toString() };
          } else if (typeof data[key] === 'boolean') {
            pData[key] = { BOOL: data[key] };
          } else if (Array.isArray(data[key])) {

            // console.log('IN ARRAY', key)

            pData[key] = { L: data[key].map(item => {
                if (typeof item === 'object' && item !== null) {
                    return { M: preprocessData( item ) }
                } else {
                    return preprocessData({ value: item }).value
                }
            }) };
          } else if (typeof data[key] === 'object' && data[key] !== null) {

            // console.log('IN OBJECT', key)

            pData[key] = { M: preprocessData(data[key]) };
          }
        }
        return pData;
    }

export function getListOfNeeds(items){
    // build a list of need names to us to select the need parent
    const needOnly = items.filter(item => item.type === 'Need')
    return needOnly.map(item => {
        return { majId: item.majId, title: item.title }
    });
}

export function getLatestStoredInfo(){
    // default values
    const infoObj = { year: dayjs().year(), sinceDate: '2024-07-01T00:01-07:00' }
    // check local storage
    infoObj.items = localStorage.getItem('latestItems')
    if (infoObj.items !== null) infoObj.items = JSON.parse(infoObj.items)

    let latestLocalDate = null
    if (infoObj.items !== null)
        latestLocalDate = getLatestDate(infoObj.items)

    if (latestLocalDate !== null ) {
        infoObj.year = latestLocalDate.substring(0, 4)
        infoObj.sinceDate = latestLocalDate
    }
    return infoObj
}

export function buildItemsForSelect(db, subjectItem, selectType) {
    const reducedList = db.filter((i) => i.type === selectType && subjectItem.majId !== i.majId)
        .map(item => ({
            majId: item.majId,
            title: item.title
    }))    
    reducedList.push({ majId: null, title: { en:"", es:"", pt:"" } })
    return reducedList
}

export function sortArrByTitle(arr, lang){
    return arr.sort(function(a, b) {
        let textA = a.title[ lang ].toUpperCase();
        let textB = b.title[ lang ].toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
}

export function buildRelationships( itemsDb ){

    console.log('building relationships')

    const rels = { p: {}, c: {} }
    itemsDb.forEach((item) => {
        item.needParents.forEach(( parentMajId ) => {
            // add to parents
            if (!rels.p[ parentMajId ]) rels.p[ parentMajId ] = []
            else if (!rels.p[ parentMajId ].includes( item.majId )) 
                rels.p[ parentMajId ].push( item.majId )

            // add to children
            if (!rels.c[ item.majId ]) rels.c[ item.majId ] = []
            else if (!rels.c[ item.majId ].includes( parentMajId )) 
                rels.c[ item.majId ].push( parentMajId )
        })
    })
    return rels
}