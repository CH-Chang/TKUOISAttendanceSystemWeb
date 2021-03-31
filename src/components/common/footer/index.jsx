import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

import {
  Footer,
  FooterWrapper,
  Top,
  Organization,
  Product,
  Contact,
  Info,
  Logo,
  Bottom,
  Declaration,
} from "./style";
import logoTkuInfoCenterWhite from "../../../assets/img/logo/logoTkuInfoCenterWhite.svg";

const Index = (props) => {
  return (
    <Footer>
      <FooterWrapper>
        <Top align="top">
          <Organization span={5}>
            <dl>
              <dt>相關組織</dt>
              <dd>
                <a
                  href="http://www.tku.edu.tw/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  淡江大學
                </a>
              </dd>
              <dd>
                <a
                  href="http://www.ipc.tku.edu.tw/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  淡江大學資訊處
                </a>
              </dd>
              <dd>
                <a
                  href="http://www.csie.tku.edu.tw/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  淡江大學資訊工程學系
                </a>
              </dd>
            </dl>
          </Organization>
          <Product span={5}>
            <dl>
              <dt>相關網頁</dt>
              <dd>
                <a
                  href="http://iclass.tku.edu.tw/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  iClass學習平台
                </a>
              </dd>
              <dd>
                <a
                  href="http://moodle.tku.edu.tw/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Moodle遠距教學
                </a>
              </dd>
              <dd>
                <a
                  href="http://mooc.tku.edu.tw/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  磨課師課程
                </a>
              </dd>
              <dd>
                <a
                  href="http://ocw.tku.edu.tw/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OCW開放式課程
                </a>
              </dd>
              <dd>
                <a
                  href="http://honor.tku.edu.tw/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  榮譽學程
                </a>
              </dd>
            </dl>
          </Product>
          <Contact span={5}>
            <dl>
              <dt>聯絡資訊</dt>
              <dd>
                <a href="tel:0226215656">
                  <FontAwesomeIcon icon={fas.faPhoneAlt} />
                  02-2621-5656
                </a>
              </dd>
              <dd>
                <a href="mailto:ipc2@mail2.tku.edu.tw">
                  <FontAwesomeIcon icon={fas.faEnvelope} />
                  ipc2@mail2.tku.edu.tw
                </a>
              </dd>
              <dd>
                <a
                  href="https://www.google.com/maps/place/%E6%B7%A1%E6%B1%9F%E5%A4%A7%E5%AD%B8/@25.1748137,121.4448435,16z/data=!4m8!1m2!2m1!1z5reh5rGf5aSn5a24!3m4!1s0x3442aff8c1544bdb:0x1dcf4f494b3362b!8m2!3d25.1740706!4d121.4473008"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={fas.faMapMarkerAlt} />
                  251 新北市淡水區英專路151號
                </a>
              </dd>
            </dl>
          </Contact>
          <Info span={9}>
            <Logo src={logoTkuInfoCenterWhite} />
          </Info>
        </Top>
        <Bottom align="middle">
          <Declaration span={24}>
            <p>
              本網站使用Cookies記錄與存取您的瀏覽使用訊息，若繼續使用網站，即表明您同意
              cookie 及其他類似技術的使用
            </p>
            <p>Copyrights © 2020 All Rights Reserved by CHANG CHIH HSIANG</p>
          </Declaration>
        </Bottom>
      </FooterWrapper>
    </Footer>
  );
};

export default Index;
