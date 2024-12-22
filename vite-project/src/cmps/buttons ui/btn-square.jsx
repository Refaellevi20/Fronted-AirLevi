import classes from './btn-square.module.scss'

export function BtnSquare({ children, ...props }) {
  return (
    <button
      {...props}
      className={`${classes.btnSquare} ${
        props.className ? props.className : ''
      }`}>
      {children}
    </button>
  )
}
