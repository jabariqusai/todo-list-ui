import classes from './list.module.sass';

import Form from './form/form.component';
import { useList } from '../../hooks';
import Item from './item/item.component';

interface IProps { }

const List = (props: IProps) => {
  const list = useList();
      console.log(list.loading);

  return (
    <div className={classes.wrapper}>
      <Form onSubmit={list.add}  loading={list.loading}/> 
     { list.loading ? <span style={{color:'white'}}>loading....</span>
     :<ul>
        {list.items.map(item => (
          <Item
            key={item.id}
            item={item}
            remove={list.remove}
            update={list.update}
          />
        ))}
     
      </ul>}
    </div>
  );
};

export default List;