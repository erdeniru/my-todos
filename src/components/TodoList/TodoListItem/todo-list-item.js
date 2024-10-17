import stylesApp from '../../../app.module.css';
import styles from './todo-list-tem.module.css';

export const TodoListItem = ({
    todo,
    updateCompletedTodo,
    deleteTodo,
    isUpdating,
    isDeleting,
    currentId,
}) => {
    const { id, title, completed } = todo;
    return (
        <>
            <input
                type="checkbox"
                checked={completed}
                disabled={isUpdating && currentId === id}
                onChange={(event) => updateCompletedTodo(id, event.target.checked)}
            />
            <span className={styles.title}>{title}</span>
            <button
                className={stylesApp.btn}
                disabled={isDeleting && currentId === id}
                onClick={() => deleteTodo(id)}
            >
                ❌
            </button>
        </>
    );
};
