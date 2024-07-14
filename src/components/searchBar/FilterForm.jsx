import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import _ from 'lodash';
import styled from '@emotion/styled';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { addRowsData, setCloseForm, updateFilterCriteria, updateRowsData } from '../../store/Reducers/tableReducer';
import { generateRandomId } from '../../utils/indes';
import { Button, CancelButton, FormRow, FormWrapper } from './style';


const FilterForm = () => {
  const { formType, formData: updateData, formFields, isRequired, rowsData } = useSelector(state => state.table);
  const dispatch = useDispatch();
 

  const isAllFieldsRequired = isRequired;

  // Prepare initialValues and fields based on fieldData
  const initialValues = _.cloneDeep(updateData);
  const copyFormField = _.cloneDeep(formFields);
  const copyRowData = _.cloneDeep(rowsData);
  const fields = copyFormField.map(field => field.header);

  // Merge updateData into initialValues if updateData exists
  useEffect(() => {
    if (!_.isEmpty(updateData)) {
      fields.forEach(fieldName => {
        initialValues[fieldName] = updateData[fieldName] ?? '';
      });
    } else {
      fields.forEach(fieldName => {
        initialValues[fieldName] = ''; // Set empty initial values if updateData is empty
      });
    }
  }, [updateData, fields]);

  const validationSchema = () => {
    const schema = {};
    fields.forEach(key => {
      if (isAllFieldsRequired) {
        schema[key] = key === 'age'
          ? Yup.number().required(`${key} is required`).typeError(`${key} must be a number`)
          : key === 'date'
            ? Yup.date().required(`${key} is required`).typeError(`${key} must be a valid date`)
            : Yup.string().required(`${key} is required`);
      } else {
        schema[key] = key === 'age'
          ? Yup.number().typeError(`${key} must be a number`)
          : key === 'date'
            ? Yup.date().typeError(`${key} must be a valid date`)
            : Yup.string();
      }
    });
    return Yup.object(schema);
  };

  function changeRowData(rowsData, newData) {
    return rowsData.map(row => row.id === newData.id ? { ...row, ...newData } : row);
  }

  const convertDateFormat = (dateString) => {
    // Split the date string by '/'
    const [day, month, year] = dateString.split('/');
    // Rearrange to 'mm/dd/yyyy'
    return `${month}/${day}/${year}`;
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      const copyValues = _.cloneDeep(values);
      if (copyValues.date && typeof copyValues.date !== "string") {
        copyValues.date = convertDateFormat(copyValues.date.toLocaleDateString());
      }
      if (formType === "CREATE") {
        const id = generateRandomId(2);
        copyValues.id = id;
        dispatch(addRowsData(copyValues))
        console.log("Form is created", copyValues);
      }

      if (formType === "UPDATE") {
        // copyValues.date = convertDateFormat(copyValues.date.toLocaleDateString());
        const newRowData = changeRowData(copyRowData, copyValues);
        dispatch(updateRowsData(newRowData));
        console.log("Form is updated", newRowData);
      }

      if (formType === "FILTER") {
        dispatch(updateFilterCriteria(copyValues));
        console.log("Form is filtered ");
      }

      console.log('Form values:', copyValues);
    }
  });

  const handleClearField = (fieldName) => {
    formik.setFieldValue(fieldName, '');
  };

  const handleCheckboxChange = (e) => {
    // setIsAllFieldsRequired(e.target.checked);
  };

  const renderField = (fieldName) => {
    const isDateField = fieldName === 'date';
    const isAgeField = fieldName === 'age';
    const placeholder = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    return (
      <div className="input-container" key={fieldName}>
        {isDateField ? (
          <DatePicker
            selected={formik.values[fieldName] ? new Date(formik.values[fieldName]) : null}
            onChange={date => formik.setFieldValue(fieldName, date)}
            placeholderText="Select a date"
            dateFormat="MM/dd/YYYY"
            className="react-datepicker-wrapper"
            required={isAllFieldsRequired}
          />
        ) : (
          <input
            id={fieldName}
            name={fieldName}
            type={isAgeField ? 'number' : 'text'}
            placeholder={placeholder}
            onChange={formik.handleChange}
            value={formik.values[fieldName]}
            required={isAllFieldsRequired}
          />
        )}
        {formik.values[fieldName] && (
          <button
            type="button"
            className="clear-button"
            onClick={() => handleClearField(fieldName)}
          >
            Clear
          </button>
        )}
        {formik.errors[fieldName] && formik.touched[fieldName] && (
          <div className="error">{formik.errors[fieldName]}</div>
        )}
      </div>
    );
  };

  const onCancel = () => {
    dispatch(setCloseForm());
    console.log('Close modal');
  }

  return (
    // <FormContainer>
      <FormWrapper>
        
        <span > This Form is use as {formType}  </span>
        <form onSubmit={formik.handleSubmit}>
      
          <FormRow>
            {fields.map(fieldName => renderField(fieldName))}
          </FormRow>
          
          <Button type="submit">Submit</Button>
          <CancelButton type="button" onClick={onCancel}>Cancel</CancelButton>
        </form>
      </FormWrapper>
    // </FormContainer>
  );
};

export default FilterForm;
