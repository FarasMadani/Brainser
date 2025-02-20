import React from "react";

const HistoryItem = ({ item }) => {
  const { providedText, spokenText, errors, date } = item;
  const formattedDate = new Date(date).toLocaleString();

  return (
    <div className="history-item bg-gray-100 p-4 mb-2 rounded shadow">
      <div className="text-sm text-gray-500">{formattedDate}</div>
      <div className="mt-2">
        <strong>Provided Text:</strong>
        <p>{providedText}</p>
      </div>
      <div className="mt-2">
        <strong>Spoken Text:</strong>
        <p>{spokenText}</p>
      </div>
      <div className="mt-2">
        <strong>Errors:</strong>
        <p>{errors.join(", ")}</p>
      </div>
    </div>
  );
};

export default HistoryItem;
