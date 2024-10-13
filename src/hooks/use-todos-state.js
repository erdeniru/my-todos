import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks';
import { ref, onValue, push, update, remove } from 'firebase/database';
import { db } from '../firebase';

export const useTodosState = () => {
    const [todos, setTodos] = useState([]);

    const [filter, setFilter] = useState('');
    const debounceFilter = useDebounce(filter, 500);

    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        const todosDbRef = ref(db, 'todos');

        return onValue(todosDbRef, (snapshot) => {
            const data = snapshot.val() || {};
            const array = Object.entries(data).map(([id, value]) => ({ ...value, id }));

            if (debounceFilter !== '') {
                const filteredTodos = array.filter(({ title }) =>
                    title.toLowerCase().includes(debounceFilter.toLowerCase()),
                );
                setTodos(filteredTodos);
            } else {
                setTodos(array);
            }

            setIsLoading(false);
        });
    }, [debounceFilter]);

    const addTodo = (data) => {
        setIsCreating(true);

        const todosDbRef = ref(db, 'todos');

        push(todosDbRef, data)
            .then((response) => {
                console.log('Запись добавлена, ответ сервера: ', response);
            })
            .catch((error) => {
                console.log('Ошибка добавления записи', error);
            })
            .finally(() => {
                setIsCreating(false);
            });
    };

    const deleteTodo = (id) => {
        setCurrentId(id);
        setIsDeleting(true);

        const todosDbRef = ref(db, 'todos/' + id);

        remove(todosDbRef)
            .then((response) => {
                console.log('Запись удалена, ответ сервера: ', response);
            })
            .catch((error) => {
                console.log('Ошибка удаления записи', error);
            })
            .finally(() => {
                setIsDeleting(false);
                setCurrentId(null);
            });
    };

    const updateCompletedTodo = (id, completed) => {
        setCurrentId(id);
        setIsUpdating(true);

        const todosDbRef = ref(db, 'todos/' + id);

        update(todosDbRef, { completed: completed })
            .then((response) => {
                console.log('Смартфон обновлен, ответ сервера: ', response);
            })
            .finally(() => {
                setIsUpdating(false);
                setCurrentId(null);
            });
    };

    return {
        todos,
        filter,
        setFilter,
        addTodo,
        deleteTodo,
        updateCompletedTodo,
        isLoading,
        isCreating,
        isDeleting,
        isUpdating,
        currentId,
    };
};
