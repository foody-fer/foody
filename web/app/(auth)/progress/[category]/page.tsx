"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Link from "next/link";
import { apiCall } from "~/api";
import { IoTrashBinOutline } from "react-icons/io5";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type Category = "weight" | "waist" | "thighs" | "hips" | "arms" | "neck";

export default function ProgressPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = React.use(params);

  const [selectedCategory, setSelectedCategory] = useState<any>(category);

  const [data, setData] = useState<
    { id: number; key: string; value: number; date: string }[]
  >([]);

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

  const fetchMeasurements = async () => {
    try {
      const response = await apiCall(`/measurements`, {
        method: "GET",
      });

      if (Array.isArray(response[0])) {
        const transformedData = response[0]
          .filter((item) => item.key === selectedCategory) // uzimamo iz response-a samo one koji su za selectedCategory
          .map((item) => ({
            id: item.id,
            key: item.key,
            value: item.value,
            date: new Date(item.recorded_at)
              .toLocaleDateString("en-GB")
              .replace(/\//g, "."),
          }));

        setData(transformedData);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching measurements:", error);
    }
  };

  useEffect(() => {
    fetchMeasurements();
  }, [selectedCategory]);

  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Progress",
        data: data.map((entry) => entry.value),
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
        ticks: {
          callback: function (value: number | string) {
            return `${value} ${selectedCategory === "weight" ? "kg" : "cm"}`;
          },
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          title: (tooltipItems: { dataIndex: any }[]) => {
            const index = tooltipItems[0].dataIndex;
            return data[index].date;
          },
          label: (tooltipItem: { raw: any }) => {
            const value = tooltipItem.raw;
            return `Progress: ${value} ${selectedCategory === "weight" ? "kg" : "cm"}`;
          },
        },
      },
    },
  };

  const handleValueDelete = async (id: number): Promise<void> => {
    try {
      const [data, status] = await apiCall(`/measurements/${id}`, {
        method: "DELETE",
      });

      if (status === 200) {
        //uspjesno brisanje (status 200)
        await fetchMeasurements(); // ponovo zovemo ovo da dobijemo fresh podatke
      } else {
        console.error("Failed to delete measurement");
      }
    } catch (error) {
      console.error("Došlo je do pogreške:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen mt-5 mb-5">
      <p className="text-textColor font-semibold text-lg before:content-['•'] before:mr-2 ml-8 md:ml-32 lg:ml-48">
        Select the category:
      </p>

      <div className="flex flex-wrap gap-2 mt-2 ml-8 md:ml-32 lg:ml-48">
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
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white p-3 rounded-lg shadow-md w-52 md:ml-12 lg:ml-6 max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-resedaGreen scrollbar-track-transparent">
          {data.length > 0 ? (
            data.map((entry, index) => (
              <div key={index} className="flex items-center mb-2">
                <div className="w-2.5 h-2.5 bg-[#718355] rounded-full mr-2"></div>
                <div>
                  <p className="text-sm font-bold text-[#373737]">
                    {entry.value} {selectedCategory === "weight" ? "kg" : "cm"}
                  </p>
                  <p className="text-xs text-[#575A4B]">{entry.date}</p>
                </div>

                <IoTrashBinOutline
                  onClick={() => handleValueDelete(entry.id)}
                  className="ml-16 w-5 h-5 text-red-500 hover:scale-125 transition duration-300 cursor-pointer"
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-red-500 text-center font-semibold">
              No data available for this category yet.
            </p>
          )}
        </div>

        <Link
          href={`/log-progress/${selectedCategory}`}
          className="no-underline md:ml-12 lg:ml-6"
        >
          <button className="mt-6 py-3 w-80 rounded-full bg-[#718355] text-white font-bold">
            Log Progress
          </button>
        </Link>
      </div>
    </div>
  );
}
