export function RegionSelect({ onSetField }) {
  
  function onRegionSelect(region) {
    if (region === 'I\'m flexible') region = ''
    onSetField('location', region)
  }


  const regions = [
    { name: 'I\'m flexible', imgUrl: 'https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg?im_w=320' },
    { name: 'Middle East', imgUrl: "https://a0.muscache.com/im/pictures/66355b01-4695-4db9-b292-c149c46fb1ca.jpg?im_w=320" },
    { name: 'Italy', imgUrl: 'https://a0.muscache.com/im/pictures/ea5598d7-2b07-4ed7-84da-d1eabd9f2714.jpg?im_w=320' },
    { name: 'United States', imgUrl: 'https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320' },
    { name: 'France', imgUrl: 'https://a0.muscache.com/im/pictures/f0ece7c0-d9b2-49d5-bb83-64173d29cbe3.jpg?im_w=320' },
    { name: 'South America', imgUrl: 'https://a0.muscache.com/im/pictures/06a30699-aead-492e-ad08-33ec0b383399.jpg?im_w=320' }
  ]

  return (
    <div className="region-select-menu">
      <div className="heading">Search by region</div>
      <div className="region-grid">
        {regions.map(region => {
          return (
            <div className="region" key={region.name}>
              <div className="region-btn" onClick={()=> onRegionSelect(region.name)}>
                <img src={region.imgUrl} alt={region.name} />
              </div>
              <div className="region-name">{region.name}</div>
            </div>
          )
        })}
      </div>
    </div>)
}
