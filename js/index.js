window.onload = function(){
    let oImgBox = document.getElementById('imgBox'),
        oImg = document.querySelectorAll('img'),
        oImgLength = oImg.length,
        deg = 360 / oImgLength,
        lastY = 0,
        lastX = 0,
        nowX = 0,
        nowY = 0,
        minusX = 0,
        minusY = 0,
        roX = -10,
        roY = 0,timer = 0;

    for(let i=0;i<oImgLength;i++){
        oImg[i].style.transform = 'rotateY('+i * deg+'deg) translateZ(350px)';
        oImg[i].style.transition = 'transform 1s '+ (oImgLength -1 - i) * 0.1 +'s';
    }

    mTop();
    window.onresize = mTop;
    function mTop() {
        let doc = document.documentElement || document.body;
        let wH = doc.clientHeight;
        oImgBox.style.marginTop = wH / 2 - 180 + 'px';
    }

    // 鼠标按下
    document.onmousedown = ev => {
        ev = ev || window.event;
        lastX = ev.clientX;
        lastY = ev.clientY;

        // 鼠标移动
        this.onmousemove = ev => {
            ev = ev || window.event;

            clearInterval(timer);

            nowX = ev.clientX;
            nowY = ev.clientY;

            minusX = nowX - lastX;
            minusY = nowY - lastY;

            roY += minusX*0.2;
            roX -= minusY*0.2;
            oImgBox.style.transform = 'rotateX('+roX+'deg) rotateY('+roY+'deg)';
            
            lastX = nowX;
            lastY = nowY;
        }
        // 鼠标抬起
        this.onmouseup = () =>{
            this.onmousemove = null;

            timer = setInterval(()=>{
                minusX *= 0.95;
                minusY *= 0.95;

                roY += minusX * 0.2;
                roX -= minusY * 0.2;
                oImgBox.style.transform = 'rotateX('+ roX +'deg) rotateY('+ roY +'deg)';

                if (Math.abs(minusX) < 1 && Math.abs(minusY) < 2) {
                    clearInterval(timer);
                }
            },16);
        }

        return false;
    }
}