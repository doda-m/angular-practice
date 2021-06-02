import { Component, OnInit } from '@angular/core';
import { Member } from '../member';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  member: Member = {
    id: 1,
    name: "Tanaka Taro"
  };

  constructor() { }

  ngOnInit(): void {
  }

}
