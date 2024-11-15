import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_STATUS } from '../../../../constants/fetch-status';
import { SortInput } from '../sort-input/sort-input';
import { TodoListItem } from './todo-list-item/todo-list-item';
import { fetchTodos } from '../../../../store/actions';
import styles from './todo-list.module.css';

export const TodoList = () => {
    const dispatch = useDispatch();
    const { todos, status } = useSelector((state) => state.mainReducer);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    return (
        <div className={styles['todo-list']}>
            {status === FETCH_STATUS.READING ? (
                'Загрузка данных...'
            ) : todos && todos.length > 0 ? (
                <div className={styles.list}>
                    <SortInput />
                    <ul>
                        {todos.map((todo) => (
                            <li key={todo.id}>
                                <TodoListItem todo={todo} />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                'Записей не найдено'
            )}
        </div>
    );
};
