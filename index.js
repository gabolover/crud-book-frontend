const API_URL = "http://localhost:8080/books";
const form = document.querySelector("form");
const imageInput = document.getElementById("image");
const imagePreview = document.getElementById("imagePreview");
const searchForm = document.querySelector(".searchForm");
const searchInput = document.querySelector(".searchInput");

const saveBook = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  try {
    const response = await fetch(`${API_URL}/create`, {
      method: "POST", // Método HTTP
      body: formData, // Pasar el FormData directamente
    });

    if (!response.ok) {
      throw new Error(`Error en el servidor: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Respuesta del servidor:", data);
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
  }
};

form.addEventListener("submit", saveBook);

imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0]; // Obtén el primer archivo seleccionado
  if (file) {
    // Crea una URL para el archivo
    const imageURL = URL.createObjectURL(file);

    // Asigna esa URL al atributo src de la imagen
    imagePreview.src = imageURL;

    // Muestra la imagen
    imagePreview.classList.add("show");
  }
});

const getBook = async (event) => {
  event.preventDefault();
  const response = await fetch(`${API_URL}/${searchInput.value}`);
  const data = await response.json();
  console.log("data", data);
  // Recibe la respuesta como JSON
  const base64Image = data.image; // Obtiene la cadena Base64

  const imageElement = document.getElementById("imagePreview");
  imageElement.src = `data:image/png;base64,${base64Image}`;
  imagePreview.classList.add("show"); // Muestra la imagen
};

searchForm.addEventListener("submit", getBook);
