import { TestBed } from '@angular/core/testing';

import { Todo.InterceptorService } from './todo.interceptor.service';

describe('Todo.InterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Todo.InterceptorService = TestBed.get(Todo.InterceptorService);
    expect(service).toBeTruthy();
  });
});
