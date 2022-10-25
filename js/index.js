const url = "https://disk.yandex.ru/d/5LhR98ew38hHUA";

var request = new XMLHttpRequest();

request.open('GET', "https://cloud-api.yandex.net/v1/disk/public/resources/?public_key=" + url);
request.send();
request.onload = function () {
    var data = JSON.parse(request.responseText)._embedded.items;

    var section = document.getElementById("page1");

    data.forEach(element => {
        let a = document.createElement("a");
        a.className = "download-page1";
        a.href = element.file;
        a.innerText = element.name.replace(new RegExp("(\.zip||\.rar||\.pdf)$"), '');;
        section.appendChild(a);
    });
};