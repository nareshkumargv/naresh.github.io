import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { Order } from 'src/app/model/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
 
  orders:Order[] = [];
  selectedorder: any[] = []; 

  order$: Observable<any[]>;

  constructor(
    private auth: AuthService,
    private orderService: OrderService) {

      var user = JSON.parse(localStorage.getItem("user"));
      console.log(user.uid);

      this.orderService.getAllOrders().subscribe((ores:Order[])=> {
        this.orders = ores;
        console.log(this.orders);
       
        this.selectedorder = this.orders.filter((odata) => odata.user === user );
        console.log(this.selectedorder); 
      })

     }

  ngOnInit() {
    
    // this.order$ = this.auth.user$.pipe(switchMap(user => 
    //   this.orderService.getOrderByUser(user.uid).valueChanges())
    //   )

    // this._venuesservice.getVenues().subscribe((sres: Venues[]) => {
    //   this.venueslist = sres;
    //   //console.log(this.venueslist);
    //    this.selectedfdata = this.venueslist.filter((vdata) => vdata.cid == this.cid);
    //    console.log(this.selectedfdata);      
    // }); 

    

  }
 
}
