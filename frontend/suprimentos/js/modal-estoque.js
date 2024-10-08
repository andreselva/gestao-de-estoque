let modal, fade;


async function lancarEstoque(event) {
    event.preventDefault();
    const form = document.querySelector('#lcto-estoque');
    const idProduto = selectedProductId;

    const type = document.getElementById('tipo');

    if (type.value === '') {
        alert('Selecione o tipo do lançamento.');
        return;
    }

    try {
        const formData = new FormData(form);
        formData.append('action', 'lancar-estoque');
        formData.append('idProduto', idProduto);
        const data = {};


        formData.forEach((value, key) => {
            data[key] = value;
        });

        const response = await fetch('../../src/index.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (responseData.status === 'success') {
            alert("Lançamento efetuado com sucesso!")
            window.location.reload();
        } else {
            alert("Houve um problema no lançamento. O estoque não foi lançado.")
        }
        
    } catch (erro) {

    }
}

const toggleModal = (event) => {
    if (event) {
        event.preventDefault();
    }
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
};

document.addEventListener("DOMContentLoaded", function () {
    modal = document.querySelector("#modal");
    fade = document.querySelector("#fade");

    // Seleciona todos os botões que abrem o modal e adiciona o event listener
    const openModalButtons = document.querySelectorAll(".open-modal");

    openModalButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();

            // Captura o id do produto diretamente do atributo data-id do botão
            selectedProductId = button.getAttribute("data-id");

            // Abre o modal
            toggleModal(event);
        });
    });

    const closeModalButton = document.querySelector("#close-modal");
    if (closeModalButton) {
        closeModalButton.addEventListener("click", (event) => toggleModal(event));
    }

    if (fade) {
        fade.addEventListener("click", (event) => toggleModal(event));
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && !modal.classList.contains("hide")) {
        toggleModal();
    }
});