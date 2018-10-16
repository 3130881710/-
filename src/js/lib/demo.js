require(["jquery", "hand"], function($, hand) {
    $.ajax({
        url: "/api/data",
        dataType: "json",
        success: function(opt) {
            console.log(opt);
            var html = $("#scs").html();
            console.log(html);
            var complies = hand.compile(html);
            var hts = complies(opt.data);
            $(".hts").append(hts);
        }
    })
    $(".btss").on("click", function() {
        location.href = "../../index.html";
    })
})