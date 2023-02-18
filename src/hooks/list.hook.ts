import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
}

const useList = () => {
  const [state, setState] = useState<IState>({ items: [] });

  const fetchItems = () => {
    fetch('http://localhost:3001', { method: 'GET' })
      .then(res => res.json() as Promise<Todo.IItem[]>)//never forget the [] due to it is an array
      .then(items => setState({ items }));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // should integrate the post feature
  const add = (item: Todo.IItem) => {
    // options with RequestInit will show the request body which will be send in the fetch function 

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    };

    fetch('http://localhost:3001/', options)
      .then(res => {
        if (res.status === 201) {
          console.log("successfully added items ");
          return fetchItems();
        } else {
          console.log("failed added items", res.status);

        }
      });

  };

  const remove = (id: string) => {
    fetch(`http://localhost:3001/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.status === 200) {
          console.log("deleted successfully");
          return fetchItems();
        } else {
          console.log('failed to delete items ', res.status);
        }
      });
  };

  const update = (updatedItem: Todo.IItem) => {

    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem)
    };

    fetch(`http://localhost:3001/${updatedItem.id}`, options)
      .then(res => {
        if (res.status === 201) {
          console.log("updated successfully", res.status);
          return fetchItems();
        } else {
          console.log('failed updated', res.status);
          return fetchItems();
        }
      });
    
  };

  return { ...state, add, remove, update };
};

export default useList;