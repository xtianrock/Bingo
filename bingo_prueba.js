/**
 * Created by 2DAWT on 27/01/2015.
 */
var arrayNumeros=[];
var zonaJuego;
var bolasSacadas=[];
window.onload=function()
{
    zonaJuego=document.getElementById('zonaJuego');
    var bombo=new Bombo();
    zonaJuego.appendChild(bombo);
    var carton=new Carton();
    zonaJuego.appendChild(carton);

    $(".casilla").bind( "click", function() {
        $(this).attr('class','marcado')
    });
    var nuevo=document.getElementById('nuevo');
    nuevo.addEventListener("click",nuevoBingo);
    var comenzar=document.getElementById('comenzar');
    comenzar.addEventListener("click",comenzarJuego);
}
function comenzarJuego() {
    getNumeroBombo();
    intervalo = setInterval(getNumeroBombo, 3000);
}

function getNumeroBombo(numero) {
    if (numero == undefined) {
        $.ajax({
            type: "POST",
            dataType: "html",
            contentType: "application/x-www-form-urlencoded",
            url: "numeroAleatorio.php",
            success: getNumeroBombo,
            timeout: 4000
        });
    } else {
        if (bolasSacadas.indexOf(numero) == -1) {
            $("#bombo").text(numero);
            bolasSacadas.push(numero);
        } else {
            return getNumeroBombo();
        }
    }
}

function aleatorio(numero) {
    if (numero==0)
    {
        var min=1;
        var max=9;
    }
    else
        var min=numero*10;
    if(numero==8)
        max=min+10;
    else
        var max=min+9;
    do
    {
        var aleatorio=Math.round(Math.random()*(max-min)+parseInt(min));
    }
    while (arrayNumeros.indexOf(aleatorio)!=-1)
    arrayNumeros.push(aleatorio);
    arrayNumeros.sort();
    return aleatorio;
}
function numerosTapados()
{
    tapados=[];
    for (var i=0;i<4;i++)
    {
        do
        {
            var aleatorio=Math.round(Math.random()*(9-1)+parseInt(1));
        }
        while (tapados.indexOf(aleatorio)!=-1)
        tapados.push(aleatorio);
    }
    return tapados;
}

function Carton()
{
    var carton=document.createElement('div');
    carton.setAttribute('id','carton');
    var cabecera=document.createElement('div');
    cabecera.setAttribute('id','cabecera');
    cabecera.innerHTML='Cabecera';
    var cuerpo=document.createElement('div');
    cuerpo.setAttribute('id','cuerpo');
    for(var i=0;i<3;i++)
    {
        var fila=document.createElement('div');
        fila.setAttribute('class','fila');
        var tapados=numerosTapados();
        for (var j=0;j<9;j++)
        {
            if(tapados.indexOf(j)==-1)
            {
                $('<div/>', {
                    class: 'casilla',
                    text: aleatorio(j)
                }).appendTo(fila);
            }
            else
            {
                $('<div/>', {
                    class: 'tapado',
                    text: aleatorio(j)
                }).appendTo(fila);
            }
        }
        cuerpo.appendChild(fila);
    }
    carton.appendChild(cuerpo);
    return carton;
}

Carton.prototype.createBody = function()
{


};
Carton.prototype.createCol = function()
{

};
Carton.prototype.createBox = function()
{

};

function Bombo()
{
    var bombo=document.createElement('div');
    bombo.setAttribute('id','bombo');
    bombo.appendChild(document.createTextNode('0'));
    return bombo;
}

function nuevoBingo()
{
    zonaJuego.removeChild(document.getElementById('carton'))
    var carton=new Carton();
    zonaJuego.appendChild(carton);
}








