/*
 * @Author: tianyu
 * @Date: 2023-06-29 13:51:12
 * @Description: 流式布局
 */
import React, { useRef, useEffect, useState } from 'react';
import './index.less';

type renderItemProps = any[];

function debounce(callback: () => void, delay = 100): () => void {
  let timer: NodeJS.Timeout | null = null;
  return () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(callback, delay);
  };
}

const getAutoHeight = (max: number, min: number): number => {
  const h = Math.random() * (max - min) + min;
  return h;
};

const getAutoColor = (): string => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
};

const getMinArrIdx = (sourceArr: number[]): number => {
  return sourceArr.findIndex(item => item === Math.min(...sourceArr));
};

export default function FlowLayout(): React.ReactElement {
  const container = useRef<HTMLDivElement | null>(null);
  const [renderItem, setRenderItems] = useState<renderItemProps>([]);
  const items = new Array(50).fill(1).map(() => getAutoHeight(200, 100)); // * 总共的item

  const call = (): { columns: number; space: number } => {
    const { width: containerW } = container!.current!.getBoundingClientRect(); // * 获取盒子当前的宽度
    const imgW = 200; // * 每个项目的宽度
    const columns = Math.floor(containerW / imgW); // * 一行可以有几列
    const space = (containerW % imgW) / (columns + 1); // * 他们剩余的间距

    return {
      columns,
      space
    };
  };

  const setPosition = (): void => {
    const { columns, space } = call();
    const arr = new Array(columns).fill(0);
    const renderItem: renderItemProps = new Array(columns).fill(1).map(() => []);

    console.log(renderItem);
    items.forEach((item, idx) => {
      const minItemIdx = getMinArrIdx(arr);
      renderItem[minItemIdx].push({
        height: item,
        space,
        top: arr[minItemIdx] + (idx >= columns ? 10 : 0)
      });
      arr[minItemIdx] += item + (idx >= columns ? 10 : 0);
    });
    setRenderItems(renderItem);

    container!.current!.style.height = `${Math.max(...arr)}px`;
    console.log(renderItem);
  };

  useEffect(() => {
    setPosition();
    const resizeDebounceFunc = debounce(setPosition);
    window.addEventListener('resize', resizeDebounceFunc);
    return (): void => {
      window.removeEventListener('resize', resizeDebounceFunc);
    };
  }, []);

  return (
    <div className="FlowLayoutContainer" ref={container}>
      {renderItem?.map((item, idx) =>
        item.map((rend: any, i: number) => (
          <div
            key={i}
            className="item"
            style={{
              left: 200 * idx + rend.space * (idx + 1),
              top: rend.top,
              height: rend.height,
              backgroundColor: getAutoColor()
            }}
          ></div>
        ))
      )}
    </div>
  );
}
