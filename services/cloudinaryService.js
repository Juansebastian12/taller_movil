const CLOUD_NAME = 'dkbbvp3ol';
const UPLOAD_PRESET = 'react_app_upload';

export const uploadImageToCloudinary = async (uri) => {
  const data = new FormData();
  data.append('file', { uri, type: 'image/jpeg', name: 'upload.jpg' });
  data.append('upload_preset', UPLOAD_PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: data,
  });

  const result = await res.json();
  return result.secure_url; // devuelve la URL de la imagen subida
};

