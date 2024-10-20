import styles from './filter-input.module.css';

export const FilterInput = ({ filter, setFilter }) => {
    return (
        <div className={styles.filter}>
            🔍
            <input
                className={styles.filter__input}
                type="search"
                value={filter}
                onChange={(event) => {
                    setFilter(event.target.value);
                }}
            />
        </div>
    );
};
