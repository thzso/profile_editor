const root = document.getElementById("root");
const profileDiv = document.createElement("div");
profileDiv.setAttribute("id", "profileData");

const init = () => {
  const imageDiv = document.createElement("div");
  imageDiv.setAttribute("id", "imageSpace");

  const image = document.createElement("img");
  image.setAttribute("id", "profileImage");
  image.setAttribute(
    "src",
    "http://127.0.0.1:9000/profileImage/placeholder.jpg"
  );

  imageDiv.append(image);
 
  root.append(imageDiv);

  const createForm = () => {
    const setMultipleAttributes = (elem, type, name) => {
      const attributes = {
        type: type,
        name: name,
        id: name,
        placeholder: name,
        required: "",
      };
      Object.entries(attributes).forEach(([key, value]) => {
        elem.setAttribute(key, value);
      });
    };

    const form = document.createElement("form");
    form.setAttribute("id", "form");

    const fileUploadWrapper = document.createElement("div");
    fileUploadWrapper.setAttribute("id", "file-upload-wrapper");
    
    const span = document.createElement("span");
    span.setAttribute("id", "icon");
    span.setAttribute("class", "material-symbols-outlined");
    span.innerText = "drive_folder_upload";
    
    fileUploadWrapper.appendChild(span);
   
    const fileInput = document.createElement("input");
    setMultipleAttributes(fileInput, "file", "image");
    fileInput.setAttribute("accept", "image/*");

    fileUploadWrapper.appendChild(fileInput);

    const nameInput = document.createElement("input");
    setMultipleAttributes(nameInput, "text", "name");
    nameInput.setAttribute("maxlength", "20");

    const emailInput = document.createElement("input");
    setMultipleAttributes(emailInput, "email", "email");

    const aboutTextarea = document.createElement("textarea");
    setMultipleAttributes(aboutTextarea, "text", "about");
    aboutTextarea.setAttribute("rows", "6");
    aboutTextarea.setAttribute("maxlength", "100");

    const saveBtn = document.createElement("button");
    saveBtn.type = "submit";
    saveBtn.id = "save";
    saveBtn.innerText = "SAVE";

    form.append(
      fileUploadWrapper,
      nameInput,
      emailInput,
      aboutTextarea,
      saveBtn
    );

    fileInput.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        document.getElementById("profileImage").src = URL.createObjectURL(
          e.target.files[0]
        );
      }
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      addProfile(formData);
    });

    root.append(form);
  };
  createForm();

  const createProfile = (responseMessage) => {
    root.removeChild(form);
    profileDiv.innerHTML = "";

    if (responseMessage) {
      const timeStamp = Date.now();
      image.src = `http://127.0.0.1:9000/profileImage/profile.jpg?timestamp=${timeStamp}`;

      for (const [key, value] of Object.entries(responseMessage)) {
        const div = document.createElement("div");
        div.setAttribute("id", `${key}Data`);
        div.setAttribute("class", "data");
        const newContent = document.createTextNode(value);
        div.appendChild(newContent);
        profileDiv.append(div);
      }
      const deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("type", "button");
      deleteBtn.setAttribute("id", "delete");
      deleteBtn.innerHTML = "DELETE";
      deleteBtn.addEventListener("click", deleteProfile);
      profileDiv.append(deleteBtn);
      root.append(profileDiv);
    } else {
      console.log("ERROR");
    }
  };

  const addProfile = async (formData) => {
    const url = "http://127.0.0.1:9000";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const responseMessage = await response.json();
    createProfile(responseMessage);
  };

  const deleteProfile = async () => {
    const url = "http://127.0.0.1:9000";
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (response.status === 200) {
      image.src = "http://127.0.0.1:9000/profileImage/placeholder.jpg";
      root.removeChild(profileDiv);
      createForm();
    }
    return response.status;
  };
};
init();
