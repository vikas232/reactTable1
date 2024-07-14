import styled from 'styled-components';

// export const TableContainer = styled.div`
//   margin-top: 20px;
//   position: absolute;
//   margin-left: 50px;
// `;

// export const TableStyle = styled.div`
//   display: table;
//   border-collapse: collapse;
//   width: 100%; /* Adjust as needed */
// `;

// export const TableRow = styled.ul`
//   display: table-row;
//   &:nth-child(even) {
//     background-color: #f9f9f9;
//   }
// `;
// export const Wrapper = styled.div`
//   overflow: auto; /* Enable scrolling */
//   max-width: 100%; /* Responsive max-width */
// `;

// export const TableCell = styled.li`
//   display: table-cell;
//   border: 1px solid #ddd;
//   padding: 8px;
//   text-align: left;

//   &.header {
//     font-weight: bold;
//     background-color: #f4f4f4;
//   }
// `;


export const WidthDiv = styled.div`
height: 40px;
width: 20px;
display: flex;
align-items: center;
background-color: burlywood;
margin-right: 5px;
`;



export const TableContainer = styled.div`
  margin: 20px auto; /* Center horizontally */
  width: 80%; /* Adjust width as needed */
  max-width: 1100px; /* Set a maximum width */
   /* Set a maximum height */
  height: 400px; /* Adjust height as needed */
  overflow: auto; /* Enable scrolling */
`;

export const Wrapper = styled.div`
  overflow: auto; /* Enable scrolling */
  height: 400px; 
`;

export const TableStyle = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
`;

export const TableRow = styled.tr`
  text-align: center;
  background-color: ${(props) => (props.even ? '#f9f9f9' : '#fff')};
`;

export const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: #333;
  background-color: ${(props) => (props.header ? '#f4f4f4' : '#f0f0f0')};
// `;


