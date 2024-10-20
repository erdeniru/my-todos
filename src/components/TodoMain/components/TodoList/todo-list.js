import { useEffect, useState } from 'react';
import { SortInput } from '../../components';
import { TodoListItem } from './TodoListItem/todo-list-item';
import styles from './todo-list.module.css';

const stringAscending = (a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
};

const stringDescending = (a, b) => {
    if (a.title < b.title) return 1;
    if (a.title > b.title) return -1;
    return 0;
};

export const TodoList = ({
    todos,
    updateCompletedTodo,
    isLoading,
    isUpdating,
    currentTodoId,
}) => {
    // сортировку выполняем на стороне клиента
    const [sort, setSort] = useState('');
    const [sortedTodos, setSortedTodos] = useState(todos || []);

    useEffect(() => {
        if (sort === 'asc') {
            setSortedTodos([...todos].sort(stringAscending));
        } else if (sort === 'desc') {
            setSortedTodos([...todos].sort(stringDescending));
        } else {
            setSortedTodos(todos);
        }
    }, [todos, sort]);

    return (
        <div className={styles['todo-list']}>
            {isLoading ? (
                'Загрузка данных...'
            ) : sortedTodos && sortedTodos.length > 0 ? (
                <div className={styles.list}>
                    <SortInput sort={sort} setSort={setSort} />
                    <ul>
                        {sortedTodos.map((todo) => (
                            <li key={todo.id}>
                                <TodoListItem
                                    todo={todo}
                                    updateCompletedTodo={updateCompletedTodo}
                                    isUpdating={isUpdating}
                                    currentTodoId={currentTodoId}
                                />
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
