import React from 'react';
import { PresentationViewer, type SlideData } from './PresentationViewer';

interface SlidesModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapterTitle: string;
  lessonTitle: string;
  slides: SlideData[];
}

export const SlidesModal: React.FC<SlidesModalProps> = ({
  isOpen,
  onClose,
  chapterTitle,
  lessonTitle,
  slides,
}) => {
  if (!isOpen || !slides || slides.length === 0) return null;

  const chNumber = chapterTitle.split(':')[0].trim();

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(2, 6, 23, 0.85)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '1160px',
        }}
      >
        <PresentationViewer
          slides={slides}
          chapterNumber={chNumber}
          chapterTitle={chapterTitle}
          lessonTitle={lessonTitle}
          onClose={onClose}
        />
      </div>
    </div>
  );
};
