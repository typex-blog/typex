import * as React from 'react';
import { useEffect, useState } from 'react';
import { settingStorage } from '@@/storage';
import { Button, Input, Modal } from 'antd';

export const CheckEndpointModal = () => {
  const [endpoint, setEndpoint] = useState('');
  const [loadEndpoint, setLoadEndpoint] = useState(false);
  const [requireInputEndpoint, setRequireInputEndpoint] = useState(false);
  useEffect(() => {
    setEndpoint(settingStorage.getApiEndpoint());
    setLoadEndpoint(true);
  }, []);

  useEffect(() => {
    if (!endpoint && loadEndpoint) {
      setRequireInputEndpoint(true);
    }
  }, [endpoint, loadEndpoint]);

  const saveEndpoint = () => {
    settingStorage.setApiEndpoint(endpoint || '');
    setRequireInputEndpoint(false);
  };

  return (
    <Modal
      title="请输入服务器地址"
      visible={ requireInputEndpoint }
      footer={ [
        <Button onClick={ saveEndpoint } type="primary">保存</Button>
      ] }
      closable={ false }
    >
      <Input onChange={ (event) => setEndpoint(event.target.value) } value={ endpoint }/>
    </Modal>
  );
};
