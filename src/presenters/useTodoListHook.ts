import { useReducer, useRef, useState } from 'react';
import TodoList, { Item } from '../entities/Todolist';

export type TodoActions = 'create' | 'toggle' | 'remove';
export type TodolistDispatch = (action: TodoActions, payload: any) => void;
export type useTodoListResponse = [Item[], TodolistDispatch];

export default function useTodoListHook(
  initialTodos: Item[],
): useTodoListResponse {
  const todolist = useRef(new TodoList(initialTodos));
  const [todos, setTodos] = useState<Item[]>([...todolist.current.items]);

  const dispatch = (action: TodoActions, payload: any) => {
    switch (action) {
      case 'create':
        todolist.current.create(payload.description);
        setTodos([...todolist.current.items]);
        break;
      case 'toggle':
        todolist.current.toggle(payload.id);
        setTodos([...todolist.current.items]);
        break;
      case 'remove':
        todolist.current.remove(payload.id);
        setTodos([...todolist.current.items]);
        break;
    }
  };

  return [todos, dispatch];
}
