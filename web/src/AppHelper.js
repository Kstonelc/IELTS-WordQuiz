import COS from 'cos-js-sdk-v5';
import EventEmitter from 'eventemitter3';
import config from './config/app.json';
class AppHelper {
  config;
  _events;
  constructor() {
    this.config = config;
    this._events = new EventEmitter();
  }

  //region 事件

  emitEvent(event, args) {
    this._events.emit(event, args);
  }

  onEvent(event, callback) {
    this._events.on(event, callback);
  }

  offEvent(event) {
    this._events.off(event);
  }

  //endregion
  // region combineUrl
  combineUrls(...urls) {
    if (!this.isArray(urls) || urls.length <= 0) {
      return '';
    }
    let url = urls[0];
    if (urls.length > 1) {
      for (let i = 1; i < url.length; i++) {
        const path = urls[i];
        if (path) {
          url = `${this.trimEnd(url, '/')}/${this.trimStart(path, '/')}`;
        }
      }
    }
    return url;
  }
  //endregion
  // region 上传cos
  cosUploadFile(keyPrefix, fileObj, onProgress) {
    const cos = new COS({
      SecretId: this.config.cosSecretId,
      SecretKey: this.config.cosSecretKey,
    });
    return new Promise((resolve, reject) => {
      cos.putObject(
        {
          Bucket: this.config.cosBucket,
          Region: this.config.cosRegion,
          Key: keyPrefix + fileObj.name,
          Body: fileObj,
          onProgress: (progressData) => {
            onProgress(progressData);
          },
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        },
      );
    });
  }
  // endregion
  //region 其他
  isObject(arg) {
    return typeof arg === 'object';
  }

  isString(arg) {
    return typeof arg === 'string';
  }

  isArray(arg) {
    return Array.isArray(arg);
  }

  isFunction(arg) {
    return typeof arg === 'function';
  }

  isInteger(arg) {
    return Number.isInteger(arg);
  }

  trimStart(value, pattern = ' ') {
    const regExp = new RegExp(`^${pattern}+`);
    return value.replace(regExp, '');
  }

  trimEnd(value, pattern = ' ') {
    const regExp = new RegExp(`${pattern}+$`);
    return value.replace(regExp, '');
  }

  trim(value, pattern = ' ') {
    return this.trimStart(value, pattern).trimEnd(value, pattern);
  }

  toPercentage(value, digits = 0) {
    if (isNaN(value)) {
      return '';
    }
    return (value * 100).toFixed(digits) + '%';
  }
  //endregion
}

export default new AppHelper();
