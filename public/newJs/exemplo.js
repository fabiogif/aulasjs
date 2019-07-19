var mae = $("#nome-mae")
var pai = $("#nome-pai")


mae.on("input", function() {
    pai.attr("disabled", true)
})

pai.on("input", function() {
    mae.attr("disabled", true)
})