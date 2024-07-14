import React, { useEffect, useRef, useState } from 'react'
import throttle from 'lodash.throttle';
import THeader from './TableHeader';
import Rows from './Rows';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { updateHeadersData } from '../../store/Reducers/tableReducer';
import './style.css'
import { TableContainer, TableRow, TableStyle, Wrapper } from './style';
const Table = ({ header, rows }) => {
  const dispatch = useDispatch();
  const [dragId, setDragId] = useState();
  let inputref = useRef(
    {
      initalx: 0, finalx: 0, isMouseDown: false, initalWidth: 0,
      currId: null,
    }
  );
  let headercopy = _.cloneDeep(header);
  const handleDrag = (ev) => {
    setDragId(ev.currentTarget.id);
  };

  const handleDrop = (ev) => {
    const dragBox = headercopy.find((box) => box.id === dragId);
    const dropBox = headercopy.find((box) => box.id === ev.currentTarget.id);
    const dragBoxOrder = dragBox.order;
    const dropBoxOrder = dropBox.order;

    const newBoxState = headercopy.map((box) => {
      if (box.id === dragId) {
        box.order = dropBoxOrder;
      }
      if (box.id === ev.currentTarget.id) {
        box.order = dragBoxOrder;
      }
      return box;
    });
    dispatch(updateHeadersData(newBoxState));
  };

  const changeWidth = () => {
    const newWidth = (inputref.current.finalx - inputref.current.initalx);
    if ((inputref.current.isMouseDown)) {
      const updateHeader = headercopy.map(box => {
        return box.id === inputref.current.currId ? { ...box, width: inputref.current.initalWidth + newWidth } : box
      }
      )
      dispatch(updateHeadersData(updateHeader));
    }
  }
  const throttledChangeWidth = throttle(changeWidth, 50);
  useEffect(() => {
    const onMouseDown = (e) => {
      if (e.target.id.includes('col_')) {
        const id = e.target.id.split('col_').pop();
        inputref.current.currId = id;
        inputref.current.initalx = e.clientX;
        inputref.current.isMouseDown = true;

        const ww = header.find(box => box.id === inputref.current.currId);
        inputref.current.initalWidth = ww.width;
      }
    }

    const onMouseMove = (e) => {
      throttledChangeWidth();
      inputref.current.finalx = e.clientX;
    }
    const onMouseUp = (e) => {
      inputref.current.isMouseDown = false;
    }
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }
  }, [header, throttledChangeWidth]);

  return (
    <TableContainer>
      <Wrapper>
      <TableStyle>
        <thead>

        <TableRow  >
          {headercopy
            .sort((a, b) => a.order - b.order)
            .map((box) => (
              <THeader
                key={box.id}
                boxColor={box.color}
                id={box.id}
                handleDrag={handleDrag}
                handleDrop={handleDrop}
                width={box.width}
                headerName={box.header}
              />
            ))}
        </TableRow>
        </thead>
        <tbody>
        {
          rows.map((row) => (
            <Rows rowsdata={row} key={row.id} headerdata={headercopy} />
          ))
        }
        </tbody>
      </TableStyle>
      </Wrapper>
    </TableContainer>
  );

}

export default Table