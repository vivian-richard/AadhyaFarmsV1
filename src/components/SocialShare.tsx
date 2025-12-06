import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Mail, Link as LinkIcon, Check } from 'lucide-react';

interface SocialShareProps {
  title: string;
  description?: string;
  url?: string;
  imageUrl?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, description = '', url, imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || window.location.href;
  const shareText = description || title;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'bg-sky-500 hover:bg-sky-600',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'bg-blue-700 hover:bg-blue-800',
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      color: 'bg-gray-600 hover:bg-gray-700',
    },
  ];

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 bg-[#2D5016] text-[#F5EFE0] rounded-lg hover:bg-[#3D6020] transition-colors"
        aria-label="Share"
        title="Share this product"
      >
        <Share2 className="h-5 w-5" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-full right-0 mb-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 overflow-hidden">
            <div className="p-3 border-b border-gray-200 bg-gradient-to-r from-[#2D5016] to-[#3D6020]">
              <h3 className="font-bold text-white text-sm">Share this product</h3>
            </div>
            <div className="p-3 space-y-2 max-h-80 overflow-y-auto">
              {shareLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.name}
                    onClick={() => {
                      handleShare(link.url);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-white transition-colors text-sm ${link.color}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-semibold">{link.name}</span>
                  </button>
                );
              })}
              <button
                onClick={() => {
                  copyToClipboard();
                  setTimeout(() => setIsOpen(false), 1500);
                }}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span className="font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <LinkIcon className="h-4 w-4" />
                    <span className="font-semibold">Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SocialShare;
