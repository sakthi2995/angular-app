import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  private url = "https://ballistictest.azurewebsites.net/api/customers";

  constructor(private httpClient: HttpClient) {}

  getCustomers() {
    return this.httpClient.get(this.url);
  }
}
