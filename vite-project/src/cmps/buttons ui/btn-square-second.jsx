import classes from './btn-square-second.module.scss'

export function BtnSquareSecond({ children, ...props }) {
  return (
    <button {...props} className={classes.btnSquareSecond}>
      {children}
    </button>
  )
}
