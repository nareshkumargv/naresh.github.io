import { NgModule, Component, Inject, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { DatePipe, Time } from '@angular/common';
import { MouseEvent } from '@agm/core';
import { Subscription, of } from 'rxjs';
import { delay, share } from 'rxjs/operators';
import { ElementRef } from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
//import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

// import * as $ from 'jquery';
// window['$'] = window['jQuery'] = $;

import 'easy-responsive-tabs';

import { StatesService } from '../shared/states.service';
import { CitiesService } from '../shared/cities.service';
import { SublocationsService } from '../shared/Sublocations.service'; 
import { VenuesService } from '../shared/venues.service';
import { ClientGalleryService } from '../shared/clientgallery.service';
import { ClientRoomService } from '../shared/clientrooms.service';

import { VenueTypeOptionsService } from '../shared/venuetypeoptions.service';
import { ClientVenueTypeOptionsService } from '../shared/ClientVenueTypeOptions.service';
import { AvailabilityService } from '../shared/availability.service';
import { EventsService } from '../shared/events.service';
import { ClientExtrasService } from '../shared/clientextras.services';

declare var $: any;

@Component({
    selector: 'venuesdetails',
    templateUrl: './venuedetails.component.html',
    styleUrls: ['./venuedetails.component.css'],
    providers: [VenuesService,StatesService,CitiesService,
      SublocationsService,ClientGalleryService,
      ClientRoomService,VenueTypeOptionsService,ClientVenueTypeOptionsService, 
      AvailabilityService,EventsService,ClientExtrasService]
  })
  export class VenueDetailComponent {
    @Output() cartItemChanged = new EventEmitter<{ productId: number }>();
    @Output() refresh:EventEmitter<string> = new EventEmitter(); 
    @ViewChild('submitButton') submitButton:ElementRef;
 // google maps zoom level
 zoom: number = 8;
  
 // initial center position for the map
 lat: number = 17.4188247;
 lng: number = 78.4354001;
// 17.4188247,78.4354001
 clickedMarker(label: string, index: number) {
   console.log(`clicked the marker: ${label || index}`)
 }
 
 mapClicked($event: MouseEvent) {
   this.markers.push({
     lat: $event.coords.lat,
     lng: $event.coords.lng,
     draggable: true
   });
 }
 
 markerDragEnd(m: marker, $event: MouseEvent) {
   console.log('dragEnd', m, $event);
 }
 
 markers: marker[] = [
   {
     lat: 51.673858,
     lng: 7.815982,
     label: 'A',
     draggable: true
   }
 ]

    cid: string;
    public sub: any;
    public statesList: States[];
    public citieslist: Cities[] = [];
    public locationslist: Sublocations[] = [];

    venueslist: Venues[] = [];
    venueservicedata: any[] = [];  
    selectedfdata: any[] = []; 

    stateservicedata: any[] = [];
    citiesservicedata: any[] = [];
    sublocationsservicedata: any[] = [];
  
    selectedstate: States[] = [];
    selectedcity: Cities[] = [];
    selectedsublocation: Sublocations[] = [];

    clientgallery: ClientGallery[] = [];
    clientgalleryservicedata: ClientGallery[] = [];
    clientimagegallery: any[] = [];

    venuespaces: ClientRooms[] = []
    venuespaceservicedata: ClientRooms[] = [];
    selectedvenuespacelist: any[] = [];

    venuetypeoptions: VenueTypeOptions[] = [];
    venuetypeoptionservicedata: VenueTypeOptions[] = [];
    venuetypeoptionslist: any[] = [];

    availability:Availability[] = [];
    availabilityservicedata:Availability[] = [];
    availabilitycheck:any[] = [];

    clientextras:ClientExtras[];
    clientextrasservicedata:ClientExtras[] = [];
    clientextraslist:any[] = [];   

    eventslist:any;
    events: any;
    options: any;

    public show_dialog: boolean = false;
    public show_availability : boolean = false;

    public selectedroom: any;
    public selectedroomname: any;

  public ClientID: string;
  public HourPrice: number = 0;
  public WeekPrice: number = 0;
  public MonthlyPrice: number = 0;
  public DayPrice: number = 0;

  public hrs = "1";
  public itemid: number;
  public itemname: string;
  public itemprice: number;
  public itemqty: number;
  public quantity: number;
  public ItemIcon: string = "";
  public totalItem: number = 0;
  public price: number = 0;
  public Qty: number = 0;
  public totalPrice: number = 0;
  public totalQty: number = 0;
  public SubtotalPrice: number = 0;
  public GrandtotalPrice: number = 0;

  public exqty : number = 1; 
  public CQty:number = 1;

  public cartDetails: CartItemDetails[] = [];

    Durationdata: SelectItem[];
    Duration:string;
    clientvenuetypeoptions: ClientVenueTypeOptions[] = [];
    clientvenuetypeoptionsservicedata: ClientVenueTypeOptions[] = [];
    clientvenuetypeoptionslist: any[] = [];
    selectedcntvtoptions: any[] = [];
    selectedseattype: any[] = [];

    public selectedroomtype:any;
    public selectedroomlist:any;

  radioSel: any;
  radioSelected: string;
  radioSelectedString: string;

  selected = "";
  today: Date;
  hourdate: Date;
  hourtime: Date;

  public hournohrs = 1;
  public noweeks = 1;
  public nodays = 1;
  public nopersons = 1;
  public nomonths = 1;
  
  sdate: Date;
  val: number;
  public scount: any;
  public stime: any;
  public tothrs: any;
  public selectedhDate: any;
  public selectedhTime: any;
  public selectednofhrs: any;
  public selectednoofweeks: any;
  public selectednoofmonths: any;
  public selectednoofdays: any;
  public selectednofpersons: any;
  public todaysdate: any;
  public totalprice: any;
  public Btotalprice:any;
  public totdays: any;
  public weeklytodate: any;
  public weekdate: any;
  public checkoutdate:any;
  public monthlytodate: any;
  public mtodate: any;
  public dailytodate: any;
  public dtodate: any;
  // public selectedroom: any;
  // public selectedroomname: any;
  public total: any;
  public selhDate: any;

  public showHourInvoice: boolean = false;
  public showWeeklyInvoice: boolean = false;
  public showMonthlyInvoice: boolean = false;
  public showDailyInvoice: boolean = false;
  public showinvdiv: boolean = true;

  public cartflag:boolean= false;
  public checkoutbtn:boolean= false;  

  display: boolean = false;
  public key: string;

  public allItems: any  = {}; 

 public hselectedstartdate: any;
 checklist:any;
 checkedList:any;

 totitems:any[] = [];

    constructor(public http: HttpClient, 
      private router: Router, 
      private route: ActivatedRoute,
      private _venuesservice: VenuesService,
      private _statesservice:StatesService,
      private _citiesservice: CitiesService,
      private _sublocationsservice: SublocationsService,
      private _clientgalleryservice: ClientGalleryService,
      private _clientroomservice:ClientRoomService,      
      private _clientvenuetypeoptionsservice: ClientVenueTypeOptionsService,
      private _venuetypeoptionsservice: VenueTypeOptionsService,
      private _availabilityservice:AvailabilityService,
      private _eventsservice:EventsService,
      private _clientextrasservice:ClientExtrasService      
      ){    
        this.Durationdata = [
          { label: 'Hourly', value: 'Hourly' },
          { label: 'Weekly', value: 'Weekly' },
          { label: 'Monthly', value: 'Monthly' },
          { label: 'AllDay', value: 'AllDay' }
        ];                
           }
         
    ngOnInit() {         
//tabs
$(document).ready(function () {
  //console.log('Jquery');
  $('#parentHorizontalTab').easyResponsiveTabs({
  type: 'default', //Types: default, vertical, accordion
  width: 'auto', //auto or any width like 600px
  fit: true, // 100% fit in a container
  tabidentify: 'hor_1', // The tab groups identifier
  activate: function(event) { // Callback function if tab is switched
  var $tab = $(this);
  var $info = $('#nested-tabInfo');
  var $name = $('span', $info);
  $name.text($tab.text());
  $info.show();
  }
  });
  });
//tabs

      this.sub = this.route.params.subscribe(params => {
        this.cid = params['cid'];
        console.log(this.cid);
      });

      this._venuesservice.getVenues().subscribe((sres: Venues[]) => {
        this.venueslist = sres;
        //console.log(this.venueslist);
         this.selectedfdata = this.venueslist.filter((vdata) => vdata.cid == this.cid);
         console.log(this.selectedfdata);      
      });  

      return forkJoin([
        this._statesservice.getStates(), 
        this._citiesservice.getCities(), 
        this._sublocationsservice.getSublocations(),
        this._clientgalleryservice.getClientGallery(),
        this._clientroomservice.getClientRooms(),
        this._clientvenuetypeoptionsservice.getClientVenueTypeOptions(),
        this._venuetypeoptionsservice.getVenueTypeOptions(), 
        this._availabilityservice.getAvailability(),
      //  this._eventsservice.getevents(),
        this._clientextrasservice.getclientextras()
      ])
        .subscribe((data:any[]) => {
          this.stateservicedata = data[0];
          this.citiesservicedata = data[1];
          this.sublocationsservicedata = data[2];
          this.clientgalleryservicedata = data[3];
          this.venuespaceservicedata = data[4];
          this.clientvenuetypeoptionsservicedata = data[5];
          this.venuetypeoptionservicedata = data[6];
          this.availabilityservicedata = data[7];
         this.clientextrasservicedata = data[8];
        
        
      this.selectedvenuespacelist = this.venuespaceservicedata.filter((sdata) => sdata.cid === this.cid);
     // console.log(this.selectedvenuespacelist); 

      this.clientimagegallery = this.clientgalleryservicedata.filter((sdata) => sdata.clientid === this.cid);
      //console.log(this.clientimagegallery);

      this.selectedroomtype = this.clientvenuetypeoptionsservicedata.filter((rdata) => rdata.cid === this.cid);
     // console.log(this.selectedroomtype);

     this.clientextraslist = this.clientextrasservicedata.filter((cextra) => cextra.clientid === this.cid);
     console.log(this.clientextraslist);

      for (var i = 0; i < this.selectedfdata.length; i++) {
          if (this.selectedfdata[i].state === this.stateservicedata[i].id) {
            this.selectedstate.push(this.stateservicedata[i]);
            //console.log(this.selectedstate);
          }
      }

        for (var i = 0; i < this.selectedfdata.length; i++) {
          if (this.selectedfdata[i].city === this.citiesservicedata[i].id && this.selectedfdata[i].state === this.stateservicedata[i].id ) {
            this.selectedcity.push(this.citiesservicedata[i]);
            //console.log(this.selectedcity);
          }
        }

        for (var i = 0; i < this.selectedfdata.length; i++) {
          if (this.selectedfdata[i].sublocation === this.sublocationsservicedata[i].id) {
            this.selectedsublocation.push(this.sublocationsservicedata[i]);
            //console.log(this.selectedsublocation);
          }
        }

      })
  }


  toggle(hid: any,hname:string) {
      console.log(hid,hname);
      this.show_dialog = !this.show_dialog;
      this.selectedroom = hid;
      console.log(this.selectedroom);
      this.selectedroomname = hname;
      console.log(this.selectedroomname);
      this.selectvenuehall();
      this.showcalendar();
  }

     selectvenuehall() {
      for (var i=0; i < this.selectedroomtype.length; i++ ) {
        if(this.selectedroomtype[i].roomid === this.selectedroom && this.venuetypeoptionservicedata[i].id === this.selectedroomtype[i].vtypeid) {
          this.selectedseattype.push(this.venuetypeoptionservicedata[i]);
         // console.log(this.selectedseattype);       
        }
      }    
    }

    showcalendar() {
      this._eventsservice.getevents().subscribe(events => {
        this.eventslist = events;
        this.events = this.eventslist.filter((edata) => edata.cid === this.cid && edata.hallid === this.selectedroom);
        console.log(this.events);        
      })

      this.options = { 
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin,listPlugin ],
        defaultDate: '2019-07-01',
       
          header: {
            left: 'prev,next today',
            center: 'title',           
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
          AllDay     : true,
          navLinks   : true,
          editable   : false,
          eventLimit : true            
      }
    }

    onItemChange(item: any) {
      console.log(item.id);
      //console.log(item.halltypename);  
      this.radioSelected = item.halltypename;
      //console.log(this.radioSelected);    
    }

    handleHourly() {
      const pipe = new DatePipe('en-US');     
      this.selectedhDate = pipe.transform(this.hourdate, 'yyyy-MM-dd hh:mm');
      //console.log(this.selectedhDate);
        this.selectedhTime = pipe.transform(this.hourdate, 'hh:mm');
        //console.log(this.selectedhTime);    
        this.selectednofhrs = this.hournohrs;
        this.selectednofpersons = this.nopersons;
  
        this.Duration = this.selected;     
  
        this.sdate = this.hourdate;
        this.weeklytodate = this.sdate.setHours(this.sdate.getHours() + (this.selectednofhrs));     
        this.checkoutdate = pipe.transform(this.weeklytodate, 'yyyy-MM-dd hh:mm');
        //console.log(this.checkoutdate);
        
        this.availabilitycheck = this.eventslist.filter((adata) => adata.start ===  this.selectedhDate && adata.starttime === this.selectedhTime );
        //this.availabilitycheck = this.eventslist.filter((adata) => adata.start ===  this.selectedhDate );
      //  console.log(this.availabilitycheck);
        this.show_availability = !this.show_availability;
      }   
    
    handleWeekly() {    
      const pipe = new DatePipe('en-US');  
      this.selectedhDate = pipe.transform(this.hourdate, 'yyyy-MM-dd hh:mm');
      console.log(this.selectedhDate);      
      this.selectedhTime = pipe.transform(this.hourdate, 'hh:mm');
      //console.log(this.selectedhTime);    
      this.selectednoofweeks = this.noweeks;
      this.selectednofpersons = this.nopersons;
      //console.log(this.selectednoofweeks);  
      
      this.sdate = this.hourdate;

      this.weeklytodate = this.sdate.setDate(this.sdate.getDate() + (this.selectednoofweeks * 6));     
      this.weekdate = pipe.transform(this.weeklytodate, 'yyyy-MM-dd hh:mm');
      //console.log(this.weekdate);

      this.availabilitycheck = this.eventslist.filter((adata) => adata.start ===  this.selectedhDate && adata.starttime === this.selectedhTime );
      console.log(this.availabilitycheck);
      this.show_availability = !this.show_availability;
    }

    handleMonthly() {
    //  alert('monthly');
      const pipe = new DatePipe('en-US');  
      this.selectedhDate = pipe.transform(this.hourdate, 'yyyy-MM-dd hh:mm');
      //console.log(this.selectedhDate);
      this.selectedhTime = pipe.transform(this.hourdate, 'hh:mm');
      //console.log(this.selectedhTime);    
      this.selectednoofmonths = this.nomonths;
      this.selectednofpersons = this.nopersons;

      this.sdate = this.hourdate;
      //this.monthlytodate = this.sdate.setDate(this.sdate.getDate() + (this.selectednoofmonths * 29));
      this.weeklytodate = this.sdate.setDate(this.sdate.getDate() + (this.selectednoofmonths * 29));    
      this.checkoutdate = pipe.transform(this.weeklytodate, 'yyyy-MM-dd hh:mm');
      //console.log(this.checkoutdate);

      this.availabilitycheck = this.eventslist.filter((adata) => adata.start ===  this.selectedhDate && adata.starttime === this.selectedhTime );
      //console.log(this.availabilitycheck);
      this.show_availability = !this.show_availability;
    }

    handleAllDay() {
    //  alert('All Day');
      const pipe = new DatePipe('en-US');  
      this.selectedhDate = pipe.transform(this.hourdate, 'yyyy-MM-dd hh:mm');
      //console.log(this.selectedhDate);
      this.selectedhTime = pipe.transform(this.hourdate, 'hh:mm');
      //console.log(this.selectedhTime);    
      this.selectednoofdays = this.nodays;
      this.selectednofpersons = this.nopersons;

      this.sdate = this.hourdate;
      //this.dailytodate = this.sdate.setDate(this.sdate.getDate() + this.selectednoofdays);
      this.weeklytodate = this.sdate.setDate(this.sdate.getDate() + this.selectednoofdays);    
      this.checkoutdate = pipe.transform(this.weeklytodate, 'yyyy-MM-dd hh:mm');
      //console.log(this.checkoutdate);

      this.availabilitycheck = this.eventslist.filter((adata) => adata.start ===  this.selectedhDate && adata.starttime === this.selectedhTime );
      //console.log(this.availabilitycheck);
      this.show_availability = !this.show_availability;
    }
  
    BookHourly(cid: any, hourprice: any) {
      this.showinvdiv = false;
      this.showHourInvoice = true;
      this.checkoutbtn = true;
      this.showWeeklyInvoice = false;
      this.showMonthlyInvoice = false;
      this.showDailyInvoice = false;
  
      const pipe = new DatePipe('en-US');
      this.ClientID = cid;
      this.HourPrice = hourprice;
      this.today = new Date();

      this.todaysdate = pipe.transform(this.today, 'yyyy-MM-dd hh:mm');
      this.Btotalprice = ((this.selectednofhrs * this.selectednofpersons) * this.HourPrice);      
     // this.GrandtotalPrice += this.totalprice; 
    }
 
    BookWeekly(cid: any, weekprice: any) {
      this.showinvdiv = false;
      this.showHourInvoice = false;
      this.showWeeklyInvoice = true;
      this.checkoutbtn = true;
      this.showMonthlyInvoice = false;
      this.showDailyInvoice = false;
  
      const pipe = new DatePipe('en-US');
      this.ClientID = cid;
      this.today = new Date();
     // this.todaysdate = [pipe.transform(this.today, 'dd/MM/yyyy')];
      this.WeekPrice = weekprice;
      this.Btotalprice = ((this.selectednoofweeks * this.selectednofpersons) * this.WeekPrice);
      this.sdate = this.hourdate;
      //console.log(this.sdate);
      //this.sdate.setDate(this.sdate.getDate() + 3);
      this.weeklytodate = this.sdate.setDate(this.sdate.getDate() + (this.selectednoofweeks * 6));     
      this.weekdate = pipe.transform(this.weeklytodate, 'dd/MM/yyyy');
     // console.log(this.weekdate);
    }
  
    BookMonthly(cid: any, monthprice: any) {
      this.showinvdiv = false;
      this.showHourInvoice = false;
      this.showWeeklyInvoice = false;
      this.showMonthlyInvoice = true;
      this.checkoutbtn = true;
      this.showDailyInvoice = false;
  
      const pipe = new DatePipe('en-US');
      this.ClientID = cid;
      this.today = new Date();
     // this.todaysdate = [pipe.transform(this.today, 'dd/MM/yyyy')];
      this.MonthlyPrice = monthprice;
      this.Btotalprice = ((this.selectednoofmonths * this.selectednofpersons) * this.MonthlyPrice);
  
      this.sdate = this.hourdate;
      console.log(this.sdate);
      //this.sdate.setDate(this.sdate.getDate() + 3);
      this.monthlytodate = this.sdate.setDate(this.sdate.getDate() + (this.selectednoofmonths * 29));
     // console.log(this.sdate);
     // console.log([pipe.transform(this.monthlytodate, 'dd/MM/yyyy')]);
      this.mtodate = pipe.transform(this.monthlytodate, 'dd/MM/yyyy');
    }
  
    BookaDay(cid: any, dayprice: any) {
      this.showinvdiv = false;
      this.showHourInvoice = false;
      this.showWeeklyInvoice = false;
      this.showMonthlyInvoice = false;
      this.showDailyInvoice = true;
      this.checkoutbtn = true;
  
      const pipe = new DatePipe('en-US');
      this.ClientID = cid;
      this.today = new Date();
      //console.log(this.today);
    //  this.todaysdate = [pipe.transform(this.today, 'dd/MM/yyyy')];
      //this.todaysdate = this.today;
      // console.log(this.todaysdate);
      this.DayPrice = dayprice;
      this.Btotalprice = ((this.selectednoofdays * this.selectednofpersons) * this.DayPrice);
  
      this.sdate = this.hourdate;
      //console.log(this.sdate);
      //this.sdate.setDate(this.sdate.getDate() + 3);
      this.dailytodate = this.sdate.setDate(this.sdate.getDate() + this.selectednoofdays);
      //console.log(this.sdate);
      //console.log([pipe.transform(this.dailytodate, 'dd/MM/yyyy')]);
      this.dtodate = pipe.transform(this.dailytodate, 'dd/MM/yyyy');
    }

    showDialog() {   
       this.display = true;
     
       let myObj = {
         clientid: this.cid,
         Bookingdate: this.todaysdate,
         Checkindate:this.selectedhDate,
         Checkoutdate:this.checkoutdate,         
         Selectedroomname: this.selectedroomname,
         Selectedseatingtype: this.radioSelected,
         Selectedduration: this.selected,
         Hourprice: this.HourPrice,         
         Noofhours: this.hournohrs,
         Noofweeks: this.selectednoofweeks,
         Noofmonths: this.selectednoofmonths,
         Noofdays: this.selectednoofdays,
         Noofguests: this.nopersons,         
         Totalprice: this.Btotalprice 
       };
       localStorage.setItem(this.key, JSON.stringify(myObj));
       localStorage.setItem("scart", JSON.stringify(this.cartDetails));
       localStorage.setItem("clientid", JSON.stringify(this.cid));
       
       localStorage.setItem("subtotal",JSON.stringify(this.SubtotalPrice));
       localStorage.setItem("grandtotal",JSON.stringify(this.GrandtotalPrice));
   
      // this.router.navigateByUrl('/mycart');
     }

     addItemstoCart() {
      this.ClientID = this.ClientID;
      this.HourPrice = this.HourPrice;
    }

    AddItems(id: any, cfacilityname: any, price: any,qty:any) {
      this.cartflag = true;
      console.log(id,cfacilityname,price,qty);

      this.itemid = id;
      this.itemname = cfacilityname;
      this.itemprice = price;
      this.itemqty = qty;
      var count: number = 0;   
      var ItemCountExist: number = 0;

      this.totalPrice = 0;
      this.totalQty = 0;
      this.SubtotalPrice = 0;
      this.GrandtotalPrice = 0;
   
      if (ItemCountExist <= 0) {
        this.cartDetails.push(
        new CartItemDetails(this.itemid, this.itemname, this.itemprice,this.itemqty));     
     //  this.SubtotalPrice += this.cartDetails[count].CItem_price; 
        this.totalItem = this.cartDetails.length; 
      //  console.log(this.totalItem);      
      }
     this.getItemTotalresult();
    // this.submitButton.nativeElement.disabled = true;    
    }

    //remove the selected item from the cart. 
    removeFromCart(removeIndex: any) {
      this.totalPrice = 0;
      this.totalQty = 0;
      this.SubtotalPrice = 0;
      this.GrandtotalPrice = 0;
      var count: number = 0;
      this.totalItem = this.cartDetails.length;
      this.cartDetails.splice(removeIndex, 1);
   
     for (count = 0; count < this.cartDetails.length; count++) { 
      this.totalPrice += this.cartDetails[count].CItem_price;
     // console.log(this.totalPrice);
      this.totalQty += (this.cartDetails[count].CQty);
     // console.log(this.totalQty);
      this.SubtotalPrice += this.cartDetails[count].CItem_price * this.cartDetails[count].CQty;
     // console.log(this.SubtotalPrice);      
      this.GrandtotalPrice = this.SubtotalPrice + this.Btotalprice; 
    }

    }

    onCartItemChanged(event) {
      const id = event.target.getAttribute('id');
      this.cartItemChanged.emit({
        productId: id
      });
  
      this.totalPrice = 0;
      this.totalQty = 0;
      this.SubtotalPrice = 0;
      this.GrandtotalPrice = 0;
      var count: number = 0;
      this.totalItem = this.cartDetails.length;
  
      for (count = 0; count < this.cartDetails.length; count++) {
       this.totalPrice += this.cartDetails[count].CItem_price;
     //  console.log(this.totalPrice);
       this.totalQty += (this.cartDetails[count].CQty);
      // console.log(this.totalQty);
       this.SubtotalPrice += this.cartDetails[count].CItem_price * this.cartDetails[count].CQty;
       console.log(this.SubtotalPrice);      
       this.GrandtotalPrice = this.SubtotalPrice + this.Btotalprice;
      // console.log(this.GrandtotalPrice);
      }
    }

    getItemTotalresult() {
        this.totalPrice = 0;
        this.totalQty = 0;
        this.GrandtotalPrice = 0;
        var count: number = 0;
     
        this.totalItem = this.cartDetails.length; 

        for (count = 0; count < this.cartDetails.length; count++) { 
          this.totalPrice += this.cartDetails[count].CItem_price;
        //  console.log(this.totalPrice);
          this.totalQty += (this.cartDetails[count].CQty);
        //  console.log(this.totalQty);
          this.SubtotalPrice += this.cartDetails[count].CItem_price * this.cartDetails[count].CQty;
        //  console.log(this.SubtotalPrice);      
          this.GrandtotalPrice = this.SubtotalPrice + this.Btotalprice;
          // console.log(this.GrandtotalPrice);
        }
      } 
       
    isAllSelected(id: any, cfacilityname: any, price: any,qty:any) {     
      this.cartflag = true;
      console.log(id,cfacilityname,price,qty);
      this.itemid = id;
      this.itemname = cfacilityname;
      this.itemprice = price;
      this.itemqty = qty;
      var count: number = 0;   
      var ItemCountExist: number = 0;
      this.totalPrice = 0;
      this.totalQty = 0;
      this.SubtotalPrice = 0;
      this.GrandtotalPrice = 0;

      this.checkedList = [];
      for (var i = 0; i < this.clientextraslist.length; i++) {
      if(this.clientextraslist[i].isSelected)
      this.checkedList.push(this.clientextraslist[i]);

      } 
  
      
    //  this.getCheckedItemList();   
      this.getItemTotalresult();   
    }      

    // getCheckedItemList(){     
    //     this.checkedList = [];
    //     for (var i = 0; i < this.clientextraslist.length; i++) {
    //       if(this.clientextraslist[i].isSelected)
    //       this.checkedList.push(this.clientextraslist[i]);
    //       console.log(this.checkedList);
    //     }
    // }




    }


    export class Venues {
      constructor(
        public id: number,
        public cid: string,
        public username: string,
        public title: string,
        public vtype: number,
        public address: string,
        public state: number,
        public city: number,
        public sublocation: number,
        public zipcode: string,
        public description: string,
        public hourprice: string,
        public BookingTotalPrice:string,
        public dayprice: string,
        public weekprice: string,
        public monthprice: string,
        public image: string) { }
    };
  
    export class States {
      constructor(public id: number, public statename: string) { }
    };
  
    export class Cities {
      constructor(public id: number, public sid: number, public cityname: string) { }
    };
  
    export class Sublocations {
      constructor(
        public id: number, public cid: number, locname: string) { }
    };
  
    export class ClientGallery {
      constructor(
        public id: number, 
        public clientid: string, 
        public Imageurl: string) { }
    };
  
    export class ClientRooms {
      constructor(
        public id: number, 
        public cid: string, 
        public Name: string, 
        public Area: string, 
        public Guests:number, 
        Description:string,
        Image:string) { }
    };
  
    export class SelectItem {
      constructor(public label: string, public value: string) { }
    };
  
    export class VenueTypeOptions {
      constructor(
        public id: number, 
        public halltypename: string, 
        public image: string) { }
    };
  
    export class ClientVenueTypeOptions {
      constructor(
        public id: number, 
        public cid: string, 
        public vtypeid: number, 
        public roomid: number) { }
    };
  
    interface marker {
      lat: number;
      lng: number;
      label?: string;
      draggable: boolean;
    }
    
    export class Availability {
      constructor(
        public id: number, 
        public cid: string, 
        public hallid: number, 
        public startdate:string,
        public enddate:string,
        public starttime:Time,
        public endtime:Time) { }
    };
  
    export class Events {
      constructor(
        public eventid: number, 
        public cid: string, 
        public hallid: number,
        public hallname: string,
        public title: string,
        public eventdesc: string,  
        public start:string,
        public end:string,
        public starttime:Time,
        public endtime:Time) { }
    };
  
    export class ClientExtras {
      constructor(
        public id: number, 
        public clientid: string, 
        public Cfacilityid: number,
        public Cfacilityname: string,
        public Cfacilityicon: string,
        public Description: string,  
        public Price:string) { }
    };
    export class CExtras {
      constructor(
        public id: number,
        public clientid: string,
        public cfacilityid: number,
        public cfacilityname: string,
        public cfacilityicon: string,
        public description: string,
        public price: number,
        public quantity: number,
        public totalPrice: number) { }
    };
  
    export class CartItemDetails {
      constructor(
        public CItem_id: number,
        public CItem_sname: string,
        public CItem_price: number,
        public CQty: number,
        ) { }
    };
  