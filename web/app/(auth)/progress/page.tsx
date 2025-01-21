"use client"
import React, { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement,LineElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import Link from "next/link";

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend );

type Category = "weight" | "waist" | "thighs" | "hips" | "arms" | "neck";

export default function ProgressPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("weight");

  const categories: Category[] = [
    "weight",
    "waist",
    "thighs",
    "hips",
    "arms",
    "neck",
  ];

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Progress",
        data: [30, 37, 40, 69, 70, 45],
        backgroundColor: "rgba(113, 131, 85, 0.2)",
        borderColor: "rgba(113, 131, 85, 1)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen mt-5 mb-5">
      <p className="text-textColor font-semibold text-lg before:content-['•'] before:mr-2 ml-8 md:ml-32 lg:ml-40">
        Select the category:
      </p>

      <div className="flex flex-wrap gap-2 mt-2 ml-8 md:ml-32 lg:ml-40">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`py-2 w-20 md:w-16 lg:w-20 rounded-full ${
              selectedCategory === category
                ? "bg-[#575A4B] text-white font-bold"
                : "bg-[#718355] text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center">
        <div className="w-5/6 mt-12 md:ml-20 lg:ml-28">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="h-80">
              <Line data={chartData} options={chartOptions}/>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white p-4 rounded-lg shadow-md w-52 md:ml-12 lg:ml-6">
          {[
            { value: "24 cm", date: "15.3.2025" },
            { value: "30 cm", date: "20.5.2025" },
            { value: "31 cm", date: "21.7.2025" },
          ].map((entry, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="w-2.5 h-2.5 bg-[#718355] rounded-full mr-2"></div>
              <div>
                <p className="text-sm font-bold text-[#373737]">{entry.value}</p>
                <p className="text-xs text-[#575A4B]">{entry.date}</p>
              </div>
            </div>
          ))}
        </div>

        <Link href={`/log-progress/${selectedCategory}`} className="no-underline md:ml-12 lg:ml-6">
          <button className="mt-6 py-3 w-80 rounded-full bg-[#718355] text-white font-bold">
            Log Progress
          </button>
        </Link>
      </div>
    </div>
  );
};