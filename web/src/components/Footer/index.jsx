import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright="Powered by ChangShen"
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Kstonelc/IELTS-WordQuiz',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
