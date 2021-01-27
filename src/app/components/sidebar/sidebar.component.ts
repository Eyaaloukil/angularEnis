import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberServiceService } from 'src/services/member-service.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [

    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/publications', title: 'Publications',  icon:'ni-folder-17 text-blue', class: '' },
    { path: '/outils', title: 'Outils',  icon:'ni-settings text-blue', class: '' },
    { path: '/evenements', title: 'Evenements',  icon:'ni-calendar-grid-58 text-blue', class: '' },
    { path: '/users', title: 'Utilisateurs',  icon:'ni-circle-08 text-blue', class: '' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  tokenInfo;

  constructor(private router: Router,public memberService: MemberServiceService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });


}
  isLoggedIn(){
    if(this.memberService.getToken()){
      return true    }


  return false; }

}
