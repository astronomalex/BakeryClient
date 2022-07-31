import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../_models/category";
import {EditCategoryDto} from "../_models/edit-category-dto";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<EditCategoryDto[]> {
    return this.http.get<EditCategoryDto[]>(this.baseUrl + 'Category');
  }

  updateCategory(dto: EditCategoryDto): Observable<Category> {
    return this.http.put<Category>(this.baseUrl + 'Category/update', dto)
  }
}
