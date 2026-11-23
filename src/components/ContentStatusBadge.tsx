import React from 'react';
import { ContentStatus } from '../types/curriculum';

interface ContentStatusBadgeProps {
  status: ContentStatus;
}

export const ContentStatusBadge: React.FC<ContentStatusBadgeProps> = ({ status }) => {
  const labels: Record<ContentStatus, string> = {
    verified: 'Verified Academic',
    implemented: 'Implemented',
    draft: 'Draft Review',
    planned: 'Planned Scope',
    published: 'Published'
  };

  return (
    <span className={`status-badge ${status}`}>
      {labels[status]}
    </span>
  );
};

