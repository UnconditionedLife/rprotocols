import Graph from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";

export const LoadGraph = () => {
  const graph = new Graph();
  graph.addNode("first", { size: 15, label: "My first node", color: "#FA4F40", x: 100, y: 100 });
  graph.addNode("second", { size: 10, label: "My second node", color: "#FA4F40", x: 150, y: 150 });
  useLoadGraph(graph);
};

export const DisplayGraph = () => {
  return (
    <SigmaContainer style={{ height: "500px", width: "500px" }}>
      <LoadGraph />
    </SigmaContainer>
  );
};