import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../models/user';
import {EmployeeData} from '../models/employee';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  addEmployeeForm: FormGroup;
  submitted = false;

  currentUser: User;
  users: User[] = [];
  employee: any = [];
  empDetail: any = [];

  // title: string;
  // price: number;

  constructor(
    private userService: UserService,
    private fb: FormBuilder) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    this.addEmployee();
    this.getEmployee();
  }

  // show = false;
  addEmployee() {
    // this.show = !this.show
    this.addEmployeeForm = this.fb.group({
      userName: [this.empDetail.userName? this.empDetail.userName : '', Validators.required],
      mobile: [this.empDetail.mobile? this.empDetail.mobile : '', Validators.required],
      email: [this.empDetail.email? this.empDetail.email : '', Validators.required],
      designation: [this.empDetail.designation? this.empDetail.designation : '', Validators.required],
      gender: [this.empDetail.gender? this.empDetail.gender : '', Validators.required],
    })
  }

  get details(){
    return this.addEmployeeForm.controls;
  }

  saveEmployee() {
    this.submitted = true;
    console.log(this.addEmployeeForm.value);
    this.userService.addEmployee(this.addEmployeeForm.value)
    .subscribe(res => {
      this.getEmployee();
    });
    this.addEmployeeForm.reset();
  }

  getEmployee() {
    this.userService.getEmployee().subscribe((res) => this.employee = res);
  }

  deleteEmp(email: any) {
    this.userService.deleteEmployee(email).subscribe((res) => {
      this.getEmployee();
    })
  }

  editEmp(_id: any) {
    this.userService.getEmployeeById(_id).subscribe((res) => this.empDetail = res)
    // this.userService.editEmployee(_id, this.addEmployeeForm.value).subscribe((res) => console.log(res))
  }

}
