import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGetParam } from '../models/rest-api-param.model';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private httpClient: HttpClient) { }

  public get<TModel>({endpoint}: IGetParam): Observable<TModel> {
    return this.httpClient
      .get<TModel>(endpoint);
  }
}
