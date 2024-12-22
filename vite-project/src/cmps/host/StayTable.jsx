
// export function StayTable() {
//     // console.log(stay)
//     const stay = {
//         name: "Ocean View Villa",
//         imgUrls: ["https://robohash.org/pukiguest", "https://robohash.org/pukiguest", "https://robohash.org/pukiguest"],
//         loc: { city: "Malibu", address: "123 Beach Road" },
//     }

//     const {
//         name,
//         imgUrls: [] , 
//         loc: { city, address },
//     } = stay || {}

//     console.log(address, 'addresss')
//     console.log(city, 'city')

//     return (
//         <div>
//             <div>
//                 <img src={stay.imgUrls[0]} alt='stay-img' />
//             </div>
//             <div >
//                 <h4>
//                     <span>dddd</span>
//                 </h4>
//             </div>
//             <div>
//                 <span>{name}</span>
//             </div>
//         </div>
//     )
// }

export function StayTable({stay}) {
    const { name = '',  imgUrls = ''} = stay || {}

  

    // console.log(address, 'addresss')
    // console.log(city, 'city')

    return (
        <div>
            <div>
                <img src={imgUrls || 'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436912/xle8ueqxjeazbs4bp09p.jpg'}
                 alt='stay-img' 
                style={{ width: '50px', height: '50px'}}
                />
            </div>
            {/* <div>
                <h4>
                    <span>{city || address}</span>
                </h4>
            </div> */}
            <div>
                <span>{name || 'Private Island - Amazing View'}</span>
            </div>
        </div>
    )
}