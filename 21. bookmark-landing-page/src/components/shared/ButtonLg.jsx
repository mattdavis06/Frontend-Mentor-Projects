export default function ButtonLg(props) {
  return (
    <a className={`${props.bootstrap_class} my-2 btn-custom btn-lg`} href="#/">
      {props.text}
    </a>
  )
}
