
const siteName=document.querySelector(".sitename");
const siteUrl=document.querySelector(".siteurl");
const submitBtn=document.querySelector(".submitBtn");
const invalidInputs=document.querySelector(".invalid-inputs");
let siteData = [];

if(localStorage.getItem("site") != null) {
    siteData = JSON.parse(localStorage.getItem("site"));
    displayWebsite(siteData);
}


let addSiteUrl = function () {
    let site = {
        name: siteName.value,
        url: "",
    }
    if ( validateName() == true && validateUrl() == true) {
        if(siteUrl.value.includes("https://")) {
            site.url = siteUrl.value;
            console.log("true")
        }
        else {
            site.url = "https://" + siteUrl.value;
            console.log("false");
            console.log(site.url);
        }
        siteData.push(site);
        localStorage.setItem("site",JSON.stringify(siteData));
        displayWebsite(siteData);
    }
    else {
        invalidInputs.classList.replace("d-none","d-block");
    }
    clearInput();
}
function displayWebsite(array) {
    let cartona = ``;
    for (let i=0; i<array.length;i++) {
        cartona += `
            <tr>
                <td>${i+1}</td>
                <td>${siteData[i].name}</td>
                <td><a href="${siteData[i].url}" class="btn btn-warning" target="_blank">visit</a></td>
                <td><button id="deleteBtn" class="btn btn-danger text-capitalize" onclick="deleteWebsite(${i})">delete</button></td>
            </tr>
        `;
    }
    document.querySelector(".tableData").innerHTML = cartona;
}
function clearInput () {
    siteName.value = "";
    siteUrl.value = "";
}
let validateName = function () {
    var regex = /^([a-z]|[0-9]){3,99}$/gi;
    if(regex.test(siteName.value) == true) {
        siteName.classList.remove("invalid");
        document.querySelector("#invalidname").classList.replace("d-block","d-none");
        return true;
    }
    else {
        siteName.classList.add("invalid");
        document.querySelector("#invalidname").classList.replace("d-none","d-block");
        return false;
    }
}
let validateUrl = function () {
    let regex= /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/
    if(regex.test(siteUrl.value) == true) {
        siteUrl.classList.remove("invalid");
        document.querySelector("#invalidurl").classList.replace("d-block","d-none");
        return true;
    }
    else {
        siteUrl.classList.add("invalid");
        document.querySelector("#invalidurl").classList.replace("d-none","d-block");
        return false;
    }
}

function deleteWebsite(index) {
    siteData.splice(index,1);
    localStorage.setItem("site",JSON.stringify(siteData));
    displayWebsite(siteData);
}
function closeDiv() {
    invalidInputs.classList.replace("d-block","d-none");
}

submitBtn.addEventListener("click",addSiteUrl);
siteName.addEventListener("input",validateName);
siteUrl.addEventListener("input",validateUrl);
