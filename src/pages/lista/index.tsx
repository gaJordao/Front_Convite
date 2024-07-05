const itens = [
  {
    id: 1,
    imagemUrl:
      "https://goianita.vteximg.com.br/arquivos/ids/159074-1000-1000/Panela-22-Aluminio-Paris-Vermelha---Tramontina.jpg?v=637177182781830000",
    descricao:
      "Ela é utilizada para cozinhar alimentos em líquido, como água, caldos, ou molhos, além de ser usada para fritar, refogar e até mesmo assar alimentos. ",
    valor: 200,
    qtdPessoas: 2,
  },
  {
    id: 2,
    imagemUrl:
      "https://goianita.vteximg.com.br/arquivos/ids/159074-1000-1000/Panela-22-Aluminio-Paris-Vermelha---Tramontina.jpg?v=637177182781830000",
    descricao:
      "A panela é um utensílio de cozinha essencial, geralmente feito de metal resistente ao calor, como alumínio, aço inoxidável ou ferro fundido.",
    valor: 300,
    qtdPessoas: 2,
  },
  {
    id: 3,
    imagemUrl:
      "https://goianita.vteximg.com.br/arquivos/ids/159074-1000-1000/Panela-22-Aluminio-Paris-Vermelha---Tramontina.jpg?v=637177182781830000",
    descricao:
      "A panela é um utensílio de cozinha essencial, geralmente feito de metal resistente ao calor, como alumínio, aço inoxidável ou ferro fundido.",
    valor: 300,
    qtdPessoas: 2,
  },
  {
    id: 3,
    imagemUrl:
      "https://goianita.vteximg.com.br/arquivos/ids/159074-1000-1000/Panela-22-Aluminio-Paris-Vermelha---Tramontina.jpg?v=637177182781830000",
    descricao:
      "A panela é um utensílio de cozinha essencial, geralmente feito de metal resistente ao calor, como alumínio, aço inoxidável ou ferro fundido.",
    valor: 300,
    qtdPessoas: 2,
  },
  {
    id: 3,
    imagemUrl:
      "https://goianita.vteximg.com.br/arquivos/ids/159074-1000-1000/Panela-22-Aluminio-Paris-Vermelha---Tramontina.jpg?v=637177182781830000",
    descricao:
      "A panela é um utensílio de cozinha essencial, geralmente feito de metal resistente ao calor, como alumínio, aço inoxidável ou ferro fundido.",
    valor: 300,
    qtdPessoas: 2,
  },
  {
    id: 3,
    imagemUrl:
      "https://goianita.vteximg.com.br/arquivos/ids/159074-1000-1000/Panela-22-Aluminio-Paris-Vermelha---Tramontina.jpg?v=637177182781830000",
    descricao:
      "A panela é um utensílio de cozinha essencial, geralmente feito de metal resistente ao calor, como alumínio, aço inoxidável ou ferro fundido.",
    valor: 300,
    qtdPessoas: 2,
  },
  {
    id: 3,
    imagemUrl:
      "https://goianita.vteximg.com.br/arquivos/ids/159074-1000-1000/Panela-22-Aluminio-Paris-Vermelha---Tramontina.jpg?v=637177182781830000",
    descricao:
      "A panela é um utensílio de cozinha essencial, geralmente feito de metal resistente ao calor, como alumínio, aço inoxidável ou ferro fundido.",
    valor: 300,
    qtdPessoas: 2,
  },
  {
    id: 3,
    imagemUrl:
      "https://goianita.vteximg.com.br/arquivos/ids/159074-1000-1000/Panela-22-Aluminio-Paris-Vermelha---Tramontina.jpg?v=637177182781830000",
    descricao:
      "A panela é um utensílio de cozinha essencial, geralmente feito de metal resistente ao calor, como alumínio, aço inoxidável ou ferro fundido.",
    valor: 300,
    qtdPessoas: 2,
  },
  {
    id: 3,
    imagemUrl:
      "https://goianita.vteximg.com.br/arquivos/ids/159074-1000-1000/Panela-22-Aluminio-Paris-Vermelha---Tramontina.jpg?v=637177182781830000",
    descricao:
      "A panela é um utensílio de cozinha essencial, geralmente feito de metal resistente ao calor, como alumínio, aço inoxidável ou ferro fundido.",
    valor: 300,
    qtdPessoas: 2,
  },
];

export function ListaPage () {
    return (
        <main> 
            <h1>Lista Page</h1>

            <div className="flex flex-wrap gap-4 justify-center items-center h-[600px] overflow-auto">
                {itens.map((item) => {
                    return (
                      <div className="bg-[#2a3155ad] flex flex-col sm:flex-row  max-w-[400px] h-auto">
                        <div className="sm:w-80 h-40">
                          <img className="h-full w-full" src={item.imagemUrl} alt={item.descricao} />
                        </div>

                        <div className="flex flex-col">
                          <span className="">{item.descricao}</span>
                          <span>{item.valor}</span>
                          <button>Realizar doação</button>
                        </div>
                      </div>
                    );
                })}
            </div>
        </main>
    )
}