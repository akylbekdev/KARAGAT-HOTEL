import { useEffect, useState } from 'react';

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`loader${hidden ? ' hidden' : ''}`} aria-label="Загрузка">
      <div className="loader__ring">HK</div>
    </div>
  );
}
