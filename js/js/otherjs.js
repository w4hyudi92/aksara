// $("#openNav").hide();
var backgroundimage;
backgroundimage = '<img src="img/right-arrow.svg" style="height: 30px; width: 30px; margin: 10px; float: right">';
$(window).on("scroll", function() {
    var widget = document.getElementById('navtab');
    var sticky = widget.offsetTop;

    // if (window.pageYOffset >= sticky){
    //     widget.classList.add("sticky");
    //     document.getElementById('navtab').style.width = "78%";
    // } else{
    //     widget.classList.remove("sticky");
    //     document.getElementById('navtab').style.width = "100%";
    // }

    if($(window).scrollTop() >= 900) {
        document.getElementById('capaian1').style.display = "none";
        document.getElementById('capaian2').style.display = "none";
        document.getElementById('capaian3').style.display = "none";
        document.getElementById('capaian4').style.display = "none";
        document.getElementById('capaian5').style.display = "none";

        document.getElementById('down1').style.display = "block";
        document.getElementById('down2').style.display = "block";
        document.getElementById('down3').style.display = "block";
        document.getElementById('down4').style.display = "block";
        document.getElementById('down5').style.display = "block";

        document.getElementById('atas1').style.display = "none";
        document.getElementById('atas2').style.display = "none";
        document.getElementById('atas3').style.display = "none";
        document.getElementById('atas4').style.display = "none";
        document.getElementById('atas5').style.display = "none";
    } else {
        document.getElementById('capaian1').style.display = "block";
        document.getElementById('capaian2').style.display = "block";
        document.getElementById('capaian3').style.display = "block";
        document.getElementById('capaian4').style.display = "block";
        document.getElementById('capaian5').style.display = "block";

        document.getElementById('down1').style.display = "none";
        document.getElementById('down2').style.display = "none";
        document.getElementById('down3').style.display = "none";
        document.getElementById('down4').style.display = "none";
        document.getElementById('down5').style.display = "none";

        document.getElementById('atas1').style.display = "block";
        document.getElementById('atas2').style.display = "block";
        document.getElementById('atas3').style.display = "block";
        document.getElementById('atas4').style.display = "block";
        document.getElementById('atas5').style.display = "block";
    }
});

$("#closeNav").on('click', function(){
    $(".menu-ul").hide();
    $(".sidebar-admin").css({
        width: '50px'
    });
    $('.divtab').css({
        width: '122%'
    });
    $("#map_verif").css({
        width: '95%'
    });
    document.getElementById('anggaran_aksi_ketahanan_iklim').style.width = '95%';
    document.getElementById('card1').style.width = '89%';
    document.getElementById('card2').style.width = '89%';
    document.getElementById('card3').style.width = '89%';
    document.getElementById('row1').style.width = '97%';
    document.getElementById('row2').style.width = '97%';
    $('.sticky').css({
        'margin-left': '-234px'
    });
    // $('.litab').css({
    //     'width' : '19%'
    // });
    document.getElementById('content').style.width = '100%';
    document.getElementById('content').style.marginLeft = '50px';
    document.getElementById('laporkan_aksi').style.marginRight = '50px';
    $("#closeNav").hide();
    document.getElementById('openNav').innerHTML =(backgroundimage);
    //document.getElementById('openNav').style.backgroundImage  = "url('img/right-arrow.svg')";
});

$("#openNav").on('click', function(){
    $(".menu-ul").show();
    $(".sidebar-admin").css({
        width: '285px'
    });
    $('.divtab').css({
        width: '98%'
    });
    $("#map_verif").css({
        width: '100%'
    });
    document.getElementById('card1').style.width = '100%';
    document.getElementById('card2').style.width = '100%';
    document.getElementById('card3').style.width = '100%';
    document.getElementById('row1').style.width = '100%';
    document.getElementById('row2').style.width = '100%';
    document.getElementById('anggaran_aksi_ketahanan_iklim').style.width = '100%';
    document.getElementById('content').style.width = 'calc(100% - 285px)';
    document.getElementById('content').style.marginLeft = '285px';
    document.getElementById('laporkan_aksi').style.marginRight = '0px';
    $("#closeNav").show();
    $('.sticky').css({
        'margin-left': '0'
    });
    document.getElementById('openNav').innerHTML = "";

});

function openTabs(tabName) {
  var i;
  var x = document.getElementsByClassName("tabnya");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(tabName).style.display = "block";  
}
