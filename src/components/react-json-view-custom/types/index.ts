export interface ReactJsonViewCustomTypes {
  src: object;
  displayDataTypes: boolean;
}

export type DeepJsonFnTypes = (key: string, data: string | number | null | undefined | object | any[] | boolean) => any;
