import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  baseUrlProjects = environment.pupayUrl
  baseUrlIdpUrlUpload = environment.idpUrlUpload
  basedUrlIdfyService = environment.idfyService
  basedUrlOllamaService = environment.ollamaService

  constructor(private http: HttpClient) { }


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }


  private getHeaders_connectr(): HttpHeaders {
    const token = localStorage.getItem('connector') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  //Fetch API
  // /get_invoice_full_details/{invoice_number}
  // /get_po_full_details/{po_number}

  getData(TABLE_NAME: string, ID: string) {
    console.log(TABLE_NAME, 'table');

    // console.log("TABLE_NAME",TABLE_NAME, ID)
    return this.http.get(`${this.baseUrlProjects}/get_` + TABLE_NAME + '_full_details/' + ID, { headers: this.getHeaders() })
  }


  getPO() {
    // return this.http.get('10.0.0.141:30102/get/invoice_details/BATCH-20250428-001');
    // return this.http.get('10.0.0.141:30102/get/invoice_details/BATCH-20250428-001');
    return this.http.get(`${this.baseUrlProjects}/get_po_full_details/PC24-25_PO%20333`, { headers: this.getHeaders() });

  }
  getPOLineitems() {
    return this.http.get(`${this.baseUrlProjects}/get_records_by_po_id/po_line_items/3`, { headers: this.getHeaders() });
  }

  //Invoice Data
  getInvoices() {
    // return this.http.get('10.0.0.141:30102/get/invoice_details/BATCH-20250428-001');
    return this.http.get(`${this.baseUrlProjects}/get_records_by_invoice_no/invoice_details/4`, { headers: this.getHeaders() });
  }
  getInvoicesLineitems() {
    return this.http.get(`${this.baseUrlProjects}/get_records_by_invoice_no/invoice_lineitems/4`, { headers: this.getHeaders() });
  }
  getInvoiceData() {
    // return this.http.get('10.0.0.141:30102/get_invoice_full_details/INB38027A2400169');JAC_24-25_001074
    return this.http.get(`${this.baseUrlProjects}/get_invoice_full_details/JAC_24-25_001074`, { headers: this.getHeaders() });
  }

  //MRN Data
  getMRN() {
    return this.http.get(`${this.baseUrlProjects}/get_records_by_grn_no/mrn_details/PC24-25RAO%202`, { headers: this.getHeaders() });
  }

  getMRNLineitems() {
    return this.http.get(`${this.baseUrlProjects}/get_records_by_grn_no/mrn_lineitems/PC24-25RAO%202`, { headers: this.getHeaders() });
  }


  pdf_conversion_hypotus() {
    return this.http.get(`${this.baseUrlProjects}/get_conversion_details`, { headers: this.getHeaders() })
  }

  // ${this.baseUrlProjects}/classification_details
  classification_details() {
    return this.http.get(`${this.baseUrlProjects}/classification_details`, { headers: this.getHeaders() })
  }

  showextraction(claim_id: string) {
    return this.http.get(`${this.baseUrlProjects}/get_claim_id_classification_details/${claim_id}`, { headers: this.getHeaders() })
  }
  bbox_api(image_path: string) {
    return this.http.get(`${this.baseUrlProjects}/get_bbox/${image_path}`, { headers: this.getHeaders() })
  }
  get_invoice_po_match(invoice_number: any) {
    return this.http.get(`${this.baseUrlProjects}/get_invoice_po_match/${invoice_number}`, { headers: this.getHeaders() })
  }
  get_invoice_po_details() {
    return this.http.get(`${this.baseUrlProjects}/invoice_po_details`, { headers: this.getHeaders() })
  }

  invoice_po_details_by_id(invoice_number: any) {
    return this.http.get(`${this.baseUrlProjects}/invoice_po_details/${invoice_number}`, { headers: this.getHeaders() })
  }

  way_match_checklist(invoice_number: any) {
    return this.http.get(`${this.baseUrlProjects}/get_3_way_match_checklist/${invoice_number}`, { headers: this.getHeaders() })
  }
  get_metadata_checklist(invoice_number: any) {
    return this.http.get(`${this.baseUrlProjects}/get_metadata_checklist/${invoice_number}`, { headers: this.getHeaders() })
  }
  image_duplicates(id: any) {
    return this.http.get(`${this.baseUrlProjects}/image_duplicates/${id}`, { headers: this.getHeaders() })
  }
  upload(body: any) {
    return this.http.post(`127.0.0.1:8001/upload`, body, { headers: this.getHeaders() })
  }
  // /po_list_details
  po_list_details(vendor_name: any) {
    return this.http.get(`${this.baseUrlProjects}/po_list_details/${vendor_name}`, { headers: this.getHeaders() })
  }

  invoice_detials_based_on_id(batch_id: any) {
    return this.http.get(`${this.baseUrlProjects}/invoice_detials_based_on_id/${batch_id}`, { headers: this.getHeaders() })
  }
  generate_invoice_checklist(invoice_id: any) {
    return this.http.get(`${this.baseUrlProjects}/invoice_checklist_screen/${invoice_id}`, { headers: this.getHeaders() })
  }
  add_po_details_to_invoice(body: any) {
    return this.http.put(`${this.baseUrlProjects}/update_po_ref`, body, { headers: this.getHeaders() })
  }
  invoice_checklist(invoice_id: any, batch_id: any) {
    return this.http.get(`${this.baseUrlProjects}/invoice-checklist/${invoice_id}/${batch_id}`, { headers: this.getHeaders() })
  }
  compare_invoice_ewaybill_by_number(invoice_id: any) {
    return this.http.get(`${this.baseUrlProjects}/compare_invoice_ewaybill_by_number/${invoice_id}`, { headers: this.getHeaders() })
  }




  clasification_Update_Data(data: any) {
    // return this.http.post(environment.url + 'users/register', data)
    return this.http.put(`${this.baseUrlProjects}/classification_details/${data['image']}/${data['top_label']}`, {}, { headers: this.getHeaders() })
  }

  get_progress_bar_count(batchId: any) {
    // return this.http.post(environment.url + 'users/register', data)
    return this.http.get(`${this.baseUrlProjects}/progress-files/${batchId}`, { headers: this.getHeaders_connectr() })
  }





  // 127.0.0.1:8000/entities/user/
  entitysUrl: any = environment.apiUrl
  entities_user(user_id: any) {
    return this.http.get(`${this.entitysUrl}/entities/user/${user_id}`, { headers: this.getHeaders() })
  }

  // /projects/{project_id}/users
  projects_user(user_id: any) {
    return this.http.get(`${this.entitysUrl}/users/${user_id}/projects`, { headers: this.getHeaders() })
  }
  project_create(data: any) {
    return this.http.post(`${this.entitysUrl}/projects`, data, { headers: this.getHeaders() })
  }
  project_by_id(user_id: any) {
    return this.http.get(`${this.entitysUrl}/projects/${user_id}`, { headers: this.getHeaders() })
  }


  updateProjectManager(project_id: any, manager_id: any) {
    return this.http.post(`${this.entitysUrl}/projects/${project_id}/${manager_id}`, { headers: this.getHeaders() })
  }

  create_user(data: any) {
    return this.http.post(`${this.entitysUrl}/users`, data, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
  connector(data: any) {
    return this.http.post(`${this.entitysUrl}/connector`, data, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
  user_access(data: any) {
    return this.http.post(`${this.entitysUrl}/user_access`, data, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getUsersByProjects(user_id: any): any {
    return this.http.get(`${this.entitysUrl}/projects/${user_id}/users`, { headers: this.getHeaders() })
  }


  project_status_update(data: any): any {
    return this.http.post(`${this.entitysUrl}/update_project_status`, data, { headers: this.getHeaders() })
  }



  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something went wrong!';
    if (error.error instanceof ErrorEvent) {
      // Client-side/network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      if (error.status === 400) {
        errorMessage = error.error.detail || 'Bad request';
      } else if (error.status === 500) {
        errorMessage = 'Server error: please try again later.';
      }
    }
    return throwError(() => new Error(errorMessage));
  }



  create_entities(data: any) {
    return this.http.post(`${this.entitysUrl}/entities`, data, { headers: this.getHeaders() })
  }


  get_all_entities() {
    return this.http.get(`${this.entitysUrl}/entities`, { headers: this.getHeaders() })
  }


  get_all_users() {
    return this.http.get(`${this.entitysUrl}/users`, { headers: this.getHeaders() })
  }


  getImageUrl(filePath: string): string {
    console.log('Caling the filepath api');

    return `${this.baseUrlIdpUrlUpload}/image/?file_path=${encodeURIComponent(filePath)}`;
  }



  getDocumentByFileId(fileId: string) {
    return this.http.get<Document>(`${this.baseUrlIdpUrlUpload}/get_document/${fileId}`);
  }



  /////IDFy////

  verifyGstin(data: any) {
    return this.http.get<Document>(`${this.basedUrlIdfyService}/verify-gst/${data}`);
  }

  verifyPan(data: any) {
    return this.http.get<Document>(`${this.basedUrlIdfyService}/verify-pan/${data}/2025-10-06/Ey%20Company`);
  }

  verifyMems(data: any) {
    return this.http.get<Document>(`${this.basedUrlIdfyService}/verify-request-udyam/${data}`);
  }


  getFilesByBatch(data: any) {
    return this.http.get<Document>(`${this.baseUrlIdpUrlUpload}/files/by_batch/${data}`);
  }


  verifybd(bank_no: any, ifsc_code: any) {
    return this.http.get<Document>(`${this.basedUrlIdfyService}/verify-bank/${bank_no}/${ifsc_code}`);
  }



  extracte_image(data: any) {
    return this.http.post(`${this.baseUrlIdpUrlUpload}/extracte_image`, data, { headers: this.getHeaders_connectr() });
  }


  updateLLMParseJson(fileId: string, manualJson: any) {
    return this.http.put(`${this.baseUrlIdpUrlUpload}/update_llm_parse_json/${fileId}`, {
      manual_json: manualJson,
    });
  }

}
