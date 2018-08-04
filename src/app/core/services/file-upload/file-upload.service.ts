import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class FileUploadService {
  public urlToUpload = `${environment.apiUrl}/file/upload/`;

  constructor(public Http: HttpClient) {}

  public upload(formData, type) {
    return this.Http.post(this.urlToUpload + type, formData);
  }

}
