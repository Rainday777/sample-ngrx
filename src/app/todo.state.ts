import ToDo from './todo.model';

export default class ToDoState {
  ToDos: Array<ToDo>;
  ToDoError: Error;
}

export const initializeState = () => {
  return { ToDos: Array<ToDo>() };
};

