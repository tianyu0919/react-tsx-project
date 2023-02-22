/*
 * @Author: tianyu
 * @Date: 2023-02-21 17:13:59
 * @Description: 同步 state
 */
import { useRef } from 'react';
import useForceUpdate from './useForceUpdate';

type Dispatch<T> = (state: T) => void;
type SetStateFunTypeAction<T> = (preState: T) => T;
type SetStateAction<T> = T | SetStateFunTypeAction<T>;
type UseSyncStateProps<T> = readonly [() => T, Dispatch<SetStateAction<T>>];

/**
 * 自定义 hook --- 同步 state
 * @param initialValue
 * @returns [getStateFn, SetStateFn]
 */
function useSyncState<T>(initialValue: T): UseSyncStateProps<T> {
  const ref = useRef<T>(initialValue);
  const forceUpdate = useForceUpdate();

  return [
    (): T => ref.current,
    (state: SetStateAction<T>): void => {
      const oldState = ref.current;
      if (typeof state === 'function') {
        ref.current = (state as SetStateFunTypeAction<T>)(oldState);
      } else {
        ref.current = state;
      }
      forceUpdate();
    }
  ];
}

export default useSyncState;
