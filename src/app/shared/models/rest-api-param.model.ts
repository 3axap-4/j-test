import { HttpHeaders, HttpParams } from '@angular/common/http';

interface IOptions {
  headers?: HttpHeaders | {
    [header: string]: any;
  };
  params?: HttpParams | {
    [param: string]: any;
  };
  responseType?: any;
  withCredentials?: boolean;
  observe?: any;
}

interface IParam {
  endpoint: string;
}

// tslint:disable-next-line: no-empty-interface
export interface IGetParam extends IParam { }
