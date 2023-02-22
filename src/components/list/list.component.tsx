import classes from './list.module.sass';
import './list.css';
import Form from './form/form.component';
import { useList } from '../../hooks';
import Item from './item/item.component';

interface IProps { }

const List = (props: IProps) => {
  const list = useList();

  return (
    <div className={classes.wrapper}>

      <Form onSubmit={list.add} />
      {

        list.loading
          ? <div className='loader'>loading... </div>
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