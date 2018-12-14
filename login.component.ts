import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  startPage : Number;
  paginationLimit:Number; 
  title:String;
  list:any;
  constructor() {

    this.title = "Angular: Show more/show less pagination";
    this.list = [
      {name:'Prashobh',age:'25'},
      {name:'Abraham',age:'35'},
      {name:'Anil',age:'40'},
      {name:'Sam',age:'40'},
      {name:'Philip',age:'40'},
      {name:'Bal',age:'40'},
      {name:'Anu',age:'20'},
      {name:'Sam',age:'25'},
      {name:'Rocky',age:'35'},
      {name:'Major',age:'40'},
      {name:'Kian',age:'40'},
      {name:'Karan',age:'40'},
      {name:'Bal',age:'40'},
      {name:'Anu',age:'20'},
      {name:'Prashobh',age:'25'},
      {name:'Abraham',age:'35'},
      {name:'Anil',age:'40'},
      {name:'Sam',age:'40'},
      {name:'Philip',age:'40'},
      {name:'Bal',age:'40'},
      {name:'Anu',age:'20'}
    ]
    this.startPage = 0;
    this.paginationLimit = 5;

   }

   showMoreItems()
   {
      this.paginationLimit = Number(this.list.length);        
   }
   showLessItems()
   {
     this.paginationLimit = Number(this.list.length) - (this.list.length - 5);
   }

  ngOnInit() {
    

  }

}
