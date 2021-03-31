import { createGlobalStyle } from "styled-components";

export const ResetStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

export const GlobalStyle = createGlobalStyle`

  body{
    font-family: "Noto Sans TC";
  }
`;

export const AntdThemeStyle = createGlobalStyle`
  .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner,
  .ant-picker-cell-in-view.ant-picker-cell-range-start .ant-picker-cell-inner,
  .ant-picker-cell-in-view.ant-picker-cell-range-end .ant-picker-cell-inner {
    color: #fff;
    background: #f7931e;
  }

  .ant-picker-cell-in-view.ant-picker-cell-range-start:not(.ant-picker-cell-range-start-single)::before,
  .ant-picker-cell-in-view.ant-picker-cell-range-end:not(.ant-picker-cell-range-end-single)::before {
    background: #FFE4C5;
  }

  .ant-picker-cell-in-view.ant-picker-cell-in-range::before {
    background: #FFE4C5;
  }

  .ant-picker-cell-in-view.ant-picker-cell-today .ant-picker-cell-inner::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    border: 1px solid #f7931e;
    border-radius: 2px;
    content: '';
  }

  .ant-picker-cell-in-view.ant-picker-cell-in-range.ant-picker-cell-range-hover::before,
  .ant-picker-cell-in-view.ant-picker-cell-range-start.ant-picker-cell-range-hover::before,
  .ant-picker-cell-in-view.ant-picker-cell-range-end.ant-picker-cell-range-hover::before,
  .ant-picker-cell-in-view.ant-picker-cell-range-start:not(.ant-picker-cell-range-start-single).ant-picker-cell-range-hover-start::before,
  .ant-picker-cell-in-view.ant-picker-cell-range-end:not(.ant-picker-cell-range-end-single).ant-picker-cell-range-hover-end::before,
  .ant-picker-panel > :not(.ant-picker-date-panel) .ant-picker-cell-in-view.ant-picker-cell-in-range.ant-picker-cell-range-hover-start::before,
  .ant-picker-panel > :not(.ant-picker-date-panel) .ant-picker-cell-in-view.ant-picker-cell-in-range.ant-picker-cell-range-hover-end::before {
    background: #FEC27C;
  }

  .ant-picker-date-panel .ant-picker-cell-in-view.ant-picker-cell-in-range.ant-picker-cell-range-hover-start .ant-picker-cell-inner::after,
  .ant-picker-date-panel .ant-picker-cell-in-view.ant-picker-cell-in-range.ant-picker-cell-range-hover-end .ant-picker-cell-inner::after {
    background: #FEC27C;
  }

  .ant-picker-cell-in-view.ant-picker-cell-range-hover-start:not(.ant-picker-cell-in-range):not(.ant-picker-cell-range-start):not(.ant-picker-cell-range-end)::after,
  .ant-picker-cell-in-view.ant-picker-cell-range-hover-end:not(.ant-picker-cell-in-range):not(.ant-picker-cell-range-start):not(.ant-picker-cell-range-end)::after,
  .ant-picker-cell-in-view.ant-picker-cell-range-hover-start.ant-picker-cell-range-start-single::after,
  .ant-picker-cell-in-view.ant-picker-cell-range-hover-end.ant-picker-cell-range-end-single::after,
  .ant-picker-cell-in-view.ant-picker-cell-range-hover:not(.ant-picker-cell-in-range)::after {
    border-top: 1px dashed #f7931e;
    border-bottom: 1px dashed #f7931e;
  }


  tr > .ant-picker-cell-in-view.ant-picker-cell-range-hover:first-child::after,
  tr > .ant-picker-cell-in-view.ant-picker-cell-range-hover-end:first-child::after,
  .ant-picker-cell-in-view.ant-picker-cell-range-hover-edge-start:not(.ant-picker-cell-range-hover-edge-start-near-range)::after,
  .ant-picker-cell-in-view.ant-picker-cell-range-hover-start::after {
    border-left: 1px dashed #f7931e;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  tr > .ant-picker-cell-in-view.ant-picker-cell-range-hover:last-child::after,
  tr > .ant-picker-cell-in-view.ant-picker-cell-range-hover-start:last-child::after,
  .ant-picker-cell-in-view.ant-picker-cell-range-hover-edge-end:not(.ant-picker-cell-range-hover-edge-end-near-range)::after,
  .ant-picker-cell-in-view.ant-picker-cell-range-hover-end::after {
    border-right: 1px dashed #f7931e;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) { 
    font-weight: 600;
    background: #fff;
  }

  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) .ant-select-item-option-state {
    color: #f7931e;
  }

`;
