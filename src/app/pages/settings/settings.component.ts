
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { RequestService } from 'src/app/shared/_services/request.service';
import { EditAddressDialogComponent } from 'src/app/shared/dialogs/edit-address-dialog/edit-address-dialog.component';
import { CreateAddressDialogComponent } from 'src/app/shared/dialogs/create-address-dialog/create-address-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user: any;
  addresses: any[] = [];

  accountId: string;
  alertMsg: string;
  loading = false;
  isShowSuccessAlert = false;

  constructor(
    private dialog: MatDialog,
    private API: RequestService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
  ) {
    // this.user = JSON.parse(localStorage.getItem('user'));
    // this.accountId = this.user.accountID;
  }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['success-snackbar'],
    });
  }

  logout() {
    this.authService.logout();
  }
}
