import { Component, OnInit } from '@angular/core';
import { MatDialog , MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openLoginForm(): void {
    this.dialog.open(LoginComponent, {width:'450px' , height:'400px'});
  }

}
