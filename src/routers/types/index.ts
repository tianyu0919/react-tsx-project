export interface RoutesTypes {
  path?: string;
  element: any;
  index?: boolean;
  name?: string;
  children?: RoutesTypes[];
}
