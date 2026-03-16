function Card(props) {
    return (
        <div>
            <h1>{props.name}</h1>
            <p>{props.price}</p>
            <button>Купить сейчас</button>
        </div>
    )
}

export default Card;