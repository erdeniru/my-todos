import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { MainContext } from '../../../main-context';
import styles from './todo-list-tem.module.css';

export const TodoListItem = ({ todo }) => {
    const { updateCompletedTodo, isUpdating, currentTodoId } = useContext(MainContext);
    const { id, title, completed } = todo;

    return (
        <>
            <input
                type="checkbox"
                checked={completed}
                disabled={isUpdating && currentTodoId === id}
                onChange={(event) => updateCompletedTodo(id, event.target.checked)}
            />
            <Link className={styles.title__link + ' ' + styles.title} to={`task/${id}`}>
                {title}
            </Link>
        </>
    );
};
