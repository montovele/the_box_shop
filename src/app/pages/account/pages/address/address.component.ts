import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/_services/auth.service';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(
  public auth_service: AuthService
  ) { 
  }

  ngOnInit() {
  }

}
