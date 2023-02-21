/*
 * @Author: tianyu
 * @Date: 2023-02-21 17:13:59
 * @Description: 同步 state
 */
import { useRef } from 'react';
import forceUpdate from './useForceUpdate';

type Dispatch<T> = (state: T) => void;
type SetStateFunTypeAction<T> = (preState: T) => T;
type SetStateAction<T> = T | SetStateFunTypeAction<T>;

type UseSyncStateProps<T> = readonly [T, Dispatch<SetStateAction<T>>];

function useSyncState<T>(initialValue: T): UseSyncStateProps<T> {
  const ref = useRef<T>(initialValue);
  console.log('xx');

  return [
    ref.current,
    (state: SetStateAction<T>): void => {
      const oldState = ref.current;
      console.log('xx111');
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
