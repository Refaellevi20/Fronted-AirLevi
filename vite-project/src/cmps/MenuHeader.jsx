export function MenuHeader(){

    const svgStyle = {
            display: "block",
            fill: "none",
            height: "16px",
            width: "16px",
            stroke: "currentcolor",
            strokeWidth: 3,
            overflow: "visible",
        }

    return (
    <div className='menu-hamburger'>
    <svg
    style={svgStyle}
      viewBox='0 0 32 32'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      role='presentation'
      focusable='false'>
      <g fill='none' fillRule='nonzero'>
        <path d='m2 16h28'></path>
        <path d='m2 24h28'></path>
        <path d='m2 8h28'></path>
      </g>
    </svg>
  </div>
    )
}