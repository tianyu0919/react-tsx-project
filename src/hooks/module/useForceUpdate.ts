import React, { useReducer } from 'react';

export default function useForceUpdate(): React.DispatchWithoutAction {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  return forceUpdate;
}
