// Request via JavaScript ajax 4 passos


// 01 - criar a variável
xhttp = new XMLHttpRequest();
var lista;
var api = "http://danvolles-prj-java.herokuapp.com/api/usuario/";


// ---- FUNÇÃO LISTAR
        function listar () {
            // 02 - Definiçõa do nosso request endereço e forma
            xhttp.open("GET", api);
            
            // 03 - Manda de fato a request
            xhttp.send();
            
            // 04 - execução quando tiver a devolutiva do request
            xhttp.onload = function(){
                lista = this.responseText;
                lista = JSON.parse(lista);
                console.log(lista);
                
                texto = "";
                i = 0;
                for (const u of lista) {
                    texto += `
                    <tr onclick='editar(${i})'>
                        <td>${u.nome}</td>
                        <td>${u.email}</td>
                    </tr>`
                    i++;
                }
                document.getElementById('lista').innerHTML = texto;
            }
        }


// ---- FUNÇÃO EDITAR
        function editar(i) {
            u = lista[i];
            document.getElementById("nome").value = u.nome;
            document.getElementById("email").value = u.email;
            document.getElementById("id").value = u.id;
        }


// ---- FUNÇÃO GRAVAR
        function gravar(){
            
            var usuario = {};
            usuario.nome = document.getElementById("nome").value;
            usuario.email = document.getElementById("email").value;
            
            //console.log(usuario);
            usuario.id = document.getElementById("id").value;
            if (usuario.id > 0) {
                metodo = "PUT"; // ATUALIZAR
            } else {
                metodo = "POST"; // INCLUR
            }

            xhttp.open("POST", api)
            xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8")

            xhttp.send(JSON.stringify(usuario));
            xhttp.onload = function(){
                console.log(this.responseText);
                listar();
                limpar();
            }
        }


// ---- FUNÇÃO LIMPAR
        function limpar() {
            document.getElementById("nome").value = "";
            document.getElementById("email").value = "";
            document.getElementById("id").value = "";
        }


// ---- FUNÇÃO APAGAR
        function apagar(){
            id = document.getElementById("id").value;
            xhttp.open("DELETE", api + id);
            xhttp.send();
            xhttp.onload = function () {
                alert(this.responseText);
                listar();
                limpar();
            }
        }

listar();