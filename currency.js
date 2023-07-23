const dropList=document.querySelectorAll(".converter select"),
fromCurrency=document.querySelector(".col1 select"),
fromCurrencyImg=document.querySelector(".col1 img"),
toCurrency=document.querySelector(".col2 select"),
toCurrencyImg=document.querySelector(".col2 img"),
result=document.querySelector(".result p"),
icon=document.querySelector(".icon i")
button=document.querySelector('.result-btn button');





for(let i=0;i<dropList.length;i++){
    for(currency_code in country_code){
         let selected;
        if(i==0){
          selected= currency_code=="USD" ? "selected" : "";
          fromCurrencyImg.src=`https://flagsapi.com/US/flat/64.png`
        }else if(i==1){
            selected= currency_code=="INR" ? "selected" : "";
            toCurrencyImg.src=`https://flagsapi.com/IN/flat/64.png`
        }
        
        let option=`<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend",option);
    }

    dropList[i].addEventListener("change",e=>{
        loadImg(e.target);
    })

}
icon.addEventListener("click",()=>{
    let temp=fromCurrency.value;
    fromCurrency.value=toCurrency.value;
    toCurrency.value=temp;
    getExchangeRate();
    loadImg(fromCurrency);
    loadImg(toCurrency);
})

function loadImg(item){
    for(code in country_code){
        if(code==item.value){
        let img=item.parentElement.querySelector("img");
         img.src=`https://flagsapi.com/${country_code[code]}/flat/64.png`
        }
    }
}

button.addEventListener('click',e=>{
    e.preventDefault();
    getExchangeRate();
})

document.addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        getExchangeRate();
    }
})


async function  getExchangeRate()
{
    const input=document.querySelector("#input")
    const amount=input.value;
   
   
  let pattern=/[a-z A-Z]{1,8}/
  

    
    if(amount.match(pattern) || amount==""||amount=="0" ){
        alert("Enter valid amount");
    }
    else{
    result.innerHTML="getting exchange rate..."
    let url=`https://v6.exchangerate-api.com/v6/11dccb4d8fdba42be666e2d5/latest/${fromCurrency.value}`;
    let response= await fetch(url);
    let data=await response.json();
    let exChangeRate=(amount*(data.conversion_rates[toCurrency.value])).toFixed(2);
    
    result.innerHTML=`${amount} ${fromCurrency.value} = ${exChangeRate} ${toCurrency.value}`
    }


}








































