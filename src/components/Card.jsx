// Generic reusable wrapper div that applies whatever className is passed to it
function Card(props) {
  return <div className={props.className}>{props.children}</div>;
}

export default Card;