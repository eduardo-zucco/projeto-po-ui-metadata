import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PoMetadata, PoMetadataField } from '../../interfaces/metadata/po-metadata-field';

@Injectable({
  providedIn: 'root'
})
export class DynamicTableService {

  constructor(private http: HttpClient) { }

  getMetadata(entityName: string): Observable<PoMetadata>
  {
    return this.http.get<PoMetadata>(`http://localhost:5000/api/${entityName}/metadata`);
  }

   getData(entityName: string, params: any): Observable<any>
  {
    return this.http.get<any>(`http://localhost:5000/api/${entityName}`, { params });
  }

  deleteItem(entityName: string, id: string): Observable<any>
  {
    return this.http.delete(`http://localhost:5000/api/${entityName}/${id}`);
  }
}
