import  { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
     const response = await axios.get('https://mernbackend-sz7s.onrender.com/videos');
      setVideos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', title);

    try {
      const response = await axios.post('https://mernbackend-sz7s.onrender.com/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setVideos([...videos, response.data.video]);
      setTitle('');
      setFile(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Video Upload and Display</h1>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Enter video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Upload Video
        </button>
      </form>

      {/* Video List */}
      <div className="mt-8 grid gap-6">
        {videos.map((video) => (
          <div key={video._id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{video.title}</h2>
            <video controls width="100%" className="mt-2 rounded">
              <source src={`${import.meta.env.VITE_API_URL}${video.videoUrl}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;