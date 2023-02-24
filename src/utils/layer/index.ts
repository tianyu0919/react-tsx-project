/*
 * @Author: tianyu
 * @Date: 2023-02-23 16:39:51
 * @Description:
 */

import './index.less';
class OpenImgMask {
  type: 'Horizontal' | 'Vertical';
  multiple: number; // * 放大倍数
  constructor() {
    this.type = 'Horizontal';
    this.multiple = 0;
  }

  render(selector: string): void {
    const ImgItems = document.querySelectorAll(selector);
    ImgItems.forEach((item) => {
      item.addEventListener('click', (ev: Event) => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        let type = 'Horizontal';

        const target = ev.target as HTMLElement;
        if (target) {
          const { offsetWidth, offsetHeight, offsetLeft, offsetTop, tagName } = target;
          console.dir(target);
          console.log(target.offsetLeft);
          // * 如果宽度小于高度，那么以高度为基准渲染垂直。
          if (offsetWidth < offsetHeight) {
            type = 'Vertical';
          }
        }
      });
    });
  }
}

const layer = new OpenImgMask();
export { layer };

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
  console.dir(target);
  const top = offsetTop - document.documentElement.scrollTop;
  const left = offsetLeft - document.documentElement.scrollLeft;
  const halfWidth = (multiple * offsetWidth - offsetWidth) / 2;
  const halfHeight = (multiple * offsetHeight - offsetHeight) / 2;
  const translateX = (left - halfWidth) / multiple;
  const translateY = (top - halfHeight) / multiple - offsetHeight / 2;

  console.group('centerTop');
  console.log(`top: ${top}; halfHeight: ${halfHeight}`);
  console.groupEnd();
  createMask();
  const content = document.createElement(tagName);
  document.body.appendChild(content);
  setTimeout(() => {
    content.style.cssText = `
      transform: scale(${multiple}) translate3d(-${translateX}px, ${-translateY}px, 0px); 
      position: fixed; 
      left: ${left}px; top: ${top}px;
      width: ${offsetWidth}px; 
      height: ${offsetHeight}px; z-index: 100;
    `;
  });
  content.classList.add('layer-content');
  contentElement = content;
  contentElement.addEventListener('click', () => {
    removeLayer();
  });
}

export function openImgMask(selector: string): void {
  const ImgItems = document.querySelectorAll(selector);
  let multiple = 0; // * 放大倍数
  ImgItems.forEach((item) => {
    item.addEventListener('click', (ev: Event) => {
      const docWidth = window.innerWidth;
      const docHeight = window.innerHeight;

      const target = ev.target as HTMLElement;
      if (target) {
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
