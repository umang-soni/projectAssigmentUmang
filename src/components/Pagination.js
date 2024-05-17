import React, { useState } from 'react';
import { FiCornerDownLeft } from "react-icons/fi";
import { FiCornerDownRight } from "react-icons/fi";

export default function Pagination({ itemsPerPage, totalItems, paginate , onclose}) {
  const [currentPage, setCurrentPage] = useState(1);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    paginate(pageNumber);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      paginate(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      paginate(currentPage + 1);
    }
  };

  return (
    <div className="pagination flex gap-5 m-5">
      
        <button onClick={goToPrevPage} disabled={currentPage === 1} className='bg-slate-500 w-20 h-14 rounded hover:bg-slate-300 flex justify-center items-center'>
       <FiCornerDownLeft/>
        </button>
    <div className='bg-slate-500 w-20 h-14 rounded  flex items-center  justify-center ' >  {currentPage}</div>
     
      
        <button className='bg-slate-500 w-20 h-14 rounded hover:bg-slate-300 flex justify-center items-center' onClick={goToNextPage} disabled={currentPage === pageNumbers.length}>
        <FiCornerDownRight/>
        </button>
        
        <button className='bg-slate-500 w-20 h-14 rounded  hover:bg-slate-800' onClick={()=>{onclose()}} disabled={currentPage === pageNumbers.length}>
          close
        </button>
      
    </div>
  );
}

