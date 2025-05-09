import React, { useState, useRef, useEffect } from 'react';
import styles from './CategorySelector.module.css';

const CATEGORIES = [
  'Advertising',
  'Branding',
  'Marketing',
  'SEO',
  'PPC',
  'Social Media Marketing',
  'Web Development'
];

const CategorySelector = ({ selectedCategories, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (category) => {
    if (selectedCategories.includes(category)) {
      onChange(selectedCategories.filter(c => c !== category));
    } else {
      onChange([...selectedCategories, category]);
    }
  };

  const removeCategory = (category) => {
    onChange(selectedCategories.filter(c => c !== category));
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div 
        className={styles.input}
        onClick={() => setIsOpen(true)}
      >
        {selectedCategories.length === 0 ? (
          <span className={styles.placeholder}>Select categories...</span>
        ) : (
          <div className={styles.tags}>
            {selectedCategories.map(category => (
              <span key={category} className={styles.tag}>
                {category}
                <button 
                  className={styles.removeButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCategory(category);
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      
      {isOpen && (
        <div className={styles.dropdown}>
          {CATEGORIES.map(category => (
            <div
              key={category}
              className={`${styles.category} ${selectedCategories.includes(category) ? styles.selected : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelector; 