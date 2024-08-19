import React, { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import '../Photoshoots.css'; // Import the CSS file

function Photoshoots(props) {
  const [folder, setFolder] = useState('folder3'); // Default folder
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      console.log('Fetching images from folder:', folder);
      const folderRef = ref(storage, `${folder}/`);
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
    };

    fetchImages();
  }, [folder]);

  const calculateHeight = (url) => {
    console.log('Calculating height for image:', url);
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
      img.onload = () => {
        const height = Math.ceil(img.height / 100); // Adjust this value to control the height span
        console.log(`Image URL: ${url}, Height: ${height}`);
        resolve(height);
      };
    });
  };

  return (
    <div>
      <h1>Photoshoots</h1>
      <div>
        <button onClick={() => setFolder('folder1')}>Dia De Los Muertos</button>
        <button onClick={() => setFolder('folder2')}>Speakeasy Clothing Co. BTS</button>
        <button onClick={() => setFolder('folder3')}>Folder 3</button>
      </div>
      <div className="image-grid">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt="photoshoot"
            className="image-item"
            data-height={image.height}
          />
        ))}
      </div>
    </div>
  );
}

export default Photoshoots;