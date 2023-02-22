export type ButtonProps = {
  type?: 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';
  size?: 'middle' | 'large' | 'small';
  onClick?: (ev: React.MouseEvent) => void;
  children?: any;
};
