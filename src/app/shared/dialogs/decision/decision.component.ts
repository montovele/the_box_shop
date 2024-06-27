import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateAddressDialogComponent } from '../create-address-dialog/create-address-dialog.component';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.css']
})
export class DecisionComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialog: MatDialogRef<CreateAddressDialogComponent>
  ) { 
     console.log(data);
     
  }

  decision(decide:boolean){
    this.dialog.close(decide);
  }

  ngOnInit() {
  }

}
