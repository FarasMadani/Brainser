import React from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const Tools = () => {
  const { t } = useTranslation(); // Use useTranslation hook

  return (
    <div>
      <h1>{t('tools.title')}</h1>
      {/* Add more content as needed */}
    </div>
  );
};

export default Tools;
