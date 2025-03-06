import "./App.css";
import SidebarComponent from "./components/SidebarComponent";
import TopNavbarComponent from "./components/TopNavbarComponent";
import DashboardComponent from "./components/DashboardComponent";
import AddNewProjectComponent from "./components/AddNewProjectComponent";
import NotificationComponent from "./components/NotificationComponent";
import LearningMaterialComponent from "./components/LearningMaterialsComponent";
import { useState } from "react";

function App() {
  const [assignments, setAssignments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="grid grid-cols-12 bg-gray-200">
        <aside className="col-span-2">
          <SidebarComponent />
        </aside>
        <main className="col-span-7 p-8 flex flex-col gap-4">
          <TopNavbarComponent onSearch={setSearchTerm} />
          <DashboardComponent />
          <AddNewProjectComponent
            assignments={assignments}
            setAssignments={setAssignments}
            searchTerm={searchTerm}
          />
        </main>
        <div className="col-span-3 flex flex-col gap-4 p-8">
          <NotificationComponent />
          <LearningMaterialComponent />
        </div>
      </div>
    </>
  );
}

export default App;
