import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auths/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  logoutUser(){
    this.authService.logout()
  }

}
