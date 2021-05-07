// $("#openNav").hide();
var backgroundimage;
backgroundimage = '<img src="img/right-arrow.svg" style="height: 30px; width: 30px; margin: 10px; float: right">';
$(window).on("scroll", function() {
    var widget = document.getElementById('navtab');
    var sticky = widget.offsetTop;
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
    // document.getElementById('anggaran_aksi_ketahanan_iklim').style.width = '95%';
    document.getElementById('card1').style.width = '89%';
    document.getElementById('card2').style.width = '89%';
    // document.getElementById('card3').style.width = '89%';
    // document.getElementById('row1').style.width = '97%';
    // document.getElementById('row2').style.width = '97%';
    $('.sticky').css({
        'margin-left': '-234px'
    });
    // $('.litab').css({
    //     'width' : '19%'
    // });
    $('.sumber-data-panel').css({
        width: '100%'
    });
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
    $('.sumber-data-panel').css({
        width: '105%'
    });
    document.getElementById('card1').style.width = '100%';
    document.getElementById('card2').style.width = '100%';
    // document.getElementById('card3').style.width = '100%';
    // document.getElementById('row1').style.width = '100%';
    // document.getElementById('row2').style.width = '100%';
    // document.getElementById('anggaran_aksi_ketahanan_iklim').style.width = '100%';
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
