import React from "react";
import { dashboard } from "../data/dashboard";
export default function DashboardComponent() {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold mb-5">Dashboard</h2>
      <div className="grid grid-cols-4 gap-2">
        {dashboard.map((item) => {
          return (
            <div key={item.id}>
              <div className="flex bg-white gap-5 py-3.5 px-4 rounded-xl  ">
                <div className={`p-3 rounded-xl ${item.color}`}>
                  <img src={item.icon} alt="file icon" />
                </div>
                <div>
                  <p className="text-xl font-semibold">{item.totalTasks}</p>
                  <p className="text-gray-400 line-clamp-1">{item.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
