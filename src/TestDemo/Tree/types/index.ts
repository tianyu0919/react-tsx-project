/*
 * @Author: 归宿
 * @Date: 2023-01-13 16:49:33
 * @Description:
 */
const obj = {
  type: 'title',
  text: 'VIRTUAL',
  font_size: 14,
  bold: false,
  index: 0,
  indent: 0,
  alignment: 'left',
  table_detail: null,
  rough_split: 'main_body',
  serial_number: null,
  level: -1
};

type P = typeof obj;

export interface JSONType {
  type: 'VIRTUAL' | 'paragraph';
  text: string;
  font_size: number;
  bold: boolean;
  index: number;
  indent: number;
  alignment: string;
  table_detail: null;
  rough_split: string;
  serial_number: null;
  level: number;
  children?: JSONType[];
}
