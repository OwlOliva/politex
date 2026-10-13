// quizMemes.ts — мемы/эмодзи по результатам теста

export interface QuizMeme {
  emoji: string;
  title: string;
  text: string;
  bg: string;   // градиент для карточки
}

export const getQuizMeme = (percent: number): QuizMeme => {
  if (percent === 100) {
    return {
      emoji: '🏆👑🎉',
      title: 'Идеально!',
      text: 'Ты просто гений! Ни одной ошибки — преподаватель гордится тобой!',
      bg: 'linear-gradient(135deg, #f0d97a 0%, #c9a227 100%)',
    };
  }
  if (percent >= 90) {
    return {
      emoji: '🌟🎯✨',
      title: 'Превосходно!',
      text: 'Ты почти всё знаешь! Такой результат заслуживает уважения.',
      bg: 'linear-gradient(135deg, #b8c9a0 0%, #7a8f5c 100%)',
    };
  }
  if (percent >= 75) {
    return {
      emoji: '😎👍🌿',
      title: 'Отличный результат!',
      text: 'Ты хорошо усвоил материал. Ещё чуть-чуть — и будет идеально!',
      bg: 'linear-gradient(135deg, #d6e4c4 0%, #a4b985 100%)',
    };
  }
  if (percent >= 60) {
    return {
      emoji: '😊📚🌱',
      title: 'Тест сдан!',
      text: 'Неплохо! Есть над чем поработать, но главное — ты справился.',
      bg: 'linear-gradient(135deg, #fbf0c5 0%, #e0c867 100%)',
    };
  }
  if (percent >= 40) {
    return {
      emoji: '😅🤔📖',
      title: 'Почти получилось',
      text: 'Не хватило совсем немного! Перечитай лекцию и попробуй ещё раз.',
      bg: 'linear-gradient(135deg, #fbe0c0 0%, #d9a05c 100%)',
    };
  }
  return {
    emoji: '😢💤🥲',
    title: 'Не сдано',
    text: 'Похоже, лекция осталась непонятой. Обязательно перечитай её перед повтором.',
    bg: 'linear-gradient(135deg, #f8ddd7 0%, #d98a80 100%)',
  };
};