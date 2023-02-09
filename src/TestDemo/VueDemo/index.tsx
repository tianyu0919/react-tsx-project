import React, { useState, useEffect } from 'react';
import render from 'src/Vue/render';
import { App as VueInstance } from 'vue';
import './index.less';

const renderArr = [
  { dom: 'app', template: 'App', unmount: true },
  { dom: 'about', template: 'About' }
];

export default function VueDemo() {
  return (
    <div className="VueDemoContainer">
      {renderArr.map((item) => (
        <VueItem key={item.dom} dom={item.dom} unmount={item.unmount} template={item.template} />
      ))}
    </div>
  );
}

function VueItem(props: (typeof renderArr)[0]) {
  const [vueApp, setVueApp] = useState<VueInstance | null>(null);

  useEffect(() => {
    let dom = document.querySelector(`#${props.dom}`);
    console.log(dom);
    if (dom) {
      render(import('src/Vue/' + props.template), dom)
        .then((instance) => {
          console.log(instance === vueApp);
          setVueApp(instance);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {
      vueApp?.unmount();
    };
  }, []);

  return (
    <div className="outContainer">
      {props.unmount && (
        <button
          onClick={(): void => {
            if (vueApp) {
              console.log(vueApp);
              vueApp.unmount();
            }
          }}
        >
          卸载
        </button>
      )}
      <div className="renderBox" id={props.dom} />
    </div>
  );
}
