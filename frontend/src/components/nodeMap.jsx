import { useEffect, useState } from "react";
import Graph from "graphology";
import { SigmaContainer, useLoadGraph, useSigma, useRegisterEvents } from "@react-sigma/core";
import "@react-sigma/core/lib/style.css";
import GraphControls from "./ctrlButtons";
import DisplayNodeData from "./displayNodeData"; // Import the modal component

// Custom hook to handle node click events
const GraphEvents = ({ onNodeClick }) => {
  const registerEvents = useRegisterEvents();

  useEffect(() => {
    if (!onNodeClick) {
      console.error("Error: onNodeClick is undefined");
      return;
    }

    console.log("Registering node click event..."); // Debugging Log

    // Attach node click event
    registerEvents({
      clickNode: (event) => {
        console.log("Node clicked:", event.node); // Debugging log
        onNodeClick(event.node);
      },
    });

    return () => {
      console.log("Cleaning up node click event...");
    };
  }, [onNodeClick, registerEvents]);

  return null;
};

const sigmaStyle = { height: "100vh", width: "100vw", position: "relative" };

// Component that loads the graph
const LoadGraph = ({ graph, onNodeClick }) => {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    loadGraph(graph);
  }, [graph, loadGraph]);

  return <GraphEvents onNodeClick={onNodeClick} />;
};

// Main graph component
export const DisplayGraph = () => {
  const [graph, setGraph] = useState(() => {
    const initialGraph = new Graph();
    initialGraph.addNode("first",
       { x: 0,
         y: 0,
         size: 15,
         label: "DAO",
         color: "#FA4F40",
         //my stuff
         policy: { "excess": "money", "premium": "money2"},
         item:{ "item1": "item1", "item2": "item2"},
         termination: { "term": "2 weeks"},
         join:{ "join1": "join1"}
        },
 
      );
    return initialGraph;
  });

  const [nodeCount, setNodeCount] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);

  // Function to add a new node
  const addNode = () => {
    const newGraph = graph.copy();
    const newNodeId = `node-${nodeCount}`;

    newGraph.addNode(newNodeId, {
      x: Math.random() * 5 - 2.5,
      y: Math.random() * 5 - 2.5,
      size: 10,
      label: `Node ${nodeCount}`,
      color: "#4F91FA",
      //my stuff
      name: "saud",
      items: { "item1": "item1", "item2": "item2"},
      total: 123
    });

    newGraph.addEdge("first", newNodeId);
    setNodeCount(nodeCount + 1);
    setGraph(newGraph);
  };

  // Function to delete the last added node
  const deleteNode = () => {
    if (nodeCount > 1) {
      const newGraph = graph.copy();
      const lastNodeId = `node-${nodeCount - 1}`;

      if (newGraph.hasNode(lastNodeId)) {
        newGraph.dropNode(lastNodeId);
        setNodeCount(nodeCount - 1);
        setGraph(newGraph);
      }
    }
  };

  // Function to handle node clicks
  const handleNodeClick = (nodeId) => {
    const nodeData = graph.getNodeAttributes(nodeId);
    console.log("Clicked Node:", nodeData); // Debugging Log
    setSelectedNode({ id: nodeId, ...nodeData });
  };


  // Function to close the modal
  const closeModal = () => {
    setSelectedNode(null);
  };

  return (
    <div style={sigmaStyle}>
      <SigmaContainer style={{ height: "100vh", width: "100vw" }}>
        <LoadGraph graph={graph} onNodeClick={handleNodeClick} />
      </SigmaContainer>
      <GraphControls addNode={addNode} deleteNode={deleteNode} />

      {/* Pop-up modal is now a separate component */}
      <DisplayNodeData node={selectedNode} onClose={closeModal} />
    </div>
  );
};

export default DisplayGraph;
