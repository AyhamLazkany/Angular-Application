import { Component, OnInit , Inject } from '@angular/core';
import { Leader } from '../3. Shared/leader';
import { LeaderService } from '../2. services/leader.service';
import { flyInOut , expand } from '../5. animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [flyInOut(), expand()]
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
