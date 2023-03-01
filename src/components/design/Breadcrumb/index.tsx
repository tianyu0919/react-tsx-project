/*
 * @Author: tianyu
 * @Date: 2023-02-20 11:01:47
 * @Description: 面包屑导航 v1 版本
 */
import React, { FC } from 'react';
import './index.less';
import { BreadCrumbProps, BreadcrumbItemProps } from './types';
import classnames from 'classnames';

const Breadcrumb = (props: BreadCrumbProps): React.ReactElement => {
  const { children } = props;
  return (
    <div className={classnames('BreadcrumbsContainer')}>
      <ol>{children}</ol>
    </div>
  );
};
Breadcrumb.displayName = 'Breadcrumb';

const Item: FC<BreadcrumbItemProps> = (props: BreadcrumbItemProps): React.ReactElement => {
  const { onClick, children, className, Separator = '/' } = props;
  console.log(props);
  return (
    <li className={className}>
      <div
        className={'breadcrumb-link'}
        onClick={(e): void => {
          if (onClick) {
            onClick(e);
          }
        }}
      >
        <div className={'breadcrumb-item'}>{children}</div>
      </div>

      <span className={'breadcrumb-separator'}>{Separator}</span>
    </li>
  );
};

Item.displayName = 'BreadcrumbItem';
Breadcrumb.Item = Item;

export default Breadcrumb;
