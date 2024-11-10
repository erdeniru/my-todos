import { BackButton } from '../../components';

export const NotFoundPage = ({ url }) => {
    return (
        <>
            <BackButton />
            <div>Страница не найдена</div>
            <div>URL: {url}</div>
        </>
    );
};
