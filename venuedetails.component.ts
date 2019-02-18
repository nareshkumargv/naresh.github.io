import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

import { VenuesService } from '../services/venues.service';
import { StatesService } from '../services/states.service';
import { CitiesService } from '../services/cities.service';
import { SublocationsService } from '../services/Sublocations.service';
import { ClientFacilitiesService } from '../services/clientfacilities.service';
import { FacilitiesService } from '../services/facilities.service';
import { BusinessHoursService } from '../services/businesshours.service';
import { ClientGalleryService } from '../services/clientgallery.service';

import { ClientExtrasService } from '../services/ClientExtras.service';

@Component({
  selector: 'venueProfile',
  templateUrl: './venuedetails.component.html',
  providers: [VenuesService, StatesService, CitiesService, SublocationsService, ClientFacilitiesService,
    FacilitiesService, BusinessHoursService, ClientGalleryService, ClientExtrasService]
})
export class VenueProfileComponent {
  public id: any;
  private sub: any;
  selectedfdata: any[] = [];
  selectedcfdata: any[] = [];
  venueservicedata: any[] = [];

  venueslist: Venues[] = [];
  facilitieslist: Facilities[] = [];
  facilitieslistservicedata: Facilities[] = [];  

  stateslist: States[] = [];
  stateservicedata: any[] = [];
  selectedstate: States[] = [];

  citieslist: Cities[] = [];
  citiesservicedata: any[] = [];
  selectedcity: Cities[] = [];

  sublocations: Sublocations[] = [];
  sublocationsservicedata: any[] = [];
  selectedsublocation: Sublocations[] = [];

  clientfacilities: ClientFacilities[] = [];
  clientfacilitiesservicedata: any[] = [];
  selectedclientfacilities: any[] = [];

  businesshours: BusinessHours[];
  businesshoursservicedata: BusinessHours[] = [];
  clientbusinesshours: any[] = [];

  clientgallery: ClientGallery[] = [];
  clientgalleryservicedata: ClientGallery[] = [];
  clientimagegallery: any[] = [];

  clientextras: ClientExtras[] = [];
  clientextrasservicedata: ClientExtras[] = [];
  clientextraslist: any[] = [];

  constructor(public http: HttpClient, private router: Router, private route: ActivatedRoute,
    private _venuesservice: VenuesService,
    private _statesservice: StatesService,
    private _citiesservice: CitiesService,
    private _sublocationsservice: SublocationsService,
    private _clientfacilitiesservice: ClientFacilitiesService,
    private _facilitiesservice: FacilitiesService,
    private _businesshoursservice: BusinessHoursService,
    private _clientgalleryservice: ClientGalleryService,
    private _clientextrasservice: ClientExtrasService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      //this.id = params['username'];     
      this.id = +params['id'];
      console.log(this.id);
    });

    this._venuesservice.getVenues().subscribe((sres:Venues[]) => {
      this.venueslist = sres;
     // console.log(this.venueslist);
      this.selectedfdata = this.venueslist.filter((vdata) => vdata.id = this.id);
     // console.log(this.selectedfdata);
    });

    return forkJoin([this._venuesservice.getVenues(), this._statesservice.getStates(),
      this._citiesservice.getCities(), this._sublocationsservice.getSublocations(),
      this._clientfacilitiesservice.getClientFacilities(), this._facilitiesservice.getFacilities(),
      this._businesshoursservice.getBusinessHours(), this._clientgalleryservice.getClientGallery(), this._clientextrasservice.getClientExtras()])
      .subscribe((data: any[]) => {
        this.venueservicedata = data[0];
        this.stateservicedata = data[1];
        this.citiesservicedata = data[2];
        this.sublocationsservicedata = data[3];
        this.clientfacilitiesservicedata = data[4];
        this.facilitieslistservicedata = data[5];
        this.businesshoursservicedata = data[6];
        this.clientgalleryservicedata = data[7];
        this.clientextrasservicedata = data[8];

        //console.log(this.facilitieslistservicedata);
        //console.log(this.clientfacilitiesservicedata);
        console.log(this.clientextrasservicedata);

        for (var i = 0; i < this.venueservicedata.length; i++) {
          if (this.venueservicedata[i].state === this.stateservicedata[i].id) {
            this.selectedstate.push(this.stateservicedata[i]);
            //console.log(this.selectedstate);
          }
        }

        for (var i = 0; i < this.venueservicedata.length; i++) {
          if (this.venueservicedata[i].city === this.citiesservicedata[i].id) {
            this.selectedcity.push(this.citiesservicedata[i]);
            //console.log(this.selectedcity);
          }
        }

        for (var i = 0; i < this.venueservicedata.length; i++) {
          if (this.venueservicedata[i].state === this.sublocationsservicedata[i].sid && this.venueservicedata[i].city === this.sublocationsservicedata[i].cid && this.venueservicedata[i].sublocation == this.sublocationsservicedata[i].id) {
            this.selectedsublocation.push(this.sublocationsservicedata[i]);
            //console.log(this.selectedsublocation);
          }
        }

        //for (var i = 0; i < this.clientfacilitiesservicedata.length; i++) {
        //  if (this.clientfacilitiesservicedata[i].facilityid === this.facilitieslistservicedata[i].id) {
        //    this.selectedclientfacilities.push(this.clientfacilitiesservicedata[i]);
        //    console.log(this.selectedclientfacilities);
        //  }
        //}

        for (var i = 0; i < this.clientfacilitiesservicedata.length; i++) {
         // if (this.clientfacilitiesservicedata[i].username === this.id ) {
         // if ( this.facilitieslistservicedata[i].id === this.clientfacilitiesservicedata[i].facilityid) {

          if (this.clientfacilitiesservicedata[i].cid === this.id && this.facilitieslistservicedata[i].id === this.clientfacilitiesservicedata[i].id) {
            this.selectedclientfacilities.push(this.facilitieslistservicedata[i]);
          //  console.log(this.selectedclientfacilities);
          }
        };

        for (var i = 0; i < this.businesshoursservicedata.length; i++) {
          if (this.businesshoursservicedata[i].cid === this.id) {            
            this.clientbusinesshours.push(this.businesshoursservicedata[i]);
            //console.log(this.clientbusinesshours);
          }
        };

        for (var i = 0; i < this.clientgalleryservicedata.length; i++) {
          if (this.clientgalleryservicedata[i].clientid === this.id) {
            this.clientimagegallery.push(this.clientgalleryservicedata[i]);
            console.log(this.clientimagegallery);
          }
        }

     
        
      });

  }

}

export class Venues {
  constructor(
    public id: number,
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
    public dayprice: string,
    public image: string) { }
};

export class Sublocations {
  constructor(public id: number, public sid: number, public cid: number, locname: string) { }
};
export class States {
  constructor(public id: number, public statename: string) { }
};
export class Cities {
  constructor(public id: number, public sid: number, public cityname: string) { }
};
export class ClientFacilities {
  constructor(public id: number, public username: string, public facilityid: number) { }
};
export class Facilities {
  constructor(public id: number, public Facilityname: string, Facilityicon: string) { }
};
export class ClientGallery {
  constructor(public id: number, public clientid: number, Imageurl: string) { }};
export class BusinessHours {
  constructor(public id: number, public cid: number, weekday: string, opentime:string, closetime:string) { }};

export class ClientExtras {
  constructor(public id: number, public clientid: number, cfacilityid: number,description: string, price: string) { }
};

