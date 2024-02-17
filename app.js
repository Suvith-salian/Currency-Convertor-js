const Base_url =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const selects = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of selects) {
  for (currCode in countryList) {
    let newopt = document.createElement("option");
    newopt.innerText = currCode;
    newopt.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newopt.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newopt.selected = "selected";
    }
    select.append(newopt);
  }
  select.addEventListener("change",(evt)=>{
    updateflag(evt.target);//target gives the element where change takes place.
  });
}
//to change flag acc to option selected(currCode)
const updateflag=(element)=>{
    let currCode =element.value;
    let countryCode= countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newsrc;
}
const updateExchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
    let amtValue=amount.value;
    if(amtValue==="" || amtValue<=0){
        amtValue=1;
        amount.value=1;
    }
    let url=`${Base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data= await response.json();
    console.log(data);
    let rate= data[toCurr.value.toLowerCase()];
    console.log(rate);
    console.log(amtValue);
    let finalAmt=amtValue*rate; 
    console.log(finalAmt);
    msg.innerText=`${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})
window.addEventListener("load",()=>{
 updateExchangeRate();
});