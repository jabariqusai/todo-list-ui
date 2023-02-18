import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
}

const useList = () => {
  const [state, setState] = useState<IState>({ items: [] });
 
  useEffect(()=>{
    retrievelist();
  },[]);
  
  const retrievelist=()=>{
    fetch('http://localhost:3005/list',{method:'GET'})
    .then(res =>res.json() as Promise<Todo.IItem[]>)
    .then(items => setState({items}));
  };
  //const add = (item: Todo.IItem) => setState(state => ({ ...state, items: state.items.concat(item) }));
  //instead it we do another thing to integrate with BE
 const add = (item :Todo.IItem)=>{
  
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
 }
 fetch(`http://localhost:3005/list`, options)
 .then(res => {
   if (res.status === 201) {
     console.debug('Successfully added item');
     return  retrievelist();
   } else {
     console.debug('Failed', res.status);
   }
 });
};
  
  //const remove = (id: string) => setState(state => ({ ...state, items: state.items.filter(item => item.id !== id) }));
  
  const remove = (id: string) => {
    fetch(`http://localhost:3005/list/:${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.status === 200) {
          console.debug('Successfully updated item');
          return retrievelist();
        } else {
          console.debug('Failed', res.status);
        }
      });
  };

  // const update = (updatedItem: Todo.IItem) => {
  //   const updated = [...state.items];

  //   for (let i = 0; i < updated.length; ++i) {
  //     if (updated[i].id === updatedItem.id) {
  //       updated[i] = updatedItem;
  //       break;
  //     }
  //   }

  const update = (item: Todo.IItem) => {
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };

    fetch(`http://localhost:3005/list/:${item.id}`, options)
      .then(res => {
        if (res.status === 200) {
          console.debug('Successfully updated item');
          return retrievelist();
        } else {
          console.debug('Failed', res.status);
        }
      });
  };

  return { ...state, add, remove, update };
};

export default useList;