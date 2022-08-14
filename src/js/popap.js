import Swal from 'sweetalert2';

let headerCallback = document.querySelectorAll(".phone-header__callback")

headerCallback.forEach(button => {
    button.addEventListener("click", callbackPopup)
})


function callbackPopup() {
    Swal.fire({
        title: 'Submit your phone number',
        input: 'tel',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Look up',
        showLoaderOnConfirm: true,
        preConfirm: (phoneNumber) => {
            return fetch(`//localhost/callback/${phoneNumber}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.json()
                })
                .catch(error => {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    )
                })
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: `${result.value.login}'s avatar`,
                imageUrl: result.value.avatar_url
            })
        }
    })
}