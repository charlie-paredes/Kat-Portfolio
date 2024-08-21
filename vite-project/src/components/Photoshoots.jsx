import React, { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import '../Photoshoots.css'; // Import the CSS file

function Photoshoots({ handleDelete, setSelectedFolder, isEditMode }) {
  const [folders, setFolders] = useState([]);
  const [folder, setFolder] = useState(''); // Default folder
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // State for selected image index
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State for delete confirmation

  useEffect(() => {
    const fetchFolders = async () => {
      const storageRef = ref(storage);
      try {
        const result = await listAll(storageRef);
        const folderNames = result.prefixes.map((folderRef) => folderRef.name);
        setFolders(folderNames);
        if (folderNames.length > 0) {
          setFolder(folderNames[0]); // Set the first folder as the default
          setSelectedFolder(folderNames[0]); // Set the first folder as the default for uploading
        }
      } catch (error) {
        console.error('Error fetching folders:', error.message);
      }
    };

    fetchFolders();
  }, [setSelectedFolder]);

  useEffect(() => {
    if (!folder) return;

    const fetchImages = async () => {
      console.log('Fetching images from folder:', folder);
      const folderRef = ref(storage, folder); // Corrected path
      try {
        const result = await listAll(folderRef);
        const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
        const imageUrls = await Promise.all(urlPromises);
        
        const imagesWithHeights = await Promise.all(
          imageUrls.map(async (url) => {
            const height = await calculateHeight(url);
            return { url, height };
          })
        );

        setImages(imagesWithHeights);
        console.log('Fetched images with heights:', imagesWithHeights);
      } catch (error) {
        if (error.code === 'storage/object-not-found') {
          console.error('Object not found:', error.message);
        } else {
          console.error('Error fetching images:', error.message);
        }
      }
    };

    fetchImages();
  }, [folder]);

  const calculateHeight = (url) => {
    console.log('Calculating height for image:', url);
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
      img.onload = () => {
        const height = img.height; // Adjust this value to control the height span
        console.log(`Image URL: ${url}, Height: ${height}`, 'Width:', img.width);
        resolve(height);
      };
    });
  };

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    handleDelete(selectedImage.url);
    setShowDeleteConfirmation(false);
    setSelectedImage(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleNextImage = () => {
    const nextIndex = (selectedImageIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
    setSelectedImageIndex(nextIndex);
  };

  const handlePreviousImage = () => {
    const prevIndex = (selectedImageIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
    setSelectedImageIndex(prevIndex);
  };

  return (
    <div>
      <h1>Photoshoots</h1>
      <div>
        {folders.map((folderName) => (
          <button key={folderName} onClick={() => { setFolder(folderName); setSelectedFolder(folderName); }}>
            {folderName}
          </button>
        ))}
      </div>
      <div className="image-grid">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt="photoshoot"
            className="image-item"
            onClick={() => handleImageClick(image, index)}
          />
        ))}
      </div>
      {selectedImage && (
        <div className="modal">
          <span className="close" onClick={() => { setSelectedImage(null); setShowDeleteConfirmation(false); }}>&times;</span>
          <img className="modal-content" src={selectedImage.url} alt="Zoomed" />
          <button className="prev-button" onClick={handlePreviousImage}>&#10094;</button>
          <button className="next-button" onClick={handleNextImage}>&#10095;</button>
          {isEditMode && (
            <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
          )}
        </div>
      )}
      {showDeleteConfirmation && (
        <div className="confirmation-popup">
          <h3>Delete Image?</h3>
          <button class = "confirm" onClick={confirmDelete}>Yes</button>
          <button class = "cancel" onClick={cancelDelete}>No</button>
        </div>
      )}
    </div>
  );
}

export default Photoshoots;