import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { MemberServiceService } from 'src/services/member-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(private sanitizer:DomSanitizer,public memberService: MemberServiceService,location: Location,  private element: ElementRef, private router: Router) {
    this.location = location;
  }
  tokenInfo;
  item;
  base64Data;
  retrievedImage;

  onLogout(){
    this.memberService.deleteToken();
window.location.reload();

  }
  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    if(this.memberService.getToken()){
    this.tokenInfo = this.memberService.getDecodedAccessToken(this.memberService.getToken());
    this.memberService.getMemberById(this.memberService.getDecodedAccessToken(this.memberService.getToken()).authorities[0].split("ROLE")[0]).then(item => {
      this.item = item;
      this.base64Data = item.photo;
      let image = 'data:image/jpeg;base64,' + this.base64Data;
      this.retrievedImage=this.sanitizer.bypassSecurityTrustUrl(image);
    });}
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

}
