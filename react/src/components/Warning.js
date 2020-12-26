import styles from './Warning.module.scss';
import { useCallback, useEffect, useState } from 'react';

const WarningWindow = ({ warningText, visible }) => {
  const [visibility, setVisible] = useState(false);

  useEffect(() => {
    setVisible(visible);
  }, [visible]);

  useEffect(() => {
    console.log(visibility);
  }, [visibility]);

  return (
    <>
      <div id={styles.Warning} className={visibility ? styles.show : ''} />
      <div id={styles.Body} className={visibility ? styles.show : ''}>
        <div>{warningText}</div>
      </div>
    </>
  );
};

export const useWarning = warningText => {
  const [warning, setWarning] = useState('');
  const [visible, setVisible] = useState(false);
  const [warningWindow, setWarningWindow] = useState(<WarningWindow warningText={warning} />);

  useEffect(() => {
    if (!warning) setWarning(warningText);
  }, [warning, warningText]);

  const trigger = useCallback(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    setWarningWindow(<WarningWindow warningText={warning} visible={visible} />);
  }, [visible, warning]);

  useEffect(() => {
    if (visible) {
      const tOut = setTimeout(() => {
        setVisible(false);
      }, 2000);
      return () => clearTimeout(tOut);
    }
  }, [visible]);

  return [warningWindow, trigger, setWarning];
};
