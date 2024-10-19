import { Link } from 'react-router-dom';
import stylesApp from '../../../app.module.css';
import styles from './todo-list-tem.module.css';

export const TodoListItem = ({ todo, updateCompletedTodo, isUpdating, currentId }) => {
    const { id, title, completed } = todo;
    return (
        <>
            <input
                type="checkbox"
                checked={completed}
                disabled={isUpdating && currentId === id}
                onChange={(event) => updateCompletedTodo(id, event.target.checked)}
            />
            <Link className={styles.title__link + ' ' + styles.title} to={`task/${id}`}>
                {title}
            </Link>
        </>
    );
};
