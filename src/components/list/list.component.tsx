import classes from './list.module.sass';

import Form from './form/form.component';
import { useList } from '../../hooks';
import Item from './item/item.component';

interface IProps { }

const List = (props: IProps) => {
  const list = useList();

  
  return (
    <div className={classes.wrapper}>
      {list.loading && <p style={{"color": "white", "position": "absolute", "top": 100}}>loading...</p>}
      <Form clear={list.clearList} onSubmit={list.add} />
      <ul>
        {list.items.map(item => (
          <Item
            key={item.id}
            item={item}
            remove={list.remove}
            update={list.update}
          />
        ))}
      </ul>
    </div>
  );
};

export default List;