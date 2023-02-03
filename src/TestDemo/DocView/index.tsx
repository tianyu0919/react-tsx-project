/*
 * @Author: 归宿
 * @Date: 2023-01-12 10:30:38
 * @Description:
 */
import React, { useState, useEffect } from 'react';
// import { Logger } from 'logging-library';
import FileViewer from 'react-file-viewer';
import classnames from 'classnames';
import './index.less';
import docFile from './assets/1411180229-赵桂双-体育教育(1).doc';
import axios from 'axios';

const baseUrl = 'http://localhost:9000';
// const logger = new Logger();

export default function docView() {
  const [source, setSource] = useState('');
  const documents = [
    { uri: require('./assets/1411180229-赵桂双-体育教育(1).doc'), fileType: 'doc' },
    { uri: require('./assets/欢迎使用WPS云文档.docx'), fileType: 'docx' },
    { uri: require('./assets/欢迎使用WPS云文档.pdf'), fileType: 'pdf' }
  ];

  const fileInput = (e: any) => {
    const files = e.target.files;
    console.log(files);
    const formData = new FormData();
    Array.from(files).forEach((file: any) => {
      formData.append(file.name, file);
    });
    axios
      .post(`${baseUrl}/convert`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const requrest = () => {
    axios
      .get(`${baseUrl}/`)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFlv = () => {
    axios
      .get(`${baseUrl}/flv`)
      .then(({ data }) => {
        let blob = new Blob([data], { type: 'application/mp3' });
        console.log(blob);
        let url = URL.createObjectURL(blob);
        console.log(url);
        setSource(url);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    try {
      // console.log(xxx);
      getFlv();
    } catch (e) {
      console.log('xxx---');
      // logger.error(e, 'error in file-viewer');
    }
  }, []);
  return (
    <div>
      docView
      <div className={classnames('docViewerContainer')}>
        <button
          onClick={() => {
            // let json = { name: 'xxx' };
            // const blob = new Blob([JSON.stringify(json)]);
            // let url = URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.download = `xx.doc`;
            a.href = docFile;
            a.click();
            // URL.revokeObjectURL(url);
            console.log(docFile);
          }}
        >
          下载
        </button>
        <input type="file" onChange={fileInput} multiple />
        <button onClick={requrest}>请求</button>
        <video src="http://localhost:9000/flv" controls />
        {/* <video src={source} controls /> */}
        <FileViewer
          fileType={'doc'}
          filePath={require('./assets/1411180229-赵桂双-体育教育(1).doc')}
          onError={(e: any) => {
            // logger.error(e, 'error in file-viewer');
          }}
        />
        <FileViewer
          fileType={'docx'}
          filePath={require('./assets/欢迎使用WPS云文档.docx')}
          onError={(e: any) => {
            // logger.error(e, 'error in file-viewer');
          }}
        />
        <FileViewer
          fileType={'pdf'}
          filePath={require('./assets/欢迎使用WPS云文档.pdf')}
          onError={(e: any) => {
            // logger.error(e, 'error in file-viewer');
          }}
        />
      </div>
    </div>
  );
}
