import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import styles from "./ChartFeature.module.css";
import moment from "moment";
import ReactApexChart from "react-apexcharts";
import api from "../../api";

const ChartFeature = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("Pilih Bulan");
  const [chartData, setChartData] = useState([]);

  const months = moment.months();
  const years = [2023];

  useEffect(() => {
    if (selectedMonth !== "" && selectedYear !== "Pilih Bulan") {
      // Fetch data dari API atau sumber data Anda
      // Misalnya, ambil data untuk grafik dari API
      const fromDate = moment(`${selectedYear}-${selectedMonth}-01`).format(
        "YYYY-MM-DD"
      );
      const untilDate = moment(`${selectedYear}-${selectedMonth}-31`).format(
        "YYYY-MM-DD"
      );

      // Mengambil data dari API menggunakan fungsi getReports
      api
        .getReports({ from: fromDate, until: untilDate })
        .then((response) => {
          const dailyReports = response.data;
          console.log(dailyReports);
          const orderCounts = dailyReports.map((report) => ({
            x: moment(report.day, "YYYY-MM-DD").format("DD"),
            y: report.orderCount,
          }));
          setChartData(orderCounts);
        })
        .catch((error) => {
          console.error("Error fetching data from API:", error);
        });
    }
  }, [selectedMonth, selectedYear]);

  const handleGoClick = () => {
    // Panggil useEffect lagi untuk mengambil data baru dari API
    // Misalnya, navigasi ke halaman lain atau memproses data
    console.log(`Anda memilih bulan: ${selectedMonth} ${selectedYear}`);
  };

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },

    yaxis: {
      title: {
        text: "Amount of Car Rented",
        styles: {
          fontFamily: "arial",
          fontSize: "12px",
        },
      },
    },
    xaxis: {
      title: {
        text: "Date",
        styles: {
          fontFamily: "arial",
          fontSize: "12px",
        },
      },
    },
    fill: {
      opacity: 1,
    },
  };

  const chartSeries = [
    {
      name: "Daily Orders",
      data: chartData,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.dashboardChart}>
        <div className={styles.dashboardVisualization}>
          <div className={styles.dashboardIcon}></div>
          <div>Rented Car Data Visualization</div>
        </div>

        <Dropdown className={styles.dropDownWrap}>
          <div
            style={{
              fontFamily: "Arial",
              fontSize: "12px",
              marginBottom: "8px",
            }}
          >
            Month
          </div>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className={styles.monthDrop}
          >
            {selectedMonth} {selectedYear}
          </Dropdown.Toggle>
          {/* Tombol "Go" akan selalu muncul */}
          <Button
            className={styles.buttonGo}
            variant="primary"
            onClick={handleGoClick}
          >
            Go
          </Button>

          <Dropdown.Menu className={styles.dropDownMenu}>
            {years.map((year) => (
              <React.Fragment key={year}>
                {months.map((month, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => {
                      setSelectedMonth(month);
                      setSelectedYear(year);
                    }}
                  >
                    {month} {year}
                  </Dropdown.Item>
                ))}
              </React.Fragment>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {/* Tampilkan grafik jika data tersedia */}
        {chartData.length > 0 && (
          <div id="chart">
            <ReactApexChart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={350}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartFeature;
