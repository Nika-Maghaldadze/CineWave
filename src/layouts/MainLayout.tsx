import { Outlet } from 'react-router-dom';
import Navbar from '@/components/common/Navbar/Navbar';
import Footer from '@/components/common/Footer/Footer';
import styles from './MainLayout.module.scss';

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
