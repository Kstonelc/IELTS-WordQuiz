import { request } from 'umi';
export async function analysisWords(data) {
  return request('/api/words/words-analysis', {
    method: 'POST',
    data: data,
    responseType: 'blob',
    parseResponse: false,
  });
}

export async function uploadFile(data, onUploadProgress) {
  return request('/api/words/upload-file', {
    method: 'POST',
    data: data,
    onUploadProgress,
  });
}
