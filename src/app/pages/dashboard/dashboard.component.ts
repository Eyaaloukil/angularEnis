import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { Publication } from 'src/models/publication.model';
import { MemberServiceService } from 'src/services/member-service.service';
import { Member } from 'src/models/member.model';
import { Outil } from 'src/models/outil.model';
import { Evenement } from 'src/models/evenement.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
public dataOutils:any;
public dataEvents:any;

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  ngOnInit() {
    this.fetchDataSource();
    this.fetchDataSource1();
    this.fetchDataSourceOutils();
    this.fetchDataSourceEvents();
  }

  dataSource1: Member[] = [];

  dataSource: Publication[] = [];
  dataSourceOutils: Outil[] = [];
  dataSourceEvents: Evenement[] = [];
  

  constructor(
    private memberService :MemberServiceService,

  ) { }




  private fetchDataSource(): void {
    this.memberService.getAllPublications().then(data => this.dataSource = data);
  }
  private fetchDataSourceOutils(): void {
    this.memberService.getAllOutils().then(dataOutils => this.dataSourceOutils = dataOutils);
  }
  private fetchDataSourceEvents(): void {
    this.memberService.getAllEvenements().then(dataEvents => this.dataSourceEvents = dataEvents);
  }
  
  private fetchDataSource1(): void {
    this.memberService.getAllMembers().then(data => this.dataSource1 = data);
  }
  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
