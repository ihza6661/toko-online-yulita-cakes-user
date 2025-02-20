import {useEffect} from 'react'
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    useEffect(() => {
        document.title = "AS Denim - Dashboard";
      }, []);
    const tabs = [
        { name: 'Orderan Saya', path: 'orders' },
        { name: 'Alamat', path: 'addresses' },
        { name: 'Detail Akun', path: 'account' },
    ];

    return (
        <div className="pt-24 px-4 sm:px-8 md:px-32">
            <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-1/4">
                    <nav className="bg-white shadow-md rounded p-4">
                        <ul className="space-y-4">
                            {tabs.map((tab) => (
                                <li key={tab.path}>
                                    <NavLink
                                        to={tab.path}
                                        className={({ isActive }) =>
                                            `block px-4 py-2 rounded hover:bg-gray-100 transition ${
                                                isActive ? 'bg-gray-100 font-semibold' : ''
                                            }`
                                        }
                                    >
                                        {tab.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                {/* Content Area */}
                <div className="w-full md:w-3/4">
                    <div className="bg-white shadow-md rounded p-4">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
