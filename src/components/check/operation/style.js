import styled from "styled-components";
import {
  Row as antdRow,
  Col as antdCol,
  Form as antdForm,
  Select as antdSelect,
  DatePicker as antdDatePicker,
  Button as antdButton,
} from "antd";

export const Wrapper = styled.div`
  margin-top: 2rem;
`;

export const OperationBox = styled(antdRow)``;

export const CheckRecordFormBox = styled(antdCol)``;

export const QuickLinkBox = styled(antdCol)``;

export const BoxTitleBox = styled.div``;

export const BoxTitle = styled.h3`
  font-size: 1.8vmin;
  color: #f7931e;
`;

export const BoxContentBox = styled.div`
  margin-left: 1rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
`;

export const CheckRecordForm = styled(antdForm)``;

export const CheckRecordFormItem = styled(antdForm.Item)`
  margin: 0;

  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  text-align: left;

  > .ant-form-item-label {
    > label {
      font-size: 1.6vmin;
    }
  }

  &.formRight {
    text-align: right;
  }
`;

export const Select = styled(antdSelect)`
  &.ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    border: 0;
    border-bottom: 1px solid #f7931e;
    outline: 0;
    border-right-width: 1px !important;
  }

  &.ant-select-focused.ant-select-multiple .ant-select-selector {
    border: 0;
    border-bottom: 1px solid #f7931e;
    outline: 0;
    border-right-width: 1px !important;
    box-shadow: 0 0 0 0px;
  }

  &.ant-select-multiple .ant-select-selector {
    position: relative;
    background-color: #fff;
    border: 0;
    border-bottom: 1px solid #ddd;
    -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-align: center;
    align-items: center;
    padding: 1px 4px;
  }
`;

export const Option = styled(antdSelect.Option)``;

export const RangePicker = styled(antdDatePicker.RangePicker)`
  width: 100%;

  border: 0;

  &.ant-picker-focused {
    border: 0;
    border-bottom: 1px solid #f7931e;
    box-shadow: 0 0 0 0px;
  }
  > .ant-picker-active-bar {
    background: #f7931e;
  }
`;

export const Submit = styled(antdButton)`
  color: #f7931e;
  border: 0;
  border-radius: 15px;
  border: 1px solid #f7931e;

  font-size: 1.6vmin;

  margin-left: 0.2rem;
  margin-right: 0.2rem;

  &:focus,
  :hover {
    color: white;
    background-color: #f7931e;
    border: 1px solid #f7931e;
  }
`;

export const Export = styled(antdButton)`
  color: #f7931e;
  border: 0;
  border-radius: 15px;
  border: 1px solid #f7931e;

  font-size: 1.6vmin;

  margin-left: 0.2rem;
  margin-right: 0.2rem;

  &:focus,
  :hover {
    color: white;
    background-color: #f7931e;
    border: 1px solid #f7931e;
  }
`;

export const QuickLink = styled.button`
  float: left;

  outline: 0;

  cursor: pointer;

  margin-left: 0.2rem;
  margin-right: 0.2rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;

  padding-left: 0.8rem;
  padding-right: 0.8rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;

  background: white;

  border: 1px solid #f7931e;
  border-radius: 15px;

  font-size: 1.6vmin;
  color: #f7931e;

  &:hover {
    color: white;
    background: #f7931e;
  }
`;
