const data = new FormData();
$(".btn_submit").on("click", (e) => {
  let mb_password = $("#new_password").val(),
    old_password = $("#old_password").val(),
    confirm_password = $("#confirm_password").val();
  data.append("mb_nick", $("#name").val());
  data.append("mb_phone", $("#tel_phone").val());
  data.append("mb_address", $("#mb_address").val());
  data.append("mb_description", $("textarea").val());
  console.log(data);

  if ((old_password = "" && (mb_password || confirm_password))) {
    alert("Please, fill old password first!");
    return false;
  } else if (mb_password != confirm_password) {
    alert("Please, new password should equel to confirm one!");
    return false;
  }
  axios
    .post("/member/member-edit", data)
    .then((response) => window.location.reload());
  
});

function previewFileHandler(input, order) {
  const className = input.className;
  const file = $(`.${className}`)[0].files[0];
  const valid_types = ["image/jpeg", "image/png", "image/jpg"];
  if (!valid_types.includes(file.type)) {
    alert("Please, Insert Valid formatted file!");
  } else {
    if (file) {
      data.append("mb_image", file);
      const reader = new FileReader();
      reader.onload = () => {
        $(`.image_${order}`).attr("src", reader.result);
        $(".nav-image").attr("src", reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
}
