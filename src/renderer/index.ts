import dva from 'dva';
import PlatformModel from '@/models/platform';
import RouterConfig from '@/router';
import 'antd/dist/antd.css';
import history from '@/utils/history';
import ArticleModel from '@/models/article';
import TaskModel from '@/models/task';
import EnvironmentModel from '@/models/environment';

const app = dva({
  history,
  initialState: {
  },
});

app.model(PlatformModel);
app.model(ArticleModel);
app.model(TaskModel);
app.model(EnvironmentModel);

// import { render } from '@/App';
//
// render();

app.router(RouterConfig);

app.start('#root');
