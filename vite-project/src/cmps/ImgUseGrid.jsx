import { IoMdApps } from "react-icons/io";

export function ImgUseGrid({ imgsToDisplay, onOpenStayGallery }) {
    return (
        <div className="secondary-layout" style={{ position: 'relative' }}>
            <div
                style={{ padding: 0 }}
                id="Photos"
                className="images-container stay-imgs grid full"
            >
                {imgsToDisplay.map((img, index) => (
                    <img key={index} src={img} alt="stay-img" />
                ))}
            </div>
            <div
                className="flex1 gallery-img"
                onClick={onOpenStayGallery}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    position: 'absolute',
                    bottom: '10px',
                    right: '110px',
                    background: 'rgba(255, 255, 255, 1)',
                    padding: '7px 15px',
                    borderRadius: '5px',
                    border: '1px solid #222222',
                    height: '34px',
                    width: '159px'
                }}
            >
                <IoMdApps
                    size={24}
                    style={{
                        marginRight: '8px',
                        display: 'block',
                        height: '18px',
                        width: '18px',
                        fill: 'currentColor',
                        borderRadius: '50%'
                    }}
                />
                <p className='fs14'>Show all Photos</p>
            </div>
        </div>
    )
}
