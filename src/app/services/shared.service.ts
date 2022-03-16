import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    constructor(private http: HttpClient) {}

    /**http get request to fetch the data from the server */
    getAllUsers(): Observable<any> {
        return this.http.get('api/users', {});
    }

}