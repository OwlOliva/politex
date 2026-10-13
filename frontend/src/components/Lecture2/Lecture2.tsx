// Lecture2.tsx
// import React, { useState, type FormEvent } from 'react';
import './Lecture2.css';


const Lecture2: React.FC = () => {
  

  return (
    <div className="lecture2-container">
      <h1>Тема 2. Информационные системы (ИС): основные понятия, классификация, структура и области применения</h1>

      {/* ==================== 1 ==================== */}
      <h2>1. Понятие системы</h2>
      <p>
        <strong>Система</strong> — любой объект, который одновременно рассматривается и как
        единое целое, и как совокупность разнородных объектов, объединённых для достижения
        определённого результата.
      </p>

      {/* ==================== 2 ==================== */}
      <h2>2. Понятие информационной системы</h2>
      <p>
        В широком смысле <strong>информационная система</strong> есть совокупность технического,
        программного и организационного обеспечения, а также персонала, предназначенная для того,
        чтобы своевременно обеспечивать надлежащих людей надлежащей информацией.
      </p>

      <div className="lecture2-highlight">
        <strong>Федеральный закон РФ от 27 июля 2006 года № 149-ФЗ «Об информации, информационных
        технологиях и о защите информации»</strong> трактует понятие информационной системы так:{' '}
        «информационная система — совокупность содержащейся в базах данных информации и
        обеспечивающих её обработку информационных технологий и технических средств».
      </div>

      <p>
        Существует также определение: <em>«Информационной системой называется комплекс, включающий
        вычислительное и коммуникационное оборудование, программное обеспечение, лингвистические
        средства и информационные ресурсы, а также системный персонал и обеспечивающий поддержку
        динамической информационной модели некоторой части реального мира для удовлетворения
        информационных потребностей пользователей»</em>.
      </p>

      <p>
        Стандарт <strong>ISO/IEC 2382-1</strong> даёт следующее определение:{' '}
        <em>«Информационная система — система обработки информации, работающая совместно с
        организационными ресурсами, такими как люди, технические средства и финансовые ресурсы,
        которые обеспечивают и распределяют информацию»</em>.
      </p>

      <p>
        Российский <strong>ГОСТ РВ 51987</strong> определяет информационную систему как{' '}
        <em>«автоматизированную систему, результатом функционирования которой является
        представление выходной информации для последующего использования»</em>.
      </p>

      <p>
        В узком смысле ИС рассматривают как <strong>программно-аппаратную систему</strong>,
        предназначенную для автоматизации целенаправленной деятельности конечных пользователей,
        обеспечивающую, в соответствии с заложенной в неё логикой обработки, возможность получения,
        модификации и хранения информации.
      </p>

      {/* ==================== 3 ==================== */}
      <h2>3. Функции информационной системы</h2>
      <p>Информационная система выполняет две основные функции:</p>
      <ol>
        <li>Воспринимает запрос пользователя и исходные данные.</li>
        <li>Обрабатывает введённые данные и формирует выходную информацию.</li>
      </ol>

      <h3>Функциональная часть</h3>
      <p>
        <strong>Функция системы</strong> — совокупность действий, направленных на достижение
        определённой частной цели. Функции АИС подразделяются на <strong>информационные</strong>,{' '}
        <strong>управляющие</strong>, <strong>защитные</strong> и{' '}
        <strong>вспомогательные</strong>.
      </p>

      <h3>Примеры информационных систем</h3>
      <ul>
        <li>Библиотека;</li>
        <li>Справочная служба железных дорог;</li>
        <li>Пресса (редакция газеты, телецентр, радиостудия);</li>
        <li>Подразделения управленческой структуры предприятия (бухгалтерия, отдел кадров, отдел научно-технической информации и пр.)</li>
      </ul>

      {/* ==================== 4 ==================== */}
      <h2>4. Автоматизированные информационные системы (АИС)</h2>
      <p>
        <strong>АИС</strong> — система, состоящая из персонала и комплекса средств автоматизации
        его деятельности, реализующая информационную технологию выполнения установленных функций.
      </p>

      <div className="lecture2-diagram-block">
        {/* SVG: Состав АИС */}
        <svg
          width="620"
          height="180"
          viewBox="0 0 620 180"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Состав АИС"
        >
          <rect x="230" y="20" width="160" height="50" rx="6" fill="#7fb3d5" stroke="#1d4e89" strokeWidth="2" />
          <text x="310" y="52" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="16" fontWeight="600" fill="#0b2a4a">АИС</text>

          <line x1="310" y1="70" x2="310" y2="90" stroke="#1d4e89" strokeWidth="2" />
          <line x1="110" y1="90" x2="510" y2="90" stroke="#1d4e89" strokeWidth="2" />
          <line x1="110" y1="90" x2="110" y2="110" stroke="#1d4e89" strokeWidth="2" />
          <line x1="310" y1="90" x2="310" y2="110" stroke="#1d4e89" strokeWidth="2" />
          <line x1="510" y1="90" x2="510" y2="110" stroke="#1d4e89" strokeWidth="2" />

          <rect x="20" y="110" width="180" height="50" rx="6" fill="#a9cce3" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="110" y="133" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">ТЕХНИЧЕСКИЕ</text>
          <text x="110" y="152" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">СРЕДСТВА</text>

          <rect x="220" y="110" width="180" height="50" rx="6" fill="#a9cce3" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="310" y="133" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">ПРОГРАММНЫЕ</text>
          <text x="310" y="152" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">СРЕДСТВА</text>

          <rect x="420" y="110" width="180" height="50" rx="6" fill="#a9cce3" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="510" y="140" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fontWeight="600" fill="#0b2a4a">ЧЕЛОВЕК</text>
        </svg>
        <div className="lecture2-diagram-caption">
          Рис. 1. Состав автоматизированной информационной системы
        </div>
      </div>

      {/* ==================== 5 ==================== */}
      <h2>5. Виды АИС по происходящим процессам</h2>

      <h3>5.1. Разомкнутая ИС</h3>
      <p>
        <strong>Разомкнутая ИС</strong> — потребитель использует ИС произвольно, нет обратной
        связи. <em>Например: библиотека.</em>
      </p>

      <div className="lecture2-diagram-block">
        {/* SVG: Разомкнутая ИС */}
        <svg
          width="720"
          height="140"
          viewBox="0 0 720 140"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Разомкнутая ИС"
        >
          <rect x="10" y="40" width="120" height="60" rx="12" fill="#fdebd0" stroke="#b8860b" strokeWidth="1.8" />
          <text x="70" y="65" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Источник</text>
          <text x="70" y="85" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">входной информации</text>

          <line x1="130" y1="70" x2="160" y2="70" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="155,63 170,70 155,77" fill="#0b2a4a" />

          <rect x="170" y="40" width="100" height="60" rx="4" fill="#ffffff" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="220" y="65" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Приём</text>
          <text x="220" y="85" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">информации</text>

          <line x1="270" y1="70" x2="300" y2="70" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="295,63 310,70 295,77" fill="#0b2a4a" />

          <rect x="310" y="40" width="120" height="60" rx="4" fill="#ffffff" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="370" y="65" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Хранение,</text>
          <text x="370" y="80" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">преобразование</text>
          <text x="370" y="95" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">информации</text>

          <line x1="430" y1="70" x2="460" y2="70" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="455,63 470,70 455,77" fill="#0b2a4a" />

          <rect x="470" y="40" width="100" height="60" rx="4" fill="#ffffff" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="520" y="65" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Вывод</text>
          <text x="520" y="85" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">информации</text>

          <line x1="570" y1="70" x2="600" y2="70" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="595,63 610,70 595,77" fill="#0b2a4a" />

          <rect x="610" y="40" width="100" height="60" rx="12" fill="#fdebd0" stroke="#b8860b" strokeWidth="1.8" />
          <text x="660" y="75" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Потребитель</text>
        </svg>
        <div className="lecture2-diagram-caption">
          Рис. 2. Разомкнутая ИС
        </div>
      </div>

      <h3>5.2. Замкнутая ИС</h3>
      <p>
        <strong>Замкнутая ИС</strong> — существует обратная связь.{' '}
        <em>Например: продажа билетов.</em>
      </p>

      <div className="lecture2-diagram-block">
        {/* SVG: Замкнутая ИС */}
        <svg
          width="720"
          height="200"
          viewBox="0 0 720 200"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Замкнутая ИС"
        >
          <rect x="10" y="40" width="120" height="60" rx="12" fill="#fdebd0" stroke="#b8860b" strokeWidth="1.8" />
          <text x="70" y="65" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Источник</text>
          <text x="70" y="85" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">входной информации</text>

          <line x1="130" y1="70" x2="160" y2="70" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="155,63 170,70 155,77" fill="#0b2a4a" />

          <rect x="170" y="40" width="100" height="60" rx="4" fill="#ffffff" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="220" y="65" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Приём</text>
          <text x="220" y="85" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">информации</text>

          <line x1="270" y1="70" x2="300" y2="70" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="295,63 310,70 295,77" fill="#0b2a4a" />

          <rect x="310" y="40" width="120" height="60" rx="4" fill="#ffffff" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="370" y="65" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Хранение,</text>
          <text x="370" y="80" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">преобразование</text>
          <text x="370" y="95" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">информации</text>

          <line x1="430" y1="70" x2="460" y2="70" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="455,63 470,70 455,77" fill="#0b2a4a" />

          <rect x="470" y="40" width="100" height="60" rx="4" fill="#ffffff" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="520" y="65" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Вывод</text>
          <text x="520" y="85" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">информации</text>

          <line x1="570" y1="70" x2="600" y2="70" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="595,63 610,70 595,77" fill="#0b2a4a" />

          <rect x="610" y="40" width="100" height="60" rx="12" fill="#fdebd0" stroke="#b8860b" strokeWidth="1.8" />
          <text x="660" y="75" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Потребитель</text>

          <line x1="660" y1="100" x2="660" y2="150" stroke="#c0392b" strokeWidth="2" strokeDasharray="5 3" />
          <line x1="660" y1="150" x2="220" y2="150" stroke="#c0392b" strokeWidth="2" strokeDasharray="5 3" />
          <line x1="220" y1="150" x2="220" y2="100" stroke="#c0392b" strokeWidth="2" strokeDasharray="5 3" />
          <polygon points="213,105 220,95 227,105" fill="#c0392b" />
          <text x="440" y="170" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#c0392b">Обратная связь</text>
        </svg>
        <div className="lecture2-diagram-caption">
          Рис. 3. Замкнутая ИС
        </div>
      </div>

      <h3>Процессы в информационной системе</h3>
      <ol>
        <li>Ввод информации из внешних или внутренних источников;</li>
        <li>Обработка входной информации и представление её в удобном виде;</li>
        <li>Хранение как входной информации, так и результатов обработки;</li>
        <li>Вывод информации для отправки потребителю или в другую систему;</li>
        <li>Ввод информации от потребителя через обратную связь.</li>
      </ol>

      <div className="lecture2-diagram-block">
        {/* SVG: Процессы в ИС */}
        <svg
          width="620"
          height="240"
          viewBox="0 0 620 240"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Процессы в информационной системе"
        >
          <rect x="20" y="20" width="450" height="180" rx="40" fill="none" stroke="#1d4e89" strokeWidth="2" />
          <text x="245" y="45" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Аппаратная и программная части информационной системы</text>

          <rect x="50" y="70" width="100" height="50" rx="4" fill="#ffffff" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="100" y="90" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Ввод</text>
          <text x="100" y="108" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">информации</text>

          <line x1="150" y1="95" x2="180" y2="95" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="175,88 190,95 175,102" fill="#0b2a4a" />

          <rect x="190" y="70" width="110" height="50" rx="4" fill="#ffffff" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="245" y="90" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Обработка</text>
          <text x="245" y="108" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">информации</text>

          <line x1="300" y1="95" x2="330" y2="95" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="325,88 340,95 325,102" fill="#0b2a4a" />

          <rect x="340" y="70" width="100" height="50" rx="4" fill="#ffffff" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="390" y="90" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Вывод</text>
          <text x="390" y="108" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">информации</text>

          <rect x="190" y="150" width="140" height="40" rx="4" fill="#ffffff" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="260" y="175" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Обратная связь</text>

          <line x1="100" y1="120" x2="100" y2="170" stroke="#0b2a4a" strokeWidth="2" />
          <line x1="100" y1="170" x2="190" y2="170" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="185,163 200,170 185,177" fill="#0b2a4a" />

          <line x1="390" y1="120" x2="390" y2="170" stroke="#0b2a4a" strokeWidth="2" />
          <line x1="390" y1="170" x2="330" y2="170" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="335,163 320,170 335,177" fill="#0b2a4a" />

          <ellipse cx="540" cy="105" rx="70" ry="55" fill="#fdebd0" stroke="#b8860b" strokeWidth="1.8" />
          <text x="540" y="95" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Персонал</text>
          <text x="540" y="112" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">организации</text>
          <text x="540" y="129" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">или другая ИС</text>

          <line x1="470" y1="95" x2="470" y2="95" stroke="#0b2a4a" strokeWidth="2" />
          <line x1="440" y1="95" x2="470" y2="95" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="465,88 480,95 465,102" fill="#0b2a4a" />

          <text x="310" y="225" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">Процессы в информационной системе</text>
        </svg>
        <div className="lecture2-diagram-caption">
          Рис. 4. Процессы в информационной системе
        </div>
      </div>

      {/* ==================== 6 ==================== */}
      <h2>6. Значение АИС</h2>
      <ul>
        <li>Освобождение работников от рутинной работы за счёт автоматизации;</li>
        <li>Обеспечивает достоверность информации;</li>
        <li>Обеспечивает более рациональную организацию переработки информации на компьютере.</li>
      </ul>

      {/* ==================== 7 ==================== */}
      <h2>7. Изменение подхода к использованию ИС</h2>
      <table className="lecture2-table">
        <thead>
          <tr>
            <th>Период времени</th>
            <th>Концепция использования информации</th>
            <th>Вид информационной системы</th>
            <th>Цель использования ИС</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1950–1960 гг.</td>
            <td>Бумажный поток расчётных документов</td>
            <td>ИТ обработки расчётных документов на электромеханических бухгалтерских машинах</td>
            <td>Повышение скорости обработки документов. Упрощение процедуры обработки счетов и расчёта зарплаты</td>
          </tr>
          <tr>
            <td>1960–1970 гг.</td>
            <td>Основная помощь в подготовке отчётов</td>
            <td>Управленческие ИТ для производственной информации</td>
            <td>Ускорение процесса подготовки отчётности</td>
          </tr>
          <tr>
            <td>1970–1980 гг.</td>
            <td>Управленческий контроль реализации (продаж)</td>
            <td>Системы поддержки принятия решений. Системы для высшего звена управления</td>
            <td>Выработка наиболее рационального решения</td>
          </tr>
          <tr>
            <td>1980–2000 гг.</td>
            <td>Информация — стратегический ресурс, обеспечивающий конкурентное преимущество</td>
            <td>Стратегические ИТ. Автоматизированные подразделения</td>
            <td>Повышение конкурентоспособности предприятия</td>
          </tr>
        </tbody>
      </table>

      {/* ==================== 8 ==================== */}
      <h2>8. Структура АИС</h2>
      <p>
        <strong>Подсистема</strong> — это часть системы, выделенная по какому-либо признаку,
        реализующая определённые задачи.
      </p>

      <div className="lecture2-diagram-block">
        {/* SVG: Структура АИС */}
        <svg
          width="700"
          height="360"
          viewBox="0 0 700 360"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Структура АИС"
        >
          <ellipse cx="350" cy="180" rx="80" ry="60" fill="#7fb3d5" stroke="#1d4e89" strokeWidth="2.5" />
          <text x="350" y="190" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="24" fontWeight="700" fill="#7b241c">ИС</text>

          <rect x="20" y="40" width="180" height="60" rx="4" fill="#7fb3d5" stroke="#1d4e89" strokeWidth="2" />
          <text x="110" y="65" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fill="#7b241c">Информационное</text>
          <text x="110" y="85" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fill="#7b241c">обеспечение</text>
          <line x1="200" y1="70" x2="280" y2="150" stroke="#0b2a4a" strokeWidth="1.5" />

          <rect x="20" y="150" width="180" height="60" rx="4" fill="#7fb3d5" stroke="#1d4e89" strokeWidth="2" />
          <text x="110" y="175" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fill="#7b241c">Техническое</text>
          <text x="110" y="195" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fill="#7b241c">обеспечение</text>
          <line x1="200" y1="180" x2="270" y2="180" stroke="#0b2a4a" strokeWidth="1.5" />

          <rect x="20" y="260" width="180" height="60" rx="4" fill="#7fb3d5" stroke="#1d4e89" strokeWidth="2" />
          <text x="110" y="285" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fill="#7b241c">Математическое</text>
          <text x="110" y="305" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fill="#7b241c">обеспечение</text>
          <line x1="200" y1="290" x2="280" y2="210" stroke="#0b2a4a" strokeWidth="1.5" />

          <rect x="500" y="40" width="180" height="60" rx="4" fill="#7fb3d5" stroke="#1d4e89" strokeWidth="2" />
          <text x="590" y="65" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fill="#7b241c">Программное</text>
          <text x="590" y="85" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fill="#7b241c">обеспечение</text>
          <line x1="500" y1="70" x2="420" y2="150" stroke="#0b2a4a" strokeWidth="1.5" />

          <rect x="500" y="150" width="180" height="60" rx="4" fill="#7fb3d5" stroke="#1d4e89" strokeWidth="2" />
          <text x="590" y="175" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fill="#7b241c">Правовое</text>
          <text x="590" y="195" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fill="#7b241c">обеспечение</text>
          <line x1="500" y1="180" x2="430" y2="180" stroke="#0b2a4a" strokeWidth="1.5" />

          <rect x="500" y="260" width="180" height="60" rx="4" fill="#7fb3d5" stroke="#1d4e89" strokeWidth="2" />
          <text x="590" y="285" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fill="#7b241c">Организационное</text>
          <text x="590" y="305" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fill="#7b241c">обеспечение</text>
          <line x1="500" y1="290" x2="420" y2="210" stroke="#0b2a4a" strokeWidth="1.5" />
        </svg>
        <div className="lecture2-diagram-caption">
          Рис. 5. Структура АИС
        </div>
      </div>

      <h3>8.1. Информационное обеспечение</h3>
      <p>
        <strong>Информационное обеспечение</strong> — это совокупность единой системы
        классификации и кодирования информации, унифицированных систем документации, схем
        информационных потоков, циркулирующих в организации, а также методология построения БД.
      </p>
      <p>
        Информационное обеспечение АИС — совокупность проектных решений по объёмам, размещению,
        формам организации информации, циркулирующей в организации, а также методология построения
        баз данных. Включает показатели, справочные данные, классификаторы и кодификаторы
        информации, унифицированные системы документации, информацию на носителях и т.д.
      </p>

      <h3>8.2. Техническое обеспечение</h3>
      <p>
        <strong>Техническое обеспечение</strong> — комплекс технических средств, предназначенных
        для работы ИС, а также соответствующая документация на эти средства.
      </p>
      <p><strong>Состав:</strong></p>
      <ul>
        <li>Компьютеры;</li>
        <li>Устройства сбора, накопления, обработки и вывода информации;</li>
        <li>Устройства передачи данных и линии связи;</li>
        <li>Расходные материалы и др.</li>
      </ul>

      <h3>8.3. Математическое обеспечение</h3>
      <p>
        <strong>Математическое обеспечение</strong> — совокупность математических методов,
        моделей и алгоритмов, применённых в автоматизированной системе (ГОСТ 34.03–90).
      </p>
      <p><strong>К средствам математического обеспечения относятся:</strong></p>
      <ul>
        <li>Средства моделирования процессов управления;</li>
        <li>Типовые задачи управления;</li>
        <li>Методы математического программирования, математической статистики, теории массового обслуживания и др.</li>
      </ul>

      <h3>8.4. Программное обеспечение</h3>
      <p>
        <strong>Программное обеспечение АИС</strong> — совокупность программ для реализации целей
        и задач информационной системы, а также нормального функционирования комплекса технических
        средств.
      </p>
      <p>
        В состав программного обеспечения входят общесистемные и специальные программные продукты,
        а также техническая документация.
      </p>

      <h3>8.5. Организационное обеспечение</h3>
      <p>
        <strong>Организационное обеспечение</strong> — совокупность документов, регулирующих
        отношения внутри трудового коллектива, а также устанавливающих правила обращения персонала
        с техническими средствами.
      </p>

      <h3>8.6. Правовое обеспечение</h3>
      <p>
        <strong>Правовое обеспечение</strong> — совокупность правовых норм, определяющих
        создание, юридический статус и функционирование информационных систем, регламентирующих
        порядок получения, преобразования и использования информации с целью соблюдения законности.
      </p>

      <div className="lecture2-diagram-block">
        {/* SVG: Правовое обеспечение */}
        <svg
          width="620"
          height="260"
          viewBox="0 0 620 260"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Правовое обеспечение"
        >
          <rect x="110" y="20" width="400" height="50" rx="6" fill="#a93226" stroke="#7b241c" strokeWidth="2" />
          <text x="310" y="40" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#ffffff">Правовое обеспечение на этапе</text>
          <text x="310" y="58" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#ffffff">функционирования информационной системы определяет:</text>

          <line x1="200" y1="70" x2="200" y2="90" stroke="#0b2a4a" strokeWidth="1.8" />
          <line x1="200" y1="90" x2="250" y2="90" stroke="#0b2a4a" strokeWidth="1.8" />
          <line x1="200" y1="140" x2="250" y2="140" stroke="#0b2a4a" strokeWidth="1.8" />
          <line x1="200" y1="190" x2="250" y2="190" stroke="#0b2a4a" strokeWidth="1.8" />
          <line x1="200" y1="230" x2="250" y2="230" stroke="#0b2a4a" strokeWidth="1.8" />

          <rect x="250" y="75" width="300" height="40" rx="4" fill="#fdf2e9" stroke="#a93226" strokeWidth="1.5" />
          <text x="400" y="100" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Статус информационной системы</text>

          <rect x="250" y="120" width="300" height="40" rx="4" fill="#fdf2e9" stroke="#a93226" strokeWidth="1.5" />
          <text x="400" y="145" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Права, обязанности и ответственность персонала</text>

          <rect x="250" y="165" width="300" height="40" rx="4" fill="#fdf2e9" stroke="#a93226" strokeWidth="1.5" />
          <text x="400" y="190" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Правовые положения отдельных видов процесса управления</text>

          <rect x="250" y="210" width="300" height="40" rx="4" fill="#fdf2e9" stroke="#a93226" strokeWidth="1.5" />
          <text x="400" y="235" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Порядок создания и использования информации и др.</text>
        </svg>
        <div className="lecture2-diagram-caption">
          Рис. 6. Правовое обеспечение на этапе функционирования ИС
        </div>
      </div>

      <h3>8.7. Лингвистическое обеспечение</h3>
      <p>
        <strong>Лингвистическое обеспечение АИС</strong> — совокупность языков общения (языковых
        средств) персонала информационной системы и пользователей с программным, математическим и
        информационным обеспечением, а также совокупность терминов, используемых в информационной
        системе.
      </p>
      <p><strong>Лингвистическое обеспечение включает:</strong></p>
      <ul>
        <li>Информационные языки для описания структурных единиц информационной базы;</li>
        <li>Языки управления и манипулирования данными;</li>
        <li>Систему терминов и определений, используемых в процессе разработки и функционирования ИС;</li>
        <li>Языковые средства информационно-поисковых систем, систем автоматизации проектирования.</li>
      </ul>

      <h3>8.8. Метрологическое обеспечение</h3>
      <p>
        <strong>Метрологическое обеспечение</strong> — методы и средства метрологии и инструкции
        по их применению для всех компонентов АИС.
      </p>

      <h3>8.9. Методическое обеспечение</h3>
      <p>
        <strong>Методическое обеспечение</strong> — совокупность документов, описывающих
        технологию функционирования АИС, методы выбора и применения пользователями технологических
        приёмов для получения конкретных результатов при функционировании АИС.
      </p>

      <h3>8.10. Эргономическое обеспечение</h3>
      <p>
        <strong>Эргономическое обеспечение</strong> — совокупность методов и средств,
        предназначенных для создания оптимальных условий высокоэффективной и безошибочной
        деятельности человека в АИС, для её быстрого освоения.
      </p>

      {/* ==================== 9 ==================== */}
      <h2>9. Обобщённая структура АИС</h2>

      <div className="lecture2-diagram-block">
        {/* SVG: Обобщённая структура АИС */}
        <svg
          width="700"
          height="320"
          viewBox="0 0 700 320"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Обобщённая структура АИС"
        >
          <rect x="280" y="20" width="140" height="40" rx="4" fill="#d5dbdb" stroke="#7b241c" strokeWidth="2" />
          <text x="350" y="45" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fontWeight="600" fill="#0b2a4a">АИС</text>

          <line x1="280" y1="40" x2="180" y2="70" stroke="#0b2a4a" strokeWidth="1.8" />
          <line x1="420" y1="40" x2="520" y2="70" stroke="#0b2a4a" strokeWidth="1.8" />

          <rect x="60" y="70" width="240" height="40" rx="4" fill="#f5b7b1" stroke="#7b241c" strokeWidth="2" />
          <text x="180" y="95" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fontWeight="600" fill="#0b2a4a">Обеспечение</text>

          <rect x="400" y="70" width="240" height="40" rx="4" fill="#aed6f1" stroke="#1d4e89" strokeWidth="2" />
          <text x="520" y="95" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fontWeight="600" fill="#0b2a4a">Функциональные подсистемы</text>

          <line x1="180" y1="110" x2="180" y2="130" stroke="#0b2a4a" strokeWidth="1.5" />
          <line x1="60" y1="130" x2="300" y2="130" stroke="#0b2a4a" strokeWidth="1.5" />
          <line x1="60" y1="130" x2="60" y2="150" stroke="#0b2a4a" strokeWidth="1.5" />
          <line x1="120" y1="130" x2="120" y2="150" stroke="#0b2a4a" strokeWidth="1.5" />
          <line x1="180" y1="130" x2="180" y2="150" stroke="#0b2a4a" strokeWidth="1.5" />
          <line x1="240" y1="130" x2="240" y2="150" stroke="#0b2a4a" strokeWidth="1.5" />
          <line x1="300" y1="130" x2="300" y2="150" stroke="#0b2a4a" strokeWidth="1.5" />

          <rect x="20" y="150" width="80" height="80" rx="4" fill="#f5b7b1" stroke="#7b241c" strokeWidth="1.5" />
          <text x="60" y="185" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="10" fill="#0b2a4a">Инфор-</text>
          <text x="60" y="200" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="10" fill="#0b2a4a">мацион-</text>
          <text x="60" y="215" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="10" fill="#0b2a4a">ное</text>

          <rect x="110" y="150" width="80" height="80" rx="4" fill="#f5b7b1" stroke="#7b241c" strokeWidth="1.5" />
          <text x="150" y="185" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="10" fill="#0b2a4a">Мате-</text>
          <text x="150" y="200" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="10" fill="#0b2a4a">мати-</text>
          <text x="150" y="215" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="10" fill="#0b2a4a">ческое</text>

          <rect x="200" y="150" width="80" height="80" rx="4" fill="#f5b7b1" stroke="#7b241c" strokeWidth="1.5" />
          <text x="240" y="185" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="10" fill="#0b2a4a">Про-</text>
          <text x="240" y="200" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="10" fill="#0b2a4a">грамм-</text>
          <text x="240" y="215" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="10" fill="#0b2a4a">ное</text>

          <rect x="290" y="150" width="80" height="80" rx="4" fill="#f5b7b1" stroke="#7b241c" strokeWidth="1.5" />
          <text x="330" y="185" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="10" fill="#0b2a4a">Техни-</text>
          <text x="330" y="200" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="10" fill="#0b2a4a">ческое</text>

          <rect x="380" y="150" width="80" height="80" rx="4" fill="#f5b7b1" stroke="#7b241c" strokeWidth="1.5" />
          <text x="420" y="185" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="10" fill="#0b2a4a">Право-</text>
          <text x="420" y="200" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="10" fill="#0b2a4a">вое</text>
          <text x="420" y="215" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="10" fill="#0b2a4a">и др.</text>

          <line x1="520" y1="110" x2="520" y2="130" stroke="#0b2a4a" strokeWidth="1.5" />
          <line x1="420" y1="130" x2="620" y2="130" stroke="#0b2a4a" strokeWidth="1.5" />
          <line x1="420" y1="130" x2="420" y2="150" stroke="#0b2a4a" strokeWidth="1.5" />
          <line x1="520" y1="130" x2="520" y2="150" stroke="#0b2a4a" strokeWidth="1.5" />
          <line x1="620" y1="130" x2="620" y2="150" stroke="#0b2a4a" strokeWidth="1.5" />

          <rect x="370" y="150" width="100" height="80" rx="4" fill="#aed6f1" stroke="#1d4e89" strokeWidth="1.5" />
          <text x="420" y="185" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Сбор</text>
          <text x="420" y="200" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">инфор-</text>
          <text x="420" y="215" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">мации</text>

          <rect x="480" y="150" width="100" height="80" rx="4" fill="#aed6f1" stroke="#1d4e89" strokeWidth="1.5" />
          <text x="530" y="180" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Представ-</text>
          <text x="530" y="195" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">ление,</text>
          <text x="530" y="210" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">хранение</text>
          <text x="530" y="225" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">и обработка</text>

          <rect x="590" y="150" width="100" height="80" rx="4" fill="#aed6f1" stroke="#1d4e89" strokeWidth="1.5" />
          <text x="640" y="180" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Выдача и</text>
          <text x="640" y="195" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">распрост-</text>
          <text x="640" y="210" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">ранение</text>
          <text x="640" y="225" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">информации</text>
        </svg>
        <div className="lecture2-diagram-caption">
          Рис. 7. Обобщённая структура АИС
        </div>
      </div>

      {/* ==================== 10 ==================== */}
      <h2>10. Классификация информационных систем</h2>

      <div className="lecture2-diagram-block">
        {/* SVG: Классификация ИС */}
        <svg
          width="720"
          height="500"
          viewBox="0 0 720 500"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Классификация информационных систем"
        >
          <text x="360" y="25" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="20" fontWeight="700" fill="#c0392b">КЛАССИФИКАЦИЯ ИС</text>

          <rect x="240" y="40" width="240" height="35" rx="4" fill="#ffffff" stroke="#0b2a4a" strokeWidth="2" />
          <text x="360" y="63" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fill="#0b2a4a">Информационные системы</text>

          <line x1="360" y1="75" x2="360" y2="90" stroke="#0b2a4a" strokeWidth="1.8" />

          <rect x="40" y="90" width="640" height="55" rx="12" fill="none" stroke="#0b2a4a" strokeWidth="1.5" strokeDasharray="6 4" />
          <text x="60" y="110" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Тип данных</text>
          <rect x="60" y="115" width="200" height="25" rx="3" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.5" />
          <text x="160" y="133" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Фактографические</text>
          <rect x="440" y="115" width="200" height="25" rx="3" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.5" />
          <text x="540" y="133" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Документальные</text>

          <line x1="360" y1="145" x2="360" y2="160" stroke="#0b2a4a" strokeWidth="1.8" />

          <rect x="40" y="160" width="150" height="320" rx="12" fill="none" stroke="#0b2a4a" strokeWidth="1.5" strokeDasharray="6 4" />
          <text x="60" y="182" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Степень</text>
          <text x="60" y="197" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">автоматизации</text>
          <rect x="55" y="215" width="120" height="30" rx="3" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.5" />
          <text x="115" y="235" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Ручные</text>
          <rect x="55" y="260" width="120" height="30" rx="3" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.5" />
          <text x="115" y="280" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Автоматизи-</text>
          <text x="115" y="292" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="10" fill="#0b2a4a">рованные</text>
          <rect x="55" y="305" width="120" height="30" rx="3" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.5" />
          <text x="115" y="325" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Автомати-</text>
          <text x="115" y="337" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="10" fill="#0b2a4a">ческие</text>

          <rect x="200" y="160" width="160" height="320" rx="12" fill="none" stroke="#0b2a4a" strokeWidth="1.5" strokeDasharray="6 4" />
          <text x="220" y="182" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Сфера</text>
          <text x="220" y="197" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">применения</text>
          <rect x="215" y="215" width="130" height="30" rx="3" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.5" />
          <text x="280" y="235" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Интегриро-</text>
          <text x="280" y="247" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="10" fill="#0b2a4a">ванные</text>
          <rect x="215" y="260" width="130" height="30" rx="3" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.5" />
          <text x="280" y="275" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Организацион-</text>
          <text x="280" y="288" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">ного управления</text>
          <rect x="215" y="305" width="130" height="30" rx="3" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.5" />
          <text x="280" y="325" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Управления ТП</text>
          <rect x="215" y="350" width="130" height="30" rx="3" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.5" />
          <text x="280" y="370" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">САПР</text>

          <rect x="370" y="160" width="170" height="320" rx="12" fill="none" stroke="#0b2a4a" strokeWidth="1.5" strokeDasharray="6 4" />
          <text x="390" y="182" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Характер</text>
          <text x="390" y="197" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">обработки данных</text>
          <rect x="385" y="215" width="140" height="30" rx="3" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.5" />
          <text x="455" y="230" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Информационно-</text>
          <text x="455" y="243" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">поисковые</text>
          <rect x="385" y="260" width="140" height="30" rx="3" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.5" />
          <text x="455" y="275" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Информационно-</text>
          <text x="455" y="288" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">решающие</text>
          <rect x="385" y="305" width="140" height="30" rx="3" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.5" />
          <text x="455" y="325" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Управляющие</text>
          <rect x="385" y="350" width="140" height="30" rx="3" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.5" />
          <text x="455" y="370" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Советующие</text>

          <rect x="550" y="160" width="150" height="320" rx="12" fill="none" stroke="#0b2a4a" strokeWidth="1.5" strokeDasharray="6 4" />
          <text x="570" y="182" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Уровень</text>
          <text x="570" y="197" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">управления</text>
          <rect x="565" y="215" width="120" height="30" rx="3" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.5" />
          <text x="625" y="235" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Стратеги-</text>
          <text x="625" y="247" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="10" fill="#0b2a4a">ческие</text>
          <rect x="565" y="260" width="120" height="30" rx="3" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.5" />
          <text x="625" y="280" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Функцио-</text>
          <text x="625" y="292" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="10" fill="#0b2a4a">нальные</text>
          <rect x="565" y="305" width="120" height="30" rx="3" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.5" />
          <text x="625" y="325" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Операци-</text>
          <text x="625" y="337" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="10" fill="#0b2a4a">онные</text>
        </svg>
        <div className="lecture2-diagram-caption">
          Рис. 8. Классификация информационных систем
        </div>
      </div>

      <h3>10.1. По типу данных</h3>
      <ul>
        <li>
          <strong>Фактографическая ИС</strong> — система, способная однозначно решать
          поставленные задачи и давать однозначные ответы на запросы. К ним относятся
          информационно-справочные и информационно-поисковые системы.
        </li>
        <li>
          <strong>Документальная ИС</strong> — не предлагает однозначного ответа. Совокупность
          неструктурированных текстовых документов (статьи, книги, рефераты, тексты законов и
          т.п.), снабжённая тем или иным формализованным аппаратом поиска. Цель ИС — выдать ответ
          на запрос пользователя в виде списка документов, в какой-то мере удовлетворяющих
          сформулированным в запросе условиям. Например, список статей со словом «ЭНТРОПИЯ». ДИС
          должна уметь по контексту определять смысл того или иного термина. РАК — животное,
          созвездие или болезнь.
        </li>
        <li>
          <strong>Гибрид</strong> фактографической и документальной ИС.
        </li>
      </ul>

      <h3>10.2. По степени автоматизации</h3>
      <ul>
        <li><strong>Ручные</strong> — все операции выполняет человек.</li>
        <li><strong>Автоматизированные</strong> — часть операций выполняет человек, часть — технические средства.</li>
        <li>
          <strong>Автоматические</strong> — выполняют все операции по переработке информации без
          участия человека.
        </li>
      </ul>

      <h3>10.3. По сфере применения</h3>
      <ul>
        <li>Интегрированные;</li>
        <li>Организационного управления;</li>
        <li>Управления технологическими процессами (ТП);</li>
        <li>САПР (системы автоматизированного проектирования).</li>
      </ul>

      <h3>10.4. По характеру обработки данных</h3>
      <ul>
        <li>Информационно-поисковые;</li>
        <li>Информационно-решающие;</li>
        <li>Управляющие;</li>
        <li>Советующие.</li>
      </ul>

      <h3>10.5. По уровню управления</h3>
      <ul>
        <li>Стратегические;</li>
        <li>Функциональные;</li>
        <li>Операционные.</li>
      </ul>

      <h3>10.6. По видам процессов управления</h3>
      <ul>
        <li>АИС управления технологическими процессами;</li>
        <li>АИС управления организационно-технологическими процессами;</li>
        <li>АИС организационного управления;</li>
        <li>АИС научных исследований;</li>
        <li>Обучающие АИС.</li>
      </ul>

      <h3>10.7. По уровню в системе государственного управления</h3>
      <ul>
        <li>Отраслевые АИС;</li>
        <li>Территориальные АИС;</li>
        <li>Межотраслевые АИС.</li>
      </ul>

      <h3>10.8. По обслуживаемым предметным областям</h3>
      <ul>
        <li>АИС промышленности;</li>
        <li>АИС сельского хозяйства;</li>
        <li>АИС транспорта;</li>
        <li>АИС связи и т.д.</li>
      </ul>

      {/* ==================== 11 ==================== */}
      <h2>11. Автоматизированные информационные технологии</h2>
      <p>
        Классификация автоматизированных информационных технологий (АИТ) по различным признакам:
      </p>
      <ul>
        <li>
          <strong>По способу реализации в АИС:</strong> традиционные; новые информационные
          технологии.
        </li>
        <li>
          <strong>По степени охвата задач управления:</strong> электронная обработка данных;
          автоматизация функций управления; поддержка принятия решений; электронный офис;
          экспертная поддержка.
        </li>
        <li>
          <strong>По классу реализуемых технологических операций:</strong> работа с текстовым
          редактором; работа с табличным процессором; работа с СУБД; работа с графическими
          объектами; мультимедийные системы; гипертекстовые системы.
        </li>
        <li>
          <strong>По типу пользовательского интерфейса:</strong> пакетные; диалоговые; сетевые.
        </li>
        <li>
          <strong>По способу построения сети:</strong> локальные; многоуровневые;
          распределённые.
        </li>
        <li>
          <strong>По обслуживаемым предметным областям:</strong> бухгалтерский учёт; банковская
          деятельность; налоговая деятельность; страховая деятельность; другие.
        </li>
      </ul>

      {/* ==================== 12 ==================== */}
      <h2>12. Примеры АИС</h2>
      <p>Примерами автоматизированных информационных систем являются:</p>
      <ul>
        <li>АИС «Налог»;</li>
        <li>АСУП (автоматизированная система управления предприятием);</li>
        <li>АИС «Безопасная жизнедеятельность города»;</li>
        <li>АИС ГЛР (государственный лесной реестр);</li>
        <li>Государственная автоматизированная система РФ «Выборы»;</li>
        <li>Медицинские информационные системы;</li>
        <li>Автоматизированная система учёта реализации компьютерных комплектующих.</li>
      </ul>

      <div className="lecture2-note">
        <strong>Вывод:</strong> Информационные системы — это сложные комплексы, включающие
        техническое, программное, информационное, математическое, лингвистическое, правовое,
        организационное, методическое, метрологическое и эргономическое обеспечение. Они
        классифицируются по множеству признаков и применяются практически во всех сферах
        человеческой деятельности.
      </div>

    </div>
  );
};

export default Lecture2;