import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, AxiosError } from 'axios';
import { hashCode } from '@/utills/utills';

// header에 들어갈 수 있는 값을 정의
export interface CommonRequestHeader {
  'Content-Type': string;
  Accept: string;
  Authorization: string;
}

// RequestConfig를 정의
export interface CommonRequestConfig extends AxiosRequestConfig {
  headers?: AxiosRequestHeaders;
  doNotShowSpinner?: boolean; // spinner 노출 유무
  skipAlert?: boolean; // error 메시지 창 띄우는지 유무
  canceler?: (message?: string) => void;
}

// NetWork Error Message
export const enum NetworkErrorMessage {
  NETWORK_OFFLINE = '네트워크 연결상태를 확인한 뒤, 다시 시도해주세요.',
  CONNECTION_REFUSED = '서버와 통신이 원할하지 않습니다.',
}

/**
 * AxiosApi 클래스 정의
 */
class AxiosApi {
  private instance: AxiosInstance;
  private pending: Map<number, CommonRequestConfig>;
  private defaultRequestConfig: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
    },
    timeout: 30000,
  };
  private isOnline = true;

  /**
   * 생성자 함수
   */
  constructor(config?: CommonRequestConfig) {
    this.instance = axios.create(config || this.defaultRequestConfig);
    this.pending = new Map();

    const interceptors = this.instance.interceptors;
    interceptors.request.use(this.requestInterceptor.bind(this), Promise.reject);
    interceptors.response.use(this.responseInterceptor.bind(this), this.responseErrorHandler.bind(this));

    this.initEventListenr();
  }

  /**
   * Event Listenr 등록
   */
  private initEventListenr() {
    window.addEventListener('online', this.handleConnectionChange.bind(this));
    window.addEventListener('offline', this.handleConnectionChange.bind(this));
  }

  /**
   * Request 인터셉터 구현부
   */
  private async requestInterceptor(requestConfig: CommonRequestConfig): Promise<CommonRequestConfig> {
    if (this.pending.has(this.hashing(requestConfig))) {
      requestConfig.cancelToken = new axios.CancelToken((cancel) => cancel('Cancel duplicated request.'));
    } else {
      requestConfig.cancelToken = new axios.CancelToken((canceler) => (requestConfig.canceler = canceler));
    }

    this.addPending(requestConfig);

    if (!requestConfig.doNotShowSpinner) {
      // [TODO] rootStore.increaseSpinner();
    }

    return requestConfig;
  }

  /**
   * Response 인터셉터 구현부
   */
  private async responseInterceptor(response: AxiosResponse<any>): Promise<AxiosResponse<any>> {
    const config: CommonRequestConfig = response.config;
    const { data } = response;
    const { status, result } = data;

    this.removePending(config);

    if (!config.doNotShowSpinner) {
      // [TODO] rootStore.decreaseSpinner();
    }
    return response;
  }

  /**
   * Request 요청
   */
  public request<T = any>(config: CommonRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.request<T>(config);
  }

  /**
   * request 정보 저장
   * - Cancel Token을 위함
   */
  private addPending(config: CommonRequestConfig): void {
    const key = this.hashing(config);

    if (!this.pending.has(key)) {
      this.pending.set(key, config);
    }
  }

  /**
   * request 정보를 제거
   * - Cancel Token을 위함
   */
  private removePending(config: CommonRequestConfig): void {
    const key = this.hashing(config);
    this.pending.delete(key);
  }

  /**
   * 네트워크 에러 객체 생성
   */
  private createError(arg?: string | Error): Error {
    const ret = new Error();

    if (arg instanceof Error) {
      const { name, message, stack } = arg;
      ret.name = name;
      ret.message = message;
      ret.stack = stack;
    } else if (typeof arg === 'string') {
      ret.name = arg;
    }

    return ret;
  }

  /**
   * CancelToken을 위한 request configuration Hash값 반환
   */
  private hashing(config: CommonRequestConfig): number {
    const { url, method, data, params } = config;
    const headers = config.headers;
    const hdr = {};
    const exclude = ['Content-Type', 'Accept', 'Authorization', 'tracerId'];

    for (const key in headers) {
      if (
        typeof headers[key] !== 'object' &&
        Object.prototype.hasOwnProperty.call(headers, key) &&
        !exclude.some((exc) => exc === key)
      ) {
        hdr[key] = headers[key];
      }
    }

    const converter = (origin: object): string => {
      if (!origin) {
        return '';
      }

      if (typeof origin === 'string') {
        return origin;
      }

      if (origin instanceof FormData) {
        const ret = {};
        origin.forEach((value, key) => {
          ret[key] = value;
        });
        return JSON.stringify(ret);
      }

      if (typeof origin === 'object') {
        return JSON.stringify(origin);
      }

      return '';
    };

    let key = (url || '') + (method || '');
    key += converter(hdr);
    key += converter(params);
    key += converter(data);

    return hashCode(key);
  }

  /**
   * 응답 에러시 인터셉터 구현부
   */
  private async responseErrorHandler(error: AxiosError): Promise<any> {
    const config = error.config as CommonRequestConfig;

    if (!config || axios.isCancel(error)) {
      return error;
    }

    this.removePending(config);

    if (!config.doNotShowSpinner) {
      // [TODO] rootStore.decreaseSpinner();
    }

    const retErr = this.createError(error);

    if (!this.isOnline && error.request) {
      retErr.message = NetworkErrorMessage.NETWORK_OFFLINE;
    } else if (!error.response && (this.isOnline || !error.request)) {
      retErr.message = NetworkErrorMessage.CONNECTION_REFUSED;
    }

    if (!config.skipAlert) {
      alert(retErr.message);
    }

    return retErr;
  }

  /**
   * 네트워크 상태값 체크
   * @param { Object } event 이벤트
   */
  private handleConnectionChange(event: Event): void {
    const eventType = event.type;

    if (eventType === 'online') {
      this.isOnline = true;
    } else if (eventType === 'offline') {
      this.isOnline = false;
    } else {
      new Error('unknown Axios Event');
    }
  }
}

const httpClient = new AxiosApi();
export default httpClient;
