// Lecture1.tsx
// import React, { useState, FormEvent } from 'react';



const Lecture1: React.FC = () => {
 

  return (
    <div className="lecture1-container">
      <h1>Тема 1. Основные виды и процедуры обработки информации, модели и методы решения задач обработки информации</h1>

      {/* ==================== 1 ==================== */}
      <h2>1. Понятие об информации</h2>
      <p>
        <strong>Информация</strong> — это сведения и знания, являющиеся объектом хранения,
        преобразования, передачи и помогающие решить поставленную задачу.
      </p>
      <p>
        Термин «информация» используется во многих сферах человеческой деятельности. Он
        происходит от латинского слова <em>information</em>, что означает «сведения, разъяснения,
        изложение».
      </p>

      <div className="lecture1-diagram-block">
        {/* SVG: Виды информационных процессов */}
        <svg
          width="620"
          height="320"
          viewBox="0 0 620 320"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Виды информационных процессов"
        >
          <rect x="10" y="10" width="600" height="300" rx="12" fill="#fdf6ec" stroke="#b8860b" strokeWidth="2" />
          <text x="310" y="40" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="16" fontWeight="600" fill="#0b2a4a">ВИДЫ ИНФОРМАЦИОННЫХ ПРОЦЕССОВ</text>

          <rect x="40" y="60" width="540" height="40" rx="8" fill="#e8f4fd" stroke="#1d4e89" strokeWidth="2" />
          <text x="310" y="86" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fontWeight="600" fill="#0b2a4a">ИНФОРМАЦИОННЫЕ ПРОЦЕССЫ</text>

          <rect x="40" y="120" width="150" height="40" rx="6" fill="#fef9e7" stroke="#b8860b" strokeWidth="1.8" />
          <text x="115" y="145" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#0b2a4a">ОБРАБОТКА</text>

          <rect x="235" y="120" width="150" height="40" rx="6" fill="#fef9e7" stroke="#b8860b" strokeWidth="1.8" />
          <text x="310" y="140" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">ПЕРЕДАЧА</text>
          <text x="310" y="155" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="10" fill="#4e6b8a">(ИСТОЧНИК–КАНАЛ–ПРИЁМНИК)</text>

          <rect x="430" y="120" width="150" height="40" rx="6" fill="#fef9e7" stroke="#b8860b" strokeWidth="1.8" />
          <text x="505" y="145" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#0b2a4a">ХРАНЕНИЕ</text>

          <rect x="40" y="185" width="150" height="100" rx="6" fill="#f4f0fa" stroke="#7b5ea7" strokeWidth="1.5" />
          <text x="115" y="210" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">ПОИСК И ОТБОР</text>
          <text x="115" y="230" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">ПОЛУЧЕНИЕ НОВОЙ</text>
          <text x="115" y="245" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">ИНФОРМАЦИИ</text>
          <text x="115" y="265" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">СТРУКТУРИРОВАНИЕ</text>
          <text x="115" y="280" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">КОДИРОВАНИЕ</text>

          <rect x="430" y="185" width="150" height="100" rx="6" fill="#f4f0fa" stroke="#7b5ea7" strokeWidth="1.5" />
          <text x="505" y="210" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">РАЗМЕЩЕНИЕ</text>
          <text x="505" y="230" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">(НАКОПЛЕНИЕ)</text>
          <text x="505" y="255" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">КОРРЕКЦИЯ</text>
          <text x="505" y="275" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">ДОСТУП</text>

          <rect x="40" y="295" width="540" height="0" fill="none" />
          <text x="310" y="305" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">ИСПОЛЬЗОВАНИЕ ИНФОРМАЦИИ ДЛЯ ПРИНЯТИЯ РЕШЕНИЙ</text>
        </svg>
        <div className="lecture1-diagram-caption">
          Рис. 1. Виды информационных процессов
        </div>
      </div>

      {/* ==================== 2 ==================== */}
      <h2>2. Основные понятия информации</h2>
      <ul>
        <li>
          <strong>Информация, предназначенная передаче</strong>, называется <strong>сообщением</strong>.
          Сообщение может быть представлено в виде знаков и символов, преобразовано и закодировано
          в определённую последовательность электрических сигналов.
        </li>
        <li>
          <strong>Информация, представленная в виде, пригодном для обработки людьми или компьютером</strong>,
          называется <strong>данными</strong>. Всего имеют дело с тремя типами данных: числовыми,
          текстовыми и графическими.
        </li>
      </ul>

      <div className="lecture1-diagram-block">
        {/* SVG: Источник - канал - получатель */}
        <svg
          width="620"
          height="150"
          viewBox="0 0 620 150"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Источник, канал обмена информацией, получатель"
        >
          <ellipse cx="90" cy="75" rx="70" ry="45" fill="#7ec8e3" stroke="#1d4e89" strokeWidth="2" />
          <text x="90" y="145" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fill="#0b2a4a">Источник информации</text>

          <rect x="200" y="50" width="220" height="50" rx="6" fill="#f5e6c8" stroke="#b8860b" strokeWidth="1.8" />
          <text x="310" y="70" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#0b2a4a">Канал обмена</text>
          <text x="310" y="88" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#0b2a4a">информацией</text>

          <line x1="160" y1="75" x2="200" y2="75" stroke="#c0392b" strokeWidth="2.5" />
          <polygon points="200,68 215,75 200,82" fill="#c0392b" />
          <line x1="420" y1="75" x2="460" y2="75" stroke="#c0392b" strokeWidth="2.5" />
          <polygon points="460,68 475,75 460,82" fill="#c0392b" />

          <ellipse cx="530" cy="75" rx="70" ry="45" fill="#3aa8c1" stroke="#1d4e89" strokeWidth="2" />
          <text x="530" y="145" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fill="#0b2a4a">Получатель информации</text>
        </svg>
        <div className="lecture1-diagram-caption">
          Рис. 2. Передача информации от источника к получателю
        </div>
      </div>

      <ul>
        <li>
          <strong>Источник информации</strong> — элемент окружающего мира (объект, процесс,
          явление, событие), сведения о котором являются объектом преобразования.
        </li>
        <li>
          <strong>Потребитель информации</strong> — тот элемент окружающего мира, который
          использует информацию.
        </li>
        <li>
          <strong>Сигнал</strong> — материальный носитель, который фиксирует информацию для
          переноса её от источника к потребителю.
        </li>
      </ul>

      {/* ==================== 3 ==================== */}
      <h2>3. Различные аспекты информации</h2>
      <table className="lecture1-table">
        <thead>
          <tr>
            <th>Аспект</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Синтаксический</strong></td>
            <td>Человек наблюдает некоторый факт действительности в виде определённого набора данных вне зависимости от их смысловых и потребительских качеств.</td>
          </tr>
          <tr>
            <td><strong>Семантический</strong></td>
            <td>Путём сопоставления полученных данных с тезаурусом — полным систематизированным набором данных и знаний в какой-либо области — формируется знание о наблюдаемом факте.</td>
          </tr>
          <tr>
            <td><strong>Прагматический</strong></td>
            <td>На основании полученных знаний человек оценивает практическую полезность информации для достижения поставленных целей.</td>
          </tr>
        </tbody>
      </table>

      {/* ==================== 4 ==================== */}
      <h2>4. Свойства информации</h2>
      <ol>
        <li>
          <strong>Полнота</strong> — характеризует степень достаточности данных для принятия
          решения или создания новых данных на основе имеющихся. Неполный набор данных оставляет
          большую долю неопределённости. Избыточный набор данных затрудняет доступ к нужным
          данным, создаёт повышенный информационный шум.
        </li>
        <li>
          <strong>Достоверность</strong> — свойство, характеризующее степень соответствия
          информации реальному объекту с необходимой точностью. При работе с неполным набором
          данных достоверность может характеризоваться вероятностью.
        </li>
        <li>
          <strong>Доступность</strong> — возможность получения информации при необходимости.
          Складывается из доступности данных и доступности методов. Отсутствие хотя бы одного
          даёт неадекватную информацию.
        </li>
        <li>
          <strong>Актуальность</strong> — характеризует способность информации сохранять
          ценность для потребителя в течение времени, то есть не устаревать. Устаревшая информация
          неактуальна.
        </li>
      </ol>

      {/* ==================== 5 ==================== */}
      <h2>5. Данные и информация</h2>
      <p>
        <strong>Данные</strong> являются составной частью информации, представляющие собой
        зарегистрированные сигналы. Это результаты наблюдений над объектами и явлениями, которые
        не используются, а только хранятся.
      </p>
      <div className="lecture1-highlight">
        <strong>Пример:</strong> 251299 — данные; 251299 — телефон кафедры — информация.
      </div>

      {/* ==================== 6 ==================== */}
      <h2>6. Обработка информации</h2>
      <p>
        Обработка информации производится каким-либо субъектом или объектом (например, человеком
        или компьютером) в соответствии с определёнными правилами. Будем его называть{' '}
        <strong>исполнителем обработки информации</strong>. Информация, которая подвергается
        обработке, представляется в виде <strong>исходных данных</strong>.
      </p>

      <div className="lecture1-diagram-block">
        {/* SVG: Модель обработки информации */}
        <svg
          width="620"
          height="220"
          viewBox="0 0 620 220"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Модель обработки информации"
        >
          <polygon points="40,60 170,60 170,110 40,110 20,85" fill="#fdebd0" stroke="#b8860b" strokeWidth="1.8" />
          <text x="100" y="90" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#0b2a4a">Исходные данные</text>

          <polygon points="40,130 170,130 170,180 40,180 20,155" fill="#aed6f1" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="100" y="160" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#0b2a4a">Правила обработки</text>

          <rect x="250" y="60" width="160" height="120" rx="8" fill="#a9dfbf" stroke="#1d7a3a" strokeWidth="2" />
          <text x="330" y="115" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="15" fontWeight="600" fill="#0b2a4a">Исполнитель</text>
          <text x="330" y="140" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="15" fontWeight="600" fill="#0b2a4a">обработки</text>

          <line x1="170" y1="85" x2="250" y2="100" stroke="#b8860b" strokeWidth="2" />
          <polygon points="245,93 255,100 245,107" fill="#b8860b" />

          <line x1="170" y1="155" x2="250" y2="140" stroke="#1d4e89" strokeWidth="2" />
          <polygon points="245,133 255,140 245,147" fill="#1d4e89" />

          <line x1="410" y1="120" x2="490" y2="120" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="485,113 500,120 485,127" fill="#0b2a4a" />

          <rect x="500" y="95" width="100" height="50" rx="6" fill="#f9e79f" stroke="#b8860b" strokeWidth="1.8" />
          <text x="550" y="125" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#0b2a4a">Результат</text>
        </svg>
        <div className="lecture1-diagram-caption">
          Рис. 3. Модель обработки информации
        </div>
      </div>

      <p>
        <strong>Обработка информации</strong> — процесс изменения вида или формы, смысла
        (содержания), объёма (количества) информации. Это решение некоторой информационной задачи.
      </p>

      <div className="lecture1-diagram-block">
        {/* SVG: Общая схема обработки информации */}
        <svg
          width="620"
          height="140"
          viewBox="0 0 620 140"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Общая схема обработки информации"
        >
          <polygon points="30,40 160,30 160,110 30,120" fill="#a9cce3" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="95" y="70" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#0b2a4a">Входная</text>
          <text x="95" y="90" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#0b2a4a">информация</text>

          <line x1="160" y1="75" x2="230" y2="75" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="225,68 240,75 225,82" fill="#0b2a4a" />

          <rect x="240" y="45" width="140" height="60" rx="6" fill="#d5dbdb" stroke="#5d6d7e" strokeWidth="1.8" />
          <text x="310" y="70" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#0b2a4a">Преобразователь</text>
          <text x="310" y="90" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#0b2a4a">информации</text>

          <line x1="380" y1="75" x2="450" y2="75" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="445,68 460,75 445,82" fill="#0b2a4a" />

          <rect x="460" y="35" width="140" height="80" rx="20" fill="#a9cce3" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="530" y="70" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#0b2a4a">Выходная</text>
          <text x="530" y="90" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#0b2a4a">информация</text>
        </svg>
        <div className="lecture1-diagram-caption">
          Рис. 4. Общая схема обработки информации
        </div>
      </div>

      {/* ==================== 7 ==================== */}
      <h2>7. Операции над данными</h2>
      <p>Обработка данных включает в себя множество различных операций:</p>
      <ol>
        <li><strong>Сбор данных</strong> — накопление информации.</li>
        <li><strong>Формализация данных</strong> — приведение данных, поступающих из различных источников, к единой форме.</li>
        <li><strong>Фильтрация данных</strong> — отсеивание или устранение «лишних» данных, в которых нет необходимости.</li>
        <li><strong>Сортировка данных</strong> — упорядочение данных по заданному признаку с целью удобства использования.</li>
        <li><strong>Архивация данных</strong> — организация хранения данных в удобной форме.</li>
        <li><strong>Защита данных</strong> — комплекс мер, направленных на предотвращение потерь.</li>
        <li><strong>Преобразование данных</strong> — перевод данных из одной формы в другую (изменение типа носителя).</li>
        <li><strong>Транспортировка данных</strong> — приём и передача данных (сервер-клиент).</li>
      </ol>

      {/* ==================== 8 ==================== */}
      <h2>8. Способы обработки информации</h2>
      <ul>
        <li><strong>Неавтоматизированный</strong> — обработка информации человеком вручную.</li>
        <li><strong>Автоматизированный</strong> — обработка информации с использованием технических средств и программного обеспечения.</li>
      </ul>

      {/* ==================== 9 ==================== */}
      <h2>9. Обработка данных: ключевые понятия</h2>
      <ul>
        <li>
          <strong>Обработка</strong> — преобразование объектов обработки, которое придаёт им новые,
          необходимые свойства. Это преобразование осуществляется в форме процесса, протекающего во
          времени.
        </li>
        <li>
          <strong>Технология</strong> — система взаимосвязанных способов обработки материалов и
          приёмов изготовления продукции в производственном процессе.
        </li>
        <li>
          <strong>Информационная технология</strong> — совокупность методов, способов, приёмов и
          средств обработки документированной информации, включая прикладные программные средства,
          и регламентированного порядка их применения.
        </li>
        <li>
          <strong>Алгоритм</strong> — точное, сформулированное на определённом языке, конечное
          описание того или иного общего метода, основанного на применении исполнимых элементарных
          тактов обработки.
        </li>
      </ul>

      <h3>Виды обработки</h3>
      <ul>
        <li>Последовательная</li>
        <li>Параллельная</li>
      </ul>

      <h3>Формальные модели обработки данных</h3>
      <ul>
        <li>Конечные автоматы</li>
        <li>Сети Петри</li>
        <li>Процессы Хоара</li>
        <li>Системы и сети массового обслуживания и др.</li>
      </ul>

      <div className="lecture1-diagram-block">
        {/* SVG: Конечный автомат */}
        <svg
          width="620"
          height="180"
          viewBox="0 0 620 180"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Конечный автомат"
        >
          <rect x="20" y="20" width="580" height="40" rx="4" fill="#e8f4fd" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="310" y="15" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">Входная лента</text>
          <text x="60" y="46" fontFamily="Segoe UI, Arial" fontSize="14" fill="#0b2a4a">0</text>
          <text x="120" y="46" fontFamily="Segoe UI, Arial" fontSize="14" fill="#0b2a4a">1</text>
          <text x="180" y="46" fontFamily="Segoe UI, Arial" fontSize="14" fill="#0b2a4a">1</text>
          <text x="240" y="46" fontFamily="Segoe UI, Arial" fontSize="14" fill="#0b2a4a">0</text>
          <text x="300" y="46" fontFamily="Segoe UI, Arial" fontSize="14" fill="#0b2a4a">0</text>
          <text x="360" y="46" fontFamily="Segoe UI, Arial" fontSize="14" fill="#0b2a4a">1</text>
          <text x="420" y="46" fontFamily="Segoe UI, Arial" fontSize="14" fill="#0b2a4a">1</text>
          <text x="480" y="46" fontFamily="Segoe UI, Arial" fontSize="14" fill="#0b2a4a">1</text>

          <polygon points="260,75 360,75 380,120 340,165 280,165 240,120" fill="#fdebd0" stroke="#b8860b" strokeWidth="2" />
          <text x="310" y="115" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">Конечный</text>
          <text x="310" y="135" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">автомат</text>

          <rect x="20" y="140" width="580" height="30" rx="4" fill="#f9e79f" stroke="#b8860b" strokeWidth="1.8" />
          <text x="310" y="135" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">Выходная лента</text>
          <text x="60" y="162" fontFamily="Segoe UI, Arial" fontSize="14" fill="#0b2a4a">1</text>
          <text x="120" y="162" fontFamily="Segoe UI, Arial" fontSize="14" fill="#0b2a4a">0</text>
          <text x="180" y="162" fontFamily="Segoe UI, Arial" fontSize="14" fill="#0b2a4a">0</text>
          <text x="240" y="162" fontFamily="Segoe UI, Arial" fontSize="14" fill="#0b2a4a">1</text>
        </svg>
        <div className="lecture1-diagram-caption">
          Рис. 5. Модель конечного автомата
        </div>
      </div>

      <p>
        <strong>Конечный автомат</strong> — набор из пяти компонентов{' '}
        <code>{'{A, B, S, φ, ψ}'}</code>, где:
      </p>
      <ul>
        <li><code>A = {'{a1, a2, ..., an}'}</code> — входной алфавит;</li>
        <li><code>B = {'{b1, b2, ..., bm}'}</code> — выходной алфавит;</li>
        <li><code>S = {'{s1, s2, ..., sr}'}</code> — множество внутренних состояний автомата;</li>
        <li><code>φ: S × A → S</code> — функция перехода в следующее состояние;</li>
        <li><code>ψ: S × A → B</code> — функция выходов.</li>
      </ul>

      <div className="lecture1-diagram-block">
        {/* SVG: Сети Петри */}
        <svg
          width="620"
          height="220"
          viewBox="0 0 620 220"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Сети Петри"
        >
          {/* Сеть а) */}
          <text x="30" y="25" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">а)</text>
          <circle cx="60" cy="60" r="18" fill="#e8f4fd" stroke="#1d4e89" strokeWidth="1.8" />
          <circle cx="60" cy="60" r="3" fill="#1d4e89" />
          <circle cx="60" cy="60" r="3" fill="#1d4e89" transform="translate(6,6)" />
          <text x="60" y="95" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">p₁</text>

          <circle cx="60" cy="130" r="18" fill="#e8f4fd" stroke="#1d4e89" strokeWidth="1.8" />
          <circle cx="60" cy="130" r="3" fill="#1d4e89" />
          <text x="60" y="165" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">p₂</text>

          <rect x="120" y="55" width="10" height="50" fill="#1d4e89" />
          <text x="125" y="120" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">t₁</text>

          <circle cx="200" cy="60" r="18" fill="#e8f4fd" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="200" y="95" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">p₃</text>

          <circle cx="200" cy="130" r="18" fill="#e8f4fd" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="200" y="165" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">p₄</text>

          <rect x="120" y="125" width="10" height="50" fill="#1d4e89" />
          <text x="125" y="190" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">t₂</text>

          <circle cx="200" cy="180" r="18" fill="#e8f4fd" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="200" y="215" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">p₅</text>

          <line x1="78" y1="60" x2="120" y2="70" stroke="#1d4e89" strokeWidth="1.5" />
          <line x1="78" y1="130" x2="120" y2="140" stroke="#1d4e89" strokeWidth="1.5" />
          <line x1="130" y1="70" x2="182" y2="60" stroke="#1d4e89" strokeWidth="1.5" />
          <line x1="130" y1="80" x2="182" y2="130" stroke="#1d4e89" strokeWidth="1.5" />
          <line x1="130" y1="150" x2="182" y2="180" stroke="#1d4e89" strokeWidth="1.5" />

          {/* Сеть б) */}
          <text x="330" y="25" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">б)</text>
          <circle cx="360" cy="60" r="18" fill="#e8f4fd" stroke="#1d4e89" strokeWidth="1.8" />
          <circle cx="360" cy="60" r="3" fill="#1d4e89" />
          <circle cx="360" cy="60" r="3" fill="#1d4e89" transform="translate(6,6)" />
          <text x="360" y="95" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">p₁</text>

          <circle cx="360" cy="130" r="18" fill="#e8f4fd" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="360" y="165" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">p₂</text>

          <rect x="420" y="55" width="10" height="50" fill="#1d4e89" />
          <text x="425" y="120" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">t₁</text>

          <circle cx="500" cy="60" r="18" fill="#e8f4fd" stroke="#1d4e89" strokeWidth="1.8" />
          <circle cx="500" cy="60" r="3" fill="#1d4e89" />
          <text x="500" y="95" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">p₃</text>

          <circle cx="500" cy="130" r="18" fill="#e8f4fd" stroke="#1d4e89" strokeWidth="1.8" />
          <circle cx="500" cy="130" r="3" fill="#1d4e89" />
          <text x="500" y="165" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">p₄</text>

          <rect x="420" y="125" width="10" height="50" fill="#1d4e89" />
          <text x="425" y="190" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">t₂</text>

          <circle cx="500" cy="180" r="18" fill="#e8f4fd" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="500" y="215" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">p₅</text>

          <line x1="378" y1="60" x2="420" y2="70" stroke="#1d4e89" strokeWidth="1.5" />
          <line x1="378" y1="130" x2="420" y2="140" stroke="#1d4e89" strokeWidth="1.5" />
          <line x1="430" y1="70" x2="482" y2="60" stroke="#1d4e89" strokeWidth="1.5" />
          <line x1="430" y1="80" x2="482" y2="130" stroke="#1d4e89" strokeWidth="1.5" />
          <line x1="430" y1="150" x2="482" y2="180" stroke="#1d4e89" strokeWidth="1.5" />
        </svg>
        <div className="lecture1-diagram-caption">
          Рис. 6. Сети Петри: примеры разметок
        </div>
      </div>

      <p>
        <strong>В сетях Петри</strong> события и условия представлены абстрактными символами из
        двух непересекающихся алфавитов — множеством переходов{' '}
        <code>E = {'{t1, t2, ..., tm}'}</code> и множеством мест{' '}
        <code>P = {'{p1, p2, ..., pn}'}</code>. В процессе функционирования сети происходит смена
        разметок мест как результат срабатывания её переходов. Сеть останавливается, если ни один
        из её переходов не может сработать.
      </p>

      {/* ==================== 10 ==================== */}
      <h2>10. Типичные цели и задачи обработки данных</h2>
      <h3>Типичные цели</h3>
      <ul>
        <li>Собрать всю доступную информацию, представленную в данных различной природы.</li>
        <li>Отделить существенную информацию от несущественной для рассмотрения в данный момент.</li>
        <li>Представить существенную информацию в виде, наиболее удобном для восприятия человеком.</li>
      </ul>

      <h3>Общие задачи обработки данных</h3>
      <ul>
        <li>Сбор данных</li>
        <li>Оценка качества данных</li>
        <li>Ввод данных в различные информационные системы (автоматический и ручной)</li>
        <li>Контроль и исправление ошибок ручного ввода</li>
        <li>Накопление данных</li>
        <li>Хранение накопленных данных (учёт, инвентаризация, сортировка, классификация)</li>
        <li>Доступ к данным</li>
        <li>Поиск нужных данных в накопленных массивах</li>
        <li>Контроль доступа и защита данных</li>
        <li>Передача данных и обмен данными</li>
        <li>Интеграция данных</li>
        <li>Упаковка, маркировка данных</li>
        <li>Надёжность передачи данных</li>
        <li>Представление данных (текстовое, табличное, графическое, визуальное)</li>
        <li>Форматы представления данных в различных информационных системах</li>
      </ul>

      <div className="lecture1-highlight">
        <strong>Ключевые задачи обработки данных:</strong> ввод (оцифровка), поиск, сортировка,
        фильтрация, классификация (интерпретация), сжатие (компрессия), представление (форматы,
        визуализация).
      </div>

      <div className="lecture1-diagram-block">
        {/* SVG: Этапы процесса обработки данных */}
        <svg
          width="620"
          height="200"
          viewBox="0 0 620 200"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Этапы процесса обработки данных"
        >
          <path d="M 30 180 Q 200 40 590 40" fill="none" stroke="#f5cba7" strokeWidth="60" strokeLinecap="round" opacity="0.5" />

          <circle cx="100" cy="150" r="14" fill="#e67e22" stroke="#a04000" strokeWidth="2" />
          <text x="130" y="145" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">Подготовка данных</text>
          <text x="130" y="165" fontFamily="Segoe UI, Arial" fontSize="11" fill="#4e6b8a">(предварительная обработка)</text>

          <circle cx="280" cy="90" r="14" fill="#7f8c8d" stroke="#4d5656" strokeWidth="2" />
          <text x="310" y="85" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">Анализ данных</text>
          <text x="310" y="105" fontFamily="Segoe UI, Arial" fontSize="11" fill="#4e6b8a">(извлечение знаний, моделирование)</text>

          <circle cx="470" cy="55" r="14" fill="#f1c40f" stroke="#b7950b" strokeWidth="2" />
          <text x="500" y="50" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">Представление знаний</text>
          <text x="500" y="70" fontFamily="Segoe UI, Arial" fontSize="11" fill="#4e6b8a">(визуализация, утилизация)</text>
        </svg>
        <div className="lecture1-diagram-caption">
          Рис. 7. Этапы процесса обработки данных
        </div>
      </div>

      {/* ==================== 11 ==================== */}
      <h2>11. Анализ данных и OLAP</h2>
      <p>
        <strong>Анализ данных</strong> — область математики и информатики, занимающаяся
        построением и исследованием наиболее общих математических методов и вычислительных
        алгоритмов извлечения знаний из экспериментальных данных; процесс исследования, фильтрации,
        преобразования и моделирования данных с целью извлечения полезной информации и принятия
        решений.
      </p>
      <p>
        <strong>Интеллектуальный анализ данных (Business Intelligence, BI)</strong> — особый метод
        анализа данных, который фокусируется на моделировании и открытии данных, а не на их
        описании.
      </p>

      <h3>OLAP</h3>
      <p>
        <strong>OLAP</strong> (online analytical processing, оперативная аналитическая обработка) —
        технология обработки данных, заключающаяся в подготовке суммарной (агрегированной)
        информации на основе больших массивов данных, структурированных по многомерному принципу.
      </p>
      <p>
        Агрегатные функции образуют многомерный набор данных (гиперкуб или метакуб), оси которого
        содержат параметры, а ячейки — зависящие от них агрегатные данные. Вдоль каждой оси данные
        могут быть организованы в виде иерархии, представляющей различные уровни их детализации.
      </p>

      <div className="lecture1-diagram-block">
        {/* SVG: OLAP-куб */}
        <svg
          width="400"
          height="300"
          viewBox="0 0 400 300"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="OLAP-куб"
        >
          <polygon points="80,80 280,80 280,220 80,220" fill="#aed6f1" stroke="#1d4e89" strokeWidth="2" />
          <polygon points="80,80 130,40 330,40 280,80" fill="#d6eaf8" stroke="#1d4e89" strokeWidth="2" />
          <polygon points="280,80 330,40 330,180 280,220" fill="#85c1e9" stroke="#1d4e89" strokeWidth="2" />

          {/* Сетка на гранях */}
          <line x1="130" y1="80" x2="130" y2="220" stroke="#1d4e89" strokeWidth="0.8" />
          <line x1="180" y1="80" x2="180" y2="220" stroke="#1d4e89" strokeWidth="0.8" />
          <line x1="230" y1="80" x2="230" y2="220" stroke="#1d4e89" strokeWidth="0.8" />
          <line x1="80" y1="120" x2="280" y2="120" stroke="#1d4e89" strokeWidth="0.8" />
          <line x1="80" y1="160" x2="280" y2="160" stroke="#1d4e89" strokeWidth="0.8" />
          <line x1="80" y1="200" x2="280" y2="200" stroke="#1d4e89" strokeWidth="0.8" />

          {/* Оси */}
          <line x1="80" y1="220" x2="20" y2="270" stroke="#0b2a4a" strokeWidth="2.5" />
          <polygon points="20,270 30,262 26,272" fill="#0b2a4a" />
          <text x="10" y="290" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">Измерение</text>

          <line x1="280" y1="220" x2="360" y2="260" stroke="#0b2a4a" strokeWidth="2.5" />
          <polygon points="360,260 348,258 356,268" fill="#0b2a4a" />
          <text x="340" y="285" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">Измерение</text>

          <line x1="330" y1="40" x2="380" y2="10" stroke="#0b2a4a" strokeWidth="2.5" />
          <polygon points="380,10 368,12 376,20" fill="#0b2a4a" />
          <text x="340" y="15" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#0b2a4a">Измерение</text>

          <line x1="280" y1="220" x2="380" y2="220" stroke="#7b241c" strokeWidth="1.8" strokeDasharray="4 3" />
          <text x="385" y="225" fontFamily="Segoe UI, Arial" fontSize="12" fontWeight="600" fill="#7b241c">Мера</text>
        </svg>
        <div className="lecture1-diagram-caption">
          Рис. 8. OLAP-куб (гиперкуб)
        </div>
      </div>

      {/* ==================== 12 ==================== */}
      <h2>12. Обработка текстовых данных</h2>
      <ul>
        <li>Поиск (в том числе по ключевым словам)</li>
        <li>Семантический анализ</li>
        <li>Тематическая и жанровая классификация сообщений на основе лексико-статистического анализа (в том числе фильтрация спама)</li>
        <li>Отбор сообщений на основе структурно-статистических признаков</li>
        <li>Оценка достоверности</li>
        <li>Сокращение избыточности представления (реферирование и аннотирование)</li>
        <li>Сжатие текстовых данных</li>
      </ul>

      {/* ==================== 13 ==================== */}
      <h2>13. Обработка изображений</h2>
      <ul>
        <li>Геометрические преобразования</li>
        <li>Цветовая коррекция</li>
        <li>Сравнение двух и более изображений</li>
        <li>Комбинирование изображений различными способами</li>
        <li>Интерполяция и сглаживание</li>
        <li>Разделение изображения на области (сегментация)</li>
        <li>Редактирование и ретуширование</li>
        <li>Фильтрация изображений</li>
        <li>Распознавание текста</li>
        <li>Машинное зрение</li>
        <li>Сжатие изображений</li>
      </ul>

      {/* ==================== 14 ==================== */}
      <h2>14. Обработка числовой информации</h2>
      <ul>
        <li>Классификация</li>
        <li>Кластеризация</li>
        <li>Сокращение описания</li>
        <li>Ассоциация</li>
        <li>Прогнозирование</li>
        <li>Анализ отклонений</li>
        <li>Оценивание</li>
        <li>Анализ связей</li>
        <li>Статистические методы</li>
        <li>Машинное обучение</li>
      </ul>

      {/* ==================== 15 ==================== */}
      <h2>15. Data Mining</h2>
      <p>
        <strong>Data Mining</strong> («добыча данных») — извлечение новых знаний и неочевидных
        зависимостей из больших объёмов сложных данных.
      </p>
      <h3>Предмет интереса</h3>
      <ul>
        <li>Нетривиальные знания</li>
        <li>Неявные зависимости</li>
        <li>Предварительно неизвестные знания</li>
        <li>Потенциально полезные знания</li>
      </ul>
      <h3>Синонимы</h3>
      <ul>
        <li>Интеллектуальный анализ данных — Business Intelligence</li>
        <li>Открытие знаний в БД</li>
        <li>Базы знаний. Извлечение знаний</li>
        <li>Анализ паттернов</li>
      </ul>

      {/* ==================== 16 ==================== */}
      <h2>16. Прикладные области обработки данных</h2>
      <ul>
        <li>Астрономия</li>
        <li>Медицина и биотехнологии</li>
        <li>Бухгалтерский учёт и инвентаризация</li>
        <li>Издательское дело</li>
        <li>Компьютерная графика и обработка изображений</li>
        <li>Конкурентная разведка</li>
        <li>Криптография</li>
        <li>Нанотехнологии</li>
        <li>Обработка результатов экспериментов</li>
        <li>Обработка сигналов</li>
        <li>Обучение</li>
        <li>Представление знаний</li>
        <li>Прикладная статистика</li>
        <li>Экономическая кибернетика</li>
        <li>Экспериментальная психология</li>
      </ul>

      {/* ==================== 17 ==================== */}
      <h2>17. Процедуры обработки информации</h2>
      <p>
        Информационная технология включает следующие процедуры, отличающиеся как по функциям, так
        и по времени их выполнения:
      </p>
      <ol>
        <li>Сбор и регистрация информации;</li>
        <li>Передача информации к месту обработки;</li>
        <li>Машинное кодирование информации;</li>
        <li>Хранение и поиск информации;</li>
        <li>Вычислительная обработка;</li>
        <li>Размножение информации;</li>
        <li>Принятие решений и выработка управляющих воздействий.</li>
      </ol>

      <div className="lecture1-diagram-block">
        {/* SVG: Цикл обработки информации */}
        <svg
          width="620"
          height="220"
          viewBox="0 0 620 220"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Цикл обработки информации"
        >
          <rect x="40" y="60" width="100" height="80" rx="6" fill="#fdebd0" stroke="#b8860b" strokeWidth="1.8" />
          <text x="90" y="95" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Сбор</text>
          <text x="90" y="115" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">данных</text>

          <line x1="140" y1="100" x2="180" y2="100" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="175,93 190,100 175,107" fill="#0b2a4a" />

          <rect x="190" y="40" width="240" height="120" rx="6" fill="#aed6f1" stroke="#1d4e89" strokeWidth="1.8" />
          <text x="310" y="60" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fontWeight="600" fill="#0b2a4a">Обработка данных</text>
          <line x1="210" y1="75" x2="410" y2="75" stroke="#1d4e89" strokeWidth="0.8" />
          <text x="240" y="95" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Группировка</text>
          <text x="310" y="95" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Сортировка</text>
          <text x="380" y="95" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Агрегирование</text>
          <text x="310" y="130" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#0b2a4a">Вычисление</text>

          <rect x="240" y="10" width="140" height="30" rx="6" fill="#ffffff" stroke="#1d4e89" strokeWidth="1.5" />
          <text x="310" y="30" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">База данных</text>
          <line x1="310" y1="40" x2="310" y2="55" stroke="#1d4e89" strokeWidth="1.5" />
          <polygon points="303,50 310,60 317,50" fill="#1d4e89" />
          <line x1="280" y1="55" x2="280" y2="40" stroke="#1d4e89" strokeWidth="1.5" />
          <polygon points="273,45 280,35 287,45" fill="#1d4e89" />

          <line x1="430" y1="100" x2="470" y2="100" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="465,93 480,100 465,107" fill="#0b2a4a" />

          <rect x="480" y="60" width="120" height="80" rx="6" fill="#f9e79f" stroke="#b8860b" strokeWidth="1.8" />
          <text x="540" y="85" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">Создание</text>
          <text x="540" y="105" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="12" fill="#0b2a4a">отчётов</text>

          <text x="540" y="170" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#4e6b8a">Информация для</text>
          <text x="540" y="185" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#4e6b8a">внутреннего и внешнего</text>
          <text x="540" y="200" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#4e6b8a">использования</text>

          <text x="90" y="180" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#4e6b8a">Данные из</text>
          <text x="90" y="195" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="11" fill="#4e6b8a">внешней среды</text>
        </svg>
        <div className="lecture1-diagram-caption">
          Рис. 9. Цикл обработки информации
        </div>
      </div>

      {/* ==================== 18 ==================== */}
      <h2>18. Принцип «чёрного ящика»</h2>
      <p>
        <strong>Чёрный ящик</strong> — система, вход и выход в которую известны, но процессы,
        которые происходят внутри, неизвестны.
      </p>
      <p>
        <strong>Серый ящик</strong> — процессы, происходящие внутри данной системы, известны лишь
        частично.
      </p>
      <p>
        <strong>Белый ящик</strong> — процессы, происходящие внутри данной системы, полностью
        известны, так же как входы и выходы.
      </p>

      <div className="lecture1-diagram-block">
        {/* SVG: Чёрный ящик */}
        <svg
          width="620"
          height="120"
          viewBox="0 0 620 120"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Схема чёрного ящика"
        >
          <polygon points="30,30 150,20 150,100 30,110" fill="#f9e79f" stroke="#b8860b" strokeWidth="1.8" />
          <text x="90" y="55" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#0b2a4a">Входная</text>
          <text x="90" y="75" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#0b2a4a">информация</text>

          <line x1="150" y1="65" x2="230" y2="65" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="225,58 240,65 225,72" fill="#0b2a4a" />

          <rect x="240" y="25" width="140" height="80" rx="6" fill="#1c2833" stroke="#0b2a4a" strokeWidth="2" />
          <text x="310" y="70" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="14" fontWeight="600" fill="#ffffff">«Чёрный ящик»</text>

          <line x1="380" y1="65" x2="460" y2="65" stroke="#0b2a4a" strokeWidth="2" />
          <polygon points="455,58 470,65 455,72" fill="#0b2a4a" />

          <rect x="470" y="20" width="130" height="90" rx="20" fill="#f9e79f" stroke="#b8860b" strokeWidth="1.8" />
          <text x="535" y="60" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#0b2a4a">Выходная</text>
          <text x="535" y="80" textAnchor="middle" fontFamily="Segoe UI, Arial" fontSize="13" fill="#0b2a4a">информация</text>
        </svg>
        <div className="lecture1-diagram-caption">
          Рис. 10. Схема преобразования информации по принципу «чёрного ящика»
        </div>
      </div>

     
    </div>
  );
};

export default Lecture1;