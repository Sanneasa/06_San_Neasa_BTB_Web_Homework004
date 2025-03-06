import React, { useState } from "react";
import { Star } from "lucide-react";
import FilterComponent from "./FilterComponent";
import { learningMaterials } from "../data/learningMaterials";

export default function LearningMaterialsComponent() {
  const [sortOrder, setSortOrder] = useState(""); // State to track sort order
  const [materials, setMaterials] = useState(
    learningMaterials.map((item) => ({
      ...item,
      isFavorite: item.isFavorite || false, // Default to false if not set
    }))
  );

  // Toggle favorite status when star is clicked
  const toggleFavorite = (id) => {
    setMaterials((prevMaterials) =>
      prevMaterials.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  // Sort function based on the selected order, using the materials state
  const sortedMaterials = [...materials].sort((a, b) => {
    if (sortOrder === "A-Z") {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === "Z-A") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  // Handle sort change from FilterComponent
  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  return (
    <div className="bg-white drop-shadow-lg rounded-2xl overflow-auto h-[80vh]">
      {/* Calling FilterComponent with onSortChange prop */}
      <FilterComponent onSortChange={handleSortChange} />

      {/* Title */}
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Learning Materials</h2>
        <img src="/more.svg" alt="three dot" width={30} height={30} />
      </div>

      {/* Materials list */}
      <div className="space-y-3">
        {sortedMaterials.map((item) => (
          <div
            key={item.id}
            className="bg-light-gray px-4 py-2 flex gap-5 items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              width={50}
              height={50}
              className="rounded-xl"
            />
            <div className="w-full">
              <div className="flex justify-between">
                <p className="text-base font-medium">{item.title}</p>
                <Star
                  size={20}
                  onClick={() => toggleFavorite(item.id)}
                  className={`cursor-pointer ${
                    item.isFavorite
                      ? "stroke-amber-400 fill-amber-400"
                      : "stroke-gray-400"
                  }`}
                />
              </div>
              <p className="text-gray-400 text-sm">Post at: {item.postedAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
