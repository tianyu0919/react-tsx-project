export interface RoutesTypes {
  path?: string;
  element: any;
  index?: boolean;
  name?: string;
  children?: RoutesTypes[];
}
export interface RouterMiddlewareTypes {
  path?: string;
  component?: JSX.Element;
  showLoading?: boolean;
}
