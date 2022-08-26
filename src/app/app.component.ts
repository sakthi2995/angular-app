import { Component, OnInit } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { PostsService } from "./services/posts.service";
import { ICustomer } from "./app.component.types";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})

export class AppComponent implements OnInit {
  customers: ICustomer[];
  locationData = {
    "ON": "Ontario",
    "QC": "Quebec",
    "NS": "Nova Scotia",
    "NB": "New Brunswick",
    "MB": "Manitoba",
    "BC": "British Canada",
    "PE": "Prince Edward Island",
    "SK": "Saskatchewan",
    "AB": "Alberta",
    "NL": "Newfoundland and Labrador"
  };
  error: string;
  showModal = false
  showModalRowClick = false
  customerData = {
    name: '',
    location: '',
    id: 0,
  }

  constructor(private service: PostsService, public translate: TranslateService) {
    translate.addLangs(['en']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    const pattern = /en/;
    translate.use(browserLang.match(pattern) ? browserLang : 'en');
  }

  ngOnInit() {
    // Fetching customer details.
    this.service.getCustomers().subscribe((response) => {
      this.customers = this.updateCustomers(response);
      // Posting first customer information.
      this.service.postCustomer(response[0]).subscribe(() => {
        console.log("successfully posted customer data.")
      }, (error) => {
        this.error = error.statusText;
        this.showModal = true;
        setTimeout(() => {
          this.showModal = false
        }, 5000)
      })
    }, (error) => {
      this.error = error.statusText
      this.showModal = true
      setTimeout(() => {
        this.showModal = false
      }, 5000)
    })
  }

  updateCustomers(customers) {
    return customers.map((item) => {
      const { name, ...rest } = item;
      const [firstName, lastName] = name.split(" ");
      const province = this.locationData[rest.location];
      return { ...rest, firstName, lastName, province: province || '' };
    });
  }

  closeModal() {
    this.showModal = false
  }

  openModal(customer: ICustomer) {
    this.showModalRowClick = customer.active;
    this.customerData.name = customer.firstName + " " + customer.lastName
    this.customerData.location = customer.province
    this.customerData.id = customer.id
  }

  closeModalData() {
    this.showModalRowClick = false
  }
}
