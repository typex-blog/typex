import * as React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import PlatformList from '@/pages/PlatformList/PlatformList';
import { Button, Divider, Input, Layout, Menu, Modal } from 'antd';
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import ArticleList from '@/pages/ArticleList/ArticleList';
import { useEffect, useState } from 'react';
import ArticleEdit from '@/pages/ArticleEdit/ArticleEdit';

const { ConnectedRouter } = routerRedux;
const { Header, Content, Footer, Sider } = Layout;
import { CheckEndpointModal } from '@/components/CheckEndpointModal';
import EnvironmentList from '@/pages/Environment/EnvironmentList';

function RouterConfig({ history }: { history: any }) {
  const [router, setRouter] = useState('');

  const routerMap: any = {
    platformList: '/platformList',
    articleList: '/articleList',
    settingPage: '/settingPage',
  };

  const goto = (route: string) => {
    setRouter(route);
    history.push(routerMap[route]);
  };

  useEffect(() => {
    goto('platformList');
  }, []);

  return (
    <Layout style={ { minHeight: '100vh' } }>
      <CheckEndpointModal />
      <Sider style={ {
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      } }>
        <div style={ { minHeight: '48px', color: '#fff', textAlign: 'center', lineHeight: '48px' } }>TypeX</div>
        <Menu theme="dark" selectedKeys={ [router] }>
          <Menu.Item key="platformList" icon={ <PieChartOutlined/> } onClick={ () => goto('platformList') }>
            平台管理
          </Menu.Item>
          <Menu.Item key="articleList" icon={ <DesktopOutlined/> } onClick={ () => goto('articleList') }>
            文章管理
          </Menu.Item>
        </Menu>
        <div
          style={ {
            display: 'block',
            color: 'rgba(255, 255, 255, 0.7)',
            position: 'absolute',
            bottom: '12px',
            width: '100%',
            textAlign: 'center',
            cursor: 'pointer',
            userSelect: 'none',
            boxSizing: 'border-box',
          } } onClick={() => goto('settingPage')}>
          设置
        </div>
      </Sider>
      <Layout style={ { marginLeft: 200 } }>
        <Content>
          <ConnectedRouter history={ history }>
            <Switch>
              <Route path="/platformList" component={ PlatformList }/>
              <Route path="/articleList" component={ ArticleList }/>
              <Route path="/article/edit/:id" component={ ArticleEdit }/>
              <Route path="/article/new" component={ ArticleEdit }/>
              <Route path="/settingPage" component={ EnvironmentList }/>
            </Switch>
          </ConnectedRouter>
        </Content>
      </Layout>

    </Layout>
  );
}

export default RouterConfig;
