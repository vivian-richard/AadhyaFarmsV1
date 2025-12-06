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
      color: 'text-blue-600 hover:text-blue-700',
      bgColor: 'hover:bg-blue-50',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'text-sky-500 hover:text-sky-600',
      bgColor: 'hover:bg-sky-50',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'text-blue-700 hover:text-blue-800',
      bgColor: 'hover:bg-blue-50',
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      color: 'text-gray-600 hover:text-gray-700',
      bgColor: 'hover:bg-gray-50',
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
          <div className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 p-3">
            <div className="flex items-center gap-2">
              {shareLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.name}
                    onClick={() => {
                      handleShare(link.url);
                      setIsOpen(false);
                    }}
                    className={`p-2.5 rounded-lg transition-all ${link.color} ${link.bgColor}`}
                    title={`Share on ${link.name}`}
                    aria-label={`Share on ${link.name}`}
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                );
              })}
              <div className="w-px h-6 bg-gray-300" />
              <button
                onClick={() => {
                  copyToClipboard();
                  setTimeout(() => setIsOpen(false), 1500);
                }}
                className={`p-2.5 rounded-lg transition-all ${
                  copied
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-gray-700 hover:bg-gray-50'
                }`}
                title={copied ? 'Copied!' : 'Copy Link'}
                aria-label={copied ? 'Link copied' : 'Copy link'}
              >
                {copied ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <LinkIcon className="h-5 w-5" />
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
