export const Button = ({
    children,
    className= '',
    ...props
}) => {
      const baseStyles = 'cursor-pointer text-sm';
  return (
    <button {...props} className={`${baseStyles} ${className}`}>{children}</button>
  )
}
