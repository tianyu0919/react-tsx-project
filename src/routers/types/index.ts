export interface RoutesTypes {
  path?: string;
  component: any;
  index?: boolean;
  children?: RoutesTypes[];
}
