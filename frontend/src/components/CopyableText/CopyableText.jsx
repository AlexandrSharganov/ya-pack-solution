import styles from './CopyableText.module.css';

function CopyableText({ text, setIsCopied }) {
  const copyText = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
      })
      .catch((error) => {
        console.error('Ошибка при копировании штрихкода: ', error);
      });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={styles.id}
      onClick={copyText}
      onKeyDown={copyText}
    >
      {text}
    </div>
  );
}

export default CopyableText;
