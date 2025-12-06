import { User, Mail, MapPin, Globe, FileText, Save, X, Sparkles, Camera, Upload } from 'lucide-react';
import { useState, useRef } from 'react';
import { Page, UserProfile } from '../App';
import { motion } from 'motion/react';

interface EditProfilePageProps {
  isLoggedIn: boolean;
  onNavigate: (page: Page) => void;
  userProfile: UserProfile;
  onUpdateProfile: (profile: Partial<UserProfile>) => void;
}

export function EditProfilePage({ isLoggedIn, onNavigate, userProfile, onUpdateProfile }: EditProfilePageProps) {
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    bio: userProfile.bio,
    location: userProfile.location,
    website: userProfile.website,
  });

  const [selectedAvatar, setSelectedAvatar] = useState(userProfile.avatar);
  const [photoUrl, setPhotoUrl] = useState(userProfile.photoUrl);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(userProfile.photoUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const avatars = ['👨‍💻', '👩‍💻', '🧑‍💼', '👨‍🔬', '👩‍🔬', '🧑‍🎓', '👨‍🎓', '👩‍🎓', '🥷', '👾', '🤖', '👽'];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <h2 className="text-white mb-4">Login Required</h2>
          <p className="text-gray-400 mb-6">
            Anda harus login terlebih dahulu untuk mengedit profile
          </p>
          <motion.button
            onClick={() => onNavigate('login')}
            className="px-8 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login Sekarang
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoUrl(result);
        setPhotoPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoUrl('');
    setPhotoPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      onUpdateProfile({
        ...formData,
        avatar: selectedAvatar,
        photoUrl: photoUrl,
      });
      setIsSaving(false);
      onNavigate('profile');
    }, 1000);
  };

  const handleCancel = () => {
    onNavigate('profile');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-white mb-2">Edit Profile</h1>
          <p className="text-gray-400">Update your personal information</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Upload */}
            <div>
              <label className="block text-gray-300 mb-3">
                Profile Photo
              </label>
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-4xl relative">
                    {photoPreview ? (
                      <img 
                        src={photoPreview} 
                        alt="Profile preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{selectedAvatar}</span>
                    )}
                    <motion.div
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                </div>
                
                <div className="flex-1 space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <div className="flex gap-2">
                    <motion.button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all border border-cyan-500/50 flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Upload className="w-4 h-4" />
                      Upload Photo
                    </motion.button>
                    {photoPreview && (
                      <motion.button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all border border-red-500/50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Remove
                      </motion.button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">JPG, PNG or GIF. Max size 5MB</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-700 pt-6">
              <label className="block text-gray-300 mb-3">
                Or Choose Avatar
              </label>
              <div className="grid grid-cols-6 gap-3">
                {avatars.map((avatar, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`text-4xl p-4 rounded-lg border-2 transition-all ${
                      selectedAvatar === avatar
                        ? 'border-cyan-400 bg-cyan-400/10 scale-110'
                        : 'border-slate-600 hover:border-cyan-400/50 bg-slate-900/50'
                    }`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: selectedAvatar === avatar ? 1.1 : 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {avatar}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2">
                Full Name
              </label>
              <motion.div
                className="relative"
                animate={focusedField === 'name' ? { scale: 1.02 } : { scale: 1 }}
              >
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="Your name"
                  required
                />
              </motion.div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email Address
              </label>
              <motion.div
                className="relative"
                animate={focusedField === 'email' ? { scale: 1.02 } : { scale: 1 }}
              >
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="your@email.com"
                  required
                />
              </motion.div>
            </div>

            {/* Bio Field */}
            <div>
              <label htmlFor="bio" className="block text-gray-300 mb-2">
                Bio
              </label>
              <motion.div
                className="relative"
                animate={focusedField === 'bio' ? { scale: 1.02 } : { scale: 1 }}
              >
                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('bio')}
                  onBlur={() => setFocusedField(null)}
                  rows={4}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                  placeholder="Tell us about yourself..."
                />
              </motion.div>
            </div>

            {/* Location Field */}
            <div>
              <label htmlFor="location" className="block text-gray-300 mb-2">
                Location
              </label>
              <motion.div
                className="relative"
                animate={focusedField === 'location' ? { scale: 1.02 } : { scale: 1 }}
              >
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('location')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="Your location"
                />
              </motion.div>
            </div>

            {/* Website Field */}
            <div>
              <label htmlFor="website" className="block text-gray-300 mb-2">
                Website
              </label>
              <motion.div
                className="relative"
                animate={focusedField === 'website' ? { scale: 1.02 } : { scale: 1 }}
              >
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('website')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="https://yourwebsite.com"
                />
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <motion.button
                type="submit"
                disabled={isSaving}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg transition-all shadow-lg shadow-cyan-500/30 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isSaving ? { scale: 1.02, boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' } : {}}
                whileTap={!isSaving ? { scale: 0.98 } : {}}
              >
                {isSaving ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Save className="w-5 h-5" />
                    Save Changes
                  </span>
                )}
              </motion.button>

              <motion.button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="px-6 py-3 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isSaving ? { scale: 1.02 } : {}}
                whileTap={!isSaving ? { scale: 0.98 } : {}}
              >
                <span className="flex items-center justify-center gap-2">
                  <X className="w-5 h-5" />
                  Cancel
                </span>
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}