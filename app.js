let canvas = document.getElementById('canvas')
let tools = document.getElementById('tools')
let downlaod = document.getElementById('download')
let deleteContent = document.getElementById('delete')
let eraser = document.getElementById('eraser')
let brush = document.getElementById('pen')
let black = document.getElementById('black')
let red = document.getElementById('red')
let blue = document.getElementById('blue')
let green = document.getElementById('green')
let ctx = canvas.getContext('2d')
let use = false
let lastPoint = {
  x: undefined,
  y: undefined
}
let eraserEnable = false


// document.body.ontouchstart = e => e.preventDefault()
autoSetCanvasSize()
listenToUser(canvas)
changeTools()



/**********/
function drawCircle(x,y,radius) {
  ctx.beginPath()
  ctx.arc(x,y,radius,0,2*Math.PI)
  ctx.fill()
}


/************************/
function drawLine(x,y,x1,y1) {
  ctx.beginPath()
  ctx.moveTo(x,y)
  ctx.lineTo(x1,y1)
  ctx.lineWidth = 4
  ctx.stroke()
  ctx.closePath()
}


/*********/
function eraseDrawing(x,y) {
  ctx.clearRect(x,y,10,10)
}


/*****************/
function getClientSize() {
  canvas.width = document.documentElement.clientWidth
  canvas.height = document.documentElement.clientHeight
}


/*****************/
function autoSetCanvasSize(){
  getClientSize()
  window.onresize = e => {
    getClientSize()
  }
}



/*****************/
function listenToUser(canvas) {
  if(document.body.ontouchstart !== undefined) {
    canvas.ontouchstart = e => {
      use = true
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      lastPoint.x = x
      lastPoint.y = y
      if(eraserEnable) {
        eraseDrawing(x,y)
      }else {
        drawCircle(x,y,2)
      }
    }

    canvas.ontouchmove = e => {
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      if(use) {
        if(eraserEnable) {
          eraseDrawing(x,y)
        }else {
          let newPoint = {
            x:x,
            y:y
          }
          drawLine(lastPoint.x,lastPoint.y,x,y)
          drawCircle(x,y,2)
          lastPoint = newPoint
        }
      }
    }

    canvas.ontouchend = e => use = false
  }else {
    canvas.onmousedown = e => {
      use = true
      let x = e.clientX
      let y = e.clientY
      lastPoint.x = x
      lastPoint.y = y
      if(eraserEnable) {
        eraseDrawing(x,y)
      }else {
        drawCircle(x,y)
      }
    }
    
    canvas.onmousemove = e => {
      let x = e.clientX
      let y = e.clientY
      if(use) {
        if(eraserEnable) {
          eraseDrawing(x,y)
        }else {
          let newPoint = {
            x:x,
            y:y
          }
          drawLine(lastPoint.x,lastPoint.y,x,y)
          drawCircle(x,y)
          lastPoint = newPoint
        }
      }
    }
    
    canvas.onmouseup = e => use = false
  }
}
  



/*****************/
function changeTools() {
  downlaod.onclick = e => {
    let url = canvas.toDataURL('image/png')
    let a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画'
    a.target = '_blank'
    a.click()
  }

  deleteContent.onclick = e => {
    ctx.clearRect(0,0,canvas.width,canvas.height)
  }

  eraser.onclick = e => {
    eraserEnable = true
    eraser.classList.add('active')
    pen.classList.remove('active')
  }
  
  pen.onclick = e => {
    eraserEnable = false   
    pen.classList.add('active')
    eraser.classList.remove('active')
  }

  black.onclick = e => {
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    green.classList.remove('active')
  }

  red.onclick = e => {
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'red'
    red.classList.add('active')
    black.classList.remove('active')
    blue.classList.remove('active')
    green.classList.remove('active')   
  }

  blue.onclick = e => {
    ctx.fillStyle = 'blue'
    ctx.strokeStyle = 'blue'
    blue.classList.add('active')
    red.classList.remove('active')
    black.classList.remove('active')
    green.classList.remove('active')  
  }

  green.onclick = e => {
    ctx.fillStyle = 'green'
    ctx.strokeStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
  }  
}

