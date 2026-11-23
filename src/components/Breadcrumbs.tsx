import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#6b7280', marginBottom: '1.25rem' }}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight size={14} color="#9ca3af" />}
          {item.active || !item.onClick ? (
            <span style={{ color: item.active ? '#111827' : '#6b7280', fontWeight: item.active ? 600 : 400 }}>
              {item.label}
            </span>
          ) : (
            <button
              onClick={item.onClick}
              style={{ background: 'none', border: 'none', padding: 0, color: '#0f3d59', cursor: 'pointer', textDecoration: 'underline', font: 'inherit' }}
            >
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

