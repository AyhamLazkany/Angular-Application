import { Component, OnInit , Inject } from '@angular/core';
import { Leader } from '../3. Shared/leader';
import { LeaderService } from '../2. services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders!: Leader[];
  errMsg!: string;

  constructor(private leaderSevice: LeaderService ,
    @Inject('BaseURL') public BaseURL: any) { }

  ngOnInit(): void {
    this.leaderSevice.getLeaders().subscribe((leaders) => (this.leaders = leaders),
    errmsg => this.errMsg = <any>errmsg);
  }

}
