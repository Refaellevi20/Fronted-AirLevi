import { useState } from 'react'
import { uploadService } from '../services/upload.service'
import { IoCloudUpload, IoImage } from 'react-icons/io5'

export function ImgUploader({ onUploaded = null }) {
    const [imgData, setImgData] = useState({
        imgUrl: null,
        height: 500,
        width: 500,
    })
    const [isUploading, setIsUploading] = useState(false)

    async function uploadImg(ev) {
        try {
            setIsUploading(true)
            const { secure_url, height, width } = await uploadService.uploadImg(ev)
            setImgData({ imgUrl: secure_url, width, height })
            onUploaded && onUploaded(secure_url)
        } catch (error) {
            console.error('Failed to upload image:', error)
        } finally {
            setIsUploading(false)
        }
    }

    function getUploadLabel() {
        if (isUploading) return 'Uploading....'
        return imgData.imgUrl ? 'Upload Another?' : 'Upload Image'
    }

    return (
        <div className="upload-preview">
            {imgData.imgUrl ? (
                <>
                    <img 
                        src={imgData.imgUrl} 
                        alt="Uploaded preview"
                    />
                    <label 
                        htmlFor="imgUpload"
                        className={isUploading ? 'uploading' : ''}
                    >
                        {getUploadLabel()}
                    </label>
                </>
            ) : (
                <>
                    <div className="upload-placeholder">
                        {isUploading ? (
                            <IoCloudUpload />
                        ) : (
                            <IoImage />
                        )}
                        <span>
                            {isUploading ? 
                                'Uploading your image...' : 
                                'Click to upload an image'}
                        </span>
                    </div>
                    <label 
                        htmlFor="imgUpload"
                        className={isUploading ? 'uploading' : ''}
                    >
                        {getUploadLabel()}
                    </label>
                </>
            )}
            <input 
                type="file" 
                onChange={uploadImg} 
                accept="image/*" 
                id="imgUpload" 
                disabled={isUploading}
            />
        </div>
    )
}