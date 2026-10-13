// import React, { useState, FormEvent } from 'react';
import './Lecture4.css';


/* ==================== Компонент ==================== */
const Lecture4: React.FC = () => {
  return (
    <div className="lecture4-container">
      <h1>Тема 4. Основные модели построения информационных систем, их структура и особенности</h1>

      {/* ==================== 1 ==================== */}
      <h2>1. Моделирование и модель предметной области</h2>
      <p>
        <strong>Моделирование</strong> — процесс исследования реальной системы, включающий
        построение модели, изучение её свойств и перенос полученных сведений на моделируемую
        систему.
      </p>
      <p>
        <strong>Общие функции моделирования</strong> — описание, объяснение и прогнозирование
        поведения реальной системы.
      </p>
      <p><strong>Типовые цели моделирования:</strong></p>
      <ul>
        <li>Определение свойств системы;</li>
        <li>Поиск оптимальных или близких к оптимальным решений;</li>
        <li>Оценка эффективности решений;</li>
        <li>Установление взаимосвязей между характеристиками системы и т.д.</li>
      </ul>
      <p>
        Наши представления о реальных системах носят приближённый, модельный характер. Описывая в
        какой-либо форме реальную систему, мы создаём её <strong>информационную модель</strong>.
        Модель позволяет заблаговременно продумать характеристики системы с учётом возможных
        изменений, которые могут возникнуть в ходе её эксплуатации.
      </p>
      <p>
        <strong>Модель предметной области</strong> — некоторая система, имитирующая структуру или
        функционирование исследуемой предметной области и отвечающая основному требованию — быть
        адекватной этой области.
      </p>

      {/* ==================== 2 ==================== */}
      <h2>2. Классификация моделей ИС</h2>
      <p>При проектировании ИС используется 2 вида моделей:</p>
      <ul>
        <li>
          <strong>Модели «как есть» («as-is»)</strong> — отражают существующую на момент начала
          моделирования ситуацию в среде, в которой предстоит внедрить ИС; проектировщикам следует
          понять, как функционирует организация, где будет использоваться информационная система,
          выявить узкие места;
        </li>
        <li>
          <strong>Модели «как должно быть» («as-to-be»)</strong> — предлагают меры по оптимизации
          текущего состояния.
        </li>
      </ul>

      <p>В процессе работы над моделью ИС поставленные задачи решаются с помощью более частных видов моделей:</p>
      <ul>
        <li>
          <strong>Функциональная модель</strong> — описывает принципы действия обслуживаемой
          системы, её строение, связи внутри неё;
        </li>
        <li>
          <strong>Событийная модель</strong> — отражает информационные процессы в системе: её
          состояния и переход из одного в другое, условия таких переходов, последовательность
          событий;
        </li>
        <li>
          <strong>Визуальные модели</strong> — с помощью графических средств демонстрируют
          структуру системы, последовательность происходящих в ней процессов, отношения между
          используемыми внутри ИС данными.
        </li>
      </ul>

      <div className="lecture4-diagram-block">
        {/* SVG: Функциональная модель (IDEF0-подобная) */}
        <svg
          width="720"
          height="320"
          viewBox="0 0 720 320"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Функциональная модель"
        >
          <rect x="230" y="30" width="260" height="60" rx="6" fill="#f5cba7" stroke="#a04000" strokeWidth="2" />
          <text x="360" y="55" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">Управление услугами</text>
          <text x="360" y="75" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">рекламного агентства</text>

          <rect x="40" y="130" width="180" height="55" rx="4" fill="#ffffff" stroke="#1d4e89" strokeWidth="2" />
          <text x="130" y="155" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Принять заказ</text>
          <text x="130" y="172" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">клиента</text>
          <text x="220" y="190" fontFamily="Segoe UI, Arial" fontSize="12" fill="#1d4e89">1</text>

          <rect x="260" y="130" width="180" height="55" rx="4" fill="#ffffff" stroke="#1d4e89" strokeWidth="2" />
          <text x="350" y="155" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Распределить</text>
          <text x="350" y="172" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">заказы по специалистам</text>
          <text x="440" y="190" fontFamily="Segoe UI, Arial" fontSize="12" fill="#1d4e89">2</text>

          <rect x="480" y="130" width="180" height="55" rx="4" fill="#ffffff" stroke="#1d4e89" strokeWidth="2" />
          <text x="570" y="155" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Выполнить</text>
          <text x="570" y="172" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">работы по договору</text>
          <text x="660" y="190" fontFamily="Segoe UI, Arial" fontSize="12" fill="#1d4e89">3</text>

          <rect x="480" y="230" width="180" height="55" rx="4" fill="#ffffff" stroke="#1d4e89" strokeWidth="2" />
          <text x="570" y="255" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Произвести</text>
          <text x="570" y="272" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">расчёты с клиентом</text>
          <text x="660" y="290" fontFamily="Segoe UI, Arial" fontSize="12" fill="#1d4e89">4</text>

          <line x1="220" y1="157" x2="260" y2="157" stroke="#0b2a4a" strokeWidth="1.8" />
          <polygon points="255,150 270,157 255,164" fill="#0b2a4a" />

          <line x1="440" y1="157" x2="480" y2="157" stroke="#0b2a4a" strokeWidth="1.8" />
          <polygon points="475,150 490,157 475,164" fill="#0b2a4a" />

          <line x1="570" y1="185" x2="570" y2="230" stroke="#0b2a4a" strokeWidth="1.8" />
          <polygon points="563,225 570,240 577,225" fill="#0b2a4a" />

          <line x1="360" y1="90" x2="360" y2="130" stroke="#0b2a4a" strokeWidth="1.8" />
          <polygon points="353,125 360,140 367,125" fill="#0b2a4a" />

          <text x="360" y="115" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#4e6b8a">Устав общества</text>
        </svg>
        <div className="lecture4-diagram-caption">
          Рис. 1. Функциональная модель (пример IDEF0-диаграммы)
        </div>
      </div>

      <div className="lecture4-diagram-block">
        {/* SVG: Событийная модель */}
        <svg
          width="400"
          height="420"
          viewBox="0 0 400 420"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Событийная модель"
        >
          <rect x="60" y="10" width="280" height="50" rx="6" fill="#ffffff" stroke="#1d4e89" strokeWidth="2" />
          <text x="200" y="40" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Зачисление абитуриента на обучение</text>

          <line x1="200" y1="60" x2="200" y2="85" stroke="#0b2a4a" strokeWidth="1.8" />
          <polygon points="193,80 200,95 207,80" fill="#0b2a4a" />

          <polygon points="90,95 310,95 330,125 310,155 90,155 70,125" fill="#e8f4fd" stroke="#1d4e89" strokeWidth="2" />
          <text x="200" y="120" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Поступил Приказ ректора</text>
          <text x="200" y="138" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">о списочном составе курса</text>

          <line x1="200" y1="155" x2="200" y2="185" stroke="#0b2a4a" strokeWidth="1.8" />
          <polygon points="193,180 200,195 207,180" fill="#0b2a4a" />

          <rect x="60" y="195" width="280" height="55" rx="6" fill="#ffffff" stroke="#1d4e89" strokeWidth="2" />
          <text x="200" y="222" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Формирование состава</text>
          <text x="200" y="240" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">учебных групп курса</text>

          <line x1="200" y1="250" x2="200" y2="280" stroke="#0b2a4a" strokeWidth="1.8" />
          <polygon points="193,275 200,290 207,275" fill="#0b2a4a" />

          <polygon points="90,290 310,290 330,320 310,350 90,350 70,320" fill="#e8f4fd" stroke="#1d4e89" strokeWidth="2" />
          <text x="200" y="315" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Состав учебных групп</text>
          <text x="200" y="333" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">определён</text>

          <line x1="200" y1="350" x2="200" y2="380" stroke="#0b2a4a" strokeWidth="1.8" />
          <polygon points="193,375 200,390 207,375" fill="#0b2a4a" />

          <rect x="60" y="390" width="280" height="25" rx="6" fill="#ffffff" stroke="#1d4e89" strokeWidth="2" />
          <text x="200" y="408" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Составление расписания занятий курса</text>
        </svg>
        <div className="lecture4-diagram-caption">
          Рис. 2. Событийная модель
        </div>
      </div>

      <div className="lecture4-diagram-block">
        {/* SVG: Визуальная модель (Swimlane) */}
        <svg
          width="720"
          height="420"
          viewBox="0 0 720 420"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Визуальная модель в нотации swimlane"
        >
          <rect x="0" y="0" width="720" height="420" fill="#4a5a6a" />
          <text x="120" y="30" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#ffffff">Отдел обслуживания</text>
          <text x="120" y="48" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#ffffff">клиентов</text>
          <text x="360" y="30" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#ffffff">Отдел продаж</text>
          <text x="600" y="30" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#ffffff">Склад</text>

          <line x1="240" y1="60" x2="240" y2="420" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="6 4" />
          <line x1="480" y1="60" x2="480" y2="420" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="6 4" />

          <circle cx="120" cy="100" r="12" fill="#ffffff" />
          <line x1="120" y1="112" x2="120" y2="130" stroke="#ffffff" strokeWidth="2" />
          <polygon points="115,128 120,138 125,128" fill="#ffffff" />

          <rect x="40" y="140" width="160" height="35" rx="4" fill="none" stroke="#ffffff" strokeWidth="1.8" />
          <text x="120" y="162" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#ffffff">Заказать товар</text>

          <line x1="120" y1="175" x2="120" y2="195" stroke="#ffffff" strokeWidth="2" />
          <line x1="60" y1="195" x2="200" y2="195" stroke="#ffffff" strokeWidth="3" />

          <line x1="200" y1="195" x2="280" y2="210" stroke="#ffffff" strokeWidth="1.8" />
          <polygon points="275,204 290,212 275,220" fill="#ffffff" />

          <rect x="290" y="195" width="160" height="35" rx="4" fill="none" stroke="#ffffff" strokeWidth="1.8" />
          <text x="370" y="217" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#ffffff">Обработать заказ</text>

          <line x1="450" y1="212" x2="520" y2="212" stroke="#ffffff" strokeWidth="1.8" />
          <polygon points="515,205 530,212 515,219" fill="#ffffff" />

          <rect x="530" y="195" width="160" height="35" rx="4" fill="none" stroke="#ffffff" strokeWidth="1.8" />
          <text x="610" y="217" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#ffffff">Подобрать товар</text>

          <line x1="610" y1="230" x2="610" y2="250" stroke="#ffffff" strokeWidth="1.8" />
          <polygon points="603,245 610,260 617,245" fill="#ffffff" />

          <rect x="530" y="260" width="160" height="35" rx="4" fill="none" stroke="#ffffff" strokeWidth="1.8" />
          <text x="610" y="282" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#ffffff">Отгрузить заказ</text>

          <line x1="530" y1="277" x2="370" y2="277" stroke="#ffffff" strokeWidth="1.8" />
          <polygon points="375,270 360,277 375,284" fill="#ffffff" />

          <line x1="370" y1="277" x2="370" y2="295" stroke="#ffffff" strokeWidth="1.8" />
          <polygon points="363,290 370,305 377,290" fill="#ffffff" />

          <line x1="370" y1="277" x2="120" y2="277" stroke="#ffffff" strokeWidth="1.8" />
          <line x1="120" y1="277" x2="120" y2="295" stroke="#ffffff" strokeWidth="1.8" />
          <polygon points="113,290 120,305 127,290" fill="#ffffff" />

          <rect x="40" y="295" width="160" height="35" rx="4" fill="none" stroke="#ffffff" strokeWidth="1.8" />
          <text x="120" y="317" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#ffffff">Получить заказ</text>

          <rect x="290" y="295" width="160" height="35" rx="4" fill="none" stroke="#ffffff" strokeWidth="1.8" />
          <text x="370" y="317" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#ffffff">Выставить счёт</text>

          <line x1="120" y1="330" x2="120" y2="345" stroke="#ffffff" strokeWidth="1.8" />
          <line x1="370" y1="330" x2="370" y2="345" stroke="#ffffff" strokeWidth="1.8" />
          <line x1="120" y1="345" x2="370" y2="345" stroke="#ffffff" strokeWidth="1.8" />
          <line x1="120" y1="345" x2="120" y2="360" stroke="#ffffff" strokeWidth="1.8" />
          <polygon points="113,355 120,370 127,355" fill="#ffffff" />

          <rect x="40" y="360" width="160" height="35" rx="4" fill="none" stroke="#ffffff" strokeWidth="1.8" />
          <text x="120" y="382" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#ffffff">Оплатить счёт</text>

          <line x1="200" y1="377" x2="290" y2="377" stroke="#ffffff" strokeWidth="1.8" />
          <polygon points="285,370 300,377 285,384" fill="#ffffff" />

          <rect x="300" y="360" width="140" height="35" rx="4" fill="none" stroke="#ffffff" strokeWidth="1.8" />
          <text x="370" y="382" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#ffffff">Закрыть заказ</text>

          <ellipse cx="370" cy="410" rx="15" ry="8" fill="none" stroke="#ffffff" strokeWidth="2" />
          <ellipse cx="370" cy="410" rx="4" ry="3" fill="#ffffff" />
        </svg>
        <div className="lecture4-diagram-caption">
          Рис. 3. Визуальная модель (диаграмма в нотации swimlane)
        </div>
      </div>

      {/* ==================== 3 ==================== */}
      <h2>3. Области проектирования ИС</h2>
      <p>Проектирование ИС охватывает три основные области:</p>
      <ul>
        <li>Проектирование объектов данных, которые будут реализованы в базе данных;</li>
        <li>
          Проектирование программ, экранных форм, отчётов, которые будут обеспечивать выполнение
          запросов к данным;
        </li>
        <li>
          Учёт конкретной среды или технологии: топологии сети, конфигурации аппаратных средств,
          используемой архитектуры (файл-сервер или клиент-сервер), параллельной обработки,
          распределённой обработки данных и т.п.
        </li>
      </ul>

      {/* ==================== 4 ==================== */}
      <h2>4. Этапы создания ИС</h2>
      <p>Обычно выделяют следующие этапы создания ИС:</p>
      <ol>
        <li>Формирование требований к системе;</li>
        <li>Проектирование;</li>
        <li>Реализация;</li>
        <li>Тестирование;</li>
        <li>Ввод в действие;</li>
        <li>Эксплуатация и сопровождение.</li>
      </ol>

      {/* ==================== 5 ==================== */}
      <h2>5. Модель создания ИС</h2>
      <p>
        В основе модели всегда лежат <strong>бизнес-цели предприятия</strong>, полностью
        определяющие состав всех базовых компонентов модели:
      </p>
      <ul>
        <li>
          <strong>бизнес-функции</strong>, описывающие, <em>ЧТО</em> делает бизнес;
        </li>
        <li>
          <strong>основные, вспомогательные и управленческие процессы</strong>, описывающие,{' '}
          <em>КАК</em> предприятие выполняет свои бизнес-функции;
        </li>
        <li>
          <strong>организационно-функциональную структуру</strong>, определяющую, <em>ГДЕ</em>{' '}
          исполняются бизнес-функции и бизнес-процессы;
        </li>
        <li>
          <strong>фазы</strong>, определяющие, <em>КОГДА</em> (и в какой последовательности)
          должны быть внедрены те или иные бизнес-функции;
        </li>
        <li>
          <strong>роли</strong>, определяющие, <em>КТО</em> исполняет бизнес-функции и кто
          является «хозяином» бизнес-процессов;
        </li>
        <li>
          <strong>правила</strong>, определяющие связь и взаимодействие между всеми{' '}
          <em>ЧТО, КАК, ГДЕ, КОГДА и КТО</em>.
        </li>
      </ul>

      <div className="lecture4-diagram-block">
        {/* SVG: Модель создания ИС */}
        <svg
          width="720"
          height="340"
          viewBox="0 0 720 340"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Модель создания ИС"
        >
          <rect x="20" y="20" width="160" height="180" rx="6" fill="#fdebd0" stroke="#b8860b" strokeWidth="1.8" />
          <text x="100" y="45" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">Миссия</text>
          <text x="100" y="62" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Концепция</text>
          <text x="100" y="78" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Стратегии</text>
          <text x="100" y="94" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Руководство</text>
          <text x="100" y="110" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Финансы</text>
          <text x="100" y="126" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Оборудование</text>
          <text x="100" y="142" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Персонал</text>

          <rect x="200" y="20" width="160" height="180" rx="6" fill="#d6eaf8" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="280" y="45" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">Цели</text>
          <text x="280" y="62" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Задачи</text>
          <text x="280" y="78" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Направления</text>
          <text x="280" y="94" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">и виды деятельности</text>
          <text x="280" y="110" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Политика</text>
          <text x="280" y="126" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Ответственность</text>
          <text x="280" y="142" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Методы, Ресурсы</text>

          <rect x="380" y="20" width="160" height="180" rx="6" fill="#d5f5e3" stroke="#1d7a3a" strokeWidth="1.8" />
          <text x="460" y="45" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">Процессная</text>
          <text x="460" y="62" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">область:</text>
          <text x="460" y="78" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">процессы</text>
          <text x="460" y="94" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">жизненного цикла</text>
          <text x="460" y="110" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Методы и средства</text>
          <text x="460" y="126" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">реализации</text>

          <rect x="560" y="20" width="140" height="180" rx="6" fill="#fadbd8" stroke="#a93226" strokeWidth="1.8" />
          <text x="630" y="45" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">Функционально-</text>
          <text x="630" y="62" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">процедурная</text>
          <text x="630" y="78" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">область:</text>
          <text x="630" y="94" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Функции</text>
          <text x="630" y="110" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Процедуры</text>
          <text x="630" y="126" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Стандарты</text>
          <text x="630" y="142" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Взаимодействие</text>
          <text x="630" y="158" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Контроль</text>

          <path d="M20,240 L700,240 L700,320 L20,320 Z" fill="#f4f6f7" stroke="#5d6d7e" strokeWidth="1.8" />
          <text x="360" y="265" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">Система качества: организационное построение, информационное обеспечение,</text>
          <text x="360" y="283" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">документационное сопровождение, методологическая реализация, аудит,</text>
          <text x="360" y="301" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">обучение персонала, непрерывное совершенствование</text>
        </svg>
        <div className="lecture4-diagram-caption">
          Рис. 4. Модель создания ИС
        </div>
      </div>

      {/* ==================== 6 ==================== */}
      <h2>6. Модель проектирования, реализации и внедрения ИС</h2>
      <div className="lecture4-diagram-block">
        {/* SVG: Модель 1-2-3 */}
        <svg
          width="720"
          height="240"
          viewBox="0 0 720 240"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Модель проектирования, реализации и внедрения ИС"
        >
          <path d="M20,40 L220,20 L220,220 L20,200 Z" fill="#e8e8e8" stroke="#5d6d7e" strokeWidth="1.8" />
          <text x="120" y="50" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">Бизнес-моделирование</text>
          <text x="120" y="80" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">План проекта</text>
          <text x="120" y="98" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Цели внедрения</text>
          <text x="120" y="116" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Обследование</text>
          <text x="120" y="134" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Обучение</text>
          <text x="120" y="152" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Референтная модель</text>
          <text x="120" y="170" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Проектное решение</text>
          <text x="120" y="210" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">Модель 1</text>

          <path d="M230,20 L430,30 L430,210 L230,220 Z" fill="#d6eaf8" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="330" y="45" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">Пилотное тестирование</text>
          <text x="330" y="90" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Контрольный пример</text>
          <text x="330" y="110" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Комиссия по приёмке</text>
          <text x="330" y="130" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Доводка системы</text>
          <text x="330" y="210" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">Модель 2</text>

          <path d="M440,30 L700,10 L700,220 L440,210 Z" fill="#d5f5e3" stroke="#1d7a3a" strokeWidth="1.8" />
          <text x="570" y="45" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">Развёртывание</text>
          <text x="570" y="80" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Система работает</text>
          <text x="570" y="98" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Конвертация</text>
          <text x="570" y="116" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Интерфейсы</text>
          <text x="570" y="134" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Обучение</text>
          <text x="570" y="152" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">пользователей</text>
          <text x="570" y="170" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Модель компании</text>
          <text x="570" y="210" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">Модель 3</text>
        </svg>
        <div className="lecture4-diagram-caption">
          Рис. 5. Модель проектирования, реализации и внедрения ИС
        </div>
      </div>

      {/* ==================== 7 ==================== */}
      <h2>7. Определение требований и системный анализ</h2>
      <p>
        Определение требований к системе и анализ являются первым этапом создания ИС, на котором
        требования заказчика уточняются, согласуются, формализуются и документируются. Фактически
        на этом этапе даётся ответ на вопрос: «Для чего предназначена и что должна делать
        информационная система?». Именно здесь лежит ключ к успеху всего проекта.
      </p>
      <p>
        <strong>Цель системного анализа</strong> — преобразование общих, расплывчатых знаний об
        исходной предметной области (требований заказчика) в точные определения и спецификации
        для разработчиков, а также генерация функционального описания системы. На этом этапе
        определяются и специфицируются:
      </p>
      <ul>
        <li>внешние и внутренние условия работы системы;</li>
        <li>функциональная структура системы;</li>
        <li>распределение функций между человеком и системой, интерфейсы;</li>
        <li>требования к техническим, информационным и программным компонентам системы;</li>
        <li>требования к качеству и безопасности;</li>
        <li>состав технической и пользовательской документации;</li>
        <li>условия внедрения и эксплуатации.</li>
      </ul>

      <h3>Стадии анализа</h3>
      <p>
        <strong>Первая стадия</strong> — структурный анализ предприятия — начинается с
        исследования того, как организована система управления предприятием, с обследования
        функциональной и информационной структур системы управления, определения существующих и
        возможных потребителей информации. По результатам обследования аналитик выстраивает
        обобщённую логическую модель исходной предметной области, отображающую её функциональную
        структуру, особенности основной деятельности и информационное пространство. На этом
        материале аналитик строит функциональную модель «Как есть» (As Is).
      </p>
      <p>
        <strong>Вторая стадия</strong> — анализ модели «Как есть», выявление её недостатков и
        узких мест, определение путей совершенствования системы управления на основе выделенных
        критериев качества. К работе привлекаются заинтересованные представители заказчика, а при
        необходимости и независимые эксперты.
      </p>
      <p>
        <strong>Третья стадия</strong> — создание усовершенствованной обобщённой логической
        модели, отображающей реорганизованную предметную область или её часть, которая подлежит
        автоматизации — модель «Как должно быть» (As To Be).
      </p>
      <p>
        <strong>Четвёртая стадия</strong> — разработка «Карты автоматизации», представляющей собой
        модель реорганизованной предметной области, на которой обязательно обозначены «границы
        автоматизации». В большинстве случаев модель «Как есть» улучшается системным аналитиком
        за счёт устранения очевидных несоответствий и узких мест, а полученный таким образом
        вариант модели рассматривается в дальнейшем в качестве предварительной модели «Как должно
        быть», которая впоследствии дополняется в соответствии со стратегией развития предприятия.
      </p>

      <div className="lecture4-diagram-block">
        {/* SVG: Стадии построения модели ИС */}
        <svg
          width="720"
          height="300"
          viewBox="0 0 720 300"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Стадии построения модели ИС"
        >
          <rect x="20" y="80" width="150" height="180" rx="6" fill="#fdebd0" stroke="#b8860b" strokeWidth="1.8" />
          <text x="95" y="105" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">Информационная</text>
          <text x="95" y="122" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">система управления</text>
          <text x="95" y="139" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">предприятием и</text>
          <text x="95" y="156" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">сопровождения</text>
          <text x="95" y="173" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">бизнес-процессов</text>

          <rect x="200" y="80" width="140" height="50" rx="4" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.8" />
          <text x="270" y="110" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Модель КАК ЕСТЬ</text>

          <rect x="200" y="150" width="140" height="50" rx="4" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.8" />
          <text x="270" y="180" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Промежуточная</text>
          <text x="270" y="195" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">модель 1</text>

          <rect x="200" y="220" width="140" height="50" rx="4" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.8" />
          <text x="270" y="250" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Промежуточная</text>
          <text x="270" y="265" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">модель М</text>

          <rect x="400" y="30" width="140" height="50" rx="4" fill="#aed6f1" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="470" y="60" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">Модель КАК БУДЕТ</text>

          <rect x="560" y="80" width="140" height="140" rx="4" fill="#d5f5e3" stroke="#1d7a3a" strokeWidth="1.8" />
          <text x="630" y="110" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">Модель на базе</text>
          <text x="630" y="128" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">выбранного</text>
          <text x="630" y="146" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">стандарта</text>
          <text x="630" y="164" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">ISO 9000</text>
          <text x="630" y="182" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">CMM</text>
          <text x="630" y="200" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">SPICE</text>

          <line x1="170" y1="105" x2="200" y2="105" stroke="#0b2a4a" strokeWidth="1.8" />
          <polygon points="195,98 210,105 195,112" fill="#0b2a4a" />
          <text x="185" y="100" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="9" fill="#4e6b8a">Практически не</text>
          <text x="185" y="112" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="9" fill="#4e6b8a">интегрирована</text>

          <line x1="170" y1="170" x2="200" y2="170" stroke="#0b2a4a" strokeWidth="1.8" />
          <polygon points="195,163 210,170 195,177" fill="#0b2a4a" />
          <text x="185" y="165" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="9" fill="#4e6b8a">Частично</text>
          <text x="185" y="177" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="9" fill="#4e6b8a">интегрирована</text>

          <line x1="170" y1="240" x2="200" y2="240" stroke="#0b2a4a" strokeWidth="1.8" />
          <polygon points="195,233 210,240 195,247" fill="#0b2a4a" />
          <text x="185" y="235" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="9" fill="#4e6b8a">Частично</text>
          <text x="185" y="247" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="9" fill="#4e6b8a">интегрирована</text>

          <line x1="340" y1="105" x2="400" y2="60" stroke="#0b2a4a" strokeWidth="1.8" />
          <polygon points="395,53 410,55 400,67" fill="#0b2a4a" />
          <text x="375" y="80" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="9" fill="#4e6b8a">Полностью</text>
          <text x="375" y="92" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="9" fill="#4e6b8a">интегрирована</text>

          <line x1="340" y1="175" x2="400" y2="175" stroke="#0b2a4a" strokeWidth="1.8" strokeDasharray="4 3" />
          <text x="370" y="170" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="9" fill="#4e6b8a">Частично</text>
          <text x="370" y="182" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="9" fill="#4e6b8a">соответствует</text>

          <line x1="340" y1="245" x2="400" y2="245" stroke="#0b2a4a" strokeWidth="1.8" strokeDasharray="4 3" />
          <text x="370" y="240" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="9" fill="#4e6b8a">Не</text>
          <text x="370" y="252" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="9" fill="#4e6b8a">соответствует</text>

          <line x1="540" y1="55" x2="560" y2="80" stroke="#0b2a4a" strokeWidth="1.8" strokeDasharray="4 3" />
          <text x="555" y="75" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="9" fill="#4e6b8a">Полное</text>
          <text x="555" y="87" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="9" fill="#4e6b8a">соответствие</text>
        </svg>
        <div className="lecture4-diagram-caption">
          Рис. 6. Стадии построения модели информационной системы
        </div>
      </div>

      {/* ==================== 8 ==================== */}
      <h2>8. Структурный анализ и методологии</h2>
      <p>
        <strong>Структурный анализ</strong> — метод исследования системы, которое начинается с её
        общего обзора, а затем детализируется, приобретая иерархическую структуру. Для таких
        методов характерно:
      </p>
      <ul>
        <li>разбиение на уровни абстракции с ограниченным числом элементов (от 3 до 7);</li>
        <li>ограниченный контекст, включающий только существенные детали каждого уровня;</li>
        <li>использование строгих формальных правил записи;</li>
        <li>последовательное приближение к результату.</li>
      </ul>
      <p>
        Структурный анализ основан на двух базовых принципах — <strong>«разделяй и властвуй»</strong>{' '}
        и <strong>принцип иерархической упорядоченности</strong>. Решение трудных проблем путём их
        разбиения на множество меньших независимых задач (так называемых «чёрных ящиков») и
        организация этих задач в древовидные иерархические структуры значительно повышают
        эффективность анализа.
      </p>

      <h3>Функциональные и объектные методики</h3>
      <p>
        <strong>Функциональные методики</strong>, наиболее известной из которых является методика
        IDEF, рассматривают организацию как набор функций, преобразующий поступающий поток
        информации в выходной поток. Процесс преобразования информации потребляет определённые
        ресурсы. Основное отличие от объектной методики заключается в чётком отделении функций
        (методов обработки данных) от самих данных.
      </p>
      <p>
        <strong>Объектные методики</strong> рассматривают моделируемую организацию как набор
        взаимодействующих объектов — производственных единиц. Объект определяется как осязаемая
        реальность — предмет или явление, имеющие чётко определяемое поведение. Целью применения
        данной методики является выделение объектов, составляющих организацию, и распределение
        между ними ответственностей за выполняемые действия.
      </p>

      <h3>Основные понятия</h3>
      <ul>
        <li>
          <strong>Операция</strong> — элементарное (неделимое) действие, выполняемое на одном
          рабочем месте.
        </li>
        <li>
          <strong>Функция</strong> — совокупность операций, сгруппированных по определённому
          признаку.
        </li>
        <li>
          <strong>Бизнес-процесс</strong> — связанная совокупность подпроцессов и/или
          бизнес-операций и/или бизнес-функций, в ходе выполнения которой потребляются
          определённые ресурсы и создаётся продукт, представляющий ценность для потребителя.
        </li>
        <li>
          <strong>Подпроцесс</strong> — бизнес-процесс, являющийся структурным элементом
          некоторого бизнес-процесса и представляющий ценность для потребителя.
        </li>
        <li>
          <strong>Бизнес-модель</strong> — структурированное графическое описание сети процессов и
          операций, связанных с данными, документами, организационными единицами и прочими
          объектами, отражающими существующую или предполагаемую деятельность предприятия.
        </li>
        <li>
          <strong>Нотация</strong> — совокупность графических объектов, используемых в модели.
          Нотации предназначены для описания структуры системы, элементов данных, этапов
          обработки и включают графы, диаграммы, таблицы, блок-схемы, формальные и естественные
          языки.
        </li>
      </ul>

      {/* ==================== 9 ==================== */}
      <h2>9. CASE-технологии и CASE-средства</h2>
      <p>
        <strong>CASE (Computer Aided Software Engineering) технологии</strong> — совокупность
        методов проектирования систем, а также набор инструментальных средств, позволяющих в
        наглядной форме моделировать предметную область, анализировать эту модель на всех стадиях
        разработки и сопровождения ИС и разрабатывать приложения в соответствии с информационными
        потребностями пользователей. CASE-технологии реализуются при помощи{' '}
        <strong>CASE-средств</strong>.
      </p>

      <div className="lecture4-diagram-block">
        {/* SVG: CASE-средства */}
        <svg
          width="720"
          height="320"
          viewBox="0 0 720 320"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Примеры CASE-средств"
        >
          <rect x="280" y="20" width="160" height="40" rx="4" fill="#fdebd0" stroke="#b8860b" strokeWidth="2" />
          <text x="360" y="45" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">CASE-средства</text>

          <line x1="360" y1="60" x2="360" y2="80" stroke="#0b2a4a" strokeWidth="1.8" />
          <line x1="120" y1="80" x2="600" y2="80" stroke="#0b2a4a" strokeWidth="1.8" />
          <line x1="120" y1="80" x2="120" y2="100" stroke="#0b2a4a" strokeWidth="1.8" />
          <line x1="360" y1="80" x2="360" y2="100" stroke="#0b2a4a" strokeWidth="1.8" />
          <line x1="600" y1="80" x2="600" y2="100" stroke="#0b2a4a" strokeWidth="1.8" />

          <rect x="20" y="100" width="200" height="40" rx="4" fill="#aed6f1" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="120" y="125" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">Анализ и проектирование</text>

          <rect x="260" y="100" width="200" height="40" rx="4" fill="#aed6f1" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="360" y="120" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">Проектирование баз</text>
          <text x="360" y="135" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">данных и файлов</text>

          <rect x="500" y="100" width="200" height="40" rx="4" fill="#aed6f1" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="600" y="125" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">Программирование</text>

          <text x="30" y="170" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">• AllFusion Process Modeler (BPWin)</text>
          <text x="30" y="190" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">• Design/IDEF</text>
          <text x="30" y="210" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">• ARIS</text>
          <text x="30" y="230" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">• IBM Rational Rose</text>
          <text x="30" y="250" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">• IBM WebSphere Business Modeler</text>

          <text x="270" y="170" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">• AllFusion ERWin Data Modeler</text>
          <text x="270" y="190" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">• Designer2000</text>
          <text x="270" y="210" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">• Silverrun</text>
          <text x="270" y="230" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">• Rational Rose</text>
          <text x="270" y="250" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">• Rational Software Architect</text>

          <text x="510" y="170" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">• COBOL 2/Workbench</text>
          <text x="510" y="190" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">• DECASE</text>
          <text x="510" y="210" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">• APS</text>
          <text x="510" y="230" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">• Rational Software Architect</text>
        </svg>
        <div className="lecture4-diagram-caption">
          Рис. 7. Примеры CASE-средств
        </div>
      </div>

      {/* ==================== 10 ==================== */}
      <h2>10. Стандарты IDEF</h2>
      <p>
        <strong>IDEF (Integrated Computer Aided Manufacturing DEFinition)</strong> — семейство
        стандартов, появившееся в 1981 г.
      </p>
      <ul>
        <li>
          <strong>IDEF0</strong> — методология функционального моделирования. Система отображается
          в виде набора взаимосвязанных функциональных блоков.
        </li>
        <li>
          <strong>IDEF1</strong> — методология моделирования информационных потоков внутри
          системы, позволяющая отображать и анализировать их структуру и взаимосвязи.
        </li>
        <li>
          <strong>IDEF1X (IDEF1 eXtended)</strong> — методология построения реляционных структур.
          Относится к типу методологий «Сущность-взаимосвязь» (ER — Entity-Relationship) и
          используется для моделирования реляционных баз данных в системе.
        </li>
        <li>
          <strong>IDEF3</strong> — методология документирования процессов. С помощью IDEF3
          описываются сценарий и последовательность операций для каждого процесса.
        </li>
        <li>
          <strong>IDEF4</strong> — методология построения объектно-ориентированных систем.
        </li>
      </ul>

      <h3>Основные принципы структурного моделирования</h3>
      <p>
        Сложность больших систем преодолевается расчленением их на части («чёрные ящики») и
        иерархической организацией этих «чёрных ящиков» в модели. На каждом уровне модели
        пользователю нет необходимости знать внутреннее устройство «чёрного ящика»,
        рассматриваются только его входы/выходы и реализуемая функция.
      </p>
      <p><strong>Критерии разбиения системы на «чёрные ящики»:</strong></p>
      <ul>
        <li>каждый «чёрный ящик» реализует единственную функцию системы;</li>
        <li>
          функция каждого «чёрного ящика» должна быть легко понимаема независимо от сложности её
          реализации;
        </li>
        <li>
          связи между «чёрными ящиками» вводятся только при наличии связи между соответствующими
          функциями системы;
        </li>
        <li>связи между «чёрными ящиками» должны быть максимально простыми.</li>
      </ul>

      <div className="lecture4-diagram-block">
        {/* SVG: Декомпозиция функциональных диаграмм IDEF0 */}
        <svg
          width="720"
          height="380"
          viewBox="0 0 720 380"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Декомпозиция функциональных диаграмм IDEF0"
        >
          <rect x="240" y="20" width="180" height="80" rx="4" fill="#f5b7b1" stroke="#a93226" strokeWidth="2" />
          <text x="330" y="55" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fontWeight="600" fill="#0b2a4a">Функция</text>
          <text x="330" y="80" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fontWeight="600" fill="#0b2a4a">A0</text>

          <line x1="270" y1="20" x2="270" y2="0" stroke="#a93226" strokeWidth="1.8" />
          <polygon points="266,5 270,-5 274,5" fill="#a93226" />
          <line x1="330" y1="20" x2="330" y2="0" stroke="#8e44ad" strokeWidth="1.8" />
          <polygon points="326,5 330,-5 334,5" fill="#8e44ad" />

          <line x1="240" y1="45" x2="200" y2="45" stroke="#2a6fdb" strokeWidth="1.8" />
          <polygon points="205,41 195,45 205,49" fill="#2a6fdb" />
          <line x1="240" y1="75" x2="200" y2="75" stroke="#1a7a3a" strokeWidth="1.8" />
          <polygon points="205,71 195,75 205,79" fill="#1a7a3a" />

          <line x1="420" y1="60" x2="480" y2="60" stroke="#0b2a4a" strokeWidth="1.8" />
          <polygon points="475,55 490,60 475,65" fill="#0b2a4a" />

          <text x="500" y="45" fontFamily="Segoe UI, Arial" fontSize="12" fill="#4e6b8a">Контекстная диаграмма определяет все</text>
          <text x="500" y="62" fontFamily="Segoe UI, Arial" fontSize="12" fill="#4e6b8a">функции, входы и выходы, которые могут</text>
          <text x="500" y="79" fontFamily="Segoe UI, Arial" fontSize="12" fill="#4e6b8a">появиться на диаграммах нижних уровней</text>

          <text x="500" y="130" fontFamily="Segoe UI, Arial" fontSize="14" fontWeight="700" fill="#a93226">IDEF0</text>

          <rect x="120" y="180" width="180" height="80" rx="4" fill="#f5b7b1" stroke="#a93226" strokeWidth="2" />
          <text x="210" y="215" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">Подфункция 1</text>
          <text x="210" y="240" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">A1</text>

          <line x1="150" y1="180" x2="150" y2="160" stroke="#8e44ad" strokeWidth="1.8" />
          <polygon points="146,165 150,155 154,165" fill="#8e44ad" />
          <line x1="120" y1="205" x2="80" y2="205" stroke="#1a7a3a" strokeWidth="1.8" />
          <polygon points="85,201 75,205 85,209" fill="#1a7a3a" />

          <line x1="300" y1="220" x2="360" y2="220" stroke="#0b2a4a" strokeWidth="1.8" />
          <text x="320" y="215" fontFamily="Segoe UI, Arial" fontSize="12" fill="#a93226">Выход</text>

          <rect x="360" y="180" width="180" height="80" rx="4" fill="#f5b7b1" stroke="#a93226" strokeWidth="2" />
          <text x="450" y="215" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">Подфункция 2</text>
          <text x="450" y="240" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">A2</text>

          <line x1="390" y1="180" x2="390" y2="160" stroke="#8e44ad" strokeWidth="1.8" />
          <polygon points="386,165 390,155 394,165" fill="#8e44ad" />
          <line x1="360" y1="220" x2="320" y2="220" stroke="#2a6fdb" strokeWidth="1.8" />
          <polygon points="325,216 315,220 325,224" fill="#2a6fdb" />

          <line x1="540" y1="220" x2="600" y2="220" stroke="#0b2a4a" strokeWidth="1.8" />
          <text x="560" y="215" fontFamily="Segoe UI, Arial" fontSize="12" fill="#a93226">Выход</text>

          <rect x="600" y="180" width="110" height="80" rx="4" fill="#f5b7b1" stroke="#a93226" strokeWidth="2" />
          <text x="655" y="215" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">Подфункция 3</text>
          <text x="655" y="240" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">A3</text>

          <line x1="630" y1="180" x2="630" y2="160" stroke="#8e44ad" strokeWidth="1.8" />
          <polygon points="626,165 630,155 634,165" fill="#8e44ad" />
          <line x1="600" y1="220" x2="540" y2="220" stroke="#2a6fdb" strokeWidth="1.8" />
          <polygon points="545,216 535,220 545,224" fill="#2a6fdb" />

          <line x1="300" y1="260" x2="300" y2="310" stroke="#0b2a4a" strokeWidth="1.8" />
          <line x1="300" y1="310" x2="655" y2="310" stroke="#0b2a4a" strokeWidth="1.8" />
          <line x1="655" y1="310" x2="655" y2="260" stroke="#0b2a4a" strokeWidth="1.8" />
          <polygon points="650,265 655,255 660,265" fill="#0b2a4a" />

          <text x="480" y="345" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#4e6b8a">Каждая подфункция может содержать</text>
          <text x="480" y="362" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#4e6b8a">только те элементы, которые входят в исходную функцию.</text>
        </svg>
        <div className="lecture4-diagram-caption">
          Рис. 8. Декомпозиция функциональных диаграмм (IDEF0)
        </div>
      </div>

      {/* ==================== 11 ==================== */}
      <h2>11. Модель потоков данных — диаграммы DFD</h2>
      <p>
        <strong>DFD (Data Flow Diagram)</strong> — диаграммы потоков данных, описывают
        асинхронный процесс преобразования информации.
      </p>

      <div className="lecture4-diagram-block">
        {/* SVG: DFD */}
        <svg
          width="720"
          height="200"
          viewBox="0 0 720 200"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Диаграмма потоков данных DFD"
        >
          <rect x="20" y="60" width="180" height="80" rx="4" fill="#f5b7b1" stroke="#a93226" strokeWidth="2" />
          <text x="110" y="100" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#0b2a4a">Внешний</text>
          <text x="110" y="120" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#0b2a4a">объект</text>

          <rect x="230" y="20" width="180" height="50" rx="4" fill="#ffffff" stroke="#0b2a4a" strokeWidth="1.8" />
          <text x="320" y="42" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Имя потока</text>
          <text x="320" y="58" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">данных</text>

          <line x1="200" y1="100" x2="440" y2="100" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="435,94 450,100 435,106" fill="#0b2a4a" />

          <rect x="450" y="40" width="220" height="120" rx="12" fill="#f5b7b1" stroke="#a93226" strokeWidth="2" />
          <text x="560" y="65" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Номер объекта</text>
          <line x1="450" y1="75" x2="670" y2="75" stroke="#a93226" strokeWidth="1.2" />
          <text x="560" y="95" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Наименование</text>
          <text x="560" y="112" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">объекта</text>
          <line x1="450" y1="122" x2="670" y2="122" stroke="#a93226" strokeWidth="1.2" />
          <text x="560" y="142" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Физическая</text>
          <text x="560" y="158" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">реализация</text>
        </svg>
        <div className="lecture4-diagram-caption">
          Рис. 9. Элементы диаграммы потоков данных (DFD)
        </div>
      </div>

      {/* ==================== 12 ==================== */}
      <h2>12. IDEF1X — модель данных</h2>
      <p>
        <strong>IDEF1X</strong> описывает структуры данных, связанных с различными объектами
        модели; документирует сущности процесса (их идентификаторы, атрибуты) и способы
        взаимодействия между ними.
      </p>

      <div className="lecture4-diagram-block">
        {/* SVG: IDEF1X */}
        <svg
          width="720"
          height="220"
          viewBox="0 0 720 220"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Модель данных IDEF1X"
        >
          <text x="360" y="25" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="16" fontWeight="700" fill="#0b2a4a">IDEF1X</text>

          <rect x="40" y="50" width="200" height="130" rx="4" fill="#aed6f1" stroke="#1d4e89" strokeWidth="2" />
          <text x="140" y="75" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">Автомашина</text>
          <line x1="40" y1="85" x2="240" y2="85" stroke="#1d4e89" strokeWidth="1.2" />
          <text x="55" y="105" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a"># Регистр. Номер</text>
          <text x="55" y="125" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a"># Идент. Номер</text>
          <text x="55" y="145" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">* Год</text>
          <text x="55" y="165" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">* Марка</text>

          <rect x="440" y="50" width="220" height="130" rx="4" fill="#aed6f1" stroke="#1d4e89" strokeWidth="2" />
          <text x="550" y="75" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">Полис</text>
          <line x1="440" y1="85" x2="660" y2="85" stroke="#1d4e89" strokeWidth="1.2" />
          <text x="455" y="105" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a"># Регистр. Номер</text>
          <text x="455" y="125" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">* Дата</text>
          <text x="455" y="145" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">* Сумма</text>
          <text x="455" y="165" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">* Модель</text>

          <line x1="240" y1="115" x2="440" y2="115" stroke="#0b2a4a" strokeWidth="2" />
          <text x="280" y="105" fontFamily="Segoe UI, Arial" fontSize="12" fill="#a93226">Один</text>
          <text x="360" y="105" fontFamily="Segoe UI, Arial" fontSize="12" fill="#a93226">*</text>
          <text x="400" y="105" fontFamily="Segoe UI, Arial" fontSize="12" fill="#a93226">Много</text>
        </svg>
        <div className="lecture4-diagram-caption">
          Рис. 10. Модель данных IDEF1X (пример «Автомашина — Полис»)
        </div>
      </div>

      {/* ==================== 13 ==================== */}
      <h2>13. Унифицированный язык визуального моделирования UML</h2>
      <p>
        <strong>UML (Unified Modeling Language)</strong> — стандарт, принятый консорциумом{' '}
        <strong>Object Managing Group (OMG)</strong> в 1997 г. Описывает статические аспекты
        поведения системы.
      </p>
      <p><strong>Концептуальная модель UML включает:</strong></p>
      <ul>
        <li>
          <strong>сущности</strong> — структурные, поведенческие, группирующие, аннотационные;
        </li>
        <li>
          <strong>отношения</strong> — зависимость, ассоциация, обобщение, реализация;
        </li>
        <li>
          <strong>диаграммы</strong> — классов, объектов, прецедентов, последовательностей,
          кооперации, состояний, действий, компонентов, развёртывания.
        </li>
      </ul>
      <p>
        <strong>Диаграмма в UML</strong> — это графическое представление набора элементов в виде
        связанного графа с вершинами (сущностями) и рёбрами (отношениями).
      </p>

      <h3>Разработка модели бизнес-прецедентов</h3>
      <p>
        Пример: общая диаграмма деятельности медицинского центра по обслуживанию пациента
        включает актёров: Пациент, Врач, Технический персонал, Юрист, Страховая компания,
        Брокер данных, Правительственное учреждение, Производитель мед. оборудования, Внешнее
        мед. учреждение. Основной прецедент — «Обслуживание пациента».
      </p>

      <div className="lecture4-diagram-block">
        {/* SVG: Диаграмма прецедентов */}
        <svg
          width="720"
          height="420"
          viewBox="0 0 720 420"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Диаграмма прецедентов медицинского центра"
        >
          <ellipse cx="360" cy="210" rx="110" ry="40" fill="#fdebd0" stroke="#b8860b" strokeWidth="2" />
          <text x="360" y="215" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">Обслуживание пациента</text>

          <circle cx="120" cy="60" r="14" fill="none" stroke="#1d4e89" strokeWidth="2" />
          <line x1="120" y1="74" x2="120" y2="100" stroke="#1d4e89" strokeWidth="2" />
          <line x1="100" y1="84" x2="140" y2="84" stroke="#1d4e89" strokeWidth="2" />
          <line x1="120" y1="100" x2="105" y2="125" stroke="#1d4e89" strokeWidth="2" />
          <line x1="120" y1="100" x2="135" y2="125" stroke="#1d4e89" strokeWidth="2" />
          <text x="120" y="145" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Пациент</text>

          <circle cx="360" cy="60" r="14" fill="none" stroke="#1d4e89" strokeWidth="2" />
          <line x1="360" y1="74" x2="360" y2="100" stroke="#1d4e89" strokeWidth="2" />
          <line x1="340" y1="84" x2="380" y2="84" stroke="#1d4e89" strokeWidth="2" />
          <line x1="360" y1="100" x2="345" y2="125" stroke="#1d4e89" strokeWidth="2" />
          <line x1="360" y1="100" x2="375" y2="125" stroke="#1d4e89" strokeWidth="2" />
          <text x="360" y="145" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Врач</text>

          <circle cx="600" cy="60" r="14" fill="none" stroke="#1d4e89" strokeWidth="2" />
          <line x1="600" y1="74" x2="600" y2="100" stroke="#1d4e89" strokeWidth="2" />
          <line x1="580" y1="84" x2="620" y2="84" stroke="#1d4e89" strokeWidth="2" />
          <line x1="600" y1="100" x2="585" y2="125" stroke="#1d4e89" strokeWidth="2" />
          <line x1="600" y1="100" x2="615" y2="125" stroke="#1d4e89" strokeWidth="2" />
          <text x="600" y="145" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Технический персонал</text>

          <circle cx="120" cy="360" r="14" fill="none" stroke="#1d4e89" strokeWidth="2" />
          <line x1="120" y1="374" x2="120" y2="400" stroke="#1d4e89" strokeWidth="2" />
          <line x1="100" y1="384" x2="140" y2="384" stroke="#1d4e89" strokeWidth="2" />
          <line x1="120" y1="400" x2="105" y2="420" stroke="#1d4e89" strokeWidth="2" />
          <line x1="120" y1="400" x2="135" y2="420" stroke="#1d4e89" strokeWidth="2" />
          <text x="120" y="440" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Правительственное учреждение</text>

          <circle cx="360" cy="360" r="14" fill="none" stroke="#1d4e89" strokeWidth="2" />
          <line x1="360" y1="374" x2="360" y2="400" stroke="#1d4e89" strokeWidth="2" />
          <line x1="340" y1="384" x2="380" y2="384" stroke="#1d4e89" strokeWidth="2" />
          <line x1="360" y1="400" x2="345" y2="420" stroke="#1d4e89" strokeWidth="2" />
          <line x1="360" y1="400" x2="375" y2="420" stroke="#1d4e89" strokeWidth="2" />
          <text x="360" y="440" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Производитель мед. оборудования</text>

          <circle cx="600" cy="360" r="14" fill="none" stroke="#1d4e89" strokeWidth="2" />
          <line x1="600" y1="374" x2="600" y2="400" stroke="#1d4e89" strokeWidth="2" />
          <line x1="580" y1="384" x2="620" y2="384" stroke="#1d4e89" strokeWidth="2" />
          <line x1="600" y1="400" x2="585" y2="420" stroke="#1d4e89" strokeWidth="2" />
          <line x1="600" y1="400" x2="615" y2="420" stroke="#1d4e89" strokeWidth="2" />
          <text x="600" y="440" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Внешнее мед. учреждение</text>

          <line x1="130" y1="130" x2="280" y2="195" stroke="#0b2a4a" strokeWidth="1.5" />
          <polygon points="275,190 285,198 272,203" fill="#0b2a4a" />
          <line x1="360" y1="130" x2="360" y2="170" stroke="#0b2a4a" strokeWidth="1.5" />
          <polygon points="354,165 360,175 366,165" fill="#0b2a4a" />
          <line x1="590" y1="130" x2="440" y2="195" stroke="#0b2a4a" strokeWidth="1.5" />
          <polygon points="445,190 435,198 448,203" fill="#0b2a4a" />
          <line x1="130" y1="360" x2="280" y2="240" stroke="#0b2a4a" strokeWidth="1.5" />
          <polygon points="275,238 285,245 272,252" fill="#0b2a4a" />
          <line x1="360" y1="360" x2="360" y2="250" stroke="#0b2a4a" strokeWidth="1.5" />
          <polygon points="354,255 360,245 366,255" fill="#0b2a4a" />
          <line x1="590" y1="360" x2="440" y2="240" stroke="#0b2a4a" strokeWidth="1.5" />
          <polygon points="445,238 435,245 448,252" fill="#0b2a4a" />
        </svg>
        <div className="lecture4-diagram-caption">
          Рис. 11. Диаграмма бизнес-прецедентов (обслуживание пациента)
        </div>
      </div>

      {/* ==================== 14 ==================== */}
      <h2>14. Диаграмма последовательностей</h2>
      <p>
        Пример: диаграмма последовательностей для прецедента «Ответ на запрос». Участники:
        Отправитель запроса, Персонал центра, Клинические записи. Сообщения: отправить запрос,
        получить, предоставить ответ, внести изменения, вернуть записи.
      </p>

      <div className="lecture4-diagram-block">
        {/* SVG: Диаграмма последовательностей */}
        <svg
          width="720"
          height="300"
          viewBox="0 0 720 300"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Диаграмма последовательностей"
        >
          <rect x="20" y="20" width="180" height="40" rx="4" fill="#fdebd0" stroke="#b8860b" strokeWidth="1.8" />
          <text x="110" y="45" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Отправитель запроса</text>

          <rect x="260" y="20" width="180" height="40" rx="4" fill="#fdebd0" stroke="#b8860b" strokeWidth="1.8" />
          <text x="350" y="45" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Персонал центра</text>

          <rect x="500" y="20" width="180" height="40" rx="4" fill="#fdebd0" stroke="#b8860b" strokeWidth="1.8" />
          <text x="590" y="45" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Клинические записи</text>

          <line x1="110" y1="60" x2="110" y2="290" stroke="#0b2a4a" strokeWidth="1.8" strokeDasharray="4 3" />
          <line x1="350" y1="60" x2="350" y2="290" stroke="#0b2a4a" strokeWidth="1.8" strokeDasharray="4 3" />
          <line x1="590" y1="60" x2="590" y2="290" stroke="#0b2a4a" strokeWidth="1.8" strokeDasharray="4 3" />

          <line x1="110" y1="90" x2="340" y2="90" stroke="#0b2a4a" strokeWidth="1.8" />
          <polygon points="335,84 350,90 335,96" fill="#0b2a4a" />
          <text x="220" y="105" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">отправить запрос</text>

          <line x1="350" y1="130" x2="580" y2="130" stroke="#0b2a4a" strokeWidth="1.8" />
          <polygon points="575,124 590,130 575,136" fill="#0b2a4a" />
          <text x="470" y="145" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">получить</text>

          <line x1="350" y1="170" x2="120" y2="170" stroke="#0b2a4a" strokeWidth="1.8" />
          <polygon points="125,164 110,170 125,176" fill="#0b2a4a" />
          <text x="220" y="185" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">предоставить ответ</text>

          <line x1="110" y1="210" x2="340" y2="210" stroke="#0b2a4a" strokeWidth="1.8" />
          <polygon points="335,204 350,210 335,216" fill="#0b2a4a" />
          <text x="220" y="225" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Внести изменения</text>

          <line x1="350" y1="250" x2="580" y2="250" stroke="#0b2a4a" strokeWidth="1.8" />
          <polygon points="575,244 590,250 575,256" fill="#0b2a4a" />
          <text x="470" y="265" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">вернуть записи</text>
        </svg>
        <div className="lecture4-diagram-caption">
          Рис. 12. Диаграмма последовательностей для прецедента «Ответ на запрос»
        </div>
      </div>

      {/* ==================== 15 ==================== */}
      <h2>15. Разработка концептуальной модели данных</h2>
      <p>
        Концептуальная модель данных строится на основе анализа предметной области и включает
        сущности, их атрибуты и связи между ними. Пример (медицинские клинические записи):
      </p>
      <ul>
        <li><strong>КлиническиеЗаписи</strong> — центральная сущность;</li>
        <li><strong>РезультатыАнализов</strong> — агрегация;</li>
        <li><strong>ПредписанияВрача</strong> — агрегация;</li>
        <li><strong>Архив</strong> — агрегация;</li>
        <li><strong>ХодЛечения</strong> — обобщение;</li>
        <li><strong>МинНаборДанных</strong> — обобщение;</li>
        <li><strong>ПланЛечения</strong> — обобщение;</li>
        <li><strong>ВнешниеЗаписи</strong> — обобщение;</li>
        <li><strong>НовыеВнутренниеЗаписи</strong> — обобщение;</li>
        <li><strong>СтарыеВнутренниеЗаписи</strong> — обобщение.</li>
      </ul>

      <div className="lecture4-diagram-block">
        {/* SVG: Концептуальная модель данных */}
        <svg
          width="720"
          height="380"
          viewBox="0 0 720 380"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Концептуальная модель данных"
        >
          <rect x="280" y="160" width="200" height="50" rx="4" fill="#85c1e9" stroke="#1d4e89" strokeWidth="2" />
          <text x="380" y="190" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">Клинические записи</text>

          <rect x="220" y="20" width="180" height="40" rx="4" fill="#85c1e9" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="310" y="45" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Результаты анализов</text>

          <rect x="460" y="20" width="180" height="40" rx="4" fill="#85c1e9" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="550" y="45" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Предписания врача</text>

          <rect x="20" y="90" width="180" height="40" rx="4" fill="#85c1e9" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="110" y="115" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">МинНаборДанных</text>

          <rect x="20" y="160" width="180" height="40" rx="4" fill="#85c1e9" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="110" y="185" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">ПланЛечения</text>

          <rect x="20" y="230" width="180" height="40" rx="4" fill="#85c1e9" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="110" y="255" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">ХодЛечения</text>

          <rect x="460" y="160" width="180" height="40" rx="4" fill="#85c1e9" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="550" y="185" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Архив</text>

          <rect x="240" y="280" width="180" height="40" rx="4" fill="#85c1e9" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="330" y="305" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">ВнешниеЗаписи</text>

          <rect x="440" y="280" width="180" height="40" rx="4" fill="#85c1e9" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="530" y="305" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">СтарыеВнутренниеЗаписи</text>

          <rect x="240" y="340" width="200" height="40" rx="4" fill="#85c1e9" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="340" y="365" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">НовыеВнутренниеЗаписи</text>

          <line x1="310" y1="60" x2="360" y2="160" stroke="#0b2a4a" strokeWidth="1.5" />
          <polygon points="355,155 365,162 353,168" fill="#0b2a4a" />
          <text x="300" y="120" fontFamily="Segoe UI, Arial" fontSize="10" fill="#4e6b8a">0..n</text>

          <line x1="550" y1="60" x2="440" y2="160" stroke="#0b2a4a" strokeWidth="1.5" />
          <polygon points="443,155 435,163 446,168" fill="#0b2a4a" />
          <text x="520" y="120" fontFamily="Segoe UI, Arial" fontSize="10" fill="#4e6b8a">1..1</text>

          <line x1="110" y1="130" x2="310" y2="160" stroke="#0b2a4a" strokeWidth="1.5" />
          <polygon points="305,155 318,162 306,168" fill="#0b2a4a" />

          <line x1="110" y1="200" x2="280" y2="185" stroke="#0b2a4a" strokeWidth="1.5" />
          <polygon points="277,180 288,186 277,192" fill="#0b2a4a" />

          <line x1="110" y1="250" x2="280" y2="195" stroke="#0b2a4a" strokeWidth="1.5" />
          <polygon points="277,190 288,196 277,202" fill="#0b2a4a" />

          <line x1="550" y1="180" x2="480" y2="185" stroke="#0b2a4a" strokeWidth="1.5" />
          <polygon points="483,180 472,186 483,192" fill="#0b2a4a" />

          <line x1="330" y1="280" x2="360" y2="210" stroke="#0b2a4a" strokeWidth="1.5" />
          <polygon points="355,213 366,207 355,201" fill="#0b2a4a" />

          <line x1="530" y1="280" x2="440" y2="210" stroke="#0b2a4a" strokeWidth="1.5" />
          <polygon points="443,213 432,207 443,201" fill="#0b2a4a" />

          <line x1="340" y1="340" x2="380" y2="210" stroke="#0b2a4a" strokeWidth="1.5" />
          <polygon points="375,213 385,207 374,201" fill="#0b2a4a" />

          <text x="400" y="240" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fontWeight="700" fill="#a93226">Агрегация</text>
          <text x="400" y="335" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fontWeight="700" fill="#a93226">Обобщение</text>
        </svg>
        <div className="lecture4-diagram-caption">
          Рис. 13. Концептуальная модель данных (клинические записи)
        </div>
      </div>

      {/* ==================== ЗАКЛЮЧЕНИЕ ==================== */}
      <div className="lecture4-note">
        <strong>Вывод:</strong> Моделирование — ключевой этап проектирования ИС. Модели «как есть»
        и «как должно быть» позволяют выявить узкие места и оптимизировать предметную область.
        Функциональные, событийные и визуальные модели описывают систему с разных сторон.
        Структурный анализ, CASE-технологии, стандарты IDEF, DFD, IDEF1X и UML образуют
        методологическую основу проектирования современных информационных систем.
      </div>

     
    </div>
  );
};

export default Lecture4;