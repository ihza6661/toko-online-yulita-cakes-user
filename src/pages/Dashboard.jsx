import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  useEffect(() => {
    document.title = " Yulita Cakes - Dashboard";
  }, []);

  const tabs = [
    { name: "Orderan Saya", path: "orders" },
    { name: "Alamat", path: "addresses" },
    { name: "Detail Akun", path: "account" },
  ];

  return (
    <div className="pt-24 px-6 sm:px-10 md:px-32 pb-10 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-pink-700 my-6">
        ― Dashboard ―
      </h1>

      <div className="w-full max-w-6xl flex flex-col md:flex-row md:gap-12 lg:gap-16 items-start justify-center mx-auto p-4">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-1/4 lg:w-1/5">
          <nav className="bg-pink-50 dark:bg-gray-900 shadow-lg rounded-2xl p-5 mb-5">
            <ul className="space-y-4">
              {tabs.map((tab) => (
                <li key={tab.path}>
                  <NavLink
                    to={tab.path}
                    className={({ isActive }) =>
                      `block px-6 py-3 rounded-lg text-lg font-medium transition duration-300 ${
                        isActive
                          ? "bg-pink-400 dark:bg-pink-700 text-white dark:text-gray-200 shadow-md"
                          : "bg-pink-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 hover:bg-pink-200"
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
        <div className="w-full md:w-3/4 lg:w-4/5 flex items-center justify-center">
          <div className=" flex items-center justify-center shadow-lg rounded-2xl w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
