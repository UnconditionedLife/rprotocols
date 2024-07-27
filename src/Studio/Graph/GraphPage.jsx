import { Box } from "@mui/material"
import * as d3 from "d3"
import { getItemColor, urlizeString } from "../../GlobalFunctions"

export default function GraphPage(props) {
    const { db } = props

    if (!db) return null

    // flatten db
    const needsArray = db.map(i => {
        if ( i.parentNeeds.length !== 0 ) {
            return {
                id: i.majId,
                type: i.type,
                name: i.title.en,
                parents: i.parentNeeds,
                children: []
    }}
    }).filter( (i) => i !== undefined)
        .filter((i) => (db.find((d) => d.id === i.source || db.find((d) => d.id === i.target ))  ))

    const rootId = "N.20240716T165825706-1513.1"
    const rootItem = findItem(rootId)
    needsArray.unshift({ 
        id: rootItem.majId,
        type: rootItem.type,
        name: rootItem.title.en,
        parentId: null,
        children: []
    })

    function findItem(majId){
        return db.find((item) => item.majId === majId )
    }

    let tree = { name: 'PROTOCOLS', 
        children: []
    };
    let lookup = {};

    // Initialize lookup
    needsArray.forEach(item => {
        lookup[item.id] = { ...item };
    });

    const rootParent = null

    // Build the tree
    needsArray.forEach(item => {
        if (item.parentId === rootParent) {
            tree.children.push(lookup[item.id]);
        } else {
            if (lookup[item.parentId]) {
                lookup[item.parentId].children.push(lookup[item.id]);
            }
        }
    });




// console.log('flatDb', needsArray)
// console.log('tree', tree)

const data = tree
    
// HTML BOX SIZE= 1000px x 700px
    // const width = 800;  // -120 for margins
    // const height = 800; // -120 for margins

    // Set the dimensions and margins of the diagram
    const margin = { top: 20, right: 90, bottom: 30, left: 90 },
    width = 900 - margin.left - margin.right,
    height = 900 - margin.top - margin.bottom;

    // Set the padding
    const padding = 50;

    // const cluster = d3.cluster()
    //     .size([height, width - 360]);

    // const root = d3.hierarchy(data, d => d.children);

    // cluster(root)

    // Append the svg object to the body of the page
    const svg = d3.select("#graph").append("svg")
        .attr("width", width + margin.right + margin.left + padding * 2)
        .attr("height", height + margin.top + margin.bottom + padding * 2)
        .append("g")
        .attr("transform", "translate("
            + (width / 2 + padding) + "," + (height / 2 + padding) + ")");

    // Create a radial cluster layout and set the size
    const cluster = d3.cluster()
        .size([2 * Math.PI, Math.min(width, height) / 2 - padding]);

    // Create the root hierarchy
    const root = d3.hierarchy(data, d => d.children);

    // Generate the cluster layout
    cluster(root);

    // Links
    const link = svg.selectAll(".link")
        .data(root.descendants().slice(1))
        .enter().append("path")
        .attr("class", "link")
        .attr("d", d => {
            return "M" + project(d.x, d.y)
            + "C" + project(d.x, (d.y + d.parent.y) / 2)
            + " " + project(d.parent.x, (d.y + d.parent.y) / 2)
            + " " + project(d.parent.x, d.parent.y);
    });

    // const link = svg.selectAll(".link")
    //     .data(root.descendants().slice(1))
    //     .enter().append("path")
    //     .attr("class", "link")
    //     .attr("d", d => `
    //         M${d.y},${d.x}
    //         C${d.parent.y + 100},${d.x}
    //          ${d.parent.y + 100},${d.parent.x}
    //          ${d.parent.y},${d.parent.x}
    //     `);

    const node = svg.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", d => "node" + (d.children ? " node--internal" : " node--leaf"))
        .attr("transform", d => "translate(" + project(d.x, d.y) + ")")
        // .attr("transform", d => `translate(${d.y},${d.x})`)
        .on("click", click)

    // Circles
    node.append("circle")
        .attr("r", 4)
        .style("fill", d => getItemColor(d.data.type))

    // Text
    node.append("text")
        .attr("dy", ".35em")
        .attr("x", d => d.x < Math.PI ? 10 : -10)
        .attr("text-anchor", d => d.x < Math.PI ? "start" : "end")
        // .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y - 360},0) ${d.x >= Math.PI ? "rotate(180)" : ""}`)
        .attr("transform", d => {
            const distance = d.depth === 0 ? d.y - 90 : d.y - 310;
            return `rotate(${d.x * 180 / Math.PI - 90}) translate(${distance},0) ${d.x >= Math.PI ? "rotate(180)" : ""}`;
        })
        .attr("paint-order", "stroke")
        .text(d => d.data.name)
        .style("fill", d => getItemColor(d.data.type))

    // CLICK FUNCTION
    function click (event, d){
        console.log("clickinggggg", event, d)
        const id = d.data.id
        const type = d.data.type.toLowerCase()
        const title = urlizeString(d.data.name)
        let url = "http://localhost:5173/studio/" + type + "/" + title + "/" + id;
        window.open(url, "_self");
    }

    // Helper function to project the radial coordinates
    function project(x, y) {
        const angle = x - Math.PI / 2;
        return [Math.cos(angle) * y, Math.sin(angle) * y];
    }
}