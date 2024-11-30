export function ImgUseGrid({ imgsToDisplay, onOpenStayGallery }) {
    return (
        <div style={{ padding: 0 }} className="images-container stay-imgs grid full" onClick={onOpenStayGallery}>
            {imgsToDisplay.map((img, index) => (
                <img key={index} src={img} alt="stay-img" />
            ))}
        </div>
    )
}