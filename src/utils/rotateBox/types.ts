export type rotateContainerOptionsType = {
  perspective?: number;
  multiple?: number;
};

export interface rotateContainerProps {
  (selector: string | HTMLElement | NodeListOf<HTMLElement>, options?: rotateContainerOptionsType): void;
}

export type removeOptional<T> = {
  [property in keyof T]-?: T[property];
};
