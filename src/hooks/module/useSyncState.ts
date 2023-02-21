/*
 * @Author: tianyu
 * @Date: 2023-02-21 17:13:59
 * @Description: 同步 state
 */
import { useRef } from 'react';
import forceUpdate from './useForceUpdate';

type Dispatch<T> = (state: T) => void;
type SetStateAction<T> = T | ((preState: T) => T);

type UseSyncStateProps<T> = readonly [T, Dispatch<SetStateAction<T>>];

function useSyncState<T>(initialValue: T): UseSyncStateProps<T> {
  const ref = useRef<T>(initialValue);

  return [
    ref.current,
    (state: SetStateAction<T>): void => {
      const oldState = ref.current;
      if (typeof state === 'function') {
        ref.current = state(oldState);
      } else {
        ref.current = state;
      }
      forceUpdate();
    }
  ];
}

export default useSyncState;

const [num, setNum] = useSyncState(1);

setNum((state) => state + 1);
setNum(1);
