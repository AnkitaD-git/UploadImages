import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Swiper from 'swiper';
import 'swiper/css';


function App() {
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleFileInputChange = (e) => {
    const fileList = e.target.files;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      if (!file.type.startsWith('image/')) {
        alert('Uploaded file is not an image.');
        continue;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setImages((prevImage) => [...prevImage, imageUrl]);
      };

      reader.readAsDataURL(file);

    }

  }
  const handleImageClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 4,
      centeredSlides: true,
      loop: true,
    });
  }, []);

  return (
    <>
      <div className='container'>
        <div className='uploadBoard'>
          <h1 className='text-white mb-5'>Upload Images</h1>
          <div className='row mb-5'>
            <div className='col-sm-12 col-md-8 col-lg-5 mx-auto'>
              <input className="form-control" type="file" multiple onChange={handleFileInputChange} />
            </div>
          </div>

          <div className="swiper-container">
            <div className="swiper-wrapper">
              {
                images.map((image, index) => (

                  <div className='swiper-slide' >
                    <div className="card m-1 mt-5 mx-auto" style={{ width: '20rem' }}>
                      <img src={image}
                        className={`image-item img-fluid p-3 mx-auto ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => handleImageClick(index)} style={{ width: '16rem', height: '16rem' }} />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>

    </>

  );
}

export default App;
