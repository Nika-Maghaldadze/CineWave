import { useTranslation } from 'react-i18next';
import Modal from '@/components/common/Modal/Modal';
import styles from './TrailerModal.module.scss';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoKey: string | null;
  title: string;
}

export default function TrailerModal({
  isOpen,
  onClose,
  videoKey,
  title,
}: TrailerModalProps) {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {videoKey ? (
        <div className={styles.videoWrap}>
          <iframe
            className={styles.video}
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <p className={styles.empty}>{t('movie.noTrailer')}</p>
      )}
    </Modal>
  );
}
