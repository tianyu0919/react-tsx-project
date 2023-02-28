/*
 * @Author: tianyu
 * @Date: 2023-02-23 16:39:51
 * @Description:
 */

import './index.less';
let mask: HTMLDivElement | null = null;
let contentElement: HTMLElement | null = null;

// * 删除
function removeLayer(): void {
  document.body.classList.remove('layer-body');
  if (contentElement) {
    contentElement.style.transform = '';
  }
  setTimeout(() => {
    if (mask) {
      document.body.removeChild(mask);
      mask = null;
    }
    if (contentElement) {
      document.body.removeChild(contentElement);
      contentElement = null;
    }
  }, 300);
}

function createMask(): void {
  const dom = document.createElement('div');
  mask = dom;
  dom.classList.add('layer-mask');
  dom.addEventListener('click', () => {
    removeLayer();
  });
  // * 添加
  setTimeout(() => {
    document.body.classList.add('layer-body');
  });
  document.body.appendChild(dom);
}

function open(multiple: number, target: HTMLElement, type: 'Horizontal' | 'Vertical' = 'Horizontal'): void {
  const { offsetWidth, offsetHeight, offsetLeft, offsetTop, tagName } = target;
  const top = offsetTop - document.documentElement.scrollTop;
  const left = offsetLeft - document.documentElement.scrollLeft;
  const halfWidth = (multiple * offsetWidth - offsetWidth) / 2;
  const halfHeight = (multiple * offsetHeight - offsetHeight) / 2; // * 放大之后多出来的距离
  const typeOptions = {
    Horizontal: {
      translateX: (left - halfWidth) / multiple,
      translateY: (top - halfHeight - (window.innerHeight - multiple * offsetHeight) / 2) / multiple
    },
    Vertical: {
      translateX: (left - halfWidth - (window.innerWidth - multiple * offsetWidth) / 2) / multiple,
      translateY: (top - halfHeight) / multiple
    }
  };
  createMask();
  const content = document.createElement(tagName) as HTMLImageElement;
  document.body.appendChild(content);

  let transformOptions = null;
  let style = `
      position: fixed; 
      left: ${left}px; 
      top: ${top}px;
      z-index: 100;
    `;
  if (type === 'Horizontal') {
    style += `width: ${offsetWidth}px;\n`;
    transformOptions = typeOptions.Horizontal;
  } else {
    style += `height: ${offsetHeight}px;\n`;
    transformOptions = typeOptions.Vertical;
  }

  style += `transform: scale(${multiple}) translate3d(${-transformOptions.translateX}px, ${-transformOptions.translateY}px, 0px) \n`;
  setTimeout(() => {
    content.style.cssText = style;
  });
  content.classList.add('layer-content');
  content.src = target.getAttribute('src') || '';
  contentElement = content;
  contentElement.addEventListener('click', () => {
    removeLayer();
  });
}

export function openImgLayer(selector: string): void {
  const ImgItems = document.querySelectorAll(selector) as NodeListOf<HTMLImageElement>;
  let multiple = 0; // * 放大倍数
  ImgItems.forEach((item) => {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', (ev: Event) => {
      const docWidth = window.innerWidth;
      const docHeight = window.innerHeight;

      const target = ev.target as HTMLElement;
      if (target && target.tagName.toLocaleLowerCase() === 'img') {
        const { offsetWidth, offsetHeight } = target;
        console.log(target.offsetTop);
        if (offsetWidth > offsetHeight) {
          multiple = docWidth / offsetWidth;
          open(multiple, target);
          return;
        }
        multiple = docHeight / offsetHeight;
        open(multiple, target, 'Vertical');
      }
    });
  });
}
