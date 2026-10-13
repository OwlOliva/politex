// Quiz.tsx
import React, { useState, FormEvent } from 'react';
import { getQuizMeme } from './quizMemes';
import './Quiz.css';

export type AnswerKey = 'a' | 'b' | 'c' | 'd';

export interface Question {
  id: number;
  text: string;
  options: { value: AnswerKey; label: string }[];
  correct: AnswerKey;
  explanation: string;
}

export interface QuizResultData {
  correctCount: number;
  totalQuestions: number;
  percent: number;
  passed: boolean;
}

interface QuizProps {
  questions: Question[];
  title?: string;
  passThreshold?: number;
  onFinish?: (result: QuizResultData) => void;
}

const Quiz: React.FC<QuizProps> = ({
  questions,
  title = 'Проверочный тест',
  passThreshold = 60,
  onFinish,
}) => {
  const [selected, setSelected] = useState<Record<number, AnswerKey | undefined>>({});
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState<QuizResultData | null>(null);

  const handleSelect = (qId: number, value: AnswerKey) => {
    setSelected((prev) => ({ ...prev, [qId]: value }));
  };

  const handleCheck = (e: FormEvent) => {
    e.preventDefault();

    const correctCount = questions.reduce(
      (acc, q) => acc + (selected[q.id] === q.correct ? 1 : 0),
      0
    );
    const totalQuestions = questions.length;
    const percent = Math.round((correctCount / totalQuestions) * 100);
    const passed = percent >= passThreshold;

    const resultData: QuizResultData = {
      correctCount,
      totalQuestions,
      percent,
      passed,
    };

    setResult(resultData);
    setChecked(true);

    if (onFinish) onFinish(resultData);
  };

  const meme = result ? getQuizMeme(result.percent) : null;

  return (
    <div className="quiz-section">
      <h2>{title}</h2>
      <p>Выберите один правильный вариант ответа для каждого вопроса.</p>

      <form onSubmit={handleCheck}>
        {questions.map((q) => {
          const selectedValue = selected[q.id];
          const isCorrect = checked && selectedValue === q.correct;
          const isIncorrect = checked && selectedValue !== q.correct;

          return (
            <div className="quiz-question" key={q.id}>
              <p>
                {q.id}. {q.text}
              </p>
              <div className="quiz-options">
                {q.options.map((opt) => (
                  <label key={opt.value}>
                    <input
                      type="radio"
                      name={`q${q.id}`}
                      value={opt.value}
                      checked={selectedValue === opt.value}
                      onChange={() => handleSelect(q.id, opt.value)}
                      disabled={checked}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
              {checked && (
                <div
                  className={`quiz-feedback ${
                    isCorrect ? 'quiz-correct' : isIncorrect ? 'quiz-incorrect' : ''
                  }`}
                >
                  {isCorrect && `✅ Верно! ${q.explanation}`}
                  {isIncorrect &&
                    `❌ Неверно. Правильный ответ: ${q.correct.toUpperCase()}. ${q.explanation}`}
                  {!selectedValue && `⚠️ Вы не выбрали ответ. ${q.explanation}`}
                </div>
              )}
            </div>
          );
        })}

        {!checked && (
          <button type="submit" className="quiz-btn">
            Проверить результаты
          </button>
        )}
      </form>

      {checked && result && meme && (
        <>
          <div className="quiz-result show">
            Вы ответили правильно на <strong>{result.correctCount}</strong> из{' '}
            <strong>{result.totalQuestions}</strong> вопросов ({result.percent}%).<br />
            {result.passed ? '✅ Тест сдан!' : '❌ Тест не сдан.'}
          </div>

          <div className="quiz-meme" style={{ background: meme.bg }}>
      <div className="quiz-meme-emoji">{meme.emoji}</div>
      <h3 className="quiz-meme-title">{meme.title}</h3>
      <p className="quiz-meme-text">{meme.text}</p>
    </div>
        </>
      )}
    </div>
  );
};

export default Quiz;