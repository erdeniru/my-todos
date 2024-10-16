# my-todos
TODOS

**1. Реализовать приложение на базе Create React App — страницу со списком дел (Todo list):**

- содержание одного дела — небольшой текст;
- использовать JSON Placeholder с ручкой (endpoint) «todos»;
- реализовать только вывод списка;
- дизайн на усмотрение разработчика (но должен быть аккуратный, приятный на вид).

**2. Переделать приложение, заменив JSON Placeholder на JSON Server:**

- начальный список дел отсутствует (пустой массив);
- реализовать CRUD-операции, добавить возможность добавления, изменения и удаления дела;
- реализовать поиск дел по заданной фразе (для нахождения элемента в тексте дела должен быть совпадающий с введенной фразой фрагмент);
- реализовать кнопку для включения режима сортировки дел по алфавиту, если кнопка не нажата — изначальная сортировка (т. е. отсутствие сортировки).

**Дополнительно.** Реализовать продвинутый поиск с помощью _debounce()_.

**3. Также дополнительно — сделать приложение из второго пункта, но с использованием Firebase (без использования JSON Server):**

- зарегистрироваться на платформе Firebase;
- создать базу данных и использовать её в приложении;
- выполнить deploy и проверить работу приложения.

**Обратите внимание!**

Firebase не очень удобен для реализации поиска и сортировки, поэтому данный функционал можно реализовать не на серверной стороне, а на клиентской. 

Однако при желании вы все же можете реализовать сортировку с помощью Firebase, для этого обратитесь к [этой странице в документации](https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data) (_orderByChild()_). Обратите внимание:

- для работы необходимо в Realtime Database Security Rules добавить настройку _.indexOn_ с ключами, по которым будет происходить сортировка ([документация](https://firebase.google.com/docs/database/security/indexing-data#section-indexing-order-by-child));
- для получения элементов можно воспользоваться [функцией _get()_](https://firebase.google.com/docs/database/web/read-and-write#read_data_once), в нее передаем _query()_ с необходимой сортировкой;
- получение объекта с элементами с помощью _snapshot.val()_ не гарантирует порядок сортировки, поэтому для перебора элементов в порядке сортировки используйте метод _snapshot.forEach()_;
- сортировка регистрозависима.

Решение:
1. Создать репозитрий на github.com
2. Склонировать репозитарий на свой компьютер
```bash
$ git clone https://github.com/erdeniru/my-todos.git
$ cd my-todos
```
3. Проверить репозитарий
```bash
$ git status
$ git log --oneline
$ git branch
```
4. Создать и перейти в ветку разработки
```bash
$ git checkout -b develop
```
5. Инициализировать и запустить проект my-todos
my-app-react -> my-todos
```batch
npm install
npm run start
```
```bash
$ git status
$ git add .
$ git commit -m "init my-todos"
$ git log --oneline
```
6. Создать и перейти в ветку Версии 0.1.0 (Задание 1)
```bash
$ git checkout -b release/0.1.0
```
Разработка...
```bash
$ git status
$ git add .
$ git commit -m "release 0.1.0"
$ git log --oneline
$ git push origin release/0.1.0
```
7. Перейти в ветку разработки и выполнить слияние с Версией 0.1.0
```bash
$ git checkout develop
$ git merge release/0.1.0
```
8. Создать и перейти в ветку Версии 0.2.0 (Задание 2)
```bash
$ git checkout -b release/0.2.0
```
Установить и запустить JSON Server
```batch
npm install -g json-server@0.17.4
npx json-server --watch src/db.json --port 3003 --delay 1000
```
Разработка...
```bash
$ git status
$ git add .
$ git commit -m "release 0.2.0"
$ git log --oneline
$ git push origin release/0.2.0
```
9. Перейти в ветку разработки и выполнить слияние с Версией 0.2.0
```bash
$ git checkout develop
$ git merge release/0.2.0
```
