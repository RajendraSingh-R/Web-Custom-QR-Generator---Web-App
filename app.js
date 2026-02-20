let divinput = document.querySelector(".inputs");
let heading = document.querySelector("h1");
let button = document.querySelector(".btn");
let colorInput = document.querySelector("#color");
let image = document.querySelector("#QR-Image");
let input = document.querySelector(".user-url");

let downbtn = document.querySelector(".down-btn");
let loader = document.querySelector(".loader");




function getRGB(){
     let rgb;
             let hexCode = colorInput.value;
             let r  = parseInt(hexCode.substring(1,3), 16);
             let g = parseInt(hexCode.substring(3,5), 16);
             let b = parseInt(hexCode.substring(5,7) , 16);
             rgb  = `${r}-${g}-${b}`;
    return rgb;
}


button.addEventListener("click" , async () => {
    let inpVal = input.value;
    if(inpVal == ''){
       let sms = document.createElement("p");
       sms.innerText = "Please Enter URL To Generate QR-Code";
       sms.style.display = "flex";
   divinput.appendChild(sms);
       setTimeout(() => {
           sms.style.display = "none";
       }, 2000);
    }else{
        let rgbVal = getRGB();
        loader.style.display = "flex";
        let imgUrl =  await getQR(inpVal , rgbVal);
                loader.style.display = "none";

        image.setAttribute("src" , imgUrl);
        downbtn.style.display = "block";
    }
})

async function getQR(inputVal , rgbVal) {
    try{
        let apiUrl = `http://api.qrserver.com/v1/create-qr-code/?data=${inputVal}&size=1000x1000&color=${rgbVal}`
        let res = await axios.get(apiUrl , {responseType: 'blob'});
        let link = URL.createObjectURL(res.data);

downbtn.addEventListener("click" , () => {
      // 3. Create a hidden link and click it to trigger the system download
        const l = document.createElement('a');
        l.href = link;
        l.download = 'QR-Code.png'; // The filename that will save to your local system
        document.body.appendChild(l);
        l.click();
        
        // 4. Cleanup
        document.body.removeChild(l);
        window.URL.revokeObjectURL(link);
})
        return link;
    }
    catch(error){
        console.log("Error = " , error);
    }
}
