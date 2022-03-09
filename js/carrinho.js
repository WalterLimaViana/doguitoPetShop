const itens = [
    {
        id: 0,
        nome: 'Racão 3kg PSD Sabor Salmão',
        img: '../assets/img/pets-food-bag-mockup-leaned.jpg',
        preco: 'R$50,00',
        quantidade: 0
    },
    {
        id: 1,
        nome: 'Racão 3kg PSD Sabor Cordeiro',
        img: '../assets/img/pets-food-bag-mockup-leaned.jpg',
        preco: 'R$50,00',
        quantidade: 0
    },
    {
        id: 2,
        nome: 'Racão 3kg PSD Sabor Carne',
        img: '../assets/img/pets-food-bag-mockup-leaned.jpg',
        preco: 'R$50,00',
        quantidade: 0
    },
    {
        id: 3,
        nome: 'Racão 3kg PSD Sabor Salmão',
        img: '../assets/img/pets-food-bag-mockup-leaned.jpg',
        preco: 'R$50,00',
        quantidade: 0
    },
    {
        id: 4,
        nome: 'Racão 3kg PSD Sabor Salmão',
        img: '../assets/img/pets-food-bag-mockup-leaned.jpg',
        preco: 'R$50,00',
        quantidade: 0
    },
    {
        id: 5,
        nome: 'Racão 3kg PSD Sabor Salmão',
        img: '../assets/img/pets-food-bag-mockup-leaned.jpg',
        preco: 'R$50,00',
        quantidade: 0
    }

]

inicializarLoja = () => {
    var containerProdutos = document.getElementById('produtos');
    itens.map((val) => {
        containerProdutos.innerHTML += `
        <div class="produto">
        <img class="produto__imagem" src= `+ val.img + ` />
        <p> `+ val.nome + `</p>
        <p> ` + val.preco + `</p> 
        <a key="`+ val.id + `" href="#">Adicione ao carrinho</a>                                          
        </div>
         `
    })
}

inicializarLoja();

atualizarCarrinho = () => {
    var containerCarrinho = document.getElementById('carrinho');
    containerCarrinho.innerHTML = "";
    itens.map((val) => {
        if (val.quantidade > 0) {
            containerCarrinho.innerHTML += `
        <p>` + val.quantidade + `</p>
        <hr>
         `;
        }
    })
}


var links = document.getElementsByTagName('a');

for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
        let key = this.getAttribute('key');
        itens[key].quantidade++;
        atualizarCarrinho();
        return false;
    })
}

var links = document.getElementsByTagName('a');

for (var i = 0; i < links.length; i--) {
    links[i].addEventListener("click", function () {
        let key = this.getAttribute('key');
        itens[key].quantidade--;
        atualizarCarrinho();
        return false;
    })
}
