import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { map, catchError, tap } from 'rxjs/operators';
import { EmployeeData } from '../models/employee';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class UserService {
  baseUrl = environment.baseUrl;

    constructor (private http: HttpClient) { }


    register(user: User) {
        return this.http.post(this.baseUrl + `/user/signup`,user, httpOptions);
    }

    getEmployee() {
      return this.http.get(this.baseUrl + `/employee`);
    }

    addEmployee (employee: EmployeeData): Observable<EmployeeData> {
        return this.http.post<EmployeeData>(this.baseUrl + `/employee`, employee, httpOptions);
      }

      editEmployee(_id, data){
        return this.http.put<EmployeeData>(this.baseUrl + `/employee?id=${_id}`, data, httpOptions)
      }
      deleteEmployee(email){
        return this.http.delete(this.baseUrl + `/employee?email=${email}`)
      }
      getEmployeeById(_id) {
        return this.http.get(this.baseUrl + `/employeeById/${_id}`)
      }
}