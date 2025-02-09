import DisplayGraph from "./components/nodeMap";
import Sidebar from "./components/sideBar";
import Navbar from "./Navbar";


const Dashboard = () => {
    return (
        <div>
            <DisplayGraph />
            <Sidebar />
        </div>
    );
}

export default Dashboard;