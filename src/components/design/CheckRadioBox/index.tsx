/*
 * @Author: tianyu
 * @Date: 2023-03-01 11:01:14
 * @Description:
 */
import React, { FC, useState } from 'react';
import { CheckRadioType } from './types';
import './index.less';
import classnames from 'classnames';

const defaultProps = {
  type: 'checkbox',
  defaultChecked: false
};

export default function CheckRadioBox(props: CheckRadioType): React.ReactElement {
  const { type, value, onChange, children, defaultChecked } = { ...defaultProps, ...props };
  const [isChecked, setIsChecked] = useState(defaultChecked);
  return (
    <>
      <div
        className={classnames('CheckRadioBox', {
          checkBox: type === 'checkbox',
          radioBox: type === 'radio'
        })}
      >
        <label className="CheckRadioBox_label">
          <span className={classnames('CheckRadioBox_left', { checked: isChecked })}>
            <input
              type={type === 'checkbox' ? 'checkbox' : 'radio'}
              onChange={(e): void => {
                const { checked } = e.target;
                setIsChecked(checked);
                onChange && onChange(checked);
              }}
            />
            <span className="checkSpan" />
          </span>
          <span className={'CheckRadioBox_content'}>{children}</span>
        </label>
      </div>
    </>
  );
}

const Group: FC = function () {
  return <></>;
};

CheckRadioBox.Group = Group;
CheckRadioBox.Group.displayName = 'xx';
