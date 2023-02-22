/*
 * @Author: tianyu
 * @Date: 2023-02-06 14:28:44
 * @Description:
 */
import React from 'react';
import classnames from 'classnames';
import { ButtonProps } from './types';

const Button = (props: ButtonProps): React.ReactElement => {
  const { type = 'default', children, onClick: clickHandler, size = 'middle' } = props;
  console.log(props);
  return (
    <>
      <button
        type="button"
        className={classnames('btn', `btn-${type}`, `btn`)}
        onClick={(e): void => {
          if (clickHandler) {
            clickHandler(e);
          }
        }}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
