export function ImgUseGrid({ imgsToDisplay, onOpenStayGallery }) {
    return (
        <div className="secondary-layout ">
        <div style={{ padding: 0 }} id="Photos" className="images-container stay-imgs grid full " onClick={onOpenStayGallery}>
            {imgsToDisplay.map((img, index) => (
                <img key={index} src={img} alt="stay-img" />
            ))}
        </div>
        </div>
    )
}