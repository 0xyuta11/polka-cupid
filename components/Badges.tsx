import React from 'react';
import { BadgeCheck } from 'lucide-react';

interface VerificationBadgesProps {
  twitterVerified?: boolean;
  telegramVerified?: boolean;
}

const VerificationBadges: React.FC<VerificationBadgesProps> = ({
  twitterVerified = false,
  telegramVerified = false,
}) => {
  if (!twitterVerified && !telegramVerified) return null;

  return (
    <div className="flex gap-2 items-center">
      {twitterVerified && (
        <div className="flex items-center gap-1 bg-blue-500/10 px-2 py-1 rounded-full">
          <BadgeCheck size={14} className="text-blue-500" />
          <span className="text-xs font-medium text-blue-500">Twitter</span>
        </div>
      )}
      {telegramVerified && (
        <div className="flex items-center gap-1 bg-sky-500/10 px-2 py-1 rounded-full">
          <BadgeCheck size={14} className="text-sky-500" />
          <span className="text-xs font-medium text-sky-500">Telegram</span>
        </div>
      )}
    </div>
  );
};

export default VerificationBadges;