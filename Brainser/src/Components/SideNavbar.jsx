import React from "react";

const SideNavbar = ({ handleImageUpload, handlePDFUpload }) => {
  return (
    <div className="h-auto w-48 bg-white shadow-lg rounded-lg p-4 md: ml-4 mr-4">
      <div className="flex flex-col">
        <label className="py-2 px-4 text-lg hover:bg-gray-200 rounded cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          Upload Image
        </label>
        <label className="py-2 px-4 text-lg hover:bg-gray-200 rounded cursor-pointer">
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePDFUpload}
            className="hidden"
          />
          Upload PDF
        </label>
      </div>
    </div>
  );
};

export default SideNavbar;