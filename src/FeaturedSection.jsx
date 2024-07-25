import { useState } from 'react';
import { Box } from '@mui/material'
import ViewItemPage from './Studio/ViewPage/ViewItemPage'; 


export default function FeaturedSection(props) {
    const { handleSwitchPublicPage } = props

    const featured = [
        {
            "iden": {
                "id": "018f5553-3a2d-70b9-ac84-2b5c65f9de16",
                "name": {
                    "en": "Ecocycle Planning (Liberating Structures)",
                    "es": "Planificación del Ecociclo (Estructuras Liberadoras)",
                    "pt": "Planejamento do Ciclo Ecológico (Estruturas Libertadoras)"
                },
                "version": "2.2",
                "description": {
                    "en": "Analyze the Full Portfolio of Activities and Relationships to Identify Obstacles and Opportunities for Progress (95 min.)",
                    "es": "Analizar el Portafolio Completo de Actividades y Relaciones para Identificar Obstáculos y Oportunidades de Progreso (95 min.)",
                    "pt": "Analisar o Portfólio Completo de Atividades e Relacionamentos para Identificar Obstáculos e Oportunidades de Progresso (95 min.)"
                },
                "deleted": false,
                "keywords": {
                    "en": "medical emergency, medical assistance, first aid, CPR",
                    "es": "emergencia médica, asistencia médica, primeros auxilios, RCP",
                    "pt": "emergência médica, assistência médica, primeiros socorros, RCP"
                },
                "benefit": {
                    "en": "You can eliminate or mitigate common bottlenecks that stifle performance by sifting your group’s portfolio of activities, identifying which elements are starving for resources and which ones are rigid and hampering progress. The Ecocycle makes it possible to sift, prioritize, and plan actions with everyone involved in the activities at the same time, as opposed to the conventional way of doing it behind closed doors with a small group of people. Additionally, the Ecocycle helps everyone see the forest AND the trees—they see where their activities fit in the larger context with others. Ecocycle Planning invites leaders to focus also on creative destruction and renewal in addition to typical themes regarding growth or efficiency. The Ecocycle makes it possible to spur agility, resilience, and sustained performance by including all four phases of development in the planning process.",
                    "es": "Puedes eliminar o mitigar los cuellos de botella comunes que sofocan el rendimiento al tamizar el portafolio de actividades de tu grupo, identificando cuáles elementos están hambrientos de recursos y cuáles son rígidos y obstaculizan el progreso. El Ecociclo hace posible tamizar, priorizar y planificar acciones con todos los involucrados en las actividades al mismo tiempo, en lugar de hacerlo de manera convencional a puerta cerrada con un pequeño grupo de personas. Además, el Ecociclo ayuda a todos a ver el bosque Y los árboles: ven dónde encajan sus actividades en el contexto más amplio con otros. La Planificación del Ecociclo invita a los líderes a centrarse también en la destrucción creativa y la renovación además de los temas típicos relacionados con el crecimiento o la eficiencia. El Ecociclo hace posible impulsar la agilidad, la resiliencia y el rendimiento sostenido al incluir todas las cuatro fases del desarrollo en el proceso de planificación.",
                    "pt": "Você pode eliminar ou mitigar gargalos comuns que sufocam o desempenho ao peneirar o portfólio de atividades do seu grupo, identificando quais elementos estão famintos por recursos e quais são rígidos e dificultam o progresso. O Ciclo Ecológico torna possível peneirar, priorizar e planejar ações com todos envolvidos nas atividades ao mesmo tempo, ao contrário da forma convencional de fazer isso a portas fechadas com um pequeno grupo de pessoas. Além disso, o Ciclo Ecológico ajuda todos a ver a floresta E as árvores: eles veem onde suas atividades se encaixam no contexto maior com os outros. O Planejamento do Ciclo Ecológico convida os líderes a se concentrarem também na destruição criativa e na renovação além dos temas típicos sobre crescimento ou eficiência. O Ciclo Ecológico torna possível estimular agilidade, resiliência e desempenho sustentado ao incluir todas as quatro fases de desenvolvimento no processo de planejamento."
                }
            },
            "clas": {
                "contextName": {
                    "en": "Economic & Organizational",
                    "es": "Económico y Organizacional",
                    "pt": "Econômico e Organizacional"
                },
                "contextId": "018f2c04-b8a3-7bf6-a1e5-9709f203d640",
                "domainName": {
                    "en": "Organizational Dynamics",
                    "es": "Dinámicas Organizacionales",
                    "pt": "Dinâmicas Organizacionais"
                },
                "domainId": "018f3128-6025-78b6-9fc4-47cdec62794e",
                "needName": {
                    "en": "Eliminate & Mitigate Operational Bottlenecks",
                    "es": "Eliminar y Mitigar Cuellos de Botella Operativos",
                    "pt": "Eliminar e Mitigar Gargalos Operacionais"
                },
                "needId": "018f5644-39c2-7f01-bc2f-b149a1cba82f"
            },
            "cont": {
                "preamble": {
                    "en": "",
                    "es": "",
                    "pt": ""
                },
                "elements": [
                    {
                        "en": "Structuring Invitation: • Invite the group to view, organize, and prioritize current activities using four developmental phases: birth, maturity, creative destruction, and renewal. • Invite the group to formulate action steps linked to each phase: actions that accelerate growth during the birth phase, actions that extend life or increase efficiency during the maturity phase, actions that prune dead wood or compost rigid practices during the creative destruction phase, actions that connect creative people or prepare the ground for birth during the renewal phase. The leadership stance required for each phase can be characterized as entrepreneur, manager, heretic, and networker.",
                        "es": "Invitación a la Estructuración: • Invita al grupo a visualizar, organizar y priorizar las actividades actuales usando cuatro fases de desarrollo: nacimiento, madurez, destrucción creativa y renovación. • Invita al grupo a formular pasos de acción vinculados a cada fase: acciones que aceleren el crecimiento durante la fase de nacimiento, acciones que extiendan la vida o aumenten la eficiencia durante la fase de madurez, acciones que podan madera muerta o compostan prácticas rígidas durante la fase de destrucción creativa, acciones que conecten a personas creativas o preparen el terreno para el nacimiento durante la fase de renovación. La postura de liderazgo requerida para cada fase puede caracterizarse como emprendedor, gerente, hereje y conector de redes.",
                        "pt": "Convite à Estruturação: • Convide o grupo a visualizar, organizar e priorizar as atividades atuais usando quatro fases de desenvolvimento: nascimento, maturidade, destruição criativa e renovação. • Convide o grupo a formular etapas de ação vinculadas a cada fase: ações que aceleram o crescimento durante a fase de nascimento, ações que prolongam a vida ou aumentam a eficiência durante a fase de maturidade, ações que podam madeira morta ou compostam práticas rígidas durante a fase de destruição criativa, ações que conectam pessoas criativas ou preparam o terreno para o nascimento durante a fase de renovação. A postura de liderança necessária para cada fase pode ser caracterizada como empreendedor, gerente, herege e conector de redes."
                    },
                    {
                        "en": "How Space Is Arranged and Materials Needed: A room with an open flat wall and open space for participants to stand comfortably in front of the wall. Chairs for people to sit in groups of 4, with or without small round tables. A blank Ecocycle map worksheet for each participant and a large wall-poster version posted on the wall. Post-it notes for each activity",
                        "es": "Cómo se Dispone el Espacio y Materiales Necesarios: Una sala con una pared plana y abierta y espacio abierto para que los participantes se paren cómodamente frente a la pared. Sillas para que las personas se sienten en grupos de 4, con o sin mesas redondas pequeñas. Una hoja de trabajo en blanco del mapa del Ecociclo para cada participante y una versión grande en forma de póster en la pared. Notas adhesivas para cada actividad.",
                        "pt": "Como o Espaço é Arranjado e Materiais Necessários: Uma sala com uma parede plana e aberta e espaço aberto para que os participantes fiquem confortavelmente em frente à parede. Cadeiras para que as pessoas se sentem em grupos de 4, com ou sem pequenas mesas redondas. Uma folha de trabalho do mapa do Ciclo Ecológico em branco para cada participante e uma versão grande em formato de pôster na parede. Notas adesivas para cada atividade."
                    },
                    {
                        "en": "How Participation Is Distributed: Everybody involved in the work is included, all levels and functions. Everyone has an equal opportunity to contribute",
                        "es": "Cómo se Distribuye la Participación: Todos los involucrados en el trabajo están incluidos, todos los niveles y funciones. Todos tienen la misma oportunidad de contribuir.",
                        "pt": "Como a Participação é Distribuída: Todos os envolvidos no trabalho estão incluídos, todos os níveis e funções. Todos têm a mesma oportunidade de contribuir."
                    },
                    {
                        "en": "How Groups Are Configured: 1-2-4-All. Small groups for action steps",
                        "es": "Cómo seConfiguran los Grupos: 1-2-4-Todos. Grupos pequeños para pasos de acción.",
                        "pt": "Como os Grupos São Configurados: 1-2-4-Todos. Grupos pequenos para etapas de ação."
                    },
                    {
                        "en": "Sequence of Steps and Time Allocation: Introduce the idea of the Ecocycle and hand out a blank map to each participant. 5 min. Ask participants to generate their individual activity lists: “For your working group (e.g., department, function, or whole company), make a list of all the activities (projects, initiatives) that occupy your time.” 5 min. Ask them to work in pairs to decide the placement of every activity in the Ecocycle. 10 min. Sequence of Steps and Time Allocation. Introduce the idea of the Ecocycle and hand out a blank map to each participant. 5 min. Ask participants to generate their individual activity lists: “For your working group (e.g., department, function, or whole company), make a list of all the activities (projects, initiatives) that occupy your time.” 5 min. Ask them to work in pairs to decide the placement of every activity in the Ecocycle. 10 min. Invite them to form groups of four and finalize the placement of activities on the Ecocycle map. 15 min. Ask each group to put its activities on Post-it notes and create a whole-room map by inviting the groups one by one to place their Post-its on the larger map. 15 min. Ask each group to step back and digest the pattern of placements. Ask them to focus on all the activities on which there is consensus about their placement. Ask, “What activities do we need to creatively destroy or stop to move forward? What activities do we need to expand or start to move forward?” 15 min. In small groups, for each activity that needs to be stopped (activities that are in the Rigidity Trap), create a first-action step. 10 min. or more depending on the number of activities and groups. In small groups, for each activity that needs to start or get more resources (activities in the Scarcity trap), create a first-action step. 10 min. or more as above. Ask all the groups to focus on all the activities for which there is no consensus. Do a quick round of conversation to make sense of the differences in placement. When possible, create first-action steps to handle each one. 10 min.Invite them to form groups of four and finalize the placement of activities on the Ecocycle map. 15 min.",
                        "es": "Secuencia de Pasos y Asignación de Tiempo: Introduce la idea del Ecociclo y entrega un mapa en blanco a cada participante. 5 min. Pide a los participantes que generen sus listas de actividades individuales: “Para tu grupo de trabajo (por ejemplo, departamento, función o toda la empresa), haz una lista de todas las actividades (proyectos, iniciativas) que ocupan tu tiempo”. 5 min. Pídeles que trabajen en parejas para decidir la ubicación de cada actividad en el Ecociclo. 10 min. Secuencia de Pasos y Asignación de Tiempo. Introduce la idea del Ecociclo y entrega un mapa en blanco a cada participante. 5 min. Pide a los participantes que generen sus listas de actividades individuales: “Para tu grupo de trabajo (por ejemplo, departamento, función o toda la empresa), haz una lista de todas las actividades (proyectos, iniciativas) que ocupan tu tiempo”. 5 min. Pídeles que trabajen en parejas para decidir la ubicación de cada actividad en el Ecociclo. 10 min. Invítalos a formar grupos de cuatro y finaliza la ubicación de las actividades en el mapa del Ecociclo. 15 min. Pide a cada grupo que coloque sus actividades en notas adhesivas y cree un mapa de toda la sala invitando a los grupos uno por uno a colocar sus notas adhesivas en el mapa más grande. 15 min. Pide a cada grupo que dé un paso atrás y digiera el patrón de ubicaciones. Pídeles que se concentren en todas las actividades sobre las que hay consenso sobre su ubicación. Pregunta, “¿Qué actividades necesitamos destruir creativamente o detener para avanzar? ¿Qué actividades necesitamos expandir o iniciar para avanzar?” 15 min. En grupos pequeños, para cada actividad que necesita detenerse (actividades que están en la Trampa de la Rigidez), crea un primer paso de acción. 10 min. o más dependiendo del número de actividades y grupos. En grupos pequeños, para cada actividad que necesita comenzar o recibir más recursos (actividades en la trampa de Escasez), crea un primer paso de acción. 10 min. o más como antes. Pide a todos los grupos que se concentren en todas las actividades para las cuales no hay consenso. Haz una ronda rápida de conversación para dar sentido a las diferencias en la ubicación. Cuando sea posible, crea primeros pasos de acción para manejar cada una. 10 min.Invítalos a formar grupos de cuatro y finaliza la ubicación de las actividades en el mapa del Ecociclo. 15 min.",
                        "pt": "Sequência de Passos e Alocação de Tempo: Apresente a ideia do Ciclo Ecológico e distribua um mapa em branco para cada participante. 5 min. Peça aos participantes que gerem suas listas de atividades individuais: “Para seu grupo de trabalho (por exemplo, departamento, função ou toda a empresa), faça uma lista de todas as atividades (projetos, iniciativas) que ocupam seu tempo.” 5 min. Peça-lhes que trabalhem em pares para decidir a localização de cada atividade no Ciclo Ecológico. 10 min. Sequência de Passos e Alocação de Tempo. Apresente a ideia do Ciclo Ecológico e distribua um mapa em branco para cada participante. 5 min. Peça aos participantes que gerem suas listas de atividades individuais: “Para seu grupo de trabalho (por exemplo, departamento, função ou toda a empresa), faça uma lista de todas as atividades (projetos, iniciativas) que ocupam seu tempo.” 5 min. Peça-lhes que trabalhem em pares para decidir a localização de cada atividade no Ciclo Ecológico. 10 min. Convide-os a formar grupos de quatro e finalize a localização das atividades no mapa do Ciclo Ecológico. 15 min. Peça a cada grupo que coloque suas atividades em notas adesivas e crie um mapa de toda a sala convidando os grupos um por um a colocar suas notas adesivas no mapa maior. 15 min. Peça a cada grupo que dê um passo atrás e digira o padrão de localizações. Peça-lhes que se concentrem em todas as atividades sobre as quais há consenso sobre sua localização. Pergunte, “Quais atividades precisamos destruir criativamente ou parar para avançar? Quais atividades precisamos expandir ou começar para avançar?” 15 min. Em grupos pequenos, para cada atividade que precisa ser interrompida (atividades que estão na Armadilha da Rigidez), crie um primeiro passo de ação. 10 min. ou mais dependendo do número de atividades e grupos. Em grupos pequenos, para cada atividade que precisa começar ou obter mais recursos (atividades na armadilha da Escassez), crie um primeiro passo de ação. 10 min. ou mais como acima. Peça a todos os grupos que se concentrem em todas as atividades para as quais não há consenso. Faça uma rodada rápida de conversa para dar sentido às diferenças na localização. Quando possível, crie primeiros passos de ação para lidar com cada uma. 10 min.Convide-os a formar grupos de quatro e finalize a localização das atividades no mapa do Ciclo Ecológico. 15 min."
                    }
                ],
                "attribution": {
                    "message": {
                        "en": "Adapted by Henri Lipmanowicz and Keith McCandless from professor Brenda Zimmerman (see EdgeWare excerpt) and ecologists (see http://www.resalliance.org)",
                        "es": "Adaptado por Henri Lipmanowicz y Keith McCandless de la profesora Brenda Zimmerman (ver extracto de EdgeWare) y ecologistas (ver http://www.resalliance.org)",
                        "pt": "Adaptado por Henri Lipmanowicz e Keith McCandless da professora Brenda Zimmerman (ver trecho do EdgeWare) e ecologistas (ver http://www.resalliance.org)"
                    },
                    "attributionURL": "https://www.liberatingstructures.com/31-ecocycle-planning/"
                }
            },
            "hist": {
                "changeLog": [
                    {
                        "author": {
                            "en": "Jose Leal",
                            "es": "Jose Leal",
                            "pt": "Jose Leal"
                        },
                        "date": 1715095657982,
                        "createdByEmail": "jose@radical.world"
                    }
                ]
            }
        },
        {
            "iden": {
                "id": "018f5553-3a2d-70b9-ac84-2b5c65f34435",
                "name": {
                    "en": "Medical Emergency Protocol",
                    "es": "Protocolo de Emergencia Médica",
                    "pt": "Protocolo de Emergência Médica"
                },
                "version": "1.0",
                "description": {
                    "en": "• Keep a well-equipped first-aid kit accessible in multiple locations.\n• Train selected staff in basic first aid and CPR.\n• Establish a direct line to local emergency medical services.\n• Designate a safe area for emergency treatment and assessment while waiting for professional medical help.",
                    "es": "• Mantén un botiquín de primeros auxilios bien equipado y accesible en múltiples ubicaciones.\n• Capacita al personal seleccionado en primeros auxilios básicos y RCP.\n• Establece una línea directa con los servicios médicos de emergencia locales.\n• Designa un área segura para el tratamiento y evaluación de emergencias mientras esperas la ayuda médica profesional.",
                    "pt": "• Mantenha um kit de primeiros socorros bem equipado e acessível em vários locais.\n• Treine o pessoal selecionado em primeiros socorros básicos e RCP.\n• Estabeleça uma linha direta para os serviços médicos de emergência locais.\n• Designe uma área segura para tratamento e avaliação de emergência enquanto aguarda a ajuda médica profissional."
                },
                "keywords": {
                    "en": "medical emergency, medical assistance, first aid, cpr",
                    "es": "emergencia médica, asistencia médica, primeros auxilios, RCP",
                    "pt": "emergência médica, assistência médica, primeiros socorros, RCP"
                }
            },
            "clas": {
                "contextId": "018f2c04-b8a3-7bf6-a1e5-9709f203d640",
                "contextName": {
                    "en": "Crisis & Emergency",
                    "es": "Crisis y Emergencia",
                    "pt": "Crise e Emergência"
                },
                "domainName": {
                    "en": "Disaster Response",
                    "es": "Respuesta a Desastres",
                    "pt": "Resposta a Desastres"
                },
                "domainId": "018f3128-6025-78b6-9fc4-47cdec62794e",
                "needName": {
                    "en": "Provide Medical Assistance",
                    "es": "Proporcionar Asistencia Médica",
                    "pt": "Fornecer Assistência Médica"
                },
                "needId": "018f5644-39c2-7f01-bc2f-b149a1cba82f"
            },
            "cont": {
                "preamble": {
                    "en": "",
                    "es": "",
                    "pt": ""
                },
                "elements": [
                    {
                        "en": "Emergency Contacts and Information: Post emergency contacts and procedures prominently throughout the workplace. Include instructions for calling local emergency services.",
                        "es": "Contactos e Información de Emergencia: Publica los contactos de emergencia y procedimientos de manera prominente en todo el lugar de trabajo. Incluye instrucciones para llamar a los servicios de emergencia locales.",
                        "pt": "Contatos e Informações de Emergência: Publique contatos de emergência e procedimentos de forma proeminente em todo o local de trabalho. Inclua instruções para chamar os serviços de emergência locais."
                    },
                    {
                        "en": "Training Programs: Offer regular training sessions on first aid, CPR, and emergency response, including the use of an automated external defibrillator (AED) if available.",
                        "es": "Programas de Capacitación: Ofrece sesiones de capacitación regular sobre primeros auxilios, RCP y respuesta a emergencias, incluyendo el uso de un desfibrilador externo automatizado (DEA) si está disponible.",
                        "pt": "Programas de Treinamento: Ofereça sessões de treinamento regulares sobre primeiros socorros, RCP e resposta a emergências, incluindo o uso de um desfibrilador externo automatizado (DEA) se disponível."
                    },
                    {
                        "en": "Incident Documentation: Keep records of all medical incidents and responses to help refine the protocol and provide legal documentation if needed.",
                        "es": "Documentación de Incidentes: Mantén registros de todos los incidentes médicos y respuestas para ayudar a refinar el protocolo y proporcionar documentación legal si es necesario.",
                        "pt": "Documentação de Incidentes: Mantenha registros de todos os incidentes médicos e respostas para ajudar a refinar o protocolo e fornecer documentação legal, se necessário."
                    },
                    {
                        "en": "Regular Equipment Checks: Regularly check and restock first aid supplies and ensure that all emergency equipment like AEDs are functional and accessible.",
                        "es": "Revisiones Regulares de Equipos: Revisa y repone regularmente los suministros de primeros auxilios y asegúrate de que todo el equipo de emergencia, como los DEA, esté funcional y accesible.",
                        "pt": "Verificações Regulares de Equipamentos: Verifique e reabasteça regularmente os suprimentos de primeiros socorros e certifique-se de que todo o equipamento de emergência, como os DEAs, esteja funcional e acessível."
                    }
                ],
                "attribution": {
                    "message": {
                        "en": "",
                        "es": "",
                        "pt": ""
                    },
                    "attributionURL": "https://radical.world"
                }
            },
            "hist": {
                "changeLog": [
                    {
                        "author": {
                            "en": "Jose Leal",
                            "es": "Jose Leal",
                            "pt": "Jose Leal"
                        },
                        "date": 1715095657982
                    }
                ]
            }
        }
    ]

    return (
        <Box className='featured'>    
            { featured.map((item) => (
                <ViewItemPage key={ item.iden.id } item={ item } />
            ))}
        </Box>
    )
}        