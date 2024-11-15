import { useEffect, useState } from 'react';
import styles from './todo-edit-form.module.css';

export const TodoEditForm = ({ todo, readonly, onSubmit, onCancel }) => {
    const [title, setTitle] = useState(todo.title);
    const [completed, setCompleted] = useState(todo.completed);

    useEffect(() => {
        setTitle(todo.title);
        setCompleted(todo.completed);
    }, [todo]);

    const handleSubmit = (onSubmit) => (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        onSubmit({ ...todo, title, completed });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.title}>
                <label className={styles.title_label}>Задание</label>
                <br />
                <textarea
                    className={styles.title_textarea}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    disabled={readonly}
                />
            </div>
            <div className={styles.completed}>
                <input
                    type="checkbox"
                    checked={completed || false}
                    onChange={(event) => setCompleted(event.target.checked)}
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
