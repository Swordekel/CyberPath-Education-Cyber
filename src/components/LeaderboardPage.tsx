import { Trophy, Medal, Award, Crown, Users, TrendingUp, Flame } from 'lucide-react';
import { motion } from 'motion/react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  quizzesTaken: number;
  avatar: string;
  streak: number;
}

export function LeaderboardPage() {
  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, name: 'Alex Chen', score: 125, quizzesTaken: 18, avatar: '🥇', streak: 8 },
    { rank: 2, name: 'Sarah Johnson', score: 118, quizzesTaken: 16, avatar: '🥈', streak: 7 },
    { rank: 3, name: 'Michael Rodriguez', score: 110, quizzesTaken: 15, avatar: '🥉', streak: 6 },
    { rank: 4, name: 'Emily Zhang', score: 98, quizzesTaken: 14, avatar: '👨‍💻', streak: 5 },
    { rank: 5, name: 'David Kim', score: 92, quizzesTaken: 13, avatar: '👩‍💻', streak: 4 },
    { rank: 6, name: 'Lisa Anderson', score: 85, quizzesTaken: 12, avatar: '🧑‍💼', streak: 4 },
    { rank: 7, name: 'James Wilson', score: 78, quizzesTaken: 11, avatar: '👨‍🔬', streak: 3 },
    { rank: 8, name: 'Maria Garcia', score: 72, quizzesTaken: 10, avatar: '👩‍🔬', streak: 3 },
    { rank: 9, name: 'Robert Taylor', score: 65, quizzesTaken: 9, avatar: '🧑‍🎓', streak: 2 },
    { rank: 10, name: 'Jennifer Lee', score: 58, quizzesTaken: 8, avatar: '👨‍🎓', streak: 2 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-400" />;
      default:
        return <span className="text-gray-400">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-400/50';
      case 2:
        return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50';
      case 3:
        return 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-orange-400/50';
      default:
        return 'bg-slate-800/30 border-slate-700';
    }
  };

  const stats = [
    { icon: Users, label: 'Total Players', value: '1,247', delay: 0.1 },
    { icon: Trophy, label: 'Quizzes Taken', value: '15,892', delay: 0.2 },
    { icon: TrendingUp, label: 'Avg Score', value: '85', delay: 0.3 },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
          >
            <Trophy className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white mb-4"
          >
            Leaderboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Lihat ranking pengguna terbaik berdasarkan total skor dari quiz yang telah diselesaikan
          </motion.p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Second Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:order-1 order-2"
          >
            <motion.div
              className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-gray-400/50 rounded-xl p-6 text-center transform md:translate-y-8"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(156, 163, 175, 0.5)',
                y: 0
              }}
            >
              <motion.div
                className="text-4xl mb-3"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {leaderboardData[1].avatar}
              </motion.div>
              <Medal className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <h3 className="text-white mb-2">{leaderboardData[1].name}</h3>
              <motion.div
                className="text-3xl text-purple-400 mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                {leaderboardData[1].score}
              </motion.div>
              <p className="text-gray-400 text-sm">{leaderboardData[1].quizzesTaken} quizzes</p>
            </motion.div>
          </motion.div>

          {/* First Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:order-2 order-1"
          >
            <motion.div
              className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 border-2 border-yellow-400/50 rounded-xl p-6 text-center relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 40px rgba(250, 204, 21, 0.6)'
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <motion.div
                className="text-5xl mb-3 relative z-10"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {leaderboardData[0].avatar}
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
              </motion.div>
              <h3 className="text-white mb-2 relative z-10">{leaderboardData[0].name}</h3>
              <motion.div
                className="text-4xl text-yellow-400 mb-1 relative z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
              >
                {leaderboardData[0].score}
              </motion.div>
              <p className="text-gray-400 text-sm relative z-10">{leaderboardData[0].quizzesTaken} quizzes</p>
            </motion.div>
          </motion.div>

          {/* Third Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:order-3 order-3"
          >
            <motion.div
              className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-orange-400/50 rounded-xl p-6 text-center transform md:translate-y-12"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(251, 146, 60, 0.5)',
                y: 0
              }}
            >
              <motion.div
                className="text-4xl mb-3"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                {leaderboardData[2].avatar}
              </motion.div>
              <Award className="w-10 h-10 text-orange-400 mx-auto mb-3" />
              <h3 className="text-white mb-2">{leaderboardData[2].name}</h3>
              <motion.div
                className="text-3xl text-purple-400 mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
              >
                {leaderboardData[2].score}
              </motion.div>
              <p className="text-gray-400 text-sm">{leaderboardData[2].quizzesTaken} quizzes</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl overflow-hidden"
        >
          <div className="p-6 border-b border-purple-500/30">
            <h2 className="text-white">Rankings</h2>
          </div>
          
          <div className="divide-y divide-slate-700">
            {leaderboardData.map((entry, index) => (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className={`p-4 border-l-4 ${getRankBg(entry.rank)} hover:bg-slate-700/30 transition-all cursor-pointer`}
                whileHover={{ x: 10 }}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <motion.div
                    className="w-12 flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    {getRankIcon(entry.rank)}
                  </motion.div>

                  {/* Avatar */}
                  <motion.div
                    className="text-3xl"
                    whileHover={{ scale: 1.3 }}
                  >
                    {entry.avatar}
                  </motion.div>

                  {/* Name & Info */}
                  <div className="flex-1">
                    <h4 className="text-white">{entry.name}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span>{entry.quizzesTaken} quizzes</span>
                      <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-400" />
                        <span>{entry.streak} day streak</span>
                      </div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <motion.div
                      className="text-2xl text-purple-400"
                      whileHover={{ scale: 1.1 }}
                    >
                      {entry.score}
                    </motion.div>
                    <p className="text-gray-400 text-sm">points</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + stat.delay }}
              className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 text-center"
              whileHover={{ 
                scale: 1.05,
                borderColor: 'rgba(168, 85, 247, 0.6)',
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)'
              }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              </motion.div>
              <p className="text-gray-400 mb-1">{stat.label}</p>
              <motion.p
                className="text-white text-2xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + stat.delay, type: 'spring' }}
              >
                {stat.value}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
