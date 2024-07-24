
    function openTab(evt, tabName) {
        var i, tabcontent, tablinks;
        
        // Oculta todos os tabcontent
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        
        // Remove a classe "active" de todos os tablinks
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("active");
        }
        
        // Exibe o tabcontent selecionado e adiciona a classe "active" ao tablink correspondente
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.classList.add("active");
    }

    // Abre a primeira tab por padrão
    document.getElementById("cadastroJogador").style.display = "block";
    document.getElementsByClassName("tablinks")[0].classList.add("active");
