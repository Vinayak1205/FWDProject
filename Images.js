import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useEffect, useState } from 'react';

function Images() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [visibleMenuIndex, setVisibleMenuIndex] = useState(null);

  const handleMenuToggle = (index) => {
    setVisibleMenuIndex(visibleMenuIndex === index ? null : index); // Toggle visibility
  };

  const [storageInfo, setStorageInfo] = useState({
    usedPercentage: 0,
    usedStorage: '0GB',
    totalStorage: '512GB',
  });

  const totalStorageGB = 512;

  const getStorageUsed = (files) => files.reduce((total, file) => total + file.size, 0);

  const updateStorageInfo = (files) => {
    const usedStorageBytes = getStorageUsed(files);
    const usedStorageGB = usedStorageBytes / (1024 * 1024 * 1024); // Convert bytes to GB
    const usedPercentage = (usedStorageGB / totalStorageGB) * 100;

    setStorageInfo({
      usedPercentage: usedPercentage.toFixed(2),
      usedStorage: `${usedStorageGB.toFixed(2)}GB`,
      totalStorage: `${totalStorageGB}GB`,
    });
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files).filter(file => file.type.startsWith("image/"));
    const fileUrls = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
      type: file.type,
    }));

    setUploadedFiles((prevFiles) => [...fileUrls, ...prevFiles]);
    updateStorageInfo([...uploadedFiles, ...fileUrls]);
  };

  useEffect(() => {
    updateStorageInfo(uploadedFiles);
  }, [uploadedFiles]);

  const handleDeleteFile = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1); // Remove the file at the given index
    setUploadedFiles(updatedFiles);
    updateStorageInfo(updatedFiles);
    setVisibleMenuIndex(null); // Close the menu after deletion
  };

  const fileTypeImages = {
    image: '/images/ImageLogo.svg',
  };

  const getFileTypeImage = () => fileTypeImages.image;

  const imageFiles = uploadedFiles.filter(file => file.type.startsWith('image/'));

  const GoToDashboard = () =>{
    window.location.href = '/dashboard'
  }
  const GoToImages = () =>{
    window.location.href = '/images'
  }

  const GoToVidoes = () =>{
    window.location.href = '/videos'
  }

  const GoToOthers = () =>{
    window.location.href = '/others'
  }

  const GoToDocuments = () =>{
    window.location.href = '/documents'
  }

  
  const LogOut = ()=>{
    sessionStorage.setItem("loginId","false")
    window.location.href = '/'
  }

  return (
    <div className='flex flex-col h-[1000px] gap-5'>
      {sessionStorage.getItem("loginId") ? (
        <div>
          {/* Header section */}
          <div className="flex flex-row items-center gap-16 mt-[50px] w-full">
            <div className="flex flex-row gap-3 items-center">
              <i className="bi bi-database text-[#FA7275] ml-[70px]" style={{ fontSize: '50px' }}></i>
              <h1 className="text-[#FA7275] font-medium text-4xl">Storage</h1>
            </div>
            <div className="bg-white shadow-custom-blue rounded-full w-[300px] h-[50px] p-3 flex items-center">
              <input
                placeholder="Search"
                className="w-full text-left border-none rounded focus:outline-none focus:ring-0"
              />
            </div>
            <div className='flex flex-row gap-4 ml-auto pr-[40px]'>
  {/* Upload Button */}
  <div onClick={() => document.getElementById('fileUpload').click()} className="relative inline-block">
    <i
      style={{ fontSize: '30px' }}
      className="bi bi-cloud-arrow-up-fill cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
    ></i>
    <button
      className="bg-[#FA7275] h-[53px] w-[136px] cursor-pointer font-medium shadow-custom-blue rounded-full text-white pl-8"
    >
      Upload
    </button>
    <input
      type="file"
      id="fileUpload"
      onChange={handleFileUpload}
      multiple
      style={{ display: 'none' }}
    />
  </div>

  {/* LogOut Button */}
  <div onClick={LogOut} className="relative inline-block self-end">

    <i
      style={{ fontSize: '30px' }}
      className="bi bi-box-arrow-left cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
    ></i>
    <button
      className="bg-[#FA7275] h-[53px] w-[136px] cursor-pointer font-medium shadow-custom-blue rounded-full text-white pl-8"
    >
      LogOut
    </button>
  </div>
</div>
          </div>

          {/* Main Content */}
          <div className='flex flex-row gap-20 mt-[50px]'>
          <div className='flex flex-row gap-20 mt-[50px]'>
            {/* Sidebar */}
            <div className='flex flex-col justify-center items-center gap-12'>

<div className="flex items-center ml-[40px]">
      <div className="relative inline-block">
        <img  src='/images/Dashboard.svg' className=' absolute left-4 top-1/2 transform -translate-y-1/2' height={30} width={30} />
        <button onClick={ GoToDashboard} className="bg-[#FA7275] h-[53px] w-[156px] cursor-pointer font-medium shadow-custom-blue rounded-full text-white pl-8">
        Dashboard
        </button>
      </div>
    </div>

<div className="flex items-center ml-[40px]">
      <div className="relative inline-block">
        <img src='/images/Document.svg' className=' absolute left-4 top-1/2 transform -translate-y-1/2' height={30} width={30} />
        <button onClick={GoToDocuments}  className="bg-[#FA7275] h-[53px] w-[156px] cursor-pointer font-medium shadow-custom-blue rounded-full text-white pl-8">
        Document
        </button>
      </div>
    </div>

    <div className="flex items-center ml-[40px]">
      <div className="relative inline-block">
        <img src='/images/Images.svg' className=' absolute left-4 top-1/2 transform -translate-y-1/2' height={30} width={30} />
        <button onClick={GoToImages} className="bg-[#FA7275] h-[53px] w-[156px] cursor-pointer font-medium shadow-custom-blue rounded-full text-white pl-8">
        Images
        </button>
      </div>
    </div>

    <div className="flex items-center ml-[40px]">
      <div className="relative inline-block">
        <img src='/images/Video.svg' className=' absolute left-4 top-1/2 transform -translate-y-1/2' height={30} width={30} />
        <button onClick={GoToVidoes} className="bg-[#FA7275] h-[53px] w-[156px] cursor-pointer font-medium shadow-custom-blue rounded-full text-white pl-8">
        Video
        </button>
      </div>
    </div>


  
<div className="flex items-center ml-[40px]">
      <div className="relative inline-block">
        <img src='/images/Other.svg' className=' absolute left-4 top-1/2 transform -translate-y-1/2' height={30} width={30} />
        <button onClick={GoToOthers} className="bg-[#FA7275] h-[53px] w-[156px] cursor-pointer font-medium shadow-custom-blue rounded-full text-white pl-8">
          Others
        </button>
      </div>
    </div>
    <img src="/images/driveImage.svg" className='ml-[50px]' height={220} width={220} />
  </div>
  </div>

            {/* Images Content */}
            <div className='bg-[#F2F4F8] w-[1127px] h-[752px] flex flex-col gap-5 rounded-3xl'>
              <h1 className='text-5xl font-bold ml-[50px] mt-[40px]'>Images</h1>
              

              <div className='flex flex-row w-[1070px] overflow-y-scroll h-[700px] mt-[20px] ml-[50px] flex-wrap gap-5'>
                {imageFiles.length > 0 ? (
                  imageFiles.map((file, index) => (
                    <div
                      key={index}
                      className='flex flex-col gap-3 w-[240px] h-[180px] bg-white rounded-3xl p-4 shadow-md relative'
                    >
                      <div className='flex flex-row gap-3'>
                        <img
                          onClick={() => window.open(file.url, "_blank")}
                          src={getFileTypeImage(file)}
                          alt="file type"
                          className="w-20 cursor-pointer h-20"
                        />
                        <div className="relative inline-block mt-4 w-[150px] h-[50px]">
                          <div onClick={() => handleMenuToggle(index)} className="relative">
                            <div className="absolute top-2 right-2 flex flex-col cursor-pointer">
                              <div className="w-2 h-2 border-2 border-[#A3B2C7] rounded-full mb-1"></div>
                              <div className="w-2 h-2 border-2 border-[#A3B2C7] rounded-full mb-1"></div>
                              <div className="w-2 h-2 border-2 border-[#A3B2C7] rounded-full mb-1"></div>
                            </div>
                          </div>

                          {/* Menu (Delete option) */}
                          {visibleMenuIndex === index && (
                            <div className="absolute top-0 right-0 mt-8 w-[120px] bg-white shadow-md rounded-lg py-2 text-center">
                              <button
                                className="w-full text-red-500 hover:bg-gray-200 py-2 px-4 rounded-lg"
                                onClick={() => handleDeleteFile(index)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-lg font-semibold truncate w-full" title={file.name}>{file.name}</p>
                      <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xl ml-4 text-gray-500">No images uploaded yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>ERROR Page 404 Found</div>
      )}
    </div>
  );
}

export default Images;
