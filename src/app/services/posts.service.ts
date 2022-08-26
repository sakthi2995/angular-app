import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})

export class PostsService {
  private getURL = `${environment.baseURL}/api/customers`;
  private postURL = `${environment.baseURL}/api/customer`;

  constructor(private httpClient: HttpClient) { }

  getCustomers() {
    return this.httpClient.get(this.getURL);
  }

  postCustomer(payload) {
    return this.httpClient.post(this.postURL, {
      firstcustomer: btoa(payload),
      timestamp: new Date().toISOString(),
    }, {
      headers: {
        'x-client-id': '12345'
      }
    })
  }
}
