import { storage } from "../../../../config/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const UploadImages = ({ onUploadComplete, setLoader, carInfo, mode }) => {
  const [selectedFileList, setSelectedFileList] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [EditCarImageList,setEditCarImageList]=useState([]);
  

  useEffect(() => {
    if (mode === "edit" && carInfo?.imageUrl?.length) {
      setEditCarImageList(carInfo.imageUrl);
    }
  }, [carInfo, mode]);  

  useEffect(() => {
    if (selectedFileList.length > 0) {
      UploadImageToServer();
    }
  }, [selectedFileList]);


  const onFileSelected = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);
    setSelectedFileList((prev) => [...prev, ...fileArray]);
  };

  const onImageRemove = (image) => {
    // setSelectedFileList((prev) => prev.filter((item) => item !== image));
    if (existingImageUrls.includes(image)) {
      setExistingImageUrls(existingImageUrls.filter((img) => img !== image));
    } else {
      setSelectedFileList(selectedFileList.filter((img) => img !== image));
    }
  };

  const UploadImageToServer = async () => {
    setLoader(true);
    try {
      const uploadedUrls = await Promise.all(
        selectedFileList.map(async (file) => {
          const fileName = `${Date.now()}_${file.name}`;
          const storageRef = ref(storage, `car-marketplace/${fileName}`);
          await uploadBytes(storageRef, file);
          return await getDownloadURL(storageRef);
        })
      );

      setUploadedImageUrls(uploadedUrls);
      onUploadComplete(uploadedUrls);
    } catch (error) {
      console.log("Error uploading images:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload Car Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {mode=='edit'&&
          EditCarImageList.map((image, index) => (
          <div key={index} className="relative">
            <IoMdCloseCircle
              className="absolute m-2 text-lg text-white cursor-pointer"
              onClick={() => onImageRemove(image)}
            />
            <img
              src={image}
              className="w-full h-[130px] object-cover rounded-xl"
            />
          </div>
        ))}
        {selectedFileList.map((image, index) => (
          <div key={index} className="relative">
            <IoMdCloseCircle
              className="absolute m-2 text-lg text-white cursor-pointer"
              onClick={() => onImageRemove(image)}
            />
            <img
              src={URL.createObjectURL(image)}
              className="w-full h-[130px] object-cover rounded-xl"
            />
          </div>
        ))}
        <label htmlFor="upload-images">
          <div className="border rounded-xl border-dotted border-primary bg-blue-100 p-10 cursor-pointer hover:shadow-md">
            <h2 className="text-lg text-center text-primary">+</h2>
          </div>
        </label>
        <input
          type="file"
          multiple
          id="upload-images"
          className="hidden"
          onChange={onFileSelected}
        />
      </div>
    </div>
  );
};

export default UploadImages;
