import { Component, OnInit } from '@angular/core';
import { EditUserUseCase } from '../use-cases/edit-user/edit-user.usecase';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public editUseCase: EditUserUseCase) {
      this.editUseCase.execute();
      //.then();
   }

  ngOnInit() {
  }

}