import { CloudCog, Plus } from "lucide-react";
import React, { useState } from "react";
import CardComponent from "./CardComponent";

export default function AddNewProjectComponent({
  assignments,
  setAssignments,
  searchTerm,
}) {
  const [formData, setFormData] = useState({
    projectName: "",
    dueDate: "",
    progress: "",
    des: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    const selectedDate = new Date(formData.dueDate);

    if (!formData.projectName.trim()) {
      newErrors.projectName = "* Project name is required.";
    } else if (!/^[a-zA-Z0-9\s-]+$/.test(formData.projectName)) {
      newErrors.projectName =
        "Project Name can only contain letters, numbers, spaces, and hyphens.";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "* Please choose the deadline of your project";
    } else if (selectedDate < today.setHours(0, 0, 0, 0)) {
      newErrors.dueDate = "Deadline cannot be earlier than the current date.";
    }

    if (!formData.progress) {
      newErrors.progress = "* Please select the your progress projectb.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setAssignments([...assignments, formData]);
      setFormData({ projectName: "", dueDate: "", progress: "", des: "" });
    }
  };

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col gap-6 overflow-auto h-[80vh]">
        <div className="flex justify-between items-center">
          <div></div>
          <div>
            <button
              data-modal-target="crud-modal"
              data-modal-toggle="crud-modal"
              className="text-white bg-custom-sky-blue hover:bg-custom-sky-blue-500 focus:ring-3 focus:outline-none focus:ring-custom-sky-blue-500 font-medium rounded-lg text-sm px-3 py-2.5 text-center flex items-center gap-2"
              type="button"
            >
              <Plus size={22} /> <span className="text-base">New Project</span>
            </button>

            {/* Modal */}
            <div
              id="crud-modal"
              tabIndex="-1"
              aria-hidden="true"
              className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-2xl shadow-sm dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Create New Project
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-toggle="crud-modal"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>

                  <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label
                          htmlFor="projectName"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Project Name
                        </label>
                        <input
                          type="text"
                          name="projectName"
                          id="projectName"
                          value={formData.projectName}
                          onChange={handleChange}
                          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                            errors.projectName
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Type Project Name"
                        />
                        {errors.projectName && (
                          <span className="text-sm text-red-500">
                            {errors.projectName}
                          </span>
                        )}
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="dueDate"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Due Date
                        </label>
                        <input
                          type="date"
                          name="dueDate"
                          id="dueDate"
                          value={formData.dueDate}
                          onChange={handleChange}
                          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                            errors.dueDate
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors.dueDate && (
                          <span className="text-sm text-red-500">
                            {errors.dueDate}
                          </span>
                        )}
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="progress"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Progress
                        </label>
                        <select
                          id="progress"
                          name="progress"
                          value={formData.progress}
                          onChange={handleChange}
                          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ${
                            errors.progress
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        >
                          <option value="">Select Progress</option>
                          <option value="100">100</option>
                          <option value="75">75</option>
                          <option value="50">50</option>
                          <option value="25">25</option>
                        </select>
                        {errors.progress && (
                          <span className="text-sm text-red-500">
                            {errors.progress}
                          </span>
                        )}
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="des"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Project Description
                        </label>
                        <textarea
                          id="des"
                          name="des"
                          rows="4"
                          value={formData.des}
                          onChange={handleChange}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                          placeholder="Write project description here"
                        ></textarea>
                      </div>
                    </div>
                    <div className="text-right">
                      <button
                        type="submit"
                        className="text-white bg-custom-sky-blue px-5 py-2.5 rounded-lg"
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-3 gap-4">
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((item, index) => (
              <CardComponent
                key={index}
                projectName={item.projectName}
                dueDate={item.dueDate}
                des={item.des}
                progress={item.progress}
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-3">
              {searchTerm
                ? `No projects found matching "${searchTerm}"`
                : "No projects created yet"}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
