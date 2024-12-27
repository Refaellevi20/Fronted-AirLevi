import { useState } from "react"

export function DetailsHeart({ handleClick, isLiked = false, isLoggedin = false }) {
  const [like, setLike] = useState(isLiked)

  function onClick(ev) {
    ev.preventDefault()
    ev.stopPropagation()

    if (!isLoggedin) {
      alert("Please log in to like this item.")
      return
    }

    setLike(!like)
    handleClick()
  }

  return (
    <span className="heart">
      <button className="stay-heart__preview" onClick={onClick}>
        <img
          src={like ? "./img/red_heart.png" : "./img/gray_heart.png"}
          alt="Heart"
          className="heart-img"
        />
      </button>
    </span>
  )
}
