export default function ButtonSm(props) {
  return (
    <a className={`${props.bootstrap_class} btn-custom btn-sm`} href="#/">
      {props.text}
    </a>
  )
}
