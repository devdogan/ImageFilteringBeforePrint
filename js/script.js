$(function(){
    $(document).on("click", ".btn-ayarla", function(){
        $(".nesne-gosterici").addClass("gosterici-ayarla");
        $(".nesne-gosterici *").attr("draggable", false);
        $(".nesne-gosterici").addClass("cizim-alani");
    });

    $(document).on("click", ".btn-yazdir", function(){
        alaniYazdir();
    });
    $(document).on("click", ".btn-temizle", function(){
        $(".cizim-nesnesi").remove();
    });

    $(document).on("dblclick", ".cizim-nesnesi", function(){
        $(this).remove();
    });

    /// nesne konum bilgileri
    let startOffsetX = 0;
    let startOffsetY = 0;

    let endOffsetX = 0;
    let endOffsetY = 0;

    let currentOffsetX = 0;
    let currentOffsetY = 0;

    let drawing = false;

    let drawingObjectType = "kare";

    let selectedObjectId = 0;

    let yazidrmaAlani = "#nesne-gosterici";

    $(document).on("mousedown", ".cizim-alani", function(e){

        if(e.which == 1){
            startOffsetX = 0;
            startOffsetY =0;
            endOffsetX = 0;
            endOffsetY = 0;
            drawing = false;
            selectedObjectId = 0;

            startOffsetX = e.offsetX + 5;
            startOffsetY = e.offsetY + 5;
            drawing = true;
            $(".nesne-gosterici").append(sahneyeNesneEkle());
        }
    });

    $(document).on("mouseup", ".cizim-alani", function(e){
        endOffsetX = e.offsetX;
        endOffsetY = e.offsetY;
        drawing = false;
        $('.cizim-nesnesi-'+selectedObjectId).addClass("kare-nesnesi-2");

        $(".nesne-gosterici").removeClass("gosterici-ayarla");
        $(".nesne-gosterici *").attr("draggable", true);
        $(".nesne-gosterici").removeClass("cizim-alani");

    });

    $(document).on("mousemove", ".cizim-alani", function(e){
        if(drawing){
            currentOffsetX = e.offsetX - startOffsetX;
            currentOffsetY = e.offsetY - startOffsetY;
            $('.cizim-nesnesi-'+selectedObjectId).css("width", currentOffsetX);
            $('.cizim-nesnesi-'+selectedObjectId).css("height", currentOffsetY);
        }
    });

    /// fonksiyonlar
    function sahneyeNesneEkle(){
        if(drawingObjectType=="kare")
            return kareCiz();
    }
    function kareCiz(){
        let randId = Math.floor(Math.random() * 100);
        selectedObjectId = randId;
        return `<div class="kare-nesnesi kare-nesnesi-${randId} cizim-nesnesi-${randId} cizim-nesnesi" data-id="${randId}" style="left:${startOffsetX}px; top:${startOffsetY}px"></div>`;
    }

    function alaniYazdir(){
        var yazdir=$(yazidrmaAlani).html();

        var pencere=window.open('','Yazdır');

        pencere.document.open();

        pencere.document.write('<html><body onload="window.print()">'+yazdir+'</body></html>');

        pencere.document.close();

        setTimeout(function(){pencere.close();},10);
    }

});