import styles from './sort-input.module.css';

export const SortInput = ({ sort, setSort }) => {
    return (
        <div className={styles.sort}>
            ⇅
            <select
                className={styles.sort__select}
                value={sort}
                onChange={(event) => {
                    setSort(event.target.value);
                }}
            >
                <option value="">По умолчанию</option>
                <option value="asc">Название по возрастанию</option>
                <option value="desc">Название по убыванию</option>
            </select>
        </div>
    );
};
