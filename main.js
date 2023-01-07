const CARDGOTOBACK = -140
const FIRST_CARD_SCALE = 1.2
const SECOND_CARD_SCALE = 1.1
const THIRD_CARD_SCALE = 1
const MULTIPLE_SCALE = 0.1

window.addEventListener("scroll", rotateCards)

function rotateCards() {
  if (window.scrollY > y * 1.2) {
    draggables[0].style.transform = `rotate(-1deg) scale(${
      FIRST_CARD_SCALE + MULTIPLE_SCALE
    })`
    draggables[1].style.transform = `translateX(80px) rotate(1deg) scale(${
      SECOND_CARD_SCALE + MULTIPLE_SCALE
    })`
    draggables[2].style.transform = `translateX(160px) rotate(1deg) scale(${
      THIRD_CARD_SCALE + MULTIPLE_SCALE
    })`
  } else {
    draggables[0].style.transform = `rotate(-3deg) scale(${FIRST_CARD_SCALE})`
    draggables[1].style.transform = `translateX(80px) rotate(3deg) scale(${SECOND_CARD_SCALE})`
    draggables[2].style.transform = `translateX(160px) rotate(3deg) scale(${THIRD_CARD_SCALE})`
  }
}

let { width, left, y } = document
  .querySelector(".draggable")
  .getBoundingClientRect()
console.log(y)
let draggables = document.querySelectorAll(".draggable")

draggables[0].style.transform = `rotate(-3deg) scale(${FIRST_CARD_SCALE})`
draggables[0].style.zIndex = 2
draggables[0].style.transition = `all 1s`

draggables[1].style.transform = `translateX(80px) rotate(3deg) scale(${SECOND_CARD_SCALE})`
draggables[1].style.zIndex = 1
draggables[1].style.transition = `all 1.4s`

draggables[2].style.transform = `translateX(160px) rotate(3deg) scale(${THIRD_CARD_SCALE})`
draggables[2].style.zIndex = 0
draggables[2].style.transition = `all 1s`

draggables.forEach((draggable) => {
  //Mobile
  draggable.addEventListener("touchstart", (event) => {
    console.log(draggable.getAttribute("draggable"))
    console.log("start drag")
    draggable.classList.add("dragging")
  })

  draggable.addEventListener("touchmove", (event) => {
    console.log("start over")
    onDrag(event.clientX, draggable)
  })

  draggable.addEventListener("touchend", (event) => {
    console.log("start end")
    if (draggable.getAttribute("draggable") === "false") {
      console.log("grrr")
      draggable.classList.remove("dragging")
      return
    }
    shuffleCards(draggable)
    draggable.classList.remove("dragging")
  })
  // COMPUTER
  draggable.addEventListener("dragstart", (event) => {
    window.removeEventListener("scroll", rotateCards)
    console.log("start drag")
    event.dataTransfer.setDragImage(
      event.target,
      window.outerWidth,
      window.outerHeight
    )
    draggable.classList.add("dragging")
  })

  draggable.addEventListener("dragover", (event) => {
    console.log("start over")
    onDrag(event.clientX, draggable)
  })

  draggable.addEventListener("dragend", (event) => {
    console.log("start end")
    LengthCardGoToBack(event.clientX, draggable)
    draggable.classList.remove("dragging")
  })
})

function onDrag(mouseOfX, draggable) {
  draggable.style.transform = `translateX(${
    mouseOfX - left - width / 2
  }px) rotate(-2.5deg) scale(1.2)`
}

function LengthCardGoToBack(mouseOfX, draggable) {
  const draggingCard = mouseOfX - left - width / 2
  if (draggingCard < CARDGOTOBACK) {
    shuffleCards(draggable)
  } else {
    draggable.style.transform = `translateX(0px) rotate(-3.5deg)`
  }
}

function shuffleCards(draggable) {
  const cardsNotDragging = document.querySelectorAll(
    ".draggable:not(.dragging)"
  )

  console.log("go to back")
  draggable.style.transform = `translateX(110px) rotate(2.5deg) scale(0.8)`
  draggable.style.visibility = `collapse`
  draggable.style.zIndex = 0
  draggable.style.transition = `all 0.4s`
  draggable.setAttribute("draggable", false)
  removeElement(draggable)
  handleCardsNotDragging(cardsNotDragging)
  addElement(draggable)
}

function handleCardsNotDragging(cards) {
  cards.forEach((card, index) => {
    if (index === 0) {
      card.style.transform = `translateX(0px) rotate(-3deg) scale(${FIRST_CARD_SCALE}`
      card.style.zIndex = 2
      card.style.transition = `all 1s`
      card.setAttribute("draggable", true)
    } else {
      card.style.transform = `translateX(80px) rotate(3deg) scale(${SECOND_CARD_SCALE})`
      card.style.zIndex = 1
      card.style.transition = `all 1s`
    }
  })
}

function removeElement(element) {
  setTimeout(() => element.remove(), 500)
}

function addElement(element) {
  setTimeout(() => {
    element.style.transform = `translateX(160px) rotate(3deg) scale(${THIRD_CARD_SCALE})`
    document.getElementById("competences").appendChild(element)
    element.style.visibility = `visible`
    element.style.transition = `all 1s`
  }, 500)
}
