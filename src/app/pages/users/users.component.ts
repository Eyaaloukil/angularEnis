import { Component, OnInit } from '@angular/core';
import { Member } from 'src/models/member.model';
import { MemberServiceService } from 'src/services/member-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  base64Data;
  retrievedImage;
  displayedColumns: string[] = ['id', 'cin', 'nom','prenom','email', 'cv', 'createdDate', 'actions'];
  dataSource: Member[] = [];
  searchText;
  constructor(
    private memberService :MemberServiceService,private sanitizer:DomSanitizer

  ) { }

  getImage(test){
    this.base64Data = test;
    let image = 'data:image/jpeg;base64,' + this.base64Data;
    this.retrievedImage=this.sanitizer.bypassSecurityTrustUrl(image);
    return this.retrievedImage;
  }

  ngOnInit(): void {
    this.fetchDataSource();
  }

  private fetchDataSource(): void {
    this.memberService.getAllMembers().then(data => this.dataSource = data);
  }

}
