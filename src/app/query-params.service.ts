import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QueryParamsService {
  private queryParams: { tripType: string; region: string; budget: number } = {
    tripType: '',
    region: '',
    budget: 0,
  };

  constructor() {}

  setQueryParams(params: { tripType: string; region: string; budget: number }) {
    this.queryParams = { ...params };
  }

  getQueryParams() {
    return { ...this.queryParams };
  }
}
