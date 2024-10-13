import styles from './todo-list.module.css';

export const TodoList = ({ todos }) => {
    return (
        <div className={styles['todo-list']}>
            <ul>
                {todos.map(({ id, title, completed }) => (
                    <li key={id}>
                        <input type="checkbox" checked={completed} readOnly={true} />
                        {title}
                    </li>
                ))}
            </ul>
        </div>
    );
};
