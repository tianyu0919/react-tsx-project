import { createApp, App } from 'vue';

type rootType = string | Element;

class VueRender {
  readyApp: Map<string | Element, App> = new Map();

  constructor() {
    this.readyApp = new Map();
  }

  hasApp(root: rootType): App | undefined {
    // console.log('hasApp', root)
    return this.readyApp.get(root);
  }

  /**
   *
   * @param app
   * @param root 如果是 string 默认是 id
   * @returns
   */
  render = async (app: Promise<any>, root: rootType): Promise<App> => {
    console.log(this);
    const hasApp = this.hasApp(root);
    if (hasApp) {
      console.log('已存在了');
      return Promise.resolve(hasApp);
    }

    const { default: component } = await app;
    return new Promise((res) => {
      // * 如果存在了，则不做任何操作。
      console.log('component', component);
      const vueInstance = createApp(component);

      const unmount = vueInstance.unmount;

      vueInstance.unmount = (): void => {
        unmount();
        console.log('component unmounted', root);
        this.readyApp.delete(root);
      };
      this.readyApp.set(root, vueInstance);

      console.log('vue实例字典');
      console.log(this.readyApp);
      if (typeof root === 'string') {
        vueInstance.mount(!root.startsWith('#') ? `#${root}` : root);
      } else {
        vueInstance.mount(root);
      }
      res(vueInstance);
    });
  };
}

const vueRender = new VueRender();
vueRender.render;

export default vueRender.render;

// * 存一个字典。用来根据 domID 进行存储。
// * 渲染之前先判断是否根据 domID 生成的实例，如果已经存在了，则不渲染。
// * react 生命周期的卸载事件删除已存在实例。
// *
