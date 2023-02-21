/*
 * @Author: 卢天宇
 * @Date: 2023-02-21 20:40:22
 * @Description:
 */
import React, { useReducer, useState } from 'react';

export default function useForceUpdate(): React.DispatchWithoutAction {
  // const [, forceUpdate] = useReducer((x) => x + 1, 0);
  //   return forceUpdate;
  const [, setState] = useState({});
  return () => setState({});
}
