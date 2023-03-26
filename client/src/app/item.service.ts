import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Item} from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private url = 'http://localhost:5200';
  private items$: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient) {
  }

  getItems(options: { params: HttpParams }): Observable<Item[]> {
    this.httpClient.get<Item[]>(`${this.url}/items/`,
      {
        params: options.params
      })
      .subscribe(items => {
        this.items$.next(items);
      });
    return this.items$;
  }

  getItem(id: string): Observable<Item> {
    return this.httpClient.get<Item>(`${this.url}/items/${id}`);
  }

  createItem(item: Item): Observable<string> {
    return this.httpClient.post(`${this.url}/items`, item, {responseType: 'text'});
  }

  updateItem(id: string, item: Item): Observable<string> {
    return this.httpClient.put(`${this.url}/items/${id}`, item, {responseType: 'text'});
  }

  deleteItem(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/items/${id}`, {responseType: 'text'});
  }
}
