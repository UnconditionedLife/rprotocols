import dayjs, { Dayjs } from "dayjs"
import { mergeArrays, updateLocalStorage } from "./GlobalFunctions"
import { getLatestStoredInfo, restoreObject } from "./Studio/StudioFunctions"

const dbUrl = "https://d61l6zqpvl.execute-api.us-west-2.amazonaws.com/prod"


export async function dbGetLatestProtocolsAsync(year, date) {
    const paramsObj= { year: year, sinceDate: date }
    return await dbGetDataAsync( "items", "/items/latest", paramsObj )
}

// export async function dbGetAllGuidesAsync() {
//     return await dbGetDataAsync("guides", "/guides/")
// }

export async function dbGetAllUsersAsync() {
    return await dbGetDataAsync("users", "/users/")
}

export async function dbSaveItemAsync(data) {
    // dbSetModifiedTime(data, false);
    return await dbPostDataAsync("/items/all", data).then(
        await dbPostDataAsync("/items/latest", data)
    )
    
}

export async function dbSaveUserAsync(data) {
    dbSetModifiedTime(data, false);
    return await dbPostDataAsync("/users/", data)
}

//******************* UTILITIES *******************
//*************************************************

export function dbSetModifiedTime(obj, isNew) {
    const now = dayjs().format('YYYY-MM-DDTHH:mm');
    obj.updatedDateTime = now;
    if (isNew)
        obj.createdDateTime = now;
}

const httpCodes = [
    { code: 200, msg: 'Success' },
    { code: 400, msg: 'Bad Request Exception' },
    { code: 401, msg: 'Authentication Failed' },
    { code: 403, msg: 'Access Denied Exception' },
    { code: 404, msg: 'Not Found Exception' },
    { code: 409, msg: 'Conflict Exception' },
    { code: 413, msg: 'Request Too Large' },
    { code: 429, msg: 'API Configuration Error/Throttled' },
    { code: 500, msg: 'Internal Server Error' },
    { code: 502, msg: 'Bad Gateway Exception' },
    { code: 503, msg: 'Service Unavailable Exception' },
    { code: 504, msg: 'Endpoint Request Timed-out Exception' },
];

function httpMessage(result) {
    let match = httpCodes.find(x => x.code == result);
    if (match)
        return match.msg;
    else
        return 'Unknown Error ' + result;
}

// convert LastEvaluatedKey to map
function stringToMap(string) {
    let newString = string.replaceAll('{', '{"')
    newString = newString.replaceAll('={', '":{')
    newString = newString.replaceAll('=', '":"')
    newString = newString.replaceAll('}', '"}')
    newString = newString.replaceAll('}"}', '}}')
    newString = newString.replaceAll(', ', ', "')
    return newString
}


async function dbPostDataAsync(subUrl, data, logErrors = true) {
    return fetch(dbUrl + subUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": '',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                const message = httpMessage(response.status);
                return Promise.reject(message);
            }
        })
        .then(json => {
            if (json.message) {
                return Promise.reject(json.message);
            } else {
                return Promise.resolve(json);
            }
        })
        .catch((error) => {
            if (logErrors) {
                // globalMsgFunc('error', 'Database Failure');
            }
            return Promise.reject(error);
        })
}

async function dbGetDataAsync(arrayName, subUrl, paramObj=null) {
    let lastKey = null;
    let allData = [];
    do {
        const queryParams = (lastKey) ? { ...paramObj, lastkey: lastKey } : paramObj;
        const dataPage = await dbGetDataPageAsync(subUrl, queryParams)
            .then(data => {
                lastKey = data.LastEvaluatedKey ? stringToMap(data.LastEvaluatedKey) : null;
                return data[arrayName];
            })
        allData = allData.concat(dataPage);
    } while (lastKey != null);
    return allData;
}

async function dbGetDataPageAsync(subUrl, paramObj) {
    const params = (paramObj) ? "?" + new URLSearchParams(paramObj) : "";
    return await fetch(dbUrl + subUrl + params, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "",
        }
    })
        .then(response => {
            if (response.ok) {
                return Promise.resolve(response.json());
            } else {
                const message = httpMessage(response.status);
                return Promise.reject(message);
            }
        })
        .catch((error) => {
            console.log('dbGetData Error: ' + JSON.stringify(error));
            // globalMsgFunc('error', 'Error while loading - try again!!') 
            Promise.reject(error);
        })
}

export function getDbAsync() {
    const latestLocal = getLatestStoredInfo()
        
    // **** TODO **** IF YEAR > 2024 THEN NEED TO DO MULTIPLE SEARCHES ONE PER YEAR
    // console.log('latestLocal', latestLocal)
    // console.log('year', latestLocal.year)
    // console.log('sinceDate', latestLocal.sinceDate)

    return dbGetLatestProtocolsAsync(latestLocal.year, latestLocal.sinceDate ).then((items) => {
        let allItems = latestLocal.items

        //RESTORE SPECIAL CHARACTERS
        const restoredItems = []
        items.forEach( item => {
            restoredItems.push(restoreObject(item))
        })

        // MERGE DB AND LOCAL STORAGE
        if (items.length > 0) 
            allItems = updateLocalStorage(restoredItems)
        
        // console.log("ALL ITEMS", allItems, dayjs().valueOf())
             
        return allItems
    })
}