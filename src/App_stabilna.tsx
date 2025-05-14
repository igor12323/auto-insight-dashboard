
import React, { useState, useEffect } from "react";
import DataTable from "./components/DataTable";
import PriceComparisonChart from "./components/PriceComparisonChart";
import ExportCSV from "./components/ExportCSV";
import logoImage from './AutoComplete1.jpg';
import backImage from './background.png';
import { motion, AnimatePresence } from "framer-motion";

interface CarModel {
  id: number;
  model: string;
  brand: string;
  segment: string;
  price: number;
}

const App: React.FC = () => {
  const [carData] = useState<CarModel[]>([
    { id: 1, model: "Model A", brand: "Brand X", segment: "SUV", price: 30000 },
    { id: 2, model: "Model B", brand: "Brand Y", segment: "Sedan", price: 20000 },
    { id: 3, model: "Model C", brand: "Brand Z", segment: "Coupe", price: 25000 },
    { id: 4, model: "Model D", brand: "Brand X", segment: "SUV", price: 35000 },
    { id: 5, model: "Model E", brand: "Brand Y", segment: "Sedan", price: 22000 },
  ]);
  const [selectedModel1, setSelectedModel1] = useState<number | null>(null);
  const [selectedModel2, setSelectedModel2] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedSegment, setSelectedSegment] = useState<string>("");
  const [showChart, setShowChart] = useState<boolean>(false);
  const [showComparison, setShowComparison] = useState<boolean>(false);

  const handleCompareClick = () => {
    if (selectedModel1 !== null && selectedModel2 !== null) {
      setShowComparison(true);
    }
  };

  const handleChartToggle = () => {
    setShowChart(!showChart);
  };

  const handleModelChange = (setter: React.Dispatch<React.SetStateAction<number | null>>, value: number) => {
    setter(value);
    setShowComparison(false); // Ukryj porównanie po zmianie modelu
  };

  const segments = Array.from(new Set(carData.map((car) => car.segment)));
  const filteredData = selectedSegment
    ? carData.filter((car) => car.segment === selectedSegment)
    : [];

  return (
    <div
      className="p-6"
      style={{
        backgroundImage: `url(${backImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="bg-black bg-opacity-60 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <img src={logoImage} alt="AutoComplete Logo" className="w-76 h-32" />
          <h1 className="text-3xl font-semibold text-white">AutoComplete</h1>
        </div>

        <section className="bg-gray-100 bg-opacity-60 p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Export Data to CSV</h2>
          <div className="mt-6">
            <label htmlFor="brand" className="mr-2">Select Brand:</label>
            <select
              id="brand"
              className="p-2 border border-gray-300"
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">--Select--</option>
              {Array.from(new Set(carData.map((car) => car.brand))).map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
          {selectedBrand && (
            <ExportCSV data={carData.filter((car) => car.brand === selectedBrand)} />
          )}
        </section>

        <section className="bg-white bg-opacity-60 p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Compare Car Models</h2>
          <div className="mt-6">
            <label htmlFor="model1" className="mr-2">Select Model 1:</label>
            <select
              id="model1"
              className="p-2 border border-gray-300"
              onChange={(e) => handleModelChange(setSelectedModel1, Number(e.target.value))}
            >
              <option value="">--Select--</option>
              {carData.map((car, index) => (
                <option key={car.id} value={index}>{car.model} ({car.brand})</option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label htmlFor="model2" className="mr-2">Select Model 2:</label>
            <select
              id="model2"
              className="p-2 border border-gray-300"
              onChange={(e) => handleModelChange(setSelectedModel2, Number(e.target.value))}
            >
              <option value="">--Select--</option>
              {carData.map((car, index) => (
                <option key={car.id} value={index}>{car.model} ({car.brand})</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCompareClick}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Compare Models
          </button>

          <AnimatePresence>
            {showComparison && selectedModel1 !== null && selectedModel2 !== null && (
              <motion.div
                className="mt-6 p-4 border border-gray-300 rounded bg-white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h3 className="text-xl font-semibold">Comparison:</h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-semibold">{carData[selectedModel1].model}</h4>
                    <p>Brand: {carData[selectedModel1].brand}</p>
                    <p>Segment: {carData[selectedModel1].segment}</p>
                    <p>Price: ${carData[selectedModel1].price}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">{carData[selectedModel2].model}</h4>
                    <p>Brand: {carData[selectedModel2].brand}</p>
                    <p>Segment: {carData[selectedModel2].segment}</p>
                    <p>Price: ${carData[selectedModel2].price}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section className="bg-gray-200 bg-opacity-60 p-4 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Price Comparison Chart</h2>
          <div className="mt-6">
            <label htmlFor="segment" className="mr-2">Select Segment:</label>
            <select
              id="segment"
              className="p-2 border border-gray-300"
              onChange={(e) => setSelectedSegment(e.target.value)}
            >
              <option value="">--Select--</option>
              {segments.map((segment) => (
                <option key={segment} value={segment}>{segment}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleChartToggle}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Toggle Price Comparison Chart
          </button>

          <AnimatePresence>
            {showChart && selectedSegment && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6"
              >
                <PriceComparisonChart data={filteredData.sort((a, b) => a.price - b.price)} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

export default App;
