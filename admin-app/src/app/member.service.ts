import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member } from './member';
import { MEMBERS } from './mock-members';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private membersUrl = 'api/members';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.membersUrl)
      .pipe(
        tap(members => this.log('got Employee Data')),
        catchError(this.handleError<Member[]>('getMembers', []))
      );
  }

  getMember(id: number): Observable<Member> {
    this.messageService.add(`MemberService: got Employee Data(id=${id})`);
    const url = `${this.membersUrl}/${id}`;
    return this.http.get<Member>(url)
      .pipe(
        tap(_ => this.log(`got an Employee Data(id=${id}`)),
        catchError(this.handleError<Member>(`getMember id=${id}`))
      );
  }

  updateMember(member: Member): Observable<any> {
    return this.http.put(this.membersUrl, member, this.httpOptions)
      .pipe(
        tap(_ => this.log(`modified the Employee Data(id=${member.id})`)),
        catchError(this.handleError<any>('updateMember'))
      )
  }

  private log(message: string) {
    this.messageService.add(`MemberService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} Failed: ${error.message}`);
      return of(result as T);
    }
  }
}
