const em = document.getElementsByClassName("img_producto_container");
em.on("mouseover", function () {
    console.log("mouseover")
    em.children(".img_producto").css({transform: "scale(" + em.attr("data-scale") + ")"});
}).on("mouseout", function () {
    em.children(".img_producto").css({transform: "scale(1)"});
}).on("mousemove", function (e) {
    em.children(".img_producto").css({
        "transform-origin":
            ((e.pageX - em.offset().left) / em.width()) * 100 +
            "% " +
            ((e.pageY - em.offset().top) / em.height()) * 100 +
            "%"
    });
});
