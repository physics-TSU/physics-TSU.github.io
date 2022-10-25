const url = "https://disk.yandex.ru/d/5LhR98ew38hHUA";

var getNamesFile = new XMLHttpRequest();

getNamesFile.open('GET', "https://cloud-api.yandex.net/v1/disk/public/resources/?public_key=" + url + "&path=/names.txt");
getNamesFile.send();
getNamesFile.onload = function () {
    if (getNamesFile.status != 200) return;
    var Names = JSON.parse(getNamesFile.responseText);
    var requestNamesFile = new XMLHttpRequest();

    requestNamesFile.open('GET', Names.file);
    requestNamesFile.send();

    requestNamesFile.onload = function () {

        var labels = JSON.parse(requestNamesFile.responseText).data;

        var request = new XMLHttpRequest();

        request.open('GET', "https://cloud-api.yandex.net/v1/disk/public/resources/?public_key=" + url);
        request.send();
        request.onload = function () {
            var data = JSON.parse(request.responseText)._embedded.items;

            var section = document.getElementById("page1");

            data.forEach(element => {
                if (element.name != "names.txt") {
                    let a = document.createElement("a");
                    a.className = "download-page1";
                    a.href = element.file;
                    a.innerText = (labels.find(el => el.file_name == element.name)?.label ?? element.name);
                    section.appendChild(a);
                }
            });
        }
    }
};



