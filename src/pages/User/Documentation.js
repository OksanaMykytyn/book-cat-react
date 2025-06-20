import React, { useEffect, useState } from "react";
import Header from "../../components/Common/header/Header";
import axiosInstance from "../../axiosInstance";
import "../../styles/Dashboard.css";

const DocumentationPage = ({ toggleNavbar, isNavbarVisible }) => {
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await axiosInstance.get("/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Requested-From': 'BookCatApp'
                    }
                });
                setUserName(response.data.username);
                setUserImage(response.data.image);
            } catch (error) {
                console.error("Помилка при отриманні профілю користувача:", error);
            } finally {
                setTimeout(() => setLoading(false), 300);
            }
        };

        fetchUserProfile();
    }, []);


    return (
        <>
            <Header name="Довідка" onToggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} userName={userName} userImage={userImage} />
            {loading ? (
                <div className="spinner" />
            ) : (
                <div className="container-for-card documentation-page">
                    <p>Розроблений сайт рекомендовано використовувати як прототип електронних програм для бібліотек закладів загальної середньої освіти.</p>
                    <p>BookCat сприяє можливісті вести електронну інвентарну книгу, здійснювати пошук за певними параметрами, автоматично генерувати акти на списання літератури та використовувати програмну сортовану інформацію для звітності та паспортизації. </p>
                    <p>Сайт має мобільну версію. Є можливість вносити дані чи переглядати їх із будь-якої моделі мобільного пристрою.</p>
                    <h2>Зміст</h2>
                    <ul className="toc">
                        <li><a href="#start">1. Початок роботи з сайтом</a>
                            <ul>
                                <li><a href="#start1">1.1. Ознайомлення з документацією</a></li>
                                <li><a href="#start2">1.2. Реєстрація на сайті</a></li>
                                <li><a href="#start3">1.3. Підтвердження акаунту адміністратором</a></li>
                            </ul>
                        </li>
                        <li><a href="#profile">2. Акаунт (особистий профіль)</a>
                            <ul>
                                <li><a href="#profile1">2.1 Як увійти</a></li>
                                <li><a href="#profile1">2.2 Зміна паролю</a></li>
                                <li><a href="#profile1">2.3 Зміна назви користувача</a></li>
                                <li><a href="#profile1">2.4 Зміна електронної пошти</a></li>
                                <li><a href="#profile1">2.5 Зміни фото профілю</a></li>
                            </ul>
                        </li>
                        <li><a href="#plan">3. Тарифні плани</a>
                            <ul>
                                <li><a href="#plan1">3.1 Вартість та обсяг книжкового фонду</a></li>
                                <li><a href="#plan2">3.2 Умови оплати</a></li>
                                <li><a href="#plan3">3.3 Зміна тарифного плану</a></li>
                            </ul>
                        </li>
                        <li><a href="#book">4. Книжковий фонд</a>
                            <ul>
                                <li><a href="#book1">4.1 Установлення початкового інвентарного номера</a></li>
                                <li><a href="#book2">4.2 Додавання книги</a></li>
                                <li><a href="#book3">4.3 Списання книги</a></li>
                                <li><a href="#book4">4.4 Редагування книги</a></li>
                                <li><a href="#book5">4.5 Відновлення книги</a></li>
                                <li><a href="#book6">4.6 Видалення книги</a></li>
                                <li><a href="#book7">4.7 Пошук книги</a></li>

                            </ul>
                        </li>
                        <li><a href="#document">5. Звітність</a>
                            <ul>
                                <li><a href="#document1">5.1 Створення документа</a></li>
                                <li><a href="#document1">5.2 Завантаження згенерованого документа</a></li>
                            </ul>
                        </li>
                        <li><a href="#setup">6. Налаштування середовища і темна тема</a>
                            <ul>
                                <li><a href="#setup1">6.1 Темна тема</a></li>
                                <li><a href="#setup2">6.2 Як установити програму на комп’ютері</a></li>
                                <li><a href="#setup3">6.3 Як установити додаток на телефон</a></li>
                            </ul>
                        </li>
                        <li><a href="#policy">7. Політика конфіденційності</a></li>
                        <li><a href="#deal">8. Умови використання</a></li>
                    </ul>


                    <div className="section" id="start">
                        <h3>1. Початок роботи з сайтом</h3>
                        <div id="start1">
                            <h4>1.1. Ознайомлення з документацією</h4>
                            <p>Документацію, її структуру та важливість для розуміння роботи програми потрібно шукати на лівій бічній навігаційній панелі в розділі «Інше» в пункті «Довідка».</p>
                            <p>Для швидшого пошуку відповіді на будь-які запитання скористайтеся змістом. </p>
                        </div>
                        <div id="start2">
                            <h4>1.2. Реєстрація на сайті</h4>
                            <p>З головної сторінки сайту, яка слугує візитівкою, можна перейти на сторінку реєстрації.</p>
                            <p>Ви побачите форму з полями, які необхідно заповнити.</p>
                            <p>1. «Назва освітнього закладу або бібліотеки» — рекомендовано застосувати коротку назву українською мовою.</p>
                            <p>2. «Електронна пошта» платника (фізичної або юридичної особи).</p>
                            <p>3. «Пароль» — складається з латиниці (англійського алфавіту, великих чи малих букв) і  цифр без знаків пунктуації, пробілів у кількості від 8 до 20 знаків.</p>
                            <p>4. «Оберіть тарифний план», відповідно до бібліотечного фонду.</p>
                            <p>Після заповнення всіх полів необхідно натиснути на кнопку «Зареєструватися».</p>
                            <p>Після цього ви перейдете на сторінку з оплатою.</p>
                            <p>Здійснивши оплату за реквізитами, ви можете перейти в особистий кабінет.</p>
                            <p>Упродовж 24 годин адміністратор схвалить ваш платіж і надасть доступ до всіх сторінок.</p>
                        </div>
                        <div id="start3">
                            <h4>1.3. Підтвердження акаунту адміністратором</h4>
                            <p>Підтвердження акаунту здійснюється вручну. З моменту оплати впродовж 24 годин його буде розблоковано та надано доступ до всіх функцій.</p>
                            <p>Якщо ваш акаунт знаходитиметься в очікуванні підтвердження більше 24 годин, то необхідно написати лист для технічної підтримки на електронну адресу: admin@gmail.com</p>
                        </div>
                    </div>

                    <div className="section" id="profile">
                        <h3>2. Акаунт (особистий профіль)</h3>
                        <div id="profile1">
                            <h4>2.1 Як увійти</h4>
                            <p>З головної сторінки сайту, яка слугує візитівкою, можна перейти на сторінку входу.</p>
                            <p>Для входу в особистий акаунт варто ввести електронну пошту та пароль, а потім натиснути кнопку «Увійти».</p>
                            <p>При втраті паролю та електронної пошти варто звернутися за допомогою до адміністратора в підтримку.</p>
                        </div>
                        <div id="profile2">
                            <h4>2.2 Зміна паролю</h4>
                            <p>Для зміни паролю вам необхідно написати листа до технічної підтримки.</p>
                        </div>
                        <div id="profile3">
                            <h4>2.3 Зміна назви користувача</h4>
                            <p>Для зміни назви користувача необхідно з особистого кабінету перейти в профіль. </p>
                            <p>У верхньому правому куті знаходиться фото та назва профілю. Після натискання на них ви перейдете на відповідну сторінку. У відповідному рядку можна поміняти назву користувача.</p>
                            <p>Однак для збереження змін необхідно натиснути кнопку «Зберегти».</p>
                        </div>
                        <div id="profile4">
                            <h4>2.4 Зміна електронної пошти</h4>
                            <p>У верхньому правому куті знаходиться фото та назва профілю. Після натискання на них ви перейдете на відповідну сторінку. У відповідному рядку можна поміняти електронну адресу.</p>
                            <p>Однак для збереження змін необхідно натиснути кнопку «Зберегти».</p>
                        </div>
                        <div id="profile5">
                            <h4>2.5 Зміни фото профілю</h4>
                            <p>У верхньому правому куті знаходиться фото та назва профілю. Після натискання на них ви перейдете на відповідну сторінку. У відповідному рядку можна поміняти фото профілю.</p>
                            <p>Однак для збереження змін необхідно натиснути кнопку «Зберегти».</p>
                        </div>
                    </div>

                    <div className="section" id="plan">
                        <h3>3. Тарифні плани</h3>
                        <div id="plan1">
                            <h4>3.1 Вартість та обсяг книжкового фонду</h4>
                            <p>До уваги! Запропоновано три тарифні плани. Вартість оплати встановлено відповідно до величини фондів літератури бібліотеки.</p>
                            <p>До 3 000 документів щомісячна вартість 100 грн; від 3 000 до 5 000 документів — 200 грн; до 10 000 документів — 300 грн. Вказану оплату потрібно здійснювати кожні 30 днів. </p>
                        </div>
                        <div id="plan2">
                            <h4>3.2 Умови оплати</h4>
                            <p>Якщо не здійснити оплату у визначений термін, то акаунт буде заблоковано. Упродовж місяця дані зберігаються на сервері, після чого будуть знищені. Після оплати (навіть у крайній термін) збережений сервером робочий стан аканту буде відновлено.</p>
                        </div>
                        <div id="plan3">
                            <h4>3.3 Зміна тарифного плану</h4>
                            <p>Якщо фонд літератури збільшується або зменшується, виходячи за межі чинного тарифного плану, у такому випадку тариф необхідно змінити.</p>
                            <p>Якщо ж тарифний план необхідно змінити, то при цьому попередня оплата та дата оплати скасовуються.</p>
                            <p>Натомість установлюється нова дата оплати. Попереджаємо, що необхідно знову дочекатися підтвердження від адміністратора, після чого роботу на сайті одразу буде відновлено (відповідно до нового тарифу).</p>
                        </div>
                    </div>

                    <div className="section" id="book">
                        <h3>4. Книжковий фонд</h3>
                        <div id="book1">
                            <h4>4.1 Установлення початкового інвентарного номера</h4>
                            <p>Варто звернути увагу на ліву бічну навігаційну панель, де вказано всі функції програми.</p>
                            <p>Розпочинайте свою роботу з розділу «Інше», у якому оберіть пункт «Налаштування». Він дасть можливість розпочати роботу з електронним каталогом із найменшого інвентарного номера. Запишіть необхідний номер і натисніть кнопку «Зберегти». Наступні інвентарні номери будуть розташовуватися в порядку зростання.</p>
                        </div>
                        <div id="book2">
                            <h4>4.2 Додавання книги</h4>
                            <p>Для створення електронного каталогу обираємо пункт «Додати книгу».</p>
                            <p>Для запису документа в інвентарну книгу необхідно заповнити 8 полів. Після введення даних натиснути «Зберегти».</p>
                            <p>Кількість унесених документів повинна відповідати кількості дозволених тарифним планом. Усі зайві вноситись не будуть. Продовження інвентарного списку тільки за умови відповідних змін тарифного плану.</p>
                        </div>
                        <div id="book3">
                            <h4>4.3 Списання книги</h4>
                            <p>У бічній навігаційній панелі оберіть «Пошук за книгами». Далі у списку документів з трьома кнопками «Списати», «Редагувати», «Видалити», оберіть «Списати»: документ автоматично переходить в інший список. Варто відмітити таким способом усі заплановані до списання документи. </p>
                        </div>
                        <div id="book4">
                            <h4>4.4 Редагування книги</h4>
                            <p>Обираємо документ, що підлягає редагуванню і натискаємо на «Редагувати». Відкривається сторінка «Редагувати книгу», яка надає можливість виправити дані будь-якого поля. Після чого необхідно клацнути кнопку «Зберегти». Відредагований документ буде наново збережений.</p>
                        </div>
                        <div id="book5">
                            <h4>4.5 Відновлення книги</h4>
                            <p>Якщо випадково натиснули «Списати» на книгу, яка повинна бути присутня у фонді, тоді дійте за таким алгоритмом. Відкрийте «Списані книги», знайдіть потрібний документ. Під час натискання на кнопку «Відновити» документ повертається до інвентарної книги.</p>
                        </div>
                        <div id="book6">
                            <h4>4.6 Видалення книги</h4>
                            <p>Якщо натиснути на кнопку видалити, то документ видаляється зі списку без можливості повернення.</p>
                        </div>
                        <div id="book7">
                            <h4>4.7 Пошук книги</h4>
                            <p>На сторінці «Пошук за книгами» та «Списані книги» є можливість здійснювати пошук.</p>
                            <p>Функції пошуку та звітності можна виконувати і при неповному введенні інформації про документ. </p>
                            <p>Кнопка «Пошук» надає можливість пошуку документів відповідно до таких параметрів: автор і назва, інвентарний номер, рік видання, УДК та УДК за формою документу, дата і номер супровідного документа.</p>
                            <p>Перший рядок у списку вказує кількість знайдених результатів на суму. У наступному подано сам список із знайденими документами. З правої боку кожного знайденого документа розташовані кнопки «Списати», «Редагувати», «Видалити».</p>
                        </div>
                    </div>

                    <div className="section" id="document">
                        <h3>5. Звітність</h3>
                        <div id="document1">
                            <h4>5.1 Створення документа</h4>
                            <p>Розділ «Звітність» уміщує два пункти. </p>
                            <p>На сторінці «Створити документ» можна здійснити генерування документації. Форма містить два рядки для введення назви документа та можливості обрати формат.</p>
                            <p>Якщо обрати «інвентарна книга», генерується інвентаризаційний список усіх уведених книг в альбомному Word форматі. </p>
                            <p>Якщо обрати «акт списання», на панелі побачите третій рядок «Оберіть діапазон дат». Необхідно вказати дати початку та закінчення процесу переведення документів у списані. Після почергового виконання дій клікнути на кнопку «Створити».  У верхньому правому кутку «висвітиться» повідомлення про створення документа. </p>
                            <p>Повне створення документа буде відображено на додатковій панелі нижче з вказаною вами назвою.</p>
                            <p>Завантажений вами документ акту списання відповідає державно прийнятому формату. До створеного документа можна вносити необхідні правки, а також роздрукувати без змін для бухгалтерського обліку.</p>
                        </div>
                        <div id="document2">
                            <h4>5.2 Завантаження згенерованого документа</h4>
                            <p>Після створення документ потрапляє до пункту «Збережені документи», де на кожній окремій панелі вказано назви збережених на сервері ваших документів. З правої боку кожної панелі знаходиться кнопка «Завантажити», під час натискання на яку вказаний документ завантажується на ваш ПК чи інший інформаційний пристрій.</p>
                            <p>На своєму персональному пристрої завантажені документи ви можете змінювати, копіювати, роздруковувати без змін тощо. Після завантаження вони є звичайними Word-документами.</p>
                        </div>
                    </div>

                    <div className="section" id="setup">
                        <h3>6. Налаштування середовища і темна тема</h3>
                        <div id="setup1">
                            <h4>6.1 Темна тема</h4>
                            <p>Кнопка «Темна тема» створена для тих, хто надає перевагу темним кольорам. Вона знаходиться на бічній навігаційній панелі.</p>
                        </div>
                        <div id="setup2">
                            <h4>6.2 Як установити програму на комп’ютері</h4>
                            <p>На кожній сторінці у правій частині рядка для відображення шляхів вебсайту знаходиться іконка комп’ютера зі стрілкою вниз.</p>
                            <p>	Потрібно натиснути на це зображення, а далі на кнопку «Установити».</p>
                        </div>
                        <div id="setup3">
                            <h4>6.3 Як установити додаток на телефон</h4>
                            <p>Для цього необхідно натиснути на три крапки у верхньому правому куті вашого екрана. Відкриється модальне вікно, на якому необхідно обрати пункт «Додати на головний екран».</p>
                        </div>
                    </div>

                    <div className="section" id="policy">
                        <h3>7. Політика конфіденційності</h3>
                        <p>1. Вступ</p>
                        <p>Ваша конфіденційність є важливою для нас. Ця Політика конфіденційності описує, як вебсайт BookCat (далі – "ми", "наш сервіс", "сайт"), збирає, використовує, зберігає та захищає вашу особисту інформацію.</p>
                        <p>Скориставшись нашим сервісом, ви погоджуєтеся з умовами цієї політики.</p>
                        <p>2. Яку інформацію ми збираємо</p>
                        <p>Ми збираємо такі дані, які ви надаєте під час реєстрації або користуванні сайтом:</p>
                        <p>Під час реєстрації:</p>
                        <ul className="ul">
                            <li>Назва освітнього закладу.</li>
                            <li>Електронна адреса.</li>
                            <li>Пароль.</li>
                            <li>Обраний тарифний план.</li>
                        </ul>
                        <p>Після активації акаунту:</p>
                        <ul className="ul">
                            <li>Дані про книги: назва, автор, інвентарний номер, УДК, УДК за формою документа, дата і номер супровідного документа, рік видання, ціна.</li>
                            <li>Дані про списання книг: дата списання.</li>
                            <li>Дані створених документів: назва документів, діапазони дат.</li>
                        </ul>
                        <p>Додатково:</p>
                        <ul className="ul">
                            <li>Фото профілю (за бажанням).</li>
                            <li>Зміни, унесені у профіль користувача.</li>
                        </ul>
                        <p>3. Як використовуємо зібрану інформацію</p>
                        <p>Ваші дані необхідні для таких цілей:</p>
                        <ul className="ul">
                            <li>Створення та обслуговування особистого кабінету.</li>
                            <li>Підтвердження оплати обраного тарифного плану.</li>
                            <li>Генерації внутрішніх статистичних та звітних документів.</li>
                            <li>Зв'язку з вами, якщо це необхідно (наприклад, у випадку уточнення деталей платежу).</li>
                        </ul>
                        <p>4. Зберігання та захист інформації</p>
                        <p>Ми використовуємо технічні й організаційні заходи для здійснення безпеки вашої інформації, включно з</p>
                        <ul className="ul">
                            <li>захищеним з'єднанням HTTPS;</li>
                            <li>аутентифікацією за допомогою JWT-токенів;</li>
                            <li>зберіганням паролів у зашифрованому вигляді;</li>
                            <li>обмеженим доступом до бази даних лише для авторизованих адміністраторів.</li>
                        </ul>
                        <p>Ми зберігаємо ваші персональні дані протягом усього періоду користування сервісом, а також протягом 1 місяця після деактивації облікового запису, якщо інше не передбачено законом.</p>
                        <p>5. Оплата</p>
                        <p>Активація особистого кабінету бібліотеки відбувається після оплати тарифного плану. Оплата здійснюється переказом коштів на банківську картку за реквізитами, які надаємо. Не зберігаємо ваші платіжні реквізити, оскільки платежі здійснюються поза межами сайту.</p>
                        <p>Адміністратор перевіряє оплату вручну протягом 24 годин. Після підтвердження переказу коштів акаунт буде активовано, користувач отримає доступ до розширених функцій.</p>
                        <p>6. Поширення даних третім сторонам</p>
                        <p>Ми не продаємо, не передаємо та не розкриваємо вашу персональну інформацію третім сторонам, за винятком випадків:</p>
                        <ul className="ul">
                            <li>коли це передбачено законодавством України;</li>
                            <li>коли це необхідно для захисту наших прав;</li>
                            <li>за вашої згоди.</li>
                        </ul>
                        <p>7. Ваші права</p>
                        <p>Ви маєте право:</p>
                        <ul className="ul">
                            <li>отримувати інформацію про обробку своїх персональних даних;</li>
                            <li>виправляти або оновлювати свої дані;</li>
                            <li>вимагати видалення ваших персональних даних;</li>
                            <li>обмежити або заборонити обробку ваших даних (у певних випадках).</li>
                        </ul>
                        <p>8. Cookies та технічна інформація</p>
                        <p>Ми можемо використовувати cookies для зберігання вашої сесії після входу в систему. Cookies не містять персональної інформації, але допомагають у роботі з обліковим записом.</p>
                        <p>9. Зміни до Політики конфіденційності</p>
                        <p>Ми залишаємо за собою право змінювати цю політику в будь-який час. Про важливі зміни повідомимо заздалегідь. Оновлена версія завжди буде доступна на цій сторінці з оновленою датою.</p>
                        <p>10. Контактна інформація</p>
                        <p>Якщо у вас є питання щодо цієї політики або обробки ваших даних, зв’яжіться з нами.</p>
                        <p>Електронна адреса: admin@gmail.com</p>
                    </div>

                    <div className="section" id="deal">
                        <h3>8. Умови використання</h3>
                        <p>1. Згода з умовами</p>
                        <p>Користуючись сайтом BookCat, ви підтверджуєте, що ознайомлені з цими Умовами використання та погоджуєтесь із ними в повному обсязі. Якщо ви не згодні з будь-якою частиною цих Умов, не маєте права користуватися цим сервісом.</p>
                        <p>2. Опис послуг</p>
                        <p>BookCat — це спеціалізована онлайн-платформа для бібліотек освітніх закладів, яка дозволяє:</p>
                        <ul className="ul">
                            <li>вести електронну інвентарну книгу;</li>
                            <li>додавати та редагувати бібліотечні записи;</li>
                            <li>здійснювати пошук книг за різними параметрами;</li>
                            <li>формувати документи: інвентарні книги та акти списання;</li>
                            <li>зберігати історію списаних книг.</li>
                        </ul>
                        <p>Сервіс розроблено для оптимізації внутрішньої документації бібліотек та полегшення управління книжковим фондом.</p>
                        <p>3. Правила використання</p>
                        <p>Користувач погоджується:</p>
                        <ul className="ul">
                            <li>Надавати правдиву та актуальну інформацію під час реєстрації та в процесі користування сервісом.</li>
                            <li>Не використовувати сервіс у незаконних цілях, враховуючи, але не обмежуючись, розповсюдженням шкідливого програмного забезпечення або небажаного контенту.</li>
                            <li>Не здійснювати спроби несанкціонованого доступу до облікових записів інших користувачів або серверів BookCat.</li>
                            <li>Не обходити обмеження тарифного плану, наприклад, шляхом багаторазової реєстрації для використання додаткових лімітів.</li>
                            <li>Не змінювати код, не копіювати, не розповсюджувати програмне забезпечення або будь-яку частину платформи без письмового дозволу власника.</li>
                        </ul>
                        <p>Порушення цих правил може сприяти тимчасовому або повному блокуванню облікового запису без попередження.</p>
                        <p>4. Інтелектуальна власність</p>
                        <p>Усі права на програмне забезпечення BookCat, а саме: вихідний код, дизайн, бази даних, контент та торгову марку, належать розробнику/власнику сервісу.</p>
                        <p>Заборонено:</p>
                        <ul className="ul">
                            <li>копіювати чи поширювати програмне забезпечення або його частини;</li>
                            <li>змінювати або модифікувати платформу;</li>
                            <li>створювати похідні продукти на основі BookCat без офіційної письмової згоди власника.</li>
                        </ul>
                        <p>Будь-яке порушення цих прав буде переслідуватися згідно з чинним законодавством України.</p>
                        <p>5. Відмова від відповідальності</p>
                        <p>Сервіс BookCat надається у форматі "як є" без будь-яких гарантій.</p>
                        <p>Ми не гарантуємо, що:</p>
                        <p>платформа працюватиме безперебійно або без помилок;</p>
                        <p>функціонал завжди буде відповідати очікуванням користувача;</p>
                        <p>дані не будуть утрачені внаслідок збоїв або втручання третіх осіб.</p>
                        <p>Ми не несемо відповідальності за будь-які збитки, які можуть виникнути внаслідок використання або неможливості використання сервісу.</p>
                        <p>6. Припинення доступу</p>
                        <p>Ми залишаємо за собою право припинити доступ до сервісу BookCat у разі:</p>
                        <ul className="ul">
                            <li>порушення цих Умов використання;</li>
                            <li>невчасної оплати тарифного плану;</li>
                            <li>виявлення підозрілої або зловмисної активності;</li>
                            <li>інших обґрунтованих причин на розсуд адміністрації сервісу.</li>
                        </ul>
                        <p>Припинення доступу може бути тимчасовим або постійним залежно від обставин.</p>
                        <p>7. Оплата та тарифні плани</p>
                        <p>BookCat пропонує платні тарифні плани, що надають доступ до повного функціоналу сервісу.</p>
                        <ul className="ul">
                            <li>Активація особистого кабінету відбувається після підтвердження оплати, яка здійснюється на банківську картку за реквізитами, указаними на сайті.</li>
                            <li>Перевірка оплати здійснюється вручну адміністрацією протягом 24 годин.</li>
                            <li>Ви зобов’язуєтеся вчасно здійснювати оплату, щоб уникнути втрати доступу до сервісу.</li>
                        </ul>
                        <p>8. Зміни до умов</p>
                        <p>Ми можемо в будь-який час оновлювати або змінювати ці Умови використання. Актуальна версія завжди буде доступна на сайті BookCat.</p>
                        <p>Про важливі зміни повідомлятимемо за допомогою оголошень на головній сторінці або через електронну пошту.</p>
                        <p>Продовження користування сервісом після змін означає вашу згоду з оновленими умовами.</p>
                        <p>9. Урегулювання взаємин між сторонами</p>
                        <p>Ці Умови використання врегульовано відповідно до чинного законодавства України. Усі суперечки та розбіжності, що виникають у зв’язку з цими умовами, підлягають вирішенню згідно з українським правом.</p>
                        <p>10. Контакти</p>
                        <p>З будь-яких питань щодо цих Умов використання або сервісу BookCat звертайтесь до нас.</p>
                        <p>Електронна адреса: admin@gmail.com</p>
                    </div>

                </div>
            )}
        </>
    );
};

export default DocumentationPage;
