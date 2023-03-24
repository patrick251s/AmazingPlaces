function pokazDane()
{
    napis = "";
    napis += document.getElementById("imie").value+" "+document.getElementById("nazwisko").value+"\n";
    napis += "E-mail: "+document.getElementById("email").value+"\n";
    napis += "Wiek: "+document.getElementById("wiek").value+"\n";
    
    var p = "";
    var plec = document.getElementsByName("plec");
    for(i=0; i<plec.length; i++)
    {
        if(plec[i].checked)   p += plec[i].value+" ";
    }
    napis += "Płeć: "+p+"\n";
    
    var m = "";
    var miejsce = document.getElementsByName("miejsce");
    for(i=0; i<miejsce.length; i++)
    {
        if(miejsce[i].checked)  m += miejsce[i].value+" ";
    }
    napis += "Wybrane miejsca: "+m+"\n";
    
    napis += "Budżet: "+document.getElementById("kwota").value+"zł\n";
    napis += "Wpis: "+document.getElementById("komentarz").value;
    
    if(window.confirm("Czy potwierdzasz wprowadzone dane?\n"+napis)) 
    {
        zapisz(m, p);
        wyswietl();
        return true;
    }
    else return false;
}

function zapisz(m, p)
{
    var item = {};
    item.imie = document.getElementById("imie").value;
    item.nazwisko = document.getElementById("nazwisko").value;
    item.email = document.getElementById("email").value;
    item.wiek = document.getElementById("wiek").value;
    item.miejsca = m;
    item.plec = p;
    item.budzet = document.getElementById("kwota").value;
    item.wpis = document.getElementById("komentarz").value;
    
    var Formularz = JSON.parse(localStorage.getItem("Formularz"));
    if(Formularz === null) Formularz = [];
    Formularz.push(item);
    localStorage.setItem('Formularz', JSON.stringify(Formularz));
}

function wyswietl()
{
    var Formularz = JSON.parse(localStorage.getItem("Formularz"));
    var el = document.getElementById("wyniki");
    var str = "<h3>Lista wpisów</h3>";
    if(Formularz === null) el.innerHTML = str+"<p>Brak dodanych formularzy</p>";
    else
    {
        for(i=0; i<Formularz.length; i++)
        {
            
            str += "<article>"+Formularz[i].imie+" "+Formularz[i].nazwisko+"<br/>Płeć: "+Formularz[i].plec+" &nbsp&nbsp  Wiek: "+Formularz[i].wiek
                   +" &nbsp&nbsp  E-mail: "+Formularz[i].email+"<br/>Wybrane miejsca: "+Formularz[i].miejsca+" &nbsp&nbsp  Budżet: "+Formularz[i].budzet+"<br/>Wpis: "+Formularz[i].wpis;
            str += "<br/>";
            str += "<button class='btn mybutton ml-2 my-1' class='usun' onclick='usunZadanie("+i+")'>Usuń wpis</button>";
            str += "<button class='btn mybutton ml-2 my-1' onclick='edytuj("+i+")'>Edytuj wpis</button></article><br/>";
        }
        el.innerHTML = str;
    }
}

function usun()
{
    if(confirm("Czy chcesz usunąć dane z localStorage?"))
    {
        localStorage.removeItem('Formularz');
        wyswietl();
    }
}

function usunZadanie(i)
{
  var Formularz = JSON.parse(localStorage.getItem('Formularz'));
  
  if(confirm("Usunąć wpis?")) Formularz.splice(i,1);
  
  localStorage.setItem('Formularz', JSON.stringify(Formularz));
  wyswietl();
}

function edytuj(j)
{
    var Formularz = JSON.parse(localStorage.getItem('Formularz'));
    
    var item = {};
    item.imie = document.getElementById("imie").value;
    item.nazwisko = document.getElementById("nazwisko").value;
    item.email = document.getElementById("email").value;
    item.wiek = document.getElementById("wiek").value;
    
    var m = "";
    var miejsce = document.getElementsByName("miejsce");
    for(i=0; i<miejsce.length; i++)
    {
        if(miejsce[i].checked)  m += miejsce[i].value+" ";
    }
    item.miejsca = m;
    
    var p = "";
    var plec = document.getElementsByName("plec");
    for(i=0; i<plec.length; i++)
    {
        if(plec[i].checked)   p += plec[i].value+" ";
    }
    item.plec = p;
    
    item.budzet = document.getElementById("kwota").value;
    item.wpis = document.getElementById("komentarz").value;
     
    Formularz[j] = item;
    
    if(confirm("Czy potwierdzasz dane z formularza do edycji?"))
    {
        localStorage.setItem('Formularz', JSON.stringify(Formularz));
        wyswietl();
    }
}

function schowaj()
{
    var el = document.getElementById('wyniki');
    el.innerHTML = "";
}

function ustawDate()
{
    var miesiace = ["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia"];
    var dzienTyg = ["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"];
    var dzisiaj = new Date();
    var dzien = dzisiaj.getDate();
    var miesiac = dzisiaj.getMonth(); // +1 dla liczby bo zwraca od 0 do 11
    var rok = dzisiaj.getFullYear();
    var godziny = dzisiaj.getHours();
    var minuty = dzisiaj.getMinutes();
    var sekundy = dzisiaj.getSeconds();
    var numerDnia = dzisiaj.getDay();
    
    if(godziny<10) godziny = '0'+godziny;
    if(minuty<10) minuty = '0'+minuty;
    if(sekundy<10) sekundy = '0'+sekundy;
    
    document.getElementById("data").innerHTML = dzienTyg[numerDnia]+', '+dzien+' '+miesiace[miesiac]+' '+rok+' '+godziny+':'+minuty+':'+sekundy;
    
    setTimeout("ustawDate()", 1000);
}

var kat;
var poprzedniKat = 0;

function losuj()
{
    kat = Math.floor(Math.random() * 5400) + 60;
    while(Math.abs(kat - poprzedniKat) <= 720) kat = Math.floor(Math.random() * 5400) + 60;
    if(kat%30 === 0 || kat%30 === 1 || kat%30 === 2 || kat%30 === 3 || kat%30 === 27 ||kat%30 === 28 ||kat%30 === 29) kat += 15;
    $('#kolo').css({'transform':'rotate('+kat+'deg)', 'transition-duration':'5s'});
    console.log("PoprzedniKąt = "+poprzedniKat+"  Kat = "+kat);       
    if(kat%360 >= 30 && kat%360 < 90) setTimeout("window.open('lizbona.html')", 5500);
    if(kat%360 >= 90 && kat%360 < 150) setTimeout("window.open('tatry.html')", 5500);
    if(kat%360 >= 150 && kat%360 < 210) setTimeout("window.open('wenecja.html')", 5500);
    if(kat%360 >= 210 && kat%360 < 270) setTimeout("window.open('kranjskagora.html')", 5500);
    if(kat%360 >= 270 && kat%360 < 330) setTimeout("window.open('oslo.html')", 5500);
    if((kat%360 >= 330 && kat%360 < 360) || (kat%360 >= 0 && kat%360 < 30)) setTimeout("window.open('rzym.html')", 5500);
    
    poprzedniKat = kat;
}