window.onload = principal;

function principal() {
    document.querySelector("#btnPesquisa").addEventListener("click", function () {
        var conteudo = document.querySelector("#pesquisa").value;
        mandarReq("https://cors-anywhere.herokuapp.com/https://br.ign.com/se/?model=&q=" + conteudo, raspSite);
    });
}

function raspSite(documento) {
    var divSite = documento.querySelectorAll(".article");
    var minhaDiv = document.querySelector(".info");
    var cont = 0;
    divSite.forEach(df => {
        if (cont != 6) {
            minhaDiv.appendChild(df);
            cont = cont + 1;
        }
    });

    var tagA = documento.querySelectorAll(".thumbnail a");
    var cont2 = 0;
    tagA.forEach(link => {
        if (cont2 != 4) {
            var pegaLink = document.createElement('div');
            pegaLink.innerHTML = link.href;
            minhaDiv.appendChild(pegaLink);
            cont2 = cont2 + 1;
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