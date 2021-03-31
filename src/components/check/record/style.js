import styled from "styled-components";
import { Table as antdTable } from "antd";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  margin-top: 2rem;
`;

export const Table = styled(antdTable)`
  > .ant-spin-nested-loading {
    > .ant-spin-container {
      > .ant-table {
        > .ant-table-container {
          > .ant-table-content {
            > table {
              > .ant-table-thead {
                > tr {
                  > th {
                    background: #f7931e;
                    color: white;
                  }
                }
              }
            }
          }
        }
      }
      > .ant-table-pagination {
        > .ant-pagination-item-active {
          border-color: #f7931e;
          > a {
            color: #f7931e;
          }
        }
      }
    }
  }
`;

export const Action = styled.button`
  background: white;

  outline: none;

  border: 1px solid #f7931e;
  border-radius: 15px;

  color: #f7931e;
  font-size: 1.6vmin;

  margin-left: 0.1rem;
  margin-right: 0.1rem;

  padding-left: 0.4rem;
  padding-right: 0.4rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;

  cursor: pointer;

  &:hover {
    color: white;
    background: #f7931e;
  }
`;

export const ActionLink = styled(Link)`
  background: white;

  border: 1px solid #f7931e;
  border-radius: 15px;

  color: #f7931e;
  font-size: 1.6vmin;

  margin-left: 0.1rem;
  margin-right: 0.1rem;

  padding-left: 0.4rem;
  padding-right: 0.4rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;

  cursor: pointer;

  &:hover {
    color: white;
    background: #f7931e;
  }
`;
