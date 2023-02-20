import classes from './list.module.sass';

import Form from './form/form.component';
import { useList } from '../../hooks';
import Item from './item/item.component';
import  Spinner  from '../spinner/spinner.component';

interface IProps { }

const List = (props: IProps) => {
  const list = useList();

  return (
    <div className={classes.wrapper}>
      <Form onSubmit={list.add} submitting = {list.submitting}/>
      {
        !list.loading
        ? <ul>
        {list.items.map(item => (
          <Item
            key={item.id}
            item={item}
            remove={list.remove}
            update={list.update}
          />
        ))}
      </ul>
      : <Spinner/>
      }
      
    </div>
  );
};

export default List;