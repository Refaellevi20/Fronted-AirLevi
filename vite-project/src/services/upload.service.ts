// upload.service.ts

export const uploadService = {
    uploadImg,
}

function uploadImg(ev: React.ChangeEvent<HTMLInputElement>): Promise<any> {
    const CLOUD_NAME = "dnjusxgg3"
    const UPLOAD_PRESET = "otumftrp"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData()
    formData.append('upload_preset', UPLOAD_PRESET)
   
    // Ensure that a file is selected
    if (ev.target.files && ev.target.files.length > 0) {
        formData.append('file', ev.target.files[0])
    } else {
        return Promise.reject(new Error("No file selected"))
    }

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData,
    })
        .then(res => res.json())
        .then(res => {
            return res
        })
        .catch(err => {
            console.error(err)
            throw err 
        })
}