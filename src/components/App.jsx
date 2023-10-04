import { useState, useEffect } from 'react';

import css from './App.module.css';

import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import { findPictures } from '../servises/Api';

export function App() {
  const [pictures, setPictures] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [picThemSearch, setPicThemSearch] = useState(null);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!picThemSearch) return;

    const LoadThemOfPictures = async () => {
      try {
        setIsLoading(true);
        const newPictures = await findPictures(picThemSearch, page);

        if (pictures) {
          const addPictures = [...pictures.hits, ...newPictures.hits];
          setPictures(prevState => ({
            ...prevState,
            ...{ hits: addPictures },
          }));
        } else {
          setPictures(newPictures);
          setMaxPage(Math.ceil(newPictures.totalHits / 12));
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    LoadThemOfPictures();
  }, [picThemSearch, page]);

  const handleSubmitInput = inputData => {
    setPicThemSearch(inputData);
    setPage(1);
    setPictures(null);
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
  };

  const handleImageClick = imageURL => {
    setSelectedImage(imageURL);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleModalClose = () => {
    setSelectedImage(null);
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div>
      <Searchbar onData={handleSubmitInput} />

      {error && <p className={css.error}>{error}</p>}

      {picThemSearch && (
        <ImageGallery pictures={pictures} onImageClick={handleImageClick} />
      )}

      <Loader visible={isLoading} className={css.galleryContainer} />

      {page < maxPage && !loadMore && (
        <Button disabled={loadMore} handleClick={handleLoadMore} />
      )}

      {showModal && (
        <Modal image={selectedImage} onRequestClose={handleModalClose} />
      )}
    </div>
  );
}

