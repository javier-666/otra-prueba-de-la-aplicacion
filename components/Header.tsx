
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          Gestión de Almacén
        </h1>
      </div>
    </header>
  );
};

export default Header;
