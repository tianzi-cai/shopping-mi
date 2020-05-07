function cart2(){
    let checkall =document.querySelector('.checkall');//全选框
    let checks =document.querySelectorAll('.check');//选框
    let number =document.querySelector('.number');//已选择
    let numbersum =document.querySelector('.numbersum');//共几件商品
    let sumall = document.querySelector('.sumall');//合计总金额
    let sums =document.querySelectorAll('.itembox .p5');//小计金额sumall
    let dels =document.querySelectorAll('.itembox .p6 span');//操作
    let nodes = document.querySelectorAll('.itembox');//项目列
    let buylist = document.querySelector('.buylist');//列父元素
    let sumstyle =document.querySelector('.cartsum .p4');//小计金额sumall
    let goodsNums = document.querySelectorAll('.itembox .p4 span .spannum');//数量
    
    
    let num =0;
    let sum =0;
    
    //初始化商品数
    window.onload=function(){
        let sum1 =0;
        goodsNums.forEach(item=>{
            sum1 += parseInt(item.value);
        })
        numbersum.innerText = sum1;
    }
    
    //全选时
    checkall.addEventListener('change',function(e){
        if(e.target.checked){
            //添加类名checked
            checks.forEach((item)=>{
                item.classList.add('checked');
            });
            //全选
            checks.forEach(function(item){
                item.checked =true;
            });
            //已选择商品
            number.innerText =numbersum.innerText;
            // 合计
            sum =0;
            sums.forEach(function(item){
                sum +=parseFloat(item.textContent);
            });
            sumall.innerText =sum.toFixed(2);
            //去结算选框样式
            sumstyle.style.cssText='background-color: #ff6700;color: white;';
        }else{
            //删除类名checked
            checks.forEach((item)=>{
                item.classList.remove('checked');
            });
            //全不选
            checks.forEach(function(item){
                item.checked =false;
            });
            //已选择0件
            num =0;
            number.innerText =num;
            // 合计0
            sum =0;
            sumall.innerText=sum;
            //去结算选框样式
            sumstyle.style.cssText='';
        }
    });
    
    //单选时
    checks.forEach(function(item,index){
        item.addEventListener('change',function(e){
            e.preventDefault();
            if(e.target.checked){
                checks[index].classList.add('checked');
                //单选都选中时，全选，选中
                let allchecked =true;
                for(let i=0;i<checks.length;i++){
                    if(!checks[i].classList.contains('checked')){
                        allchecked =false;
                        break;
                    }
                }
                if(allchecked){
                    checkall.checked = true;
                }
                // 合计
                sumall.innerText =(parseFloat(sumall.textContent) + parseFloat(sums[index].textContent)).toFixed(2);
                //去结算选框样式
                sumstyle.style.cssText='background-color: #ff6700;color: white;';
                //已选
                number.innerText =(parseInt(number.innerText)) + (parseInt(goodsNums[index].value));
            }else{
                checks[index].classList.remove('checked');
                //全选失效
                checkall.checked=false;
                // number.innerText=--num;
                // 合计
                sumall.innerText =(parseFloat(sumall.textContent) - parseFloat(sums[index].textContent)).toFixed(2);
                //去结算选框样式
                if(num==0){
                    sumstyle.style.cssText='';
                }
                //已选
                number.innerText =(parseInt(number.innerText)) - (parseInt(goodsNums[index].value));
            }
        });
    });
    
    // 数量为1时，按钮不可用
    let numMinuss = document.querySelectorAll('.num_minus');
    numMinuss.forEach(item=>{
        item.setAttribute('disabled','true');
    })
    
    function numClick(){
        //数量按钮
        let goodsNums = document.querySelectorAll('.itembox .p4 span .spannum');//数量
        let numPluss = document.querySelectorAll('.num_plus');
        let numMinuss = document.querySelectorAll('.num_minus');
        let sums =document.querySelectorAll('.itembox .p5');//小计金额sums
    
        //+
        numPluss.forEach(function(item,index){
            item.addEventListener('click',function(e){
                e.preventDefault();
                numMinuss[index].removeAttribute('disabled');
    
                // 整个商品元素
                let itemBox = e.target.parentElement.parentElement;
                // 商品数量
                let count =this.previousElementSibling.childNodes[0].value;
                // 商品单价
                let price =itemBox.querySelector('.p3 span');
    
                goodsNums[index].value = (parseInt(count))+1;
                // console.log(goodsNums[index].value);
                sums[index].textContent =((parseInt(count)+1)*(parseFloat(price.textContent))).toFixed(2);
    
                if(checks[index].classList.contains('checked')){
                    sumall.innerText =(parseFloat(sumall.textContent) + parseFloat(price.textContent)).toFixed(2);
                    number.textContent = parseInt(number.textContent)+1;
                }
                numbersum.textContent = parseInt(numbersum.textContent)+1;
    
            });
        });
    
        //-
        numMinuss.forEach(function(item,index){
            item.addEventListener('click',function(e){
                e.preventDefault();
                // 整个商品元素
                let itemBox = e.target.parentElement.parentElement;
                // 商品数量
                let count =this.nextSibling.childNodes[0].value;
                // 商品单价
                let price =itemBox.querySelector('.p3 span');
    
                if(count ==2){
                    item.setAttribute('disabled','true');
                }
                goodsNums[index].value=(parseInt(count))-1;
                sums[index].textContent =((parseInt(count)-1)*(parseFloat(price.textContent))).toFixed(2);
    
                if(checks[index].classList.contains('checked')){
                    sumall.innerText =(parseFloat(sumall.textContent) - parseFloat(price.textContent)).toFixed(2);
                    // 已选
                    number.textContent = parseInt(number.textContent)-1;
                }
                // 共计
                numbersum.textContent = parseInt(numbersum.textContent)-1;
            });
        });
        
        //直接修改数量
        let spannums = document.querySelectorAll('.spannum');
        spannums.forEach((item,index)=>{
            item.addEventListener('blur',function(e){
                e.preventDefault();
                // 整个商品元素
                let itemBox = e.target.parentElement.parentElement.parentElement;
        
                //商品单价
                let price =parseFloat (itemBox.querySelector('.p3 span').innerText);
                
                // 旧商品数量
                let oldnum =parseInt(parseFloat(sums[index].textContent)/price);
                let oldpriceall = oldnum *price;
    
                //商品数量
                let newnum = this.value.trim();
                let newnum1 =parseInt(newnum);
                //如果为小数，取整输出文本框
                e.target.value = newnum1;
                // 验证输入合法性
                if(isNaN(newnum1)){
                    alert("商品数量只能输入数字");
                    e.target.value = oldnum;
                    newnum1 = oldnum;
                    return;
                }
    
    
                // 小计
                sums[index].textContent =(newnum1*price).toFixed(2);
    
                // 已选
                if(checks[index].classList.contains('checked')){
                    sumall.innerText =(parseFloat(sumall.textContent) -oldpriceall +parseFloat(sums[index].textContent)).toFixed(2);
                    number.textContent = parseInt(number.textContent)-oldnum +newnum1;
                }
                // 共计
                numbersum.textContent = parseInt(numbersum.textContent)-oldnum +newnum1;
        
            });
    
        });
    
    }
    numClick();
    
    //删除
    dels.forEach((item,index)=>{
        item.onclick =function(e){
            e.preventDefault();
    
            // 用户确定是否删除
            let mask =document.querySelector('.mask');
            mask.style = 'display:block';
    
            // X,取消，确认
            let closePopup =document.querySelector('.close-popup');
            let popupFalse =document.querySelector('.popup-false');
            let popupTrue =document.querySelector('.popup-true');
    
            closePopup.onclick =function(){
                mask.style = 'display:none';
            };
            popupFalse.onclick =function(){
                mask.style = 'display:none';
            };
            mask.onclick =function(){
                mask.style = 'display:none';
            }
    
            popupTrue.onclick =function(){
                
                let len2 =parseInt(numbersum.innerText);
                let buylist = e.target.parentElement.parentElement.parentElement;
                let itemBox = e.target.parentElement.parentElement;
        
                // 当前商品数量
                let count1 =parseInt(goodsNums[index].value);
                
                //总商品件数变化
                numbersum.innerText = len2 - count1;
        
                // 已选择商品是否变化
                // 合计金额是否变化
                if(checks[index].classList.contains('checked')){
                    number.innerText = parseInt(number.innerText) -count1;
                    sumall.innerText =(parseFloat(sumall.textContent) - parseFloat(sums[index].textContent)).toFixed(2);
                }
                // 现存选框是否为全选状态
                if(number.innerText==numbersum.innerText){
                    checkall.checked = true;
                }
    
                // 购物车商品全部删除后，购物车清空
                if((numbersum.innerText) ==0){
                    let listhead = document.querySelector('.listhead');
                    let cartsum  = document.querySelector('.cartsum');
                    buylist.removeChild(listhead);
                    buylist.removeChild(cartsum);
                    buylist.removeChild(checkall);
                    //未选购任何商品
                }
                console.log(itemBox);
                buylist.removeChild(itemBox);
                mask.style = 'display:none';
            };
        };
    });

}
cart2();




// 加入购物车的代码实现
let joincarts = document.querySelectorAll('.joincart');
joincarts.forEach((item)=>{
    item.onclick = function(){
        let listhead = document.querySelector('.listhead');
        // 创建itembox的div+class
        let newdivprocut = document.createElement('div');
        newdivprocut.setAttribute('class','itembox');
        newdivprocut.classList.add('iconfont');

        newdivprocut.innerHTML =`
            <input type="checkbox" name="" id="" class="check">
            <p class="p1"><img src="img/cart3.jpg" alt=""></p>
            <p class="p2">小米小背包 浅粉色 10L</p>
            <p class="p3"><span>29</span>元</p>
            <p class="p4">
                <button class="num_minus">-</button><span><input type="text"  value="1" class="spannum"></span><button class="num_plus">+</button>
            </p>
            <p class="p5">29</p>
            <p class="p6"><span>&#xe72d;</span></p>
        `;

        // 在第一行添加新加入购物车的商品
        $(newdivprocut).insertAfter($(listhead));
        cart2();
    }
});




//无遮罩层删除
// dels.forEach((item,index)=>{
//     item.addEventListener('click',function(e){
//         e.preventDefault();

//         let len2 =parseInt(numbersum.innerText);
//         let buylist = e.target.parentElement.parentElement.parentElement;
//         let itemBox = e.target.parentElement.parentElement;

//         // 当前商品数量
//         let count1 =parseInt(goodsNums[index].textContent);
//         console.log(count1);
//         console.log(buylist);
//         console.log(itemBox);
//         //总商品件数变化
//         numbersum.innerText = len2 - count1;

//         // 已选择商品是否变化
//         // 合计金额是否变化
//         if(checks[index].classList.contains('checked')){
//             number.innerText = parseInt(number.innerText) -count1;
//             sumall.innerText =(parseFloat(sumall.textContent) - parseFloat(sums[index].textContent)).toFixed(2);
//         }

//         if((numbersum.innerText) ==0){
//             let listhead = document.querySelector('.listhead');
//             let cartsum  = document.querySelector('.cartsum');
//             buylist.removeChild(listhead);
//             buylist.removeChild(cartsum);
//             buylist.removeChild(checkall);
//             //未选购任何商品
//         }
//         buylist.removeChild(itemBox);
//         // itemBox.remove();
//         mask.style = 'display:none';
//     });
// });


