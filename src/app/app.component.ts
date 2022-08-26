import { Component, OnInit } from "@angular/core";
import { PostsService } from "./services/posts.service";
import { ICustomer } from "./app.component.types";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "poc-app";
  customers: ICustomer[];
  locationData = [
    {
      location: "Ontario",
      code: "ON",
    },
    {
      location: "Quebec",
      code: "QC",
    },
    {
      location: "Nova Scotia",
      code: "NS",
    },
    {
      location: "New Brunswick",
      code: "NB",
    },
    {
      location: "Manitoba",
      code: "MB",
    },
    {
      location: "British Columbia",
      code: "BC",
    },
    {
      location: "Prince Edward Island",
      code: "PE",
    },
    {
      location: "Saskatchewan",
      code: "SK",
    },
    {
      location: "Alberta",
      code: "AB",
    },
    {
      location: "Newfoundland and Labrador",
      code: "NL",
    },
  ];
  name: any;

  constructor(private service: PostsService) {}

  ngOnInit() {
    this.service.getCustomers().subscribe((response) => {
      this.customers = this.updateCustomers(response);
      console.log(this.updateCustomers(response));
    });
  }

  updateCustomers(customers) {
    return customers.map((item) => {
      const { name, ...rest } = item;
      const [firstName, lastName] = name.split(" ");
      const loc = this.locationData.find(({ code }) => code === item.location);
      if (loc) {
        return { ...rest, firstName, lastName, province: loc.location };
      } else return { ...rest, firstName, lastName, province: "" };
    });
  }
}
