import { createSelector, createFeatureSelector } from '@ngrx/store';
import ToDoState from './todo.state';
import ToDo from './todo.model';

export const getToDosState = createFeatureSelector<ToDoState>('todos');

export const getSelectTodosState = createSelector(
  getToDosState,
  (state: ToDoState, props: ToDo) => state.ToDos.filter(todos => todos.Title.includes(props.Title) )
);
