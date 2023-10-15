import React, { useEffect, useState } from "react";
import api from "../../api";
import BootstrapTable from "react-bootstrap-table-next";
import moment from "moment";
import styles from "./TableFeature.module.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import useOrder from "./useOrder";
import { useMemo } from "react";


const TableFeature = () => {
  // const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(5); // Misalnya, ukuran halaman 10
  // const [paginationData, setPaginationData] = useState(null)


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await api.getOrder({page:page, pageSize:sizePerPage});
  //       if (response.status === 200) {
  //         // Jika respons sukses
  //         const orderData = response.data.orders;
  //         setPaginationData(response.data)
  //         setTableData(orderData); // Mengatur data tabel dengan hasil respons
  //         // setPage(response.data.page)
  //         console.log(orderData);
  //       } else {
  //         console.error("Gagal mengambil data getOrder");
  //       }
  //     } catch (error) {
  //       console.error("Terjadi kesalahan:", error);
  //     }
  //   };
  //   fetchData();
  // }, [sizePerPage, page]);

  
  const {data, orders} = useOrder({page,sizePerPage})
  

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSizePerPageChange = (newSizePerPage) => {
    setSizePerPage(newSizePerPage);
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
      {orders && <BootstrapTable
        keyField="id"
        data={orders}
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
            { text: "20", value: 20 },
          ],
          showTotal:true,
          alwaysShowAllBtns:true,
          totalSize:data.pageCount,
          lastPageText:'to the last',
          firstPageText:'to the first',
          nextPageText:'next',
          prePageText:'prev',
          withFirstAndLast:true
          
        })}
      />}
    </div>
  );
};

export default TableFeature;
