import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/common/header/index";
import Footer from "../../components/common/footer/index";
import {
  Headline,
  Content,
  Text,
  Guild,
  PromotionWrapper,
  Title,
  Promotions,
  Promotion,
  FormLinkWrapper,
  FormLinks,
  FormLink,
} from "./style";

const Index = (props) => {
  return (
    <Fragment>
      <Header history={props.history} />
      <Content>
        <Headline>
          <h1>招募新血</h1>
          <h2>recruition</h2>
        </Headline>
        <Text>
          <Guild>
            <p>
              <span>您</span>
              好，對淡江大學資訊中心的相關工讀生職位有興趣嗎？每年第二學期學期末時，將進行資訊中心工讀生的換血大更新，千萬
              不要錯過本次的工讀生招募！現在只要填寫下方表單、附上相關招募資料以及同意個人資料使用協議的宣告，經過主管的審核
              核准後，就有機會能夠成為我們的一員，還不趕快抓緊機會，加入我們嗎？
            </p>
          </Guild>

          <PromotionWrapper>
            <Title>
              <h2>我們提供</h2>
              <h3>benefits</h3>
            </Title>
            <Promotions>
              <Promotion>
                <div>
                  <FontAwesomeIcon icon={fas.faDollarSign} />
                </div>
                <h5>符合法規的$158元時薪</h5>
              </Promotion>
              <Promotion>
                <div>
                  <FontAwesomeIcon icon={fas.faNotesMedical} />
                </div>
                <h5>符合法規的勞健保福利</h5>
              </Promotion>
              <Promotion>
                <div>
                  <FontAwesomeIcon icon={fas.faUsers} />
                </div>
                <h5>和諧完善的資中大家庭</h5>
              </Promotion>
            </Promotions>
          </PromotionWrapper>
          <FormLinkWrapper>
            <Title>
              <h2>我們需要</h2>
              <h3>recruitment</h3>
            </Title>
            <FormLinks>
              <FormLink to="/apply/?type=security">實習室管制工讀生</FormLink>
              <FormLink to="/apply/?type=fixer">維修服務隊工讀生</FormLink>
            </FormLinks>
          </FormLinkWrapper>
        </Text>
      </Content>
      <Footer />
    </Fragment>
  );
};

export default Index;
