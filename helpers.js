exports.defaultPageTitle = "Site ABC";

exports.menu = [
    {nome: "Home", slug: "/", guest:true, logged:true},
    {nome: "Login", slug: "/users/login",  guest:true, logged:false},
    {nome: "Cadastro", slug: "/users/register",  guest:true, logged:false},
    {nome: "Adicionar Post", slug: "/post/add",  guest:false, logged:true},
    {nome: "Sair", slug: "/users/logout",  guest:false, logged:true}
];