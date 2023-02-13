export interface RoutesTypes {
  path: string;
  component: any;
  children?: RoutesTypes[];
}
