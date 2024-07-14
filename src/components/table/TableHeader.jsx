import React, { useEffect, useState } from "react";
import './style.css'
import { CellContent, TableCell, TableRow, WidthDiv } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { updateSortCriteria } from "../../store/Reducers/tableReducer";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { FaArrowsLeftRightToLine } from "react-icons/fa6";

const TableHeader = ({ boxColor, id, handleDrag, headerName, handleDrop, width }) => {

  //TODO: need to convert into style components 
  const { sortCriteria } = useSelector(state => state.table);
  const [desc, setDesc] = useState(false);
  const showArrow = sortCriteria.column === headerName;
  const dispatch = useDispatch();
  const Style = {
    backgroundColor: boxColor,
    border: "1px solid",
    borderColor: boxColor,
    borderRadius: "5px",
    color: "#FFF",
    width: `${width}px`,
    height: "40px",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flex: '1',
  };

  const handleClick = () => {
    setDesc(!desc);
    dispatch(updateSortCriteria({ column: `${headerName}`, desc: desc }));
    console.log("handleClick");
  }

  return (
    <th >
      <div className="header-cell">
        <div
          draggable={true}
          id={id}
          onDragOver={(ev) => ev.preventDefault()}
          onDragStart={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
          style={Style}
        >
          {headerName.toUpperCase()}
          <span className="right">
            {showArrow && (desc ? < MdArrowUpward /> : <MdArrowDownward />)}
          </span>
        </div>
        <WidthDiv
          id={`col_${id}`}
        >
          <FaArrowsLeftRightToLine id={`col_${id}`} />
        </WidthDiv>
      </div>
    </th>
  );
};

export default TableHeader;
