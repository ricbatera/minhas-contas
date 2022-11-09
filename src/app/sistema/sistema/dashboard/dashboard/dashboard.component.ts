import { Component, OnInit } from '@angular/core';
import { DatabaseServiceService } from 'src/app/services/database-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  constructor(
    private db: DatabaseServiceService
  ) { }

  ngOnInit(): void {
  }

}
