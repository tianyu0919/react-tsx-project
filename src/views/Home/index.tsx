/*
 * @Author: 卢天宇
 * @Date: 2023-02-23 21:35:28
 * @Description:
 */
import React, { useEffect, memo } from 'react';
import { Button } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';
import './index.less';
import { openImgLayer } from 'src/utils/layer';

const Home = function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    openImgLayer('.imgMask img');
  }, []);
  return (
    <>
      <div>Home</div>
      <Button
        onClick={() => {
          navigate('me');
        }}
      >
        To Me
      </Button>

      <div className="imgMaskContainer">
        <div className="item">
          <div className="left"></div>
          <div className="imgMask">
            {/* 1 */}
            <img src="https://cdn.ripperhe.com/oss/master/2022/0828/volcengine_auth_1.jpg" alt="" />
          </div>
        </div>
        <div className="item">
          <div className="left"></div>
          <div className="imgMask">
            {/* 2 */}
            <img src="https://cdn.ripperhe.com/oss/master/2022/0828/volcengine_auth_2.jpg" alt="" />
          </div>
        </div>
        <div className="item">
          <div className="left"></div>
          <div className="imgMask">
            {/* 3 */}
            <img src="https://cdn.ripperhe.com/oss/master/2022/0828/volcengine_auth_3.jpg" alt="" />
          </div>
        </div>
        <div className="item">
          <div className="left"></div>
          <div className="imgMask">
            {/* 4 */}
            <img src="https://cdn.ripperhe.com/oss/master/2022/0828/volcengine_auth_4.jpg" alt="" />
          </div>
        </div>
        <div className="item">
          <div className="left"></div>
          <div className="imgMask">
            {/* 5 */}
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOeWeSnd98mGGBYC7IRuVQ2cLNdSJnojPcGw&usqp=CAU" alt="" />
          </div>
        </div>
        <div className="item">
          <div className="left"></div>
          <div className="imgMask">
            {/* 6 */}
            <img src="https://cdn.ripperhe.com/oss/master/2022/0828/volcengine_auth_3.jpg" alt="" />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default memo(Home);
