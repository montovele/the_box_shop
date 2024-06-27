import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { RequestService } from 'src/app/shared/_services/request.service';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { UserService } from 'src/app/shared/_api/user.service';
import { FilterTypes, User, userFilter } from 'src/app/shared/_models/users/users.model';
import { fromEvent } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CreateUserDialogComponent } from 'src/app/shared/dialogs/create-user-dialog/create-user-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  @ViewChild('criteria', { static: true }) search_input: ElementRef;
  user_type_id:number = null;
  user_status_id:number = null;
  criteria:string = "";
  public user_list: Array <User>;
  public configuration: Config;
  public columns: Columns[] = [
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'E-Mail' },
    { key: 'phone', title: 'Phone' },
    { key: 'user_type', title: 'Type' },
    { key: 'user_status', title: 'Status', },
    { key: '', title: 'Acciones' },
  ];

  constructor(
    private users_api: UserService,
    private snack_bar: MatSnackBar,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.configuration = { ...DefaultConfig };
    this.configuration.tableLayout.striped = true;
    this.getUsers();
    this.searchLeads();
  }

  searchLeads() {
    fromEvent(this.search_input.nativeElement, 'keyup')
      .pipe(
        pluck('target', 'value'),
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe((criteria: string) => {
        this.criteria = criteria;
        this.user_type_id = null;
        this.user_status_id = null;
        this.dropChange(criteria, 3);
      });
  }

  dropChange(event:any, type:FilterTypes){
    event = (event == "null") ? null : event;
    if(type == 1){
      this.user_type_id = event;
    }
    if(type == 2){
      this.user_status_id = event;
    }
    if(type == 3){
      this.criteria = event;
    }
    this.getUsers();
  }

  getUsers(){
    let filter = new userFilter();
    filter.user_status_id = this.user_status_id;
    filter.user_type_id = this.user_type_id;
    filter.criteria = this.criteria;
    
   
  }

  userForm(){
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '500px',
      panelClass: 'full-dialog',
      data: {
      
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getUsers();
      }
    });
  }

  ngOnDestroy() {}

  openSnackBar(message: string, action: string) {
    this.snack_bar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['success-snackbar'],
    });
  }
}


