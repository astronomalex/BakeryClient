import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bun} from "../_models/bun";
import {AddBunsDto} from "../_models/add-buns-dto";

@Injectable({
  providedIn: 'root'
})
export class BunService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllBuns(): Observable<Bun[]> {
    return this.http.get<Bun[]>(this.baseUrl + 'Bun');
  }

  addBuns(dto: AddBunsDto) {
    return this.http.post<number>(this.baseUrl + 'Bun/addlist', dto);
  }

  Remove(id: number) {
    return this.http.post<boolean>(this.baseUrl + 'Bun/remove', id);
  }
}
