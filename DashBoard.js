

import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useEffect, useState } from 'react';
import CircularStorageDisplay from './CircularStorageDisplay';


function DashBoard() {

  const [uploadedFiles, setUploadedFiles] = useState([]);

  // State for storage information
  const [storageInfo, setStorageInfo] = useState({
    usedPercentage: 0,
    usedStorage: '0GB',
    totalStorage: '512GB',
  });

  // State for each file type's storage and last update date
  const [storageByType, setStorageByType] = useState({
    Documents: { size: 0, lastUpdate: null },
    Images: { size: 0, lastUpdate: null },
    Videos: { size: 0, lastUpdate: null },
    Others: { size: 0, lastUpdate: null },
  });

  const totalStorageGB = 512;

  const getStorageUsed = (files) => {
    return files.reduce((total, file) => total + file.size, 0);
  };

  const updateStorageInfo = (files) => {
    const usedStorageBytes = getStorageUsed(files);
    const usedStorageGB = usedStorageBytes / (1024 * 1024 * 1024);
    const usedPercentage = (usedStorageGB / totalStorageGB) * 100;

    setStorageInfo({
      usedPercentage: usedPercentage.toFixed(2),
      usedStorage: `${usedStorageGB.toFixed(2)}GB`,
      totalStorage: `${totalStorageGB}GB`,
    });
  };

  // Function to categorize and update file storage by type
  const categorizeAndStoreFile = (file) => {
    const fileType = file.type;
    let typeKey;

    if (fileType.startsWith("image/")) {
      typeKey = "Images";
    } else if (fileType.startsWith("video/")) {
      typeKey = "Videos";
    } else if (fileType.startsWith("application/pdf") || fileType.startsWith("text/")) {
      typeKey = "Documents";
    } else {
      typeKey = "Others";
    }

    const currentDate = new Date().toLocaleDateString();

    setStorageByType((prev) => ({
      ...prev,
      [typeKey]: {
        size: prev[typeKey].size + file.size / (1024 * 1024 * 1024), // Convert bytes to GB
        lastUpdate: currentDate,
      },
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const fileUrls = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
      type: file.type,
    }));

    setUploadedFiles((prevFiles) => [...fileUrls, ...prevFiles]);

    fileUrls.forEach(categorizeAndStoreFile);

    updateStorageInfo([...uploadedFiles, ...fileUrls]);
  };

  useEffect(() => {
    updateStorageInfo(uploadedFiles);
  }, [uploadedFiles]);

  const [visibleMenuIndex, setVisibleMenuIndex] = useState(null);

  const handleMenuToggle = (index) => {
    setVisibleMenuIndex(visibleMenuIndex === index ? null : index);
  };

  const handleDeleteFile = (index) => {
    const fileToDelete = uploadedFiles[index];
    const newFiles = uploadedFiles.filter((_, i) => i !== index);

    // Update storage by type to reduce the file size of the deleted file
    const typeKey = categorizeFileType(fileToDelete);
    setStorageByType((prev) => ({
      ...prev,
      [typeKey]: {
        size: prev[typeKey].size - fileToDelete.size / (1024 * 1024 * 1024), // Subtract GB
        lastUpdate: new Date().toLocaleDateString(),
      },
    }));

    // Update total storage
    updateStorageInfo(newFiles);

    setUploadedFiles(newFiles); // Update the state by removing the file
    setVisibleMenuIndex(null); // Close the delete menu after deletion
  };

  const categorizeFileType = (file) => {
    const fileType = file.type;
    if (fileType.startsWith("image/")) {
      return "Images";
    } else if (fileType.startsWith("video/")) {
      return "Videos";
    } else if (fileType.startsWith("application/pdf") || fileType.startsWith("text/")) {
      return "Documents";
    } else {
      return "Others";
    }
  };

  const fileTypeImages = {
    pdf: '/images/DocLogo.svg',
    image: '/images/ImageLogo.svg',
    video: '/images/VideoLogo.svg',
    other: '/images/OtherLogo.svg',
  };

  const getFileTypeImage = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();

    if (extension === 'pdf') return fileTypeImages.pdf;
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return fileTypeImages.image;
    if (['mp4', 'avi', 'mov'].includes(extension)) return fileTypeImages.video;
    return fileTypeImages.other;
  };

 
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
          <div className='flex flex-row gap-20 mt-[50px] mr-[40px]'>
          <div className='flex flex-col justify-center items-center gap-12'>

          <div className="flex items-center ml-[40px]">
                <div className="relative inline-block">
                  <img src='/images/Dashboard.svg' className=' absolute left-4 top-1/2 transform -translate-y-1/2' height={30} width={30} />
                  <button onClick={GoToDashboard} className="bg-[#FA7275] h-[53px] w-[156px] cursor-pointer font-medium shadow-custom-blue rounded-full text-white pl-8">
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

            <div className='bg-[#F2F4F8] w-[1077px] h-[752px] flex flex-row gap-16 rounded-3xl'>
              <div className='bg-[#FA7275] ml-[30px] mt-[30px] flex flex-col gap-10 h-[220px] rounded-3xl w-[482px]'>
                <div className='h-220px w-[482px]'>
                  <CircularStorageDisplay storageInfo={storageInfo} />
                </div>

                
                <div className='flex flex-col ml-[30px] gap-5'>
  {/* First Row with Documents and Images */}
  <div className='flex flex-row gap-14'>
    {/* Display for Documents */}
    <div className='flex flex-col w-[180px] h-[200px] bg-white rounded-3xl gap-3'>
      <div className="flex flex-row relative">
        <img src="/images/DocLogo.svg" height={60} width={60} />
        <h1 className="absolute top-0 right-0 mr-4 mt-2 text-lg font-semibold">
          {storageByType.Documents.size.toFixed(2)}GB
        </h1>
      </div>
      <div className='flex text-center flex-col gap-1'>
        <div  className='text-base font-medium'>Documents</div>
        <div style={{ borderTop: '1px solid #A3B2C7', width: '120px', alignSelf: 'center' }}></div>
      </div>
      <div className='flex flex-col gap-3'>
        <p className='font-normal text-center text-gray-400'>Last Update</p>
        <p className='text-center'>{storageByType.Documents.lastUpdate || "N/A"}</p>
      </div>
    </div>

    {/* Display for Images */}
    <div className='flex flex-col w-[180px] h-[200px] bg-white rounded-3xl gap-3'>
      <div className="flex flex-row relative">
        <img src="/images/ImageLogo.svg" height={60} width={60} />
        <h1 className="absolute top-0 right-0 mr-4 mt-2 text-lg font-semibold">
          {storageByType.Images.size.toFixed(2)}GB
        </h1>
      </div>
      <div className='flex text-center flex-col gap-1'>
        <div className='text-base font-medium'>Images</div>
        <div style={{ borderTop: '1px solid #A3B2C7', width: '120px', alignSelf: 'center' }}></div>
      </div>
      <div className='flex flex-col gap-3'>
        <p className='font-normal text-center text-gray-400'>Last Update</p>
        <p className='text-center'>{storageByType.Images.lastUpdate || "N/A"}</p>
      </div>
    </div>
  </div>

  {/* Second Row with Videos and Others */}
  <div className='flex flex-row gap-14'>
    {/* Display for Videos */}
    <div className='flex flex-col w-[180px] h-[200px] bg-white rounded-3xl gap-3'>
      <div className="flex flex-row relative">
        <img src="/images/VideoLogo.svg" height={60} width={60} />
        <h1 className="absolute top-0 right-0 mr-4 mt-2 text-lg font-semibold">
          {storageByType.Videos.size.toFixed(2)}GB
        </h1>
      </div>
      <div className='flex text-center flex-col gap-1'>
        <div className='text-base font-medium'>Videos</div>
        <div style={{ borderTop: '1px solid #A3B2C7', width: '120px', alignSelf: 'center' }}></div>
      </div>
      <div className='flex flex-col gap-3'>
        <p className='font-normal text-center text-gray-400'>Last Update</p>
        <p className='text-center'>{storageByType.Videos.lastUpdate || "N/A"}</p>
      </div>
    </div>

    {/* Display for Others */}
    <div className='flex flex-col w-[180px] h-[200px] bg-white rounded-3xl gap-3'>
      
      <div className="flex flex-row relative">
        <img src="/images/OtherLogo.svg" height={60} width={60} />
        <h1 className="absolute top-0 right-0 mr-4 mt-2 text-lg font-semibold">
          {storageByType.Others.size.toFixed(2)}GB
        </h1>
      </div>
      <div className='flex text-center flex-col gap-1'>
        <div className='text-base font-medium'>Others</div>
        <div style={{ borderTop: '1px solid #A3B2C7', width: '120px', alignSelf: 'center' }}></div>
      </div>
      <div className='flex flex-col gap-3'>
        <p className='font-normal text-center text-gray-400'>Last Update</p>
        <p className='text-center'>{storageByType.Others.lastUpdate || "N/A"}</p>
      </div>
    </div>
  </div>
</div>

              </div>

              <div className='h-[700px] w-[470px] mt-[30px] bg-white rounded-3xl'>
                <h1 className='text-2xl text-center mr-20   font-bold mt-[20px]'>Recent Files Uploaded</h1>
                <div className='p-4 items-center -ml-14 justify-center'>
                  {uploadedFiles.length > 0 ? (
                    <ul className="flex flex-col items-center max-h-[590px] gap-2 overflow-y-auto">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="text-gray-700 flex rounded-lg  w-[300px] h-[100px] flex-row gap-3 mt-2"
                      >
                        {/* Dynamically set the image based on the file type */}
                        <img
                          src={getFileTypeImage(file)} // Set image based on file type
                          className="ml-[10px] mt-2"
                          height={70}
                          width={70}
                          alt="File Logo"
                        />
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 mt-6 w-[170px] overflow-hidden text-ellipsis whitespace-nowrap hover:text-blue-700"
                          title={file.name} // Tooltip to show full file name on hover
                        >
                          {file.name}
                        </a>
              
                        {/* Three Dots Menu */}
                        <div className="relative inline-block mt-4 w-[150px] h-[50px]">
                        <div className="relative"> {/* Make sure the parent container has relative positioning */}
                                    <div
                                        className="absolute top-2 right-2 flex flex-col cursor-pointer"
                                         onClick={() => handleMenuToggle(index)} // Pass index to toggle the specific menu
                                                >
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
                                onClick={() => handleDeleteFile(index)} // Delete file on click
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </ul>
                 
                  
                  ) : (
                    <p className="text-gray-500 text-center mt-4">No files uploaded yet.</p>
                  )}
                </div>
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

export default DashBoard;
