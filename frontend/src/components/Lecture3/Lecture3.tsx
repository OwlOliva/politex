// import React, { useState, FormEvent } from 'react';
import './Lecture3.css';


const Lecture3: React.FC = () => {


  return (
    <div className="lecture3-container">
      <h1>Тема 3. Особенности функционирования ИС, критерии эффективности</h1>

      {/* ==================== 1 ==================== */}
      <h2>1. Этапы функционирования информационной системы</h2>
      <p>Функционирование любой ИС складывается из следующих этапов:</p>
      <ul>
        <li>Ввод информации из внешних или внутренних источников;</li>
        <li>Обработка входной информации и представление её в удобном виде;</li>
        <li>Вывод информации для представления потребителям или передачи в другую систему;</li>
        <li>
          Обратная связь — это информация, переработанная людьми данной организации для коррекции
          входной информации.
        </li>
      </ul>

      <div className="lecture3-diagram-block">
        {/* SVG: Этапы функционирования ИС */}
        <svg
          width="720"
          height="200"
          viewBox="0 0 720 200"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Этапы функционирования информационной системы"
        >
          <rect x="20" y="60" width="120" height="60" rx="8" fill="#fdebd0" stroke="#b8860b" strokeWidth="1.8" />
          <text x="80" y="85" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Ввод</text>
          <text x="80" y="105" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">информации</text>

          <line x1="140" y1="90" x2="170" y2="90" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="165,83 180,90 165,97" fill="#0b2a4a" />

          <rect x="180" y="60" width="130" height="60" rx="8" fill="#aed6f1" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="245" y="85" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Обработка</text>
          <text x="245" y="105" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">информации</text>

          <line x1="310" y1="90" x2="340" y2="90" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="335,83 350,90 335,97" fill="#0b2a4a" />

          <rect x="350" y="60" width="130" height="60" rx="8" fill="#a9dfbf" stroke="#1d7a3a" strokeWidth="1.8" />
          <text x="415" y="85" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Вывод</text>
          <text x="415" y="105" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">информации</text>

          <line x1="480" y1="90" x2="510" y2="90" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="505,83 520,90 505,97" fill="#0b2a4a" />

          <rect x="520" y="60" width="130" height="60" rx="8" fill="#fdebd0" stroke="#b8860b" strokeWidth="1.8" />
          <text x="585" y="85" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Потребитель</text>
          <text x="585" y="105" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">/ другая ИС</text>

          <line x1="585" y1="120" x2="585" y2="160" stroke="#c0392b" strokeWidth="2" strokeDasharray="5 3" />
          <line x1="585" y1="160" x2="245" y2="160" stroke="#c0392b" strokeWidth="2" strokeDasharray="5 3" />
          <line x1="245" y1="160" x2="245" y2="120" stroke="#c0392b" strokeWidth="2" strokeDasharray="5 3" />
          <polygon points="238,125 245,115 252,125" fill="#c0392b" />
          <text x="415" y="180" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#c0392b">Обратная связь</text>
        </svg>
        <div className="lecture3-diagram-caption">
          Рис. 1. Этапы функционирования информационной системы
        </div>
      </div>

      {/* ==================== 2 ==================== */}
      <h2>2. Функции информационной системы</h2>

      <h3>2.1. Функция редактирования данных</h3>
      <p>
        Под функцией редактирования данных понимается, с одной стороны, целый комплекс операций,
        изменяющих содержимое информационной базы, с другой стороны, возможность информационной
        системы принимать команды и сигналы на редактирование данных со стороны пользователя через
        различные датчики или по телекоммуникационным каналам.
      </p>

      <h3>2.2. Функции получения информации (поисковые функции)</h3>
      <p>Операция получения нужной информации имеет три составляющих:</p>
      <ul>
        <li>Команда поиска, получаемая информационной системой со стороны пользователя или по другим каналам;</li>
        <li>Поиск информации в информационном хранилище;</li>
        <li>Представление полученных данных для пользователя.</li>
      </ul>

      <h3>2.3. Функции безопасности</h3>
      <p>Существуют три составляющие функции безопасности:</p>
      <ul>
        <li>Защита доступности данных;</li>
        <li>Защита целостности данных;</li>
        <li>Защита конфиденциальности информации.</li>
      </ul>

      <h3>2.4. Расчётные функции</h3>
      <p>
        Функции данного типа заключаются в обработке информации, которая находится в системе по
        определённым алгоритмам. Типичным примером расчётных задач ИС является статистическая
        обработка данных, находящихся в информационном хранилище. Широко применяющейся
        разновидностью информационных систем с расчётными функциями являются системы
        автоматического проектирования.
      </p>

      <h3>2.5. Технологические функции</h3>
      <p>
        Данные функции заключаются в автоматизации всего технологического цикла или отдельных его
        компонентов. Типичным примером системы с технологическими функциями являются ИС по
        автоматизации документооборота.
      </p>

      <h3>2.6. Аналитические функции</h3>
      <p>
        Эти функции заключаются в проведении операций над данными, результатом которых является
        прогностическая информация, то есть некоторое суждение о состоянии объекта в будущем.
      </p>

      {/* ==================== 3 ==================== */}
      <h2>3. Требования, предъявляемые к ИС</h2>

      <h3>3.1. Соответствие</h3>
      <p>
        ИС должна обеспечивать функционирование объекта с заданной эффективностью. Причём критерий
        эффективности должен быть количественным.
      </p>

      <h3>3.2. Экономичность</h3>
      <p>
        Затраты, связанные с обработкой информации в ИС, должны быть меньше, чем экономический
        эффект, получаемый при использовании данной информации.
      </p>

      <h3>3.3. Регламентность</h3>
      <p>
        Основной объём информации поступает в ИС и обрабатывается в ней в соответствии с
        расписанием.
      </p>

      <h3>3.4. Самоконтроль</h3>
      <p>
        ИС постоянно ведёт работу по поиску и исправлению ошибок в данных и процессах их
        обработки.
      </p>

      <h3>3.5. Интегральность</h3>
      <p>
        Один раз введённая информация в ИС может многократно использоваться для достижения
        различных целей.
      </p>

      <h3>3.6. Адаптивность</h3>
      <p>
        ИС обладает способностью изменять свою структуру и закон функционирования в целях
        достижения оптимального результата при изменяющихся внешних условиях.
      </p>

      <div className="lecture3-highlight">
        <strong>Общие требования к ИС:</strong> гибкость, надёжность, эффективность и
        безопасность.
      </div>

      <h3>Гибкость</h3>
      <p>
        Способность к адаптации и дальнейшему развитию подразумевает возможность приспособления
        информационной системы к новым условиям, новым потребностям предприятия.
      </p>

      <h3>Надёжность</h3>
      <p>
        Надёжность информационной системы подразумевает её функционирование без искажения
        информации, потери данных по «техническим причинам». Требование надёжности обеспечивается
        созданием резервных копий хранимой информации, выполнением операций протоколирования,
        поддержанием качества каналов связи и физических носителей информации, использованием
        современных программных и аппаратных средств. Сюда же следует отнести защиту от случайных
        потерь информации в силу недостаточной квалификации персонала.
      </p>

      <h3>Эффективность</h3>
      <p>
        Система является эффективной, если с учётом выделенных ей ресурсов она позволяет решать
        возложенные на неё задачи в минимальные сроки. Эффективность системы обеспечивается
        оптимизацией данных и методов их обработки, применением оригинальных разработок, идей,
        методов проектирования.
      </p>

      <h3>Безопасность</h3>
      <p>
        Безопасность подразумевает свойство системы, в силу которого посторонние лица не имеют
        доступа к информационным ресурсам организации, кроме тех, которые для них предназначены.
        Требование безопасности обеспечивается современными средствами разработки информационных
        систем, современной аппаратурой, методами защиты информации, применением паролей и
        протоколированием, постоянным мониторингом состояния безопасности операционных систем и
        средств их защиты.
      </p>

      {/* ==================== 4 ==================== */}
      <h2>4. Свойства информационной системы</h2>
      <ul>
        <li>
          <strong>Сложность</strong> — система зависит от множества входящих в неё компонентов,
          их структурного взаимодействия, а также сложности внутренних и внешних связей;
        </li>
        <li>
          <strong>Делимость</strong> — система состоит из ряда подсистем или элементов, выделенных
          по определённым признакам и отвечающих конкретным целям и задачам;
        </li>
        <li>
          <strong>Целостность системы</strong> — означает то, что все элементы системы
          функционируют как единое целое;
        </li>
        <li>
          <strong>Многообразие элементов системы и различие их природы</strong> — это свойство
          связано с функционированием элементов, их спецификой и автономностью;
        </li>
        <li>
          <strong>Структурность</strong> — определяет наличие установленных связей и отношений
          между элементами внутри системы, распределение элементов системы по уровням и иерархиям;
        </li>
        <li>
          <strong>Адаптивность системы</strong> — означает приспосабливаемость системы к условиям
          конкретной предметной области;
        </li>
        <li>
          <strong>Интегрируемость</strong> — означает возможность взаимодействия системы с вновь
          подключаемыми компонентами или подсистемами.
        </li>
      </ul>

      {/* ==================== 5 ==================== */}
      <h2>5. Классификация ИС по функциональному признаку и уровням управления</h2>
      <p>
        <strong>Функциональная структура</strong> представляет собой перечень реализуемых ею
        функций (задач) и отражает их соподчинённость. Под функцией ИС понимается круг действий
        ИС, направленных на достижение частной цели управления. Состав функций, реализуемых в ИС,
        регламентируется ГОСТом и подразделяется на <strong>информационные</strong> и{' '}
        <strong>управляющие</strong> функции.
      </p>

      <div className="lecture3-diagram-block">
        {/* SVG: Функции ИС */}
        <svg
          width="720"
          height="420"
          viewBox="0 0 720 420"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Функции информационной системы"
        >
          <rect x="210" y="20" width="300" height="45" rx="4" fill="#ffffff" stroke="#0b2a4a" strokeWidth="2.2" />
          <text x="360" y="48" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="15" fontWeight="600" fill="#0b2a4a">Функции информационной системы</text>

          <line x1="360" y1="65" x2="360" y2="85" stroke="#0b2a4a" strokeWidth="2" />
          <line x1="180" y1="85" x2="540" y2="85" stroke="#0b2a4a" strokeWidth="2" />

          <line x1="180" y1="85" x2="180" y2="105" stroke="#0b2a4a" strokeWidth="2" />
          <line x1="540" y1="85" x2="540" y2="105" stroke="#0b2a4a" strokeWidth="2" />

          <rect x="90" y="105" width="180" height="45" rx="4" fill="#ffffff" stroke="#0b2a4a" strokeWidth="2" />
          <text x="180" y="133" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fontWeight="600" fill="#0b2a4a">Информационные</text>

          <rect x="450" y="105" width="180" height="45" rx="4" fill="#ffffff" stroke="#0b2a4a" strokeWidth="2" />
          <text x="540" y="133" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fontWeight="600" fill="#0b2a4a">Управляющие</text>

          <line x1="180" y1="150" x2="180" y2="170" stroke="#0b2a4a" strokeWidth="1.8" />
          <line x1="120" y1="170" x2="260" y2="170" stroke="#0b2a4a" strokeWidth="1.8" />
          <line x1="120" y1="170" x2="120" y2="190" stroke="#0b2a4a" strokeWidth="1.8" />
          <line x1="260" y1="170" x2="260" y2="190" stroke="#0b2a4a" strokeWidth="1.8" />

          <rect x="40" y="190" width="150" height="40" rx="4" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.8" />
          <text x="115" y="215" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#0b2a4a">Контроля</text>

          <rect x="210" y="190" width="200" height="40" rx="4" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.8" />
          <text x="310" y="208" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Вычислительные и</text>
          <text x="310" y="223" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">логические операции</text>

          <line x1="540" y1="150" x2="540" y2="170" stroke="#0b2a4a" strokeWidth="1.8" />
          <line x1="480" y1="170" x2="600" y2="170" stroke="#0b2a4a" strokeWidth="1.8" />
          <line x1="480" y1="170" x2="480" y2="190" stroke="#0b2a4a" strokeWidth="1.8" />
          <line x1="600" y1="170" x2="600" y2="190" stroke="#0b2a4a" strokeWidth="1.8" />

          <rect x="410" y="190" width="150" height="40" rx="4" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.8" />
          <text x="485" y="208" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Поиск и расчёт</text>
          <text x="485" y="223" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">рациональных режимов</text>

          <rect x="570" y="190" width="140" height="40" rx="4" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.8" />
          <text x="640" y="208" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Реализация</text>
          <text x="640" y="223" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">заданных режимов</text>

          {/* Измерение значений параметров */}
          <rect x="20" y="270" width="160" height="55" rx="12" fill="#fdebd0" stroke="#b8860b" strokeWidth="1.8" />
          <text x="100" y="293" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Измерение</text>
          <text x="100" y="308" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">значений</text>
          <text x="100" y="320" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">параметров</text>
          <line x1="115" y1="230" x2="115" y2="270" stroke="#0b2a4a" strokeWidth="1.5" />
          <polygon points="110,265 115,275 120,265" fill="#0b2a4a" />

          {/* Измерение отклонений */}
          <rect x="20" y="345" width="160" height="55" rx="12" fill="#fdebd0" stroke="#b8860b" strokeWidth="1.8" />
          <text x="100" y="368" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Измерение</text>
          <text x="100" y="383" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">отклонений</text>
          <text x="100" y="395" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">параметров</text>
          <line x1="115" y1="325" x2="115" y2="345" stroke="#0b2a4a" strokeWidth="1.5" />
          <polygon points="110,340 115,350 120,340" fill="#0b2a4a" />

          {/* Тестирование работоспособности */}
          <rect x="220" y="270" width="180" height="55" rx="12" fill="#fdebd0" stroke="#b8860b" strokeWidth="1.8" />
          <text x="310" y="293" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Тестирование</text>
          <text x="310" y="308" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">работоспособности</text>
          <text x="310" y="320" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">ИС</text>
          <line x1="310" y1="230" x2="310" y2="270" stroke="#0b2a4a" strokeWidth="1.5" />
          <polygon points="305,265 310,275 315,265" fill="#0b2a4a" />

          {/* Подготовка и обмен */}
          <rect x="220" y="345" width="180" height="55" rx="12" fill="#fdebd0" stroke="#b8860b" strokeWidth="1.8" />
          <text x="310" y="368" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Подготовка и обмен</text>
          <text x="310" y="383" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">информацией с</text>
          <text x="310" y="395" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">другими ИС</text>
          <line x1="310" y1="325" x2="310" y2="345" stroke="#0b2a4a" strokeWidth="1.5" />
          <polygon points="305,340 310,350 315,340" fill="#0b2a4a" />
        </svg>
        <div className="lecture3-diagram-caption">
          Рис. 2. Функции информационной системы
        </div>
      </div>

      <h3>Виды деятельности</h3>
      <ul>
        <li>Производственная;</li>
        <li>Маркетинговая;</li>
        <li>Финансовая;</li>
        <li>Кадровая.</li>
      </ul>

      <h3>Функции ИС по видам деятельности</h3>

      <h4>Система маркетинга</h4>
      <ul>
        <li>Исследование рынка и прогнозирование продаж;</li>
        <li>Управление продажами;</li>
        <li>Рекомендации по производству новой продукции;</li>
        <li>Анализ и установление цены;</li>
        <li>Учёт заказов.</li>
      </ul>

      <h4>Производственные системы</h4>
      <ul>
        <li>Планирование объёмов работ и разработка календарных планов;</li>
        <li>Оперативный контроль и управление производством;</li>
        <li>Анализ работы оборудования;</li>
        <li>Участие в формировании заказов поставщикам;</li>
        <li>Управление запасами.</li>
      </ul>

      <h4>Финансовые и учётные системы</h4>
      <ul>
        <li>Управление портфелем заказов;</li>
        <li>Управление кредитной политикой;</li>
        <li>Разработка финансового плана;</li>
        <li>Финансовый анализ и прогнозирование;</li>
        <li>Контроль бюджета;</li>
        <li>Бухгалтерский учёт и расчёт заработной платы.</li>
      </ul>

      <h4>Система кадров (человеческих ресурсов)</h4>
      <ul>
        <li>Анализ и прогнозирование потребности в трудовых ресурсах;</li>
        <li>Ведение архивов записей о персонале;</li>
        <li>Анализ и планирование подготовки кадров.</li>
      </ul>

      <h4>Прочие системы (ИС руководства)</h4>
      <ul>
        <li>Контроль за деятельностью фирмы;</li>
        <li>Выявление оперативных проблем;</li>
        <li>Анализ управленческих и стратегических ситуаций;</li>
        <li>Обеспечение процесса выработки стратегических решений.</li>
      </ul>

      {/* ==================== 6 ==================== */}
      <h2>6. Критерии эффективности ИС</h2>
      <p>
        Эффективность работы информационной системы определяется с помощью критериев
        эффективности. Как правило, функционирование ЭИС направлено на успешную реализацию
        нескольких целей. Типичный перечень может включать следующие цели и их критерии:
      </p>

      <ol>
        <li>
          <strong>Максимальная полнота информации</strong> для обеспечения принимаемых решений
          (отношение объёма информации в базе данных к объёму информации на объекте управления);
        </li>
        <li>
          <strong>Представление информации с максимально возможной скоростью</strong> (время
          обработки информации в ЭИС);
        </li>
        <li>
          <strong>Максимальное удобство взаимодействия ИС с потребителями</strong> (время, которое
          потребители расходуют на запрос необходимой информации и её использование в управлении);
        </li>
        <li>
          <strong>Сокращение расходов на создание, эксплуатацию и развитие ЭИС</strong> (сумма
          капитальных вложений и текущих затрат на создание, эксплуатацию и развитие ЭИС);
        </li>
        <li>
          <strong>Максимальное извлечение выходной информации из имеющегося объёма данных</strong>{' '}
          (отношение объёмов входной и выходной информации);
        </li>
        <li>
          <strong>Сокращение избыточности в базе данных</strong> (доля избыточной информации в
          общем объёме данных).
        </li>
      </ol>

      <div className="lecture3-diagram-block">
        {/* SVG: Модель классификации критериев качества */}
        <svg
          width="720"
          height="480"
          viewBox="0 0 720 480"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Модель классификации критериев качества эффективности функционирования ИС"
        >
          <text x="360" y="30" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="16" fontWeight="700" fill="#0b2a4a">Модель классификации критериев качества эффективности функционирования ИС</text>

          <rect x="240" y="55" width="240" height="50" rx="4" fill="#ffffff" stroke="#0b2a4a" strokeWidth="2.2" />
          <text x="360" y="78" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">Критерии качества</text>
          <text x="360" y="95" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">информационных систем</text>

          <line x1="360" y1="105" x2="360" y2="125" stroke="#0b2a4a" strokeWidth="2" />
          <line x1="120" y1="125" x2="600" y2="125" stroke="#0b2a4a" strokeWidth="2" />
          <line x1="120" y1="125" x2="120" y2="145" stroke="#0b2a4a" strokeWidth="2" />
          <line x1="360" y1="125" x2="360" y2="145" stroke="#0b2a4a" strokeWidth="2" />
          <line x1="600" y1="125" x2="600" y2="145" stroke="#0b2a4a" strokeWidth="2" />

          <rect x="20" y="145" width="200" height="60" rx="4" fill="#ffffff" stroke="#0b2a4a" strokeWidth="2" />
          <text x="120" y="170" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">Функциональные</text>
          <text x="120" y="186" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">критерии качества</text>
          <text x="120" y="200" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">ИС</text>

          <rect x="260" y="145" width="200" height="60" rx="4" fill="#ffffff" stroke="#0b2a4a" strokeWidth="2" />
          <text x="360" y="170" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">Конструктивные</text>
          <text x="360" y="186" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">критерии качества</text>
          <text x="360" y="200" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">ИС</text>

          <rect x="500" y="145" width="200" height="60" rx="4" fill="#ffffff" stroke="#0b2a4a" strokeWidth="2" />
          <text x="600" y="170" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">Факторы и параметры,</text>
          <text x="600" y="186" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">влияющие на основные</text>
          <text x="600" y="200" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">критерии качества</text>

          <line x1="120" y1="205" x2="120" y2="240" stroke="#0b2a4a" strokeWidth="1.8" />
          <line x1="360" y1="205" x2="360" y2="240" stroke="#0b2a4a" strokeWidth="1.8" />
          <line x1="600" y1="205" x2="600" y2="240" stroke="#0b2a4a" strokeWidth="1.8" />

          <rect x="20" y="240" width="200" height="60" rx="4" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.8" />
          <text x="120" y="263" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Критерии этапа</text>
          <text x="120" y="279" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">проектирования</text>
          <text x="120" y="295" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">ИС</text>

          <rect x="260" y="240" width="200" height="60" rx="4" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.8" />
          <text x="360" y="263" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Критерии этапа</text>
          <text x="360" y="279" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">эксплуатации</text>
          <text x="360" y="295" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">ИС</text>

          <rect x="500" y="240" width="200" height="60" rx="4" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.8" />
          <text x="600" y="263" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Критерии этапа</text>
          <text x="600" y="279" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">сопровождения</text>
          <text x="600" y="295" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">ИС</text>

          <line x1="120" y1="300" x2="120" y2="330" stroke="#0b2a4a" strokeWidth="1.5" />
          <line x1="360" y1="300" x2="360" y2="330" stroke="#0b2a4a" strokeWidth="1.5" />
          <line x1="600" y1="300" x2="600" y2="330" stroke="#0b2a4a" strokeWidth="1.5" />

          <text x="120" y="350" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Сложность</text>
          <text x="120" y="375" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Корректность</text>
          <text x="120" y="400" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Трудоёмкость</text>

          <text x="360" y="350" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Сложность</text>
          <text x="360" y="375" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Надёжность</text>
          <text x="360" y="400" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Эффективность</text>

          <text x="600" y="350" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Модифицируемость</text>
          <text x="600" y="375" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Мобильность</text>
          <text x="600" y="400" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Трудоёмкость</text>
        </svg>
        <div className="lecture3-diagram-caption">
          Рис. 3. Модель классификации критериев качества эффективности функционирования ИС
        </div>
      </div>

      {/* ==================== ЗАКЛЮЧЕНИЕ ==================== */}
      <div className="lecture3-note">
        <strong>Вывод:</strong> Эффективность работы информационной системы определяется
        совокупностью критериев, которые зависят от целей функционирования системы. Ключевыми
        требованиями к ИС являются гибкость, надёжность, эффективность и безопасность. Свойства ИС
        (сложность, делимость, целостность, структурность, адаптивность, интегрируемость) отражают
        её системную природу и определяют особенности функционирования.
      </div>

     
    </div>
  );
};

export default Lecture3;