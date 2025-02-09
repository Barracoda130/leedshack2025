import { useEffect, useState } from "react";
import Graph from "graphology";
import { SigmaContainer, useLoadGraph, useSigma, useRegisterEvents } from "@react-sigma/core";
import "@react-sigma/core/lib/style.css";
import GraphControls from "./ctrlButtons";
import DisplayNodeData from "./displayNodeData"; // Import the modal component
import axiosAuth from "../api/axios-auth";
import AddNodeModal from "./addNodeModal";

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
const get_data_from_backend = async () => {
  try {
    const response = await axiosAuth.post("/dao/get-info", {
      dao_id: 1,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Main graph component
export const DisplayGraph = () => {
  const [graph, setGraph] = useState(new Graph());

  useEffect(() => {
    const fetchDataAndInitializeGraph = async () => {
      const graphdata = await get_data_from_backend();
      console.log(graphdata);

      const initialGraph = new Graph();
      initialGraph.addNode("first", {
        x: 0,
        y: 0,
        size: 15,
        label: graphdata.dao_info.name,
        color: "#FA4F40",
        // my stuff
        item: graphdata.dao_info.items,
        terminationPeriod: graphdata.dao_info.termination_period,
        join: graphdata.dao_info.joining_fee,
        total_monthly_income: graphdata.dao_info.total_monthly_income,
      });

      setGraph(initialGraph);
    };

    fetchDataAndInitializeGraph();
  }, []);

  const [nodeCount, setNodeCount] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addNode = ({ name = "Unnamed Node", surname = "idk", items = [] } = {}) => {
    console.log("Adding node with name:", name, "Items:", items); // Debugging Log
  
    const newGraph = graph.copy();
    const newNodeId = `node-${nodeCount}`;
  
    newGraph.addNode(newNodeId, {
      x: Math.random() * 5 - 2.5,
      y: Math.random() * 5 - 2.5,
      size: 10,
      label: name,
      color: "#4F91FA",
      name: name,
      surname: surname,
      items: Array.isArray(items) ? items : [], // Ensure it's always an array
    });
  
    newGraph.addEdge("first", newNodeId);
    setNodeCount(nodeCount + 1);
    setGraph(newGraph);
    setIsModalOpen(false);
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

      {/* Add Node Modal - Placed Here Instead of Sidebar */}
      <AddNodeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={addNode} />

      {/* Controls */}
      <GraphControls addNode={() => setIsModalOpen(true)} deleteNode={deleteNode} />

      {/* Pop-up modal for displaying node data */}
      <DisplayNodeData node={selectedNode} onClose={closeModal} />
    </div>
  );
};


export default DisplayGraph;
