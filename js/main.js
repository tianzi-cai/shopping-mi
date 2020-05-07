window.onload =function(){
//banner轮播图实现：
    let bckimg =document.querySelector('.bckimg');
    let pages =document.querySelectorAll('.page-icon');
    let count =1;
    pages[count-1].style.cssText='background-color:white;border: 2px solid #a1a1a1;';
    let timer=null;
    
    //轮播函数
    function swiperInit(){
        let pages =document.querySelectorAll('.page-icon');
        timer = setInterval(function(){
            pages[count-1].style.cssText='';
            count++;
            if(count==6){
                count=1;
            }
            pages[count-1].style.cssText='background-color:white;border: 2px solid #a1a1a1;';
            bckimg.src ='img/banner-0'+count+'.jpg';
        },2000);
        // pages[count-1].style.cssText='';
    }
    swiperInit();
    
    //鼠标移动到相关位置，停止轮播
    let bck =document.querySelector('.bck')
    bck.addEventListener('mouseenter',function(){
        clearInterval(timer);
    });
    
    bck.addEventListener('mouseleave',function(){
        swiperInit();
    });
    
    //前进，后退
    let left =document.querySelector('.left');
    let right =document.querySelector('.right');
    
    left.addEventListener('click',function(e){
        //阻止a标签链接
        e.preventDefault();
        pages[count-1].style.cssText='';
        count--;
        if(count==0){
            count=5;
        }
        pages[count-1].style.cssText='background-color:white;border: 2px solid #a1a1a1;';
        bckimg.src ='img/banner-0'+count+'.jpg';
    });
    
    right.addEventListener('click',function(e){
        e.preventDefault();
        pages[count-1].style.cssText='';
        count++;
        if(count==6){
            count=1;
        }
        pages[count-1].style.cssText='background-color:white;border: 2px solid #a1a1a1;';
        bckimg.src ='img/banner-0'+count+'.jpg';
    });

    //圆点
    // let pages =document.querySelectorAll('.page-icon');
    pages.forEach(function(item,index){
        item.addEventListener('click',function(e){
            e.preventDefault();
            pages[count-1].style.cssText='';
            count=index+1;
            pages[count-1].style.cssText='background-color:white;border: 2px solid #a1a1a1;';
            bckimg.src ='img/banner-0'+count+'.jpg';
        });
    });

// 小米闪购js实现
    //滚动播放
    let boxlists =document.querySelectorAll('.boxlist');
    let box =document.querySelector('.box');
    let timer1 =null;
    let len =boxlists.length/4;
    let itemIndex =1;
    timer1 =setInterval(function(e){
        var movelen =0;
        if(itemIndex == len){
            itemIndex =0;
            movelen =0;
        }else{
            movelen = itemIndex*992;
        }
    
        box.style.cssText ='transform: translateX(-'+ movelen +'px);transition-duration: 1000ms;'
        itemIndex++;

    },5000);

    //按键前进后退
    let span1left =document.querySelector('.span1left');
    let span1right =document.querySelector('.span1right');

    span1left.addEventListener('click',function(e){
        e.preventDefault();
        var movelen =0;
        if(itemIndex == len){
            itemIndex =0;
            movelen =0;
        }else{
            movelen = itemIndex*992;
        }
        box.style.cssText ='transform: translateX(-'+ movelen +'px);transition-duration: 1000ms;'
        itemIndex++;

    });

    span1right.addEventListener('click',function(e){
        e.preventDefault();
        var movelen =0;
        if(itemIndex == len){
            itemIndex =0;
            movelen =0;
        }else{
            movelen = itemIndex*992;
        }
        box.style.cssText ='transform: translateX(-'+ movelen +'px);transition-duration: 1000ms;'
        itemIndex++
    });

    //安排场次,10点场，14点场，20点场，22点场，00点场
    function sessionTime(){
        let today =new Date();
        let year =today.getFullYear();
        let month =today.getMonth()+1;
        let data =today.getDate();
        let hour =today.getHours();
        let p1 =document.querySelector('.p1');
    
        let newhour;
        if(hour<10){
            newhour =10;
            p1.innerText='10:00场';
        }else if (hour<14) {
            newhour =14;
            p1.innerText='14:00场';
        }else if (hour<20) {
            newhour =20;
            p1.innerText='20:00场';
        }else if (hour<22) {
            newhour =22;
            p1.innerText='22:00场';
        }else{
            newhour =00;
            p1.innerText='00:00场';
        }
        
        let time2 = year +'-'+month+'-'+data+'-'+newhour+':00:00';  
        let pretime = Date.parse(time2);
        return pretime;
    }

    //计时
    function JSClock(pretime){
        let today = new Date();
        //设置闪购定时
        let time = today.getTime();
        let timeLDay=(pretime-time)/1000/60/60/24;
        let timeLHour=(timeLDay-parseInt(timeLDay))*24;
        let timeLMin=(timeLHour-parseInt(timeLHour))*60;
        let timeLsec=(timeLMin-parseInt(timeLMin))*60;

        let newtimeLHour =parseInt(timeLHour);
        let newtimeLMin =parseInt(timeLMin);
        let newtimeLsec =parseInt(timeLsec);
            //时间小于10时，在数字前面加0
        if(newtimeLHour<10){
            newtimeLHour = '0' + newtimeLHour.toString();
        }
        if(newtimeLMin<10){
            newtimeLMin = '0' + newtimeLMin.toString();
        }
        if(newtimeLsec<10){
            newtimeLsec = '0' + newtimeLsec.toString();
        }
    
        let hour =document.querySelector('.hour');
        let min =document.querySelector('.min');
        let sec =document.querySelector('.sec');
    
        hour.innerText =newtimeLHour;
        min.innerText =newtimeLMin;
        sec.innerText =newtimeLsec;

        let p3 =document.querySelector('.p3');
        p3.innerText = '距离下一场还有';

    }
    setInterval(JSClock,1000,sessionTime());








    
}


