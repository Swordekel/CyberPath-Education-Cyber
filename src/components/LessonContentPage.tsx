import { BookOpen, CheckCircle, ArrowLeft, ArrowRight, Play, Clock, Award } from 'lucide-react';
import { useState } from 'react';
import { Page } from '../App';
import { motion } from 'motion/react';

interface LessonContentPageProps {
  moduleId: number;
  onNavigate: (page: Page) => void;
  onComplete?: () => void;
}

interface Lesson {
  id: number;
  title: string;
  duration: string;
  content: string;
  points: number;
}

const moduleLessons: Record<number, Lesson[]> = {
  1: [
    {
      id: 1,
      title: 'Apa itu Cybersecurity?',
      duration: '15 menit',
      content: `
        <h2>Pendahuluan Cybersecurity</h2>
        <p>Cybersecurity atau keamanan siber adalah praktik melindungi sistem komputer, jaringan, dan data dari serangan digital, akses tidak sah, dan kerusakan.</p>
        
        <h3>Mengapa Cybersecurity Penting?</h3>
        <ul>
          <li>Melindungi data pribadi dan informasi sensitif</li>
          <li>Mencegah kerugian finansial</li>
          <li>Menjaga reputasi organisasi</li>
          <li>Memastikan kelangsungan bisnis</li>
        </ul>

        <h3>Ancaman Cyber yang Umum</h3>
        <ul>
          <li><strong>Malware:</strong> Software berbahaya yang merusak sistem</li>
          <li><strong>Phishing:</strong> Penipuan untuk mencuri informasi sensitif</li>
          <li><strong>Ransomware:</strong> Malware yang mengenkripsi data dan meminta tebusan</li>
          <li><strong>DDoS Attack:</strong> Serangan yang membanjiri sistem dengan traffic</li>
        </ul>
      `,
      points: 10,
    },
    {
      id: 2,
      title: 'CIA Triad',
      duration: '20 menit',
      content: `
        <h2>CIA Triad - Pilar Utama Cybersecurity</h2>
        <p>CIA Triad adalah tiga prinsip fundamental dalam keamanan informasi:</p>
        
        <h3>1. Confidentiality (Kerahasiaan)</h3>
        <p>Memastikan informasi hanya dapat diakses oleh pihak yang berwenang.</p>
        <ul>
          <li>Enkripsi data</li>
          <li>Kontrol akses</li>
          <li>Autentikasi pengguna</li>
        </ul>

        <h3>2. Integrity (Integritas)</h3>
        <p>Menjamin data tidak diubah atau dirusak tanpa izin.</p>
        <ul>
          <li>Hashing</li>
          <li>Digital signatures</li>
          <li>Version control</li>
        </ul>

        <h3>3. Availability (Ketersediaan)</h3>
        <p>Memastikan sistem dan data dapat diakses saat dibutuhkan.</p>
        <ul>
          <li>Backup dan recovery</li>
          <li>Redundancy</li>
          <li>Disaster recovery planning</li>
        </ul>
      `,
      points: 15,
    },
    {
      id: 3,
      title: 'Jenis-jenis Serangan Cyber',
      duration: '25 menit',
      content: `
        <h2>Mengenal Berbagai Jenis Serangan Cyber</h2>
        
        <h3>1. Social Engineering</h3>
        <p>Teknik manipulasi psikologis untuk mendapatkan informasi rahasia.</p>
        <ul>
          <li>Phishing email</li>
          <li>Pretexting (berpura-pura)</li>
          <li>Baiting (umpan)</li>
        </ul>

        <h3>2. Malware Attacks</h3>
        <p>Software berbahaya yang dirancang untuk merusak sistem:</p>
        <ul>
          <li><strong>Virus:</strong> Menyebar melalui file yang terinfeksi</li>
          <li><strong>Trojan:</strong> Menyamar sebagai software legitimate</li>
          <li><strong>Worm:</strong> Menyebar sendiri tanpa interaksi pengguna</li>
          <li><strong>Spyware:</strong> Memata-matai aktivitas pengguna</li>
        </ul>

        <h3>3. Network Attacks</h3>
        <ul>
          <li>Man-in-the-Middle (MITM)</li>
          <li>DNS Spoofing</li>
          <li>Session Hijacking</li>
        </ul>
      `,
      points: 20,
    },
  ],
  2: [
    {
      id: 1,
      title: 'Dasar-dasar Network Security',
      duration: '20 menit',
      content: `
        <h2>Pengenalan Network Security</h2>
        <p>Network security melindungi jaringan komputer dari ancaman internal dan eksternal.</p>
        
        <h3>Komponen Network Security</h3>
        <ul>
          <li>Firewall</li>
          <li>Intrusion Detection System (IDS)</li>
          <li>Virtual Private Network (VPN)</li>
          <li>Network Access Control (NAC)</li>
        </ul>
      `,
      points: 15,
    },
  ],
  3: [
    {
      id: 1,
      title: 'Pengenalan Kriptografi',
      duration: '25 menit',
      content: `
        <h2>Apa itu Kriptografi?</h2>
        <p>Kriptografi adalah ilmu menyandikan informasi sehingga hanya pihak yang berwenang yang dapat membacanya.</p>
        
        <h3>Jenis Enkripsi</h3>
        <ul>
          <li><strong>Symmetric Encryption:</strong> Menggunakan satu kunci untuk enkripsi dan dekripsi</li>
          <li><strong>Asymmetric Encryption:</strong> Menggunakan sepasang kunci (public & private)</li>
        </ul>

        <h3>Algoritma Kriptografi Populer</h3>
        <ul>
          <li>AES (Advanced Encryption Standard)</li>
          <li>RSA (Rivest-Shamir-Adleman)</li>
          <li>SHA (Secure Hash Algorithm)</li>
        </ul>
      `,
      points: 20,
    },
  ],
};

export function LessonContentPage({ moduleId, onNavigate, onComplete }: LessonContentPageProps) {
  const lessons = moduleLessons[moduleId] || moduleLessons[1];
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const currentLesson = lessons[currentLessonIndex];
  const isLastLesson = currentLessonIndex === lessons.length - 1;
  const isFirstLesson = currentLessonIndex === 0;

  const handleComplete = () => {
    if (!completedLessons.includes(currentLesson.id)) {
      setCompletedLessons([...completedLessons, currentLesson.id]);
    }

    if (isLastLesson) {
      if (onComplete) onComplete();
      onNavigate('learn');
    } else {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstLesson) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => onNavigate('learn')}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Modules
          </button>

          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-white mb-2">{currentLesson.title}</h1>
              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{currentLesson.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">{currentLesson.points} points</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">
                Lesson {currentLessonIndex + 1} of {lessons.length}
              </span>
              <span className="text-purple-400 text-sm">
                {Math.round(((currentLessonIndex + 1) / lessons.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentLessonIndex + 1) / lessons.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Lesson Content */}
        <motion.div
          key={currentLesson.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 mb-8"
        >
          <div 
            className="prose prose-invert prose-purple max-w-none"
            dangerouslySetInnerHTML={{ __html: currentLesson.content }}
            style={{
              color: '#e5e7eb',
            }}
          />
        </motion.div>

        {/* Lesson Navigation */}
        <div className="grid md:grid-cols-3 gap-4">
          {lessons.map((lesson, index) => (
            <motion.button
              key={lesson.id}
              onClick={() => setCurrentLessonIndex(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                index === currentLessonIndex
                  ? 'border-purple-400 bg-purple-400/10'
                  : completedLessons.includes(lesson.id)
                  ? 'border-green-400/50 bg-green-400/5'
                  : 'border-slate-700 bg-slate-800/30 hover:border-purple-400/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  completedLessons.includes(lesson.id)
                    ? 'bg-green-400/20'
                    : index === currentLessonIndex
                    ? 'bg-purple-400/20'
                    : 'bg-slate-700'
                }`}>
                  {completedLessons.includes(lesson.id) ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <span className={index === currentLessonIndex ? 'text-purple-400' : 'text-gray-400'}>
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-white text-sm mb-1">{lesson.title}</h4>
                  <p className="text-gray-400 text-xs">{lesson.duration}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <motion.button
            onClick={handlePrevious}
            disabled={isFirstLesson}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              isFirstLesson
                ? 'bg-slate-700 text-gray-500 cursor-not-allowed'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
            whileHover={!isFirstLesson ? { scale: 1.05 } : {}}
            whileTap={!isFirstLesson ? { scale: 0.95 } : {}}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </motion.button>

          <motion.button
            onClick={handleComplete}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg hover:from-purple-600 hover:to-violet-600 transition-all shadow-lg shadow-purple-500/50"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            {completedLessons.includes(currentLesson.id) ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
            {isLastLesson ? 'Complete Module' : 'Next Lesson'}
            {!isLastLesson && <ArrowRight className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>

      <style>{`
        .prose h2 {
          color: #a78bfa;
          font-size: 1.5rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose h3 {
          color: #c4b5fd;
          font-size: 1.25rem;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .prose p {
          color: #e5e7eb;
          margin-bottom: 1rem;
          line-height: 1.75;
        }
        .prose ul {
          color: #d1d5db;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
        }
        .prose strong {
          color: #a78bfa;
        }
      `}</style>
    </div>
  );
}
