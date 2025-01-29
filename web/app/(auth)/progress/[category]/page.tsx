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
import { RxCross2 } from "react-icons/rx";
import { SiTicktick } from "react-icons/si";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type Category = "weight" | "waist" | "thighs" | "hips" | "arms" | "neck";

type Measurement = {
  id: number;
  key: string;
  value: number;
  date: string;
  month: string;
  year: string;
  timestamp: number;
};

export default function ProgressPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = React.use(params);
  const [selectedCategory, setSelectedCategory] = useState<any>(category);
  const [data, setData] = useState<Measurement[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [months, setMonths] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [showWholeYear, setShowWholeYear] = useState<boolean>(false);
  const mediaQuery = window.matchMedia("(max-width: 767px)"); // Sve ekrane manja od 768px(md)
  const [isSmallScreen, setIsSmallScreen] = useState(mediaQuery.matches);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(mediaQuery.matches);
    };

    mediaQuery.addListener(handleResize);
    return () => {
      mediaQuery.removeListener(handleResize);
    };
  }, []);

  const displayTicks = isSmallScreen ? false : showWholeYear ? false : true;

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
      const response = await apiCall(`/measurements`, { method: "GET" });
      if (Array.isArray(response[0])) {
        const transformedData = response[0]
          .filter((item) => item.key === selectedCategory)
          .map((item) => ({
            id: item.id,
            key: item.key,
            value: item.value,
            date: new Date(item.recorded_at)
              .toLocaleDateString("en-GB")
              .replace(/\//g, "."),
            month: new Date(item.recorded_at).toLocaleString("en-GB", {
              month: "long",
            }),
            year: new Date(item.recorded_at).getFullYear().toString(),
            timestamp: new Date(item.recorded_at).getTime(),
          }))
          .sort((a, b) => a.timestamp - b.timestamp);

        setData(transformedData);
        const uniqueMonths = [
          ...new Set(transformedData.map((item) => item.month)),
        ];
        const uniqueYears = [
          ...new Set(transformedData.map((item) => item.year)),
        ];
        setMonths(uniqueMonths);

        if (uniqueYears.length > 0) {
          setYears(uniqueYears);
          setSelectedYear(uniqueYears[0] || "");
        } else {
          const currentYear = new Date().getFullYear().toString();
          setYears([currentYear]);
          setSelectedYear(currentYear);
        }

        setSelectedMonth(uniqueMonths[0] || "");
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

  const filteredData = showWholeYear
    ? data.filter((entry) => entry.year === selectedYear)
    : data.filter(
        (entry) => entry.month === selectedMonth && entry.year === selectedYear
      );

  const chartData = {
    labels: filteredData.map((entry) => entry.date),
    datasets: [
      {
        label: "Progress",
        data: filteredData.map((entry) => entry.value),
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
        ticks: {
          display: displayTicks,
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
    <div className="flex flex-col min-h-screen mt-5 mb-5 pb-20 md:pb-0">
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

      <div className="flex flex-col items-center mt-4">
        <div className="flex gap-4 flex-col lg:flex-row items-center md:ml-14 lg:ml-28">
          {!showWholeYear && (
            <>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="p-2 border rounded-full bg-white shadow-md w-32"
              >
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="p-2 border rounded-full bg-white shadow-md w-32 lg:w-24"
              >
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </>
          )}

          <button
            onClick={() => setShowWholeYear(!showWholeYear)}
            className={`p-2 px-3 border-1 bg-white rounded-full shadow-md font-semibold ${
              showWholeYear
                ? "border-green-500 text-green-500"
                : "border-red-500 text-red-500"
            } flex items-center justify-center`}
          >
            Show progress for whole year {selectedYear}
            {showWholeYear ? (
              <SiTicktick className="w-5 h-5 ml-2" />
            ) : (
              <RxCross2 className="w-5 h-5 ml-2" />
            )}
          </button>
        </div>

        {filteredData.length > 0 ? (
          <div className="w-5/6 mt-3 md:ml-20 lg:ml-28">
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="h-80">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}

        <div className="mt-6 bg-white p-3 rounded-lg shadow-md w-52 max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-resedaGreen scrollbar-track-transparent md:ml-20">
          {filteredData.length > 0 ? (
            filteredData
              .slice()
              .reverse()
              .map((entry, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div className="w-2.5 h-2.5 bg-[#718355] rounded-full mr-2"></div>
                  <div>
                    <p className="text-sm font-bold text-[#373737]">
                      {entry.value}{" "}
                      {selectedCategory === "weight" ? "kg" : "cm"}
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
              No data available for {selectedMonth} in {selectedYear}.
            </p>
          )}
        </div>

        <Link
          href={`/log-progress/${selectedCategory}`}
          className="no-underline"
        >
          <button className="mt-6 py-3 w-80 rounded-full bg-[#718355] text-white font-bold md:ml-20">
            Log Progress
          </button>
        </Link>
      </div>
    </div>
  );
}
