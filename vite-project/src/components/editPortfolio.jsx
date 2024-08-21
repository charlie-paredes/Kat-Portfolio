import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth } from '../firebaseConfig';
import Photoshoots from './Photoshoots';

function UploadImage() {
  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(''); // State for selected folder

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNewFolder = async (e) => {
    e.preventDefault();
    const folderName = e.target.elements.folderName.value;
    const storage = getStorage();
    const storageRef = ref(storage, `${folderName}/.placeholder`);
    try {
      await uploadBytes(storageRef, new Blob());
      setUploadSuccess(`Folder created successfully!`);
      setUploadError(null);
    } catch (error) {
      setUploadError(error.message);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      setUploadError('You must be signed in to upload images.');
      return;
    }

    const storage = getStorage();
    const storageRef = ref(storage, `${selectedFolder}/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setUploadSuccess(`File uploaded successfully! URL: ${downloadURL}`);
      setUploadError(null);
    } catch (error) {
      setUploadError(error.message);
      setUploadSuccess(null);
    }
  };

  const handleDelete = async (url) => {
    if (!auth.currentUser) {
      setDeleteError('You must be signed in to delete images.');
      return;
    }

    const storage = getStorage();
    const storageRef = ref(storage, url);

    try {
      await deleteObject(storageRef);
      setDeleteSuccess(`File deleted successfully!`);
      setDeleteError(null);
    } catch (error) {
      setDeleteError(error.message);
      setDeleteSuccess(null);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
      <form onSubmit={handleNewFolder}>
        <input type="text" name="folderName" required />
        <button type="submit">New Folder</button>
      </form>
      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
      {uploadSuccess && <p style={{ color: 'green' }}>{uploadSuccess}</p>}
      {deleteError && <p style={{ color: 'red' }}>{deleteError}</p>}
      {deleteSuccess && <p style={{ color: 'green' }}>{deleteSuccess}</p>}
      <Photoshoots handleDelete={handleDelete} setSelectedFolder={setSelectedFolder} isEditMode={true} />
    </div>
  );
}

export default UploadImage;