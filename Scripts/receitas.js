window.onload = principal;

function principal() {
    document.querySelector("#btnPesquisa").addEventListener("click", function () {
        if (document.querySelector(".info").innerHTML != ""){
            document.querySelector(".info").innerHTML = "";
        }
        var conteudo = document.querySelector("#pesquisa").value;
        mandarReq("https://www.shopb.com.br/buscar?q=" + conteudo, raspSite);
    });
}

function raspSite(documento) {
    var divSite = documento.querySelectorAll(".listagem-item");
    var minhaDiv = document.querySelector(".info");
    var cont = 0;
    divSite.forEach(df => {
        if (cont != 6) {
            minhaDiv.appendChild(df);
            cont = cont + 1;
        }
    });
}

function mandarReq(site, rasp) {
    fetch(site)
        .then(resp => resp.text())
        .then(str => {
            var domp = new DOMParser();
            var documento = domp.parseFromString(str, "text/html");
            rasp(documento);
        })
        .catch(e => document.write(e));
}