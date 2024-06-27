import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/_services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  code:string;
  error: boolean = false;
  constructor(private APIauth: AuthService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.route.queryParams
    .subscribe(params => {
      this.verifyAccount(params['code']);
    });
   }

  ngOnInit() {
  }

  verifyAccount(code){
    this.APIauth.verifyAccount(code).subscribe(data =>{
      if(!data.status){
        this.error = true;
      }
    }, error =>{
      this.error = true
    })
  }

}
