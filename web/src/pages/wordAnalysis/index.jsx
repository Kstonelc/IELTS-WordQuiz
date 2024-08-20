import { analysisWords, uploadFile } from '@/apis/words';
import { PageContainer, ProFormSelect, ProFormUploadDragger } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useState } from 'react';

const WordAnalysis = () => {
  const [analysisDate, setAnalysisDate] = useState(null);
  const [fileName, setFileName] = useState(null);
  return (
    <PageContainer>
      <ProFormUploadDragger
        name="上传雅思听写文件"
        label="上传雅思听写文件"
        description="上传.xlsx文件"
        fieldProps={{
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
                  onProgress({ percent: (progressEvent.loaded / progressEvent.total) * 100 }, file);
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
        label={'分析日期'}
        name="analysis_date"
        mode="tags"
        placeholder="请输入你要分析的日期(可多选)"
        onChange={(value) => {
          setAnalysisDate(value);
        }}
        fieldProps={{
          style: { width: 300 },
        }}
      />
      <Button
        type={'primary'}
        onClick={async () => {
          if (fileName && analysisDate) {
            await analysisWords({
              analysis_date: analysisDate,
              file_name: fileName,
            });
          } else {
            message.warning('请填写分析日期并且上传听写文件');
          }
        }}
      >
        分析文件
      </Button>
    </PageContainer>
  );
};

export default WordAnalysis;
