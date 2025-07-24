import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { PoMetadata, PoMetadataField } from '../../interfaces/metadata/po-metadata-field';

@Injectable({
  providedIn: 'root'
})
export class DynamicTableService {

  constructor(private http: HttpClient) { }

 getMetadata(): Observable<any> {
    return this.http.get('http://localhost:5000/api/metadata/sw_parametros');
  }

  getData(): Observable<any> {
    return this.http.get('http://localhost:5000/api/sw_parametros');
  }

  getMetadataAndData() {
    return forkJoin([this.getMetadata(), this.getData()]);
  }
}
