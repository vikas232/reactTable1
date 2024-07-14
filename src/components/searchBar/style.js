import styled from '@emotion/styled';

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #f8f9fa;
  padding: 20px;
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  @media (max-width: 600px) {
    padding: 20px;
  }
`;

export const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;

  .input-container {
    position: relative;
    flex: 1;
    margin-right: 10px;
    margin-bottom: 15px;
    min-width: calc(33.33% - 10px); /* Three items per row */
    @media (max-width: 600px) {
      min-width: 100%;
      margin-right: 0;
    }
  }

  input,
  .react-datepicker-wrapper,
  .react-datepicker__input-container input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .clear-button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #aaa;
    font-size: 14px;
  }

  .error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
`;

export const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  margin-right: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const CancelButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #c82333;
  }
`;

export const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  label {
    margin-left: 5px;
  }
`;
