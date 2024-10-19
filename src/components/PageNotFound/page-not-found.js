import { BackButton } from '../BackButton/back-button';

export const PageNotFound = ({ url }) => {
    return (
        <>
            <BackButton>⬅️ Назад</BackButton>
            <div>Страница не найдена</div>
            <div>URL: {url}</div>
        </>
    );
};
