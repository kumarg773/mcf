import { Component } from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {
   title = 'MCF';
   show: string;
   loginState = localStorage.getItem('CurrentUser');

   data: any = [
      {
         name: "Home",
         link: "/dashboard",
         font: "fa-home",
         active: false, show: true,
         children: [
         ],
      },
      {
         name: "Product Details",
         link: "#",
         font: "fa-table",
         active: false, show: true,
         children: [
            {
               name: "Product Information",
               link: "/product-information",
               font: "fa-circle-o",
               active: false, show: true,
               subfont: "fa-angle-down pull-right"
            },
            {
               name: "Currency Information",
               link: "/currency-information",
               font: "fa-circle-o",
               active: false, show: true,
               subfont: "fa-angle-down pull-right"
            },
            {
               name: "Variant Information",
               link: "/variant-information",
               font: "fa-circle-o",
               active: false, show: true,
               subfont: "fa-angle-down pull-right"
            },
            {
               name: "Product Pricing",
               link: "/product-pricing",
               font: "fa-circle-o",
               active: false, show: true,
               subfont: "fa-angle-down pull-right"
            },
         ],
         subfont: "fa-angle-down pull-right"
      },
      // {
      //    name: "Partner Details",
      //    link: "/partner-details",
      //    font: "fa-bars",
      //    active: false, show: true,
      //    children: [

      //    ],
      //    subfont: "fa-angle-down pull-right"
      // },
      {
         name: "Server Details",
         link: "/server-details",
         font: "fa-cloud",
         active: false, show: true,
         children: [

         ],
         subfont: "fa-angle-down pull-right"
      },
      {
         name: "Database Details",
         link: "/database-details",
         font: "fa-database",
         active: false, show: true,
         children: [

         ],
         subfont: "fa-angle-down pull-right"
      },
      {
         name: "Client Details",
         link: "/client-details",
         font: "fa-users",
         active: false, show: true,
         children: [

         ],
         subfont: "fa-angle-down pull-right"
      }
   ];

   constructor() { }

   change(e: any, event: string) {
      //console.log(e.currentTarget)
      let check: any;
      let val = document.getElementById(event);
      if (val) {
         check = val.classList.contains("democlass");
      }
      var elems = Array.from(document.querySelectorAll(".democlass"));
      var elemsw = Array.from(document.querySelectorAll(".democlass1"));
      var elemse = Array.from(document.querySelectorAll(".democlass2"));
      var elems1 = Array.from(document.querySelectorAll(".active1"));
      var elems2 = Array.from(document.querySelectorAll(".active2"));
      var elems3 = Array.from(document.querySelectorAll(".active3"));
      var elems4 = Array.from(document.querySelectorAll(".active4"));
      this.forFunc(elems, 'democlass');
      this.forFunc(elemsw, 'democlass1');
      this.forFunc(elemse, 'democlass2');
      this.forFunc(elems1, 'active1');
      this.forFunc(elems2, 'active2');
      this.forFunc(elems3, 'active3');
      this.forFunc(elems4, 'active4');
      e.currentTarget.classList.add('active1');
      if (val && check == false) {
         if (event == val.id) {
            val.classList.toggle("democlass");
         }
      }
   }

   change1(e: any, event: string) {
      let check: any;
      let val = document.getElementById(event);
      if (val) {
         check = val.classList.contains("democlass1");
      }
      var elems = Array.from(document.querySelectorAll(".democlass1"));
      var elemsw = Array.from(document.querySelectorAll(".democlass2"));
      var elems1 = Array.from(document.querySelectorAll(".active2"));
      var elems2 = Array.from(document.querySelectorAll(".active3"));
      var elems3 = Array.from(document.querySelectorAll(".active4"));
      this.forFunc(elems, 'democlass1');
      this.forFunc(elemsw, 'democlass2');
      this.forFunc(elems1, 'active2');
      this.forFunc(elems2, 'active3');
      this.forFunc(elems3, 'active4');
      e.target.classList.add('active2');
      e.stopPropagation()
      if (val && check == false) {
         if (event == val.id) {
            val.classList.toggle("democlass1");
         }
      }
      e.stopPropagation()
   }

   change2(e: any, event: string) {
      let check: any;
      let val = document.getElementById(event);
      if (val) {
         check = val.classList.contains("democlass2");
      }
      var elems = Array.from(document.querySelectorAll(".democlass2"));
      var elems1 = Array.from(document.querySelectorAll(".active3"));
      var elems2 = Array.from(document.querySelectorAll(".active4"));
      this.forFunc(elems, 'democlass2');
      this.forFunc(elems1, 'active3');
      this.forFunc(elems2, 'active4');
      e.target.classList.add('active3');
      e.stopPropagation()
      if (val && check == false) {
         if (event == val.id) {
            val.classList.toggle("democlass2");
         }
      }
      e.stopPropagation()
   }

   change3(e: any) {
      var elems1 = Array.from(document.querySelectorAll(".active4"));
      this.forFunc(elems1, 'active4');
      e.target.classList.add('active4');
      e.stopPropagation()
   }

   forFunc(para, para1) {
      para.forEach(function (e) {
         e.classList.remove(para1)
      });
   }

   ngDoCheck(){
      this.loginState = localStorage.getItem('CurrentUser');
   }
}
