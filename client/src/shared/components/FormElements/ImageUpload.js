import React, { useRef, useState, useEffect } from 'react'
import Button from './Button'

const ImageUpload = (props) => {
  const [previewImage, setPreviewImage] = useState()

  const filePickerRef = useRef()

  useEffect(() => {
    if (!props.file) {
      return
    }
    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPreviewImage(fileReader.result)
    }
    fileReader.readAsDataURL(props.file)
  }, [props.file])

  const pickImageHandler = () => {
    filePickerRef.current.click()
  }

  return (
    <div className="">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={props.onChange}
      />
      <div>
        <div>
          {previewImage && (
            <img src={previewImage} className="w-32 h-32" alt="preview" />
          )}
          {!previewImage && <p>please pick valid image</p>}
        </div>
        <Button
          className="bg-secondary"
          type="button"
          onClick={pickImageHandler}
        >
          Pick Image
        </Button>
      </div>
    </div>
  )
}

export default ImageUpload
