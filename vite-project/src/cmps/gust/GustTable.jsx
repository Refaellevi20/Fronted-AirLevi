
export function GuestTable({ guest }) {
  console.log('guest:', guest)
  const { fullname, imgURL } = guest

  return (
    <div>
      <div >
        <img src={imgURL} alt='buyer-avatar' />
      </div>
      <div >
        <h4>{fullname}</h4>
      </div>
      {/* <div >Guest</div> */}
    </div>
  )
}
