const nation = {
//    "AED" : "아랍에미리트",
//    "AFN": "아프가니스탄",
//   "ARS": "아르헨티나",
//   "AUD": "호주",
//   "AWG": "아루바 플로린",
//   "AZN": "아제르 바이잔",
//   "BAM": "보스니아",
//   "BBD": "루마니아",
//   "BDT": "방글라데시",
//   "BGN": "불가리아",
//   "BHD": "바레인",
//   "BOB": "볼리비아 볼리비아노",
//   "BRL": "브라질",
//   "BTN": "부탄",
//   "CAD": "캐나다",
//   "CDF": "콩고",
//   "CHF": "스위스",
//   "CLP": "칠레",
//   "CNY": "중국",
//   "COP": "콜롬비아",
//   "CUC": "쿠바",
//   "CZK": "체코",
//   "DKK": "덴마크",
//   "DOP": "도미니카",
//   "EGP": "이집트",
//   "EUR": "유럽연합",
//   "GBP": "영국",
//   "GEL": "조지아",
//   "HKD": "홍콩",
//   "HUF": "헝가리",
//   "IDR": "인도네시아",
//   "ILS": "이스라엘",
//   "INR": "인도",
//   "IRR": "이란",
//   "JOD": "요르단",
    "JPY": "일본",
//    "KHR": "캄보디아",
//    "KPW": "조선인민공화국",
    "KRW": "대한민국",
//    "KWD": "쿠웨이트",
//    "KZT": "카자흐스탄",
//    "LBP": "레바논",
//    "LKR": "스리랑카",
//    "MGA": "마다가스카르",
//    "MKD": "북마케도니아",
//    "MNT": "몽골",
//    "MOP": "마카오",
//    "MXN": "멕시코",
//    "MYR": "말레이시아",
//    "NOK": "노르웨이",
//    "NPR": "네팔",
//    "NZD": "뉴질랜드",
//    "OMR": "오만",
//    "PEN": "페루",
//    "PGK": "파푸아뉴기니",
    "PHP": "필리핀",
//    "PKR": "파키스탄",
//    "PLN": "폴란드",
//    "QAR": "카타르",
//    "RUB": "러시아",
//    "RWF": "르완다",
//    "SAR": "사우디아라비아",
//    "SBD": "솔라몬 제도",
//    "SEK": "스웨덴",
//    "SGD": "싱가포르",
//    "SRD": "수리남",
//    "THB": "태국",
//    "TRY": "터키",
//    "TWD": "대만",
//    "UAH": "우크라이나",
//    "USD": "미국",
//    "UZS": "우즈베키스탄",
//    "VEF": "베네수엘라",
//    "VND": "베트남",
//    "ZAR": "남아공",
//    "ZMK": "잠비아"
}

const selectBox = document.getElementById("nation");

createSelectOption();

document.getElementById("submit").addEventListener("click", () => {
    changeCurrency();
})

function createSelectOption() {
    for (let key in nation) {
        let option = document.createElement("option");
        option.text = nation[key];
        option.setAttribute("class", "nationOption")
        option.setAttribute("value", key);
        selectBox.append(option);
    }
    changeCurrency();
}

function changeCurrency() {
    let insertCurrency = selectBox.options[selectBox.selectedIndex].value;
    let insertMoney = document.getElementById("money").value;

    $.ajax({
        type : "POST",
        url : "/test/ajax",
        data : {
            "insertCurrency" : insertCurrency,
            "insertMoney" : insertMoney
        },
        success : function(data){
            document.getElementById("result").innerText = "";
            document.getElementById("result").innerText = "수취금액은" + data.changeMoney + " " + insertCurrency + "입니다";
            document.getElementById("currency").innerText = "";
            document.getElementById("currency").innerText = data.basicCurrency + " " + insertCurrency + "/USD" ;
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
        }
    });
}
