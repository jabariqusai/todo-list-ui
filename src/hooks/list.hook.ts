import { useState , useEffect } from 'react';
import { Todo } from '../types/todo';

interface IState {
  items: Todo.IItem[];
  loading : boolean ;
  submitting : boolean ;
}

const useList = () => {
  
  const [state, setState] = useState<IState>({ items: [] , loading : true , submitting : false });
  
  const fetchList = () => {
    setState (oldState => ({...oldState , loading : true}))
    fetch('http://localhost:3002/todos' , {method : 'GET'})
      .then(res => res.json() as Promise<Todo.IItem[]>)
      .then(items => {
        console.log('items fetched');
        console.log(state.loading);
        
        setState(oldState => ({ ...oldState ,  items }))
      }).catch (err => console.log('faild to fetch items from the server')
      )
      .finally (()=> setState (oldState => ({ ...oldState , loading : false})))
  };

  useEffect(() => { 
    fetchList(); 
  }, [])
  

  const add = (item: Todo.IItem) => {
    const option = {method : "POST" , headers : {'Content-Type' : 'application/json'} , body : JSON.stringify(item) }
    setState (oldState => ({...oldState , submitting: true}))
    fetch ('http://localhost:3002/todos' , option)
    .then (res => {
      console.log('item added');
      return fetchList() ;
    })
    .catch (error => {console.log(error.status)
    }).finally (() => {
      setState (oldState => ({...oldState , submitting : false}))
    })
  }

  const remove = (id: string) => {
    setState (oldState => ({...oldState , loading : true}))
    fetch (`http://localhost:3002/todos/${id}`, {method : 'DELETE'})
    .then (res => {
      if (res.status === 204) {
        console.log('item deleted');
        return fetchList() ;
      }
      else {
        throw new Error ('failed')
      }
    })
    .catch (error => {
      console.log(error.status);
      setState (oldState => ({...oldState , loading : false}))
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