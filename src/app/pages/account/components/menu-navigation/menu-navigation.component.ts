import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DecisionComponent } from 'src/app/shared/dialogs/decision/decision.component';
import { AuthService } from 'src/app/shared/_services/auth.service';

@Component({
  selector: 'app-menu-navigation',
  templateUrl: './menu-navigation.component.html',
  styleUrls: ['./menu-navigation.component.css']
})
export class MenuNavigationComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private authService: AuthService,) { }

  ngOnInit() {
  }

  logout(){
    
    const dialogRef = this.dialog.open(DecisionComponent, {
      width: '500px',
      data: {
        text: "cerrar sesión?"
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.authService.logout();
      }
    });
  }
}
