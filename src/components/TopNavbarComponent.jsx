import { Bell, Search } from "lucide-react";
import React from "react";

export default function TopNavbarComponent({ onSearch }) {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-between items-center w-full">
      <form className="relative w-full" onSubmit={handleSubmit}>
        <button type="submit" className="cursor-pointer">
          <Search className="w-6 h-6 text-primary-text absolute top-3 left-4" />
        </button>
        <input
          type="text"
          placeholder="Search assignment here"
          onChange={handleSearchChange}
          className="w-full bg-white py-3 pl-14 pr-5 rounded-xl h-12 border-none focus:border-none focus:ring-0 focus:outline-custom-sky-blue"
        />
      </form>
    </div>
  );
}
