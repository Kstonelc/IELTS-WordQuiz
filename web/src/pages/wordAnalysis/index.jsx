import appHelper from '@/AppHelper';
import { PageContainer, ProFormUploadDragger } from '@ant-design/pro-components';

const WordAnalysis = () => {
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
            try {
              onProgress({ percent: 0 }, file);
              const res = await appHelper.cosUploadFile('/words/', file, (progressEvent) => {
                onProgress({ percent: (progressEvent.loaded / progressEvent.total) * 100 });
              });
              onSuccess(res, file);
            } catch (e) {
              onError(e);
            }
          },
        }}
      />
    </PageContainer>
  );
};

export default WordAnalysis;
