let canvas = document.getElementById('canvas')
let tools = document.getElementById('tools')
let eraser = document.getElementById('eraser')
let brush = document.getElementById('brush')
let ctx = canvas.getContext('2d')
let use = false
let lastPoint = {
  x: undefined,
  y: undefined
}
let eraserEnable = false



autoSetCanvasSize()
listenToMouse(canvas)
changeTools()



/**********/
function drawCircle(x,y) {
  ctx.beginPath()
  ctx.arc(x,y,2,0,2*Math.PI)
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
  ctx.clearRect(x-5,y-5,10,10)
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
 function listenToMouse(canvas) {
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



/*****************/
function changeTools() {
  eraser.onclick = e => {
    eraserEnable = true
    tools.className = 'inactive'
  }
  
  brush.onclick = e => {
    eraserEnable = false
    tools.className = 'active' 
  }
}

