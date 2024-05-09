let textbox = document.getElementById('phoneno');
let dropdown = document.getElementById('dropdown');
let whtspp = document.getElementById('whatsapp');
let telgrm = document.getElementById('telegram');
let signal = document.getElementById('signal');
let errord = document.getElementById('error');
let errorh = document.getElementById('error-h4');
let errorp = document.getElementById('error-body');
let countryCodeList = [];

function extFinder(extNum) {
  if (extNum.match(/\d/g) === null) {
    return;
  }
  extNum = '+' + extNum.match(/\d/g).join("");
  let selectIndex = 0;
  let index = (extNum < 5) ? 5 : extNum.length;
  for (index; index >= 2; index--) {
    let r = `^\\${extNum.substring(0, index)}$`;
    if (countryCodeList.findIndex(_strCheck) === -1) { selectIndex = 0; continue; }
    else {
      selectIndex = countryCodeList.findIndex(_strCheck) + 1;
      break;
    }
    function _strCheck(el) {

      return el.match(r);
    }
  }
  dropdown.selectedIndex = selectIndex;
}

function dropdownMake() {
  fetch("./CountryCodes.json")
    .then((res) => res.json())
    .then((data) => {
      // do stuff with the data
      var CountryCodes = JSON.parse(JSON.stringify(data))
      let text = "<option id='no-option' value=''>----Select your country----</option>"
      for (let index in CountryCodes) {
        text += "<option id=" + CountryCodes[index].country.replace(/\s+/g, '-').toLowerCase() + " value=" + CountryCodes[index].code.replace('-', '') + ">" + CountryCodes[index].country + "</option>";
        countryCodeList.push(CountryCodes[index].code.replace('-', ''))
      }
      dropdown.innerHTML = text;
    });
}
function dropdownSelect() {
  var value = dropdown.value;
  // var text = dropdown.options[dropdown.selectedIndex].text;
  // console.log(text)
  textbox.value = (value === '') ? '' : value.slice(1);
}
function handleLink(s){
  errord.classList.add("hide");
  if (textbox.value === '') {
    errorh.innerHTML = "EMPTY FIELD";
    errorp.innerHTML = "No phone number was entered. Please enter one";
    errord.classList.remove("hide");
  }
  else if(textbox.value.match(/\d/g).join("").length < 8){
    errorh.innerHTML = "INVALID PHONE NUMBER";
    errorp.innerHTML = "Phone number received is less than 8 characters, which is invalid";
    errord.classList.remove("hide");
  }
  else{
    let ph = '+'+textbox.value.match(/\d/g).join("");
    if (s === 'w'){
      if (window.confirm('Redirect to WhatsApp?')) {
        window.open('https://wa.me/'+ph,'_blank','noopener');
      }
    }
    else if(s === 't'){
      if (window.confirm('Redirect to Telegram?')) {
        window.open('https://t.me/'+ph,'_blank','noopener');
      }
    }
    else if(s === 's'){
      if (window.confirm('Redirect to Signal?')) {
        window.open('https://signal.me/#p/'+ph,'_blank','noopener');
      }
    }
    else{console.log("NONE")}
  }
}
window.addEventListener("load", (e1) => {
  dropdownMake();
  textbox.addEventListener("paste", (e2) => {
    e2.preventDefault();
    let paste = (e2.clipboardData || window.clipboardData).getData("text");
    textbox.value = paste;
    extFinder(paste);
  });
  textbox.addEventListener("input", (e3) => {
    e3.preventDefault();
    if((textbox.value !== '')&&(textbox.value.match(/\d/g).join("").length > 2)&&(textbox.value.match(/\d/g).join("").length < 5)){
      extFinder(textbox.value);
    }
    else if(textbox.value === ''){
      dropdown.selectedIndex = 0;
    }
  });
  dropdown.addEventListener("change", dropdownSelect);
  telgrm.addEventListener("click", () => {setTimeout(handleLink,1000,'t')},false);
  signal.addEventListener("click", () => {setTimeout(handleLink,1000,'s')},false);
  whtspp.addEventListener("click", () => {setTimeout(handleLink,1000,'w')},false);
});
