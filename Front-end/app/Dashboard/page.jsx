// Import Component
import Sidebar from "../Components/Sidebar/Sidebar";
import DashboardNav from "../Components/DashboardNav/DashboardNav";

// Import Section
import Main from "../Section/MainContent/Main";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      {/* <DashboardNav /> */}
      <Main />
    </div>
  );
}
