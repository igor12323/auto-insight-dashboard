import React, { useState } from "react";
import DataTable from "./components/DataTable";
import PriceComparisonChart from "./components/PriceComparisonChart";
import ExportCSV from "./components/ExportCSV";
import logoImage from './AutoComplete1.jpg';
import backImage from './background.png';
import { motion, AnimatePresence } from "framer-motion";
import { BarChart4, Download, SlidersHorizontal } from "lucide-react";

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
  const [section, setSection] = useState<string>("");
  const [theme, setTheme] = useState<string>("dark");
  const [language, setLanguage] = useState<string>("en");
  const [showCompareTable, setShowCompareTable] = useState<boolean>(false);

  const handleCompareClick = () => {
    if (selectedModel1 !== null && selectedModel2 !== null) {
      setShowCompareTable(true);
    }
  };

  const handleChartToggle = () => {
    setShowChart(!showChart);
  };

  const handleModelChange = (setter: Function, value: string) => {
    setter(Number(value));
    setShowCompareTable(false);
  };

  const t = (en: string, pl: string) => language === "en" ? en : pl;
  const segments = Array.from(new Set(carData.map((car) => car.segment)));

  const filteredData = selectedSegment
    ? carData.filter((car) => car.segment === selectedSegment)
    : [];

  return (
    <div
      className={`p-6 transition-colors duration-500 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
      style={{
        backgroundImage: theme === "dark" ? `url(${backImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <img
          src={logoImage}
          alt="Logo"
          className="w-32 h-16 cursor-pointer"
          onClick={() => {
            setSection("");
            setSelectedModel1(null);
            setSelectedModel2(null);
            setShowCompareTable(false);
          }}
        />
        <div className="flex gap-4">
          <button onClick={() => setSection("export")} className="flex items-center gap-1 text-sm font-semibold hover:underline">
            <Download size={16} /> {t("Export", "Eksport")}
          </button>
          <button onClick={() => setSection("compare")} className="flex items-center gap-1 text-sm font-semibold hover:underline">
            <SlidersHorizontal size={16} /> {t("Compare", "Porównaj")}
          </button>
          <button onClick={() => setSection("chart")} className="flex items-center gap-1 text-sm font-semibold hover:underline">
            <BarChart4 size={16} /> {t("Chart", "Wykres")}
          </button>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border rounded p-1 text-sm bg-white text-black">
            <option value="en">EN</option>
            <option value="pl">PL</option>
          </select>
          <select value={theme} onChange={(e) => setTheme(e.target.value)} className="border rounded p-1 text-sm bg-white text-black">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      {/* Export Section */}
      <AnimatePresence>
        {section === "export" && (
          <motion.section
            key="export"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="rounded p-6 shadow-lg bg-opacity-80"
          >
            <h2 className="text-xl font-semibold mb-4">{t("Export Data to CSV", "Eksportuj dane do CSV")}</h2>
            <div className="mt-4">
              <label className="mr-2">{t("Select Brand:", "Wybierz markę:")}</label>
              <select
                className="p-2 border border-gray-300 text-black"
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">--{t("Select", "Wybierz")}--</option>
                {Array.from(new Set(carData.map((car) => car.brand))).map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            {selectedBrand && (
              <ExportCSV data={carData.filter((car) => car.brand === selectedBrand)} />
            )}
          </motion.section>
        )}

        {section === "compare" && (
          <motion.section
            key="compare"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="rounded p-6 shadow-lg bg-opacity-80"
          >
            <h2 className="text-xl font-semibold mb-4">{t("Compare Car Models", "Porównaj modele samochodów")}</h2>
<div className="mt-4 flex flex-col md:flex-row gap-4">
  <select
    className="p-2 border border-gray-300 text-black w-full md:w-1/2"
    onChange={(e) => handleModelChange(setSelectedModel1, e.target.value)}
  >
    <option value="">--{t("Select Model 1", "Wybierz Model 1")}--</option>
    {carData.map((car, index) => (
      <option key={car.id} value={index}>
        {car.model} ({car.brand})
      </option>
    ))}
  </select>
  <select
    className="p-2 border border-gray-300 text-black w-full md:w-1/2"
    onChange={(e) => handleModelChange(setSelectedModel2, e.target.value)}
  >
    <option value="">--{t("Select Model 2", "Wybierz Model 2")}--</option>
    {carData.map((car, index) => (
      <option key={car.id} value={index}>
        {car.model} ({car.brand})
      </option>
    ))}
  </select>
</div>            <button
              onClick={handleCompareClick}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              {t("Compare Models", "Porównaj modele")}
            </button>

            {showCompareTable && selectedModel1 !== null && selectedModel2 !== null && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[selectedModel1, selectedModel2].map((index) => (
                  <div key={index} className="bg-white p-4 rounded shadow text-black">
                    <h4 className="font-bold text-lg">{carData[index].model}</h4>
                    <p>{t("Brand", "Marka")}: {carData[index].brand}</p>
                    <p>{t("Segment", "Segment")}: {carData[index].segment}</p>
                    <p>{t("Price", "Cena")}: ${carData[index].price}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.section>
        )}

        {section === "chart" && (
          <motion.section
            key="chart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="rounded p-6 shadow-lg bg-opacity-80"
          >
            <h2 className="text-xl font-semibold mb-4">{t("Price Comparison Chart", "Wykres porównania cen")}</h2>
            <select
              className="p-2 border border-gray-300 text-black"
              onChange={(e) => setSelectedSegment(e.target.value)}
            >
              <option value="">--{t("Select Segment", "Wybierz segment")}--</option>
              {segments.map((segment) => (
                <option key={segment} value={segment}>
                  {segment}
                </option>
              ))}
            </select>
            <button
              onClick={handleChartToggle}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              {t("Toggle Chart", "Pokaż wykres")}
            </button>
            {showChart && selectedSegment && (
		<div className="mt-4 px-6 py-2 bg-blue-100 bg-opacity-80 text-black rounded">
              <PriceComparisonChart
                data={filteredData.sort((a, b) => a.price - b.price)}
              /></div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
