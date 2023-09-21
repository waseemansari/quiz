
import { Link} from "react-router-dom";
export default function Navbar() {
    const admin_id = sessionStorage.getItem("admin_id");
   
    return (
        <>
            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <Link to="/dashboard" className="nav-link collapsed">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    
                </ul>

            </aside>
        </>
    );
}
