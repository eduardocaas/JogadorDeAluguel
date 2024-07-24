function buscaEventos() {

  event.preventDefault();

  const url1 = 'https://jogadordealuguel.azurewebsites.net/api/evento/jogador';
  const url2 = 'http://192.168.0.92:5240/api/evento/jogador';

  let posicao = document.getElementById("inputPosicao").value;
  let cidade = document.getElementById("inputCidade").value;

  if (posicao != "" && cidade != "") {

    fetch(url1 + '?' + new URLSearchParams({
      posicao: posicao,
      cidade: cidade
    }).toString())
      .then(response => {
        if (response.status == 204) {
          alert(`Nenhum evento encontrado para a posição ${posicaoString(posicao)} em ${cidade}`);
        }
        return response.json()
      })
      .then(data =>
        criaListaHtml(data)
      )
      .catch(error =>
        console.log(error)
      );
  }
}

function criaListaHtml(eventos) {
  console.log(eventos);
  

  
  const eventosHtml = document.querySelector(".eventosFlex");  
  eventosHtml.innerHTML = "";
  eventos.forEach(evento => {

    var data = evento.horario;
    data = data.toString(); 

    eventosHtml.innerHTML +=
      `<div class="eventoFlex">
                <div id="eventoFlex1">
                    <h3>Evento nº ${evento.id_evento} - Futebol</h3>
                    <span>Usuário: ${evento.nome_usuario}</span>
                    <br><br>
                    <wbr id="wbr">${evento.descricao}</wbr>
                </div>
                <div>
                    <span>Posição: ${posicaoString(evento.posicao)}</span>
                    <p>Valor: R$ ${evento.custo}</p>
                    <br>
                    <span>Localização: ${evento.bairro}, ${evento.cidade}</span>
                    <p>Data: ${data.substring(8, 10)}/${data.substring(5, 7)}/${data.substring(0, 4)} às ${data.substring(11, 16)} Duração: ${evento.duracao_minutos} minutos</p>
                </div>
                <div class="eventoFlexButtons">
                    <button class="eventoFlexButton" style="background-color: #60A917"; onclick="escalar(${localStorage.getItem("idConta")}, ${evento.id_evento})">ESCALAR</button>
                    <br>
                    <button class="eventoFlexButton" style="background-color: #1BA1E2;" onclick="window.open('https://wa.me/442087599036', '_blank');">MENSAGEM</button>
                </div>
            </div>`

  });
}

function posicaoString(posicaoNum) {
  if (posicaoNum == 1) return 'Goleiro';
  if (posicaoNum == 2) return 'Defesa';
  if (posicaoNum == 3) return 'Ataque';
}

function buscaEscalado() {

  document.getElementById("buttonBuscar").disabled = false;
  document.getElementById("inputPosicao").disabled = false;
  document.getElementById("inputCidade").disabled = false;

  event.preventDefault();

  var id = localStorage.getItem("idConta");

  const url1 = 'https://jogadordealuguel.azurewebsites.net/api/evento/jogador/' + id;
  const url2 = 'http://192.168.0.92:5240/api/evento/jogador/' + id;

  fetch(url1)
    .then(response => {
      if (response.status == 200) {
        return response.json()
      }
      else {
        return 0;
      }
    })
    .then(data => 
      criaEscaladoHtml(data)
    )
    .catch(error =>
      console.log(error)
    );
}

function criaEscaladoHtml(response) {
  if (response != 0)
  {
    document.getElementById("buttonBuscar").disabled = true;
    document.getElementById("inputPosicao").disabled = true;
    document.getElementById("inputCidade").disabled = true;
  
    var data = response.horario;
    data = data.toString();
  
    const eventosHtml = document.querySelector(".eventosFlex");
    eventosHtml.innerHTML = "";
  
    eventosHtml.innerHTML =
      `<div class="eventoFlex">
        <div id="eventoFlex1">
            <h3>Evento nº ${response.id_evento} - Futebol</h3>
            <span>Usuário: ${response.nome_usuario}</span>
            <br><br>
            <wbr id="wbr">${response.descricao}</wbr>
        </div>
        <div>
            <span>Posição: ${posicaoString(response.posicao)}</span>
            <p>Valor: R$ ${response.custo}</p>
            <br>
            <span>Localização: ${response.bairro}, ${response.cidade}</span>
            <p>Data: ${data.substring(8, 10)}/${data.substring(5, 7)}/${data.substring(0, 4)} às ${data.substring(11, 16)} Duração: ${response.duracao_minutos} minutos</p>
        </div>
        <div class="eventoFlexButtons" style="justify-content: flex-start;">
            <button class="eventoFlexButton" style="background-color: #ffffff; color: black; border: solid black; height: 45px;" disabled>ESCALADO</button>
            <br>
            <button class="eventoFlexButton" style="background-color: #f44336; height: 45px;" onclick="cancelar()">CANCELAR</button>
            <br>
            <button class="eventoFlexButton" style="background-color: #60A917; height: 45px;">CONFIRMAR</button>
        </div>
      </div>`
  }
}

function escalar(idJogador, idEvento) {
  if (idJogador == 0 || idEvento == 0) {
    alert("Erro ao escalar");
  }

  else {
    const url1 = 'https://jogadordealuguel.azurewebsites.net/api/evento/jogador/' + idJogador + "/" + idEvento;
    const url2 = 'http://192.168.0.92:5240/api/evento/jogador/' + idJogador + "/" + idEvento;
    console.log(url1);
    fetch(url1)
    .then(response => {
      if (response.status == 200) {
        alert("Escalado com sucesso!");
        window.location.reload();
      }
      else {
        alert("Falha ao tentar escalar!");
        window.location.href = "JogadorEscalado.html";
      }
    })
    .catch(error =>
      console.log(error)
    );
  }
}

function cancelar() {

  const idJogador = localStorage.getItem("idConta");
  const url1 = 'https://jogadordealuguel.azurewebsites.net/api/evento/jogador/cancelar/' + idJogador;

  fetch(url1)
    .then(response => {
      if (response.status == 204) {
        alert("Escalação cancelada com sucesso!");
        window.location.reload();
      }
      else {
        alert("Falha ao tentar cancelar escalação!");
        window.location.href = "JogadorEscalado.html";
      }
    })
    .catch(error =>
      console.log(error)
    );
}

function logout() {
  localStorage.setItem("idConta", null);
  localStorage.setItem("emailConta", null);
  alert("Logout realizado com sucesso! \nRedirecionando para tela Home");
  window.location.href = "home.html";
}