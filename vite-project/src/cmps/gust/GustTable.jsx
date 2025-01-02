
export function GuestTable({ guest }) {
  console.log('guest:', guest)
  const { fullname, imgURL } = guest
  const guestImgUrl = ['https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/5.jpg', 'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/6.jpg', 'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/6.jpg']
  return (
    <div>
      <div >
        <img src={imgURL || 'https://res.cloudinary.com/dgzyxjapv/image/upload/v1670246635/stayby/avatars/female/9.jpg'}
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          alt='buyer-avatar'
        />
      </div>
      <div >
        <h4>{fullname || 'Shuka'}</h4>
      </div>
      {/* <div >Guest</div> */}
    </div>
  )
}
