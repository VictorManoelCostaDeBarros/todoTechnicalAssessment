import styles from './styles.module.css';

import Logo from '../../assets/Logo.png';

export function Header() {
  return (
    <div className={styles.header}>
      <img className={styles.logo} src={Logo} alt="todo logo" />
    </div>
  )
}