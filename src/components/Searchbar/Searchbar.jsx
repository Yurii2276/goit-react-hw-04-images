import { useState } from 'react';

import css from './Searchbar.module.css';

export default function Searchbar({ onData }) {
  const [searchField, setSearchField] = useState('');

  const handleInputChange = e => {
    setSearchField(e.target.value);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();

    onData(searchField);

    setSearchField('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSearchSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchField}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}
