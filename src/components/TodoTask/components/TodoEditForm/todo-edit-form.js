import styles from './todo-edit-form.module.css';

export const TodoEditForm = ({ todo, setTodo, readonly, onSubmit, onCancel }) => {
    const onChangeTitle = (event) => {
        setTodo((prev) => ({ ...prev, title: event.target.value }));
    };

    const onChangeCompleted = (event) => {
        setTodo((prev) => ({ ...prev, completed: event.target.checked }));
    };

    const handleSubmit = (onSubmit) => (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        onSubmit(todo);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.title}>
                <label className={styles.title_label}>Задание</label>
                <br />
                <textarea
                    className={styles.title_textarea}
                    value={todo.title}
                    onChange={onChangeTitle}
                    disabled={readonly}
                />
            </div>
            <div className={styles.completed}>
                <input
                    type="checkbox"
                    checked={todo.completed || false}
                    onChange={onChangeCompleted}
                    disabled={readonly}
                />{' '}
                Выполнено
            </div>
            {readonly ? null : (
                <div className={styles.action}>
                    <button onClick={onCancel}>🚫 Отмена</button>
                    <button type="submit">✅ Сохранить</button>
                </div>
            )}
        </form>
    );
};
