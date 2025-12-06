import React, { useState, useEffect } from 'react';
import { useReferral } from '../context/ReferralContext';
import { useAuth } from '../context/AuthContext';
import { 
  Gift, Users, Share2, Copy, Mail, MessageCircle,
  Facebook, Twitter, Linkedin, Check, Calendar,
  Zap, Tag, Clock, TrendingUp, Star
} from 'lucide-react';

const ReferralRewards: React.FC = () => {
  const { 
    referralCode, 
    generateReferralCode, 
    sendReferral, 
    shareOnWhatsApp, 
    shareOnSocial,
    getReferralStats,
    getActiveRewards,
    flashSales,
    seasonalOffers,
    checkBirthdayReward
  } = useReferral();
  
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [referralEmail, setReferralEmail] = useState('');
  const [referralName, setReferralName] = useState('');
  const [activeTab, setActiveTab] = useState<'referral' | 'rewards' | 'flash' | 'seasonal'>('referral');

  useEffect(() => {
    if (user && !referralCode) {
      generateReferralCode(user.id);
    }
  }, [user, referralCode, generateReferralCode]);

  useEffect(() => {
    if (user) {
      // Check for birthday reward
      const birthDate = localStorage.getItem(`birthDate_${user.id}`);
      if (birthDate) {
        checkBirthdayReward(user.id, birthDate);
      }
    }
  }, [user, checkBirthdayReward]);

  const stats = user ? getReferralStats(user.id) : { totalReferrals: 0, completedReferrals: 0, totalEarned: 0 };
  const activeRewards = user ? getActiveRewards(user.id) : [];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (referralEmail) {
      sendReferral(referralEmail, referralName);
      setReferralEmail('');
      setReferralName('');
      alert('Referral sent successfully! 🎉');
    }
  };

  const calculateTimeLeft = (endTime: string) => {
    const difference = new Date(endTime).getTime() - new Date().getTime();
    if (difference <= 0) return 'Expired';

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? 's' : ''} left`;
    }
    return `${hours}h ${minutes}m left`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#2D5016] mb-4">Rewards & Referrals</h1>
          <p className="text-xl text-gray-600">Share the love, earn rewards! 🎁</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('referral')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'referral'
                ? 'bg-[#2D5016] text-white shadow-xl'
                : 'bg-white text-[#2D5016] hover:bg-gray-100'
            }`}
          >
            <Users className="h-5 w-5" />
            Refer & Earn
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'rewards'
                ? 'bg-[#2D5016] text-white shadow-xl'
                : 'bg-white text-[#2D5016] hover:bg-gray-100'
            }`}
          >
            <Gift className="h-5 w-5" />
            My Rewards ({activeRewards.length})
          </button>
          <button
            onClick={() => setActiveTab('flash')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'flash'
                ? 'bg-[#2D5016] text-white shadow-xl'
                : 'bg-white text-[#2D5016] hover:bg-gray-100'
            }`}
          >
            <Zap className="h-5 w-5" />
            Flash Sales ({flashSales.filter(f => f.isActive).length})
          </button>
          <button
            onClick={() => setActiveTab('seasonal')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'seasonal'
                ? 'bg-[#2D5016] text-white shadow-xl'
                : 'bg-white text-[#2D5016] hover:bg-gray-100'
            }`}
          >
            <Tag className="h-5 w-5" />
            Seasonal Offers ({seasonalOffers.filter(o => o.isActive).length})
          </button>
        </div>

        {/* Referral Tab */}
        {activeTab === 'referral' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
                <Users className="h-10 w-10 mb-4 opacity-80" />
                <p className="text-3xl font-bold mb-1">{stats.totalReferrals}</p>
                <p className="text-green-100">Total Referrals</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
                <TrendingUp className="h-10 w-10 mb-4 opacity-80" />
                <p className="text-3xl font-bold mb-1">{stats.completedReferrals}</p>
                <p className="text-blue-100">Successful Referrals</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl">
                <Gift className="h-10 w-10 mb-4 opacity-80" />
                <p className="text-3xl font-bold mb-1">₹{stats.totalEarned}</p>
                <p className="text-yellow-100">Total Earned</p>
              </div>
            </div>

            {/* Referral Code Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-gradient-to-br from-[#2D5016] to-[#3D6020] rounded-full mb-4">
                  <Gift className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-[#2D5016] mb-2">Refer a Friend, Get ₹100 Off!</h2>
                <p className="text-gray-600 text-lg">Share your referral code and both you and your friend get ₹100 off on your next order</p>
              </div>

              <div className="max-w-md mx-auto mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Referral Code</label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={referralCode}
                      readOnly
                      className="w-full px-4 py-4 bg-[#F5EFE0] border-2 border-[#2D5016] rounded-lg font-bold text-2xl text-center text-[#2D5016] tracking-wider"
                    />
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="px-6 py-4 bg-[#2D5016] text-white rounded-lg hover:bg-[#3D6020] transition-colors font-semibold flex items-center gap-2"
                  >
                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="max-w-2xl mx-auto mb-8">
                <h3 className="text-lg font-bold text-[#2D5016] mb-4 text-center">Share on Social Media</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button
                    onClick={() => shareOnWhatsApp('Fresh Dairy Products', '/products')}
                    className="flex flex-col items-center gap-2 p-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all shadow-lg hover:shadow-xl"
                  >
                    <MessageCircle className="h-8 w-8" />
                    <span className="font-semibold">WhatsApp</span>
                  </button>
                  <button
                    onClick={() => shareOnSocial('facebook', 'Fresh Dairy Products', '/products')}
                    className="flex flex-col items-center gap-2 p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Facebook className="h-8 w-8" />
                    <span className="font-semibold">Facebook</span>
                  </button>
                  <button
                    onClick={() => shareOnSocial('twitter', 'Fresh Dairy Products', '/products')}
                    className="flex flex-col items-center gap-2 p-4 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Twitter className="h-8 w-8" />
                    <span className="font-semibold">Twitter</span>
                  </button>
                  <button
                    onClick={() => shareOnSocial('linkedin', 'Fresh Dairy Products', '/products')}
                    className="flex flex-col items-center gap-2 p-4 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Linkedin className="h-8 w-8" />
                    <span className="font-semibold">LinkedIn</span>
                  </button>
                </div>
              </div>

              {/* Email Referral Form */}
              <div className="max-w-md mx-auto border-t-2 border-gray-200 pt-8">
                <h3 className="text-lg font-bold text-[#2D5016] mb-4 text-center flex items-center justify-center gap-2">
                  <Mail className="h-5 w-5" />
                  Invite by Email
                </h3>
                <form onSubmit={handleSendReferral} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Friend's Name (Optional)"
                    value={referralName}
                    onChange={(e) => setReferralName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Friend's Email"
                    value={referralEmail}
                    onChange={(e) => setReferralEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-[#2D5016] to-[#3D6020] text-white rounded-lg font-semibold hover:shadow-xl transition-all"
                  >
                    Send Invitation
                  </button>
                </form>
              </div>
            </div>

            {/* How it Works */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-[#2D5016] mb-6 text-center">How Referrals Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Share2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg text-[#2D5016] mb-2">1. Share Your Code</h3>
                  <p className="text-gray-600">Share your unique referral code with friends and family</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg text-[#2D5016] mb-2">2. They Sign Up</h3>
                  <p className="text-gray-600">Your friend registers using your referral code and gets ₹100 off</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="font-bold text-lg text-[#2D5016] mb-2">3. Both Get Rewarded</h3>
                  <p className="text-gray-600">You receive ₹100 off on your next purchase!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rewards Tab */}
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            {activeRewards.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-16 text-center">
                <Gift className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-600 mb-2">No Active Rewards</h2>
                <p className="text-gray-500">Start referring friends or check back for seasonal offers!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeRewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="bg-gradient-to-br from-white to-[#F5EFE0] rounded-2xl shadow-xl p-6 border-2 border-[#2D5016]"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-full ${
                          reward.type === 'birthday' ? 'bg-pink-500' :
                          reward.type === 'referral' ? 'bg-green-500' :
                          reward.type === 'seasonal' ? 'bg-blue-500' :
                          'bg-orange-500'
                        } text-white`}>
                          {reward.type === 'birthday' ? <Calendar className="h-6 w-6" /> :
                           reward.type === 'referral' ? <Users className="h-6 w-6" /> :
                           reward.type === 'seasonal' ? <Tag className="h-6 w-6" /> :
                           <Zap className="h-6 w-6" />}
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-[#2D5016]">{reward.title}</h3>
                          <p className="text-sm text-gray-600">{reward.description}</p>
                        </div>
                      </div>
                      <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                    </div>
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-600">Coupon Code:</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(reward.code);
                            alert('Code copied!');
                          }}
                          className="text-sm text-[#2D5016] hover:text-[#3D6020] font-bold flex items-center gap-1"
                        >
                          <Copy className="h-4 w-4" />
                          Copy
                        </button>
                      </div>
                      <p className="text-2xl font-bold text-[#2D5016] tracking-wider text-center py-2 bg-[#F5EFE0] rounded">
                        {reward.code}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {reward.discountType === 'percentage' ? 
                          `${reward.discountValue}% OFF` : 
                          `₹${reward.discountValue} OFF`}
                        {reward.maxDiscount && ` (Max: ₹${reward.maxDiscount})`}
                      </span>
                      <span className="text-gray-500">
                        Valid till {new Date(reward.validUntil).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Flash Sales Tab */}
        {activeTab === 'flash' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {flashSales.filter(sale => sale.isActive).map((sale) => (
              <div
                key={sale.id}
                className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-yellow-400 text-red-900 px-4 py-2 rounded-bl-2xl font-bold text-sm">
                  {sale.badge}
                </div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                    <Zap className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{sale.title}</h3>
                    <p className="text-white/90">{sale.description}</p>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">{sale.discountPercentage}% OFF</p>
                      <p className="text-sm text-white/80">Limited Time Offer</p>
                    </div>
                    <div className="text-right">
                      <Clock className="h-6 w-6 mb-1 ml-auto" />
                      <p className="font-bold">{calculateTimeLeft(sale.endTime)}</p>
                    </div>
                  </div>
                </div>
                <button className="w-full py-3 bg-white text-red-600 rounded-lg font-bold hover:bg-gray-100 transition-all">
                  Shop Now
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Seasonal Offers Tab */}
        {activeTab === 'seasonal' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {seasonalOffers.filter(offer => offer.isActive).map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className="relative h-48 bg-gradient-to-br from-[#F5EFE0] to-white p-6 flex items-center justify-center">
                  <img src={offer.image} alt={offer.title} className="h-full object-contain" />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {offer.discountPercentage}% OFF
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2D5016] mb-2">{offer.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                  <div className="bg-[#F5EFE0] rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-600">Code:</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(offer.discountCode);
                          alert('Code copied!');
                        }}
                        className="text-xs text-[#2D5016] hover:text-[#3D6020] font-bold flex items-center gap-1"
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </button>
                    </div>
                    <p className="text-lg font-bold text-[#2D5016] tracking-wider text-center">
                      {offer.discountCode}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    Valid: {new Date(offer.validFrom).toLocaleDateString()} - {new Date(offer.validUntil).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralRewards;
