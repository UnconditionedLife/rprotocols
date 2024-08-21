import { v4 as uuidv4 } from 'uuid';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import localizedFormat from "dayjs/plugin/localizedFormat";


dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(localizedFormat)

// const nowUTC = dayjs().utc()
// const year = dayjs().utc().year()

export function nowDates() {
    const nowUTC = dayjs().utc()
    const dateObj = {
        utc: nowUTC,
        id: nowUTC.format('YYYYMMDDTHHmmssSSS'),
        date: nowUTC.format(), //'YYYY-MM-DDTHH:mm:ssZ'
        ui: nowUTC.format('lll'),
        year: nowUTC.year()
    }
    return dateObj
}

export function displayDate(date){     // use Locale date
    return dayjs(date).format('LLL')   //'YYYY-MM-DD h:mm a' (EN)
}

export function displayDateFromNow(date) {
    return dayjs(date).fromNow()
}


// export function buildNowIdWithInterval(type, delay){
//     let id
//     const interval = setInterval( () => { 
//         id = buildNowId(type)
//         clearInterval(interval)
//     }, delay, type)
//     return id
// }


// export function SortAlpha(objArray, field){
//     objArray.sort(function(a, b) {
//         let textA = a[field].en.toUpperCase();
//         let textB = b[field].en.toUpperCase();
//         return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
//     });
// }

// Global Variables
let userObject = ""

export function handleUser(newUser) {
    userObject = newUser
}

export function getUserObject() {
    return userObject;
}

export function getUserName() {
    return userObject?.user_metadata?.full_name;
}

export function getUserEmail() {
    return userObject?.email;
}

export function getItemColor(itemType) {
    if (itemType === 'Need') return '#1C8E45'// '#7DC1F7'
    if (itemType === 'Protocol') return '#227FAF'//'#2C7EBD'
    // if (itemType === 'Guide') return '#736C9E'//'#1E4B75'
}

// export function flattenItem(unflat) {

//     // console.log("UNFLAT", unflat)
    
//     const idObj = buildNowIds("Protocol")
//     const flat = {
//     //header
//         iId: unflat.header?.id || unflat.header?.protocolId || idObj.iId,
//         majId: idObj.majId,
//         majDate: idObj.date, //unflat.header?.created ||
//         minId: idObj.minId,
//         minDate: idObj.date, //unflat.header?.created ||
//         verNum: unflat.header?.versionNum || unflat.header?.version || "1.0",
//         type: unflat.header?.type || 'Protocol',
//         subtype: unflat.header?.type || 'Practical ' + (unflat.header?.type || 'Protocol'),
//         needTitle: unflat.header?.needName || unflat.header?.parentName || { en: "", es: "", pt: ""},
//         needMinId: unflat.needMinId,

//         deleted: unflat.header.deleted || false,

//         title: unflat.content?.title || { en: "", es: "", pt: ""},
//         description: unflat.header?.description || { en: "", es: "", pt: ""},
//         tags: unflat.header?.tags || unflat.header?.keywords || { en: "", es: "", pt: ""},
//         regions: unflat.header.regions || [ { level: "continent", location: "global" } ],
    
//     //history
//         history: unflat?.history || [ { 
//                 minDate: "",
//                 author: "",
//                 contactInfo: "",
//                 description: "",
//                 verNum: "",
//                 minId: ""
//          }] ,
        
//     //community
//         comComments: unflat.community?.comments || { en: "", es: "", pt: ""},
//         comFollowNum: unflat.community?.followers || 0,
//         comAdoptNum: unflat.community?.adopters || 0,
//         comSupportNum: unflat.community?.supporters || 0,
//         comForkNum: unflat.community?.forks || 0,
//     }

//     if ( flat.type !== 'Need') {
//         flat.regions = unflat.header?.regions || [
//             {
//                 level: 'continent',
//                 location: 'GB'
//             },
//             {
//                 level: 'nation',
//                 location: 'GB'
//             },
//         ],
//         flat.intro = unflat.content?.intro || { en: "", es: "", pt: ""}
//         flat.closing = unflat.content?.closing || { en: "", es: "", pt: ""}
//         flat.attribComment = unflat.content?.attribution?.comment || { en: "", es: "", pt: ""}
//         flat.attribLink = unflat.content?.attribution?.link || ""
            
//         //metadeta
//         flat.definitions = [ { term: {}, definition: {} } ]
//         flat.variables = [ { variable: {}, description: {} } ]
//     }
//     if ( flat.type === 'Protocol') {
//         flat.elements = unflat.content?.elements || []
//     }
//     if ( flat.type === 'Guide') {
//         flat.protocols = unflat.content?.protocols || []
//     }

//     return deepCopy(flat)
// }

export const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

export function dynamoDbFormat(i){
    const dbFormat = {
        iId: i.iId,

        year: i.year,

        majId: i.majId,
        majDate: i.majDate,
        
        minId: i.minId,
        minDate: i.minDate,

        verNum: i.verNum,

        type: i.type,
        subtype: i.subType,

        needTitle: "",
        needMajId: "",
        parentNeeds: i.parentNeeds,

        deleted: i.deleted,

        data: {
            title: i.title,
            description: i.description,
            tags: i.tags ,
            history: i.history,
            comComments: i.comComments,
            comFollowNum: i.comFollowNum,
        }
    }

    if ( i.type !== 'Need') {
        dbFormat.data.regions = i.regions
        dbFormat.data.comAdoptNum = i.comAdoptNum
        dbFormat.data.comSupportNum = i.comSupportNum
        dbFormat.data.comForkNum = i.comForkNum
    }
    if ( i.type === 'Protocol') {
        dbFormat.data.intro = i.intro
        dbFormat.data.elements = i.elements || []
        dbFormat.data.protocols = i.protocols || []
        dbFormat.data.closing = i.closing
        dbFormat.data.attribComment = i.attribComment
        dbFormat.data.attribLink = i.attribLink

        dbFormat.data.definitions = i.definitions || []
        dbFormat.data.variables = i.variables || []
    }
    return dbFormat
}

// export function unflattenItem(flat) {
//     const unflat = {
//         conceptId: flat.conceptId,
//         header: {
            
//             majorVersionId: conceptId + ".1",
//             minorVersionId: conceptId + ".1.0",
//             needId: flat.needId,
//             needName: flat.needName,
//             protocolId: flat.protocolId,
//             versionId: flat.versionId,

//             title: flat.title,
//             description: flat.description,
//             version: flat.version,
//             tags: flat.tags,
//         },
//         metadata: {
//             definitions: [
//                 { term: "", definition: "" }
//             ],
//             variables: [
//                 { variable: "", description: "" }
//             ]
//         },
//         content: {
            
//             intro: flat.intro,
//             elements: flat.elements,
//             attribution: {
//                 message: flat.attributionMessage,
//                 url: flat.attributionUrl
//             },
//             links: flat.links
//         },
//         history: [
//             flat.history
//         ],
//         discuss: {
//             purpose: flat.purpose,
//             comments: flat.comments
//         }
//     }
//     return deepCopy(unflat)
//   }


function toCamelCase(str) {
    return str.replace(/([-_][a-z])/gi, (match) => {
        return match.toUpperCase().replace('-', '').replace('_', '');
    });
}

export function compareVersions(a, b){
    const aParts = a.header.version.slice(1).split('.').map(Number);
    const bParts = b.header.version.slice(1).split('.').map(Number);
      
    for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        const aPart = aParts[i] || 0;
        const bPart = bParts[i] || 0;
    
        if (aPart > bPart) return -1;
        if (aPart < bPart) return 1;
    }
    return 0;
}

export function getVersions(array){
    const majorVersions = new Set()

    array.forEach(obj => {
        const majorVersion = Number(obj.header.version.split('.')[0]) // Extract major version
        majorVersions.add(majorVersion)
    });
  
    return Array.from(majorVersions).sort((a, b) => Number(b) - Number(a))
}

export function makeFork(original, majorVersions) {
    const fork = deepCopy(original)
    const oldVersion = fork.header.version
    const oldVersionId = fork.header.versionId
    const newVersion = Math.max( ...majorVersions ) + 1
    fork.header.version = newVersion.toString() + '.0'

    
    console.log('newVersion', fork.header.version)
    
    fork.header.versionId = uuidv4()
    // const now = dayjs().format('YYYY-MM-DDTHH:mm')
    const newHistory = {
        date: now,
        description: { 
            en: 'A fork of version (' + oldVersion +  ') with version ID (' + oldVersionId + ') titled: "' + fork.content.title + '" on ' + now + '.',
            es: 'Una bifurcación de la versión (' + oldVersion +  ') con versión ID (' + oldVersionId + ') titulado: "' + fork.content.title + '" en ' + now + '.',
            pt: 'Uma bifurcação da versão (' + oldVersion +  ') com versão ID (' + oldVersionId + ') intitulado: "' + fork.content.title + '" em ' + now + '.',
        },
        version: newVersion,
        author: getUserName(),
        contactInfo: getUserEmail()
    }
    fork.history.unshift(newHistory)

    console.log('newVersion', fork)

    return fork
}


export function wordCase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
  
export function sortByName(array) {
    return array.sort((a, b) => {
        if (a.name.en < b.name.en) {
            return -1;
        }
        if (a.name.en > b.name.en) {
            return 1;
        }
        return 0;
    });
}

export function mergeArrays(arr1, arr2, key) {
    const map = new Map();
  
    // Add all elements from the first array to the map
    arr1.forEach(item => map.set(item[key], item));
  
    // Add all elements from the second array to the map
    // This will overwrite duplicates based on the specified key
    arr2.forEach(item => map.set(item[key], item));
  
    // Convert the map back to an array
    return Array.from(map.values());
}

export function getLatestDate(arr) {
    if (Array.isArray(arr)) {
        return arr.reduce((latest, current) => {
            const latestDate = dayjs(latest.minDate);
            const currentDate = dayjs(current.minDate);
            return currentDate.isAfter(latestDate) ? current : latest;
        }).minDate
    } else {
        return null
    }
}

export function updateLocalStorage(arr) {
    // GET LOCAL STORE AND UPDATE WITH NEW DATA
    let newLocal
    const localLatestItem = JSON.parse(localStorage.getItem('latestItems'))
    if (localLatestItem) {
        newLocal = mergeArrays(localLatestItem, arr, "majId")
    } else {
        newLocal = arr
    }
    localStorage.setItem('latestItems', JSON.stringify(newLocal))
    return newLocal
}

export function urlizeString( str ){
    if (str) {
        // Convert to lowercase
        str = str.toLowerCase();
        // Remove special characters
        str = str.replace(/[^a-z0-9\s-]/g, '-');
        // Replace spaces with hyphens
        str = str.replace(/\s+/g, '-');
        // Remove double hyphens
        str = str.replace(/-{2,}/g, '-');
        // Remove leading and trailing hyphens
        str = str.replace(/^-+|-+$/g, '');
        return str;
    } else {
        return "-"
    }

    // const stopWords = new Set([
    //     'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 
    //     'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 
    //     'were', 'will', 'with'
    // ]);
}