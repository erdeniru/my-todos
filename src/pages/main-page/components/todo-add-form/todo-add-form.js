import { useInputState } from '../../../../hooks';
import stylesApp from '../../../../app.module.css';
import styles from './todo-add-form.module.css';

export const TodoAddForm = ({ addTodo, isCreating }) => {
    const { value, onChange, reset } = useInputState('');

    const handleSubmit = (onSubmit) => (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        onSubmit({
            title: value,
            completed: false,
        });

        reset();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(addTodo)}>
            <input
                className={styles.form__input}
                id="title"
                type="text"
                placeholder="Новое задание"
                onChange={onChange}
                value={value}
            />
            <button
                className={stylesApp.btn + ' ' + styles.form__button}
                type="submit"
                disabled={value === '' || isCreating}
            >
                ➕
            </button>
        </form>
    );
};
