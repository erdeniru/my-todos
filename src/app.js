import { useTodosState } from './hooks';
import { TodoForm, FilterInput, TodoList } from './components';
import styles from './app.module.css';

export const App = () => {
    /**
     * TODO:
     * - реализовать useFetch
     */

    const {
        todos,
        filter,
        setFilter,
        addTodo,
        deleteTodo,
        updateCompletedTodo, // функция для обновления поля completed
        isLoading,
        isCreating,
        isDeleting,
        isUpdating,
        currentId, // id текущего элемента в обработке (удаление, изменение)
    } = useTodosState(); // хук для управления состоянием Todos

    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <h1>TODOS</h1>
                <TodoForm addTodo={addTodo} isCreating={isCreating} />
                <h2>Список дел</h2>
                <FilterInput filter={filter} setFilter={setFilter} />
                <TodoList
                    todos={todos}
                    deleteTodo={deleteTodo}
                    updateCompletedTodo={updateCompletedTodo}
                    isLoading={isLoading}
                    isDeleting={isDeleting}
                    isUpdating={isUpdating}
                    currentId={currentId}
                />
            </div>
        </div>
    );
};
