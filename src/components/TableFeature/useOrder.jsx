import React, { useEffect, useState } from 'react'
import api from '../../api';

const useOrder = ({page, sizePerPage}) => {
  const [paginationData, setPaginationData] = useState({page:1, pageSize:5, pageCount:1, count:5, orders:[]})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getOrder({page:page, pageSize:sizePerPage});
        if (response.status === 200) {
          // Jika respons sukses
          setPaginationData(response.data)
          // setPage(response.data.page)
        } else {
          console.error("Gagal mengambil data getOrder");
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };
    fetchData();
  }, [sizePerPage, page]);

  return {
    data:paginationData,
    orders:paginationData.orders
  }
}

export default useOrder