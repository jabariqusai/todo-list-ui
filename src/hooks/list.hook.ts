import { useState , useEffect } from 'react';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
}

const useList = () => {
  
  const [state, setState] = useState<IState>({ items: [] });
  
  const fetchList = () => {
    fetch('http://localhost:3002/todos' , {method : 'GET'})
      .then(res => res.json() as Promise<Todo.IItem[]>)
      .then(items => setState({ items }));
  };

  useEffect(() => { 
    fetchList(); 
  }, [])
  

  const add = (item: Todo.IItem) => {
    const option = {method : "POST" , headers : {'Content-Type' : 'application/json'} , body : JSON.stringify(item) }
    fetch ('http://localhost:3002/todos' , option)
    .then (res => {
      console.log('item added');
      return fetchList() ;
    })
    .catch (error => {console.log(error.status);
    })
  }

  const remove = (id: string) => {
    fetch (`http://localhost:3002/todos/${id}`, {method : 'DELETE'})
    .then (res => {
      console.log('item deleted');
      return fetchList() ;
    })
    .catch (error => {console.log(error.status);
    })
  }

  const update = (updatedItem: Todo.IItem) => {
    const option = {method : "PUT" , headers : {'Content-Type' : 'application/json'} , body : JSON.stringify(updatedItem) }
    fetch (`http://localhost:3002/todos/${updatedItem.id}`, option)
    .then (res => {
      console.log('item updated');
      return fetchList() ;
    })
    .catch (error => {console.log(error.status);
    })
  }

  return { ...state, add, remove, update };
};

export default useList;