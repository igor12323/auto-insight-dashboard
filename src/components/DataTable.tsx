import React from "react";

interface CarModel {
  id: number;
  model: string;
  brand: string;
  segment: string;
  price: number;
}

interface DataTableProps {
  data: CarModel[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2">Model</th>
          <th className="px-4 py-2">Brand</th>
          <th className="px-4 py-2">Segment</th>
          <th className="px-4 py-2">Price</th>
        </tr>
      </thead>
      <tbody>
        {data.map((car) => (
          <tr key={car.id} className="border-t">
            <td className="px-4 py-2">{car.model}</td>
            <td className="px-4 py-2">{car.brand}</td>
            <td className="px-4 py-2">{car.segment}</td>
            <td className="px-4 py-2">${car.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
