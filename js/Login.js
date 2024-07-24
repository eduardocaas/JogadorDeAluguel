document.querySelector('form').addEventListener('submit', (e) => {

  e.preventDefault();

  const url1 = 'https://jogadordealuguel.azurewebsites.net/api/usuario/login';
  const url2 = 'https://jogadordealuguel.azurewebsites.net/api/jogador/login';
  const url3 = 'http://192.168.0.92:5240/api/usuario/login';
  const url4 = 'http://192.168.0.92:5240/api/jogador/login';


  let conta = document.getElementById("idConta").value;

  let email = document.querySelector("#inputEmail").value;
  let senha = document.querySelector("#inputSenha").value;

  if (email !== "" && senha !== "") {

      let data = {
          Email: email,
          Senha: senha
      };

      const options = {
          method: 'POST',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      };

      if (conta === "usuario") {
          fetch(url1, options)
              .then(response => {
                  if (response.status >= 400) {
                      response.json().then(data => {
                          alert(data.message);
                          window.location.href = "login.html";
                      });
                  }
                  if (response.ok) {
                      response.json().then(data => {
                          localStorage.setItem("idConta", data.Id);
                          localStorage.setItem("emailConta", data.Email);
                          alert("\t Login realizado com sucesso! \n\t Redirecionando para próxima página.");
                          window.location.href = "UsuarioEventoDados.html";
                      })
                  }
              }).catch(error => {
                  alert("Erro no servidor. Aguarde!");
                  window.location.href = "login.html";
          });
      }

      if (conta === "jogador") {
          fetch(url2, options)
              .then(response => {
                  if (response.status >= 400) {
                      response.json().then(data => {
                          alert(data.message);
                          window.location.href = "login.html";
                      });
                  }
                  if (response.ok) {
                      response.json().then(data => {
                          localStorage.setItem("idConta", data.Id);
                          localStorage.setItem("emailConta", data.Email);
                          alert("Login realizado com sucesso! \nRedirecionando para próxima página.");
                          window.location.href = "JogadorEscalado.html";
                      })
                  }
              }).catch(error => {
              alert("Erro no servidor. Aguarde!");
              window.location.href = "login.html";
          });
      }
  }
});
