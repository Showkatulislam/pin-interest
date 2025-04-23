import { Outlet } from "react-router"
import Leftbar from "../../components/Leftbar/Leftbar";
import Topbar from "../../components/Topbar/Topbar";
import './mainLayout.css'
const MainLayout = () => {
    return (
        <div className="app">
            <div>
                <Leftbar />
            </div>
            <div className="content">
                <Topbar />
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;