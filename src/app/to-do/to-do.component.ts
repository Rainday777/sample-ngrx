import { Component, OnInit, OnDestroy } from '@angular/core';
import ToDoState from '../todo.state';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import ToDo from '../todo.model';
import * as ToDoActions from '../todo.action';
import * as ToDoSelector from '../todo.selector';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit, OnDestroy {
  todo$: Observable<ToDoState>;
  ToDoSubscription: Subscription;
  ToDoList: ToDo[];
  ToDoSearchList: ToDo[];

  Title = '';
  SearchTitle = '';
  IsCompleted = false;

  todoError: Error;

  constructor(private store: Store<ToDoState>) {
    this.todo$ = store.pipe(select('todos'));
  }

  ngOnInit() {

     this.store.dispatch(ToDoActions.BeginGetToDoAction());

     this.ToDoSubscription = this.todo$
       .pipe(
         map(x => {
           this.ToDoList = x.ToDos;
           this.todoError = x.ToDoError;
         })
       )
       .subscribe();

  }


  createToDo() {
    const todo: ToDo = { Title: this.Title, IsCompleted: this.IsCompleted };
    this.store.dispatch(ToDoActions.BeginCreateToDoAction({ payload: todo }));
    console.log('store', this.store);
    this.Title = '';
    this.IsCompleted = false;
  }

  search(event) {
    this.store.pipe(select(ToDoSelector.getSelectTodosState, { Title : this.SearchTitle })).subscribe(
      todo => this.ToDoSearchList = todo
    )
    ;
    console.log(event, 'ToDoSearchList=', this.ToDoSearchList);
  }

  ngOnDestroy() {
   this.ToDoSubscription.unsubscribe();
  }
}
