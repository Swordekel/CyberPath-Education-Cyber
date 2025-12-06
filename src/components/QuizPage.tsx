import { Brain, CheckCircle, XCircle, Trophy, Clock, Lock, Zap, Target } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Page } from '../App';
import { motion, AnimatePresence } from 'motion/react';

interface QuizPageProps {
  isLoggedIn: boolean;
  onNavigate: (page: Page) => void;
  userName: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizData: Question[] = [
  {
    id: 1,
    question: 'Apa kepanjangan dari CIA dalam konteks cybersecurity?',
    options: [
      'Central Intelligence Agency',
      'Confidentiality, Integrity, Availability',
      'Computer Information Access',
      'Cyber Intelligence Analysis'
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: 'Apa yang dimaksud dengan phishing?',
    options: [
      'Teknik memancing ikan secara digital',
      'Serangan untuk mencuri informasi sensitif dengan menyamar sebagai entitas terpercaya',
      'Metode enkripsi data',
      'Jenis firewall'
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: 'Apa fungsi utama dari firewall?',
    options: [
      'Mempercepat koneksi internet',
      'Menyimpan data backup',
      'Memfilter dan mengontrol traffic jaringan',
      'Mengenkripsi password'
    ],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: 'Apa yang dimaksud dengan SQL Injection?',
    options: [
      'Teknik untuk mempercepat query database',
      'Serangan yang memanfaatkan kelemahan input untuk mengeksekusi SQL berbahaya',
      'Metode backup database',
      'Protokol keamanan database'
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: 'Apa perbedaan antara symmetric dan asymmetric encryption?',
    options: [
      'Tidak ada perbedaan',
      'Symmetric menggunakan satu kunci, asymmetric menggunakan sepasang kunci',
      'Symmetric lebih lambat dari asymmetric',
      'Asymmetric tidak aman'
    ],
    correctAnswer: 1,
  },
];

export function QuizPage({ isLoggedIn, onNavigate, userName }: QuizPageProps) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (quizStarted && !showResult && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizStarted, showResult, timeLeft]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Lock className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-white mb-4">Login Required</h2>
          <p className="text-gray-400 mb-6">
            Anda harus login terlebih dahulu untuk mengikuti quiz
          </p>
          <motion.button
            onClick={() => onNavigate('login')}
            className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login Sekarang
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setTimeLeft(300);
    setSelectedAnswer(null);
  };

  const handleAnswer = () => {
    if (selectedAnswer !== null) {
      const correct = selectedAnswer === quizData[currentQuestion].correctAnswer;
      setIsCorrect(correct);
      setShowFeedback(true);

      setTimeout(() => {
        const newAnswers = [...answers, selectedAnswer];
        setAnswers(newAnswers);
        setShowFeedback(false);

        if (currentQuestion < quizData.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
        } else {
          setShowResult(true);
        }
      }, 1500);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResult) {
    const score = calculateScore();
    const percentage = (score / quizData.length) * 100;

    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Trophy className={`w-20 h-20 mx-auto mb-6 ${percentage >= 70 ? 'text-yellow-400' : 'text-gray-400'}`} />
          </motion.div>
          
          <h1 className="text-white mb-4">Quiz Completed!</h1>
          
          <div className="mb-8">
            <motion.div
              className="text-6xl text-purple-400 mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
            >
              {score}/{quizData.length}
            </motion.div>
            <p className="text-gray-300">Correct Answers ({percentage.toFixed(0)}%)</p>
          </div>

          <motion.div
            className="bg-slate-900/50 rounded-lg p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-white mb-4">Review Jawaban</h3>
            <div className="space-y-3">
              {quizData.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between text-left bg-slate-800/50 p-3 rounded-lg"
                >
                  <span className="text-gray-400">Question {index + 1}</span>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {answers[index] === question.correctAnswer ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="flex gap-4">
            <motion.button
              onClick={startQuiz}
              className="flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Retry Quiz
            </motion.button>
            <motion.button
              onClick={() => onNavigate('leaderboard')}
              className="flex-1 px-6 py-3 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Leaderboard
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Brain className="w-20 h-20 text-purple-400 mx-auto mb-6" />
          </motion.div>
          
          <h1 className="text-white mb-4">Cybersecurity Quiz</h1>
          <p className="text-gray-300 mb-8">
            Uji pengetahuan cybersecurity Anda dengan {quizData.length} pertanyaan. 
            Waktu: 5 menit. Selamat mengerjakan!
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Brain, label: 'Questions', value: quizData.length, delay: 0.1 },
              { icon: Clock, label: 'Time Limit', value: '5 min', delay: 0.2 },
              { icon: Trophy, label: 'Pass Score', value: '70%', delay: 0.3 },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay }}
                className="bg-slate-900/50 rounded-lg p-4"
                whileHover={{ scale: 1.05 }}
              >
                <item.icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">{item.label}</p>
                <p className="text-white">{item.value}</p>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={startQuiz}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg transition-all shadow-lg shadow-purple-500/50 flex items-center justify-center gap-2 mx-auto"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="w-5 h-5" />
            Start Quiz
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Question {currentQuestion + 1} of {quizData.length}</span>
            <motion.div
              className="flex items-center gap-2 text-purple-400"
              animate={timeLeft < 60 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Clock className="w-4 h-4" />
              <span className={timeLeft < 60 ? 'text-red-400' : ''}>{formatTime(timeLeft)}</span>
            </motion.div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 mb-8"
            >
              <Target className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
              <h2 className="text-white">{question.question}</h2>
            </motion.div>

            <div className="space-y-4">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => !showFeedback && setSelectedAnswer(index)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showFeedback
                      ? index === question.correctAnswer
                        ? 'border-green-400 bg-green-400/10'
                        : selectedAnswer === index
                        ? 'border-red-400 bg-red-400/10'
                        : 'border-slate-600 bg-slate-700/30'
                      : selectedAnswer === index
                      ? 'border-purple-400 bg-purple-400/10'
                      : 'border-slate-600 hover:border-purple-400/50 bg-slate-700/30'
                  }`}
                  whileHover={!showFeedback ? { scale: 1.02, x: 10 } : {}}
                  whileTap={!showFeedback ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      showFeedback
                        ? index === question.correctAnswer
                          ? 'border-green-400'
                          : selectedAnswer === index
                          ? 'border-red-400'
                          : 'border-gray-500'
                        : selectedAnswer === index 
                        ? 'border-purple-400' 
                        : 'border-gray-500'
                    }`}>
                      {showFeedback && index === question.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                      {showFeedback && selectedAnswer === index && index !== question.correctAnswer && (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                      {!showFeedback && selectedAnswer === index && (
                        <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                      )}
                    </div>
                    <span className="text-gray-300">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={handleAnswer}
              disabled={selectedAnswer === null || showFeedback}
              className={`w-full mt-8 px-6 py-3 rounded-lg transition-all ${
                selectedAnswer !== null && !showFeedback
                  ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white hover:from-purple-600 hover:to-violet-600'
                  : 'bg-slate-600 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={selectedAnswer !== null && !showFeedback ? { scale: 1.02 } : {}}
              whileTap={selectedAnswer !== null && !showFeedback ? { scale: 0.98 } : {}}
            >
              {currentQuestion < quizData.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* Feedback Animation */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <motion.div
                className={`text-6xl ${isCorrect ? 'text-green-400' : 'text-red-400'}`}
                animate={{
                  scale: [0, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{ duration: 0.5 }}
              >
                {isCorrect ? '✓' : '✗'}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
