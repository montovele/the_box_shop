import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {

  constructor(
    public dialog_ref: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { 

  }

  ngOnInit(): void {
  }

  closeDialog(response: boolean){
    this.dialog_ref.close(response);
  }

}
