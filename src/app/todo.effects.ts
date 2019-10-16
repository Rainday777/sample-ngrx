import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import ToDo from './todo.model';
import * as ToDoActions from './todo.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

@Injectable()
export class ToDoEffects {
  constructor(private http: HttpClient, private action$: Actions) {}

  private ApiURL = 'http://127.0.0.1:44308/api/ToDo';

  GetToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginGetToDoAction),
      mergeMap(action =>
        this.http.get(this.ApiURL).pipe(
          map((data: ToDo[]) => {
            console.log('data', data);
            return ToDoActions.SuccessGetToDoAction({ payload: data });
          }),
          catchError((error: Error) => {
            console.log('error --', error);
            return of(ToDoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  );

// dummy action
/*
  CreateToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginCreateToDoAction),
      mergeMap(action =>
        this.http
          .post(this.ApiURL, JSON.stringify(action.payload)
            )
          .pipe(
            map((data: ToDo) => {
              console.log('data---->', data);
              return ToDoActions.DummyAction();
            }),
            catchError((error: Error) => {
              console.log('error---->', error);
              return of(ToDoActions.ErrorToDoAction(error));
            })
          )
      )
    )
  );

*/

  CreateToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginCreateToDoAction),
      mergeMap(action =>
        this.http
          .post(this.ApiURL, JSON.stringify(action.payload)
            )
          .pipe(
            map((data: ToDo) => {
              console.log('data---->', data);
              return ToDoActions.SuccessCreateToDoAction({ payload: data });
              //return ToDoActions.CreateToDoAction(action.payload);
            }),
            catchError((error: Error) => {
              console.log('error---->', error);
              return of(ToDoActions.ErrorToDoAction(error));
            })
          )
      )
    )
  );

}
