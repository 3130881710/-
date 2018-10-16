require(["jquery"], function($) {
    console.log($);
    $(".buts").on("click", function() {
        var names = $("#text").val();
        var titles = $("#texts").val();
        console.log(names, titles);
        if (!names || !titles) {
            alert("内容不能为空")
        } else {
            $.ajax({
                url: "/api/list",
                dataType: "json",
                data: {
                    name: names,
                    title: titles
                },
                type: "post",
                success: function(opt) {
                    console.log(opt);
                    location.href = "../../demo.html";
                }
            })
        }
    })
})