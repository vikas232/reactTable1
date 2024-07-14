import React from 'react'
import FilterForm from '../components/searchBar/FilterForm';
import Table from '../components/table/Table';
import { useSelector } from 'react-redux';
import { filterRowData, sortRowsData } from '../utils/indes';
import Header from '../components/searchBar/Header';


const MainLayout = () => {
  const { headersData, rowsData , sortCriteria , filterCriteria} = useSelector(state => state.table);
  const sortRows = sortRowsData(rowsData , sortCriteria);
  const filterRows =  filterRowData( headersData , sortRows,filterCriteria);
  

  return (
    <>
      <Header/>
      {/* <FilterForm data={fieldData} /> */}
      <Table header={headersData} rows={filterRows} />
    </>
  )
}

export default MainLayout;