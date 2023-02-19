import classes from './list.module.sass';
import Form from './form/form.component';
import { useList } from '../../hooks';
import Item from './item/item.component';

interface IProps { }

const List = (props: IProps) => {
  const list = useList();

  return (
    <div className={classes.wrapper}>
      <Form onSubmit={list.add} />
      {list.loading ? <span style={{ "color": "white" }}>Loading...</span>
        : <ul>
          {list.items.map(item => (
            <Item
              key={item.id}
              item={item}
              remove={list.remove}
              update={list.update}
            />
          ))}
        </ul>
      }
    </div>
  );
};

export default List;