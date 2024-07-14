import React from 'react'
import styled from 'styled-components';
import FilterForm from './FilterForm';
import { useDispatch, useSelector } from 'react-redux';
import { filterRowData, sortRowsData } from '../../utils/indes';
import { setCloseForm, setFormCriteria, setOpenForm } from '../../store/Reducers/tableReducer';

const ButtonContainer = styled.div`
//   position: fixed;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  width: 110px;
  height: 50px;

  &:hover {
    background-color: #0056b3;
  }
`;
const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Adjust as needed */
  align-items: center;
  height: 260px; /* Example height */
  background-color: #f0f0f0;
  padding: 10px;
`;
const CenterDiv = styled.div`
  /* Style for centered div */
  margin: 0 auto; /* Centers the div horizontally */
`;
const Header = () => {
    const { headersData, rowsData, sortCriteria, filterCriteria, isOpenForm } = useSelector(state => state.table);
    const dispatch = useDispatch();
    const sortRows = sortRowsData(rowsData, sortCriteria);
    const filterRows = filterRowData(headersData, sortRows, filterCriteria);

    const renamingData = { id: 11, name: "jon", email: "abc@aa.com", address: "240 sector", age: 28, date: '2024-12-31' };
    const fieldData = [
        {
            id: "1",
            header: "name",
            color: "red",
            index: "1",
            order: 1,
            width: 200,
        },
        {
            id: "2",
            color: "green",
            index: "2",
            header: "email",
            order: 2,
            width: 200,
        },
        {
            id: "3",
            header: "address",
            color: "blue",
            index: "3",
            order: 3,
            width: 200,
        },
        {
            id: "4",
            header: "age",
            color: "black",
            index: "4",
            order: 4,
            width: 200,
        },
        {
            id: "5",
            header: "date",
            color: "brown",
            index: "5",
            order: 5,
            width: 200,
        },
        {
            id: "6",
            header: "abc",
            color: "pink",
            index: "6",
            order: 6,
            width: 200,
        }
    ];

    const handleCreateData = () => {
        // dispatch(setCloseForm()); 
        const criteria = {
            formType: "CREATE",
            formFields: headersData,
            formData: {},
            isRequired: true,
        }
        dispatch(setFormCriteria(criteria));
        console.log("Criteria ", criteria);
        dispatch(setOpenForm(true));
    };


    const handleFilterData = () => {
        // dispatch(setCloseForm()); 

        const criteria = {
            formType: "FILTER",
            formFields: headersData,
            formData: {},
            isRequired: false,
        }
        dispatch(setFormCriteria(criteria));
        console.log("Criteria ", criteria);
        dispatch(setOpenForm(true));
    };

    const handleUpdateData = (e) => {
        // dispatch(setCloseForm()); 
        const criteria = {
            formType: "UPDATE",
            formFields: headersData,
            formData: rowsData[0],
            isRequired: true,
        }
        dispatch(setFormCriteria(criteria));
        console.log("Criteria ", criteria);
        dispatch(setOpenForm(true));
    };
    const onCancel = () => {
        console.log('close is called');
    }
    return (
        <FlexContainer>
            <ButtonContainer>
                <StyledButton onClick={handleCreateData}>Create Data</StyledButton>
                <StyledButton onClick={handleFilterData}>Filter Data</StyledButton>
            </ButtonContainer>
            <CenterDiv>
                {isOpenForm && <FilterForm />}
            </CenterDiv>
        </FlexContainer>

    )
}

export default Header;