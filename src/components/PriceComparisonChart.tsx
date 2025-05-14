import React from "react";
import { Bar } from "react-chartjs-2"; // Importujemy wykres słupkowy
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Rejestracja komponentów wykresu w Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface CarModel {
  model: string;
  price: number;
}

interface PriceComparisonChartProps {
  data: CarModel[];
}

const PriceComparisonChart: React.FC<PriceComparisonChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((car) => car.model), // Oś X - nazwy modeli
    datasets: [
      {
        label: "Price",
        data: data.map((car) => car.price),
        backgroundColor: "rgba(75, 192, 192, 1)", // Kolor słupków
        borderColor: "rgba(75, 192, 192, 1)", // Kolor obramowania słupków
        borderWidth: 1, // Grubość obramowania słupków
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Price Comparison by Model",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Model",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price",
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default PriceComparisonChart;


