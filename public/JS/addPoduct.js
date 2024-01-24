const moment = require("moment")
$(".product_color").on("change", (e) => {
  $(
    ".blue, .gold, .green, .gray, .pink, .midnight, .purple, .red, .silver, .white, .yellow, .black"
  ).css("border", "none");

  const selectedColor = e.target.value.toLowerCase();
  if (selectedColor !== "") {
    if (selectedColor === "red") {
      $("." + selectedColor).css("border", "4px solid blue");
    } else {
      $("." + selectedColor).css("border", "4px solid red");
    }
  }
});

$(".demo-page-content").on("submit", (e) => {
  const product_name = $(".poduct_name").val(),
    product_color = $(".product_color").val(),
    product_display = $(".product_display").val(),
    product_core = $(".product_core").val(),
    product_memory = $(".product_memory").val(),
    product_ram = $(".product_ram").val(),
    product_camera = $(".product_camera").val(),
    product_price = $(".product_price").val(),
    product_deal = $(".product_deal").val(),
    product_water_proof = $("#proofCheck").on("change", (e) =>
      e.target.checked ? "Y" : "N"
    ),
    product_second_hand = $(".product_second_hand").val(),
    product_description = $(".product_description").val(),
    product_manufacture = $(".product_manufacture").val(),
    product_till_used = $(".product_till_used").val();
  if (
    product_name === "" ||
    product_color === "" ||
    product_display === "" ||
    product_core === "" ||
    product_memory === "" ||
    product_ram === "" ||
    product_camera === "" ||
    product_price === "" ||
    product_deal === "" ||
    product_water_proof === "" ||
    product_second_hand === ""
  ) {
    alert("Please, fill all blanks !");
    return false;
  }
  return true;
});

function previewFileHandler(input, order) {
  const className = input.className;
  const file = $(`.${className}`)[0].files[0];
  const valid_types = ["image/jpeg", "image/png", "image/jpg"];
  if (!valid_types.includes(file.type)) {
    alert("Please, Insert Valid formatted file");
  } else {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        $(`.image_${order}`).attr("src", reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
}

$("#proofCheck").on("change", (e) => {
  if (e.target.checked) {
    $(".proof-text").text("Yes, It is");
    $(".proof-text").css("color", "Blue");
  } else {
    $(".proof-text").text("No, It is not.");
    $(".proof-text").css("color", "Black");
  }
  const proof = e.target.checked ? "Y" : "N";
  $("input[name='product_water_proof']").val(proof);
});

$(".product-made").on("change", (e)=>{
  const date = moment(e.target.value).format("YYYY-MM-DD");
  $("input[name='product_date_manufacture']").val(date);
})

