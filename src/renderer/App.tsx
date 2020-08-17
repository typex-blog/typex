import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'antd/dist/antd.less'
import { Timeline } from 'antd';
import PlatformList from '@/pages/PlatformList/PlatformList';

class App extends React.Component{
  public render() {
    return (
      <div className="app">
        {/*<Timeline>*/}
        {/*  <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>*/}
        {/*  <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>*/}
        {/*  <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>*/}
        {/*  <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>*/}
        {/*</Timeline>,*/}
        <PlatformList />
      </div>
    )
  }
}

export function render() {
  ReactDOM.render(<App />, document.getElementById('root'));
}
