function criaEvento() {
  
  event.preventDefault();

  const url1 = 'https://jogadordealuguel.azurewebsites.net/api/evento';

  let cidade = document.querySelector("#inputCidade").value;
  let bairro = document.querySelector("#inputBairro").value;
  let horario = document.querySelector("#inputHorario").value;
  let duracao = document.querySelector("#inputDuracao").value;
  let descricao = document.querySelector("#inputDescricao").value;
  let posicao = document.querySelector("#inputPosicao").value;

  let data = {
    Id_Usuario: localStorage.getItem("idConta"),
    Horario: horario,
    Duracao: duracao,
    Posicao: posicao,
    Bairro: bairro,
    Cidade: cidade,
    Descricao: descricao
  };

  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch(url1, options)
      .then(response => {
        if (response.status >= 400) {
          response.json().then(data => {
            alert(data.message);
          });
        }
        if (response.status  == 200) {
          alert("Evento criado com sucesso!");
          window.location.reload();
        }
      }).catch(error => {
        alert("Erro no servidor. Aguarde!");
        window.location.href = "UsuarioEventoDados.html";
      });
}

function posicaoString(posicaoNum) {
  if (posicaoNum == 1) return 'Goleiro';
  if (posicaoNum == 2) return 'Defesa';
  if (posicaoNum == 3) return 'Ataque';
}

function buscaEvento() {
  
  document.getElementById("criarButton").disabled = false;

  event.preventDefault();

  const idUsuario = localStorage.getItem("idConta");
  const url1 = "https://jogadordealuguel.azurewebsites.net/api/evento/" + idUsuario;


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
      criaEventoHtml(data)
    )
    .catch(error =>
      console.log(error)
    );
}

function criaEventoHtml(response) {

  if (response != 0) {   
    document.getElementById("criarButton").disabled = true;

    var jogador = response.Nome_Jogador;
    if (jogador == null){
      jogador = "Procurando..."
    }

    var data = response.horario;
    data = data.toString();

    const eventoHtml = document.querySelector(".right");
    eventoHtml.innerHTML = "";

    eventoHtml.innerHTML = `
            <p id="p1">Visualize aqui os eventos</p>
            <div class="evento">
                <div class="evento1">
                    <h3>Evento nº ${response.id} - Futebol</h3>
                </div>
                <div class="eventoFlex">
                <div class="evento2">
                    <span style="font-size: 22px;">Descrição</span>
                    <br/>
                    <i  style="font-size: 17px;"><wbr id="wbr">${response.descricao}</wbr></i>
                    <br /><br/>
                    <p style="font-size: 22px;">Localização: ${response.bairro}, ${response.cidade}</p>
                    <p style="font-size: 22px;">Data: ${data.substring(8, 10)}/${data.substring(5, 7)}/${data.substring(0, 4)} às ${data.substring(11, 16)}</p>
                    <p style="font-size: 22px;">Duração: ${response.Duracao} minutos</p>
                </div>
                <div class="evento3">
                    <p style="font-size: 22px;">Jogador: ${jogador}</p>
                    <p style="font-size: 22px;">Posição: ${posicaoString(response.posicao)}</p>
                    <p style="font-size: 22px;">Custo: R$ ${response.custo}</p>
                </div>
            </div>
                <div class="evento4">
                    <button style="background-color: #60A917; height: 45px; margin-right: 10px;">CONFIRMAR EVENTO</button>
                    <button style="background-color: #f44336; height: 45px;" onclick="cancelar()">CANCELAR EVENTO</button>
                </div>
            </div>`;
  }
}

function cancelar() {
  const idUsuario = localStorage.getItem("idConta");
  const url1 = 'https://jogadordealuguel.azurewebsites.net/api/evento/usuario/cancelar/' + idUsuario;

  fetch(url1)
    .then(response => {
      if (response.status == 204) {
        alert("Evento cancelado com sucesso!");
        window.location.reload();
      }
      else {
        alert("Falha ao tentar cancelar escalação!");
        window.location.href = "UsuarioEventoDados.html";
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
  window.location.href = "index.html";
}

