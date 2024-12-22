export function StayHosTable({ stay }) {
    const {
      host: { fullname, imgUrl} = stay
    } = stay || {}
  
    return (
      <div>
        <div className="flex">
          <img
            src={imgUrl || 'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/3.jpg'} 
            alt="host-img"
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          />
          <h5>{fullname || 'barba'}</h5>
        </div>
      </div>
    )
  }