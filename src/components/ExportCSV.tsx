import React from "react";
import Papa from "papaparse";

const ExportCSV: React.FC<{ data: any[] }> = ({ data }) => {
  const handleExport = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "car_models.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
    >
      Export {data[0]?.brand} Models to CSV
    </button>
  );
};

export default ExportCSV;

