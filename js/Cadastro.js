document.querySelector('#formUsuario').addEventListener('submit', (e) => {

  e.preventDefault();

  const url = "https://jogadordealuguel.azurewebsites.net/api/usuario/cadastro";

  const telefoneMask = document.querySelector("#inputTelefone1").value;
  const cpfMask = document.querySelector("#inputCpf1").value;

  const nome = document.querySelector("#inputNome1").value;
  const email = document.querySelector("#inputEmail1").value;
  //const cidade = document.querySelector("#inputCidade").value;
  //const bairro = document.querySelector("#inputBairro").value;
  const senha = document.querySelector("#inputSenha1").value;
  //const posicao = document.querySelector("#selectPosicao").value;

  let cpf = cpfMask.replace(/\D/g, '');
  let telefone = telefoneMask.replace(/\D/g, '');

  let data = {
    Id: null,
    Email: email,
    Telefone: telefone,
    CPF: cpf,
    Nome: nome,
    Senha: senha,
    Cidade: 'default',
    Bairro: 'default',
    Nivel: null,
    DataCriacao: null
  };

  console.log(data);
  console.log(url);


  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  

  fetch(url, options)
    .then(response => {
      if (response.status >= 400) {
        response.json().then(data => {
          alert(data.message);
        });
      }
      if (response.status >= 200 && response.status < 300) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html";
      }
    }).catch(error => {
      alert("Erro no servidor. Aguarde!");
      window.location.href = "cadastro.html";
    });
});

document.querySelector('#formJogador').addEventListener('submit', (e) => {

  e.preventDefault();

  const url = "https://jogadordealuguel.azurewebsites.net/api/jogador/cadastro";

  const telefoneMask = document.querySelector("#inputTelefone2").value;
  const cpfMask = document.querySelector("#inputCpf2").value;

  const nome = document.querySelector("#inputNome").value;
  const email = document.querySelector("#inputEmail").value;
  //const cidade = document.querySelector("#inputCidade").value;
 //const bairro = document.querySelector("#inputBairro").value;
  const senha = document.querySelector("#inputSenha").value
  const posicao = document.querySelector("#selectPosicao").value;

  let cpf = cpfMask.replace(/\D/g, '');
  let telefone = telefoneMask.replace(/\D/g, '');

  if (posicao != "0") {
    let data = {
      Id: null,
      Email: email,
      Telefone: telefone,
      CPF: cpf,
      Posicao: posicao,
      Nome: nome,
      Senha: senha,
      Cidade: 'default',
      Bairro: 'default',
      Nivel: null,
      DataCriacao: null
    };

    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(url, options)
      .then(response => {
        if (response.status >= 400) {
          response.json().then(data => {
            alert(data.message);
          });
        }
        if (response.status >= 200 && response.status < 300) {
          alert("Cadastro realizado com sucesso!");
          window.location.href = "login.html";
        }
      }).catch(error => {
        alert("Erro no servidor. Aguarde!");
        window.location.href = "cadastro.html";
      });
  }
  if (posicao == "0") {
    alert("Selecione uma posição válida!");
  }
});