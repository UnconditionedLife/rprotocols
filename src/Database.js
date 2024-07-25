import dayjs from "dayjs"
import { mergeArrays, updateLocalStorage } from "./GlobalFunctions"
import { getAllNeeds } from "./NeedsDatabase"
import { getLatestStoredInfo } from "./Studio/StudioFunctions"

const dbUrl = "https://d61l6zqpvl.execute-api.us-west-2.amazonaws.com/prod"


export async function dbGetLatestProtocolsAsync(year, date) {
    const paramsObj= { year: year, sinceDate: date }
    return await dbGetDataAsync( "items", "/items/latest", paramsObj )
}

export async function dbGetAllGuidesAsync() {
    return await dbGetDataAsync("guides", "/guides/")
}

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

// TODO THESE NEED TO BE RUN BEFORE AND AFTER THE DATA ARRIVES
function sanitizeInput(input) {
    return input.replace(/\\/g, '__BACKSLASH__')
        .replace(/\n/g, '__NEWLINE__')
        .replace(/"/g, '__QUOTE__');
}

function restoreInput(input) {
    return input.replace(/__BACKSLASH__/g, '\\')
        .replace(/__NEWLINE__/g, '\n')
        .replace(/__QUOTE__/g, '"');
}
// TODO THESE NEED TO BE RUN BEFORE AND AFTER THE DATA ARRIVES


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
        if (items.length > 0) allItems = updateLocalStorage(items)
        
        // console.log("ALL ITEMS", allItems)
             
        return allItems
    })
}

export function getGuides() {
    
    const guides = [
        {
            // "header": {
            "iId": "018g5743-39c2-7f01-h22d-b149a13ws82a0",
            "type": "Guide",
            "subType": "",
            "majId": "G.018g5743-39c2-7f01-h22d-b149a13ws82a0" + ".1",
            "minId": "G.018g5743-39c2-7f01-h22d-b149a13ws82a0" + ".1.0",
            "verNum": 1.0,
            "deleted": false,
            "tags": {
                "en": "job, employment, employee, contract, hiring, agreement"
            },
            "description": {
                "en": "Protocol for defining the employment agreement in a traditional hierarchical organization.",
                "es": "Protocolo para definir el acuerdo de empleo en una organización jerárquica tradicional.",
                "pt": "Protocolo para definir o acordo de emprego em uma organização hierárquica tradicional."
            },
            "needTitle": {
                "en": "Employment Agreement",
                "es": "Acuerdo de Empleo",
                "pt": "Acordo de Emprego"
            },
            "needMinId": "018f3e6d-2a9d-4c28-ae9d-bd1a72ec1f75",
            // },
            "history": [
                {
                    "minDate": "2024-07-01T19:49",
                    "author": "Jose Leal",
                    "contactInfo": "jleal67@gmail.com",
                    "description": {
                        "en": "Creation of the employment agreement protocol.",
                        "es": "Creación del protocolo de acuerdo de empleo.",
                        "pt": "Criação do protocolo de acordo de emprego."
                    },
                    "verNum": "1.0",
                    "minId": ""
                }
            ],
            "title": {
                "en": "Employment Agreement Protocol",
                "es": "Protocolo de Acuerdo de Empleo",
                "pt": "Protocolo de Acordo de Emprego"
            },
            "regions": [
                {
                    "level": 'continent',
                    "location": 'GB'
                },
                {
                    "level": 'nation',
                    "location": 'GB'
                },
            ],
            "intro": {
                "en": "This protocol outlines the procedures and clauses necessary to establish an employment agreement in a traditional hierarchical organization.",
                "es": "Este protocolo describe los procedimientos y cláusulas necesarias para establecer un acuerdo de empleo en una organización jerárquica tradicional.",
                "pt": "Este protocolo descreve os procedimentos e cláusulas necessárias para estabelecer um acordo de emprego em uma organização hierárquica tradicional."
            },
            "protocols": [
                {
                    "title": {
                        "en": "Job Title and Description",
                        "es": "Título y Descripción de Trabajo",
                        "pt": "Título e Descrição de Trabalho"
                    },
                    "minId": "018g5743-39c2-7f01-h22d-b149a13ws82a1"
                },
                {
                    "title": {
                        "en": "Compensation and Benefits",
                        "es": "Compensación y Beneficios",
                        "pt": "Compensação e Benefícios"
                    },
                    "minId": "018g5743-39c2-7f01-h22d-b149a13ws82a2"
                },
                {
                    "title": {
                        "en": "Work Schedule and Hours",
                        "es": "Horario de Trabajo y Horas",
                        "pt": "Horário de Trabalho e Horas"
                    },
                    "minId": "018g5743-39c2-7f01-h22d-b149a13ws82a3"
                },
                {
                    "title": {
                        "en": "Duties and Responsibilities",
                        "es": "Deberes y Responsabilidades",
                        "pt": "Deveres e Responsabilidades"
                    },
                    "minId": "018g5743-39c2-7f01-h22d-b149a13ws82a4"
                },
                {
                    "title": {
                        "en": "Performance Expectations",
                        "es": "Expectativas de Desempeño",
                        "pt": "Expectativas de Desempenho"
                    },
                    "minId": "018g5743-39c2-7f01-h22d-b149a13ws82a5"
                },
                {
                    "title": {
                        "en": "Probationary Period",
                        "es": "Período de Prueba",
                        "pt": "Período Probatório"
                    },
                    "minId": "018g5743-39c2-7f01-h22d-b149a13ws82a6"
                },
                {
                    "title": {
                        "en": "Confidentiality and Non-Disclosure",
                        "es": "Confidencialidad y No Divulgación",
                        "pt": "Confidencialidade e Não Divulgação"
                    },
                    "minId": "018g5743-39c2-7f01-h22d-b149a13ws82a7"
                },
                {
                    "title": {
                        "en": "Non-Compete Clauses",
                        "es": "Cláusulas de No Competencia",
                        "pt": "Cláusulas de Não Concorrência"
                    },
                    "minId": "018g5743-39c2-7f01-h22d-b149a13ws82a8"
                },
                {
                    "title": {
                        "en": "Leave Policies",
                        "es": "Políticas de Licencia",
                        "pt": "Políticas de Licença"
                    },
                    "minId": "018g5743-39c2-7f01-h22d-b149a13ws82a9"
                },
                {
                    "title": {
                        "en": "Termination Conditions",
                        "es": "Condiciones de Terminación",
                        "pt": "Condições de Rescisão"
                    },
                    "minId": "018g5743-39c2-7f01-h22d-b149a13ws82b0"
                },
                {
                    "title": {
                        "en": "Dispute Resolution",
                        "es": "Resolución de Disputas",
                        "pt": "Resolução de Disputas"
                    },
                    "minId": "018g5743-39c2-7f01-h22d-b149a13ws82b1"
                },
                {
                    "title": {
                        "en": "Amendment Procedures",
                        "es": "Procedimientos de Enmienda",
                        "pt": "Procedimentos de Emenda"
                    },
                    "minId": "018g5743-39c2-7f01-h22d-b149a13ws82b2"
                }
            ],
            "closing": {
                "en": "This set of protocols aims to ensure that all parties understand and adhere to the expectations and responsibilities within the organization.",
                "es": "Este conjunto de protocolos tiene como objetivo asegurar que todas las partes comprendan y cumplan con las expectativas y responsabilidades dentro de la organización.",
                "pt": "Este conjunto de protocolos visa garantir que todas as partes compreendam e cumpram as expectativas e responsabilidades dentro da organização."
            },
            "attribComment" : { en: "", es: "", pt: "" },
            "attribLink": "",
            "discuss": {
                "purpose": {
                    "en": "To standardize and document all aspects of the employment agreement to promote clarity and compliance.",
                    "es": "Estandarizar y documentar todos los aspectos del acuerdo de empleo para promover la claridad y el cumplimiento.",
                    "pt": "Padronizar e documentar todos os aspectos do acordo de emprego para promover clareza e conformidade."
                },
                "comments": {
                    "en": "Review and update this protocol annually.",
                    "es": "Revisar y actualizar este protocolo anualmente.",
                    "pt": "Revisar e atualizar este protocolo anualmente."
                }
            }
        },
        // {
        //     // "header": {
        //     "iId": "018g5743-39c2-7f01-h22d-b149a13xx82a0",
        //     "type": "Guide",
        //     "subType": "",
        //     "majId": "G.018g5743-39c2-7f01-h22d-b149a13xx82a0" + ".1",
        //     "minId": "G.018g5743-39c2-7f01-h22d-b149a13xx82a0" + ".1.0",
        //     "verNum": 1.0,
        //     "deleted": false,
        //     "versionNum": "1.0",
        //     "versionId": "v1",
        //     "description": {
        //         "en": "Protocol for defining the employment agreement in a traditional hierarchical organization.",
        //         "es": "Protocolo para definir el acuerdo de empleo en una organización jerárquica tradicional.",
        //         "pt": "Protocolo para definir o acordo de emprego em uma organização hierárquica tradicional."
        //     },
        //     "needTitle": {
        //         "en": "Employment Agreement",
        //         "es": "Acuerdo de Empleo",
        //         "pt": "Acordo de Emprego"
        //     },
        //     "needMinId": "018f3e6d-2a9d-4c28-ae9d-bd1a72ec1f75",
        //     // },
        //     "history": [
        //         {
        //             "minDate": "2024-07-01T19:49",
        //             "author": "Jose Leal",
        //             "contactInfo": "jleal67@gmail.com",
        //             "description": {
        //                 "en": "Creation of the employment agreement protocol.",
        //                 "es": "Creación del protocolo de acuerdo de empleo.",
        //                 "pt": "Criação do protocolo de acordo de emprego."
        //             },
        //             "verNum": "1.0",
        //             "minId": ""
        //         }
        //     ],
        //     "title": {
        //         "en": "Employment Agreement Protocol",
        //         "es": "Protocolo de Acuerdo de Empleo",
        //         "pt": "Protocolo de Acordo de Emprego"
        //     },
        //     "regions": [
        //         {
        //             "level": 'continent',
        //             "location": 'GB'
        //         },
        //         {
        //             "level": 'nation',
        //             "location": 'GB'
        //         },
        //     ],
        //     "intro": {
        //         "en": "This protocol outlines the procedures and clauses necessary to establish an employment agreement in a traditional hierarchical organization.",
        //         "es": "Este protocolo describe los procedimientos y cláusulas necesarias para establecer un acuerdo de empleo en una organización jerárquica tradicional.",
        //         "pt": "Este protocolo descreve os procedimentos e cláusulas necessárias para estabelecer um acordo de emprego em uma organização hierárquica tradicional."
        //     },
        //     "protocols": [
        //         {
        //             "title": {
        //                 "en": "Job Title and Description",
        //                 "es": "Título y Descripción de Trabajo",
        //                 "pt": "Título e Descrição de Trabalho"
        //             },
        //             "minId": "018g5743-39c2-7f01-h22d-b149a13ws82a1"
        //         },
        //         {
        //             "title": {
        //                 "en": "Compensation and Benefits",
        //                 "es": "Compensación y Beneficios",
        //                 "pt": "Compensação e Benefícios"
        //             },
        //             "minId": "018g5743-39c2-7f01-h22d-b149a13ws82a2"
        //         },
        //         {
        //             "title": {
        //                 "en": "Work Schedule and Hours",
        //                 "es": "Horario de Trabajo y Horas",
        //                 "pt": "Horário de Trabalho e Horas"
        //             },
        //             "minId": "018g5743-39c2-7f01-h22d-b149a13ws82a3"
        //         },
        //         {
        //             "title": {
        //                 "en": "Duties and Responsibilities",
        //                 "es": "Deberes y Responsabilidades",
        //                 "pt": "Deveres e Responsabilidades"
        //             },
        //             "minId": "018g5743-39c2-7f01-h22d-b149a13ws82a4"
        //         },
        //         {
        //             "title": {
        //                 "en": "Performance Expectations",
        //                 "es": "Expectativas de Desempeño",
        //                 "pt": "Expectativas de Desempenho"
        //             },
        //             "minId": "018g5743-39c2-7f01-h22d-b149a13ws82a5"
        //         },
        //         {
        //             "title": {
        //                 "en": "Probationary Period",
        //                 "es": "Período de Prueba",
        //                 "pt": "Período Probatório"
        //             },
        //             "minId": "018g5743-39c2-7f01-h22d-b149a13ws82a6"
        //         },
        //         {
        //             "title": {
        //                 "en": "Confidentiality and Non-Disclosure",
        //                 "es": "Confidencialidad y No Divulgación",
        //                 "pt": "Confidencialidade e Não Divulgação"
        //             },
        //             "minId": "018g5743-39c2-7f01-h22d-b149a13ws82a7"
        //         },
        //         {
        //             "title": {
        //                 "en": "Non-Compete Clauses",
        //                 "es": "Cláusulas de No Competencia",
        //                 "pt": "Cláusulas de Não Concorrência"
        //             },
        //             "minId": "018g5743-39c2-7f01-h22d-b149a13ws82a8"
        //         },
        //         {
        //             "title": {
        //                 "en": "Leave Policies",
        //                 "es": "Políticas de Licencia",
        //                 "pt": "Políticas de Licença"
        //             },
        //             "minId": "018g5743-39c2-7f01-h22d-b149a13ws82a9"
        //         },
        //         {
        //             "title": {
        //                 "en": "Termination Conditions",
        //                 "es": "Condiciones de Terminación",
        //                 "pt": "Condições de Rescisão"
        //             },
        //             "minId": "018g5743-39c2-7f01-h22d-b149a13ws82b0"
        //         },
        //         {
        //             "title": {
        //                 "en": "Dispute Resolution",
        //                 "es": "Resolución de Disputas",
        //                 "pt": "Resolução de Disputas"
        //             },
        //             "minId": "018g5743-39c2-7f01-h22d-b149a13ws82b1"
        //         },
        //         {
        //             "title": {
        //                 "en": "Amendment Procedures",
        //                 "es": "Procedimientos de Enmienda",
        //                 "pt": "Procedimentos de Emenda"
        //             },
        //             "minId": "018g5743-39c2-7f01-h22d-b149a13ws82b2"
        //         }
        //     ],
        //     "closing": {
        //         "en": "This set of protocols aims to ensure that all parties understand and adhere to the expectations and responsibilities within the organization.",
        //         "es": "Este conjunto de protocolos tiene como objetivo asegurar que todas las partes comprendan y cumplan con las expectativas y responsabilidades dentro de la organización.",
        //         "pt": "Este conjunto de protocolos visa garantir que todas as partes compreendam e cumpram as expectativas e responsabilidades dentro da organização."
        //     },
        //     "attribComment" : { en: "", es: "", pt: "" },
        //     "attribLink": "",
        //     "discuss": {
        //         "purpose": {
        //             "en": "To standardize and document all aspects of the employment agreement to promote clarity and compliance.",
        //             "es": "Estandarizar y documentar todos los aspectos del acuerdo de empleo para promover la claridad y el cumplimiento.",
        //             "pt": "Padronizar e documentar todos os aspectos do acordo de emprego para promover clareza e conformidade."
        //         },
        //         "comments": {
        //             "en": "Review and update this protocol annually.",
        //             "es": "Revisar y actualizar este protocolo anualmente.",
        //             "pt": "Revisar e atualizar este protocolo anualmente."
        //         }
        //     },
        //     "tags": {
        //         "en": "",
        //         "es": "",
        //         "pt": ""
        //     }
        // },
    ]
    return guides
}