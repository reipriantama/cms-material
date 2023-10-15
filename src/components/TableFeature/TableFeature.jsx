import React, { useEffect, useState } from "react";
import api from "../../api";
import BootstrapTable from "react-bootstrap-table-next";
import moment from "moment";
import styles from "./TableFeature.module.css";
import paginationFactory from "react-bootstrap-table2-paginator";


const TableFeature = () => {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5); // Misalnya, ukuran halaman 10

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSizePerPageChange = (newSizePerPage) => {
    setSizePerPage(newSizePerPage);
    setPage(1);
  };

  function formatRupiah(angka) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(angka);
  }

  const formatDate = (date) => {
    return moment(date).format("DD MMMM YYYY");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getOrder({});
        if (response.status === 200) {
          // Jika respons sukses
          const orderData = response.data.orders;
          setTableData(orderData); // Mengatur data tabel dengan hasil respons
          console.log(orderData);
        } else {
          console.error("Gagal mengambil data getOrder");
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      dataField: "index",
      text: "No",
      sort: true,
      formatter: (cell, row, rowIndex) => rowIndex + 1,
    },
    {
      dataField: "User.email",
      text: "User Email",
      sort: true,
    },
    {
      dataField: "Car",
      text: "Car",
      sort: true,
      formatter: (cell) => {
        return cell ? cell: "car" 
      }
    },
    {
      dataField: "start_rent_at",
      text: "Start Rent",
      sort: true,
      formatter: (cell) => formatDate(cell),
    },
    {
      dataField: "finish_rent_at",
      text: "Finish Rent",
      sort: true,
      formatter: (cell) => formatDate(cell),
    },
    {
      dataField: "total_price",
      text: "Price",
      sort: true,
      formatter: (cell, row) => formatRupiah(cell),
    },
    {
      dataField: "category",
      text: "Category",
      sort: true,
      formatter: (cell) => {
        return cell ? cell: "Category" 
      }
    },
  ];

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableDashboard}>Dashboard</div>
      <div className={styles.tablesListOrder}>
        <div className={styles.tablesIcon}></div>
        <div>List Order</div>
      </div>
      <BootstrapTable
        keyField="id"
        data={tableData}
        columns={columns}
        striped
        hover
        condensed
        pagination={paginationFactory({
          page,
          sizePerPage,
          onPageChange: handlePageChange,
          onSizePerPageChange: handleSizePerPageChange,
          sizePerPageList: [
            { text: "3", value: 3 },
            { text: "5", value: 5 },
            { text: "10", value: 10 },
          ],
        })}
      />
    </div>
  );
};

export default TableFeature;
