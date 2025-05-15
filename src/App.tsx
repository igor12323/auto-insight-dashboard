import React, { useEffect, useState } from "react";
import DataTable from "./components/DataTable";
import PriceComparisonChart from "./components/PriceComparisonChart";
import ExportCSV from "./components/ExportCSV";
import logoImage from './AutoComplete1.jpg';
import backImage from './background.png';
import dataset from './Dane.txt';
import { motion, AnimatePresence } from "framer-motion";
import { BarChart4, Download, SlidersHorizontal } from "lucide-react";

interface CarModel {
  id: number;
  model: string;
  brand: string;
  engine: string;
  segment: string;
  price: number;
}

const App: React.FC = () => {
  const [carData, setCarData] = useState<CarModel[]>([]);
   useEffect(() => {
  fetch(dataset)
    .then((res) => res.text())
    .then((text) => {
      const lines = text.split("\n");
      const parsed = lines.map((line, index) => {
        const [brand, model, engine, price] = line.trim().split(";");
        return {
          id: index + 1,
          brand,
          model,
          engine,
          segment: 'SUV',
          price: Number(price),
        };
      });
      setCarData(parsed);
      })
      .catch((err) => console.error("Błąd wczytywania danych:", err));
  }, []);

  const t = (en: string, pl: string) => language === "en" ? en : pl;
  const segments = Array.from(new Set(carData.map((car) => car.segment)));

  const filteredData = selectedSegment
    ? carData.filter((car) => car.segment === selectedSegment)
    : [];

  const getModels = (brand: string) => Array.from(new Set(carData.filter(c => c.brand === brand).map(c => c.model)));
  const getEngines = (model: string) => Array.from(new Set(carData.filter(c => c.model === model).map(c => `${c.engine} (${c.segment}) - ${c.price}`)));

  const handleSelectChange = (index: number, field: string, value: string) => {
    const updated = [...selectedModels];
    updated[index] = {
      ...updated[index],
      [field]: value,
      ...(field === 'brand' ? { model: '', engine: '' } : field === 'model' ? { engine: '' } : {})
    };
    setSelectedModels(updated);
    setShowCompareTable(false);
  };

  const getCarDetails = (selected: { brand: string; model: string; engine: string }) => {
    return carData.find(c => c.brand === selected.brand && c.model === selected.model && selected.engine.includes(c.engine));
  };

  const handleCompareClick = () => {
    if (selectedModels.every(sel => sel.brand && sel.model && sel.engine)) {
      setShowCompareTable(true);
    }
  };

  return (
    <div
      className={`px-4 py-6 transition-colors duration-500 min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
      style={{
        backgroundImage: theme === "dark" ? `url(${backImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <img
          src={logoImage}
          alt="Logo"
          className="h-12 sm:h-16 w-auto cursor-pointer"
          onClick={() => {
            setSection("");
            setSelectedModels([
              { brand: '', model: '', engine: '' },
              { brand: '', model: '', engine: '' }
            ]);
            setShowCompareTable(false);
          }}
        />
        <div className="flex flex-wrap gap-2 sm:gap-4">
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

      <AnimatePresence>
        {section === "compare" && (
          <motion.section
            key="compare"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="rounded p-4 sm:p-6 shadow-lg bg-opacity-80"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4">{t("Compare Car Models", "Porównaj modele samochodów")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedModels.map((item, index) => (
                <div key={index} className="space-y-2">
                  <select className="w-full p-2 border border-gray-300 text-black rounded" value={item.brand} onChange={(e) => handleSelectChange(index, 'brand', e.target.value)}>
                    <option value="">--{t("Select Brand", "Wybierz markę")}--</option>
                    {[...new Set(carData.map((c) => c.brand))].map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                  <select className="w-full p-2 border border-gray-300 text-black rounded" value={item.model} onChange={(e) => handleSelectChange(index, 'model', e.target.value)}>
                    <option value="">--{t("Select Model", "Wybierz model")}--</option>
                    {getModels(item.brand).map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                  <select className="w-full p-2 border border-gray-300 text-black rounded" value={item.engine} onChange={(e) => handleSelectChange(index, 'engine', e.target.value)}>
                    <option value="">--{t("Select Engine Version", "Wybierz wersję silnikową")}--</option>
                    {getEngines(item.model).map((engine) => (
                      <option key={engine} value={engine}>{engine}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <button onClick={handleCompareClick} className="mt-6 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-700">
              {t("Compare", "Porównaj")}
            </button>

            {showCompareTable && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedModels.map((selected, idx) => {
                  const car = getCarDetails(selected);
                  return car ? (
                    <div key={idx} className="bg-white p-4 rounded shadow text-black">
                      <h4 className="font-bold text-lg">{car.model}</h4>
                      <p>{t("Brand", "Marka")}: {car.brand}</p>
                      <p>{t("Segment", "Segment")}: {car.segment}</p>
                      <p>{t("Price", "Cena")}: ${car.price}</p>
                    </div>
                  ) : (
                    <div key={idx} className="text-red-600">{t("Incomplete selection", "Niepełny wybór")}</div>
                  );
                })}
              </div>
            )}
          </motion.section>
        )}

        {section === "export" && (
          <motion.section
            key="export"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="rounded p-4 sm:p-6 shadow-lg bg-opacity-80"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4">{t("Export Data to CSV", "Eksportuj dane do CSV")}</h2>
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

        {section === "chart" && (
          <motion.section
            key="chart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="rounded p-4 sm:p-6 shadow-lg bg-opacity-80"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4">{t("Price Comparison Chart", "Wykres porównania cen")}</h2>
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
              onClick={() => setShowChart(!showChart)}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              {t("Toggle Chart", "Pokaż wykres")}
            </button>
            {showChart && selectedSegment && (
              <PriceComparisonChart data={filteredData.sort((a, b) => a.price - b.price)} />
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
