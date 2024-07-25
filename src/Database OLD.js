import dayjs from "dayjs"

const dbUrl = "https://d61l6zqpvl.execute-api.us-west-2.amazonaws.com/prod"


export async function dbGetAllProtocolsAsync() {
    return await dbGetDataAsync("protocols", "/protocols/")
}

export async function dbGetAllGuidesAsync() {
    return await dbGetDataAsync("guides", "/guides/")
}

export async function dbGetAllUsersAsync() {
    return await dbGetDataAsync("users", "/users/")
}

export async function dbSaveProtocolAsync(data) {
    dbSetModifiedTime(data, false);
    return await dbPostDataAsync("/protocols/", data)
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

async function dbGetDataAsync(arrayName, subUrl, paramObj = null) {
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
    return dbGetAllProtocolsAsync().then((p) => {
        // console.log("db protos", p)
        let db = {
            sectors:
                [
                    {
                        "id": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                        "name": {
                            "en": "Economic & Organizational",
                            "es": "Económico y Organizacional",
                            "pt": "Econômico e Organizacional"
                        },
                        "created": 1714430344181,
                        "deleted": false,
                        "keywords": {
                            "en": "Companies, Business, Markets, Work, Industry, Commercial",
                            "es": "Empresas, Negocios, Mercados, Trabajo, Industria, Comercial",
                            "pt": "Empresas, Negócios, Mercados, Trabalho, Indústria, Comercial"
                        },
                        "isSector": true,
                        "description": {
                            "en": "Encompasses spaces and systems for economic transactions and work activities, impacting livelihoods, economic stability, and growth.",
                            "es": "Abarca espacios y sistemas para transacciones económicas y actividades laborales, impactando los medios de vida, la estabilidad económica y el crecimiento.",
                            "pt": "Abrange espaços e sistemas para transações econômicas e atividades de trabalho, impactando os meios de subsistência, a estabilidade econômica e o crescimento."
                        }
                    },
                    {
                        "id": "018f2c04-b8a3-7bf6-a1e5-9709f203d640",
                        "name": {
                            "en": "Crisis & Emergency",
                            "es": "Crisis y Emergencia",
                            "pt": "Crise e Emergência"
                        },
                        "created": 1714430380091,
                        "deleted": false,
                        "updated": 1715140859356,
                        "keywords": {
                            "en": "crisis, emergency, disaster",
                            "es": "crisis, emergencia, desastre",
                            "pt": "crise, emergência, desastre"
                        },
                        "isSector": true,
                        "description": {
                            "en": "Involves critical situations requiring immediate responses to manage disasters, emergencies, or crises, focusing on preserving life and maintaining societal functions.",
                            "es": "Involucra situaciones críticas que requieren respuestas inmediatas para gestionar desastres, emergencias o crisis, enfocándose en preservar la vida y mantener las funciones sociales.",
                            "pt": "Envolve situações críticas que necessitam de respostas imediatas para gerenciar desastres, emergências ou crises, focando na preservação da vida e na manutenção das funções sociais."
                        }
                    },
                    {
                        "id": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                        "name": {
                            "en": "Cultural",
                            "es": "Cultural",
                            "pt": "Cultural"
                        },
                        "created": 1714430458049,
                        "deleted": false,
                        "isSector": true,
                        "description": {
                            "en": "Cultural contexts are the arenas in which cultural, artistic, and historical activities and expressions take place, enriching personal identity and communal heritage while fostering cultural exchange and appreciation.",
                            "es": "Los contextos Culturales son los espacios en los que tienen lugar actividades y expresiones culturales, artísticas e históricas, enriqueciendo la identidad personal y el patrimonio comunitario mientras se fomenta el intercambio y la apreciación cultural.",
                            "pt": "Os contextos Culturais são as arenas em que ocorrem atividades e expressões culturais, artísticas e históricas, enriquecendo a identidade pessoal e o patrimônio comunitário, enquanto promovem a troca e a apreciação cultural."
                        }
                    },
                    {
                        "id": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                        "name": {
                            "en": "Environmental",
                            "es": "Ambiental",
                            "pt": "Ambiental"
                        },
                        "created": 1714430510056,
                        "deleted": false,
                        "isSector": true,
                        "description": {
                            "en": "Environmental contexts focus on interactions with the natural and built environment, including efforts to preserve natural spaces and manage urban settings, which are crucial for sustainability and quality of life.",
                            "es": "Los contextos Ambientales se centran en las interacciones con el entorno natural y construido, incluyendo esfuerzos para preservar espacios naturales y gestionar entornos urbanos, que son cruciales para la sostenibilidad y la calidad de vida.",
                            "pt": "Os contextos Ambientais se concentram nas interações com o ambiente natural e construído, incluindo esforços para preservar espaços naturais e gerenciar ambientes urbanos, que são cruciais para a sustentabilidade e a qualidade de vida."
                        }
                    },
                    {
                        "id": "018f2c07-bbf1-72de-a998-365fdce74927",
                        "name": {
                            "en": "Health & Wellbeing",
                            "es": "Salud y Bienestar",
                            "pt": "Saúde e Bem-estar"
                        },
                        "created": 1714430570568,
                        "deleted": false,
                        "isSector": true,
                        "description": {
                            "en": "Health & Wellbeing contexts are concerned with areas affecting physical, mental, and social health, encompassing medical institutions, wellness programs, and supportive networks that aid in maintaining and improving personal health.",
                            "es": "Los contextos de Salud y Bienestar se ocupan de áreas que afectan la salud física, mental y social, abarcando instituciones médicas, programas de bienestar y redes de apoyo que ayudan a mantener y mejorar la salud personal.",
                            "pt": "Os contextos de Saúde e Bem-estar estão preocupados com áreas que afetam a saúde física, mental e social, abrangendo instituições médicas, programas de bem-estar e redes de apoio que ajudam a manter e melhorar a saúde pessoal."
                        }
                    },
                    {
                        "id": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                        "name": {
                            "en": "Personal & Relational",
                            "es": "Personal y Relacional",
                            "pt": "Pessoal e Relacional"
                        },
                        "created": 1714428883101,
                        "deleted": false,
                        "isSector": true,
                        "description": {
                            "en": "Personal & Relational contexts encompass the intimate and immediate environments where individuals engage in family life, friendships, and other personal relationships that shape their emotional and social development.",
                            "es": "Los contextos Personales y Relacionales abarcan los entornos íntimos e inmediatos donde los individuos se involucran en la vida familiar, amistades y otras relaciones personales que moldean su desarrollo emocional y social.",
                            "pt": "Os contextos Pessoais e Relacionais abrangem os ambientes íntimos e imediatos onde os indivíduos se envolvem na vida familiar, amizades e outras relações pessoais que moldam seu desenvolvimento emocional e social."
                        }
                    },
                    {
                        "id": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                        "name": {
                            "en": "Political & Societal",
                            "es": "Político y Social",
                            "pt": "Político e Social"
                        },
                        "created": 1714430655508,
                        "deleted": false,
                        "isSector": true,
                        "description": {
                            "en": "Political & Societal contexts refer to the structures and systems where political activities, governance, and policy-making occur, impacting the legal and organizational aspects of society that regulate individual and collective behavior.",
                            "es": "Los contextos Políticos y Sociales se refieren a las estructuras y sistemas donde ocurren actividades políticas, gobernanza y formulación de políticas, impactando los aspectos legales y organizativos de la sociedad que regulan el comportamiento individual y colectivo.",
                            "pt": "Os contextos Políticos e Sociais referem-se às estruturas e sistemas onde ocorrem atividades políticas, governança e formulação de políticas, impactando os aspectos legais e organizacionais da sociedade que regulam o comportamento individual e coletivo."
                        }
                    },
                    {
                        "id": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                        "name": {
                            "en": "Technological",
                            "es": "Tecnológico",
                            "pt": "Tecnológico"
                        },
                        "created": 1714430742444,
                        "deleted": false,
                        "isSector": true,
                        "description": {
                            "en": "Technological contexts include environments and platforms where technological interactions and innovations occur, significantly affecting how individuals work, communicate, and entertain themselves in a modern digital world.",
                            "es": "Los contextos Tecnológicos incluyen entornos y plataformas donde ocurren interacciones e innovaciones tecnológicas, afectando significativamente cómo los individuos trabajan, se comunican y se entretienen en un mundo digital moderno.",
                            "pt": "Os contextos Tecnológicos incluem ambientes e plataformas onde ocorrem interações e inovações tecnológicas, afetando significativamente como os indivíduos trabalham, se comunicam e se divertem em um mundo digital moderno."
                        }
                    }
                ],
            domains: [
                {
                    "id": "9iu63c0e-ddcf-fer5-b82d-45dr56da020o",
                    "name": {
                        "en": "Artistic Expression",
                        "es": "Expresión Artística",
                        "pt": "Expressão Artística"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "description": {
                        "en": "The creation and display of visual art forms such as painting, sculpture, and photography, allowing individuals to convey emotions, ideas, and cultural narratives.",
                        "es": "La creación y exhibición de formas de arte visual como pintura, escultura y fotografía, permitiendo a los individuos transmitir emociones, ideas y narrativas culturales.",
                        "pt": "A criação e exibição de formas de arte visual, como pintura, escultura e fotografia, permitindo que os indivíduos expressem emoções, ideias e narrativas culturais."
                    }
                },
                {
                    "id": "3df63c0e-ddcf-fer5-b82d-45dr56da020o",
                    "name": {
                        "en": "Cultural Heritage",
                        "es": "Patrimonio Cultural",
                        "pt": "Patrimônio Cultural"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "description": {
                        "en": "Preserving and celebrating traditions, artifacts, and practices that reflect a community’s history and identity, fostering a sense of belonging and continuity.",
                        "es": "Preservar y celebrar tradiciones, artefactos y prácticas que reflejan la historia e identidad de una comunidad, fomentando un sentido de pertenencia y continuidad.",
                        "pt": "Preservar e celebrar tradições, artefatos e práticas que refletem a história e identidade de uma comunidade, promovendo um senso de pertencimento e continuidade."
                    }
                },
                {
                    "id": "mjg53c0e-ddcf-fer5-b82d-45dr56da020o",
                    "name": {
                        "en": "Literary Activities",
                        "es": "Actividades Literarias",
                        "pt": "Atividades Literárias"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "description": {
                        "en": "Writing, reading, and discussing literature, promoting literacy, creativity, and cultural exchange through diverse written works.",
                        "es": "Escribir, leer y discutir literatura, promoviendo la alfabetización, la creatividad y el intercambio cultural a través de obras escritas diversas.",
                        "pt": "Escrever, ler e discutir literatura, promovendo a alfabetização, a criatividade e o intercâmbio cultural por meio de obras escritas diversas."
                    }
                },
                {
                    "id": "7bht53c0e-ddcf-fer5-b82d-45dr56da020o",
                    "name": {
                        "en": "Musical Performance",
                        "es": "Actuación Musical",
                        "pt": "Apresentação Musical"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "description": {
                        "en": "The composition, execution, and appreciation of music, providing a platform for cultural expression and emotional connection through sound.",
                        "es": "La composición, ejecución y apreciación de la música, proporcionando una plataforma para la expresión cultural y la conexión emocional a través del sonido.",
                        "pt": "A composição, execução e apreciação da música, proporcionando uma plataforma para a expressão cultural e conexão emocional através do som."
                    }
                },
                {
                    "id": "2dy53c0e-ddcf-fer5-b82d-45dr56da020o",
                    "name": {
                        "en": "Theater & Drama",
                        "es": "Teatro y Drama",
                        "pt": "Teatro e Drama"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "description": {
                        "en": "The creation and performance of plays and theatrical productions, offering a medium for storytelling, cultural commentary, and artistic collaboration.",
                        "es": "La creación y representación de obras de teatro y producciones teatrales, ofreciendo un medio para la narración de historias, el comentario cultural y la colaboración artística.",
                        "pt": "A criação e performance de peças e produções teatrais, oferecendo um meio para contar histórias, comentário cultural e colaboração artística."
                    }
                },
                {
                    "id": "018f3c0e-ddcf-78d0-12wd-45dr56da020o",
                    "name": {
                        "en": "Conservation Efforts",
                        "es": "Esfuerzos de Conservación",
                        "pt": "Esforços de Conservação"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "description": {
                        "en": "Preserving natural resources and habitats, promoting biodiversity, and protecting ecosystems from degradation and exploitation.",
                        "es": "Preservar los recursos naturales y los hábitats, promover la biodiversidad y proteger los ecosistemas de la degradación y la explotación.",
                        "pt": "Preservar os recursos naturais e habitats, promover a biodiversidade e proteger os ecossistemas da degradação e exploração."
                    }
                },
                {
                    "id": "018f3c0e-ddcf-78d0-23f5-45dr56da020o",
                    "name": {
                        "en": "Sustainable Practices",
                        "es": "Prácticas Sostenibles",
                        "pt": "Práticas Sustentáveis"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "description": {
                        "en": "Adopting eco-friendly methods and technologies to reduce environmental impact, ensure resource efficiency, and promote long-term ecological balance.",
                        "es": "Adoptar métodos y tecnologías ecológicas para reducir el impacto ambiental, garantizar la eficiencia de los recursos y promover el equilibrio ecológico a largo plazo.",
                        "pt": "Adotar métodos e tecnologias ecologicamente corretos para reduzir o impacto ambiental, garantir a eficiência dos recursos e promover o equilíbrio ecológico a longo prazo."
                    }
                },
                {
                    "id": "018f3c0e-ddcf-78d0-77gh-45dr56da020o",
                    "name": {
                        "en": "Urban Planning",
                        "es": "Planificación Urbana",
                        "pt": "Planejamento Urbano"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "description": {
                        "en": "Designing and managing urban spaces to promote sustainable development, enhance livability, and reduce environmental impact through smart growth strategies.",
                        "es": "Diseñar y gestionar espacios urbanos para promover el desarrollo sostenible, mejorar la habitabilidad y reducir el impacto ambiental a través de estrategias de crecimiento inteligente.",
                        "pt": "Projetar e gerenciar espaços urbanos para promover o desenvolvimento sustentável, melhorar a habitabilidade e reduzir o impacto ambiental por meio de estratégias de crescimento inteligente."
                    }
                },
                {
                    "id": "018f3c0e-ddcf-78d0-dt45-45dr56da020o",
                    "name": {
                        "en": "Wildlife Protection",
                        "es": "Protección de la Vida Silvestre",
                        "pt": "Proteção da Vida Selvagem"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "description": {
                        "en": "Focused on safeguarding animal species and their habitats from threats such as poaching, habitat loss, and climate change to ensure biodiversity conservation.",
                        "es": "Enfocado en proteger las especies animales y sus hábitats de amenazas como la caza furtiva, la pérdida de hábitat y el cambio climático para asegurar la conservación de la biodiversidad.",
                        "pt": "Focado em proteger espécies animais e seus habitats de ameaças como caça furtiva, perda de habitat e mudanças climáticas para garantir a conservação da biodiversidade."
                    }
                },
                {
                    "id": "018f3c0e-ddcf-78d0-gft5-45dr56da020o",
                    "name": {
                        "en": "Water Management",
                        "es": "Gestión del Agua",
                        "pt": "Gestão da Água"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "description": {
                        "en": "Strategies and practices to efficiently use, protect, and sustain water resources, ensuring availability and quality for various needs while maintaining ecological health.",
                        "es": "Estrategias y prácticas para usar, proteger y mantener los recursos hídricos de manera eficiente, asegurando la disponibilidad y calidad para diversas necesidades mientras se mantiene la salud ecológica.",
                        "pt": "Estratégias e práticas para usar, proteger e sustentar os recursos hídricos de forma eficiente, garantindo disponibilidade e qualidade para diversas necessidades enquanto mantém a saúde ecológica."
                    }
                },
                {
                    "id": "018f3c0e-ddcf-gh78-b82d-4578adcda020o",
                    "name": {
                        "en": "Mental Health Services",
                        "es": "Servicios de Salud Mental",
                        "pt": "Serviços de Saúde Mental"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "description": {
                        "en": "Professional support and treatment for mental health issues, including counseling, therapy, and psychiatric care, aimed at improving emotional and psychological well-being.",
                        "es": "Apoyo profesional y tratamiento para problemas de salud mental, incluyendo asesoramiento, terapia y atención psiquiátrica, destinados a mejorar el bienestar emocional y psicológico.",
                        "pt": "Apoio profissional e tratamento para problemas de saúde mental, incluindo aconselhamento, terapia e cuidados psiquiátricos, com o objetivo de melhorar o bem-estar emocional e psicológico."
                    }
                },
                {
                    "id": "018f3c0e-ddcf-yu65-b82d-4578adcda020o",
                    "name": {
                        "en": "Nutritional Support",
                        "es": "Apoyo Nutricional",
                        "pt": "Apoio Nutricional"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "description": {
                        "en": "Providing guidance and resources for healthy eating, addressing dietary needs to enhance overall health, prevent disease, and support physical and mental well-being.",
                        "es": "Proporcionar orientación y recursos para una alimentación saludable, abordando las necesidades dietéticas para mejorar la salud general, prevenir enfermedades y apoyar el bienestar físico y mental.",
                        "pt": "Fornecer orientação e recursos para uma alimentação saudável, abordando necessidades dietéticas para melhorar a saúde geral, prevenir doenças e apoiar o bem-estar físico e mental."
                    }
                },
                {
                    "id": "018f3c0e-ddcf-ji98-b82d-4578adcda020o",
                    "name": {
                        "en": "Physical Fitness",
                        "es": "Aptitud Física",
                        "pt": "Aptidão Física"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "description": {
                        "en": "Focused on promoting regular exercise and physical activity to improve health, boost energy levels, and prevent chronic diseases, enhancing overall quality of life.",
                        "es": "Enfocado en promover el ejercicio regular y la actividad física para mejorar la salud, aumentar los niveles de energía y prevenir enfermedades crónicas, mejorando la calidad de vida en general.",
                        "pt": "Focado em promover o exercício regular e a atividade física para melhorar a saúde, aumentar os níveis de energia e prevenir doenças crônicas, melhorando a qualidade de vida geral."
                    }
                },
                {
                    "id": "018f3c0e-ddcf-df45-b82d-4578adcda020o",
                    "name": {
                        "en": "Public Health Initiatives",
                        "es": "Iniciativas de Salud Pública",
                        "pt": "Iniciativas de Saúde Pública"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "description": {
                        "en": "Community-wide efforts to prevent disease, promote healthy behaviors, and protect public health through education, policy, and services.",
                        "es": "Esfuerzos a nivel comunitario para prevenir enfermedades, promover comportamientos saludables y proteger la salud pública a través de la educación, políticas y servicios.",
                        "pt": "Esforços comunitários para prevenir doenças, promover comportamentos saudáveis e proteger a saúde pública por meio de educação, políticas e serviços."
                    }
                },
                {
                    "id": "018f3c0e-ddcf-fgiu-b82d-4578adcda020o",
                    "name": {
                        "en": "Wellness Programs",
                        "es": "Programas de Bienestar",
                        "pt": "Programas de Bem-estar"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "description": {
                        "en": "Structured activities and resources designed to improve overall health, reduce stress, and enhance quality of life, often provided by employers or community organizations.",
                        "es": "Actividades y recursos estructurados diseñados para mejorar la salud general, reducir el estrés y mejorar la calidad de vida, a menudo proporcionados por empleadores u organizaciones comunitarias.",
                        "pt": "Atividades e recursos estruturados destinados a melhorar a saúde geral, reduzir o estresse e melhorar a qualidade de vida, frequentemente fornecidos por empregadores ou organizações comunitárias."
                    }
                },
                {
                    "id": "018f3c0e-gh65-78d0-b82d-45dr56da020o",
                    "name": {
                        "en": "Family Dynamics",
                        "es": "Dinámica Familiar",
                        "pt": "Dinâmica Familiar"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "description": {
                        "en": "The relational and emotional interactions within family units, addressing roles, communication patterns, and conflicts to enhance understanding and harmony among family members.",
                        "es": "Las interacciones relacionales y emocionales dentro de las unidades familiares, abordando roles, patrones de comunicación y conflictos para mejorar la comprensión y la armonía entre los miembros de la familia.",
                        "pt": "As interações relacionais e emocionais dentro das unidades familiares, abordando papéis, padrões de comunicação e conflitos para melhorar a compreensão e a harmonia entre os membros da família."
                    }
                },
                {
                    "id": "018f3c0e-sjut-78d0-b82d-45dr56da020o",
                    "name": {
                        "en": "Friendship Networks",
                        "es": "Redes de Amistad",
                        "pt": "Redes de Amizade"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "description": {
                        "en": "The social connections and interactions between friends, fostering support, companionship, and personal growth through shared experiences and mutual understanding.",
                        "es": "Las conexiones sociales y las interacciones entre amigos, fomentando el apoyo, la compañía y el crecimiento personal a través de experiencias compartidas y el entendimiento mutuo.",
                        "pt": "As conexões sociais e interações entre amigos, promovendo apoio, companhia e crescimento pessoal por meio de experiências compartilhadas e compreensão mútua."
                    }
                },
                {
                    "id": "018f3c0e-4r56-78d0-b82d-45dr56da020o",
                    "name": {
                        "en": "Personal Development",
                        "es": "Desarrollo Personal",
                        "pt": "Desenvolvimento Pessoal"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "description": {
                        "en": "Focused on individual growth and self-improvement through activities, education, and experiences that enhance skills, self-awareness, and overall well-being.",
                        "es": "Enfocado en el crecimiento individual y la auto-mejora a través de actividades, educación y experiencias que mejoran las habilidades, la autoconciencia y el bienestar general.",
                        "pt": "Focado no crescimento individual e autoaperfeiçoamento por meio de atividades, educação e experiências que melhoram habilidades, autoconhecimento e bem-estar geral."
                    }
                },
                {
                    "id": "018f3c0e-56rf-78d0-b82d-45dr56da020o",
                    "name": {
                        "en": "Romantic Relationship",
                        "es": "Relación Romántica",
                        "pt": "Relacionamento Romântico"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "description": {
                        "en": "The emotional and physical connections between individuals in a romantic partnership, focusing on intimacy, communication, and mutual support.",
                        "es": "Las conexiones emocionales y físicas entre individuos en una relación romántica, enfocándose en la intimidad, la comunicación y el apoyo mutuo.",
                        "pt": "As conexões emocionais e físicas entre indivíduos em um relacionamento romântico, focando na intimidade, comunicação e apoio mútuo."
                    }
                },
                {
                    "id": "018f3c0e-12g6-78d0-b82d-45dr56da020o",
                    "name": {
                        "en": "Social Support",
                        "es": "Apoyo Social",
                        "pt": "Apoio Social"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "description": {
                        "en": "The assistance and comfort provided by friends, family, and community members, helping individuals cope with stress, challenges, and life changes.",
                        "es": "La asistencia y el consuelo proporcionados por amigos, familiares y miembros de la comunidad, ayudando a los individuos a lidiar con el estrés, los desafíos y los cambios en la vida.",
                        "pt": "A assistência e o conforto fornecidos por amigos, familiares e membros da comunidade, ajudando os indivíduos a lidar com o estresse, desafios e mudanças na vida."
                    }
                },
                {
                    "id": "018f3c0e-f56t-78d0-b82d-45dr56da020o",
                    "name": {
                        "en": "Civic Engagement",
                        "es": "Participación Cívica",
                        "pt": "Engajamento Cívico"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "description": {
                        "en": "Encouraging and enabling citizens to participate actively in political and community activities, fostering a sense of responsibility and involvement in democratic processes and societal development.",
                        "es": "Fomentar y habilitar a los ciudadanos para que participen activamente en actividades políticas y comunitarias, fomentando un sentido de responsabilidad e implicación en los procesos democráticos y el desarrollo social.",
                        "pt": "Incentivar e capacitar os cidadãos a participar ativamente em atividades políticas e comunitárias, promovendo um senso de responsabilidade e envolvimento nos processos democráticos e desenvolvimento social."
                    }
                },
                {
                    "id": "018f3c0e-d6y8-78d0-b82d-45dr56da020o",
                    "name": {
                        "en": "Governance Structures",
                        "es": "Estructuras de Gobernanza",
                        "pt": "Estruturas de Governança"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "description": {
                        "en": "The frameworks and institutions that organize and manage political power and decision-making processes, ensuring effective administration and accountability in public affairs.",
                        "es": "Los marcos e instituciones que organizan y gestionan el poder político y los procesos de toma de decisiones, asegurando una administración efectiva y responsabilidad en los asuntos públicos.",
                        "pt": "As estruturas e instituições que organizam e gerenciam o poder político e os processos de tomada de decisão, garantindo administração eficaz e responsabilidade nos assuntos públicos."
                    }
                },
                {
                    "id": "018f3c0e-s3e5-78d0-b82d-45dr56da020o",
                    "name": {
                        "en": "Human Rights Advocacy",
                        "es": "Defensa de los Derechos Humanos",
                        "pt": "Defesa dos Direitos Humanos"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "description": {
                        "en": "Focuses on promoting and protecting individual and collective rights through activism, education, and policy influence, aiming to uphold justice, equality, and dignity for all members of society.",
                        "es": "Se centra en promover y proteger los derechos individuales y colectivos a través del activismo, la educación y la influencia política, con el objetivo de defender la justicia, la igualdad y la dignidad para todos los miembros de la sociedad.",
                        "pt": "Focado em promover e proteger os direitos individuais e coletivos por meio do ativismo, educação e influência política, com o objetivo de defender a justiça, a igualdade e a dignidade para todos os membros da sociedade."
                    }
                },
                {
                    "id": "018f3c0e-a34d-78d0-b82d-45dr56da020o",
                    "name": {
                        "en": "Legal System",
                        "es": "Sistema Legal",
                        "pt": "Sistema Legal"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "description": {
                        "en": "The set of laws, regulations, and judicial mechanisms that govern society, ensuring order, resolving disputes, and protecting rights through established legal procedures and institutions.",
                        "es": "El conjunto de leyes, regulaciones y mecanismos judiciales que gobiernan la sociedad, asegurando el orden, resolviendo disputas y protegiendo derechos a través de procedimientos e instituciones legales establecidas.",
                        "pt": "O conjunto de leis, regulamentos e mecanismos judiciais que governam a sociedade, garantindo a ordem, resolvendo disputas e protegendo direitos através de procedimentos e instituições legais estabelecidas."
                    }
                },
                {
                    "id": "018f3c0e-1gu8-78d0-b82d-45dr56da020o",
                    "name": {
                        "en": "Public Policy",
                        "es": "Política Pública",
                        "pt": "Política Pública"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "description": {
                        "en": "The development and implementation of government policies and programs designed to address public issues, enhance societal welfare, and promote the common good through strategic planning and regulation.",
                        "es": "El desarrollo e implementación de políticas y programas gubernamentales diseñados para abordar problemas públicos, mejorar el bienestar social y promover el bien común a través de la planificación estratégica y la regulación.",
                        "pt": "O desenvolvimento e implementação de políticas e programas governamentais destinados a abordar questões públicas, melhorar o bem-estar da sociedade e promover o bem comum por meio do planejamento estratégico e regulação."
                    }
                },
                {
                    "id": "018f363-ddcf-78d0-b82d-45dr56da020o",
                    "name": {
                        "en": "Digital Communication",
                        "es": "Comunicación Digital",
                        "pt": "Comunicação Digital"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "description": {
                        "en": "The use of digital platforms and technologies to exchange information, engage the public, and facilitate political mobilization, playing a key role in shaping public opinion and ensuring transparent communication.",
                        "es": "El uso de plataformas y tecnologías digitales para intercambiar información, involucrar al público y facilitar la movilización política, desempeñando un papel clave en la formación de la opinión pública y asegurando una comunicación transparente.",
                        "pt": "O uso de plataformas e tecnologias digitais para trocar informações, engajar o público e facilitar a mobilização política, desempenhando um papel fundamental na formação da opinião pública e garantindo uma comunicação transparente."
                    }
                },
                {
                    "id": "018f321-ddcf-78d0-b82d-45dr56da020o",
                    "name": {
                        "en": "IT Infrastructure",
                        "es": "Infraestructura TI",
                        "pt": "Infraestrutura de TI"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "description": {
                        "en": "The foundational technologies and systems, including hardware, software, and networks, essential for supporting reliable, secure, and scalable digital services in political, economic, and social activities.",
                        "es": "Las tecnologías y sistemas fundamentales, incluyendo hardware, software y redes, esenciales para soportar servicios digitales confiables, seguros y escalables en actividades políticas, económicas y sociales.",
                        "pt": "As tecnologias e sistemas fundamentais, incluindo hardware, software e redes, essenciais para apoiar serviços digitais confiáveis, seguros e escaláveis em atividades políticas, econômicas e sociais."
                    }
                },
                {
                    "id": "018f3er4-ddcf-78d0-b82d-45dr56da020o",
                    "name": {
                        "en": "Innovation & Research",
                        "es": "Innovación e Investigación",
                        "pt": "Inovação e Pesquisa"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "description": {
                        "en": "Development and application of new ideas and technologies to address societal challenges, improve governance, and enhance public policy through collaboration between governments, academia, and the private sector.",
                        "es": "Desarrollo y aplicación de nuevas ideas y tecnologías para abordar desafíos sociales, mejorar la gobernanza y mejorar las políticas públicas a través de la colaboración entre gobiernos, academia y el sector privado.",
                        "pt": "Desenvolvimento e aplicação de novas ideias e tecnologias para enfrentar desafios sociais, melhorar a governança e aprimorar as políticas públicas por meio da colaboração entre governos, academia e setor privado."
                    }
                },
                {
                    "id": "018f3567-ddcf-78d0-b82d-45dr56da020o",
                    "name": {
                        "en": "Software Development",
                        "es": "Desarrollo de Software",
                        "pt": "Desenvolvimento de Software"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "description": {
                        "en": "The designing, creating, testing, and maintaining software applications that support various political and societal functions, enhancing efficiency and service delivery in public and private sectors.",
                        "es": "El diseño, creación, prueba y mantenimiento de aplicaciones de software que apoyan diversas funciones políticas y sociales, mejorando la eficiencia y la prestación de servicios en los sectores público y privado.",
                        "pt": "O design, criação, teste e manutenção de aplicativos de software que suportam várias funções políticas e sociais, melhorando a eficiência e a prestação de serviços nos setores público e privado."
                    }
                },
                {
                    "id": "018f89o-ddcf-78d0-b82d-4123er420o88h",
                    "name": {
                        "en": "Tech Education",
                        "es": "Educación Tecnológica",
                        "pt": "Educação Tecnológica"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "description": {
                        "en": "Training and education initiatives aimed at equipping individuals with the skills and knowledge necessary to thrive in a digital society, fostering technological literacy and innovation.",
                        "es": "Iniciativas de capacitación y educación destinadas a equipar a los individuos con las habilidades y conocimientos necesarios para prosperar en una sociedad digital, fomentando la alfabetización tecnológica y la innovación.",
                        "pt": "Iniciativas de treinamento e educação destinadas a equipar os indivíduos com as habilidades e conhecimentos necessários para prosperar em uma sociedade digital, promovendo a alfabetização tecnológica e a inovação."
                    }
                },
                {
                    "id": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "name": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "created": 1714690657714,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "description": {
                        "en": "The structures and behaviors within organizations that influence workflow, culture, and participant engagement. This domain encompasses the full lifecycle of organizations.",
                        "es": "Las estructuras y comportamientos dentro de las organizaciones que influyen en el flujo de trabajo, la cultura y la participación de los participantes. Este dominio abarca el ciclo de vida completo de las organizaciones.",
                        "pt": "As estruturas e comportamentos dentro das organizações que influenciam o fluxo de trabalho, a cultura e o engajamento dos participantes. Este domínio abrange o ciclo de vida completo das organizações."
                    }
                },
                {
                    "id": "018f3c0e-ddcf-78d0-b82d-82d8b5da015e",
                    "name": {
                        "en": "Collaborative Networks",
                        "es": "Redes Colaborativas",
                        "pt": "Redes Colaborativas"
                    },
                    "created": 1714699533994,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "description": {
                        "en": "The creation and maintenance of strategic alliances across organizations and sectors to enhance resource sharing, innovation, and market positioning. This domain covers inter-organizational cooperation to achieve broader goals.",
                        "es": "La creación y el mantenimiento de alianzas estratégicas entre organizaciones y sectores para mejorar el intercambio de recursos, la innovación y el posicionamiento en el mercado. Este dominio cubre la cooperación interorganizacional para lograr objetivos más amplios.",
                        "pt": "A criação e manutenção de alianças estratégicas entre organizações e setores para melhorar o compartilhamento de recursos, inovação e posicionamento no mercado. Este domínio cobre a cooperação interorganizacional para alcançar objetivos mais amplos."
                    }
                },
                {
                    "id": "018f3128-6025-78b6-9fc4-47cdec62794e",
                    "name": {
                        "en": "Disaster Response",
                        "es": "Respuesta a Desastres",
                        "pt": "Resposta a Desastres"
                    },
                    "created": 1714496264743,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c04-b8a3-7bf6-a1e5-9709f203d640",
                    "description": {
                        "en": "Handling immediate and post-crisis responses to natural disasters, ensuring safety and recovery.",
                        "es": "Manejar respuestas inmediatas y post-crisis a desastres naturales, asegurando la seguridad y la recuperación.",
                        "pt": "Lidar com respostas imediatas e pós-crise a desastres naturais, garantindo segurança e recuperação."
                    }
                },
                {
                    "id": "018f312d-07ab-73ac-bc0c-12efca48ac66",
                    "name": {
                        "en": "Emergency Services",
                        "es": "Servicios de Emergencia",
                        "pt": "Serviços de Emergência"
                    },
                    "created": 1714516934796,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c04-b8a3-7bf6-a1e5-9709f203d640",
                    "description": {
                        "en": "Coordinating rapid response services for medical, fire, and safety emergencies to protect and assist communities.",
                        "es": "Coordinar servicios de respuesta rápida para emergencias médicas, de bomberos y de seguridad para proteger y asistir a las comunidades.",
                        "pt": "Coordenar serviços de resposta rápida para emergências médicas, incêndios e segurança para proteger e assistir comunidades."
                    }
                },
                {
                    "id": "018f3c0d-8547-79f0-8d50-d5d94c39e988",
                    "name": {
                        "en": "Financial Markets",
                        "es": "Mercados Financieros",
                        "pt": "Mercados Financeiros"
                    },
                    "created": 1714699433137,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "description": {
                        "en": "The strategic oversight and handling of financial resources at organizational levels. It covers budgeting, financial forecasting, risk management, and investment strategies to ensure financial stability and growth.",
                        "es": "La supervisión estratégica y el manejo de recursos financieros a nivel organizacional. Cubre la presupuestación, la previsión financiera, la gestión de riesgos y las estrategias de inversión para asegurar la estabilidad y el crecimiento financiero.",
                        "pt": "A supervisão estratégica e o manejo de recursos financeiros em níveis organizacionais. Cobre o orçamento, a previsão financeira, a gestão de riscos e as estratégias de investimento para garantir a estabilidade e o crescimento financeiro."
                    }
                },
                {
                    "id": "018f3138-034c-782d-aee9-472599d1e349",
                    "name": {
                        "en": "Humanitarian Efforts",
                        "es": "Esfuerzos Humanitarios",
                        "pt": "Esforços Humanitários"
                    },
                    "created": 1714517660436,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c04-b8a3-7bf6-a1e5-9709f203d640",
                    "description": {
                        "en": "Engaging in or supporting actions aimed at alleviating suffering and maintaining human dignity during crises and conflicts.",
                        "es": "Participar en o apoyar acciones destinadas a aliviar el sufrimiento y mantener la dignidad humana durante crisis y conflictos.",
                        "pt": "Engajar-se ou apoiar ações destinadas a aliviar o sofrimento e manter a dignidade humana durante crises e conflitos."
                    }
                },
                {
                    "id": "018f3c0b-f14d-7106-a1d3-d2ab6227ada1",
                    "name": {
                        "en": "Informal Trading",
                        "es": "Comercio Informal",
                        "pt": "Comércio Informal"
                    },
                    "created": 1714699286510,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "description": {
                        "en": "Economic activities that operate outside formal regulatory and economic systems, providing essential services and goods in informal markets.",
                        "es": "Actividades económicas que operan fuera de los sistemas regulatorios y económicos formales, proporcionando servicios y bienes esenciales en mercados informales.",
                        "pt": "Atividades econômicas que operam fora dos sistemas regulatórios e econômicos formais, fornecendo serviços e bens essenciais em mercados informais."
                    }
                },
                {
                    "id": "018f3c0c-f48b-707c-8fe0-faf8d1bf28d2",
                    "name": {
                        "en": "Market Transactions",
                        "es": "Transacciones de Mercado",
                        "pt": "Transações de Mercado"
                    },
                    "created": 1714699397794,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "description": {
                        "en": "The activities related to the exchange of goods and services in the marketplace. This domain addresses the mechanics of transactions, including negotiation, execution, and fulfillment of trade operations across various economic sectors.",
                        "es": "Las actividades relacionadas con el intercambio de bienes y servicios en el mercado. Este dominio aborda la mecánica de las transacciones, incluida la negociación, ejecución y cumplimiento de operaciones comerciales en diversos sectores económicos.",
                        "pt": "As atividades relacionadas à troca de bens e serviços no mercado. Este domínio aborda a mecânica das transações, incluindo negociação, execução e cumprimento das operações comerciais em vários setores econômicos."
                    }
                },
                {
                    "id": "018f3c0f-6c10-7905-8c49-e807f2fdaf25",
                    "name": {
                        "en": "Professional Networks",
                        "es": "Redes Profesionales",
                        "pt": "Redes Profissionais"
                    },
                    "created": 1714699558386,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "description": {
                        "en": "The development and leverage of relationships within professional fields to enhance career development, ethical standards, and industry knowledge. This domain supports professional growth and community building.",
                        "es": "El desarrollo y aprovechamiento de relaciones dentro de campos profesionales para mejorar el desarrollo profesional, los estándares éticos y el conocimiento de la industria. Este dominio apoya el crecimiento profesional y la construcción de comunidades.",
                        "pt": "O desenvolvimento e aproveitamento de relacionamentos dentro de campos profissionais para melhorar o desenvolvimento de carreira, os padrões éticos e o conhecimento da indústria. Este domínio apoia o crescimento profissional e a construção de comunidades."
                    }
                },
                {
                    "id": "018f3128-edbd-70f5-87b2-c48d42c74a2a",
                    "name": {
                        "en": "Refugee Support",
                        "es": "Apoyo a Refugiados",
                        "pt": "Apoio a Refugiados"
                    },
                    "created": 1714516680809,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c04-b8a3-7bf6-a1e5-9709f203d640",
                    "description": {
                        "en": "Providing aid and support for displaced individuals facing temporary or long-term displacement due to conflict or disaster.",
                        "es": "Proporcionar ayuda y apoyo a personas desplazadas que enfrentan desplazamientos temporales o a largo plazo debido a conflictos o desastres.",
                        "pt": "Fornecer ajuda e apoio para indivíduos deslocados que enfrentam deslocamento temporário ou de longo prazo devido a conflitos ou desastres."
                    }
                },
                {
                    "id": "018f3c0e-7e82-7f8c-982b-55abf44ebb19",
                    "name": {
                        "en": "Supply Chain Logistics",
                        "es": "Logística de la Cadena de Suministro",
                        "pt": "Logística da Cadeia de Suprimentos"
                    },
                    "created": 1714699470186,
                    "deleted": false,
                    "isDomain": true,
                    "parentId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "description": {
                        "en": "The management of the flow of goods and services, including the associated information and finances, from point of origin to point of consumption.",
                        "es": "La gestión del flujo de bienes y servicios, incluida la información y las finanzas asociadas, desde el punto de origen hasta el punto de consumo.",
                        "pt": "A gestão do fluxo de bens e serviços, incluindo as informações e finanças associadas, desde o ponto de origem até o ponto de consumo."
                    }
                }

            ],
            contexts: [

            ],
            needs: [
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71be5",
                    "name": {
                        "en": "Clear & Effective Communication",
                        "es": "Comunicación Clara y Eficaz",
                        "pt": "Comunicação Clara e Eficaz"
                    },
                    "created": 1715126740608,
                    "updated": 1715172628470,
                    "deleted": false,
                    "tags": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "isNeed": true,
                    "description": {
                        "en": "To maintain clear and effective communication among all stakeholders during an emergency, ensuring that accurate information is disseminated quickly and efficiently.",
                        "es": "Mantener una comunicación clara y eficaz entre todas las partes interesadas durante una emergencia, asegurando que la información precisa se difunda rápida y eficientemente.",
                        "pt": "Manter uma comunicação clara e eficaz entre todas as partes interessadas durante uma emergência, garantindo que as informações precisas sejam disseminadas de forma rápida e eficiente."
                    }
                },
                {
                    "id": "018f5841-7a6b-7ce8-89d4-1247dbbac67a",
                    "name": {
                        "en": "Joining Organization",
                        "es": "Unirse a la Organización",
                        "pt": "Ingressar na Organização"
                    },
                    "created": 1715171785878,
                    "deleted": false,
                    "updated": 1715172628470,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": "joining, organization, collaborative, corporation",
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Process for joining a collaborative organization.",
                        "es": "Proceso para unirse a una organización colaborativa.",
                        "pt": "Processo para ingressar em uma organização colaborativa."
                    }
                },
                {
                    "id": "018f3e6d-5dd2-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Organizational Membership",
                        "es": "Membresía Organizacional",
                        "pt": "Membro Organizacional"
                    },
                    "created": 1714690657720,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": "membership, joining, participation, organization, collaborative, corporation",
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Defining membership criteria and processes to manage who can join and participate in the organization.",
                        "es": "Definir los criterios y procesos de membresía para gestionar quién puede unirse y participar en la organización.",
                        "pt": "Definir critérios e processos de associação para gerenciar quem pode ingressar e participar na organização."
                    }
                },
                {
                    "id": "018f3fc6-0506-705f-931f-89c44e18e524",
                    "name": {
                        "en": "Clear Purpose of Work",
                        "es": "Propósito Claro del Trabajo",
                        "pt": "Propósito Claro do Trabalho"
                    },
                    "created": 1714761748435,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Rapidly clarify for you and your group what is essentially important in your work.",
                        "es": "Aclarar rápidamente para ti y tu grupo lo que es esencialmente importante en tu trabajo.",
                        "pt": "Esclarecer rapidamente para você e seu grupo o que é essencialmente importante no seu trabalho."
                    }
                },
                {
                    "id": "018f407e-206a-773c-a22b-d2fc411dd14e",
                    "name": {
                        "en": "Progress Review",
                        "es": "Revisión de Progreso",
                        "pt": "Revisão de Progresso"
                    },
                    "created": 1714773793804,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Shared experience in a way that builds understanding and spurs coordinated action.",
                        "es": "Experiencia compartida de una manera que construye entendimiento y fomenta la acción coordinada.",
                        "pt": "Experiência compartilhada de uma maneira que constrói entendimento e incentiva a ação coordenada."
                    }
                },
                {
                    "id": "018f5834-7c67-72bc-9f23-8d0cb308d927",
                    "name": {
                        "en": "Protect Organizational Data",
                        "es": "Proteger Datos Organizacionales",
                        "pt": "Proteger Dados Organizacionais"
                    },
                    "created": 1715170822237,
                    "deleted": false,
                    "updated": 1715171784401,
                    "domainId": "018f3128-6025-78b6-9fc4-47cdec62794e",
                    "keywords": "data, disaster, cyber-attack",
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Disaster Response",
                        "es": "Respuesta a Desastres",
                        "pt": "Resposta a Desastres"
                    },
                    
                    "description": {
                        "en": "To protect organizational data against loss due to disasters such as cyber-attacks, natural disasters, or hardware failures, and to ensure business continuity.",
                        "es": "Proteger los datos organizacionales contra pérdidas debido a desastres como ataques cibernéticos, desastres naturales o fallos de hardware, y asegurar la continuidad del negocio.",
                        "pt": "Proteger os dados organizacionais contra perdas devido a desastres como ataques cibernéticos, desastres naturais ou falhas de hardware, e garantir a continuidade dos negócios."
                    }
                },
                {
                    "id": "018f5644-39c2-7f01-bc2f-b149a1cba82f",
                    "name": {
                        "en": "Provide Medical Assistance",
                        "es": "Proveer Asistencia Médica",
                        "pt": "Fornecer Assistência Médica"
                    },
                    "created": 1715139080467,
                    "deleted": false,
                    "domainId": "018f3128-6025-78b6-9fc4-47cdec62794e",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Disaster Response",
                        "es": "Respuesta a Desastres",
                        "pt": "Resposta a Desastres"
                    },
                    
                    "description": {
                        "en": "To provide immediate and effective medical assistance to individuals who suffer a medical emergency on company premises.",
                        "es": "Proporcionar asistencia médica inmediata y efectiva a las personas que sufren una emergencia médica en las instalaciones de la empresa.",
                        "pt": "Fornecer assistência médica imediata e eficaz a indivíduos que sofrem uma emergência médica nas instalações da empresa."
                    }
                },
                {
                    "id": "018f5551-5712-7a79-a461-445913994821",
                    "name": {
                        "en": "Safe and Orderly Evacuation",
                        "es": "Evacuación Segura y Ordenada",
                        "pt": "Evacuação Segura e Ordenada"
                    },
                    "created": 1715095657982,
                    "deleted": false,
                    "domainId": "018f3128-6025-78b6-9fc4-47cdec62794e",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Disaster Response",
                        "es": "Respuesta a Desastres",
                        "pt": "Resposta a Desastres"
                    },
                    
                    "description": {
                        "en": "To ensure the safe and orderly evacuation of all personnel and visitors from the premises in the event of an emergency, such as a fire, earthquake, or other immediate threats.",
                        "es": "Asegurar la evacuación segura y ordenada de todo el personal y visitantes de las instalaciones en caso de emergencia, como un incendio, un terremoto u otras amenazas inmediatas.",
                        "pt": "Garantir a evacuação segura e ordenada de todo o pessoal e visitantes das instalações em caso de emergência, como um incêndio, terremoto ou outras ameaças imediatas."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bf1",
                    "name": {
                        "en": "Rapid Response Time",
                        "es": "Tiempo de Respuesta Rápida",
                        "pt": "Tempo de Resposta Rápida"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f312d-07ab-73ac-bc0c-12efca48ac66",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Emergency Services",
                        "es": "Servicios de Emergencia",
                        "pt": "Serviços de Emergência"
                    },
                    
                    "description": {
                        "en": "To ensure emergency services can respond swiftly to crises, minimizing harm and maximizing effectiveness.",
                        "es": "Asegurar que los servicios de emergencia puedan responder rápidamente a las crisis, minimizando el daño y maximizando la efectividad.",
                        "pt": "Garantir que os serviços de emergência possam responder rapidamente às crises, minimizando danos e maximizando a eficácia."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bf2",
                    "name": {
                        "en": "Adequate Equipment",
                        "es": "Equipamiento Adecuado",
                        "pt": "Equipamento Adequado"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f312d-07ab-73ac-bc0c-12efca48ac66",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Emergency Services",
                        "es": "Servicios de Emergencia",
                        "pt": "Serviços de Emergência"
                    },
                    
                    "description": {
                        "en": "To provide emergency responders with the necessary equipment to handle various types of emergencies effectively.",
                        "es": "Proporcionar a los respondedores de emergencia el equipo necesario para manejar diversos tipos de emergencias de manera efectiva.",
                        "pt": "Fornecer aos socorristas os equipamentos necessários para lidar efetivamente com vários tipos de emergências."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bf3",
                    "name": {
                        "en": "Trained Personnel",
                        "es": "Personal Capacitado",
                        "pt": "Pessoal Treinado"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f312d-07ab-73ac-bc0c-12efca48ac66",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Emergency Services",
                        "es": "Servicios de Emergencia",
                        "pt": "Serviços de Emergência"
                    },
                    
                    "description": {
                        "en": "To ensure all emergency response teams are well-trained and capable of handling various crisis situations.",
                        "es": "Asegurar que todos los equipos de respuesta a emergencias estén bien capacitados y sean capaces de manejar diversas situaciones de crisis.",
                        "pt": "Garantir que todas as equipes de resposta a emergências sejam bem treinadas e capazes de lidar com várias situações de crise."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bf4",
                    "name": {
                        "en": "Medical Supplies",
                        "es": "Suministros Médicos",
                        "pt": "Suprimentos Médicos"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f312d-07ab-73ac-bc0c-12efca48ac66",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Emergency Services",
                        "es": "Servicios de Emergencia",
                        "pt": "Serviços de Emergência"
                    },
                    
                    "description": {
                        "en": "To ensure the availability of essential medical supplies for immediate use during emergencies.",
                        "es": "Asegurar la disponibilidad de suministros médicos esenciales para uso inmediato durante emergencias.",
                        "pt": "Garantir a disponibilidade de suprimentos médicos essenciais para uso imediato durante emergências."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bf5",
                    "name": {
                        "en": "Emergency Protocols",
                        "es": "Protocolos de Emergencia",
                        "pt": "Protocolos de Emergência"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f312d-07ab-73ac-bc0c-12efca48ac66",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Emergency Services",
                        "es": "Servicios de Emergencia",
                        "pt": "Serviços de Emergência"
                    },
                    
                    "description": {
                        "en": "To establish and follow clear protocols for emergency situations to ensure coordinated and efficient response.",
                        "es": "Establecer y seguir protocolos claros para situaciones de emergencia para asegurar una respuesta coordinada y eficiente.",
                        "pt": "Estabelecer e seguir protocolos claros para situações de emergência para garantir uma resposta coordenada e eficiente."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bf6",
                    "name": {
                        "en": "Aid Distribution",
                        "es": "Distribución de Ayuda",
                        "pt": "Distribuição de Ajuda"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3138-034c-782d-aee9-472599d1e349",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Humanitarian Efforts",
                        "es": "Esfuerzos Humanitarios",
                        "pt": "Esforços Humanitários"
                    },
                    
                    "description": {
                        "en": "To ensure the efficient distribution of aid to those affected by crises, ensuring timely and equitable access to resources.",
                        "es": "Asegurar la distribución eficiente de ayuda a los afectados por crisis, asegurando el acceso oportuno y equitativo a los recursos.",
                        "pt": "Garantir a distribuição eficiente de ajuda aos afetados por crises, garantindo o acesso oportuno e equitativo aos recursos."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bf7",
                    "name": {
                        "en": "Temporary Shelters",
                        "es": "Refugios Temporales",
                        "pt": "Abrigos Temporários"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3138-034c-782d-aee9-472599d1e349",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Humanitarian Efforts",
                        "es": "Esfuerzos Humanitarios",
                        "pt": "Esforços Humanitários"
                    },
                    
                    "description": {
                        "en": "To provide safe and secure temporary shelters for individuals displaced by emergencies and disasters.",
                        "es": "Proporcionar refugios temporales seguros para las personas desplazadas por emergencias y desastres.",
                        "pt": "Fornecer abrigos temporários seguros para indivíduos deslocados por emergências e desastres."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bf8",
                    "name": {
                        "en": "Medical Aid",
                        "es": "Ayuda Médica",
                        "pt": "Assistência Médica"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3138-034c-782d-aee9-472599d1e349",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Humanitarian Efforts",
                        "es": "Esfuerzos Humanitarios",
                        "pt": "Esforços Humanitários"
                    },
                    
                    "description": {
                        "en": "To ensure the provision of medical aid and healthcare services to those affected by crises.",
                        "es": "Asegurar la provisión de ayuda médica y servicios de salud a los afectados por crisis.",
                        "pt": "Garantir a prestação de assistência médica e serviços de saúde aos afetados por crises."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bf9",
                    "name": {
                        "en": "Psychological Support",
                        "es": "Apoyo Psicológico",
                        "pt": "Apoio Psicológico"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3138-034c-782d-aee9-472599d1e349",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Humanitarian Efforts",
                        "es": "Esfuerzos Humanitarios",
                        "pt": "Esforços Humanitários"
                    },
                    
                    "description": {
                        "en": "To provide psychological support and mental health services to individuals affected by crises, promoting emotional well-being.",
                        "es": "Proveer apoyo psicológico y servicios de salud mental a las personas afectadas por crisis, promoviendo el bienestar emocional.",
                        "pt": "Fornecer apoio psicológico e serviços de saúde mental para indivíduos afetados por crises, promovendo o bem-estar emocional."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bfa",
                    "name": {
                        "en": "Rehabilitation Programs",
                        "es": "Programas de Rehabilitación",
                        "pt": "Programas de Reabilitação"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3138-034c-782d-aee9-472599d1e349",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Humanitarian Efforts",
                        "es": "Esfuerzos Humanitarios",
                        "pt": "Esforços Humanitários"
                    },
                    
                    "description": {
                        "en": "To establish rehabilitation programs that aid in the recovery and reintegration of individuals affected by crises.",
                        "es": "Establecer programas de rehabilitación que ayuden en la recuperación y reintegración de personas afectadas por crisis.",
                        "pt": "Estabelecer programas de reabilitação que ajudem na recuperação e reintegração de indivíduos afetados por crises."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bfb",
                    "name": {
                        "en": "Safe Housing",
                        "es": "Vivienda Segura",
                        "pt": "Habitação Segura"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3128-edbd-70f5-87b2-c48d42c74a2a",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Refugee Support",
                        "es": "Apoyo a Refugiados",
                        "pt": "Apoio a Refugiados"
                    },
                    
                    "description": {
                        "en": "To provide safe and secure housing for refugees, ensuring their well-being and stability.",
                        "es": "Proveer vivienda segura y estable para los refugiados, asegurando su bienestar y estabilidad.",
                        "pt": "Fornecer habitação segura e estável para os refugiados, garantindo seu bem-estar e estabilidade."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bfc",
                    "name": {
                        "en": "Legal Assistance",
                        "es": "Asistencia Legal",
                        "pt": "Assistência Legal"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3128-edbd-70f5-87b2-c48d42c74a2a",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Refugee Support",
                        "es": "Apoyo a Refugiados",
                        "pt": "Apoio a Refugiados"
                    },
                    
                    "description": {
                        "en": "To provide legal assistance and support to refugees, helping them navigate legal systems and secure their rights.",
                        "es": "Proveer asistencia y apoyo legal a los refugiados, ayudándolos a navegar por los sistemas legales y asegurar sus derechos.",
                        "pt": "Fornecer assistência e apoio legal aos refugiados, ajudando-os a navegar pelos sistemas legais e garantir seus direitos."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bfd",
                    "name": {
                        "en": "Education Programs",
                        "es": "Programas Educativos",
                        "pt": "Programas Educacionais"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3128-edbd-70f5-87b2-c48d42c74a2a",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Refugee Support",
                        "es": "Apoyo a Refugiados",
                        "pt": "Apoio a Refugiados"
                    },
                    
                    "description": {
                        "en": "To provide educational programs and opportunities for refugees, promoting learning and personal development.",
                        "es": "Proveer programas educativos y oportunidades para los refugiados, promoviendo el aprendizaje y el desarrollo personal.",
                        "pt": "Fornecer programas educacionais e oportunidades para refugiados, promovendo o aprendizado e o desenvolvimento pessoal."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bfe",
                    "name": {
                        "en": "Employment Opportunities",
                        "es": "Oportunidades de Empleo",
                        "pt": "Oportunidades de Emprego"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3128-edbd-70f5-87b2-c48d42c74a2a",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Refugee Support",
                        "es": "Apoyo a Refugiados",
                        "pt": "Apoio a Refugiados"
                    },
                    
                    "description": {
                        "en": "To provide employment opportunities and vocational training for refugees, supporting their economic independence and integration.",
                        "es": "Proveer oportunidades de empleo y formación profesional para los refugiados, apoyando su independencia económica e integración.",
                        "pt": "Fornecer oportunidades de emprego e treinamento vocacional para refugiados, apoiando sua independência econômica e integração."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bff",
                    "name": {
                        "en": "Healthcare Services",
                        "es": "Servicios de Salud",
                        "pt": "Serviços de Saúde"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3128-edbd-70f5-87b2-c48d42c74a2a",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Refugee Support",
                        "es": "Apoyo a Refugiados",
                        "pt": "Apoio a Refugiados"
                    },
                    
                    "description": {
                        "en": "To ensure the provision of comprehensive healthcare services for refugees, addressing both physical and mental health needs.",
                        "es": "Asegurar la provisión de servicios de salud integrales para los refugiados, abordando tanto las necesidades físicas como mentales.",
                        "pt": "Garantir a prestação de serviços de saúde abrangentes para refugiados, abordando tanto as necessidades físicas quanto mentais."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c00",
                    "name": {
                        "en": "Evacuation Plans",
                        "es": "Planes de Evacuación",
                        "pt": "Planos de Evacuação"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3128-6025-78b6-9fc4-47cdec62794e",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Safe Evacuation",
                        "es": "Evacuación Segura",
                        "pt": "Evacuação Segura"
                    },
                    
                    "description": {
                        "en": "To develop and implement effective evacuation plans, ensuring the safe and orderly removal of individuals from danger zones.",
                        "es": "Desarrollar e implementar planes de evacuación efectivos, asegurando la remoción segura y ordenada de individuos de las zonas de peligro.",
                        "pt": "Desenvolver e implementar planos de evacuação eficazes, garantindo a remoção segura e ordenada de indivíduos das zonas de perigo."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c01",
                    "name": {
                        "en": "Emergency Drills",
                        "es": "Simulacros de Emergencia",
                        "pt": "Simulações de Emergência"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3128-6025-78b6-9fc4-47cdec62794e",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Safe Evacuation",
                        "es": "Evacuación Segura",
                        "pt": "Evacuação Segura"
                    },
                    
                    "description": {
                        "en": "To conduct regular emergency drills, ensuring preparedness and efficiency in executing evacuation plans.",
                        "es": "Realizar simulacros de emergencia regulares, asegurando la preparación y la eficiencia en la ejecución de los planes de evacuación.",
                        "pt": "Conduzir simulações de emergência regulares, garantindo prontidão e eficiência na execução dos planos de evacuação."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c02",
                    "name": {
                        "en": "Safe Zones",
                        "es": "Zonas Seguras",
                        "pt": "Zonas Seguras"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3128-6025-78b6-9fc4-47cdec62794e",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Safe Evacuation",
                        "es": "Evacuación Segura",
                        "pt": "Evacuação Segura"
                    },
                    
                    "description": {
                        "en": "To designate and maintain safe zones for individuals to gather during and after evacuation, ensuring safety and organization.",
                        "es": "Designar y mantener zonas seguras para que las personas se reúnan durante y después de la evacuación, asegurando la seguridad y la organización.",
                        "pt": "Designar e manter zonas seguras para indivíduos se reunirem durante e após a evacuação, garantindo segurança e organização."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c03",
                    "name": {
                        "en": "Communication Systems",
                        "es": "Sistemas de Comunicación",
                        "pt": "Sistemas de Comunicação"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3128-6025-78b6-9fc4-47cdec62794e",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Safe Evacuation",
                        "es": "Evacuación Segura",
                        "pt": "Evacuação Segura"
                    },
                    
                    "description": {
                        "en": "To establish reliable communication systems for coordinating evacuation efforts and disseminating information to the public.",
                        "es": "Establecer sistemas de comunicación confiables para coordinar los esfuerzos de evacuación y difundir información al público.",
                        "pt": "Estabelecer sistemas de comunicação confiáveis para coordenar os esforços de evacuação e disseminar informações ao público."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c04",
                    "name": {
                        "en": "Transport Arrangements",
                        "es": "Arreglos de Transporte",
                        "pt": "Arranjos de Transporte"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3128-6025-78b6-9fc4-47cdec62794e",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Safe Evacuation",
                        "es": "Evacuación Segura",
                        "pt": "Evacuação Segura"
                    },
                    
                    "description": {
                        "en": "To arrange transport facilities for the swift and safe evacuation of individuals from affected areas.",
                        "es": "Arreglar instalaciones de transporte para la evacuación rápida y segura de personas de áreas afectadas.",
                        "pt": "Organizar instalações de transporte para a rápida e segura evacuação de indivíduos de áreas afetadas."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c06",
                    "name": {
                        "en": "Art Supplies",
                        "es": "Materiales de Arte",
                        "pt": "Materiais de Arte"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "9iu63c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Artistic Expression",
                        "es": "Expresión Artística",
                        "pt": "Expressão Artística"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To ensure artists have access to necessary materials and tools for their creative processes.",
                        "es": "Asegurar que los artistas tengan acceso a los materiales y herramientas necesarios para sus procesos creativos.",
                        "pt": "Garantir que os artistas tenham acesso aos materiais e ferramentas necessários para seus processos criativos."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bf8",
                    "name": {
                        "en": "Medical Aid",
                        "es": "Ayuda Médica",
                        "pt": "Assistência Médica"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3138-034c-782d-aee9-472599d1e349",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Humanitarian Efforts",
                        "es": "Esfuerzos Humanitarios",
                        "pt": "Esforços Humanitários"
                    },
                    
                    "description": {
                        "en": "To ensure the provision of medical aid and healthcare services to those affected by crises.",
                        "es": "Asegurar la provisión de ayuda médica y servicios de salud a los afectados por crisis.",
                        "pt": "Garantir a prestação de assistência médica e serviços de saúde aos afetados por crises."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bf9",
                    "name": {
                        "en": "Psychological Support",
                        "es": "Apoyo Psicológico",
                        "pt": "Apoio Psicológico"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3138-034c-782d-aee9-472599d1e349",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Humanitarian Efforts",
                        "es": "Esfuerzos Humanitarios",
                        "pt": "Esforços Humanitários"
                    },
                    
                    "description": {
                        "en": "To provide psychological support and mental health services to individuals affected by crises, promoting emotional well-being.",
                        "es": "Proveer apoyo psicológico y servicios de salud mental a las personas afectadas por crisis, promoviendo el bienestar emocional.",
                        "pt": "Fornecer apoio psicológico e serviços de saúde mental para indivíduos afetados por crises, promovendo o bem-estar emocional."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bfa",
                    "name": {
                        "en": "Rehabilitation Programs",
                        "es": "Programas de Rehabilitación",
                        "pt": "Programas de Reabilitação"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3138-034c-782d-aee9-472599d1e349",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Humanitarian Efforts",
                        "es": "Esfuerzos Humanitarios",
                        "pt": "Esforços Humanitários"
                    },
                    
                    "description": {
                        "en": "To establish rehabilitation programs that aid in the recovery and reintegration of individuals affected by crises.",
                        "es": "Establecer programas de rehabilitación que ayuden en la recuperación y reintegración de personas afectadas por crisis.",
                        "pt": "Estabelecer programas de reabilitação que ajudem na recuperação e reintegração de indivíduos afetados por crises."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bfb",
                    "name": {
                        "en": "Safe Housing",
                        "es": "Vivienda Segura",
                        "pt": "Habitação Segura"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3128-edbd-70f5-87b2-c48d42c74a2a",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Refugee Support",
                        "es": "Apoyo a Refugiados",
                        "pt": "Apoio a Refugiados"
                    },
                    
                    "description": {
                        "en": "To provide safe and secure housing for refugees, ensuring their well-being and stability.",
                        "es": "Proveer vivienda segura y estable para los refugiados, asegurando su bienestar y estabilidad.",
                        "pt": "Fornecer habitação segura e estável para os refugiados, garantindo seu bem-estar e estabilidade."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bfc",
                    "name": {
                        "en": "Legal Assistance",
                        "es": "Asistencia Legal",
                        "pt": "Assistência Legal"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3128-edbd-70f5-87b2-c48d42c74a2a",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Refugee Support",
                        "es": "Apoyo a Refugiados",
                        "pt": "Apoio a Refugiados"
                    },
                    
                    "description": {
                        "en": "To provide legal assistance and support to refugees, helping them navigate legal systems and secure their rights.",
                        "es": "Proveer asistencia y apoyo legal a los refugiados, ayudándolos a navegar por los sistemas legales y asegurar sus derechos.",
                        "pt": "Fornecer assistência e apoio legal aos refugiados, ajudando-os a navegar pelos sistemas legais e garantir seus direitos."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bfd",
                    "name": {
                        "en": "Education Programs",
                        "es": "Programas Educativos",
                        "pt": "Programas Educacionais"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3128-edbd-70f5-87b2-c48d42c74a2a",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Refugee Support",
                        "es": "Apoyo a Refugiados",
                        "pt": "Apoio a Refugiados"
                    },
                    
                    "description": {
                        "en": "To provide educational programs and opportunities for refugees, promoting learning and personal development.",
                        "es": "Proveer programas educativos y oportunidades para los refugiados, promoviendo el aprendizaje y el desarrollo personal.",
                        "pt": "Fornecer programas educacionais e oportunidades para refugiados, promovendo o aprendizado e o desenvolvimento pessoal."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bfe",
                    "name": {
                        "en": "Employment Opportunities",
                        "es": "Oportunidades de Empleo",
                        "pt": "Oportunidades de Emprego"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3128-edbd-70f5-87b2-c48d42c74a2a",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Refugee Support",
                        "es": "Apoyo a Refugiados",
                        "pt": "Apoio a Refugiados"
                    },
                    
                    "description": {
                        "en": "To provide employment opportunities and vocational training for refugees, supporting their economic independence and integration.",
                        "es": "Proveer oportunidades de empleo y formación profesional para los refugiados, apoyando su independencia económica e integración.",
                        "pt": "Fornecer oportunidades de emprego e treinamento vocacional para refugiados, apoiando sua independência econômica e integração."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71bff",
                    "name": {
                        "en": "Healthcare Services",
                        "es": "Servicios de Salud",
                        "pt": "Serviços de Saúde"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3128-edbd-70f5-87b2-c48d42c74a2a",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Refugee Support",
                        "es": "Apoyo a Refugiados",
                        "pt": "Apoio a Refugiados"
                    },
                    
                    "description": {
                        "en": "To ensure the provision of comprehensive healthcare services for refugees, addressing both physical and mental health needs.",
                        "es": "Asegurar la provisión de servicios de salud integrales para los refugiados, abordando tanto las necesidades físicas como mentales.",
                        "pt": "Garantir a prestação de serviços de saúde abrangentes para refugiados, abordando tanto as necessidades físicas quanto mentais."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c00",
                    "name": {
                        "en": "Evacuation Plans",
                        "es": "Planes de Evacuación",
                        "pt": "Planos de Evacuação"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3128-6025-78b6-9fc4-47cdec62794e",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Safe Evacuation",
                        "es": "Evacuación Segura",
                        "pt": "Evacuação Segura"
                    },
                    
                    "description": {
                        "en": "To develop and implement effective evacuation plans, ensuring the safe and orderly removal of individuals from danger zones.",
                        "es": "Desarrollar e implementar planes de evacuación efectivos, asegurando la remoción segura y ordenada de individuos de las zonas de peligro.",
                        "pt": "Desenvolver e implementar planos de evacuação eficazes, garantindo a remoção segura e ordenada de indivíduos das zonas de perigo."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c01",
                    "name": {
                        "en": "Emergency Drills",
                        "es": "Simulacros de Emergencia",
                        "pt": "Simulações de Emergência"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3128-6025-78b6-9fc4-47cdec62794e",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Safe Evacuation",
                        "es": "Evacuación Segura",
                        "pt": "Evacuação Segura"
                    },
                    
                    "description": {
                        "en": "To conduct regular emergency drills, ensuring preparedness and efficiency in executing evacuation plans.",
                        "es": "Realizar simulacros de emergencia regulares, asegurando la preparación y la eficiencia en la ejecución de los planes de evacuación.",
                        "pt": "Conduzir simulações de emergência regulares, garantindo prontidão e eficiência na execução dos planos de evacuação."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c02",
                    "name": {
                        "en": "Safe Zones",
                        "es": "Zonas Seguras",
                        "pt": "Zonas Seguras"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3128-6025-78b6-9fc4-47cdec62794e",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Safe Evacuation",
                        "es": "Evacuación Segura",
                        "pt": "Evacuação Segura"
                    },
                    
                    "description": {
                        "en": "To designate and maintain safe zones for individuals to gather during and after evacuation, ensuring safety and organization.",
                        "es": "Designar y mantener zonas seguras para que las personas se reúnan durante y después de la evacuación, asegurando la seguridad y la organización.",
                        "pt": "Designar e manter zonas seguras para indivíduos se reunirem durante e após a evacuação, garantindo segurança e organização."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c03",
                    "name": {
                        "en": "Communication Systems",
                        "es": "Sistemas de Comunicación",
                        "pt": "Sistemas de Comunicação"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3128-6025-78b6-9fc4-47cdec62794e",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Safe Evacuation",
                        "es": "Evacuación Segura",
                        "pt": "Evacuação Segura"
                    },
                    
                    "description": {
                        "en": "To establish reliable communication systems for coordinating evacuation efforts and disseminating information to the public.",
                        "es": "Establecer sistemas de comunicación confiables para coordinar los esfuerzos de evacuación y difundir información al público.",
                        "pt": "Estabelecer sistemas de comunicação confiáveis para coordenar os esforços de evacuação e disseminar informações ao público."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c04",
                    "name": {
                        "en": "Transport Arrangements",
                        "es": "Arreglos de Transporte",
                        "pt": "Arranjos de Transporte"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3128-6025-78b6-9fc4-47cdec62794e",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    
                    "isNeed": true,
                    "domainName": {
                        "en": "Safe Evacuation",
                        "es": "Evacuación Segura",
                        "pt": "Evacuação Segura"
                    },
                    
                    "description": {
                        "en": "To arrange transport facilities for the swift and safe evacuation of individuals from affected areas.",
                        "es": "Arreglar instalaciones de transporte para la evacuación rápida y segura de personas de áreas afectadas.",
                        "pt": "Organizar instalações de transporte para a rápida e segura evacuação de indivíduos de áreas afetadas."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c05",
                    "name": {
                        "en": "Exhibition Spaces",
                        "es": "Espacios de Exhibición",
                        "pt": "Espaços de Exposição"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "9iu63c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Artistic Expression",
                        "es": "Expresión Artística",
                        "pt": "Expressão Artística"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To provide spaces where artists can exhibit their works, allowing public access and appreciation.",
                        "es": "Proveer espacios donde los artistas puedan exhibir sus obras, permitiendo el acceso y la apreciación del público.",
                        "pt": "Fornecer espaços onde os artistas possam expor suas obras, permitindo o acesso e a apreciação do público."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c07",
                    "name": {
                        "en": "Funding for Artists",
                        "es": "Financiamiento para Artistas",
                        "pt": "Financiamento para Artistas"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "9iu63c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Artistic Expression",
                        "es": "Expresión Artística",
                        "pt": "Expressão Artística"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To provide financial support for artists, enabling them to focus on their creative work.",
                        "es": "Proveer apoyo financiero para los artistas, permitiéndoles centrarse en su trabajo creativo.",
                        "pt": "Fornecer apoio financeiro para artistas, permitindo-lhes focar no seu trabalho criativo."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c08",
                    "name": {
                        "en": "Public Art Projects",
                        "es": "Proyectos de Arte Público",
                        "pt": "Projetos de Arte Pública"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "9iu63c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Artistic Expression",
                        "es": "Expresión Artística",
                        "pt": "Expressão Artística"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To encourage and support the creation of public art projects that enhance community spaces and cultural appreciation.",
                        "es": "Fomentar y apoyar la creación de proyectos de arte público que mejoren los espacios comunitarios y la apreciación cultural.",
                        "pt": "Incentivar e apoiar a criação de projetos de arte pública que melhorem os espaços comunitários e a apreciação cultural."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c09",
                    "name": {
                        "en": "Art Education",
                        "es": "Educación Artística",
                        "pt": "Educação Artística"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "9iu63c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Artistic Expression",
                        "es": "Expresión Artística",
                        "pt": "Expressão Artística"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To provide educational programs and resources that foster artistic skills and appreciation.",
                        "es": "Proveer programas educativos y recursos que fomenten las habilidades artísticas y la apreciación.",
                        "pt": "Fornecer programas educativos e recursos que fomentem as habilidades artísticas e a apreciação."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c0a",
                    "name": {
                        "en": "Preservation Efforts",
                        "es": "Esfuerzos de Preservación",
                        "pt": "Esforços de Preservação"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "3df63c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Cultural Heritage",
                        "es": "Patrimonio Cultural",
                        "pt": "Patrimônio Cultural"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To undertake efforts to preserve and protect cultural heritage sites, artifacts, and traditions.",
                        "es": "Emprender esfuerzos para preservar y proteger los sitios, artefactos y tradiciones del patrimonio cultural.",
                        "pt": "Empreender esforços para preservar e proteger os sítios, artefatos e tradições do patrimônio cultural."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c0b",
                    "name": {
                        "en": "Historical Documentation",
                        "es": "Documentación Histórica",
                        "pt": "Documentação Histórica"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "3df63c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Cultural Heritage",
                        "es": "Patrimonio Cultural",
                        "pt": "Patrimônio Cultural"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To document and archive historical events, practices, and artifacts for future generations.",
                        "es": "Documentar y archivar eventos históricos, prácticas y artefactos para las futuras generaciones.",
                        "pt": "Documentar e arquivar eventos históricos, práticas e artefatos para as futuras gerações."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c0c",
                    "name": {
                        "en": "Cultural Events",
                        "es": "Eventos Culturales",
                        "pt": "Eventos Culturais"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "3df63c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Cultural Heritage",
                        "es": "Patrimonio Cultural",
                        "pt": "Patrimônio Cultural"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To organize and promote cultural events that celebrate and sustain heritage and traditions.",
                        "es": "Organizar y promover eventos culturales que celebren y mantengan el patrimonio y las tradiciones.",
                        "pt": "Organizar e promover eventos culturais que celebrem e mantenham o patrimônio e as tradições."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c0d",
                    "name": {
                        "en": "Community Engagement",
                        "es": "Participación Comunitaria",
                        "pt": "Engajamento Comunitário"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "3df63c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Cultural Heritage",
                        "es": "Patrimonio Cultural",
                        "pt": "Patrimônio Cultural"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To engage the community in activities and programs that promote cultural awareness and participation.",
                        "es": "Involucrar a la comunidad en actividades y programas que promuevan la conciencia y la participación cultural.",
                        "pt": "Envolver a comunidade em atividades e programas que promovam a conscientização e a participação cultural."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c0e",
                    "name": {
                        "en": "Funding for Preservation",
                        "es": "Financiamiento para la Preservación",
                        "pt": "Financiamento para Preservação"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "3df63c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Cultural Heritage",
                        "es": "Patrimonio Cultural",
                        "pt": "Patrimônio Cultural"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To secure financial resources necessary for the preservation and maintenance of cultural heritage sites and artifacts.",
                        "es": "Asegurar los recursos financieros necesarios para la preservación y el mantenimiento de los sitios y artefactos del patrimonio cultural.",
                        "pt": "Garantir os recursos financeiros necessários para a preservação e manutenção dos sítios e artefatos do patrimônio cultural."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c0f",
                    "name": {
                        "en": "Libraries",
                        "es": "Bibliotecas",
                        "pt": "Bibliotecas"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "mjg53c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Literary Activities",
                        "es": "Actividades Literarias",
                        "pt": "Atividades Literárias"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To provide accessible libraries that support literacy, learning, and cultural exchange.",
                        "es": "Proveer bibliotecas accesibles que apoyen la alfabetización, el aprendizaje y el intercambio cultural.",
                        "pt": "Fornecer bibliotecas acessíveis que apoiem a alfabetização, o aprendizado e o intercâmbio cultural."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c10",
                    "name": {
                        "en": "Book Clubs",
                        "es": "Clubes de Lectura",
                        "pt": "Clubes de Leitura"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "mjg53c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Literary Activities",
                        "es": "Actividades Literarias",
                        "pt": "Atividades Literárias"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To support the formation and operation of book clubs that encourage reading and discussion.",
                        "es": "Apoyar la formación y operación de clubes de lectura que fomenten la lectura y la discusión.",
                        "pt": "Apoiar a formação e operação de clubes de leitura que incentivem a leitura e a discussão."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c11",
                    "name": {
                        "en": "Writing Workshops",
                        "es": "Talleres de Escritura",
                        "pt": "Oficinas de Escrita"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "mjg53c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Literary Activities",
                        "es": "Actividades Literarias",
                        "pt": "Atividades Literárias"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To provide workshops that foster writing skills and creativity among aspiring writers.",
                        "es": "Proveer talleres que fomenten las habilidades de escritura y la creatividad entre los escritores aspirantes.",
                        "pt": "Fornecer oficinas que fomentem habilidades de escrita e criatividade entre escritores aspirantes."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c12",
                    "name": {
                        "en": "Literary Festivals",
                        "es": "Festivales Literarios",
                        "pt": "Festivais Literários"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "mjg53c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Literary Activities",
                        "es": "Actividades Literarias",
                        "pt": "Atividades Literárias"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To organize literary festivals that celebrate books, authors, and the literary arts.",
                        "es": "Organizar festivales literarios que celebren los libros, los autores y las artes literarias.",
                        "pt": "Organizar festivais literários que celebrem livros, autores e as artes literárias."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c13",
                    "name": {
                        "en": "Reading Programs",
                        "es": "Programas de Lectura",
                        "pt": "Programas de Leitura"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "mjg53c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Literary Activities",
                        "es": "Actividades Literarias",
                        "pt": "Atividades Literárias"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To implement reading programs that promote literacy and a love for reading in the community.",
                        "es": "Implementar programas de lectura que promuevan la alfabetización y el amor por la lectura en la comunidad.",
                        "pt": "Implementar programas de leitura que promovam a alfabetização e o amor pela leitura na comunidade."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c14",
                    "name": {
                        "en": "Concert Venues",
                        "es": "Lugares para Conciertos",
                        "pt": "Locais para Concertos"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "7bht53c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Musical Performance",
                        "es": "Actuación Musical",
                        "pt": "Performance Musical"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To provide venues for musical performances, enhancing cultural expression and audience engagement.",
                        "es": "Proveer lugares para actuaciones musicales, mejorando la expresión cultural y la participación de la audiencia.",
                        "pt": "Fornecer locais para apresentações musicais, aprimorando a expressão cultural e o engajamento do público."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c15",
                    "name": {
                        "en": "Musical Instruments",
                        "es": "Instrumentos Musicales",
                        "pt": "Instrumentos Musicais"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "7bht53c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Musical Performance",
                        "es": "Actuación Musical",
                        "pt": "Performance Musical"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To ensure access to musical instruments for performers and students, fostering musical talent.",
                        "es": "Asegurar el acceso a instrumentos musicales para intérpretes y estudiantes, fomentando el talento musical.",
                        "pt": "Garantir o acesso a instrumentos musicais para performers e estudantes, fomentando o talento musical."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c16",
                    "name": {
                        "en": "Music Education",
                        "es": "Educación Musical",
                        "pt": "Educação Musical"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "7bht53c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Musical Performance",
                        "es": "Actuación Musical",
                        "pt": "Performance Musical"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To provide music education programs that nurture musical skills and appreciation.",
                        "es": "Proveer programas de educación musical que fomenten las habilidades musicales y la apreciación.",
                        "pt": "Fornecer programas de educação musical que promovam habilidades musicais e apreciação."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c17",
                    "name": {
                        "en": "Performance Opportunities",
                        "es": "Oportunidades de Actuación",
                        "pt": "Oportunidades de Performance"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "7bht53c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Musical Performance",
                        "es": "Actuación Musical",
                        "pt": "Performance Musical"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To create opportunities for musicians to perform, showcasing their talents and engaging with audiences.",
                        "es": "Crear oportunidades para que los músicos actúen, mostrando sus talentos y comprometiéndose con el público.",
                        "pt": "Criar oportunidades para músicos se apresentarem, exibindo seus talentos e engajando com o público."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c18",
                    "name": {
                        "en": "Recording Studios",
                        "es": "Estudios de Grabación",
                        "pt": "Estúdios de Gravação"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "7bht53c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Musical Performance",
                        "es": "Actuación Musical",
                        "pt": "Performance Musical"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To provide recording studios that support the creation and production of high-quality music.",
                        "es": "Proveer estudios de grabación que apoyen la creación y producción de música de alta calidad.",
                        "pt": "Fornecer estúdios de gravação que suportem a criação e produção de música de alta qualidade."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c19",
                    "name": {
                        "en": "Theater Spaces",
                        "es": "Espacios Teatrales",
                        "pt": "Espaços Teatrais"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "2dy53c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Theater & Drama",
                        "es": "Teatro y Drama",
                        "pt": "Teatro e Drama"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To provide dedicated spaces for theatrical performances, enhancing cultural engagement and artistic expression.",
                        "es": "Proveer espacios dedicados para actuaciones teatrales, mejorando el compromiso cultural y la expresión artística.",
                        "pt": "Fornecer espaços dedicados para performances teatrais, aprimorando o engajamento cultural e a expressão artística."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c1a",
                    "name": {
                        "en": "Acting Workshops",
                        "es": "Talleres de Actuación",
                        "pt": "Oficinas de Atuação"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "2dy53c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Theater & Drama",
                        "es": "Teatro y Drama",
                        "pt": "Teatro e Drama"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To provide workshops that develop acting skills and techniques for aspiring actors.",
                        "es": "Proveer talleres que desarrollen habilidades y técnicas de actuación para actores aspirantes.",
                        "pt": "Fornecer oficinas que desenvolvam habilidades e técnicas de atuação para atores aspirantes."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c1b",
                    "name": {
                        "en": "Playwriting Support",
                        "es": "Apoyo a la Escritura de Obras",
                        "pt": "Apoio à Escrita de Peças"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "2dy53c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Theater & Drama",
                        "es": "Teatro y Drama",
                        "pt": "Teatro e Drama"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To support playwrights in the creation and development of new works for the stage.",
                        "es": "Apoyar a los dramaturgos en la creación y desarrollo de nuevas obras para el escenario.",
                        "pt": "Apoiar dramaturgos na criação e desenvolvimento de novas obras para o palco."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c1c",
                    "name": {
                        "en": "Theatrical Productions",
                        "es": "Producciones Teatrales",
                        "pt": "Produções Teatrais"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "2dy53c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Theater & Drama",
                        "es": "Teatro y Drama",
                        "pt": "Teatro e Drama"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To produce theatrical performances that entertain, educate, and inspire audiences.",
                        "es": "Producir actuaciones teatrales que entretengan, eduquen e inspiren al público.",
                        "pt": "Produzir performances teatrais que entretenham, eduquem e inspirem o público."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c1d",
                    "name": {
                        "en": "Community Theater",
                        "es": "Teatro Comunitario",
                        "pt": "Teatro Comunitário"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "2dy53c0e-ddcf-fer5-b82d-45dr56da020o",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c05-83c9-7c61-85f4-6a9e3e67d21f",
                    "isNeed": true,
                    "domainName": {
                        "en": "Theater & Drama",
                        "es": "Teatro y Drama",
                        "pt": "Teatro e Drama"
                    },
                    "sectorName": {
                        "en": "Cultural",
                        "es": "Cultural",
                        "pt": "Cultural"
                    },
                    "description": {
                        "en": "To support community theater initiatives that foster local talent and engage audiences in cultural activities.",
                        "es": "Apoyar las iniciativas de teatro comunitario que fomentan el talento local y comprometen al público en actividades culturales.",
                        "pt": "Apoiar iniciativas de teatro comunitário que promovam talentos locais e engajem o público em atividades culturais."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c23",
                    "name": {
                        "en": "Shared Resources",
                        "es": "Recursos Compartidos",
                        "pt": "Recursos Compartilhados"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-b82d-82d8b5da015e",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Collaborative Networks",
                        "es": "Redes Colaborativas",
                        "pt": "Redes Colaborativas"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To provide shared resources that enhance collaboration and efficiency across organizations.",
                        "es": "Proveer recursos compartidos que mejoren la colaboración y la eficiencia en todas las organizaciones.",
                        "pt": "Fornecer recursos compartilhados que aprimorem a colaboração e a eficiência entre organizações."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c24",
                    "name": {
                        "en": "Communication Platforms",
                        "es": "Plataformas de Comunicación",
                        "pt": "Plataformas de Comunicação"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-b82d-82d8b5da015e",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Collaborative Networks",
                        "es": "Redes Colaborativas",
                        "pt": "Redes Colaborativas"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To develop and maintain platforms that facilitate communication and information exchange between partners.",
                        "es": "Desarrollar y mantener plataformas que faciliten la comunicación y el intercambio de información entre socios.",
                        "pt": "Desenvolver e manter plataformas que facilitem a comunicação e a troca de informações entre parceiros."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c25",
                    "name": {
                        "en": "Joint Ventures",
                        "es": "Empresas Conjuntas",
                        "pt": "Empresas Conjuntas"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-b82d-82d8b5da015e",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Collaborative Networks",
                        "es": "Redes Colaborativas",
                        "pt": "Redes Colaborativas"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To support the formation of joint ventures that combine resources and expertise for mutual benefit.",
                        "es": "Apoyar la formación de empresas conjuntas que combinen recursos y conocimientos para beneficio mutuo.",
                        "pt": "Apoiar a formação de empresas conjuntas que combinem recursos e conhecimentos para benefício mútuo."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c26",
                    "name": {
                        "en": "Innovation Hubs",
                        "es": "Centros de Innovación",
                        "pt": "Hubs de Inovação"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-b82d-82d8b5da015e",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Collaborative Networks",
                        "es": "Redes Colaborativas",
                        "pt": "Redes Colaborativas"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To establish innovation hubs that foster creativity, collaboration, and the development of new ideas.",
                        "es": "Establecer centros de innovación que fomenten la creatividad, la colaboración y el desarrollo de nuevas ideas.",
                        "pt": "Estabelecer hubs de inovação que promovam criatividade, colaboração e o desenvolvimento de novas ideias."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c27",
                    "name": {
                        "en": "Partnerships",
                        "es": "Asociaciones",
                        "pt": "Parcerias"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-b82d-82d8b5da015e",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Collaborative Networks",
                        "es": "Redes Colaborativas",
                        "pt": "Redes Colaborativas"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To develop and formalize partnerships that outline shared goals, responsibilities, and benefits.",
                        "es": "Desarrollar y formalizar asociaciones que describan objetivos compartidos, responsabilidades y beneficios.",
                        "pt": "Desenvolver e formalizar parcerias que descrevam objetivos compartilhados, responsabilidades e benefícios."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c28",
                    "name": {
                        "en": "Market Analysis",
                        "es": "Análisis de Mercado",
                        "pt": "Análise de Mercado"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0d-8547-79f0-8d50-d5d94c39e988",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Financial Markets",
                        "es": "Mercados Financieros",
                        "pt": "Mercados Financeiros"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To conduct thorough market analysis to understand trends, opportunities, and risks.",
                        "es": "Realizar un análisis de mercado exhaustivo para comprender tendencias, oportunidades y riesgos.",
                        "pt": "Conduzir uma análise de mercado completa para entender tendências, oportunidades e riscos."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c29",
                    "name": {
                        "en": "Investment Opportunities",
                        "es": "Oportunidades de Inversión",
                        "pt": "Oportunidades de Investimento"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0d-8547-79f0-8d50-d5d94c39e988",
                    "keywords": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Financial Markets",
                        "es": "Mercados Financieros",
                        "pt": "Mercados Financeiros"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To identify and promote investment opportunities that support economic growth and stability.",
                        "es": "Identificar y promover oportunidades de inversión que apoyen el crecimiento y la estabilidad económica.",
                        "pt": "Identificar e promover oportunidades de investimento que suportem o crescimento econômico e a estabilidade."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c2a",
                    "name": {
                        "en": "Risk Management",
                        "es": "Gestión de Riesgos",
                        "pt": "Gestão de Riscos"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0d-8547-79f0-8d50-d5d94c39e988",
                    "keywords": {
                        "en": "risk, management, financial, loss, uncertainty",
                        "es": "riesgo, gestión, financiero, pérdida, incertidumbre",
                        "pt": "risco, gestão, financeiro, perda, incerteza"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Financial Markets",
                        "es": "Mercados Financieros",
                        "pt": "Mercados Financeiros"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To implement effective risk management strategies to mitigate financial losses and uncertainties.",
                        "es": "Implementar estrategias efectivas de gestión de riesgos para mitigar pérdidas financieras e incertidumbres.",
                        "pt": "Implementar estratégias eficazes de gestão de riscos para mitigar perdas financeiras e incertezas."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c2b",
                    "name": {
                        "en": "Financial Regulation",
                        "es": "Regulación Financiera",
                        "pt": "Regulamentação Financeira"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0d-8547-79f0-8d50-d5d94c39e988",
                    "keywords": {
                        "en": "regulation, financial, transparency, stability, investor",
                        "es": "regulación, financiero, transparencia, estabilidad, inversor",
                        "pt": "regulamentação, financeiro, transparência, estabilidade, investidor"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Financial Markets",
                        "es": "Mercados Financieros",
                        "pt": "Mercados Financeiros"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To ensure robust financial regulation that promotes transparency, stability, and investor confidence.",
                        "es": "Asegurar una regulación financiera sólida que promueva la transparencia, la estabilidad y la confianza de los inversores.",
                        "pt": "Garantir uma regulamentação financeira robusta que promova transparência, estabilidade e confiança dos investidores."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c2c",
                    "name": {
                        "en": "Market Accessibility",
                        "es": "Accesibilidad al Mercado",
                        "pt": "Acessibilidade ao Mercado"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0d-8547-79f0-8d50-d5d94c39e988",
                    "keywords": {
                        "en": "accessibility, market, participation, inclusivity",
                        "es": "accesibilidad, mercado, participación, inclusividad",
                        "pt": "acessibilidade, mercado, participação, inclusão"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Financial Markets",
                        "es": "Mercados Financieros",
                        "pt": "Mercados Financeiros"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To enhance market accessibility, allowing broader participation and fostering economic inclusivity.",
                        "es": "Mejorar la accesibilidad al mercado, permitiendo una participación más amplia y fomentando la inclusividad económica.",
                        "pt": "Melhorar a acessibilidade ao mercado, permitindo uma participação mais ampla e promovendo a inclusão econômica."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c2d",
                    "name": {
                        "en": "Market Spaces",
                        "es": "Espacios de Mercado",
                        "pt": "Espaços de Mercado"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0b-f14d-7106-a1d3-d2ab6227ada1",
                    "keywords": {
                        "en": "market, spaces, informal, trading, local, economies",
                        "es": "mercado, espacios, informal, comercio, local, economías",
                        "pt": "mercado, espaços, informal, comércio, local, economias"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Informal Trading",
                        "es": "Comercio Informal",
                        "pt": "Comércio Informal"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To provide designated spaces for informal trading, supporting local economies and vendors.",
                        "es": "Proveer espacios designados para el comercio informal, apoyando las economías locales y los vendedores.",
                        "pt": "Fornecer espaços designados para o comércio informal, apoiando as economias locais e os vendedores."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c2e",
                    "name": {
                        "en": "Vendor Support",
                        "es": "Apoyo a Vendedores",
                        "pt": "Apoio a Vendedores"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0b-f14d-7106-a1d3-d2ab6227ada1",
                    "keywords": {
                        "en": "vendor, support, informal, market, business, operations",
                        "es": "vendedor, apoyo, informal, mercado, negocios, operaciones",
                        "pt": "vendedor, apoio, informal, mercado, negócios, operações"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Informal Trading",
                        "es": "Comercio Informal",
                        "pt": "Comércio Informal"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To provide support services to vendors in informal markets, enhancing their business operations.",
                        "es": "Proveer servicios de apoyo a los vendedores en mercados informales, mejorando sus operaciones comerciales.",
                        "pt": "Fornecer serviços de apoio a vendedores em mercados informais, aprimorando suas operações comerciais."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c2f",
                    "name": {
                        "en": "Legal Recognition",
                        "es": "Reconocimiento Legal",
                        "pt": "Reconhecimento Legal"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0b-f14d-7106-a1d3-d2ab6227ada1",
                    "keywords": {
                        "en": "legal, recognition, protection, informal, traders, rights, security",
                        "es": "legal, reconocimiento, protección, informal, comerciantes, derechos, seguridad",
                        "pt": "legal, reconhecimento, proteção, informal, comerciantes, direitos, segurança"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Informal Trading",
                        "es": "Comercio Informal",
                        "pt": "Comércio Informal"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To work towards legal recognition and protection for informal traders, ensuring their rights and security.",
                        "es": "Trabajar hacia el reconocimiento y protección legal para los comerciantes informales, asegurando sus derechos y seguridad.",
                        "pt": "Trabalhar para o reconhecimento e proteção legal dos comerciantes informais, garantindo seus direitos e segurança."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c30",
                    "name": {
                        "en": "Trading Platforms",
                        "es": "Plataformas de Comercio",
                        "pt": "Plataformas de Comércio"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0b-f14d-7106-a1d3-d2ab6227ada1",
                    "keywords": {
                        "en": "trading, platforms, informal, market, transactions, growth",
                        "es": "comercio, plataformas, informal, mercado, transacciones, crecimiento",
                        "pt": "comércio, plataformas, informal, mercado, transações, crescimento"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Informal Trading",
                        "es": "Comercio Informal",
                        "pt": "Comércio Informal"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To develop and maintain trading platforms that facilitate informal market transactions and growth.",
                        "es": "Desarrollar y mantener plataformas de comercio que faciliten las transacciones y el crecimiento del mercado informal.",
                        "pt": "Desenvolver e manter plataformas de comércio que facilitem as transações e o crescimento do mercado informal."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c31",
                    "name": {
                        "en": "Community Support",
                        "es": "Apoyo Comunitario",
                        "pt": "Apoio Comunitário"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0b-f14d-7106-a1d3-d2ab6227ada1",
                    "keywords": {
                        "en": "community, support, development, informal, trading, networks",
                        "es": "comunidad, apoyo, desarrollo, informal, comercio, redes",
                        "pt": "comunidade, apoio, desenvolvimento, informal, comércio, redes"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Informal Trading",
                        "es": "Comercio Informal",
                        "pt": "Comércio Informal"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To provide community support and development programs that strengthen informal trading networks.",
                        "es": "Proveer programas de apoyo y desarrollo comunitario que fortalezcan las redes de comercio informal.",
                        "pt": "Fornecer programas de apoio e desenvolvimento comunitário que fortaleçam as redes de comércio informal."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c32",
                    "name": {
                        "en": "Secure Payment Systems",
                        "es": "Sistemas de Pago Seguro",
                        "pt": "Sistemas de Pagamento Seguro"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0c-f48b-707c-8fe0-faf8d1bf28d2",
                    "keywords": {
                        "en": "payment, systems, secure, consumers, vendors, transactions",
                        "es": "pago, sistemas, seguro, consumidores, vendedores, transacciones",
                        "pt": "pagamento, sistemas, seguro, consumidores, vendedores, transações"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Market Transactions",
                        "es": "Transacciones de Mercado",
                        "pt": "Transações de Mercado"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To implement secure payment systems that protect consumers and vendors, ensuring safe and reliable transactions.",
                        "es": "Implementar sistemas de pago seguros que protejan a los consumidores y vendedores, asegurando transacciones seguras y confiables.",
                        "pt": "Implementar sistemas de pagamento seguros que protejam consumidores e vendedores, garantindo transações seguras e confiáveis."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c33",
                    "name": {
                        "en": "Customer Trust",
                        "es": "Confianza del Cliente",
                        "pt": "Confiança do Cliente"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0c-f48b-707c-8fe0-faf8d1bf28d2",
                    "keywords": {
                        "en": "customer, trust, transparency, security, service",
                        "es": "cliente, confianza, transparencia, seguridad, servicio",
                        "pt": "cliente, confiança, transparência, segurança, serviço"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Market Transactions",
                        "es": "Transacciones de Mercado",
                        "pt": "Transações de Mercado"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To build and maintain customer trust through transparency, security, and reliable service.",
                        "es": "Construir y mantener la confianza del cliente a través de la transparencia, la seguridad y un servicio confiable.",
                        "pt": "Construir e manter a confiança do cliente através da transparência, segurança e serviço confiável."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c34",
                    "name": {
                        "en": "Transaction Efficiency",
                        "es": "Eficiencia de las Transacciones",
                        "pt": "Eficiência das Transações"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0c-f48b-707c-8fe0-faf8d1bf28d2",
                    "keywords": {
                        "en": "transaction, efficiency, processing, times, costs",
                        "es": "transacción, eficiencia, procesamiento, tiempos, costos",
                        "pt": "transação, eficiência, processamento, tempos, custos"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Market Transactions",
                        "es": "Transacciones de Mercado",
                        "pt": "Transações de Mercado"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To enhance the efficiency of transactions, reducing processing times and costs for all parties involved.",
                        "es": "Mejorar la eficiencia de las transacciones, reduciendo los tiempos de procesamiento y costos para todas las partes involucradas.",
                        "pt": "Melhorar a eficiência das transações, reduzindo tempos de processamento e custos para todas as partes envolvidas."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c35",
                    "name": {
                        "en": "Fair Pricing",
                        "es": "Precios Justos",
                        "pt": "Preços Justos"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0c-f48b-707c-8fe0-faf8d1bf28d2",
                    "keywords": {
                        "en": "fair, pricing, market, transactions, consumers, competitive",
                        "es": "justo, precios, mercado, transacciones, consumidores, competitivo",
                        "pt": "justo, preços, mercado, transações, consumidores, competitivo"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Market Transactions",
                        "es": "Transacciones de Mercado",
                        "pt": "Transações de Mercado"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To ensure fair pricing in market transactions, protecting consumers and promoting competitive practices.",
                        "es": "Asegurar precios justos en las transacciones del mercado, protegiendo a los consumidores y promoviendo prácticas competitivas.",
                        "pt": "Garantir preços justos nas transações de mercado, protegendo os consumidores e promovendo práticas competitivas."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c36",
                    "name": {
                        "en": "Market Data",
                        "es": "Datos de Mercado",
                        "pt": "Dados de Mercado"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0c-f48b-707c-8fe0-faf8d1bf28d2",
                    "keywords": {
                        "en": "market, data, analysis, strategies, transparency, growth",
                        "es": "mercado, datos, análisis, estrategias, transparencia, crecimiento",
                        "pt": "mercado, dados, análise, estratégias, transparência, crescimento"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Market Transactions",
                        "es": "Transacciones de Mercado",
                        "pt": "Transações de Mercado"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To collect and analyze market data to inform strategies, enhance transparency, and drive growth.",
                        "es": "Recopilar y analizar datos de mercado para informar estrategias, mejorar la transparencia e impulsar el crecimiento.",
                        "pt": "Coletar e analisar dados de mercado para informar estratégias, melhorar a transparência e impulsionar o crescimento."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c37",
                    "name": {
                        "en": "Efficient Transport",
                        "es": "Transporte Eficiente",
                        "pt": "Transporte Eficiente"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-7e82-7f8c-982b-55abf44ebb19",
                    "keywords": {
                        "en": "transport, efficient, systems, goods, movement, timely, cost-effective",
                        "es": "transporte, eficiente, sistemas, bienes, movimiento, oportuno, rentable",
                        "pt": "transporte, eficiente, sistemas, bens, movimento, oportuno, rentável"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Supply Chain Logistics",
                        "es": "Logística de la Cadena de Suministro",
                        "pt": "Logística da Cadeia de Suprimentos"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To ensure efficient transport systems that facilitate the timely and cost-effective movement of goods.",
                        "es": "Asegurar sistemas de transporte eficientes que faciliten el movimiento oportuno y rentable de bienes.",
                        "pt": "Garantir sistemas de transporte eficientes que facilitem o movimento oportuno e rentável de bens."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c38",
                    "name": {
                        "en": "Inventory Management",
                        "es": "Gestión de Inventarios",
                        "pt": "Gestão de Inventário"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-7e82-7f8c-982b-55abf44ebb19",
                    "keywords": {
                        "en": "inventory, management, systems, stock, levels, waste",
                        "es": "inventario, gestión, sistemas, niveles, stock, desperdicio",
                        "pt": "inventário, gestão, sistemas, níveis, estoque, desperdício"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Supply Chain Logistics",
                        "es": "Logística de la Cadena de Suministro",
                        "pt": "Logística da Cadeia de Suprimentos"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To implement effective inventory management systems that optimize stock levels and reduce waste.",
                        "es": "Implementar sistemas efectivos de gestión de inventarios que optimicen los niveles de stock y reduzcan el desperdicio.",
                        "pt": "Implementar sistemas eficazes de gestão de inventário que otimizem os níveis de estoque e reduzam o desperdício."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c39",
                    "name": {
                        "en": "Supplier Coordination",
                        "es": "Coordinación de Proveedores",
                        "pt": "Coordenação de Fornecedores"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-7e82-7f8c-982b-55abf44ebb19",
                    "keywords": {
                        "en": "supplier, coordination, supply, chain, operations, seamless, reliable",
                        "es": "proveedor, coordinación, cadena, suministro, operaciones, fluido, confiable",
                        "pt": "fornecedor, coordenação, cadeia, suprimentos, operações, contínuo, confiável"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Supply Chain Logistics",
                        "es": "Logística de la Cadena de Suministro",
                        "pt": "Logística da Cadeia de Suprimentos"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To enhance coordination with suppliers, ensuring seamless and reliable supply chain operations.",
                        "es": "Mejorar la coordinación con los proveedores, asegurando operaciones de cadena de suministro fluidas y confiables.",
                        "pt": "Melhorar a coordenação com os fornecedores, garantindo operações de cadeia de suprimentos contínuas e confiáveis."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c3a",
                    "name": {
                        "en": "Logistics Planning",
                        "es": "Planificación Logística",
                        "pt": "Planejamento Logístico"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-7e82-7f8c-982b-55abf44ebb19",
                    "keywords": {
                        "en": "logistics, planning, optimize, routes, reduce, costs, improve, delivery",
                        "es": "logística, planificación, optimizar, rutas, reducir, costos, mejorar, entrega",
                        "pt": "logística, planejamento, otimizar, rotas, reduzir, custos, melhorar, entrega"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Supply Chain Logistics",
                        "es": "Logística de la Cadena de Suministro",
                        "pt": "Logística da Cadeia de Suprimentos"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To develop comprehensive logistics plans that optimize routes, reduce costs, and improve delivery times.",
                        "es": "Desarrollar planes logísticos integrales que optimicen rutas, reduzcan costos y mejoren los tiempos de entrega.",
                        "pt": "Desenvolver planos logísticos abrangentes que otimizem rotas, reduzam custos e melhorem os tempos de entrega."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c3b",
                    "name": {
                        "en": "Risk Mitigation",
                        "es": "Mitigación de Riesgos",
                        "pt": "Mitigação de Riscos"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-7e82-7f8c-982b-55abf44ebb19",
                    "keywords": {
                        "en": "risk, mitigation, strategies, supply, chain, resilience, continuity",
                        "es": "riesgo, mitigación, estrategias, cadena, suministro, resiliencia, continuidad",
                        "pt": "risco, mitigação, estratégias, cadeia, suprimentos, resiliência, continuidade"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Supply Chain Logistics",
                        "es": "Logística de la Cadena de Suministro",
                        "pt": "Logística da Cadeia de Suprimentos"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "To implement risk mitigation strategies that ensure supply chain resilience and continuity.",
                        "es": "Implementar estrategias de mitigación de riesgos que aseguren la resiliencia y continuidad de la cadena de suministro.",
                        "pt": "Implementar estratégias de mitigação de riscos que garantam a resiliência e continuidade da cadeia de suprimentos."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c3c",
                    "name": {
                        "en": "Biodiversity Protection",
                        "es": "Protección de la Biodiversidad",
                        "pt": "Proteção da Biodiversidade"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-12wd-45dr56da020o",
                    "keywords": {
                        "en": "biodiversity, protection, measures, promote, survival, species, ecosystems",
                        "es": "biodiversidad, protección, medidas, promover, supervivencia, especies, ecosistemas",
                        "pt": "biodiversidade, proteção, medidas, promover, sobrevivência, espécies, ecossistemas"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Conservation Efforts",
                        "es": "Esfuerzos de Conservación",
                        "pt": "Esforços de Conservação"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To implement measures that protect and promote biodiversity, ensuring the survival of diverse species and ecosystems.",
                        "es": "Implementar medidas que protejan y promuevan la biodiversidad, asegurando la supervivencia de diversas especies y ecosistemas.",
                        "pt": "Implementar medidas que protejam e promovam a biodiversidade, garantindo a sobrevivência de diversas espécies e ecossistemas."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c3d",
                    "name": {
                        "en": "Pollution Control",
                        "es": "Control de la Contaminación",
                        "pt": "Controle da Poluição"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-12wd-45dr56da020o",
                    "keywords": {
                        "en": "pollution, control, regulatory, measures, technological, innovations, community, awareness",
                        "es": "contaminación, control, medidas, regulatorias, innovaciones, tecnológicas, conciencia, comunitaria",
                        "pt": "poluição, controle, medidas, regulatórias, inovações, tecnológicas, conscientização, comunitária"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Conservation Efforts",
                        "es": "Esfuerzos de Conservación",
                        "pt": "Esforços de Conservação"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To reduce pollution through regulatory measures, technological innovations, and community awareness initiatives.",
                        "es": "Reducir la contaminación a través de medidas regulatorias, innovaciones tecnológicas e iniciativas de concienciación comunitaria.",
                        "pt": "Reduzir a poluição através de medidas regulatórias, inovações tecnológicas e iniciativas de conscientização comunitária."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c3e",
                    "name": {
                        "en": "Habitat Restoration",
                        "es": "Restauración del Hábitat",
                        "pt": "Restauração do Habitat"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-12wd-45dr56da020o",
                    "keywords": {
                        "en": "habitat, restoration, degraded, enhance, biodiversity, ecological, balance",
                        "es": "hábitat, restauración, degradado, mejorar, biodiversidad, equilibrio, ecológico",
                        "pt": "habitat, restauração, degradado, melhorar, biodiversidade, equilíbrio, ecológico"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Conservation Efforts",
                        "es": "Esfuerzos de Conservación",
                        "pt": "Esforços de Conservação"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To restore degraded habitats, enhancing biodiversity and ecological balance.",
                        "es": "Restaurar hábitats degradados, mejorando la biodiversidad y el equilibrio ecológico.",
                        "pt": "Restaurar habitats degradados, melhorando a biodiversidade e o equilíbrio ecológico."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c3f",
                    "name": {
                        "en": "Environmental Education",
                        "es": "Educación Ambiental",
                        "pt": "Educação Ambiental"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-12wd-45dr56da020o",
                    "keywords": {
                        "en": "environmental, education, promote, awareness, sustainable, practices, communities",
                        "es": "ambiental, educación, promover, conciencia, prácticas, sostenibles, comunidades",
                        "pt": "ambiental, educação, promover, conscientização, práticas, sustentáveis, comunidades"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Conservation Efforts",
                        "es": "Esfuerzos de Conservación",
                        "pt": "Esforços de Conservação"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To promote environmental education, raising awareness and encouraging sustainable practices within communities.",
                        "es": "Promover la educación ambiental, aumentando la conciencia y fomentando prácticas sostenibles dentro de las comunidades.",
                        "pt": "Promover a educação ambiental, aumentando a conscientização e incentivando práticas sustentáveis dentro das comunidades."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c40",
                    "name": {
                        "en": "Conservation Funding",
                        "es": "Financiamiento de Conservación",
                        "pt": "Financiamento de Conservação"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-12wd-45dr56da020o",
                    "keywords": {
                        "en": "conservation, funding, secure, financial, support, sustainable, initiatives",
                        "es": "conservación, financiamiento, asegurar, apoyo, financiero, sostenible, iniciativas",
                        "pt": "conservação, financiamento, garantir, apoio, financeiro, sustentável, iniciativas"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Conservation Efforts",
                        "es": "Esfuerzos de Conservación",
                        "pt": "Esforços de Conservação"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To secure funding for conservation projects, ensuring the financial support necessary for sustainable environmental initiatives.",
                        "es": "Asegurar financiamiento para proyectos de conservación, garantizando el apoyo financiero necesario para iniciativas ambientales sostenibles.",
                        "pt": "Garantir financiamento para projetos de conservação, garantindo o apoio financeiro necessário para iniciativas ambientais sustentáveis."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c41",
                    "name": {
                        "en": "Green Technologies",
                        "es": "Tecnologías Verdes",
                        "pt": "Tecnologias Verdes"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-23f5-45dr56da020o",
                    "keywords": {
                        "en": "green, technologies, develop, implement, minimize, environmental, impact, sustainability",
                        "es": "verdes, tecnologías, desarrollar, implementar, minimizar, impacto, ambiental, sostenibilidad",
                        "pt": "verdes, tecnologias, desenvolver, implementar, minimizar, impacto, ambiental, sustentabilidade"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Sustainable Practices",
                        "es": "Prácticas Sostenibles",
                        "pt": "Práticas Sustentáveis"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To develop and implement green technologies that minimize environmental impact and promote sustainability.",
                        "es": "Desarrollar e implementar tecnologías verdes que minimicen el impacto ambiental y promuevan la sostenibilidad.",
                        "pt": "Desenvolver e implementar tecnologias verdes que minimizem o impacto ambiental e promovam a sustentabilidade."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c42",
                    "name": {
                        "en": "Energy Efficiency",
                        "es": "Eficiencia Energética",
                        "pt": "Eficiência Energética"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-23f5-45dr56da020o",
                    "keywords": {
                        "en": "energy, efficiency, buildings, transportation, industries, reduce, consumption, emissions",
                        "es": "energía, eficiencia, edificios, transporte, industrias, reducir, consumo, emisiones",
                        "pt": "energia, eficiência, edifícios, transporte, indústrias, reduzir, consumo, emissões"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Sustainable Practices",
                        "es": "Prácticas Sostenibles",
                        "pt": "Práticas Sustentáveis"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To promote energy efficiency in buildings, transportation, and industries, reducing energy consumption and greenhouse gas emissions.",
                        "es": "Promover la eficiencia energética en edificios, transporte e industrias, reduciendo el consumo de energía y las emisiones de gases de efecto invernadero.",
                        "pt": "Promover a eficiência energética em edifícios, transportes e indústrias, reduzindo o consumo de energia e as emissões de gases de efeito estufa."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c43",
                    "name": {
                        "en": "Waste Reduction",
                        "es": "Reducción de Residuos",
                        "pt": "Redução de Resíduos"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-23f5-45dr56da020o",
                    "keywords": {
                        "en": "waste, reduction, strategies, recycling, composting, responsible, consumption",
                        "es": "residuos, reducción, estrategias, reciclaje, compostaje, consumo, responsable",
                        "pt": "resíduos, redução, estratégias, reciclagem, compostagem, consumo, responsável"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Sustainable Practices",
                        "es": "Prácticas Sostenibles",
                        "pt": "Práticas Sustentáveis"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To implement waste reduction strategies, promoting recycling, composting, and responsible consumption to minimize waste.",
                        "es": "Implementar estrategias de reducción de residuos, promoviendo el reciclaje, compostaje y el consumo responsable para minimizar los residuos.",
                        "pt": "Implementar estratégias de redução de resíduos, promovendo a reciclagem, compostagem e consumo responsável para minimizar os resíduos."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c44",
                    "name": {
                        "en": "Sustainable Agriculture",
                        "es": "Agricultura Sostenible",
                        "pt": "Agricultura Sustentável"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-23f5-45dr56da020o",
                    "keywords": {
                        "en": "sustainable, agriculture, practices, food, security, protect, environment, local, economies",
                        "es": "sostenible, agricultura, prácticas, seguridad, alimentaria, proteger, medio, ambiente, economías, locales",
                        "pt": "sustentável, agricultura, práticas, segurança, alimentar, proteger, meio, ambiente, economias, locais"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Sustainable Practices",
                        "es": "Prácticas Sostenibles",
                        "pt": "Práticas Sustentáveis"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To promote sustainable agriculture practices that enhance food security, protect the environment, and support local economies.",
                        "es": "Promover prácticas de agricultura sostenible que mejoren la seguridad alimentaria, protejan el medio ambiente y apoyen las economías locales.",
                        "pt": "Promover práticas agrícolas sustentáveis que melhorem a segurança alimentar, protejam o meio ambiente e apoiem as economias locais."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c45",
                    "name": {
                        "en": "Water Conservation",
                        "es": "Conservación del Agua",
                        "pt": "Conservação da Água"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-23f5-45dr56da020o",
                    "keywords": {
                        "en": "water, conservation, techniques, sustainable, use, resources, protect, shortages, preserve, ecosystems",
                        "es": "agua, conservación, técnicas, uso, sostenible, recursos, proteger, escasez, preservar, ecosistemas",
                        "pt": "água, conservação, técnicas, uso, sustentável, recursos, proteger, escassez, preservar, ecossistemas"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Sustainable Practices",
                        "es": "Prácticas Sostenibles",
                        "pt": "Práticas Sustentáveis"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To implement water conservation techniques that ensure the sustainable use of water resources, protecting against shortages and preserving ecosystems.",
                        "es": "Implementar técnicas de conservación de agua que aseguren el uso sostenible de los recursos hídricos, protegiendo contra la escasez y preservando los ecosistemas.",
                        "pt": "Implementar técnicas de conservação de água que garantam o uso sustentável dos recursos hídricos, protegendo contra a escassez e preservando os ecossistemas."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c46",
                    "name": {
                        "en": "Zoning Laws",
                        "es": "Leyes de Zonificación",
                        "pt": "Leis de Zoneamento"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-77gh-45dr56da020o",
                    "keywords": {
                        "en": "zoning, laws, develop, enforce, sustainable, land, use, community, development",
                        "es": "zonificación, leyes, desarrollar, hacer, cumplir, uso, sostenible, tierra, desarrollo, comunitario",
                        "pt": "zoneamento, leis, desenvolver, aplicar, uso, sustentável, terra, desenvolvimento, comunitário"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Urban Planning",
                        "es": "Planificación Urbana",
                        "pt": "Planejamento Urbano"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To develop and enforce zoning laws that promote sustainable land use and community development.",
                        "es": "Desarrollar y hacer cumplir las leyes de zonificación que promuevan el uso sostenible de la tierra y el desarrollo comunitario.",
                        "pt": "Desenvolver e aplicar leis de zoneamento que promovam o uso sustentável da terra e o desenvolvimento comunitário."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c47",
                    "name": {
                        "en": "Infrastructure Development",
                        "es": "Desarrollo de Infraestructura",
                        "pt": "Desenvolvimento de Infraestrutura"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-77gh-45dr56da020o",
                    "keywords": {
                        "en": "infrastructure, development, urban, planning, sustainable, growth, quality, life",
                        "es": "infraestructura, desarrollo, urbano, planificación, sostenible, crecimiento, calidad, vida",
                        "pt": "infraestrutura, desenvolvimento, urbano, planejamento, sustentável, crescimento, qualidade, vida"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Urban Planning",
                        "es": "Planificación Urbana",
                        "pt": "Planejamento Urbano"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To plan and develop infrastructure that supports sustainable urban growth and enhances quality of life.",
                        "es": "Planificar y desarrollar infraestructura que apoye el crecimiento urbano sostenible y mejore la calidad de vida.",
                        "pt": "Planejar e desenvolver infraestrutura que apoie o crescimento urbano sustentável e melhore a qualidade de vida."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c48",
                    "name": {
                        "en": "Public Spaces",
                        "es": "Espacios Públicos",
                        "pt": "Espaços Públicos"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-77gh-45dr56da020o",
                    "keywords": {
                        "en": "public, spaces, community, interaction, recreation, environmental, sustainability",
                        "es": "públicos, espacios, comunidad, interacción, recreación, sostenibilidad, ambiental",
                        "pt": "públicos, espaços, comunidade, interação, recreação, sustentabilidade, ambiental"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Urban Planning",
                        "es": "Planificación Urbana",
                        "pt": "Planejamento Urbano"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To create and maintain public spaces that promote community interaction, recreation, and environmental sustainability.",
                        "es": "Crear y mantener espacios públicos que promuevan la interacción comunitaria, la recreación y la sostenibilidad ambiental.",
                        "pt": "Criar e manter espaços públicos que promovam a interação comunitária, a recreação e a sustentabilidade ambiental."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c49",
                    "name": {
                        "en": "Community Input",
                        "es": "Participación Comunitaria",
                        "pt": "Participação Comunitária"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-77gh-45dr56da020o",
                    "keywords": {
                        "en": "community, input, urban, planning, decisions, inclusive, sustainable, development",
                        "es": "comunidad, participación, urbana, planificación, decisiones, inclusiva, sostenible, desarrollo",
                        "pt": "comunidade, participação, urbana, planejamento, decisões, inclusiva, sustentável, desenvolvimento"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Urban Planning",
                        "es": "Planificación Urbana",
                        "pt": "Planejamento Urbano"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To ensure community input in urban planning decisions, fostering inclusive and sustainable development.",
                        "es": "Asegurar la participación comunitaria en las decisiones de planificación urbana, fomentando el desarrollo inclusivo y sostenible.",
                        "pt": "Garantir a participação da comunidade nas decisões de planejamento urbano, promovendo o desenvolvimento inclusivo e sustentável."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c4a",
                    "name": {
                        "en": "Sustainable Design",
                        "es": "Diseño Sostenible",
                        "pt": "Design Sustentável"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-77gh-45dr56da020o",
                    "keywords": {
                        "en": "sustainable, design, principles, urban, development, reduce, environmental, impact, livability",
                        "es": "sostenible, diseño, principios, urbano, desarrollo, reducir, impacto, ambiental, habitabilidad",
                        "pt": "sustentável, design, princípios, urbano, desenvolvimento, reduzir, impacto, ambiental, habitabilidade"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Urban Planning",
                        "es": "Planificación Urbana",
                        "pt": "Planejamento Urbano"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To promote sustainable design principles in urban development, reducing environmental impact and enhancing livability.",
                        "es": "Promover principios de diseño sostenible en el desarrollo urbano, reduciendo el impacto ambiental y mejorando la habitabilidad.",
                        "pt": "Promover princípios de design sustentável no desenvolvimento urbano, reduzindo o impacto ambiental e melhorando a habitabilidade."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c4b",
                    "name": {
                        "en": "Anti-Poaching Efforts",
                        "es": "Esfuerzos contra la Caza Furtiva",
                        "pt": "Esforços Contra a Caça Furtiva"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-dt45-45dr56da020o",
                    "keywords": {
                        "en": "anti-poaching, efforts, protect, endangered, species, preserve, biodiversity",
                        "es": "anti-caza furtiva, esfuerzos, proteger, especies, en peligro, preservar, biodiversidad",
                        "pt": "anti-caça furtiva, esforços, proteger, espécies, em perigo, preservar, biodiversidade"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Wildlife Protection",
                        "es": "Protección de Vida Silvestre",
                        "pt": "Proteção da Vida Selvagem"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To enhance anti-poaching efforts, protecting endangered species and preserving biodiversity.",
                        "es": "Mejorar los esfuerzos contra la caza furtiva, protegiendo las especies en peligro y preservando la biodiversidad.",
                        "pt": "Aprimorar os esforços contra a caça furtiva, protegendo espécies em perigo e preservando a biodiversidade."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c4c",
                    "name": {
                        "en": "Habitat Conservation",
                        "es": "Conservación de Hábitats",
                        "pt": "Conservação de Habitats"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-dt45-45dr56da020o",
                    "keywords": {
                        "en": "habitat, conservation, natural, ensure, survival, diverse, wildlife, species",
                        "es": "hábitat, conservación, natural, asegurar, supervivencia, diversas, especies, vida silvestre",
                        "pt": "habitat, conservação, natural, garantir, sobrevivência, diversas, espécies, vida selvagem"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Wildlife Protection",
                        "es": "Protección de Vida Silvestre",
                        "pt": "Proteção da Vida Selvagem"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To conserve natural habitats, ensuring the survival of diverse wildlife species.",
                        "es": "Conservar los hábitats naturales, asegurando la supervivencia de diversas especies de vida silvestre.",
                        "pt": "Conservar habitats naturais, garantindo a sobrevivência de diversas espécies de vida selvagem."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c4d",
                    "name": {
                        "en": "Wildlife Corridors",
                        "es": "Corredores de Vida Silvestre",
                        "pt": "Corredores de Vida Selvagem"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-dt45-45dr56da020o",
                    "keywords": {
                        "en": "wildlife, corridors, establish, maintain, safe, migration, movement, species",
                        "es": "vida silvestre, corredores, establecer, mantener, segura, migración, movimiento, especies",
                        "pt": "vida selvagem, corredores, estabelecer, manter, segura, migração, movimento, espécies"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Wildlife Protection",
                        "es": "Protección de Vida Silvestre",
                        "pt": "Proteção da Vida Selvagem"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To establish and maintain wildlife corridors, allowing safe migration and movement of species.",
                        "es": "Establecer y mantener corredores de vida silvestre, permitiendo la migración y el movimiento seguros de las especies.",
                        "pt": "Estabelecer e manter corredores de vida selvagem, permitindo a migração e o movimento seguros das espécies."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c4e",
                    "name": {
                        "en": "Legal Protection",
                        "es": "Protección Legal",
                        "pt": "Proteção Legal"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-dt45-45dr56da020o",
                    "keywords": {
                        "en": "legal, protection, strengthen, wildlife, effective, enforcement, penalties, violations",
                        "es": "legal, protección, fortalecer, vida silvestre, efectiva, aplicación, sanciones, violaciones",
                        "pt": "legal, proteção, fortalecer, vida selvagem, eficaz, aplicação, penalidades, violações"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Wildlife Protection",
                        "es": "Protección de Vida Silvestre",
                        "pt": "Proteção da Vida Selvagem"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To strengthen legal protections for wildlife, ensuring effective enforcement and penalties for violations.",
                        "es": "Fortalecer las protecciones legales para la vida silvestre, asegurando una aplicación efectiva y sanciones para las violaciones.",
                        "pt": "Fortalecer as proteções legais para a vida selvagem, garantindo a aplicação eficaz e penalidades para violações."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c4f",
                    "name": {
                        "en": "Public Awareness",
                        "es": "Conciencia Pública",
                        "pt": "Consciência Pública"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-dt45-45dr56da020o",
                    "keywords": {
                        "en": "public, awareness, importance, wildlife, protection, conservation, efforts",
                        "es": "público, conciencia, importancia, vida silvestre, protección, conservación, esfuerzos",
                        "pt": "público, consciência, importância, vida selvagem, proteção, conservação, esforços"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Wildlife Protection",
                        "es": "Protección de Vida Silvestre",
                        "pt": "Proteção da Vida Selvagem"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To raise public awareness about the importance of wildlife protection and conservation efforts.",
                        "es": "Aumentar la conciencia pública sobre la importancia de la protección de la vida silvestre y los esfuerzos de conservación.",
                        "pt": "Aumentar a conscientização pública sobre a importância da proteção da vida selvagem e os esforços de conservação."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c50",
                    "name": {
                        "en": "Water Conservation",
                        "es": "Conservación del Agua",
                        "pt": "Conservação da Água"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-gft5-45dr56da020o",
                    "keywords": {
                        "en": "water, conservation, techniques, sustainable, use, resources",
                        "es": "agua, conservación, técnicas, uso, sostenible, recursos",
                        "pt": "água, conservação, técnicas, uso, sustentável, recursos"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Water Management",
                        "es": "Gestión del Agua",
                        "pt": "Gestão da Água"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To implement water conservation techniques that ensure the sustainable use of water resources.",
                        "es": "Implementar técnicas de conservación del agua que aseguren el uso sostenible de los recursos hídricos.",
                        "pt": "Implementar técnicas de conservação da água que garantam o uso sustentável dos recursos hídricos."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c51",
                    "name": {
                        "en": "Pollution Control",
                        "es": "Control de la Contaminación",
                        "pt": "Controle da Poluição"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-gft5-45dr56da020o",
                    "keywords": {
                        "en": "pollution, control, reduce, regulatory, measures, technological, innovations, community, awareness",
                        "es": "contaminación, control, reducir, medidas, regulatorias, innovaciones, tecnológicas, comunidad, conciencia",
                        "pt": "poluição, controle, reduzir, medidas, regulatórias, inovações, tecnológicas, comunidade, conscientização"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Water Management",
                        "es": "Gestión del Agua",
                        "pt": "Gestão da Água"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To reduce water pollution through regulatory measures, technological innovations, and community awareness initiatives.",
                        "es": "Reducir la contaminación del agua a través de medidas regulatorias, innovaciones tecnológicas e iniciativas de concienciación comunitaria.",
                        "pt": "Reduzir a poluição da água através de medidas regulatórias, inovações tecnológicas e iniciativas de conscientização comunitária."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c52",
                    "name": {
                        "en": "Sustainable Usage",
                        "es": "Uso Sostenible",
                        "pt": "Uso Sustentável"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-gft5-45dr56da020o",
                    "keywords": {
                        "en": "sustainable, usage, practices, balance, human, needs, environmental, health",
                        "es": "sostenible, uso, prácticas, equilibrio, necesidades, humanas, salud, ambiental",
                        "pt": "sustentável, uso, práticas, equilíbrio, necessidades, humanas, saúde, ambiental"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Water Management",
                        "es": "Gestión del Agua",
                        "pt": "Gestão da Água"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To promote sustainable water usage practices that balance human needs with environmental health.",
                        "es": "Promover prácticas de uso sostenible del agua que equilibren las necesidades humanas con la salud ambiental.",
                        "pt": "Promover práticas de uso sustentável da água que equilibrem as necessidades humanas com a saúde ambiental."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c53",
                    "name": {
                        "en": "Water Infrastructure",
                        "es": "Infraestructura Hídrica",
                        "pt": "Infraestrutura Hídrica"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-gft5-45dr56da020o",
                    "keywords": {
                        "en": "water, infrastructure, develop, maintain, efficient, distribution, quality, control",
                        "es": "agua, infraestructura, desarrollar, mantener, eficiente, distribución, calidad, control",
                        "pt": "água, infraestrutura, desenvolver, manter, eficiente, distribuição, qualidade, controle"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Water Management",
                        "es": "Gestión del Agua",
                        "pt": "Gestão da Água"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To develop and maintain water infrastructure that ensures efficient distribution and quality control.",
                        "es": "Desarrollar y mantener infraestructura hídrica que garantice una distribución eficiente y un control de calidad.",
                        "pt": "Desenvolver e manter infraestrutura hídrica que garanta distribuição eficiente e controle de qualidade."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c54",
                    "name": {
                        "en": "Community Engagement",
                        "es": "Participación Comunitaria",
                        "pt": "Engajamento Comunitário"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-78d0-gft5-45dr56da020o",
                    "keywords": {
                        "en": "community, engagement, water, management, practices, awareness, participation, conservation",
                        "es": "comunidad, participación, gestión, agua, prácticas, conciencia, conservación",
                        "pt": "comunidade, engajamento, gestão, água, práticas, conscientização, conservação"
                    },
                    "sectorId": "018f2c06-7029-7076-99b1-f5201e68a4a0",
                    "isNeed": true,
                    "domainName": {
                        "en": "Water Management",
                        "es": "Gestión del Agua",
                        "pt": "Gestão da Água"
                    },
                    "sectorName": {
                        "en": "Environmental",
                        "es": "Ambiental",
                        "pt": "Ambiental"
                    },
                    "description": {
                        "en": "To engage communities in water management practices, promoting awareness and participation in conservation efforts.",
                        "es": "Involucrar a las comunidades en las prácticas de gestión del agua, promoviendo la concienciación y la participación en los esfuerzos de conservación.",
                        "pt": "Envolver as comunidades nas práticas de gestão da água, promovendo a conscientização e a participação nos esforços de conservação."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c55",
                    "name": {
                        "en": "Counseling Services",
                        "es": "Servicios de Asesoramiento",
                        "pt": "Serviços de Aconselhamento"
                    },
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-gh78-b82d-4578adcda020o",
                    "keywords": {
                        "en": "counseling, services, professional, support, emotional, psychological, well-being",
                        "es": "asesoramiento, servicios, profesional, apoyo, emocional, psicológico, bienestar",
                        "pt": "aconselhamento, serviços, profissional, suporte, emocional, psicológico, bem-estar"
                    },
                    "sectorId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "isNeed": true,
                    "domainName": {
                        "en": "Mental Health Services",
                        "es": "Servicios de Salud Mental",
                        "pt": "Serviços de Saúde Mental"
                    },
                    "sectorName": {
                        "en": "Health & Wellbeing",
                        "es": "Salud y Bienestar",
                        "pt": "Saúde e Bem-Estar"
                    },
                    "description": {
                        "en": "To provide professional counseling services that support emotional and psychological well-being.",
                        "es": "Proporcionar servicios profesionales de asesoramiento que apoyen el bienestar emocional y psicológico.",
                        "pt": "Fornecer serviços de aconselhamento profissional que apoiem o bem-estar emocional e psicológico."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c56",
                    "name": {
                        "en": "Support Groups",
                        "es": "Grupos de Apoyo",
                        "pt": "Grupos de Apoio"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-gh78-b82d-4578adcda020o",
                    "keywords": {
                        "en": "support, groups, safe, space, sharing, experiences, emotional, support",
                        "es": "apoyo, grupos, espacio, seguro, compartir, experiencias, apoyo, emocional",
                        "pt": "apoio, grupos, espaço, seguro, compartilhar, experiências, apoio, emocional"
                    },
                    "sectorId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "isNeed": true,
                    "domainName": {
                        "en": "Mental Health Services",
                        "es": "Servicios de Salud Mental",
                        "pt": "Serviços de Saúde Mental"
                    },
                    "sectorName": {
                        "en": "Health & Wellbeing",
                        "es": "Salud y Bienestar",
                        "pt": "Saúde e Bem-Estar"
                    },
                    "description": {
                        "en": "To offer support groups that provide a safe space for sharing experiences and receiving emotional support.",
                        "es": "Ofrecer grupos de apoyo que proporcionen un espacio seguro para compartir experiencias y recibir apoyo emocional.",
                        "pt": "Oferecer grupos de apoio que proporcionem um espaço seguro para compartilhar experiências e receber apoio emocional."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c57",
                    "name": {
                        "en": "Crisis Intervention",
                        "es": "Intervención en Crisis",
                        "pt": "Intervenção em Crise"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-gh78-b82d-4578adcda020o",
                    "keywords": {
                        "en": "crisis, intervention, immediate, services, severe, mental, health, crises",
                        "es": "crisis, intervención, inmediata, servicios, graves, salud, mental, crisis",
                        "pt": "crise, intervenção, imediata, serviços, graves, saúde, mental, crises"
                    },
                    "sectorId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "isNeed": true,
                    "domainName": {
                        "en": "Mental Health Services",
                        "es": "Servicios de Salud Mental",
                        "pt": "Serviços de Saúde Mental"
                    },
                    "sectorName": {
                        "en": "Health & Wellbeing",
                        "es": "Salud y Bienestar",
                        "pt": "Saúde e Bem-Estar"
                    },
                    "description": {
                        "en": "To provide immediate crisis intervention services for individuals experiencing severe mental health crises.",
                        "es": "Proporcionar servicios de intervención en crisis inmediatos para individuos que experimentan crisis de salud mental graves.",
                        "pt": "Fornecer serviços de intervenção em crise imediatos para indivíduos que estão passando por crises graves de saúde mental."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c58",
                    "name": {
                        "en": "Mental Health Awareness",
                        "es": "Conciencia sobre la Salud Mental",
                        "pt": "Conscientização sobre Saúde Mental"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-gh78-b82d-4578adcda020o",
                    "keywords": {
                        "en": "mental, health, awareness, promote, reduce, stigma, education, outreach",
                        "es": "salud, mental, conciencia, promover, reducir, estigma, educación, alcance",
                        "pt": "saúde, mental, conscientização, promover, reduzir, estigma, educação, alcance"
                    },
                    "sectorId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "isNeed": true,
                    "domainName": {
                        "en": "Mental Health Services",
                        "es": "Servicios de Salud Mental",
                        "pt": "Serviços de Saúde Mental"
                    },
                    "sectorName": {
                        "en": "Health & Wellbeing",
                        "es": "Salud y Bienestar",
                        "pt": "Saúde e Bem-Estar"
                    },
                    "description": {
                        "en": "To promote mental health awareness and reduce stigma through education and outreach programs.",
                        "es": "Promover la conciencia sobre la salud mental y reducir el estigma a través de programas de educación y alcance.",
                        "pt": "Promover a conscientização sobre saúde mental e reduzir o estigma através de programas de educação e divulgação."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c59",
                    "name": {
                        "en": "Access to Care",
                        "es": "Acceso a la Atención",
                        "pt": "Acesso ao Cuidado"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-gh78-b82d-4578adcda020o",
                    "keywords": {
                        "en": "access, care, mental, health, services, socioeconomic, status",
                        "es": "acceso, atención, salud, mental, servicios, estatus, socioeconómico",
                        "pt": "acesso, cuidado, saúde, mental, serviços, status, socioeconômico"
                    },
                    "sectorId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "isNeed": true,
                    "domainName": {
                        "en": "Mental Health Services",
                        "es": "Servicios de Salud Mental",
                        "pt": "Serviços de Saúde Mental"
                    },
                    "sectorName": {
                        "en": "Health & Wellbeing",
                        "es": "Salud y Bienestar",
                        "pt": "Saúde e Bem-Estar"
                    },
                    "description": {
                        "en": "To ensure access to mental health care services for all individuals, regardless of their socioeconomic status.",
                        "es": "Garantizar el acceso a servicios de atención de salud mental para todos los individuos, independientemente de su estatus socioeconómico.",
                        "pt": "Garantir o acesso aos serviços de saúde mental para todos os indivíduos, independentemente de seu status socioeconômico."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c60",
                    "name": {
                        "en": "Food Assistance",
                        "es": "Asistencia Alimentaria",
                        "pt": "Assistência Alimentar"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-yu65-b82d-4578adcda020o",
                    "keywords": {
                        "en": "food, assistance, programs, access, nutritious, need",
                        "es": "alimentos, asistencia, programas, acceso, nutritivos, necesidad",
                        "pt": "alimentos, assistência, programas, acesso, nutritivos, necessidade"
                    },
                    "sectorId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "isNeed": true,
                    "domainName": {
                        "en": "Nutritional Support",
                        "es": "Apoyo Nutricional",
                        "pt": "Apoio Nutricional"
                    },
                    "sectorName": {
                        "en": "Health & Wellbeing",
                        "es": "Salud y Bienestar",
                        "pt": "Saúde e Bem-Estar"
                    },
                    "description": {
                        "en": "To provide food assistance programs that ensure access to nutritious food for those in need.",
                        "es": "Proporcionar programas de asistencia alimentaria que garanticen el acceso a alimentos nutritivos para aquellos que lo necesiten.",
                        "pt": "Fornecer programas de assistência alimentar que garantam o acesso a alimentos nutritivos para aqueles que precisam."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c61",
                    "name": {
                        "en": "Nutritional Education",
                        "es": "Educación Nutricional",
                        "pt": "Educação Nutricional"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-yu65-b82d-4578adcda020o",
                    "keywords": {
                        "en": "nutritional, education, promote, healthy, eating, habits, informed, dietary, choices",
                        "es": "nutricional, educación, promover, saludable, hábitos, informados, dietéticas, elecciones",
                        "pt": "nutricional, educação, promover, saudável, hábitos, informadas, dietéticas, escolhas"
                    },
                    "sectorId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "isNeed": true,
                    "domainName": {
                        "en": "Nutritional Support",
                        "es": "Apoyo Nutricional",
                        "pt": "Apoio Nutricional"
                    },
                    "sectorName": {
                        "en": "Health & Wellbeing",
                        "es": "Salud y Bienestar",
                        "pt": "Saúde e Bem-Estar"
                    },
                    "description": {
                        "en": "To provide nutritional education that promotes healthy eating habits and informed dietary choices.",
                        "es": "Proporcionar educación nutricional que promueva hábitos alimenticios saludables y elecciones dietéticas informadas.",
                        "pt": "Proporcionar educação nutricional que promova hábitos alimentares saudáveis e escolhas dietéticas informadas."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c62",
                    "name": {
                        "en": "Healthy Eating Programs",
                        "es": "Programas de Alimentación Saludable",
                        "pt": "Programas de Alimentação Saudável"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-yu65-b82d-4578adcda020o",
                    "keywords": {
                        "en": "healthy, eating, programs, balanced, diets, prevent, diet-related, diseases",
                        "es": "saludable, alimentación, programas, equilibradas, dietas, prevenir, enfermedades, relacionadas",
                        "pt": "saudável, alimentação, programas, equilibradas, dietas, prevenir, doenças, relacionadas"
                    },
                    "sectorId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "isNeed": true,
                    "domainName": {
                        "en": "Nutritional Support",
                        "es": "Apoyo Nutricional",
                        "pt": "Apoio Nutricional"
                    },
                    "sectorName": {
                        "en": "Health & Wellbeing",
                        "es": "Salud y Bienestar",
                        "pt": "Saúde e Bem-Estar"
                    },
                    "description": {
                        "en": "To implement healthy eating programs that encourage balanced diets and prevent diet-related diseases.",
                        "es": "Implementar programas de alimentación saludable que fomenten dietas equilibradas y prevengan enfermedades relacionadas con la dieta.",
                        "pt": "Implementar programas de alimentação saudável que incentivem dietas equilibradas e previnam doenças relacionadas à dieta."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c63",
                    "name": {
                        "en": "Food Security",
                        "es": "Seguridad Alimentaria",
                        "pt": "Segurança Alimentar"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-yu65-b82d-4578adcda020o",
                    "keywords": {
                        "en": "food, security, consistent, access, sufficient, nutritious",
                        "es": "alimentos, seguridad, constante, acceso, suficiente, nutritivos",
                        "pt": "alimentos, segurança, constante, acesso, suficiente, nutritivos"
                    },
                    "sectorId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "isNeed": true,
                    "domainName": {
                        "en": "Nutritional Support",
                        "es": "Apoyo Nutricional",
                        "pt": "Apoio Nutricional"
                    },
                    "sectorName": {
                        "en": "Health & Wellbeing",
                        "es": "Salud y Bienestar",
                        "pt": "Saúde e Bem-Estar"
                    },
                    "description": {
                        "en": "To ensure food security by providing consistent access to sufficient and nutritious food for all.",
                        "es": "Garantizar la seguridad alimentaria proporcionando acceso constante a alimentos suficientes y nutritivos para todos.",
                        "pt": "Garantir a segurança alimentar proporcionando acesso consistente a alimentos suficientes e nutritivos para todos."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c64",
                    "name": {
                        "en": "Community Gardens",
                        "es": "Jardines Comunitarios",
                        "pt": "Hortas Comunitárias"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-yu65-b82d-4578adcda020o",
                    "keywords": {
                        "en": "community, gardens, fresh, produce, foster, engagement, education",
                        "es": "comunitarias, jardines, fresco, productos, fomentar, compromiso, educación",
                        "pt": "comunitárias, hortas, fresco, produtos, fomentar, engajamento, educação"
                    },
                    "sectorId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "isNeed": true,
                    "domainName": {
                        "en": "Nutritional Support",
                        "es": "Apoyo Nutricional",
                        "pt": "Apoio Nutricional"
                    },
                    "sectorName": {
                        "en": "Health & Wellbeing",
                        "es": "Salud y Bienestar",
                        "pt": "Saúde e Bem-Estar"
                    },
                    "description": {
                        "en": "To support community gardens that provide fresh produce and foster community engagement and education.",
                        "es": "Apoyar los jardines comunitarios que proporcionan productos frescos y fomentan el compromiso y la educación comunitaria.",
                        "pt": "Apoiar hortas comunitárias que fornecem produtos frescos e promovem o engajamento e a educação comunitária."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c65",
                    "name": {
                        "en": "Fitness Centers",
                        "es": "Centros de Acondicionamiento Físico",
                        "pt": "Centros de Condicionamento Físico"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-ji98-b82d-4578adcda020o",
                    "keywords": {
                        "en": "fitness, centers, access, diverse, physical, activity, exercise, needs",
                        "es": "centros, acondicionamiento, acceso, diversos, físicos, actividad, ejercicio, necesidades",
                        "pt": "centros, condicionamento, acesso, diversos, físicos, atividade, exercício, necessidades"
                    },
                    "sectorId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "isNeed": true,
                    "domainName": {
                        "en": "Physical Fitness",
                        "es": "Acondicionamiento Físico",
                        "pt": "Condicionamento Físico"
                    },
                    "sectorName": {
                        "en": "Health & Wellbeing",
                        "es": "Salud y Bienestar",
                        "pt": "Saúde e Bem-Estar"
                    },
                    "description": {
                        "en": "To provide access to fitness centers equipped to support diverse physical activity and exercise needs.",
                        "es": "Proporcionar acceso a centros de acondicionamiento físico equipados para apoyar diversas actividades físicas y necesidades de ejercicio.",
                        "pt": "Fornecer acesso a centros de condicionamento físico equipados para apoiar diversas atividades físicas e necessidades de exercício."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c66",
                    "name": {
                        "en": "Exercise Programs",
                        "es": "Programas de Ejercicio",
                        "pt": "Programas de Exercício"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-ji98-b82d-4578adcda020o",
                    "keywords": {
                        "en": "exercise, programs, promote, physical, health, prevent, lifestyle-related, diseases",
                        "es": "ejercicio, programas, promover, salud, física, prevenir, relacionadas, estilo de vida, enfermedades",
                        "pt": "exercício, programas, promover, saúde, física, prevenir, relacionadas, estilo de vida, doenças"
                    },
                    "sectorId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "isNeed": true,
                    "domainName": {
                        "en": "Physical Fitness",
                        "es": "Acondicionamiento Físico",
                        "pt": "Condicionamento Físico"
                    },
                    "sectorName": {
                        "en": "Health & Wellbeing",
                        "es": "Salud y Bienestar",
                        "pt": "Saúde e Bem-Estar"
                    },
                    "description": {
                        "en": "To implement exercise programs that promote physical health and prevent lifestyle-related diseases.",
                        "es": "Implementar programas de ejercicio que promuevan la salud física y prevengan enfermedades relacionadas con el estilo de vida.",
                        "pt": "Implementar programas de exercícios que promovam a saúde física e previnam doenças relacionadas ao estilo de vida."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c67",
                    "name": {
                        "en": "Sports Facilities",
                        "es": "Instalaciones Deportivas",
                        "pt": "Instalações Esportivas"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-ji98-b82d-4578adcda020o",
                    "keywords": {
                        "en": "sports, facilities, develop, maintain, physical, activity, community, participation",
                        "es": "deportes, instalaciones, desarrollar, mantener, física, actividad, comunitaria, participación",
                        "pt": "esportes, instalações, desenvolver, manter, física, atividade, comunitária, participação"
                    },
                    "sectorId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "isNeed": true,
                    "domainName": {
                        "en": "Physical Fitness",
                        "es": "Acondicionamiento Físico",
                        "pt": "Condicionamento Físico"
                    },
                    "sectorName": {
                        "en": "Health & Wellbeing",
                        "es": "Salud y Bienestar",
                        "pt": "Saúde e Bem-Estar"
                    },
                    "description": {
                        "en": "To develop and maintain sports facilities that support physical activity and community sports participation.",
                        "es": "Desarrollar y mantener instalaciones deportivas que apoyen la actividad física y la participación comunitaria en deportes.",
                        "pt": "Desenvolver e manter instalações esportivas que apoiem a atividade física e a participação comunitária em esportes."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c68",
                    "name": {
                        "en": "Health Education",
                        "es": "Educación para la Salud",
                        "pt": "Educação para a Saúde"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-ji98-b82d-4578adcda020o",
                    "keywords": {
                        "en": "health, education, encourage, physical, activity, informed, choices, healthy, lifestyle",
                        "es": "salud, educación, fomentar, física, actividad, informadas, elecciones, saludable, estilo de vida",
                        "pt": "saúde, educação, encorajar, física, atividade, informadas, escolhas, saudável, estilo de vida"
                    },
                    "sectorId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "isNeed": true,
                    "domainName": {
                        "en": "Physical Fitness",
                        "es": "Acondicionamiento Físico",
                        "pt": "Condicionamento Físico"
                    },
                    "sectorName": {
                        "en": "Health & Wellbeing",
                        "es": "Salud y Bienestar",
                        "pt": "Saúde e Bem-Estar"
                    },
                    "description": {
                        "en": "To provide health education that encourages physical activity and informed choices for a healthy lifestyle.",
                        "es": "Proporcionar educación para la salud que fomente la actividad física y elecciones informadas para un estilo de vida saludable.",
                        "pt": "Fornecer educação para a saúde que incentive a atividade física e escolhas informadas para um estilo de vida saudável."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c69",
                    "name": {
                        "en": "Physical Activity Promotion",
                        "es": "Promoción de la Actividad Física",
                        "pt": "Promoção da Atividade Física"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-ji98-b82d-4578adcda020o",
                    "keywords": {
                        "en": "physical, activity, promotion, campaigns, programs, initiatives, active, lifestyles",
                        "es": "física, actividad, promoción, campañas, programas, iniciativas, activas, estilos de vida",
                        "pt": "física, atividade, promoção, campanhas, programas, iniciativas, ativas, estilos de vida"
                    },
                    "sectorId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "isNeed": true,
                    "domainName": {
                        "en": "Physical Fitness",
                        "es": "Acondicionamiento Físico",
                        "pt": "Condicionamento Físico"
                    },
                    "sectorName": {
                        "en": "Health & Wellbeing",
                        "es": "Salud y Bienestar",
                        "pt": "Saúde e Bem-Estar"
                    },
                    "description": {
                        "en": "To promote physical activity through campaigns, programs, and initiatives that encourage active lifestyles.",
                        "es": "Promover la actividad física a través de campañas, programas e iniciativas que fomenten estilos de vida activos.",
                        "pt": "Promover a atividade física por meio de campanhas, programas e iniciativas que incentivem estilos de vida ativos."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c70",
                    "name": {
                        "en": "Vaccination Programs",
                        "es": "Programas de Vacunación",
                        "pt": "Programas de Vacinação"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-df45-b82d-4578adcda020o",
                    "keywords": {
                        "en": "vaccination, programs, prevent, spread, infectious, diseases",
                        "es": "vacunación, programas, prevenir, propagación, infecciosas, enfermedades",
                        "pt": "vacinação, programas, prevenir, disseminação, infecciosas, doenças"
                    },
                    "sectorId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "isNeed": true,
                    "domainName": {
                        "en": "Public Health Initiatives",
                        "es": "Iniciativas de Salud Pública",
                        "pt": "Iniciativas de Saúde Pública"
                    },
                    "sectorName": {
                        "en": "Health & Wellbeing",
                        "es": "Salud y Bienestar",
                        "pt": "Saúde e Bem-Estar"
                    },
                    "description": {
                        "en": "To implement vaccination programs that prevent the spread of infectious diseases.",
                        "es": "Implementar programas de vacunación que prevengan la propagación de enfermedades infecciosas.",
                        "pt": "Implementar programas de vacinação que previnam a disseminação de doenças infecciosas."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c71",
                    "name": {
                        "en": "Disease Prevention",
                        "es": "Prevención de Enfermedades",
                        "pt": "Prevenção de Doenças"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-df45-b82d-4578adcda020o",
                    "keywords": {
                        "en": "disease, prevention, public, health, measures, education",
                        "es": "enfermedad, prevención, salud, pública, medidas, educación",
                        "pt": "doença, prevenção, saúde, pública, medidas, educação"
                    },
                    "sectorId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "isNeed": true,
                    "domainName": {
                        "en": "Public Health Initiatives",
                        "es": "Iniciativas de Salud Pública",
                        "pt": "Iniciativas de Saúde Pública"
                    },
                    "sectorName": {
                        "en": "Health & Wellbeing",
                        "es": "Salud y Bienestar",
                        "pt": "Saúde e Bem-Estar"
                    },
                    "description": {
                        "en": "To promote disease prevention through public health measures and education.",
                        "es": "Promover la prevención de enfermedades mediante medidas de salud pública y educación.",
                        "pt": "Promover a prevenção de doenças por meio de medidas de saúde pública e educação."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c72",
                    "name": {
                        "en": "Health Education",
                        "es": "Educación para la Salud",
                        "pt": "Educação para a Saúde"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-df45-b82d-4578adcda020o",
                    "keywords": {
                        "en": "health, education, promote, preventive, care, healthy, lifestyles",
                        "es": "salud, educación, promover, preventiva, cuidado, saludables, estilos de vida",
                        "pt": "saúde, educação, promover, preventiva, cuidado, saudáveis, estilos de vida"
                    },
                    "sectorId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "isNeed": true,
                    "domainName": {
                        "en": "Public Health Initiatives",
                        "es": "Iniciativas de Salud Pública",
                        "pt": "Iniciativas de Saúde Pública"
                    },
                    "sectorName": {
                        "en": "Health & Wellbeing",
                        "es": "Salud y Bienestar",
                        "pt": "Saúde e Bem-Estar"
                    },
                    "description": {
                        "en": "To provide health education that promotes preventive care and healthy lifestyles.",
                        "es": "Proporcionar educación para la salud que promueva la atención preventiva y estilos de vida saludables.",
                        "pt": "Fornecer educação para a saúde que promova cuidados preventivos e estilos de vida saudáveis."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c73",
                    "name": {
                        "en": "Access to Care",
                        "es": "Acceso a la Atención",
                        "pt": "Acesso aos Cuidados"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-df45-b82d-4578adcda020o",
                    "keywords": {
                        "en": "access, care, healthcare, services, socioeconomic, status",
                        "es": "acceso, atención, servicios, atención médica, estatus, socioeconómico",
                        "pt": "acesso, cuidado, serviços, cuidados médicos, status, socioeconômico"
                    },
                    "sectorId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "isNeed": true,
                    "domainName": {
                        "en": "Public Health Initiatives",
                        "es": "Iniciativas de Salud Pública",
                        "pt": "Iniciativas de Saúde Pública"
                    },
                    "sectorName": {
                        "en": "Health & Wellbeing",
                        "es": "Salud y Bienestar",
                        "pt": "Saúde e Bem-Estar"
                    },
                    "description": {
                        "en": "To ensure access to healthcare services for all individuals, regardless of their socioeconomic status.",
                        "es": "Asegurar el acceso a los servicios de atención médica para todas las personas, independientemente de su estatus socioeconómico.",
                        "pt": "Garantir o acesso aos serviços de saúde para todos os indivíduos, independentemente de seu status socioeconômico."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c74",
                    "name": {
                        "en": "Public Health Campaigns",
                        "es": "Campañas de Salud Pública",
                        "pt": "Campanhas de Saúde Pública"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-df45-b82d-4578adcda020o",
                    "keywords": {
                        "en": "public, health, campaigns, awareness, promote, healthy, behaviors",
                        "es": "salud, pública, campañas, concienciación, promover, saludables, comportamientos",
                        "pt": "saúde, pública, campanhas, conscientização, promover, saudáveis, comportamentos"
                    },
                    "sectorId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "isNeed": true,
                    "domainName": {
                        "en": "Public Health Initiatives",
                        "es": "Iniciativas de Salud Pública",
                        "pt": "Iniciativas de Saúde Pública"
                    },
                    "sectorName": {
                        "en": "Health & Wellbeing",
                        "es": "Salud y Bienestar",
                        "pt": "Saúde e Bem-Estar"
                    },
                    "description": {
                        "en": "To conduct public health campaigns that raise awareness and promote healthy behaviors.",
                        "es": "Llevar a cabo campañas de salud pública que aumenten la concienciación y promuevan comportamientos saludables.",
                        "pt": "Realizar campanhas de saúde pública que aumentem a conscientização e promovam comportamentos saudáveis."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c75",
                    "name": {
                        "en": "Stress Management",
                        "es": "Gestión del Estrés",
                        "pt": "Gerenciamento do Estresse"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-ddcf-fgiu-b82d-4578adcda020o",
                    "keywords": {
                        "en": "stress, management, programs, cope, reduce",
                        "es": "estrés, gestión, programas, lidiar, reducir",
                        "pt": "estresse, gestão, programas, lidar, reduzir"
                    },
                    "sectorId": "018f2c07-bbf1-72de-a998-365fdce74927",
                    "isNeed": true,
                    "domainName": {
                        "en": "Wellness Programs",
                        "es": "Programas de Bienestar",
                        "pt": "Programas de Bem-Estar"
                    },
                    "sectorName": {
                        "en": "Health & Wellbeing",
                        "es": "Salud y Bienestar",
                        "pt": "Saúde e Bem-Estar"
                    },
                    "description": {
                        "en": "To provide stress management programs that help individuals cope with and reduce stress.",
                        "es": "Proporcionar programas de gestión del estrés que ayuden a las personas a lidiar con y reducir el estrés.",
                        "pt": "Fornecer programas de gerenciamento de estresse que ajudem as pessoas a lidar com e reduzir o estresse."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c82",
                    "name": {
                        "en": "Child Development",
                        "es": "Desarrollo Infantil",
                        "pt": "Desenvolvimento Infantil"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-gh65-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "child, development, programs, promote, physical, emotional, cognitive, growth",
                        "es": "infantil, desarrollo, programas, promover, física, emocional, cognitiva, crecimiento",
                        "pt": "infantil, desenvolvimento, programas, promover, física, emocional, cognitiva, crescimento"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Family Dynamics",
                        "es": "Dinámicas Familiares",
                        "pt": "Dinâmicas Familiares"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To support children's development through programs that promote physical, emotional, and cognitive growth.",
                        "es": "Apoyar el desarrollo infantil a través de programas que promuevan el crecimiento físico, emocional y cognitivo.",
                        "pt": "Apoiar o desenvolvimento infantil através de programas que promovam o crescimento físico, emocional e cognitivo."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c83",
                    "name": {
                        "en": "Conflict Resolution",
                        "es": "Resolución de Conflictos",
                        "pt": "Resolução de Conflitos"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-gh65-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "conflict, resolution, services, help, manage, resolve, disputes",
                        "es": "conflicto, resolución, servicios, ayudar, gestionar, resolver, disputas",
                        "pt": "conflito, resolução, serviços, ajudar, gerir, resolver, disputas"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Family Dynamics",
                        "es": "Dinámicas Familiares",
                        "pt": "Dinâmicas Familiares"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To provide conflict resolution services that help families manage and resolve disputes effectively.",
                        "es": "Proporcionar servicios de resolución de conflictos que ayuden a las familias a gestionar y resolver disputas de manera efectiva.",
                        "pt": "Fornecer serviços de resolução de conflitos que ajudem as famílias a gerenciar e resolver disputas de maneira eficaz."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c84",
                    "name": {
                        "en": "Family Activities",
                        "es": "Actividades Familiares",
                        "pt": "Atividades Familiares"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-gh65-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "family, activities, organize, strengthen, bonds, promote, togetherness",
                        "es": "familia, actividades, organizar, fortalecer, vínculos, promover, unidad",
                        "pt": "família, atividades, organizar, fortalecer, laços, promover, união"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Family Dynamics",
                        "es": "Dinámicas Familiares",
                        "pt": "Dinâmicas Familiares"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To organize family activities that strengthen bonds and promote family togetherness.",
                        "es": "Organizar actividades familiares que fortalezcan los vínculos y promuevan la unidad familiar.",
                        "pt": "Organizar atividades familiares que fortaleçam os laços e promovam a união familiar."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c85",
                    "name": {
                        "en": "Social Events",
                        "es": "Eventos Sociales",
                        "pt": "Eventos Sociais"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-sjut-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "social, events, host, facilitate, interactions, strengthen, friendships",
                        "es": "sociales, eventos, organizar, facilitar, interacciones, fortalecer, amistades",
                        "pt": "sociais, eventos, organizar, facilitar, interações, fortalecer, amizades"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Friendship Networks",
                        "es": "Redes de Amistad",
                        "pt": "Redes de Amizade"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To host social events that facilitate interactions and strengthen friendships among community members.",
                        "es": "Organizar eventos sociales que faciliten las interacciones y fortalezcan las amistades entre los miembros de la comunidad.",
                        "pt": "Organizar eventos sociais que facilitem as interações e fortaleçam as amizades entre os membros da comunidade."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c86",
                    "name": {
                        "en": "Community Groups",
                        "es": "Grupos Comunitarios",
                        "pt": "Grupos Comunitários"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-sjut-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "community, groups, create, support, foster, social, connections, mutual, support",
                        "es": "comunitarios, grupos, crear, apoyar, fomentar, sociales, conexiones, mutuo, apoyo",
                        "pt": "comunitários, grupos, criar, apoiar, fomentar, sociais, conexões, mútuo, apoio"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Friendship Networks",
                        "es": "Redes de Amistad",
                        "pt": "Redes de Amizade"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To create and support community groups that foster social connections and mutual support.",
                        "es": "Crear y apoyar grupos comunitarios que fomenten las conexiones sociales y el apoyo mutuo.",
                        "pt": "Criar e apoiar grupos comunitários que promovam conexões sociais e apoio mútuo."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c87",
                    "name": {
                        "en": "Peer Support",
                        "es": "Apoyo entre Pares",
                        "pt": "Apoio entre Pares"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-sjut-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "peer, support, programs, offer, emotional, practical, assistance, shared, experiences",
                        "es": "pares, apoyo, programas, ofrecer, emocional, práctico, asistencia, compartidas, experiencias",
                        "pt": "pares, apoio, programas, oferecer, emocional, prático, assistência, compartilhadas, experiências"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Friendship Networks",
                        "es": "Redes de Amistad",
                        "pt": "Redes de Amizade"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To provide peer support programs that offer emotional and practical assistance through shared experiences.",
                        "es": "Proporcionar programas de apoyo entre pares que ofrezcan asistencia emocional y práctica a través de experiencias compartidas.",
                        "pt": "Fornecer programas de apoio entre pares que ofereçam assistência emocional e prática através de experiências compartilhadas."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c88",
                    "name": {
                        "en": "Social Media Platforms",
                        "es": "Plataformas de Medios Sociales",
                        "pt": "Plataformas de Mídias Sociais"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-sjut-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "social, media, platforms, communication, connectivity, friends",
                        "es": "sociales, medios, plataformas, comunicación, conectividad, amigos",
                        "pt": "sociais, mídias, plataformas, comunicação, conectividade, amigos"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Friendship Networks",
                        "es": "Redes de Amistad",
                        "pt": "Redes de Amizade"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To leverage social media platforms to enhance communication and connectivity among friends.",
                        "es": "Aprovechar las plataformas de medios sociales para mejorar la comunicación y la conectividad entre amigos.",
                        "pt": "Aproveitar as plataformas de mídias sociais para melhorar a comunicação e a conectividade entre amigos."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c89",
                    "name": {
                        "en": "Networking Opportunities",
                        "es": "Oportunidades de Networking",
                        "pt": "Oportunidades de Networking"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-sjut-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "networking, opportunities, foster, new, friendships, professional, connections",
                        "es": "networking, oportunidades, fomentar, nuevas, amistades, profesionales, conexiones",
                        "pt": "networking, oportunidades, fomentar, novas, amizades, profissionais, conexões"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Friendship Networks",
                        "es": "Redes de Amistad",
                        "pt": "Redes de Amizade"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To create networking opportunities that foster new friendships and professional connections.",
                        "es": "Crear oportunidades de networking que fomenten nuevas amistades y conexiones profesionales.",
                        "pt": "Criar oportunidades de networking que promovam novas amizades e conexões profissionais."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c90",
                    "name": {
                        "en": "Self-Improvement Courses",
                        "es": "Cursos de Auto-mejora",
                        "pt": "Cursos de Auto-melhoria"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-4r56-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "self-improvement, courses, enhance, skills, self-awareness, personal, growth",
                        "es": "auto-mejora, cursos, mejorar, habilidades, autoconciencia, personal, crecimiento",
                        "pt": "auto-melhoria, cursos, melhorar, habilidades, autoconsciência, pessoal, crescimento"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Personal Development",
                        "es": "Desarrollo Personal",
                        "pt": "Desenvolvimento Pessoal"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To offer self-improvement courses that enhance skills, self-awareness, and personal growth.",
                        "es": "Ofrecer cursos de auto-mejora que mejoren las habilidades, la autoconciencia y el crecimiento personal.",
                        "pt": "Oferecer cursos de auto-melhoria que melhorem as habilidades, a autoconsciência e o crescimento pessoal."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c91",
                    "name": {
                        "en": "Life Coaching",
                        "es": "Coaching de Vida",
                        "pt": "Coaching de Vida"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-4r56-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "life, coaching, services, help, achieve, goals, aspirations",
                        "es": "vida, coaching, servicios, ayudar, lograr, metas, aspiraciones",
                        "pt": "vida, coaching, serviços, ajudar, alcançar, objetivos, aspirações"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Personal Development",
                        "es": "Desarrollo Personal",
                        "pt": "Desenvolvimento Pessoal"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To provide life coaching services that help individuals achieve their goals and aspirations.",
                        "es": "Proporcionar servicios de coaching de vida que ayuden a las personas a lograr sus metas y aspiraciones.",
                        "pt": "Fornecer serviços de coaching de vida que ajudem as pessoas a alcançar seus objetivos e aspirações."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c92",
                    "name": {
                        "en": "Life Skills Training",
                        "es": "Formación en Habilidades para la Vida",
                        "pt": "Treinamento de Habilidades para a Vida"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-4r56-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "life, skills, training, practical, daily, living, personal, success",
                        "es": "vida, habilidades, formación, práctica, diaria, vivir, personal, éxito",
                        "pt": "vida, habilidades, treinamento, prático, diário, viver, pessoal, sucesso"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Personal Development",
                        "es": "Desarrollo Personal",
                        "pt": "Desenvolvimento Pessoal"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To offer life skills training that equips individuals with practical skills for daily living and personal success.",
                        "es": "Ofrecer formación en habilidades para la vida que equipe a las personas con habilidades prácticas para la vida diaria y el éxito personal.",
                        "pt": "Oferecer treinamento de habilidades para a vida que equipe as pessoas com habilidades práticas para a vida diária e o sucesso pessoal."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c93",
                    "name": {
                        "en": "Personal Goals",
                        "es": "Metas Personales",
                        "pt": "Metas Pessoais"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-4r56-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "personal, goals, support, setting, achieving, overall, well-being",
                        "es": "personales, metas, apoyo, establecimiento, logro, general, bienestar",
                        "pt": "pessoais, metas, apoio, estabelecimento, realização, geral, bem-estar"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Personal Development",
                        "es": "Desarrollo Personal",
                        "pt": "Desenvolvimento Pessoal"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To support individuals in setting and achieving their personal goals, enhancing their overall well-being.",
                        "es": "Apoyar a las personas en el establecimiento y logro de sus metas personales, mejorando su bienestar general.",
                        "pt": "Apoiar as pessoas na definição e realização de suas metas pessoais, melhorando seu bem-estar geral."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c94",
                    "name": {
                        "en": "Mentorship Programs",
                        "es": "Programas de Mentoría",
                        "pt": "Programas de Mentoria"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-4r56-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "mentorship, programs, guide, personal, professional, development",
                        "es": "mentoría, programas, guiar, personal, profesional, desarrollo",
                        "pt": "mentoria, programas, guiar, pessoal, profissional, desenvolvimento"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Personal Development",
                        "es": "Desarrollo Personal",
                        "pt": "Desenvolvimento Pessoal"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To establish mentorship programs that guide individuals in their personal and professional development.",
                        "es": "Establecer programas de mentoría que guíen a las personas en su desarrollo personal y profesional.",
                        "pt": "Estabelecer programas de mentoria que guiem as pessoas em seu desenvolvimento pessoal e profissional."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c95",
                    "name": {
                        "en": "Relationship Counseling",
                        "es": "Asesoramiento Relacional",
                        "pt": "Aconselhamento Relacional"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-56rf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "relationship, counseling, services, enhance, communication, intimacy, partners",
                        "es": "relacional, asesoramiento, servicios, mejorar, comunicación, intimidad, parejas",
                        "pt": "relacionamento, aconselhamento, serviços, melhorar, comunicação, intimidade, parceiros"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Romantic Relationships",
                        "es": "Relaciones Románticas",
                        "pt": "Relacionamentos Românticos"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To provide relationship counseling services that enhance communication and intimacy between partners.",
                        "es": "Proporcionar servicios de asesoramiento relacional que mejoren la comunicación y la intimidad entre las parejas.",
                        "pt": "Fornecer serviços de aconselhamento relacional que melhorem a comunicação e a intimidade entre os parceiros."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c96",
                    "name": {
                        "en": "Dating Services",
                        "es": "Servicios de Citas",
                        "pt": "Serviços de Encontros"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-56rf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "dating, services, help, find, compatible, romantic, partners",
                        "es": "citas, servicios, ayudar, encontrar, compatibles, románticos, parejas",
                        "pt": "encontros, serviços, ajudar, encontrar, compatíveis, românticos, parceiros"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Romantic Relationships",
                        "es": "Relaciones Románticas",
                        "pt": "Relacionamentos Românticos"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To offer dating services that help individuals find compatible romantic partners.",
                        "es": "Ofrecer servicios de citas que ayuden a las personas a encontrar parejas románticas compatibles.",
                        "pt": "Oferecer serviços de encontros que ajudem as pessoas a encontrar parceiros românticos compatíveis."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c97",
                    "name": {
                        "en": "Romantic Events",
                        "es": "Eventos Románticos",
                        "pt": "Eventos Românticos"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-56rf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "romantic, events, organize, foster, connection, intimacy, couples",
                        "es": "románticos, eventos, organizar, fomentar, conexión, intimidad, parejas",
                        "pt": "românticos, eventos, organizar, fomentar, conexão, intimidade, casais"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Romantic Relationships",
                        "es": "Relaciones Románticas",
                        "pt": "Relacionamentos Românticos"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To organize romantic events that foster connection and intimacy between couples.",
                        "es": "Organizar eventos románticos que fomenten la conexión y la intimidad entre las parejas.",
                        "pt": "Organizar eventos românticos que promovam a conexão e a intimidade entre os casais."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c98",
                    "name": {
                        "en": "Communication Skills",
                        "es": "Habilidades de Comunicación",
                        "pt": "Habilidades de Comunicação"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-56rf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "communication, skills, programs, enhance, understanding, closeness, partners",
                        "es": "comunicación, habilidades, programas, mejorar, comprensión, cercanía, parejas",
                        "pt": "comunicação, habilidades, programas, melhorar, compreensão, proximidade, parceiros"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Romantic Relationships",
                        "es": "Relaciones Románticas",
                        "pt": "Relacionamentos Românticos"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To offer programs that enhance communication skills between romantic partners, fostering understanding and closeness.",
                        "es": "Ofrecer programas que mejoren las habilidades de comunicación entre parejas románticas, fomentando la comprensión y la cercanía.",
                        "pt": "Oferecer programas que melhorem as habilidades de comunicação entre parceiros românticos, promovendo a compreensão e a proximidade."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71c99",
                    "name": {
                        "en": "Conflict Resolution",
                        "es": "Resolución de Conflictos",
                        "pt": "Resolução de Conflitos"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-56rf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "conflict, resolution, services, couples, navigate, resolve, disputes",
                        "es": "conflicto, resolución, servicios, parejas, navegar, resolver, disputas",
                        "pt": "conflito, resolução, serviços, casais, navegar, resolver, disputas"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Romantic Relationships",
                        "es": "Relaciones Románticas",
                        "pt": "Relacionamentos Românticos"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To provide conflict resolution services that help couples navigate and resolve disputes constructively.",
                        "es": "Proporcionar servicios de resolución de conflictos que ayuden a las parejas a navegar y resolver disputas de manera constructiva.",
                        "pt": "Fornecer serviços de resolução de conflitos que ajudem os casais a navegar e resolver disputas de maneira construtiva."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d00",
                    "name": {
                        "en": "Support Groups",
                        "es": "Grupos de Apoyo",
                        "pt": "Grupos de Apoio"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-12g6-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "support, groups, offer, emotional, practical, assistance, challenges",
                        "es": "apoyo, grupos, ofrecer, emocional, práctico, asistencia, desafíos",
                        "pt": "apoio, grupos, oferecer, emocional, prático, assistência, desafios"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Social Support",
                        "es": "Apoyo Social",
                        "pt": "Apoio Social"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To provide support groups that offer emotional and practical assistance for individuals facing various challenges.",
                        "es": "Proporcionar grupos de apoyo que ofrezcan asistencia emocional y práctica a las personas que enfrentan diversos desafíos.",
                        "pt": "Fornecer grupos de apoio que ofereçam assistência emocional e prática para pessoas enfrentando diversos desafios."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d01",
                    "name": {
                        "en": "Community Resources",
                        "es": "Recursos Comunitarios",
                        "pt": "Recursos Comunitários"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-12g6-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "community, resources, access, support, social, emotional, needs",
                        "es": "comunitarios, recursos, acceso, apoyar, sociales, emocionales, necesidades",
                        "pt": "comunitários, recursos, acesso, apoiar, sociais, emocionais, necessidades"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Social Support",
                        "es": "Apoyo Social",
                        "pt": "Apoio Social"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To provide access to community resources that support individuals' social and emotional needs.",
                        "es": "Proporcionar acceso a recursos comunitarios que apoyen las necesidades sociales y emocionales de las personas.",
                        "pt": "Fornecer acesso a recursos comunitários que apoiem as necessidades sociais e emocionais das pessoas."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d02",
                    "name": {
                        "en": "Peer Mentorship",
                        "es": "Mentoría entre Pares",
                        "pt": "Mentoria entre Pares"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-12g6-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "peer, mentorship, programs, offer, guidance, support, shared, experiences",
                        "es": "pares, mentoría, programas, ofrecer, orientación, apoyo, compartidas, experiencias",
                        "pt": "pares, mentoria, programas, oferecer, orientação, apoio, compartilhadas, experiências"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Social Support",
                        "es": "Apoyo Social",
                        "pt": "Apoio Social"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To establish peer mentorship programs that offer guidance and support through shared experiences.",
                        "es": "Establecer programas de mentoría entre pares que ofrezcan orientación y apoyo a través de experiencias compartidas.",
                        "pt": "Estabelecer programas de mentoria entre pares que ofereçam orientação e apoio através de experiências compartilhadas."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d03",
                    "name": {
                        "en": "Crisis Intervention",
                        "es": "Intervención en Crisis",
                        "pt": "Intervenção em Crises"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-12g6-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "crisis, intervention, services, immediate, support, emergencies, critical, situations",
                        "es": "crisis, intervención, servicios, inmediato, apoyo, emergencias, críticas, situaciones",
                        "pt": "crise, intervenção, serviços, imediato, apoio, emergências, críticas, situações"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Social Support",
                        "es": "Apoyo Social",
                        "pt": "Apoio Social"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To provide crisis intervention services that offer immediate support during emergencies and critical situations.",
                        "es": "Proporcionar servicios de intervención en crisis que ofrezcan apoyo inmediato durante emergencias y situaciones críticas.",
                        "pt": "Fornecer serviços de intervenção em crises que ofereçam apoio imediato durante emergências e situações críticas."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d04",
                    "name": {
                        "en": "Volunteer Networks",
                        "es": "Redes de Voluntarios",
                        "pt": "Redes de Voluntários"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-12g6-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "volunteer, networks, develop, community, support, assistance, need",
                        "es": "voluntarios, redes, desarrollar, comunidad, apoyo, asistencia, necesidad",
                        "pt": "voluntários, redes, desenvolver, comunidade, apoio, assistência, necessidade"
                    },
                    "sectorId": "018f2c02-fbba-7dbe-bacd-545bc3d142bb",
                    "isNeed": true,
                    "domainName": {
                        "en": "Social Support",
                        "es": "Apoyo Social",
                        "pt": "Apoio Social"
                    },
                    "sectorName": {
                        "en": "Personal & Relational",
                        "es": "Personal y Relacional",
                        "pt": "Pessoal e Relacional"
                    },
                    "description": {
                        "en": "To develop volunteer networks that provide community support and assistance to those in need.",
                        "es": "Desarrollar redes de voluntarios que proporcionen apoyo comunitario y asistencia a los necesitados.",
                        "pt": "Desenvolver redes de voluntários que forneçam apoio comunitário e assistência aos necessitados."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d10",
                    "name": {
                        "en": "Voting Initiatives",
                        "es": "Iniciativas de Votación",
                        "pt": "Iniciativas de Votação"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-f56t-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "voting, initiatives, promote, encourage, participation, democratic, processes",
                        "es": "votación, iniciativas, promover, alentar, participación, democrática, procesos",
                        "pt": "votação, iniciativas, promover, incentivar, participação, democrática, processos"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Civic Engagement",
                        "es": "Participación Cívica",
                        "pt": "Engajamento Cívico"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To promote voting initiatives that encourage active participation in democratic processes.",
                        "es": "Promover iniciativas de votación que fomenten la participación activa en los procesos democráticos.",
                        "pt": "Promover iniciativas de votação que incentivem a participação ativa nos processos democráticos."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d11",
                    "name": {
                        "en": "Community Meetings",
                        "es": "Reuniones Comunitarias",
                        "pt": "Reuniões Comunitárias"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-f56t-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "community, meetings, organize, platform, discuss, local, issues, civic, participation",
                        "es": "comunitarios, reuniones, organizar, plataforma, discutir, locales, temas, cívica, participación",
                        "pt": "comunitários, reuniões, organizar, plataforma, discutir, locais, questões, cívica, participação"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Civic Engagement",
                        "es": "Participación Cívica",
                        "pt": "Engajamento Cívico"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To organize community meetings that provide a platform for discussing local issues and fostering civic participation.",
                        "es": "Organizar reuniones comunitarias que proporcionen una plataforma para discutir temas locales y fomentar la participación cívica.",
                        "pt": "Organizar reuniões comunitárias que forneçam uma plataforma para discutir questões locais e promover a participação cívica."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d12",
                    "name": {
                        "en": "Public Forums",
                        "es": "Foros Públicos",
                        "pt": "Fóruns Públicos"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-f56t-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "public, forums, host, encourage, open, dialogue, community, involvement, civic, matters",
                        "es": "públicos, foros, organizar, fomentar, abierto, diálogo, comunidad, participación, cívica, temas",
                        "pt": "públicos, fóruns, organizar, fomentar, aberto, diálogo, comunidade, participação, cívica, questões"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Civic Engagement",
                        "es": "Participación Cívica",
                        "pt": "Engajamento Cívico"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To host public forums that encourage open dialogue and community involvement in civic matters.",
                        "es": "Organizar foros públicos que fomenten el diálogo abierto y la participación de la comunidad en temas cívicos.",
                        "pt": "Organizar fóruns públicos que incentivem o diálogo aberto e a participação da comunidade em questões cívicas."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d13",
                    "name": {
                        "en": "Civic Education",
                        "es": "Educación Cívica",
                        "pt": "Educação Cívica"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-f56t-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "civic, education, programs, inform, citizens, rights, responsibilities, active, participation, governance",
                        "es": "cívica, educación, programas, informar, ciudadanos, derechos, responsabilidades, activa, participación, gobernanza",
                        "pt": "cívica, educação, programas, informar, cidadãos, direitos, responsabilidades, ativa, participação, governança"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Civic Engagement",
                        "es": "Participación Cívica",
                        "pt": "Engajamento Cívico"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To provide civic education programs that inform citizens about their rights, responsibilities, and the importance of active participation in governance.",
                        "es": "Proporcionar programas de educación cívica que informen a los ciudadanos sobre sus derechos, responsabilidades y la importancia de la participación activa en la gobernanza.",
                        "pt": "Fornecer programas de educação cívica que informem os cidadãos sobre seus direitos, responsabilidades e a importância da participação ativa na governança."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d14",
                    "name": {
                        "en": "Advocacy Campaigns",
                        "es": "Campañas de Defensa",
                        "pt": "Campanhas de Defesa"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-f56t-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "advocacy, campaigns, support, address, social, issues, promote, positive, change, community",
                        "es": "defensa, campañas, apoyo, abordar, sociales, temas, promover, positivo, cambio, comunidad",
                        "pt": "defesa, campanhas, apoio, abordar, sociais, questões, promover, positivo, mudança, comunidade"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Civic Engagement",
                        "es": "Participación Cívica",
                        "pt": "Engajamento Cívico"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To support advocacy campaigns that address social issues and promote positive change in the community.",
                        "es": "Apoyar campañas de defensa que aborden problemas sociales y promuevan cambios positivos en la comunidad.",
                        "pt": "Apoiar campanhas de defesa que abordem questões sociais e promovam mudanças positivas na comunidade."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d15",
                    "name": {
                        "en": "Policy Development",
                        "es": "Desarrollo de Políticas",
                        "pt": "Desenvolvimento de Políticas"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-d6y8-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "policy, development, effective, address, societal, needs, promote, good, governance",
                        "es": "política, desarrollo, efectiva, abordar, sociales, necesidades, promover, buena, gobernanza",
                        "pt": "política, desenvolvimento, eficaz, abordar, sociais, necessidades, promover, boa, governança"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Governance Structures",
                        "es": "Estructuras de Gobernanza",
                        "pt": "Estruturas de Governança"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To develop effective policies that address societal needs and promote good governance.",
                        "es": "Desarrollar políticas efectivas que aborden las necesidades sociales y promuevan una buena gobernanza.",
                        "pt": "Desenvolver políticas eficazes que abordem as necessidades sociais e promovam uma boa governança."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d16",
                    "name": {
                        "en": "Government Transparency",
                        "es": "Transparencia Gubernamental",
                        "pt": "Transparência Governamental"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-d6y8-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "government, transparency, ensure, open, access, information, accountability, mechanisms",
                        "es": "gobierno, transparencia, garantizar, abierto, acceso, información, responsabilidad, mecanismos",
                        "pt": "governo, transparência, garantir, aberto, acesso, informação, responsabilidade, mecanismos"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Governance Structures",
                        "es": "Estructuras de Gobernanza",
                        "pt": "Estruturas de Governança"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To ensure government transparency through open access to information and accountability mechanisms.",
                        "es": "Garantizar la transparencia gubernamental mediante el acceso abierto a la información y mecanismos de responsabilidad.",
                        "pt": "Garantir a transparência governamental por meio do acesso aberto à informação e mecanismos de responsabilidade."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d17",
                    "name": {
                        "en": "Accountability Measures",
                        "es": "Medidas de Responsabilidad",
                        "pt": "Medidas de Responsabilidade"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-d6y8-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "accountability, measures, implement, ensure, government, officials, institutions, act, responsibly, ethically",
                        "es": "responsabilidad, medidas, implementar, garantizar, gobierno, funcionarios, instituciones, actuar, responsable, éticamente",
                        "pt": "responsabilidade, medidas, implementar, garantir, governo, funcionários, instituições, atuar, responsável, eticamente"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Governance Structures",
                        "es": "Estructuras de Gobernanza",
                        "pt": "Estruturas de Governança"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To implement accountability measures that ensure government officials and institutions act responsibly and ethically.",
                        "es": "Implementar medidas de responsabilidad que garanticen que los funcionarios gubernamentales e instituciones actúen de manera responsable y ética.",
                        "pt": "Implementar medidas de responsabilidade que garantam que os funcionários do governo e as instituições atuem de maneira responsável e ética."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d18",
                    "name": {
                        "en": "Public Participation",
                        "es": "Participación Pública",
                        "pt": "Participação Pública"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-d6y8-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "public, participation, encourage, governance, processes, ensure, citizens, voice, decision-making",
                        "es": "público, participación, fomentar, gobernanza, procesos, garantizar, ciudadanos, voz, toma de decisiones",
                        "pt": "público, participação, incentivar, governança, processos, garantir, cidadãos, voz, tomada de decisão"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Governance Structures",
                        "es": "Estructuras de Gobernanza",
                        "pt": "Estruturas de Governança"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To encourage public participation in governance processes, ensuring that citizens have a voice in decision-making.",
                        "es": "Fomentar la participación pública en los procesos de gobernanza, asegurando que los ciudadanos tengan voz en la toma de decisiones.",
                        "pt": "Incentivar a participação pública nos processos de governança, garantindo que os cidadãos tenham voz na tomada de decisões."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d19",
                    "name": {
                        "en": "Legal Frameworks",
                        "es": "Marcos Legales",
                        "pt": "Estruturas Legais"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-d6y8-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "legal, frameworks, establish, robust, support, effective, governance, uphold, rule of law",
                        "es": "legal, marcos, establecer, robusto, apoyo, eficaz, gobernanza, sostener, estado de derecho",
                        "pt": "legal, estruturas, estabelecer, robusto, apoiar, eficaz, governança, sustentar, estado de direito"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Governance Structures",
                        "es": "Estructuras de Gobernanza",
                        "pt": "Estruturas de Governança"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To establish robust legal frameworks that support effective governance and uphold the rule of law.",
                        "es": "Establecer marcos legales robustos que apoyen una gobernanza eficaz y sostengan el estado de derecho.",
                        "pt": "Estabelecer estruturas legais robustas que apoiem uma governança eficaz e sustentem o estado de direito."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d20",
                    "name": {
                        "en": "Legal Assistance",
                        "es": "Asistencia Legal",
                        "pt": "Assistência Legal"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-s3e5-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "legal, assistance, provide, individuals, rights, violated, ensure, access, justice",
                        "es": "legal, asistencia, proporcionar, individuos, derechos, violados, garantizar, acceso, justicia",
                        "pt": "legal, assistência, fornecer, indivíduos, direitos, violados, garantir, acesso, justiça"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Human Rights Advocacy",
                        "es": "Defensa de los Derechos Humanos",
                        "pt": "Defesa dos Direitos Humanos"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To provide legal assistance to individuals whose rights have been violated, ensuring access to justice.",
                        "es": "Proporcionar asistencia legal a individuos cuyos derechos han sido violados, garantizando el acceso a la justicia.",
                        "pt": "Fornecer assistência legal a indivíduos cujos direitos foram violados, garantindo o acesso à justiça."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d21",
                    "name": {
                        "en": "Public Awareness",
                        "es": "Conciencia Pública",
                        "pt": "Consciência Pública"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-s3e5-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "public, awareness, raise, human, rights, issues, foster, culture, respect, dignity",
                        "es": "público, conciencia, aumentar, humanos, derechos, temas, fomentar, cultura, respeto, dignidad",
                        "pt": "público, consciência, aumentar, humanos, direitos, questões, promover, cultura, respeito, dignidade"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Human Rights Advocacy",
                        "es": "Defensa de los Derechos Humanos",
                        "pt": "Defesa dos Direitos Humanos"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To raise public awareness about human rights issues, fostering a culture of respect and dignity.",
                        "es": "Aumentar la conciencia pública sobre los derechos humanos, fomentando una cultura de respeto y dignidad.",
                        "pt": "Aumentar a consciência pública sobre os direitos humanos, promovendo uma cultura de respeito e dignidade."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d22",
                    "name": {
                        "en": "Advocacy Campaigns",
                        "es": "Campañas de Defensa",
                        "pt": "Campanhas de Defesa"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-s3e5-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "advocacy, campaigns, conduct, promote, policy, changes, protections, human, rights",
                        "es": "defensa, campañas, realizar, promover, políticas, cambios, protecciones, humanos, derechos",
                        "pt": "defesa, campanhas, realizar, promover, políticas, mudanças, proteções, humanos, direitos"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Human Rights Advocacy",
                        "es": "Defensa de los Derechos Humanos",
                        "pt": "Defesa dos Direitos Humanos"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To conduct advocacy campaigns that promote policy changes and protections for human rights.",
                        "es": "Realizar campañas de defensa que promuevan cambios políticos y protecciones para los derechos humanos.",
                        "pt": "Realizar campanhas de defesa que promovam mudanças políticas e proteções para os direitos humanos."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d23",
                    "name": {
                        "en": "Support Services",
                        "es": "Servicios de Apoyo",
                        "pt": "Serviços de Apoio"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-s3e5-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "support, services, offer, victims, human, rights, abuses, counseling, rehabilitation",
                        "es": "apoyo, servicios, ofrecer, víctimas, humanos, derechos, abusos, asesoramiento, rehabilitación",
                        "pt": "apoio, serviços, oferecer, vítimas, humanos, direitos, abusos, aconselhamento, reabilitação"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Human Rights Advocacy",
                        "es": "Defensa de los Derechos Humanos",
                        "pt": "Defesa dos Direitos Humanos"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To offer support services for victims of human rights abuses, including counseling and rehabilitation.",
                        "es": "Ofrecer servicios de apoyo para víctimas de abusos de derechos humanos, incluyendo asesoramiento y rehabilitación.",
                        "pt": "Oferecer serviços de apoio para vítimas de abusos de direitos humanos, incluindo aconselhamento e reabilitação."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d24",
                    "name": {
                        "en": "Policy Change",
                        "es": "Cambio de Políticas",
                        "pt": "Mudança de Políticas"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-s3e5-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "policy, change, advocate, strengthen, protection, promotion, human, rights",
                        "es": "política, cambio, abogar, fortalecer, protección, promoción, humanos, derechos",
                        "pt": "política, mudança, defender, fortalecer, proteção, promoção, humanos, direitos"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Human Rights Advocacy",
                        "es": "Defensa de los Derechos Humanos",
                        "pt": "Defesa dos Direitos Humanos"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To advocate for policy changes that strengthen the protection and promotion of human rights.",
                        "es": "Abogar por cambios políticos que fortalezcan la protección y promoción de los derechos humanos.",
                        "pt": "Defender mudanças políticas que fortaleçam a proteção e promoção dos direitos humanos."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d25",
                    "name": {
                        "en": "Access to Justice",
                        "es": "Acceso a la Justicia",
                        "pt": "Acesso à Justiça"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-a34d-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "access, justice, ensure, individuals, marginalized, vulnerable, populations",
                        "es": "acceso, justicia, garantizar, individuos, marginados, vulnerables, poblaciones",
                        "pt": "acesso, justiça, garantir, indivíduos, marginalizados, vulneráveis, populações"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Legal Systems",
                        "es": "Sistemas Legales",
                        "pt": "Sistemas Legais"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To ensure access to justice for all individuals, particularly marginalized and vulnerable populations.",
                        "es": "Garantizar el acceso a la justicia para todos los individuos, particularmente las poblaciones marginadas y vulnerables.",
                        "pt": "Garantir o acesso à justiça para todos os indivíduos, particularmente as populações marginalizadas e vulneráveis."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d26",
                    "name": {
                        "en": "Legal Aid",
                        "es": "Ayuda Legal",
                        "pt": "Assistência Legal"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-a34d-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "legal, aid, provide, services, support, navigating, legal, system, obtaining, justice",
                        "es": "legal, ayuda, proporcionar, servicios, apoyo, navegar, legal, sistema, obtener, justicia",
                        "pt": "legal, auxílio, fornecer, serviços, apoiar, navegar, legal, sistema, obter, justiça"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Legal Systems",
                        "es": "Sistemas Legales",
                        "pt": "Sistemas Legais"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To provide legal aid services that support individuals in navigating the legal system and obtaining justice.",
                        "es": "Proporcionar servicios de ayuda legal que apoyen a los individuos en la navegación del sistema legal y la obtención de justicia.",
                        "pt": "Fornecer serviços de assistência legal que apoiem os indivíduos na navegação pelo sistema legal e na obtenção de justiça."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d27",
                    "name": {
                        "en": "Court Systems",
                        "es": "Sistemas Judiciales",
                        "pt": "Sistemas Judiciais"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-a34d-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "court, systems, ensure, effectiveness, efficiency, delivering, justice",
                        "es": "tribunal, sistemas, garantizar, efectividad, eficiencia, impartir, justicia",
                        "pt": "tribunal, sistemas, garantir, efetividade, eficiência, impartir, justiça"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Legal Systems",
                        "es": "Sistemas Legales",
                        "pt": "Sistemas Legais"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To ensure the effectiveness and efficiency of court systems in delivering justice.",
                        "es": "Garantizar la efectividad y eficiencia de los sistemas judiciales en la impartición de justicia.",
                        "pt": "Garantir a efetividade e eficiência dos sistemas judiciais na impartição de justiça."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d28",
                    "name": {
                        "en": "Legal Education",
                        "es": "Educación Legal",
                        "pt": "Educação Legal"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-a34d-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "legal, education, provide, programs, enhance, understanding, legal, rights, responsibilities",
                        "es": "legal, educación, proporcionar, programas, mejorar, comprensión, legales, derechos, responsabilidades",
                        "pt": "legal, educação, fornecer, programas, melhorar, compreensão, legais, direitos, responsabilidades"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Legal Systems",
                        "es": "Sistemas Legales",
                        "pt": "Sistemas Legais"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To provide legal education programs that enhance understanding of legal rights and responsibilities.",
                        "es": "Proporcionar programas de educación legal que mejoren la comprensión de los derechos y responsabilidades legales.",
                        "pt": "Fornecer programas de educação legal que melhorem a compreensão dos direitos e responsabilidades legais."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d29",
                    "name": {
                        "en": "Judicial Reform",
                        "es": "Reforma Judicial",
                        "pt": "Reforma Judicial"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-a34d-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "judicial, reform, advocate, ensure, fairness, efficiency, transparency, legal, system",
                        "es": "judicial, reforma, abogar, garantizar, justicia, eficiencia, transparencia, legal, sistema",
                        "pt": "judicial, reforma, defender, garantir, justiça, eficiência, transparência, legal, sistema"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Legal Systems",
                        "es": "Sistemas Legales",
                        "pt": "Sistemas Legais"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To advocate for judicial reform that ensures fairness, efficiency, and transparency in the legal system.",
                        "es": "Abogar por una reforma judicial que garantice la justicia, eficiencia y transparencia en el sistema legal.",
                        "pt": "Defender uma reforma judicial que garanta justiça, eficiência e transparência no sistema legal."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d30",
                    "name": {
                        "en": "Policy Research",
                        "es": "Investigación de Políticas",
                        "pt": "Pesquisa de Políticas"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-1gu8-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "policy, research, conduct, informs, development, implementation, effective, public, policies",
                        "es": "política, investigación, realizar, informa, desarrollo, implementación, efectiva, pública, políticas",
                        "pt": "política, pesquisa, realizar, informa, desenvolvimento, implementação, eficaz, pública, políticas"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Public Policy",
                        "es": "Política Pública",
                        "pt": "Política Pública"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To conduct policy research that informs the development and implementation of effective public policies.",
                        "es": "Realizar investigaciones políticas que informen el desarrollo e implementación de políticas públicas efectivas.",
                        "pt": "Realizar pesquisas de políticas que informem o desenvolvimento e implementação de políticas públicas eficazes."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d31",
                    "name": {
                        "en": "Public Consultation",
                        "es": "Consulta Pública",
                        "pt": "Consulta Pública"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-1gu8-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "public, consultation, facilitate, processes, gather, input, citizens, policy, decisions",
                        "es": "público, consulta, facilitar, procesos, recoger, aportaciones, ciudadanos, política, decisiones",
                        "pt": "público, consulta, facilitar, processos, recolher, contribuições, cidadãos, política, decisões"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Public Policy",
                        "es": "Política Pública",
                        "pt": "Política Pública"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To facilitate public consultation processes that gather input from citizens on policy decisions.",
                        "es": "Facilitar procesos de consulta pública que recojan aportaciones de los ciudadanos sobre decisiones políticas.",
                        "pt": "Facilitar processos de consulta pública que recolham contribuições dos cidadãos sobre decisões políticas."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d32",
                    "name": {
                        "en": "Policy Implementation",
                        "es": "Implementación de Políticas",
                        "pt": "Implementação de Políticas"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-1gu8-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "policy, implementation, ensure, effective, public, policies, address, societal, needs, improve, public, welfare",
                        "es": "política, implementación, asegurar, efectiva, pública, políticas, abordar, societal, necesidades, mejorar, pública, bienestar",
                        "pt": "política, implementação, garantir, eficaz, pública, políticas, abordar, societal, necessidades, melhorar, pública, bem-estar"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Public Policy",
                        "es": "Política Pública",
                        "pt": "Política Pública"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To ensure effective implementation of public policies that address societal needs and improve public welfare.",
                        "es": "Asegurar la implementación efectiva de políticas públicas que aborden las necesidades sociales y mejoren el bienestar público.",
                        "pt": "Garantir a implementação eficaz de políticas públicas que abordem as necessidades sociais e melhorem o bem-estar público."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d33",
                    "name": {
                        "en": "Impact Assessment",
                        "es": "Evaluación de Impacto",
                        "pt": "Avaliação de Impacto"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-1gu8-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "impact, assessment, conduct, evaluate, effectiveness, outcomes, public, policies",
                        "es": "impacto, evaluación, realizar, evaluar, efectividad, resultados, pública, políticas",
                        "pt": "impacto, avaliação, realizar, avaliar, eficácia, resultados, pública, políticas"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Public Policy",
                        "es": "Política Pública",
                        "pt": "Política Pública"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To conduct impact assessments that evaluate the effectiveness and outcomes of public policies.",
                        "es": "Realizar evaluaciones de impacto que evalúen la efectividad y resultados de las políticas públicas.",
                        "pt": "Realizar avaliações de impacto que avaliem a eficácia e os resultados das políticas públicas."
                    }
                },
                {
                    "id": "018f55a2-b56b-7167-8b73-59cd3fa71d34",
                    "name": {
                        "en": "Policy Advocacy",
                        "es": "Defensa de Políticas",
                        "pt": "Defesa de Políticas"
                    },
                    "prompt": "",
                    "created": 1715126740608,
                    "deleted": false,
                    "domainId": "018f3c0e-1gu8-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "policy, advocacy, promote, address, public, issues, common, good, strategic, planning, regulation",
                        "es": "política, defensa, promover, abordar, pública, problemas, común, bien, estratégica, planificación, regulación",
                        "pt": "política, defesa, promover, abordar, pública, problemas, comum, bem, estratégica, planejamento, regulação"
                    },
                    "sectorId": "018f2c09-0f87-79a6-835d-f8d756765b4a",
                    "isNeed": true,
                    "domainName": {
                        "en": "Public Policy",
                        "es": "Política Pública",
                        "pt": "Política Pública"
                    },
                    "sectorName": {
                        "en": "Political & Societal",
                        "es": "Político y Social",
                        "pt": "Político e Social"
                    },
                    "description": {
                        "en": "To advocate for policies that address public issues and promote the common good through strategic planning and regulation.",
                        "es": "Defender políticas que aborden problemas públicos y promuevan el bien común mediante la planificación estratégica y la regulación.",
                        "pt": "Defender políticas que abordem problemas públicos e promovam o bem comum por meio do planejamento estratégico e da regulamentação."
                    }
                },
                {
                    "id": "018f3e6d-0888-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Organizational Purpose",
                        "es": "Propósito Organizacional",
                        "pt": "Propósito Organizacional"
                    },
                    "created": 1714690657715,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Purpose, Mission, Goals",
                        "es": "Propósito, Misión, Metas",
                        "pt": "Propósito, Missão, Metas"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Defining the purpose and mission to guide organizational goals and activities.",
                        "es": "Definir el propósito y la misión para guiar las metas y actividades organizacionales.",
                        "pt": "Definir o propósito e a missão para orientar os objetivos e atividades organizacionais."
                    }
                },
                {
                    "id": "018f3e6d-199a-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Organizational Vision",
                        "es": "Visión Organizacional",
                        "pt": "Visão Organizacional"
                    },
                    "created": 1714690657716,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Vision, Future, Direction",
                        "es": "Visión, Futuro, Dirección",
                        "pt": "Visão, Futuro, Direção"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Setting the vision for the future to provide direction and inspiration.",
                        "es": "Establecer la visión para el futuro para proporcionar dirección e inspiración.",
                        "pt": "Estabelecer a visão para o futuro para proporcionar direção e inspiração."
                    }
                },
                {
                    "id": "018f3e6d-2aac-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Organizational Values",
                        "es": "Valores Organizacionales",
                        "pt": "Valores Organizacionais"
                    },
                    "created": 1714690657717,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Values, Principles, Beliefs",
                        "es": "Valores, Principios, Creencias",
                        "pt": "Valores, Princípios, Crenças"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Defining core values and principles to guide organizational behavior and decision-making.",
                        "es": "Definir valores y principios fundamentales para guiar el comportamiento y la toma de decisiones organizacionales.",
                        "pt": "Definir valores e princípios fundamentais para orientar o comportamento e a tomada de decisões organizacionais."
                    }
                },
                {
                    "id": "018f3e6d-3bbe-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Organizational Identity",
                        "es": "Identidad Organizacional",
                        "pt": "Identidade Organizacional"
                    },
                    "created": 1714690657718,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Identity, Brand, Image",
                        "es": "Identidad, Marca, Imagen",
                        "pt": "Identidade, Marca, Imagem"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Establishing and maintaining a strong organizational identity to build brand and reputation.",
                        "es": "Establecer y mantener una identidad organizacional fuerte para construir marca y reputación.",
                        "pt": "Estabelecer e manter uma identidade organizacional forte para construir marca e reputação."
                    }
                },
                {
                    "id": "018f3e6d-4cc0-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Organizational Culture",
                        "es": "Cultura Organizacional",
                        "pt": "Cultura Organizacional"
                    },
                    "created": 1714690657719,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Culture, Environment, Atmosphere",
                        "es": "Cultura, Entorno, Ambiente",
                        "pt": "Cultura, Ambiente, Atmosfera"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Fostering and maintaining a positive organizational culture to enhance engagement and productivity.",
                        "es": "Fomentar y mantener una cultura organizacional positiva para mejorar el compromiso y la productividad.",
                        "pt": "Fomentar e manter uma cultura organizacional positiva para melhorar o engajamento e a produtividade."
                    }
                },
                {
                    "id": "018f3e6d-6ee4-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Collective Belonging",
                        "es": "Pertenencia Colectiva",
                        "pt": "Pertencimento Coletivo"
                    },
                    "created": 1714690657721,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Belonging, Inclusion, Engagement",
                        "es": "Pertenencia, Inclusión, Compromiso",
                        "pt": "Pertencimento, Inclusão, Engajamento"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Creating a sense of belonging to ensure all members feel included and engaged.",
                        "es": "Crear un sentido de pertenencia para asegurar que todos los miembros se sientan incluidos y comprometidos.",
                        "pt": "Criar um sentido de pertencimento para garantir que todos os membros se sintam incluídos e engajados."
                    }
                },
                {
                    "id": "018f3e6d-7ff6-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Separation/Departures",
                        "es": "Separación/Partidas",
                        "pt": "Separação/Partidas"
                    },
                    "created": 1714690657722,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Separation, Departures, Exits",
                        "es": "Separación, Partidas, Salidas",
                        "pt": "Separação, Partidas, Saídas"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Managing separation and departures to ensure smooth transitions and continuity.",
                        "es": "Gestionar la separación y las partidas para asegurar transiciones suaves y continuidad.",
                        "pt": "Gerenciar a separação e as partidas para garantir transições suaves e continuidade."
                    }
                },
                {
                    "id": "018f3e6d-9008-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Joining The Organization",
                        "es": "Unirse a la Organización",
                        "pt": "Ingressar na Organização"
                    },
                    "created": 1714690657723,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Joining, Integration",
                        "es": "Unirse, Integración",
                        "pt": "Ingressar, Integração"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Processes for joining the organization to ensure new members are integrated smoothly.",
                        "es": "Procesos para unirse a la organización para asegurar que los nuevos miembros se integren sin problemas.",
                        "pt": "Processos para ingressar na organização para garantir que novos membros se integrem suavemente."
                    }
                },
                {
                    "id": "018f3e6d-e4e6-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "New Person Onboarding",
                        "es": "Incorporación de Nuevas Personas",
                        "pt": "Integração de Novas Pessoas"
                    },
                    "created": 1714699534002,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Onboarding, Integration, Induction",
                        "es": "Incorporación, Integración, Inducción",
                        "pt": "Integração, Indução, Ingresso"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Onboarding new members and employees to ensure they are well-integrated into the organization.",
                        "es": "Incorporar a nuevos miembros y empleados para asegurar que estén bien integrados en la organización.",
                        "pt": "Integração de novos membros e funcionários para garantir que estejam bem integrados na organização."
                    }
                },
                {
                    "id": "018f3e6d-d3d4-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Individual Contribution",
                        "es": "Contribución Individual",
                        "pt": "Contribuição Individual"
                    },
                    "created": 1714699534001,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Contribution, Participation, Involvement",
                        "es": "Contribución, Participación, Involucramiento",
                        "pt": "Contribuição, Participação, Envolvimento"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Encouraging and managing contributions from all members to ensure active participation.",
                        "es": "Fomentar y gestionar las contribuciones de todos los miembros para asegurar una participación activa.",
                        "pt": "Incentivar e gerenciar contribuições de todos os membros para garantir uma participação ativa."
                    }
                },
                {
                    "id": "018f3e6d-c1c2-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Decision Making",
                        "es": "Toma de Decisiones",
                        "pt": "Tomada de Decisões"
                    },
                    "created": 1714699534000,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Decision Making, Choices, Governance",
                        "es": "Toma de Decisiones, Elecciones, Gobernanza",
                        "pt": "Tomada de Decisões, Escolhas, Governança"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Establishing decision-making processes and protocols to ensure effective governance.",
                        "es": "Establecer procesos y protocolos de toma de decisiones para asegurar una gobernanza efectiva.",
                        "pt": "Estabelecer processos e protocolos de tomada de decisões para garantir uma governança eficaz."
                    }
                },
                {
                    "id": "018f3e6d-a8c4-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Team Coordination",
                        "es": "Coordinación del Equipo",
                        "pt": "Coordenação da Equipe"
                    },
                    "created": 1714699533999,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Coordination, Organization, Management",
                        "es": "Coordinación, Organización, Gestión",
                        "pt": "Coordenação, Organização, Gestão"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Ensuring effective coordination to streamline processes and improve organizational efficiency.",
                        "es": "Asegurar una coordinación efectiva para optimizar los procesos y mejorar la eficiencia organizacional.",
                        "pt": "Garantir uma coordenação eficaz para otimizar processos e melhorar a eficiência organizacional."
                    }
                },
                {
                    "id": "018f3e6d-7a8b-47a1-b8f8-2d27b34a1c2a",
                    "name": {
                        "en": "Participation and Performance Incentives",
                        "es": "Incentivos de Participación y Desempeño",
                        "pt": "Incentivos de Participação e Desempenho"
                    },
                    "created": 1714699533995,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Incentives, Performance, Participation",
                        "es": "Incentivos, Desempeño, Participación",
                        "pt": "Incentivos, Desempenho, Participação"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Providing incentives to encourage active participation and enhance performance within the organization.",
                        "es": "Proporcionar incentivos para fomentar la participación activa y mejorar el desempeño dentro de la organización.",
                        "pt": "Fornecer incentivos para incentivar a participação ativa e melhorar o desempenho dentro da organização."
                    }
                },
                {
                    "id": "018f3e6d-2a9d-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Individual Roles",
                        "es": "Roles Individuales",
                        "pt": "Funções Individuais"
                    },
                    "created": 1714699533996,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Roles, Responsibilities, Duties",
                        "es": "Roles, Responsabilidades, Deberes",
                        "pt": "Funções, Responsabilidades, Deveres"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Defining clear roles to ensure everyone understands their responsibilities and duties within the organization.",
                        "es": "Definir roles claros para asegurar que todos entiendan sus responsabilidades y deberes dentro de la organización.",
                        "pt": "Definir funções claras para garantir que todos entendam suas responsabilidades e deveres dentro da organização."
                    }
                },
                {
                    "id": "018f3e6d-5d5e-45f9-9c8f-847c4d2b8b25",
                    "name": {
                        "en": "Individual Responsibilities",
                        "es": "Responsabilidades Individuales",
                        "pt": "Responsabilidades Individuais"
                    },
                    "created": 1714699533997,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Responsibilities, Duties, Tasks",
                        "es": "Responsabilidades, Deberes, Tareas",
                        "pt": "Responsabilidades, Deveres, Tarefas"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Assigning and managing responsibilities to ensure tasks are completed efficiently and effectively.",
                        "es": "Asignar y gestionar responsabilidades para asegurar que las tareas se completen de manera eficiente y efectiva.",
                        "pt": "Atribuir e gerenciar responsabilidades para garantir que as tarefas sejam concluídas de forma eficiente e eficaz."
                    }
                },
                {
                    "id": "018f3e6d-8825-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Team Collaboration",
                        "es": "Colaboración en Equipo",
                        "pt": "Colaboração em Equipe"
                    },
                    "created": 1714699533998,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Collaboration, Teamwork, Cooperation",
                        "es": "Colaboración, Trabajo en Equipo, Cooperación",
                        "pt": "Colaboração, Trabalho em Equipe, Cooperação"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Facilitating collaboration and teamwork to achieve common goals and foster a cooperative environment.",
                        "es": "Facilitar la colaboración y el trabajo en equipo para lograr objetivos comunes y fomentar un ambiente cooperativo.",
                        "pt": "Facilitar a colaboração e o trabalho em equipe para alcançar objetivos comuns e promover um ambiente cooperativo."
                    }
                },
                {
                    "id": "018f3e6d-a11a-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Organizational Work Flows",
                        "es": "Flujos de Trabajo Organizacional",
                        "pt": "Fluxos de Trabalho Organizacional"
                    },
                    "created": 1714690657724,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Work Flows, Processes, Efficiency",
                        "es": "Flujos de Trabajo, Procesos, Eficiencia",
                        "pt": "Fluxos de Trabalho, Processos, Eficiência"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Designing and managing workflows to enhance efficiency and productivity.",
                        "es": "Diseñar y gestionar flujos de trabajo para mejorar la eficiencia y la productividad.",
                        "pt": "Projetar e gerenciar fluxos de trabalho para aumentar a eficiência e a produtividade."
                    }
                },
                {
                    "id": "018f3b1a-ddcf-78d0-b82d-45dr56da020o1",
                    "name": {
                        "en": "Security and Privacy",
                        "es": "Seguridad y Privacidad",
                        "pt": "Segurança e Privacidade"
                    },
                    "prompt": "",
                    "created": 1714699533995,
                    "deleted": false,
                    "domainId": "018f363-ddcf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "security, privacy, ensure, communication, channels, protect, sensitive, information, personal, data, unauthorized, access, cyber, threats",
                        "es": "seguridad, privacidad, garantizar, comunicación, canales, proteger, sensible, información, personal, datos, no autorizados, acceso, cibernéticos, amenazas",
                        "pt": "segurança, privacidade, garantir, comunicação, canais, proteger, sensível, informação, pessoal, dados, não autorizados, acesso, cibernéticos, ameaças"
                    },
                    "sectorId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "isNeed": true,
                    "domainName": {
                        "en": "Digital Communication",
                        "es": "Comunicación Digital",
                        "pt": "Comunicação Digital"
                    },
                    "sectorName": {
                        "en": "Technological",
                        "es": "Tecnológico",
                        "pt": "Tecnológico"
                    },
                    "description": {
                        "en": "Ensuring secure communication channels to protect sensitive information and personal data from unauthorized access and cyber threats.",
                        "es": "Garantizar canales de comunicación seguros para proteger la información sensible y los datos personales de accesos no autorizados y amenazas cibernéticas.",
                        "pt": "Garantir canais de comunicação seguros para proteger informações sensíveis e dados pessoais de acessos não autorizados e ameaças cibernéticas."
                    }
                },
                {
                    "id": "018f3b1a-ddcf-78d0-b82d-45dr56da020o2",
                    "name": {
                        "en": "Accessibility",
                        "es": "Accesibilidad",
                        "pt": "Acessibilidade"
                    },
                    "prompt": "",
                    "created": 1714699533995,
                    "deleted": false,
                    "domainId": "018f363-ddcf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "accessibility, platforms, technologies, accessible, individuals, disabilities, inclusive, participation",
                        "es": "accesibilidad, plataformas, tecnologías, accesible, individuos, discapacidades, inclusivo, participación",
                        "pt": "acessibilidade, plataformas, tecnologias, acessível, indivíduos, deficiências, inclusivo, participação"
                    },
                    "sectorId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "isNeed": true,
                    "domainName": {
                        "en": "Digital Communication",
                        "es": "Comunicación Digital",
                        "pt": "Comunicação Digital"
                    },
                    "sectorName": {
                        "en": "Technological",
                        "es": "Tecnológico",
                        "pt": "Tecnológico"
                    },
                    "description": {
                        "en": "Creating platforms and technologies that are accessible to all individuals, including those with disabilities, to ensure inclusive participation.",
                        "es": "Crear plataformas y tecnologías accesibles para todas las personas, incluidas aquellas con discapacidades, para garantizar una participación inclusiva.",
                        "pt": "Criar plataformas e tecnologias acessíveis para todas as pessoas, incluindo aquelas com deficiências, para garantir a participação inclusiva."
                    }
                },
                {
                    "id": "018f3b1a-ddcf-78d0-b82d-45dr56da020o3",
                    "name": {
                        "en": "Interoperability",
                        "es": "Interoperabilidad",
                        "pt": "Interoperabilidade"
                    },
                    "prompt": "",
                    "created": 1714699533995,
                    "deleted": false,
                    "domainId": "018f363-ddcf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "interoperability, systems, interact, platforms, technologies, seamless, information, exchange",
                        "es": "interoperabilidad, sistemas, interactuar, plataformas, tecnologías, sin fisuras, información, intercambio",
                        "pt": "interoperabilidade, sistemas, interagir, plataformas, tecnologias, sem emendas, informação, troca"
                    },
                    "sectorId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "isNeed": true,
                    "domainName": {
                        "en": "Digital Communication",
                        "es": "Comunicación Digital",
                        "pt": "Comunicação Digital"
                    },
                    "sectorName": {
                        "en": "Technological",
                        "es": "Tecnológico",
                        "pt": "Tecnológico"
                    },
                    "description": {
                        "en": "Developing systems that can seamlessly interact with different platforms and technologies to enable smooth information exchange.",
                        "es": "Desarrollar sistemas que puedan interactuar sin problemas con diferentes plataformas y tecnologías para permitir un intercambio de información fluido.",
                        "pt": "Desenvolver sistemas que possam interagir sem problemas com diferentes plataformas e tecnologias para permitir uma troca de informações suave."
                    }
                },
                {
                    "id": "018f3b1a-ddcf-78d0-b82d-45dr56da020o4",
                    "name": {
                        "en": "User Engagement",
                        "es": "Compromiso del Usuario",
                        "pt": "Engajamento do Usuário"
                    },
                    "prompt": "",
                    "created": 1714699533995,
                    "deleted": false,
                    "domainId": "018f363-ddcf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "user, engagement, designing, user-friendly, interfaces, encourage, active, participation, interaction, diverse, audiences",
                        "es": "usuario, compromiso, diseñar, fácil de usar, interfaces, animar, activo, participación, interacción, diverso, públicos",
                        "pt": "usuário, engajamento, projetar, fácil de usar, interfaces, incentivar, ativo, participação, interação, diverso, audiências"
                    },
                    "sectorId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "isNeed": true,
                    "domainName": {
                        "en": "Digital Communication",
                        "es": "Comunicación Digital",
                        "pt": "Comunicação Digital"
                    },
                    "sectorName": {
                        "en": "Technological",
                        "es": "Tecnológico",
                        "pt": "Tecnológico"
                    },
                    "description": {
                        "en": "Designing user-friendly interfaces that encourage active participation and interaction from diverse audiences.",
                        "es": "Diseñar interfaces fáciles de usar que animen la participación activa y la interacción de diversos públicos.",
                        "pt": "Projetar interfaces fáceis de usar que incentivem a participação ativa e a interação de diversos públicos."
                    }
                },
                {
                    "id": "018f3b1a-ddcf-78d0-b82d-45dr56da020o5",
                    "name": {
                        "en": "Transparency",
                        "es": "Transparencia",
                        "pt": "Transparência"
                    },
                    "prompt": "",
                    "created": 1714699533995,
                    "deleted": false,
                    "domainId": "018f363-ddcf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "transparency, providing, clear, open, communication, channels, promote, trust, accountability, public, political, discourse",
                        "es": "transparencia, proporcionar, claro, abierto, comunicación, canales, promover, confianza, responsabilidad, pública, política, discurso",
                        "pt": "transparência, fornecer, claro, aberto, comunicação, canais, promover, confiança, responsabilidade, pública, política, discurso"
                    },
                    "sectorId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "isNeed": true,
                    "domainName": {
                        "en": "Digital Communication",
                        "es": "Comunicación Digital",
                        "pt": "Comunicação Digital"
                    },
                    "sectorName": {
                        "en": "Technological",
                        "es": "Tecnológico",
                        "pt": "Tecnológico"
                    },
                    "description": {
                        "en": "Providing clear and open communication channels to promote trust and accountability in public and political discourse.",
                        "es": "Proporcionar canales de comunicación claros y abiertos para promover la confianza y la responsabilidad en el discurso público y político.",
                        "pt": "Fornecer canais de comunicação claros e abertos para promover a confiança e a responsabilidade no discurso público e político."
                    }
                },
                {
                    "id": "018f3b1b-ddcf-78d0-b82d-45dr56da020o1",
                    "name": {
                        "en": "Scalability",
                        "es": "Escalabilidad",
                        "pt": "Escalabilidade"
                    },
                    "prompt": "",
                    "created": 1714699533995,
                    "deleted": false,
                    "domainId": "018f321-ddcf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "scalability, building, infrastructure, efficiently, scale, accommodate, increasing, numbers, users, higher, data, volumes",
                        "es": "escalabilidad, construcción, infraestructura, eficientemente, escalar, acomodar, creciente, números, usuarios, más altos, datos, volúmenes",
                        "pt": "escalabilidade, construção, infraestrutura, eficientemente, escalar, acomodar, crescente, números, usuários, maiores, dados, volumes"
                    },
                    "sectorId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "isNeed": true,
                    "domainName": {
                        "en": "IT Infrastructure",
                        "es": "Infraestructura TI",
                        "pt": "Infraestrutura TI"
                    },
                    "sectorName": {
                        "en": "Technological",
                        "es": "Tecnológico",
                        "pt": "Tecnológico"
                    },
                    "description": {
                        "en": "Building infrastructure that can efficiently scale to accommodate increasing numbers of users and higher data volumes.",
                        "es": "Construir infraestructura que pueda escalar eficientemente para acomodar un número creciente de usuarios y volúmenes de datos más altos.",
                        "pt": "Construir infraestrutura que possa escalar eficientemente para acomodar um número crescente de usuários e maiores volumes de dados."
                    }
                },
                {
                    "id": "018f3b1b-ddcf-78d0-b82d-45dr56da020o2",
                    "name": {
                        "en": "Reliability",
                        "es": "Fiabilidad",
                        "pt": "Confiabilidade"
                    },
                    "prompt": "",
                    "created": 1714699533995,
                    "deleted": false,
                    "domainId": "018f321-ddcf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "reliability, ensuring, continuous, dependable, service, availability, minimal, downtime",
                        "es": "fiabilidad, garantizar, continua, fiable, servicio, disponibilidad, mínimo, tiempo de inactividad",
                        "pt": "confiabilidade, garantir, contínua, confiável, serviço, disponibilidade, mínimo, tempo de inatividade"
                    },
                    "sectorId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "isNeed": true,
                    "domainName": {
                        "en": "IT Infrastructure",
                        "es": "Infraestructura TI",
                        "pt": "Infraestrutura TI"
                    },
                    "sectorName": {
                        "en": "Technological",
                        "es": "Tecnológico",
                        "pt": "Tecnológico"
                    },
                    "description": {
                        "en": "Ensuring continuous and dependable service availability with minimal downtime.",
                        "es": "Garantizar la disponibilidad continua y confiable del servicio con un tiempo de inactividad mínimo.",
                        "pt": "Garantir a disponibilidade contínua e confiável do serviço com um tempo mínimo de inatividade."
                    }
                },
                {
                    "id": "018f3b1b-ddcf-78d0-b82d-45dr56da020o3",
                    "name": {
                        "en": "Security",
                        "es": "Seguridad",
                        "pt": "Segurança"
                    },
                    "prompt": "",
                    "created": 1714699533995,
                    "deleted": false,
                    "domainId": "018f321-ddcf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "security, implementing, robust, measures, protect, cyber, attacks, data, breaches, unauthorized, access",
                        "es": "seguridad, implementar, robusto, medidas, proteger, cibernético, ataques, datos, infracciones, no autorizados, acceso",
                        "pt": "segurança, implementar, robusto, medidas, proteger, cibernético, ataques, dados, violações, não autorizados, acesso"
                    },
                    "sectorId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "isNeed": true,
                    "domainName": {
                        "en": "IT Infrastructure",
                        "es": "Infraestructura TI",
                        "pt": "Infraestrutura TI"
                    },
                    "sectorName": {
                        "en": "Technological",
                        "es": "Tecnológico",
                        "pt": "Tecnológico"
                    },
                    "description": {
                        "en": "Implementing robust security measures to protect against cyber attacks, data breaches, and unauthorized access.",
                        "es": "Implementar medidas de seguridad robustas para proteger contra ataques cibernéticos, infracciones de datos y accesos no autorizados.",
                        "pt": "Implementar medidas de segurança robustas para proteger contra ataques cibernéticos, violações de dados e acessos não autorizados."
                    }
                },
                {
                    "id": "018f3b1b-ddcf-78d0-b82d-45dr56da020o4",
                    "name": {
                        "en": "Efficiency",
                        "es": "Eficiencia",
                        "pt": "Eficiência"
                    },
                    "prompt": "",
                    "created": 1714699533995,
                    "deleted": false,
                    "domainId": "018f321-ddcf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "efficiency, optimizing, performance, resource, utilization, ensure, cost-effective, operation",
                        "es": "eficiencia, optimización, rendimiento, recursos, utilización, garantizar, costo-efectivo, operación",
                        "pt": "eficiência, otimização, desempenho, recursos, utilização, garantir, custo-efetivo, operação"
                    },
                    "sectorId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "isNeed": true,
                    "domainName": {
                        "en": "IT Infrastructure",
                        "es": "Infraestructura TI",
                        "pt": "Infraestrutura TI"
                    },
                    "sectorName": {
                        "en": "Technological",
                        "es": "Tecnológico",
                        "pt": "Tecnológico"
                    },
                    "description": {
                        "en": "Optimizing performance and resource utilization to ensure cost-effective operation.",
                        "es": "Optimizar el rendimiento y la utilización de recursos para garantizar una operación costo-efectiva.",
                        "pt": "Otimizar o desempenho e a utilização de recursos para garantir uma operação custo-efetiva."
                    }
                },
                {
                    "id": "018f3b1b-ddcf-78d0-b82d-45dr56da020o5",
                    "name": {
                        "en": "Innovation",
                        "es": "Innovación",
                        "pt": "Inovação"
                    },
                    "prompt": "",
                    "created": 1714699533995,
                    "deleted": false,
                    "domainId": "018f321-ddcf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "innovation, continual, improvement, integration, new, technologies, enhance, infrastructure, capabilities",
                        "es": "innovación, continua, mejora, integración, nuevo, tecnologías, mejorar, infraestructura, capacidades",
                        "pt": "inovação, contínua, melhoria, integração, novo, tecnologias, melhorar, infraestrutura, capacidades"
                    },
                    "sectorId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "isNeed": true,
                    "domainName": {
                        "en": "IT Infrastructure",
                        "es": "Infraestructura TI",
                        "pt": "Infraestrutura TI"
                    },
                    "sectorName": {
                        "en": "Technological",
                        "es": "Tecnológico",
                        "pt": "Tecnológico"
                    },
                    "description": {
                        "en": "Continual improvement and integration of new technologies to enhance infrastructure capabilities.",
                        "es": "Mejora continua e integración de nuevas tecnologías para mejorar las capacidades de infraestructura.",
                        "pt": "Melhoria contínua e integração de novas tecnologias para aprimorar as capacidades da infraestrutura."
                    }
                },
                {
                    "id": "018f3b1c-ddcf-78d0-b82d-45dr56da020o1",
                    "name": {
                        "en": "Collaboration",
                        "es": "Colaboración",
                        "pt": "Colaboração"
                    },
                    "prompt": "",
                    "created": 1714699533995,
                    "deleted": false,
                    "domainId": "018f3er4-ddcf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "collaboration, fostering, governments, academia, private, sector, address, societal, challenges",
                        "es": "colaboración, fomentar, gobiernos, academia, privado, sector, abordar, societal, desafíos",
                        "pt": "colaboração, fomentar, governos, academia, privado, setor, abordar, societal, desafios"
                    },
                    "sectorId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "isNeed": true,
                    "domainName": {
                        "en": "Innovation & Research",
                        "es": "Innovación e Investigación",
                        "pt": "Inovação e Pesquisa"
                    },
                    "sectorName": {
                        "en": "Technological",
                        "es": "Tecnológico",
                        "pt": "Tecnológico"
                    },
                    "description": {
                        "en": "Fostering collaboration between governments, academia, and the private sector to address societal challenges.",
                        "es": "Fomentar la colaboración entre gobiernos, academia y el sector privado para abordar los desafíos sociales.",
                        "pt": "Fomentar a colaboração entre governos, academia e o setor privado para abordar os desafios sociais."
                    }
                },
                {
                    "id": "018f3b1c-ddcf-78d0-b82d-45dr56da020o2",
                    "name": {
                        "en": "Funding",
                        "es": "Financiación",
                        "pt": "Financiamento"
                    },
                    "prompt": "",
                    "created": 1714699533995,
                    "deleted": false,
                    "domainId": "018f3er4-ddcf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "funding, securing, adequate, support, research, development, initiatives",
                        "es": "financiación, asegurar, adecuada, apoyar, investigación, desarrollo, iniciativas",
                        "pt": "financiamento, garantir, adequada, apoiar, pesquisa, desenvolvimento, iniciativas"
                    },
                    "sectorId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "isNeed": true,
                    "domainName": {
                        "en": "Innovation & Research",
                        "es": "Innovación e Investigación",
                        "pt": "Inovação e Pesquisa"
                    },
                    "sectorName": {
                        "en": "Technological",
                        "es": "Tecnológico",
                        "pt": "Tecnológico"
                    },
                    "description": {
                        "en": "Securing adequate funding to support research and development initiatives.",
                        "es": "Asegurar una financiación adecuada para apoyar iniciativas de investigación y desarrollo.",
                        "pt": "Garantir financiamento adequado para apoiar iniciativas de pesquisa e desenvolvimento."
                    }
                },
                {
                    "id": "018f3b1c-ddcf-78d0-b82d-45dr56da020o3",
                    "name": {
                        "en": "Talent Development",
                        "es": "Desarrollo de Talento",
                        "pt": "Desenvolvimento de Talento"
                    },
                    "prompt": "",
                    "created": 1714699533995,
                    "deleted": false,
                    "domainId": "018f3er4-ddcf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "talent, development, cultivating, skilled, professionals, drive, innovation, research, efforts",
                        "es": "talento, desarrollo, cultivar, cualificado, profesionales, impulsar, innovación, investigación, esfuerzos",
                        "pt": "talento, desenvolvimento, cultivar, qualificado, profissionais, impulsionar, inovação, pesquisa, esforços"
                    },
                    "sectorId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "isNeed": true,
                    "domainName": {
                        "en": "Innovation & Research",
                        "es": "Innovación e Investigación",
                        "pt": "Inovação e Pesquisa"
                    },
                    "sectorName": {
                        "en": "Technological",
                        "es": "Tecnológico",
                        "pt": "Tecnológico"
                    },
                    "description": {
                        "en": "Cultivating skilled professionals to drive innovation and research efforts.",
                        "es": "Cultivar profesionales cualificados para impulsar los esfuerzos de innovación e investigación.",
                        "pt": "Cultivar profissionais qualificados para impulsionar os esforços de inovação e pesquisa."
                    }
                },
                {
                    "id": "018f3b1c-ddcf-78d0-b82d-45dr56da020o4",
                    "name": {
                        "en": "Technology Transfer",
                        "es": "Transferencia de Tecnología",
                        "pt": "Transferência de Tecnologia"
                    },
                    "prompt": "",
                    "created": 1714699533995,
                    "deleted": false,
                    "domainId": "018f3er4-ddcf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "technology, transfer, facilitating, new, technologies, research, labs, practical, applications",
                        "es": "tecnología, transferencia, facilitar, nuevo, tecnologías, investigación, laboratorios, prácticas, aplicaciones",
                        "pt": "tecnologia, transferência, facilitar, novo, tecnologias, pesquisa, laboratórios, práticas, aplicações"
                    },
                    "sectorId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "isNeed": true,
                    "domainName": {
                        "en": "Innovation & Research",
                        "es": "Innovación e Investigación",
                        "pt": "Inovação e Pesquisa"
                    },
                    "sectorName": {
                        "en": "Technological",
                        "es": "Tecnológico",
                        "pt": "Tecnológico"
                    },
                    "description": {
                        "en": "Facilitating the transfer of new technologies from research labs to practical applications.",
                        "es": "Facilitar la transferencia de nuevas tecnologías de los laboratorios de investigación a aplicaciones prácticas.",
                        "pt": "Facilitar a transferência de novas tecnologias dos laboratórios de pesquisa para aplicações práticas."
                    }
                },
                {
                    "id": "018f3b1c-ddcf-78d0-b82d-45dr56da020o5",
                    "name": {
                        "en": "Data Sharing",
                        "es": "Compartir Datos",
                        "pt": "Compartilhamento de Dados"
                    },
                    "prompt": "",
                    "created": 1714699533995,
                    "deleted": false,
                    "domainId": "018f3er4-ddcf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "data, sharing, promoting, open, accelerate, innovation, collaborative, research",
                        "es": "datos, compartir, promover, abierto, acelerar, innovación, colaborativo, investigación",
                        "pt": "dados, compartilhamento, promover, aberto, acelerar, inovação, colaborativo, pesquisa"
                    },
                    "sectorId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "isNeed": true,
                    "domainName": {
                        "en": "Innovation & Research",
                        "es": "Innovación e Investigación",
                        "pt": "Inovação e Pesquisa"
                    },
                    "sectorName": {
                        "en": "Technological",
                        "es": "Tecnológico",
                        "pt": "Tecnológico"
                    },
                    "description": {
                        "en": "Promoting open data sharing to accelerate innovation and collaborative research.",
                        "es": "Promover el intercambio abierto de datos para acelerar la innovación y la investigación colaborativa.",
                        "pt": "Promover o compartilhamento aberto de dados para acelerar a inovação e a pesquisa colaborativa."
                    }
                },
                {
                    "id": "018f3b1d-ddcf-78d0-b82d-45dr56da020o1",
                    "name": {
                        "en": "Agile Methodologies",
                        "es": "Metodologías Ágiles",
                        "pt": "Metodologias Ágeis"
                    },
                    "prompt": "",
                    "created": 1714699533995,
                    "deleted": false,
                    "domainId": "018f3567-ddcf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "agile, methodologies, adopting, enhance, flexibility, responsiveness, software, development",
                        "es": "ágil, metodologías, adoptar, mejorar, flexibilidad, capacidad de respuesta, software, desarrollo",
                        "pt": "ágil, metodologias, adotar, melhorar, flexibilidade, capacidade de resposta, software, desenvolvimento"
                    },
                    "sectorId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "isNeed": true,
                    "domainName": {
                        "en": "Software Development",
                        "es": "Desarrollo de Software",
                        "pt": "Desenvolvimento de Software"
                    },
                    "sectorName": {
                        "en": "Technological",
                        "es": "Tecnológico",
                        "pt": "Tecnológico"
                    },
                    "description": {
                        "en": "Adopting agile methodologies to enhance flexibility and responsiveness in software development.",
                        "es": "Adoptar metodologías ágiles para mejorar la flexibilidad y la capacidad de respuesta en el desarrollo de software.",
                        "pt": "Adotar metodologias ágeis para melhorar a flexibilidade e a capacidade de resposta no desenvolvimento de software."
                    }
                },
                {
                    "id": "018f3b1d-ddcf-78d0-b82d-45dr56da020o2",
                    "name": {
                        "en": "Quality Assurance",
                        "es": "Garantía de Calidad",
                        "pt": "Garantia de Qualidade"
                    },
                    "prompt": "",
                    "created": 1714699533995,
                    "deleted": false,
                    "domainId": "018f3567-ddcf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "quality, assurance, implementing, robust, practices, ensure, reliability, performance, software, applications",
                        "es": "calidad, garantía, implementar, robusto, prácticas, asegurar, fiabilidad, rendimiento, software, aplicaciones",
                        "pt": "qualidade, garantia, implementar, robusto, práticas, garantir, confiabilidade, desempenho, software, aplicações"
                    },
                    "sectorId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "isNeed": true,
                    "domainName": {
                        "en": "Software Development",
                        "es": "Desarrollo de Software",
                        "pt": "Desenvolvimento de Software"
                    },
                    "sectorName": {
                        "en": "Technological",
                        "es": "Tecnológico",
                        "pt": "Tecnológico"
                    },
                    "description": {
                        "en": "Implementing robust quality assurance practices to ensure the reliability and performance of software applications.",
                        "es": "Implementar prácticas de garantía de calidad robustas para asegurar la fiabilidad y el rendimiento de las aplicaciones de software.",
                        "pt": "Implementar práticas robustas de garantia de qualidade para garantir a confiabilidade e o desempenho das aplicações de software."
                    }
                },
                {
                    "id": "018f3b1d-ddcf-78d0-b82d-45dr56da020o3",
                    "name": {
                        "en": "Continuous Integration",
                        "es": "Integración Continua",
                        "pt": "Integração Contínua"
                    },
                    "prompt": "",
                    "created": 1714699533995,
                    "deleted": false,
                    "domainId": "018f3567-ddcf-78d0-b82d-45dr56da020o",
                    "keywords": {
                        "en": "continuous, integration, adopting, deployment, practices, streamline, software, development, delivery",
                        "es": "continua, integración, adoptar, implementación, prácticas, optimizar, software, desarrollo, entrega",
                        "pt": "contínua, integração, adotar, implementação, práticas, otimizar, software, desenvolvimento, entrega"
                    },
                    "sectorId": "018f2c0a-0315-7cb2-b72f-7c68d5630bb5",
                    "isNeed": true,
                    "domainName": {
                        "en": "Software Development",
                        "es": "Desarrollo de Software",
                        "pt": "Desenvolvimento de Software"
                    },
                    "sectorName": {
                        "en": "Technological",
                        "es": "Tecnológico",
                        "pt": "Tecnológico"
                    },
                    "description": {
                        "en": "Adopting continuous integration and deployment practices to streamline software development and delivery.",
                        "es": "Adoptar prácticas de integración y despliegue continuos para optimizar el desarrollo y la entrega de software.",
                        "pt": "Adotar práticas de integração e implantação contínuas para otimizar o desenvolvimento e a entrega de software."
                    }
                },
                {
                    "id": "018f3e6d-39f0-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Compensation",
                        "es": "Compensación",
                        "pt": "Compensação"
                    },
                    "created": 1714699433140,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Compensation, Pay, Salary, Wages",
                        "es": "Compensación, Pago, Salario, Sueldo",
                        "pt": "Compensação, Pagamento, Salário, Remuneração"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Establishing and managing compensation structures to ensure fair and competitive pay for all members.",
                        "es": "Establecer y gestionar estructuras de compensación para asegurar un pago justo y competitivo para todos los miembros.",
                        "pt": "Estabelecer e gerenciar estruturas de compensação para garantir remuneração justa e competitiva para todos os membros."
                    }
                },
                {
                    "id": "018f3e6d-6d56-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Taxes",
                        "es": "Impuestos",
                        "pt": "Impostos"
                    },
                    "created": 1714699433143,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Taxes, Taxation, Tax Compliance",
                        "es": "Impuestos, Tributación, Cumplimiento Tributario",
                        "pt": "Impostos, Tributação, Conformidade Fiscal"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Managing tax obligations and ensuring compliance with tax regulations.",
                        "es": "Gestionar las obligaciones fiscales y asegurar el cumplimiento de las regulaciones tributarias.",
                        "pt": "Gerenciar as obrigações fiscais e garantir a conformidade com as regulamentações tributárias."
                    }
                },
                {
                    "id": "018f3e6d-8f9a-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Reporting",
                        "es": "Informes",
                        "pt": "Relatórios"
                    },
                    "created": 1714699433145,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Reporting, Financial Reporting, Operational Reporting",
                        "es": "Informes, Informes Financieros, Informes Operacionales",
                        "pt": "Relatórios, Relatórios Financeiros, Relatórios Operacionais"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Providing accurate and timely financial and operational reports to ensure transparency and accountability.",
                        "es": "Proporcionar informes financieros y operacionales precisos y oportunos para asegurar la transparencia y la responsabilidad.",
                        "pt": "Fornecer relatórios financeiros e operacionais precisos e oportunos para garantir transparência e responsabilidade."
                    }
                },
                {
                    "id": "018f3e6d-90ac-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Budgeting",
                        "es": "Presupuestación",
                        "pt": "Orçamentação"
                    },
                    "created": 1714699433146,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Budgeting, Financial Planning, Budget Management",
                        "es": "Presupuestación, Planificación Financiera, Gestión de Presupuestos",
                        "pt": "Orçamentação, Planejamento Financeiro, Gestão de Orçamentos"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Planning and managing budgets to ensure financial sustainability and control.",
                        "es": "Planificar y gestionar presupuestos para asegurar la sostenibilidad financiera y el control.",
                        "pt": "Planejar e gerenciar orçamentos para garantir sustentabilidade financeira e controle."
                    }
                },
                {
                    "id": "018f3e6d-a1ce-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Risk Management",
                        "es": "Gestión de Riesgos",
                        "pt": "Gestão de Riscos"
                    },
                    "created": 1714699433147,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Risk Management, Financial Risk, Risk Mitigation",
                        "es": "Gestión de Riesgos, Riesgo Financiero, Mitigación de Riesgos",
                        "pt": "Gestão de Riscos, Risco Financeiro, Mitigação de Riscos"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Identifying and mitigating financial risks to protect the organization's assets and ensure stability.",
                        "es": "Identificar y mitigar riesgos financieros para proteger los activos de la organización y asegurar la estabilidad.",
                        "pt": "Identificar e mitigar riscos financeiros para proteger os ativos da organização e garantir a estabilidade."
                    }
                },
                {
                    "id": "018f3e6d-b2f0-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Legal Requirements",
                        "es": "Requisitos Legales",
                        "pt": "Requisitos Legais"
                    },
                    "created": 1714699286511,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Legal Requirements, Compliance, Regulations",
                        "es": "Requisitos Legales, Cumplimiento, Regulaciones",
                        "pt": "Requisitos Legais, Conformidade, Regulamentações"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Ensuring compliance with legal requirements and regulations to operate within the law.",
                        "es": "Asegurar el cumplimiento de los requisitos legales y las regulaciones para operar dentro de la ley.",
                        "pt": "Garantir a conformidade com os requisitos legais e regulamentações para operar dentro da lei."
                    }
                },
                {
                    "id": "018f3e6d-06aa-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Attribution",
                        "es": "Atribución",
                        "pt": "Atribuição"
                    },
                    "created": 1714699534004,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Attribution, Credit, Acknowledgement",
                        "es": "Atribución, Crédito, Reconocimiento",
                        "pt": "Atribuição, Crédito, Reconhecimento"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Ensuring proper attribution to recognize the efforts and contributions of individuals accurately.",
                        "es": "Asegurar la atribución adecuada para reconocer los esfuerzos y las contribuciones de los individuos con precisión.",
                        "pt": "Garantir a atribuição adequada para reconhecer os esforços e as contribuições dos indivíduos com precisão."
                    }
                },
                {
                    "id": "018f3e6d-c412-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Regulation",
                        "es": "Regulación",
                        "pt": "Regulamentação"
                    },
                    "created": 1714699286512,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Regulation, Compliance, Standards",
                        "es": "Regulación, Cumplimiento, Estándares",
                        "pt": "Regulamentação, Conformidade, Padrões"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Adhering to regulations and standards to maintain operational integrity and legal compliance.",
                        "es": "Adherirse a las regulaciones y estándares para mantener la integridad operacional y el cumplimiento legal.",
                        "pt": "Aderir a regulamentações e padrões para manter a integridade operacional e a conformidade legal."
                    }
                },
                {
                    "id": "018f3e6d-d534-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Compliance",
                        "es": "Cumplimiento",
                        "pt": "Conformidade"
                    },
                    "created": 1714699286513,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Compliance, Legal, Regulations",
                        "es": "Cumplimiento, Legal, Regulaciones",
                        "pt": "Conformidade, Legal, Regulamentações"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Ensuring adherence to legal and regulatory requirements to maintain compliance.",
                        "es": "Asegurar la adherencia a los requisitos legales y regulatorios para mantener el cumplimiento.",
                        "pt": "Garantir a adesão aos requisitos legais e regulamentares para manter a conformidade."
                    }
                },
                {
                    "id": "018f3e6d-e656-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Contracts",
                        "es": "Contratos",
                        "pt": "Contratos"
                    },
                    "created": 1714699286514,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Contracts, Agreements, Legal",
                        "es": "Contratos, Acuerdos, Legal",
                        "pt": "Contratos, Acordos, Legal"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Managing contracts and agreements to ensure legal and operational clarity.",
                        "es": "Gestionar contratos y acuerdos para asegurar claridad legal y operacional.",
                        "pt": "Gerenciar contratos e acordos para garantir clareza legal e operacional."
                    }
                },
                {
                    "id": "018f3e6d-f778-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Negotiation",
                        "es": "Negociación",
                        "pt": "Negociação"
                    },
                    "created": 1714699286515,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Negotiation, Deals, Agreements",
                        "es": "Negociación, Tratos, Acuerdos",
                        "pt": "Negociação, Acordos, Pactos"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Facilitating negotiations to reach mutually beneficial agreements and deals.",
                        "es": "Facilitar negociaciones para alcanzar acuerdos y tratos mutuamente beneficiosos.",
                        "pt": "Facilitar negociações para alcançar acordos e pactos mutuamente benéficos."
                    }
                },
                {
                    "id": "018f3e6d-088a-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Fair Trade",
                        "es": "Comercio Justo",
                        "pt": "Comércio Justo"
                    },
                    "created": 1714699286516,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Fair Trade, Ethical Trading, Standards",
                        "es": "Comercio Justo, Comercio Ético, Estándares",
                        "pt": "Comércio Justo, Comércio Ético, Padrões"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Ensuring fair trade practices to promote ethical standards and equity in trading.",
                        "es": "Asegurar prácticas de comercio justo para promover estándares éticos y equidad en el comercio.",
                        "pt": "Garantir práticas de comércio justo para promover padrões éticos e equidade no comércio."
                    }
                },
                {
                    "id": "018f3e6d-199c-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Conflict Resolution",
                        "es": "Resolución de Conflictos",
                        "pt": "Resolução de Conflitos"
                    },
                    "created": 1714699286517,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Conflict Resolution, Disputes, Mediation",
                        "es": "Resolución de Conflictos, Disputas, Mediación",
                        "pt": "Resolução de Conflitos, Disputas, Mediação"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Resolving disputes and conflicts through mediation and negotiation to maintain harmony.",
                        "es": "Resolver disputas y conflictos a través de la mediación y la negociación para mantener la armonía.",
                        "pt": "Resolver disputas e conflitos através de mediação e negociação para manter a harmonia."
                    }
                },
                {
                    "id": "018f3e6d-2aae-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Dissolution",
                        "es": "Disolución",
                        "pt": "Dissolução"
                    },
                    "created": 1714699286518,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Dissolution, Closure, Wind-up",
                        "es": "Disolución, Cierre, Liquidación",
                        "pt": "Dissolução, Encerramento, Liquidação"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Managing the dissolution and closure of the organization or agreements in an orderly manner.",
                        "es": "Gestionar la disolución y el cierre de la organización o acuerdos de manera ordenada.",
                        "pt": "Gerenciar a dissolução e encerramento da organização ou acordos de maneira ordenada."
                    }
                },
                {
                    "id": "018f3e6d-3bc0-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Transparency",
                        "es": "Transparencia",
                        "pt": "Transparência"
                    },
                    "created": 1714699286519,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Transparency, Openness, Accountability",
                        "es": "Transparencia, Apertura, Responsabilidad",
                        "pt": "Transparência, Abertura, Responsabilidade"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Maintaining transparency in operations and transactions to ensure accountability and trust.",
                        "es": "Mantener la transparencia en las operaciones y transacciones para asegurar la responsabilidad y la confianza.",
                        "pt": "Manter a transparência nas operações e transações para garantir responsabilidade e confiança."
                    }
                },
                {
                    "id": "018f3e6d-4cd2-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Ethical Standards",
                        "es": "Estándares Éticos",
                        "pt": "Padrões Éticos"
                    },
                    "created": 1714699286520,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Ethical Standards, Ethics, Morality",
                        "es": "Estándares Éticos, Ética, Moralidad",
                        "pt": "Padrões Éticos, Ética, Moralidade"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Upholding ethical standards in all trading and business practices to ensure fairness and integrity.",
                        "es": "Mantener estándares éticos en todas las prácticas comerciales y de negocios para asegurar equidad e integridad.",
                        "pt": "Manter padrões éticos em todas as práticas comerciais e de negócios para garantir equidade e integridade."
                    }
                },
                {
                    "id": "018f3e6d-5de4-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Product Offerings",
                        "es": "Ofertas de Productos",
                        "pt": "Ofertas de Produtos"
                    },
                    "created": 1714699397795,
                    "deleted": false,
                    "domainId": "018f3c0c-f48b-707c-8fe0-faf8d1bf28d2",
                    "keywords": {
                        "en": "Products, Development, Goods",
                        "es": "Productos, Desarrollo, Bienes",
                        "pt": "Produtos, Desenvolvimento, Bens"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Market Transactions",
                        "es": "Transacciones de Mercado",
                        "pt": "Transações de Mercado"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Developing and managing products to meet market demands and organizational goals.",
                        "es": "Desarrollar y gestionar productos para satisfacer las demandas del mercado y los objetivos organizacionales.",
                        "pt": "Desenvolver e gerenciar produtos para atender às demandas do mercado e aos objetivos organizacionais."
                    }
                },
                {
                    "id": "018f3e6d-6ef6-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Service Offerings",
                        "es": "Ofertas de Servicios",
                        "pt": "Ofertas de Serviços"
                    },
                    "created": 1714699397796,
                    "deleted": false,
                    "domainId": "018f3c0c-f48b-707c-8fe0-faf8d1bf28d2",
                    "keywords": {
                        "en": "Services, Management, Delivery",
                        "es": "Servicios, Gestión, Entrega",
                        "pt": "Serviços, Gestão, Entrega"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Market Transactions",
                        "es": "Transacciones de Mercado",
                        "pt": "Transações de Mercado"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Providing and managing services to meet customer needs and organizational objectives.",
                        "es": "Proporcionar y gestionar servicios para satisfacer las necesidades de los clientes y los objetivos organizacionales.",
                        "pt": "Fornecer e gerenciar serviços para atender às necessidades dos clientes e aos objetivos organizacionais."
                    }
                },
                {
                    "id": "018f3e6d-8008-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Marketplace/Ecosystem",
                        "es": "Mercado/Ecosistema",
                        "pt": "Mercado/Ecossistema"
                    },
                    "created": 1714699397797,
                    "deleted": false,
                    "domainId": "018f3c0c-f48b-707c-8fe0-faf8d1bf28d2",
                    "keywords": {
                        "en": "Marketplace, Ecosystem, Exchange",
                        "es": "Mercado, Ecosistema, Intercambio",
                        "pt": "Mercado, Ecossistema, Troca"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Market Transactions",
                        "es": "Transacciones de Mercado",
                        "pt": "Transações de Mercado"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Creating and managing a marketplace or ecosystem for the exchange of goods and services.",
                        "es": "Crear y gestionar un mercado o ecosistema para el intercambio de bienes y servicios.",
                        "pt": "Criar e gerenciar um mercado ou ecossistema para a troca de bens e serviços."
                    }
                },
                {
                    "id": "018f3e6d-911a-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Trade Transactions",
                        "es": "Transacciones Comerciales",
                        "pt": "Transações Comerciais"
                    },
                    "created": 1714699397798,
                    "deleted": false,
                    "domainId": "018f3c0c-f48b-707c-8fe0-faf8d1bf28d2",
                    "keywords": {
                        "en": "Transactions, Trade, Exchange",
                        "es": "Transacciones, Comercio, Intercambio",
                        "pt": "Transações, Comércio, Troca"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Market Transactions",
                        "es": "Transacciones de Mercado",
                        "pt": "Transações de Mercado"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Facilitating transactions to ensure smooth trade and exchange of goods and services.",
                        "es": "Facilitar transacciones para asegurar el comercio fluido y el intercambio de bienes y servicios.",
                        "pt": "Facilitar transações para garantir comércio e troca suaves de bens e serviços."
                    }
                },
                {
                    "id": "018f3e6d-a22c-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Supply Chain",
                        "es": "Cadena de Suministro",
                        "pt": "Cadeia de Suprimentos"
                    },
                    "created": 1714699397799,
                    "deleted": false,
                    "domainId": "018f3c0c-f48b-707c-8fe0-faf8d1bf28d2",
                    "keywords": {
                        "en": "Supply Chain, Logistics, Management",
                        "es": "Cadena de Suministro, Logística, Gestión",
                        "pt": "Cadeia de Suprimentos, Logística, Gestão"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Market Transactions",
                        "es": "Transacciones de Mercado",
                        "pt": "Transações de Mercado"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Managing supply chain logistics to ensure efficient flow of goods and services.",
                        "es": "Gestionar la logística de la cadena de suministro para asegurar el flujo eficiente de bienes y servicios.",
                        "pt": "Gerenciar a logística da cadeia de suprimentos para garantir o fluxo eficiente de bens e serviços."
                    }
                },
                {
                    "id": "018f3e6d-b33e-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Product & Service Distribution",
                        "es": "Distribución de Productos y Servicios",
                        "pt": "Distribuição de Produtos e Serviços"
                    },
                    "created": 1714699397800,
                    "deleted": false,
                    "domainId": "018f3c0c-f48b-707c-8fe0-faf8d1bf28d2",
                    "keywords": {
                        "en": "Distribution, Delivery, Logistics",
                        "es": "Distribución, Entrega, Logística",
                        "pt": "Distribuição, Entrega, Logística"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Market Transactions",
                        "es": "Transacciones de Mercado",
                        "pt": "Transações de Mercado"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Ensuring efficient distribution of products and services to meet customer demands.",
                        "es": "Asegurar la distribución eficiente de productos y servicios para satisfacer las demandas de los clientes.",
                        "pt": "Garantir a distribuição eficiente de produtos e serviços para atender às demandas dos clientes."
                    }
                },
                {
                    "id": "018f3e6d-c450-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Sales",
                        "es": "Ventas",
                        "pt": "Vendas"
                    },
                    "created": 1714699397801,
                    "deleted": false,
                    "domainId": "018f3c0c-f48b-707c-8fe0-faf8d1bf28d2",
                    "keywords": {
                        "en": "Sales, Selling, Revenue",
                        "es": "Ventas, Vender, Ingresos",
                        "pt": "Vendas, Vender, Receita"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Market Transactions",
                        "es": "Transacciones de Mercado",
                        "pt": "Transações de Mercado"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Driving sales to generate revenue and achieve organizational goals.",
                        "es": "Impulsar las ventas para generar ingresos y alcanzar los objetivos organizacionales.",
                        "pt": "Impulsionar as vendas para gerar receita e alcançar os objetivos organizacionais."
                    }
                },
                {
                    "id": "018f3e6d-d562-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Product & Service Marketing",
                        "es": "Marketing de Productos y Servicios",
                        "pt": "Marketing de Produtos e Serviços"
                    },
                    "created": 1714699397802,
                    "deleted": false,
                    "domainId": "018f3c0c-f48b-707c-8fe0-faf8d1bf28d2",
                    "keywords": {
                        "en": "Marketing, Promotion, Advertising",
                        "es": "Marketing, Promoción, Publicidad",
                        "pt": "Marketing, Promoção, Publicidade"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Market Transactions",
                        "es": "Transacciones de Mercado",
                        "pt": "Transações de Mercado"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Marketing products and services to attract customers and increase sales.",
                        "es": "Comercializar productos y servicios para atraer clientes e incrementar las ventas.",
                        "pt": "Comercializar produtos e serviços para atrair clientes e aumentar as vendas."
                    }
                },
                {
                    "id": "018f3e6d-e674-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Customer Service",
                        "es": "Servicio al Cliente",
                        "pt": "Serviço ao Cliente"
                    },
                    "created": 1714699397803,
                    "deleted": false,
                    "domainId": "018f3c0c-f48b-707c-8fe0-faf8d1bf28d2",
                    "keywords": {
                        "en": "Customer Service, Support, Help",
                        "es": "Servicio al Cliente, Soporte, Ayuda",
                        "pt": "Serviço ao Cliente, Suporte, Ajuda"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Market Transactions",
                        "es": "Transacciones de Mercado",
                        "pt": "Transações de Mercado"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Providing customer service and support to ensure satisfaction and loyalty.",
                        "es": "Proporcionar servicio y soporte al cliente para asegurar la satisfacción y la lealtad.",
                        "pt": "Fornecer serviço e suporte ao cliente para garantir satisfação e lealdade."
                    }
                },
                {
                    "id": "018f3e6d-f786-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Customer Feedback",
                        "es": "Retroalimentación de Clientes",
                        "pt": "Feedback dos Clientes"
                    },
                    "created": 1714699397804,
                    "deleted": false,
                    "domainId": "018f3c0c-f48b-707c-8fe0-faf8d1bf28d2",
                    "keywords": {
                        "en": "Feedback, Input, Suggestions",
                        "es": "Retroalimentación, Opiniones, Sugerencias",
                        "pt": "Feedback, Opiniões, Sugestões"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Market Transactions",
                        "es": "Transacciones de Mercado",
                        "pt": "Transações de Mercado"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Collecting and acting on customer feedback to improve products and services.",
                        "es": "Recopilar y actuar sobre la retroalimentación de los clientes para mejorar los productos y servicios.",
                        "pt": "Coletar e agir sobre o feedback dos clientes para melhorar produtos e serviços."
                    }
                },
                {
                    "id": "018f3e6d-3cc0-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Networking",
                        "es": "Redes de Contacto",
                        "pt": "Networking"
                    },
                    "created": 1714699558386,
                    "deleted": false,
                    "domainId": "018f3c0f-6c10-7905-8c49-e807f2fdaf25",
                    "keywords": {
                        "en": "Networking, Professional Relationships, Connections",
                        "es": "Redes de Contacto, Relaciones Profesionales, Conexiones",
                        "pt": "Networking, Relacionamentos Profissionais, Conexões"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Professional Networks",
                        "es": "Redes Profesionales",
                        "pt": "Redes Profissionais"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Building and leveraging professional networks to enhance career opportunities and knowledge exchange.",
                        "es": "Construir y aprovechar redes profesionales para mejorar las oportunidades de carrera y el intercambio de conocimientos.",
                        "pt": "Construir e aproveitar redes profissionais para melhorar as oportunidades de carreira e a troca de conhecimento."
                    }
                },
                {
                    "id": "018f3e6d-4dd2-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Mentorship",
                        "es": "Mentoría",
                        "pt": "Mentoria"
                    },
                    "created": 1714699558387,
                    "deleted": false,
                    "domainId": "018f3c0f-6c10-7905-8c49-e807f2fdaf25",
                    "keywords": {
                        "en": "Mentorship, Guidance, Advisors",
                        "es": "Mentoría, Orientación, Asesores",
                        "pt": "Mentoria, Orientação, Conselheiros"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Professional Networks",
                        "es": "Redes Profesionales",
                        "pt": "Redes Profissionais"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Establishing mentorship programs to provide guidance and support for professional growth.",
                        "es": "Establecer programas de mentoría para proporcionar orientación y apoyo para el crecimiento profesional.",
                        "pt": "Estabelecer programas de mentoria para fornecer orientação e suporte para o crescimento profissional."
                    }
                },
                {
                    "id": "018f3e6d-5ee4-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Professional Development",
                        "es": "Desarrollo Profesional",
                        "pt": "Desenvolvimento Profissional"
                    },
                    "created": 1714699558388,
                    "deleted": false,
                    "domainId": "018f3c0f-6c10-7905-8c49-e807f2fdaf25",
                    "keywords": {
                        "en": "Professional Development, Training, Skills",
                        "es": "Desarrollo Profesional, Capacitación, Habilidades",
                        "pt": "Desenvolvimento Profissional, Treinamento, Habilidades"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Professional Networks",
                        "es": "Redes Profesionales",
                        "pt": "Redes Profissionais"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Providing opportunities for professional development to enhance skills and career advancement.",
                        "es": "Proporcionar oportunidades para el desarrollo profesional para mejorar las habilidades y el avance profesional.",
                        "pt": "Proporcionar oportunidades de desenvolvimento profissional para aprimorar habilidades e avanço na carreira."
                    }
                },
                {
                    "id": "018f3e6d-6ff6-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Community Building",
                        "es": "Construcción de Comunidad",
                        "pt": "Construção de Comunidade"
                    },
                    "created": 1714699558389,
                    "deleted": false,
                    "domainId": "018f3c0f-6c10-7905-8c49-e807f2fdaf25",
                    "keywords": {
                        "en": "Community Building, Networking, Relationships",
                        "es": "Construcción de Comunidad, Redes, Relaciones",
                        "pt": "Construção de Comunidade, Networking, Relacionamentos"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Professional Networks",
                        "es": "Redes Profesionales",
                        "pt": "Redes Profissionais"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Fostering community building within professional networks to enhance support and collaboration.",
                        "es": "Fomentar la construcción de comunidad dentro de las redes profesionales para mejorar el apoyo y la colaboración.",
                        "pt": "Fomentar a construção de comunidade dentro das redes profissionais para melhorar o suporte e a colaboração."
                    }
                },
                {
                    "id": "018f3e6d-8008-4c28-ae9d-bd1a72ec1f59",
                    "name": {
                        "en": "Industry Standards",
                        "es": "Estándares de la Industria",
                        "pt": "Padrões da Indústria"
                    },
                    "created": 1714699558390,
                    "deleted": false,
                    "domainId": "018f3c0f-6c10-7905-8c49-e807f2fdaf25",
                    "keywords": {
                        "en": "Industry Standards, Best Practices, Guidelines",
                        "es": "Estándares de la Industria, Mejores Prácticas, Directrices",
                        "pt": "Padrões da Indústria, Melhores Práticas, Diretrizes"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Professional Networks",
                        "es": "Redes Profesionales",
                        "pt": "Redes Profissionais"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Establishing and adhering to industry standards and best practices to ensure quality and consistency.",
                        "es": "Establecer y adherirse a los estándares de la industria y las mejores prácticas para asegurar la calidad y la consistencia.",
                        "pt": "Estabelecer e aderir aos padrões da indústria e melhores práticas para garantir qualidade e consistência."
                    }
                },
                {
                    "id": "018f3e6d-2a9d-4c28-ae9d-bd1a72ec1f60",
                    "name": {
                        "en": "Job Title and Description",
                        "es": "Título y Descripción de Trabajo",
                        "pt": "Título e Descrição de Trabalho"
                    },
                    "created": 1714690657715,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Title, Job, Description",
                        "es": "Título, Trabajo, Descripción",
                        "pt": "Título, Trabalho, Descrição"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Defining job titles and descriptions to ensure clarity in responsibilities and duties.",
                        "es": "Definir títulos y descripciones de trabajo para asegurar claridad en responsabilidades y deberes.",
                        "pt": "Definir títulos e descrições de trabalho para garantir clareza nas responsabilidades e deveres."
                    }
                },
                {
                    "id": "018f3e6d-2a9d-4c28-ae9d-bd1a72ec1f61",
                    "name": {
                        "en": "Compensation and Benefits",
                        "es": "Compensación y Beneficios",
                        "pt": "Compensação e Benefícios"
                    },
                    "created": 1714690657715,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Compensation, Benefits, Salary",
                        "es": "Compensación, Beneficios, Salario",
                        "pt": "Compensação, Benefícios, Salário"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Defining compensation and benefits to ensure fair and equitable rewards for employees.",
                        "es": "Definir compensación y beneficios para asegurar recompensas justas y equitativas para los empleados.",
                        "pt": "Definir compensação e benefícios para garantir recompensas justas e equitativas para os funcionários."
                    }
                },
                {
                    "id": "018f3e6d-2a9d-4c28-ae9d-bd1a72ec1f62",
                    "name": {
                        "en": "Work Schedule and Hours",
                        "es": "Horario de Trabajo y Horas",
                        "pt": "Horário de Trabalho e Horas"
                    },
                    "created": 1714690657715,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Schedule, Hours, Work",
                        "es": "Horario, Horas, Trabajo",
                        "pt": "Horário, Horas, Trabalho"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Defining work schedules and hours to ensure clear expectations and compliance with labor laws.",
                        "es": "Definir horarios de trabajo y horas para asegurar expectativas claras y cumplimiento con las leyes laborales.",
                        "pt": "Definir horários de trabalho e horas para garantir expectativas claras e conformidade com as leis trabalhistas."
                    }
                },
                {
                    "id": "018f3e6d-2a9d-4c28-ae9d-bd1a72ec1f63",
                    "name": {
                        "en": "Duties and Responsibilities",
                        "es": "Deberes y Responsabilidades",
                        "pt": "Deveres e Responsabilidades"
                    },
                    "created": 1714690657715,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Duties, Responsibilities, Tasks",
                        "es": "Deberes, Responsabilidades, Tareas",
                        "pt": "Deveres, Responsabilidades, Tarefas"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Defining duties and responsibilities to ensure clarity in roles and accountability.",
                        "es": "Definir deberes y responsabilidades para asegurar claridad en roles y responsabilidad.",
                        "pt": "Definir deveres e responsabilidades para garantir clareza nas funções e responsabilidade."
                    }
                },
                {
                    "id": "018f3e6d-2a9d-4c28-ae9d-bd1a72ec1f64",
                    "name": {
                        "en": "Performance Expectations",
                        "es": "Expectativas de Desempeño",
                        "pt": "Expectativas de Desempenho"
                    },
                    "created": 1714690657715,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Performance, Expectations, Standards",
                        "es": "Desempeño, Expectativas, Estándares",
                        "pt": "Desempenho, Expectativas, Padrões"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Defining performance expectations to ensure employees understand the standards they need to meet.",
                        "es": "Definir expectativas de desempeño para asegurar que los empleados comprendan los estándares que deben cumplir.",
                        "pt": "Definir expectativas de desempenho para garantir que os funcionários compreendam os padrões que precisam atender."
                    }
                },
                {
                    "id": "018f3e6d-2a9d-4c28-ae9d-bd1a72ec1f65",
                    "name": {
                        "en": "Probationary Period",
                        "es": "Período de Prueba",
                        "pt": "Período Probatório"
                    },
                    "created": 1714690657715,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Probationary, Period, Assessment",
                        "es": "Período, Prueba, Evaluación",
                        "pt": "Período, Probatório, Avaliação"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Defining the probationary period to ensure fair assessment of new employees.",
                        "es": "Definir el período de prueba para asegurar una evaluación justa de los nuevos empleados.",
                        "pt": "Definir o período probatório para garantir uma avaliação justa dos novos funcionários."
                    }
                },
                {
                    "id": "018f3e6d-2a9d-4c28-ae9d-bd1a72ec1f66",
                    "name": {
                        "en": "Confidentiality and Non-Disclosure",
                        "es": "Confidencialidad y No Divulgación",
                        "pt": "Confidencialidade e Não Divulgação"
                    },
                    "created": 1714690657715,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Confidentiality, Non-Disclosure, Information",
                        "es": "Confidencialidad, No Divulgación, Información",
                        "pt": "Confidencialidade, Não Divulgação, Informação"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Ensuring confidentiality and non-disclosure of information to protect sensitive and proprietary information.",
                        "es": "Garantizar la confidencialidad y la no divulgación de información para proteger información sensible y propietaria.",
                        "pt": "Garantir a confidencialidade e a não divulgação de informações para proteger informações sensíveis e proprietárias."
                    }
                },
                {
                    "id": "018f3e6d-2a9d-4c28-ae9d-bd1a72ec1f67",
                    "name": {
                        "en": "Non-Compete Clauses",
                        "es": "Cláusulas de No Competencia",
                        "pt": "Cláusulas de Não Concorrência"
                    },
                    "created": 1714690657715,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Non-Compete, Clauses, Agreement",
                        "es": "No Competencia, Cláusulas, Acuerdo",
                        "pt": "Não Concorrência, Cláusulas, Acordo"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Establishing non-compete clauses to protect the organization's business interests.",
                        "es": "Establecer cláusulas de no competencia para proteger los intereses comerciales de la organización.",
                        "pt": "Estabelecer cláusulas de não concorrência para proteger os interesses comerciais da organização."
                    }
                },
                {
                    "id": "018f3e6d-2a9d-4c28-ae9d-bd1a72ec1f68",
                    "name": {
                        "en": "Leave Policies",
                        "es": "Políticas de Licencia",
                        "pt": "Políticas de Licença"
                    },
                    "created": 1714690657715,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Leave, Policies, Vacation",
                        "es": "Licencia, Políticas, Vacaciones",
                        "pt": "Licença, Políticas, Férias"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Establishing leave policies to ensure employees understand their leave options.",
                        "es": "Establecer políticas de licencia para asegurar que los empleados comprendan sus opciones de licencia.",
                        "pt": "Estabelecer políticas de licença para garantir que os funcionários compreendam suas opções de licença."
                    }
                },
                {
                    "id": "018f3e6d-2a9d-4c28-ae9d-bd1a72ec1f69",
                    "name": {
                        "en": "Termination Conditions",
                        "es": "Condiciones de Terminación",
                        "pt": "Condições de Rescisão"
                    },
                    "created": 1714690657715,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Termination, Conditions, Employment",
                        "es": "Terminación, Condiciones, Empleo",
                        "pt": "Rescisão, Condições, Emprego"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Defining termination conditions to ensure clear and fair processes.",
                        "es": "Definir condiciones de terminación para asegurar procesos claros y justos.",
                        "pt": "Definir condições de rescisão para garantir processos claros e justos."
                    }
                },
                {
                    "id": "018f3e6d-2a9d-4c28-ae9d-bd1a72ec1f70",
                    "name": {
                        "en": "Dispute Resolution",
                        "es": "Resolución de Disputas",
                        "pt": "Resolução de Disputas"
                    },
                    "created": 1714690657715,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Dispute, Resolution, Conflict",
                        "es": "Disputa, Resolución, Conflicto",
                        "pt": "Disputa, Resolução, Conflito"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Establishing procedures for resolving disputes to ensure fairness and efficiency.",
                        "es": "Establecer procedimientos para resolver disputas para asegurar justicia y eficiencia.",
                        "pt": "Estabelecer procedimentos para resolver disputas para garantir justiça e eficiência."
                    }
                },
                {
                    "id": "018f3e6d-2a9d-4c28-ae9d-bd1a72ec1f71",
                    "name": {
                        "en": "Amendment Procedures",
                        "es": "Procedimientos de Enmienda",
                        "pt": "Procedimentos de Emenda"
                    },
                    "created": 1714690657715,
                    "deleted": false,
                    "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                    "keywords": {
                        "en": "Amendment, Procedures, Policy",
                        "es": "Enmienda, Procedimientos, Política",
                        "pt": "Emenda, Procedimentos, Política"
                    },
                    "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                    "isNeed": true,
                    "domainName": {
                        "en": "Organization",
                        "es": "Organización",
                        "pt": "Organização"
                    },
                    "sectorName": {
                        "en": "Economic & Organizational",
                        "es": "Económico y Organizacional",
                        "pt": "Econômico e Organizacional"
                    },
                    "description": {
                        "en": "Establishing procedures for amending documents and policies to ensure proper documentation and communication.",
                        "es": "Establecer procedimientos para enmendar documentos y políticas para asegurar una adecuada documentación y comunicación.",
                        "pt": "Estabelecer procedimentos para emendar documentos e políticas para garantir a devida documentação e comunicação."
                    }
                }
            ]
        }
        db.protocols = p
        // console.log("full db", db)
        db.guideNeeds = getGuideNeeds()
        db.guides = getGuides()
        return db
    })
}

export function getGuideNeeds() {
    
    const guideNeeds = [
        {
            "id": "018f3e6d-0888-4c28-ae9d-bd1a72ec1f60",
            "name": {
                "en": "Employment Terms",
                "es": "Términos de Empleo",
                "pt": "Termos de Emprego"
            },
            "prompt": {
                "en": "",
                "es": "",
                "pt": ""
            },
            "created": 1714690657715,
            "deleted": false,
            "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57e",
            "keywords": {
                "en": "Employment, Contract, Job",
                "es": "Empleo, Contrato, Trabajo",
                "pt": "Emprego, Contrato, Trabalho"
            },
            "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
            "isNeed": true,
            "domainName": {
                "en": "Organization",
                "es": "Organización",
                "pt": "Organização"
            },
            "sectorName": {
                "en": "Economic & Organizational",
                "es": "Económico y Organizacional",
                "pt": "Econômico e Organizacional"
            },
            "description": {
                "en": "Establishing the terms and conditions of employment including roles, responsibilities, and compensation.",
                "es": "Establecer los términos y condiciones de empleo, incluidos roles, responsabilidades y compensación.",
                "pt": "Estabelecendo os termos e condições de emprego, incluindo funções, responsabilidades e remuneração."
            }
        },
        {
            "id": "018f3e6d-0888-4c28-ae9d-bd1a72ec1f61",
            "name": {
                "en": "Confidentiality Protection",
                "es": "Protección de Confidencialidad",
                "pt": "Proteção de Confidencialidade"
            },
            "prompt": {
                "en": "",
                "es": "",
                "pt": ""
            },
            "created": 1714690657715,
            "deleted": false,
            "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57e",
            "keywords": {
                "en": "Confidentiality, NDA, Privacy",
                "es": "Confidencialidad, NDA, Privacidad",
                "pt": "Confidencialidade, NDA, Privacidade"
            },
            "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
            "isNeed": true,
            "domainName": {
                "en": "Organization",
                "es": "Organización",
                "pt": "Organização"
            },
            "sectorName": {
                "en": "Economic & Organizational",
                "es": "Económico y Organizacional",
                "pt": "Econômico e Organizacional"
            },
            "description": {
                "en": "Ensuring the protection of sensitive and confidential information between parties.",
                "es": "Asegurar la protección de información sensible y confidencial entre las partes.",
                "pt": "Garantindo a proteção de informações sensíveis e confidenciais entre as partes."
            }
        },
        {
            "id": "018f3e6d-0888-4c28-ae9d-bd1a72ec1f62",
            "name": {
                "en": "Service Provision Terms",
                "es": "Términos de Prestación de Servicios",
                "pt": "Termos de Prestação de Serviços"
            },
            "prompt": {
                "en": "",
                "es": "",
                "pt": ""
            },
            "created": 1714690657715,
            "deleted": false,
            "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57e",
            "keywords": {
                "en": "Service, Agreement, Terms",
                "es": "Servicio, Acuerdo, Términos",
                "pt": "Serviço, Acordo, Termos"
            },
            "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
            "isNeed": true,
            "domainName": {
                "en": "Organization",
                "es": "Organización",
                "pt": "Organização"
            },
            "sectorName": {
                "en": "Economic & Organizational",
                "es": "Económico y Organizacional",
                "pt": "Econômico e Organizacional"
            },
            "description": {
                "en": "Defining the terms under which services will be provided, including scope and performance standards.",
                "es": "Definir los términos bajo los cuales se proporcionarán servicios, incluyendo el alcance y estándares de desempeño.",
                "pt": "Definir os termos sob os quais os serviços serão fornecidos, incluindo escopo e padrões de desempenho."
            }
        },
        {
            "id": "018f3e6d-0888-4c28-ae9d-bd1a72ec1f63",
            "name": {
                "en": "Partnership Terms",
                "es": "Términos de Asociación",
                "pt": "Termos de Parceria"
            },
            "prompt": {
                "en": "",
                "es": "",
                "pt": ""
            },
            "created": 1714690657715,
            "deleted": false,
            "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57e",
            "keywords": {
                "en": "Partnership, Agreement, Collaboration",
                "es": "Asociación, Acuerdo, Colaboración",
                "pt": "Parceria, Acordo, Colaboração"
            },
            "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
            "isNeed": true,
            "domainName": {
                "en": "Organization",
                "es": "Organización",
                "pt": "Organização"
            },
            "sectorName": {
                "en": "Economic & Organizational",
                "es": "Económico y Organizacional",
                "pt": "Econômico e Organizacional"
            },
            "description": {
                "en": "Outlining the roles, responsibilities, and profit-sharing arrangements between business partners.",
                "es": "Describir los roles, responsabilidades y acuerdos de reparto de ganancias entre socios comerciales.",
                "pt": "Descrever os papéis, responsabilidades e acordos de divisão de lucros entre parceiros comerciais."
            }
        },
        {
            "id": "018f3e6d-0888-4c28-ae9d-bd1a72ec1f64",
            "name": {
                "en": "Supply Terms",
                "es": "Términos de Suministro",
                "pt": "Termos de Fornecimento"
            },
            "prompt": {
                "en": "",
                "es": "",
                "pt": ""
            },
            "created": 1714690657715,
            "deleted": false,
            "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57e",
            "keywords": {
                "en": "Supply, Vendor, Agreement",
                "es": "Suministro, Proveedor, Acuerdo",
                "pt": "Fornecimento, Fornecedor, Acordo"
            },
            "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
            "isNeed": true,
            "domainName": {
                "en": "Organization",
                "es": "Organización",
                "pt": "Organização"
            },
            "sectorName": {
                "en": "Economic & Organizational",
                "es": "Económico y Organizacional",
                "pt": "Econômico e Organizacional"
            },
            "description": {
                "en": "Specifying the terms for the supply of goods or services from vendors or suppliers.",
                "es": "Especificar los términos para el suministro de bienes o servicios de proveedores.",
                "pt": "Especificar os termos para o fornecimento de bens ou serviços de fornecedores."
            }
        },
        {
            "id": "018f3e6d-0888-4c28-ae9d-bd1a72ec1f65",
            "name": {
                "en": "Consulting Terms",
                "es": "Términos de Consultoría",
                "pt": "Termos de Consultoria"
            },
            "prompt": {
                "en": "",
                "es": "",
                "pt": ""
            },
            "created": 1714690657715,
            "deleted": false,
            "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57e",
            "keywords": {
                "en": "Consulting, Agreement, Services",
                "es": "Consultoría, Acuerdo, Servicios",
                "pt": "Consultoria, Acordo, Serviços"
            },
            "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
            "isNeed": true,
            "domainName": {
                "en": "Organization",
                "es": "Organización",
                "pt": "Organização"
            },
            "sectorName": {
                "en": "Economic & Organizational",
                "es": "Económico y Organizacional",
                "pt": "Econômico e Organizacional"
            },
            "description": {
                "en": "Defining the scope of work, compensation, and expectations for consulting services.",
                "es": "Definir el alcance del trabajo, la compensación y las expectativas para los servicios de consultoría.",
                "pt": "Definir o escopo do trabalho, a compensação e as expectativas para os serviços de consultoria."
            }
        },
        {
            "id": "018f3e6d-0888-4c28-ae9d-bd1a72ec1f66",
            "name": {
                "en": "Licensing Terms",
                "es": "Términos de Licencia",
                "pt": "Termos de Licenciamento"
            },
            "prompt": {
                "en": "",
                "es": "",
                "pt": ""
            },
            "created": 1714690657715,
            "deleted": false,
            "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57e",
            "keywords": {
                "en": "Licensing, Agreement, Intellectual Property",
                "es": "Licencia, Acuerdo, Propiedad Intelectual",
                "pt": "Licenciamento, Acordo, Propriedade Intelectual"
            },
            "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
            "isNeed": true,
            "domainName": {
                "en": "Organization",
                "es": "Organización",
                "pt": "Organização"
            },
            "sectorName": {
                "en": "Economic & Organizational",
                "es": "Económico y Organizacional",
                "pt": "Econômico e Organizacional"
            },
            "description": {
                "en": "Allowing one party to use another party's intellectual property under specified conditions.",
                "es": "Permitir que una parte use la propiedad intelectual de otra parte bajo condiciones específicas.",
                "pt": "Permitir que uma parte use a propriedade intelectual de outra parte sob condições específicas."
            }
        },
        {
            "id": "018f3e6d-0888-4c28-ae9d-bd1a72ec1f67",
            "name": {
                "en": "Franchise Terms",
                "es": "Términos de Franquicia",
                "pt": "Termos de Franquia"
            },
            "prompt": {
                "en": "",
                "es": "",
                "pt": ""
            },
            "created": 1714690657715,
            "deleted": false,
            "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57e",
            "keywords": {
                "en": "Franchise, Agreement, Terms",
                "es": "Franquicia, Acuerdo, Términos",
                "pt": "Franquia, Acordo, Termos"
            },
            "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
            "isNeed": true,
            "domainName": {
                "en": "Organization",
                "es": "Organización",
                "pt": "Organização"
            },
            "sectorName": {
                "en": "Economic & Organizational",
                "es": "Económico y Organizacional",
                "pt": "Econômico e Organizacional"
            },
            "description": {
                "en": "Outlining the terms under which a franchisee can operate a business using the franchisor's brand and systems.",
                "es": "Describir los términos bajo los cuales un franquiciado puede operar un negocio usando la marca y los sistemas del franquiciante.",
                "pt": "Descrever os termos sob os quais um franqueado pode operar um negócio usando a marca e os sistemas do franqueador."
            }
        },
        {
            "id": "018f3e6d-0888-4c28-ae9d-bd1a72ec1f68",
            "name": {
                "en": "Lease Terms",
                "es": "Términos de Arrendamiento",
                "pt": "Termos de Locação"
            },
            "prompt": {
                "en": "",
                "es": "",
                "pt": ""
            },
            "created": 1714690657715,
            "deleted": false,
            "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57e",
            "keywords": {
                "en": "Lease, Agreement, Terms",
                "es": "Arrendamiento, Acuerdo, Términos",
                "pt": "Locação, Acordo, Termos"
            },
            "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
            "isNeed": true,
            "domainName": {
                "en": "Organization",
                "es": "Organización",
                "pt": "Organização"
            },
            "sectorName": {
                "en": "Economic & Organizational",
                "es": "Económico y Organizacional",
                "pt": "Econômico e Organizacional"
            },
            "description": {
                "en": "Detailing the terms for renting property or equipment, including duration and maintenance responsibilities.",
                "es": "Describir los términos para alquilar propiedades o equipos, incluyendo la duración y responsabilidades de mantenimiento.",
                "pt": "Detalhar os termos para alugar propriedades ou equipamentos, incluindo duração e responsabilidades de manutenção."
            }
        },
        {
            "id": "018f3e6d-0888-4c28-ae9d-bd1a72ec1f69",
            "name": {
                "en": "Joint Venture Terms",
                "es": "Términos de Empresa Conjunta",
                "pt": "Termos de Joint Venture"
            },
            "prompt": {
                "en": "",
                "es": "",
                "pt": ""
            },
            "created": 1714690657715,
            "deleted": false,
            "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57e",
            "keywords": {
                "en": "Joint Venture, Agreement, Collaboration",
                "es": "Empresa Conjunta, Acuerdo, Colaboración",
                "pt": "Joint Venture, Acordo, Colaboração"
            },
            "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
            "isNeed": true,
            "domainName": {
                "en": "Organization",
                "es": "Organización",
                "pt": "Organização"
            },
            "sectorName": {
                "en": "Economic & Organizational",
                "es": "Económico y Organizacional",
                "pt": "Econômico e Organizacional"
            },
            "description": {
                "en": "Establishing the terms of collaboration between parties for a specific business project.",
                "es": "Establecer los términos de colaboración entre las partes para un proyecto empresarial específico.",
                "pt": "Estabelecer os termos de colaboração entre as partes para um projeto empresarial específico."
            }
        },
        {
            "id": "018f3e6d-0888-4c28-ae9d-bd1a72ec1f70",
            "name": {
                "en": "Sales Terms",
                "es": "Términos de Venta",
                "pt": "Termos de Venda"
            },
            "prompt": {
                "en": "",
                "es": "",
                "pt": ""
            },
            "created": 1714690657715,
            "deleted": false,
            "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57e",
            "keywords": {
                "en": "Sales, Agreement, Terms",
                "es": "Ventas, Acuerdo, Términos",
                "pt": "Vendas, Acordo, Termos"
            },
            "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
            "isNeed": true,
            "domainName": {
                "en": "Organization",
                "es": "Organización",
                "pt": "Organização"
            },
            "sectorName": {
                "en": "Economic & Organizational",
                "es": "Económico y Organizacional",
                "pt": "Econômico e Organizacional"
            },
            "description": {
                "en": "Specifying the terms of sale of goods or services, including price and delivery conditions.",
                "es": "Especificar los términos de venta de bienes o servicios, incluyendo precio y condiciones de entrega.",
                "pt": "Especificar os termos de venda de bens ou serviços, incluindo preço e condições de entrega."
            }
        },
        {
            "id": "018f3e6d-0888-4c28-ae9d-bd1a72ec1f71",
            "name": {
                "en": "Shareholder Terms",
                "es": "Términos de Accionistas",
                "pt": "Termos de Acionistas"
            },
            "prompt": {
                "en": "",
                "es": "",
                "pt": ""
            },
            "created": 1714690657715,
            "deleted": false,
            "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57e",
            "keywords": {
                "en": "Shareholder, Agreement, Terms",
                "es": "Accionistas, Acuerdo, Términos",
                "pt": "Acionistas, Acordo, Termos"
            },
            "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
            "isNeed": true,
            "domainName": {
                "en": "Organization",
                "es": "Organización",
                "pt": "Organização"
            },
            "sectorName": {
                "en": "Economic & Organizational",
                "es": "Económico y Organizacional",
                "pt": "Econômico e Organizacional"
            },
            "description": {
                "en": "Defining the rights and obligations of shareholders, including voting and dividend policies.",
                "es": "Definir los derechos y obligaciones de los accionistas, incluyendo políticas de votación y dividendos.",
                "pt": "Definir os direitos e obrigações dos acionistas, incluindo políticas de votação e dividendos."
            }
        },
        {
            "id": "018f3e6d-0888-4c28-ae9d-bd1a72ec1f72",
            "name": {
                "en": "Understanding Terms",
                "es": "Términos de Entendimiento",
                "pt": "Termos de Entendimento"
            },
            "prompt": {
                "en": "",
                "es": "",
                "pt": ""
            },
            "created": 1714690657715,
            "deleted": false,
            "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57e",
            "keywords": {
                "en": "MOU, Agreement, Collaboration",
                "es": "MOU, Acuerdo, Colaboración",
                "pt": "MOU, Acordo, Colaboração"
            },
            "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
            "isNeed": true,
            "domainName": {
                "en": "Organization",
                "es": "Organización",
                "pt": "Organização"
            },
            "sectorName": {
                "en": "Economic & Organizational",
                "es": "Económico y Organizacional",
                "pt": "Econômico e Organizacional"
            },
            "description": {
                "en": "Outlining the intentions of parties to collaborate or form a partnership.",
                "es": "Describir las intenciones de las partes para colaborar o formar una asociación.",
                "pt": "Descrever as intenções das partes de colaborar ou formar uma parceria."
            }
        },
        {
            "id": "018f3e6d-0888-4c28-ae9d-bd1a72ec1f73",
            "name": {
                "en": "Loan Terms",
                "es": "Términos de Préstamo",
                "pt": "Termos de Empréstimo"
            },
            "prompt": {
                "en": "",
                "es": "",
                "pt": ""
            },
            "created": 1714690657715,
            "deleted": false,
            "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57e",
            "keywords": {
                "en": "Loan, Agreement, Terms",
                "es": "Préstamo, Acuerdo, Términos",
                "pt": "Empréstimo, Acordo, Termos"
            },
            "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
            "isNeed": true,
            "domainName": {
                "en": "Organization",
                "es": "Organización",
                "pt": "Organização"
            },
            "sectorName": {
                "en": "Economic & Organizational",
                "es": "Económico y Organizacional",
                "pt": "Econômico e Organizacional"
            },
            "description": {
                "en": "Detailing the terms under which one party lends money to another, including repayment conditions.",
                "es": "Describir los términos bajo los cuales una parte presta dinero a otra, incluyendo condiciones de reembolso.",
                "pt": "Detalhar os termos sob os quais uma parte empresta dinheiro a outra, incluindo condições de reembolso."
            }
        },
        {
            "id": "018f3e6d-0888-4c28-ae9d-bd1a72ec1f74",
            "name": {
                "en": "Settlement Terms",
                "es": "Términos de Liquidación",
                "pt": "Termos de Liquidação"
            },
            "prompt": {
                "en": "",
                "es": "",
                "pt": ""
            },
            "created": 1714690657715,
            "deleted": false,
            "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57e",
            "keywords": {
                "en": "Settlement, Agreement, Terms",
                "es": "Liquidación, Acuerdo, Términos",
                "pt": "Liquidação, Acordo, Termos"
            },
            "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
            "isNeed": true,
            "domainName": {
                "en": "Organization",
                "es": "Organización",
                "pt": "Organização"
            },
            "sectorName": {
                "en": "Economic & Organizational",
                "es": "Económico y Organizacional",
                "pt": "Econômico e Organizacional"
            },
            "description": {
                "en": "Resolving disputes between parties and outlining the terms of settlement.",
                "es": "Resolver disputas entre las partes y describir los términos de liquidación.",
                "pt": "Resolver disputas entre as partes e detalhar os termos de liquidação."
            }
        }
    ]
    return guideNeeds
}

export function getGuides() {
    
    const guides = [
        {
            "header": {
                "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82a0",
                "versionId": "v1",
                "description": {
                    "en": "Protocol for defining the employment agreement in a traditional hierarchical organization.",
                    "es": "Protocolo para definir el acuerdo de empleo en una organización jerárquica tradicional.",
                    "pt": "Protocolo para definir o acordo de emprego em uma organização hierárquica tradicional."
                },
                "version": "1.0",
                "domainName": {
                    "en": "Organization",
                    "es": "Organización",
                    "pt": "Organização"
                },
                "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                "sectorName": {
                    "en": "Economic & Organizational",
                    "es": "Económico y Organizacional",
                    "pt": "Econômico e Organizacional"
                },
                "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                "needName": {
                    "en": "Employment Agreement",
                    "es": "Acuerdo de Empleo",
                    "pt": "Acordo de Emprego"
                },
                "needId": "018f3e6d-2a9d-4c28-ae9d-bd1a72ec1f75"
            },
            "history": [
                {
                    "date": "2024-06-21",
                    "description": {
                        "en": "Creation of the employment agreement protocol.",
                        "es": "Creación del protocolo de acuerdo de empleo.",
                        "pt": "Criação do protocolo de acordo de emprego."
                    },
                    "version": {
                        "number": "1.0",
                        "description": {
                            "en": "Initial version.",
                            "es": "Versión inicial.",
                            "pt": "Versão inicial."
                        }
                    },
                    "author": "Jose Leal",
                    "contactInfo": "jleal67@gmail.com"
                }
            ],
            "content": {
                "title": {
                    "en": "Employment Agreement Protocol",
                    "es": "Protocolo de Acuerdo de Empleo",
                    "pt": "Protocolo de Acordo de Emprego"
                },
                "intro": {
                    "en": "This protocol outlines the procedures and clauses necessary to establish an employment agreement in a traditional hierarchical organization.",
                    "es": "Este protocolo describe los procedimientos y cláusulas necesarias para establecer un acuerdo de empleo en una organización jerárquica tradicional.",
                    "pt": "Este protocolo descreve os procedimentos e cláusulas necessárias para estabelecer um acordo de emprego em uma organização hierárquica tradicional."
                },
                "elements": [
                    {
                        "title": {
                            "en": "Job Title and Description",
                            "es": "Título y Descripción de Trabajo",
                            "pt": "Título e Descrição de Trabalho"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82a1"
                    },
                    {
                        "title": {
                            "en": "Compensation and Benefits",
                            "es": "Compensación y Beneficios",
                            "pt": "Compensação e Benefícios"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82a2"
                    },
                    {
                        "title": {
                            "en": "Work Schedule and Hours",
                            "es": "Horario de Trabajo y Horas",
                            "pt": "Horário de Trabalho e Horas"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82a3"
                    },
                    {
                        "title": {
                            "en": "Duties and Responsibilities",
                            "es": "Deberes y Responsabilidades",
                            "pt": "Deveres e Responsabilidades"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82a4"
                    },
                    {
                        "title": {
                            "en": "Performance Expectations",
                            "es": "Expectativas de Desempeño",
                            "pt": "Expectativas de Desempenho"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82a5"
                    },
                    {
                        "title": {
                            "en": "Probationary Period",
                            "es": "Período de Prueba",
                            "pt": "Período Probatório"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82a6"
                    },
                    {
                        "title": {
                            "en": "Confidentiality and Non-Disclosure",
                            "es": "Confidencialidad y No Divulgación",
                            "pt": "Confidencialidade e Não Divulgação"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82a7"
                    },
                    {
                        "title": {
                            "en": "Non-Compete Clauses",
                            "es": "Cláusulas de No Competencia",
                            "pt": "Cláusulas de Não Concorrência"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82a8"
                    },
                    {
                        "title": {
                            "en": "Leave Policies",
                            "es": "Políticas de Licencia",
                            "pt": "Políticas de Licença"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82a9"
                    },
                    {
                        "title": {
                            "en": "Termination Conditions",
                            "es": "Condiciones de Terminación",
                            "pt": "Condições de Rescisão"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82b0"
                    },
                    {
                        "title": {
                            "en": "Dispute Resolution",
                            "es": "Resolución de Disputas",
                            "pt": "Resolução de Disputas"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82b1"
                    },
                    {
                        "title": {
                            "en": "Amendment Procedures",
                            "es": "Procedimientos de Enmienda",
                            "pt": "Procedimentos de Emenda"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82b2"
                    }
                ],
                "closing": {
                    "en": "This set of protocols aims to ensure that all parties understand and adhere to the expectations and responsibilities within the organization.",
                    "es": "Este conjunto de protocolos tiene como objetivo asegurar que todas las partes comprendan y cumplan con las expectativas y responsabilidades dentro de la organización.",
                    "pt": "Este conjunto de protocolos visa garantir que todas as partes compreendam e cumpram as expectativas e responsabilidades dentro da organização."
                }
            },
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
        {
            "header": {
                "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82a0",
                "versionId": "v1",
                "description": {
                    "en": "Protocol for defining the employment agreement in a traditional hierarchical organization.",
                    "es": "Protocolo para definir el acuerdo de empleo en una organización jerárquica tradicional.",
                    "pt": "Protocolo para definir o acordo de emprego em uma organização hierárquica tradicional."
                },
                "version": "1.0",
                "domainName": {
                    "en": "Organization",
                    "es": "Organización",
                    "pt": "Organização"
                },
                "domainId": "018f3b8b-e487-7cd2-93af-abb8e10ea57d",
                "sectorName": {
                    "en": "Economic & Organizational",
                    "es": "Económico y Organizacional",
                    "pt": "Econômico e Organizacional"
                },
                "sectorId": "018f2c03-8818-7adb-92e8-1ce0199c5b3e",
                "needName": {
                    "en": "Employment Agreement",
                    "es": "Acuerdo de Empleo",
                    "pt": "Acordo de Emprego"
                },
                "needId": "018f3e6d-2a9d-4c28-ae9d-bd1a72ec1f75"
            },
            "history": [
                {
                    "date": "2024-06-21",
                    "description": {
                        "en": "Creation of the employment agreement protocol.",
                        "es": "Creación del protocolo de acuerdo de empleo.",
                        "pt": "Criação do protocolo de acordo de emprego."
                    },
                    "version": {
                        "number": "1.0",
                        "description": {
                            "en": "Initial version.",
                            "es": "Versión inicial.",
                            "pt": "Versão inicial."
                        }
                    },
                    "author": "Jose Leal",
                    "contactInfo": "jleal67@gmail.com"
                }
            ],
            "content": {
                "title": {
                    "en": "Employment Agreement Protocol",
                    "es": "Protocolo de Acuerdo de Empleo",
                    "pt": "Protocolo de Acordo de Emprego"
                },
                "intro": {
                    "en": "This protocol outlines the procedures and clauses necessary to establish an employment agreement in a traditional hierarchical organization.",
                    "es": "Este protocolo describe los procedimientos y cláusulas necesarias para establecer un acuerdo de empleo en una organización jerárquica tradicional.",
                    "pt": "Este protocolo descreve os procedimentos e cláusulas necessárias para estabelecer um acordo de emprego em uma organização hierárquica tradicional."
                },
                "elements": [
                    {
                        "title": {
                            "en": "Job Title and Description",
                            "es": "Título y Descripción de Trabajo",
                            "pt": "Título e Descrição de Trabalho"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82a1"
                    },
                    {
                        "title": {
                            "en": "Compensation and Benefits",
                            "es": "Compensación y Beneficios",
                            "pt": "Compensação e Benefícios"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82a2"
                    },
                    {
                        "title": {
                            "en": "Work Schedule and Hours",
                            "es": "Horario de Trabajo y Horas",
                            "pt": "Horário de Trabalho e Horas"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82a3"
                    },
                    {
                        "title": {
                            "en": "Duties and Responsibilities",
                            "es": "Deberes y Responsabilidades",
                            "pt": "Deveres e Responsabilidades"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82a4"
                    },
                    {
                        "title": {
                            "en": "Performance Expectations",
                            "es": "Expectativas de Desempeño",
                            "pt": "Expectativas de Desempenho"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82a5"
                    },
                    {
                        "title": {
                            "en": "Probationary Period",
                            "es": "Período de Prueba",
                            "pt": "Período Probatório"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82a6"
                    },
                    {
                        "title": {
                            "en": "Confidentiality and Non-Disclosure",
                            "es": "Confidencialidad y No Divulgación",
                            "pt": "Confidencialidade e Não Divulgação"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82a7"
                    },
                    {
                        "title": {
                            "en": "Non-Compete Clauses",
                            "es": "Cláusulas de No Competencia",
                            "pt": "Cláusulas de Não Concorrência"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82a8"
                    },
                    {
                        "title": {
                            "en": "Leave Policies",
                            "es": "Políticas de Licencia",
                            "pt": "Políticas de Licença"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82a9"
                    },
                    {
                        "title": {
                            "en": "Termination Conditions",
                            "es": "Condiciones de Terminación",
                            "pt": "Condições de Rescisão"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82b0"
                    },
                    {
                        "title": {
                            "en": "Dispute Resolution",
                            "es": "Resolución de Disputas",
                            "pt": "Resolução de Disputas"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82b1"
                    },
                    {
                        "title": {
                            "en": "Amendment Procedures",
                            "es": "Procedimientos de Enmienda",
                            "pt": "Procedimentos de Emenda"
                        },
                        "protocolId": "018g5743-39c2-7f01-h22d-b149a13ws82b2"
                    }
                ],
                "closing": {
                    "en": "This set of protocols aims to ensure that all parties understand and adhere to the expectations and responsibilities within the organization.",
                    "es": "Este conjunto de protocolos tiene como objetivo asegurar que todas las partes comprendan y cumplan con las expectativas y responsabilidades dentro de la organización.",
                    "pt": "Este conjunto de protocolos visa garantir que todas as partes compreendam e cumpram as expectativas e responsabilidades dentro da organização."
                }
            },
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
    ]
    return guides
}