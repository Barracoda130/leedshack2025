import { useEffect } from "react";
import Graph from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/style.css";
const sigmaStyle = { height: "100vh", width: "100vw" };

// Component that load the graph
export const LoadGraph = () => {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    const graph = new Graph();
    graph.addNode("first", { x: 0, y: 0, size: 15, label: "My first node", color: "#FA4F40" });
    loadGraph(graph);
  }, [loadGraph]);

  return null;
};

// Component that display the graph
export const DisplayGraph = () => {
  return (
    <SigmaContainer style={sigmaStyle}>
      <LoadGraph />
    </SigmaContainer>
  );
};

export default DisplayGraph;

