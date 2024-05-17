import React, { useState } from 'react';
import Papa from 'papaparse';
import Pagination from './Pagination';
import myimg from './image-upload-concept-illustration_114360-798.avif';
import { IoCloudUploadSharp } from "react-icons/io5";

export default function NewComponent() {
  const [csvData, setCsvData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const[percentage,setpercent]=useState(0)
  const itemsPerPage = 10;
  const BasePrice = 30;
  const PricePerCreditLine = 3;
  const PricePerCreditScorePoint = 2;

  const close = () => {
    setCsvData([]);
    setpercent(0);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const csv = event.target.result;
      Papa.parse(csv, {
        complete: (result) => {
          console.log('Parsed CSV:', result.data);
          setCsvData(result.data);
        },
        header: true
      });
    };

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentLoaded = Math.round((event.loaded / event.total) * 100);
        console.log(`${percentLoaded}% loaded`);
        setpercent(percentLoaded)
        // Update progress bar or display percentage here
      }
    };

    reader.readAsText(file);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = csvData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className=' container flex p-4 gap-4 items-center justify-center'>
      {csvData.length === 0 ? (
        <div className='  flex-row space-between gap-60 md: flex flex-row gap-2'>
          <img className='rounded-5' src={myimg} />
          <div className='flex flex-col justify-center items-center'>
            <h1 className="text-3xl font-bold text-gray-900 flex">Upload CSV File : <IoCloudUploadSharp /></h1>
            <input className='m-5 h-9' type="file" onChange={handleFileUpload} accept=".csv" />
            <div  className='rounded w-48  h-8 flex justify-center items-center bg-black text-start text-white'>{percentage} %</div>
          </div>
        </div>
      ) : null}

      {csvData.length > 0 && (
        <div>
          <h2 className='flex items-center justify-center'>CSV Data:</h2>
          <table className='border-2'>
            <thead>
              <tr className='bg-slate-900 text-white'>
                <th className='m-3 p-3'>Email</th>
                <th className='m-3 p-3'>Name</th>
                <th className='m-3 p-3'>Credit Score</th>
                <th className='m-3 p-3'>Credit Lines</th>
                <th className='m-3 p-3'>Masked Phone Number</th>
                <th className='m-3 p-3'>subscription</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index} className='bg-slate-100 hover:bg-slate-300'>
                  <td className='m-3 p-3'>{item.Email}</td>
                  <td className='m-3 p-3'>{item.Name}</td>
                  <td className='m-3 p-3'>{item.CreditScore}</td>
                  <td className='m-3 p-3'>{item.CreditLines}</td>
                  <td className='m-3 p-3'>{item.MaskedPhoneNumber}</td>
                  <td className='m-3 p-3'>{BasePrice + (PricePerCreditLine * item.CreditLines) + (PricePerCreditScorePoint * item.CreditScore)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={csvData.length}
            paginate={paginate}
            currentPage={currentPage}
            onclose={close}

          />
        </div>
      )}
    </div>
  );
}
