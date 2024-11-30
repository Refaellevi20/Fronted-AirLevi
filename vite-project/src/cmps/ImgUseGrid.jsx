export function ImgUseGrid({ imgsToDisplay, onOpenStayGallery }) {
    return (
        <div className="images-container stay-imgs grid" onClick={onOpenStayGallery}>
            {imgsToDisplay.map((img, index) => (
                <img key={index} src={img} alt="stay-img" />
            ))}
        </div>
    )
}