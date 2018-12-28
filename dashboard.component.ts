import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardForm: FormGroup;

  id: string;
  constructor(private router: Router,public authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.id = localStorage.getItem('token');


    this.dashboardForm = this.formBuilder.group({
      userid: this.id,      
    });



  }

  logout(): void {
    console.log("Logout"); 
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
