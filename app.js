/*初始化参数*/
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

/*执行画板代码*/
autoSetCanvasSize()
listenToUser(canvas)
changeTools()

/*禁止鼠标右键显示菜单*/
document.oncontextmenu=new Function("event.returnValue=false;");
document.onselectstart=new Function("event.returnValue=false;");

/**********************功能模块***************************************/

/*画圆圈功能*/
function drawCircle(x,y,radius) {
  ctx.beginPath()
  ctx.arc(x,y,radius,0,2*Math.PI)
  ctx.fill()
}


/*画直线*/
function drawLine(x,y,x1,y1) {
  ctx.beginPath()
  ctx.moveTo(x,y)
  ctx.lineTo(x1,y1)
  ctx.lineWidth = 4
  ctx.stroke()
  ctx.closePath()
}


/*橡皮擦功能*/
function eraseDrawing(x,y) {
  ctx.clearRect(x,y,10,10)
}


/*设置canvas画布大小*/
function getClientSize() {
  canvas.width = document.documentElement.clientWidth
  canvas.height = document.documentElement.clientHeight
}


/*自动设置画布大小为全屏*/
function autoSetCanvasSize(){
  getClientSize()
  window.onresize = e => {
    getClientSize()
  }
}



/*监听用户操作,实现在canvas上画图功能*/
function listenToUser(canvas) {
  //判断设备是否有触摸功能, 有的话执行touch事件监听, 没有的话执行click事件监听
  if(document.body.ontouchstart !== undefined) {
    //触摸屏幕, 在触摸的地方画一个起始原点
    canvas.ontouchstart = e => {
      use = true
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      lastPoint.x = x
      lastPoint.y = y
      if(eraserEnable) {
        eraseDrawing(x,y)
      }else {
        drawCircle(x,y)
      }
    }

    //移动手指, 根据移动轨迹画线
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
    
    //当手指离开屏幕，设置状态锁
    canvas.ontouchend = e => use = false
  }else {
    /*监听鼠标操作执行跟触摸事件相同的代码*/
    canvas.onmousedown = e => {
      use = true
      let x = e.clientX
      let y = e.clientY
      lastPoint.x = x
      lastPoint.y = y
      if(eraserEnable) {
        eraseDrawing(x,y)
      }else {
        drawCircle(x,y,2)
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
          drawCircle(x,y,2)
          lastPoint = newPoint
        }
      }
    }
    
    canvas.onmouseup = e => use = false
    
  }
}
  



/*选择工具功能*/
function changeTools() {
  //下载
  downlaod.onclick = e => {
    let url = canvas.toDataURL('image/png')
    let a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画'
    a.target = '_blank'
    a.click()
  }
  //删除
  deleteContent.onclick = e => {
    ctx.clearRect(0,0,canvas.width,canvas.height)
  }
  //橡皮擦
  eraser.onclick = e => {
    eraserEnable = true
    eraser.classList.add('active')
    pen.classList.remove('active')
  }
  //画笔
  pen.onclick = e => {
    eraserEnable = false   
    pen.classList.add('active')
    eraser.classList.remove('active')
  }
  /*更改颜色*/
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

