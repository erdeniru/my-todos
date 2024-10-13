import { useTodosState } from './hooks';
import { TodoList } from './components';
import styles from './app.module.css';

const USER_ID = 1;

export const App = () => {
    const { todos } = useTodosState(USER_ID);

    return (
        <div className={styles.app}>
            <h2>Список дел</h2>
            <TodoList todos={todos} />
        </div>
    );
};
