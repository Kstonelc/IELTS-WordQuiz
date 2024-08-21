import { analysisWords, uploadFile } from '@/apis/words';
import {
  PageContainer,
  ProFormSelect,
  ProFormText,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { Button, message, Spin } from 'antd';
import { useState } from 'react';

const WordAnalysis = () => {
  const [iterating, setIterating] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [firstWord, setFirstWord] = useState(null);
  return (
    <PageContainer>
      <Spin spinning={isLoading}>
        <ProFormUploadDragger
          label="上传听写文件"
          description="上传.xlsx文件"
          fieldProps={{
            style: { width: 500 },
            accept: '.xlsx',
            maxCount: 1,
            customRequest: async (options) => {
              const { onSuccess, onError, file, onProgress } = options;
              setFileName(file.name);
              const formData = new FormData();
              formData.append('file', file);
              try {
                onProgress({ percent: 0 }, file);
                const res = await uploadFile(formData, (progressEvent) => {
                  if (progressEvent.lengthComputable) {
                    onProgress(
                      { percent: (progressEvent.loaded / progressEvent.total) * 100 },
                      file,
                    );
                  }
                });
                if (res.ok) {
                  const result = res.data;
                  onSuccess(result, file);
                }
              } catch (e) {
                onError(e);
              }
            },
          }}
        />
        <ProFormSelect
          label={'第几轮复习'}
          options={[
            {
              value: '1',
              label: '第一轮',
            },
            {
              value: '2',
              label: '第二轮',
            },
            {
              value: '3',
              label: '第三轮',
            },
            {
              value: '4',
              label: '第四轮',
            },
            {
              value: '5',
              label: '第五轮',
            },
            {
              value: '6',
              label: '第六轮',
            },
          ]}
          name="iterating"
          mode="tags"
          placeholder="第几轮啦第几轮啦第几轮啦?"
          onChange={(value) => {
            setIterating(value);
          }}
          fieldProps={{
            style: { width: 300 },
          }}
        />
        <ProFormText
          label={'首个听写单词'}
          onChange={(e) => {
            setFirstWord(e.target.value);
          }}
          fieldProps={{
            style: { width: 300 },
          }}
        ></ProFormText>
        <Button
          type={'primary'}
          onClick={async () => {
            setIsLoading(true);
            if (fileName && iterating && firstWord) {
              const response = await analysisWords({
                iterating: iterating,
                file_name: fileName,
                first_word: firstWord,
              });

              // 创建一个临时链接来触发下载
              const url = window.URL.createObjectURL(response);
              const a = document.createElement('a');
              a.href = url;
              a.download = '雅思听力王分析结果.xlsx';
              document.body.appendChild(a);
              a.click();
              a.remove();
              window.URL.revokeObjectURL(url);
            } else {
              message.warning('请填写分析日期 上传听写文件并且填写首个听写单词');
            }
            setIsLoading(false);
          }}
        >
          分析文件
        </Button>
      </Spin>
    </PageContainer>
  );
};

export default WordAnalysis;
