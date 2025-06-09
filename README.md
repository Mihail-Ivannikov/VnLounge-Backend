
## Діаграма компонентів:

![components drawio (2)](https://github.com/user-attachments/assets/81f7df7e-3e76-4185-b132-5915862a8a6f)
## Frontend: [https://github.com/Mihail-Ivannikov/VnLounge-FrontEnd.git](https://github.com/Mihail-Ivannikov/VnLounge-FrontEnd)

# Огляд проєкту
**VnLounge API** — це бекенд-сервіс для платформи з базою візуальних новел і спільнотою користувачів. Він надає API-інтерфейси для управління візуальними новелами, а також для автентифікації та авторизації користувачів. Застосунок розроблено з використанням NestJS — прогресивного фреймворку для Node.js, призначеного для створення ефективних та масштабованих серверних додатків.

## Архітектура
Застосунок побудовано на модульній архітектурі з чітким розподілом відповідальностей. Його структура включає кілька основних модулів:

**Visual Novels Module** — відповідає за дані та операції з візуальними новелами

**Users Module** — забезпечує управління користувачами

**Auth Module** — реалізує автентифікацію та авторизацію

## Шаблони проєктування
Для забезпечення гнучкості, підтримуваності та зручності тестування в застосунку реалізовано кілька шаблонів проєктування:

### Repository Pattern
**Файли:**

[visual-novels/repositories/visual-novel.repository.interface.ts](https://github.com/Mihail-Ivannikov/VnLounge-Backend/blob/implementation/src/visual-novels/repositories/visual-novel.repository.interface.ts)

[visual-novels/repositories/typeorm-visual-novel.repository.ts](https://github.com/Mihail-Ivannikov/VnLounge-Backend/blob/implementation/src/visual-novels/repositories/typeorm-visual-novel.repository.ts)

### Призначення:

- Абстрагує рівень доступу до даних

- Надає зручний інтерфейс для роботи з даними новел

- Полегшує перехід між різними джерелами даних або ORM

- Сприяє тестуванню завдяки можливості створювати мок-репозиторії

#### Шаблон реалізовано через інтерфейс IVisualNovelRepository, що визначає контракт для доступу до даних, та конкретну реалізацію TypeOrmVisualNovelRepository, яка працює з базою даних через TypeORM.

### Factory Pattern
**Файли:**

[visual-novels/factories/visual-novel.factory.ts](https://github.com/Mihail-Ivannikov/VnLounge-Backend/blob/implementation/src/visual-novels/factories/visual-novel.factory.ts)

### Призначення:

- Інкапсулює логіку створення об’єктів новел

- Забезпечує єдиний підхід до створення екземплярів

- Полегшує створення складних об’єктів з багатьма властивостями

- Централізує логіку ініціалізації

#### Застосунок використовує Factory Pattern для створення новел з перевіркою даних та значеннями за замовчуванням, спрощуючи роботу сервісного рівня.

### Strategy Pattern
**Файли:**

[auth/strategies/auth-strategy.interface.ts](https://github.com/Mihail-Ivannikov/VnLounge-Backend/blob/implementation/src/auth/strategies/auth-strategy.interface.ts)

[auth/strategies/local-auth.strategy.ts](https://github.com/Mihail-Ivannikov/VnLounge-Backend/blob/implementation/src/auth/strategies/local-auth.strategy.ts)

[auth/strategies/google-auth.strategy.ts](https://github.com/Mihail-Ivannikov/VnLounge-Backend/blob/implementation/src/auth/strategies/google-auth.strategy.ts)

### Призначення:

- Реалізує різні способи автентифікації (логін/пароль, Google OAuth)

- Дозволяє змінювати спосіб автентифікації під час виконання

- Виносить логіку автентифікації в окремі класи

- Полегшує розширення новими методами автентифікації

#### У цьому шаблоні IAuthStrategy задає інтерфейс для стратегій автентифікації, а LocalStrategy і GoogleStrategy реалізують конкретні підходи.

### Adapter Pattern
**Файли:**

[auth/adapters/oauth-provider.interface.ts](https://github.com/Mihail-Ivannikov/VnLounge-Backend/blob/implementation/src/auth/adapters/oauth-provider.interface.ts)

[auth/adapters/google-oauth.adapter.ts](https://github.com/Mihail-Ivannikov/VnLounge-Backend/blob/implementation/src/auth/adapters/google-oauth.adapter.ts)

### Призначення:

- Адаптує Google OAuth API до внутрішньої системи автентифікації

- Надає уніфікований інтерфейс для роботи з OAuth

- Ізолює зовнішні залежності від внутрішнього коду

- Полегшує додавання інших OAuth-провайдерів у майбутньому

#### Adapter Pattern використовується для обгортання Google OAuth API, що дозволяє легко замінювати або розширювати підтримку інших сервісів.

### Dependency Injection
**Файли:**

[app.module.ts](https://github.com/Mihail-Ivannikov/VnLounge-Backend/blob/implementation/src/app.module.ts)

[auth/auth.module.ts](https://github.com/Mihail-Ivannikov/VnLounge-Backend/blob/implementation/src/auth/auth.module.ts)

[visual-novels/visual-novels.module.ts](https://github.com/Mihail-Ivannikov/VnLounge-Backend/blob/implementation/src/visual-novels/visual-novels.module.ts)

[users/users.module.ts](https://github.com/Mihail-Ivannikov/VnLounge-Backend/blob/implementation/src/users/users.module.ts)

### Призначення:

- Керує залежностями між компонентами

- Полегшує тестування завдяки моканню залежностей

- Сприяє слабкому зв’язуванню між модулями

- Централізує налаштування

#### Вся система побудована з використанням вбудованого механізму dependency injection у NestJS, що забезпечує чисту архітектуру.

## API-ендпоінти
### Візуальні новели
#### GET /visual-novels — отримати всі новели

#### GET /visual-novels/:id — отримати конкретну новелу

#### POST /visual-novels — створити нову новелу

#### PATCH /visual-novels/:id — оновити новелу

#### DELETE /visual-novels/:id — видалити новелу

### Автентифікація
#### POST /users/register — реєстрація нового користувача

#### POST /auth/login — вхід за email і паролем

#### GET /auth/google — запуск автентифікації через Google

#### GET /auth/google/callback — обробка відповіді від Google OAuth

#### POST /auth/google/callback — перевірка токена Google

## Налаштування середовища
Конфігурація додатку здійснюється через змінні середовища, які перевіряються спеціальним модулем валідації:

#### DATABASE_URL — рядок підключення до PostgreSQL

#### SESSION_SECRET — секрет для управління сесіями

#### JWT_SECRET — секрет для генерації JWT токенів

#### GOOGLE_CLIENT_ID — ідентифікатор клієнта Google OAuth

#### GOOGLE_CLIENT_SECRET — секрет клієнта Google OAuth

#### GOOGLE_CALLBACK_URL — зворотна адреса для Google OAuth

### Обробка помилок
Застосунок використовує централізовану систему обробки помилок на основі NestJS exception filters, що забезпечує єдиний формат помилок для всіх ендпоінтів.

### Безпека
- Автентифікація на базі JWT

- Хешування паролів за допомогою bcrypt

- Інтеграція з Google OAuth 2.0

- Управління сесіями для OAuth-процесів

### Майбутні покращення
Додати підтримку інших OAuth-провайдерів

- Реалізувати контроль доступу на основі ролей

- Додати обмеження частоти запитів

- Застосувати кешування для популярних запитів

- Додати підтримку WebSocket для функцій у реальному часі

# Опис Frontend(React)

Цей модуль складається з кількох сторінок, які взаємодіють з API для отримання даних та надання користувачам функціоналу для взаємодії з контентом. Ось основні сторінки та компоненти, що використовуються на них:

## Сторінки

### Home
На головній сторінці міститься кілька статичних компонентів, зокрема компонент **Catalog.tsx**, який відповідає за відображення каталогу візуальних новел. Цей компонент запитує дані з API та відображає їх у вигляді карток новел.

### LogIn
Сторінка входу надає форму для автентифікації користувачів. Компонент **LoginForm.tsx** здійснює взаємодію з API для входу за допомогою електронної пошти та пароля, а також надає можливість входу через Google OAuth.

### Register
Сторінка реєстрації дозволяє новим користувачам створити обліковий запис. Компонент **RegistrationForm.tsx** обробляє введення даних користувача (ім'я користувача, електронна пошта, пароль) і відправляє їх на сервер для реєстрації. Також є підтримка CAPTCHA для захисту від ботів.

### NovelPage
Сторінка візуальної новели взаємодіє з API для завантаження конкретної новели, яка відображається на сторінці. Компонент **NovelPage.tsx** відповідає за завантаження даних новели по ID та відображення її опису, рейтингу, жанру, а також надає користувачу можливість завантажити новелу.

## Компоненти

### Catalog.tsx
Компонент **Catalog.tsx** відповідає за отримання списку візуальних новел з API та їх відображення в каталозі. Данні з API мапуються у відповідні елементи карток.

### LoginForm.tsx
**LoginForm.tsx** надає користувачам форму для входу в систему через електронну пошту або через Google OAuth. Компонент обробляє введені дані та взаємодіє з API для автентифікації.

### RegistrationForm.tsx
Компонент **RegistrationForm.tsx** забезпечує процес реєстрації нового користувача, включаючи введення даних, перевірку CAPTCHA, і відправлення даних на сервер для створення нового облікового запису.

### NovelPage.tsx
Компонент **NovelPage.tsx** відповідає за завантаження та відображення інформації про одну конкретну новелу. Він отримує ID новели з URL та запитує відповідні дані з API для відображення їх на сторінці.

## Взаємодія з API
Усі компоненти, які взаємодіють з API, використовують асинхронні запити для отримання даних. Дані з API обробляються та відображаються в різних компонентах, що забезпечує інтерактивний досвід користувача на кожній з сторінок.


