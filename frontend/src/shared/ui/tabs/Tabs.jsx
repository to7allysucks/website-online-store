import styles from './Tabs.module.scss'

export const Tabs = (props) => {
  const {
    tabs,
    activeTab,
    onTabChange,
  } = props

  return (
    <div className={styles.tabs}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};