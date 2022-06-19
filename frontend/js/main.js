const HOST = 'http://localhost:8001/back?';

const KEY_REGISTRATION_NUMBER = 'registrationNumber';
const KEY_BRAND = 'brand';
const KEY_RELEASE_DATE = 'releaseDate';
const KEY_COLOR = 'color';
const KEY_OWNER_FULL_NAME = 'ownerFullName';
const KEY_OWNER_ADDRESS = 'ownerAddress';

let JsonArr = [];

fetch(HOST + "show", {
    method: 'POST',
}).then(response =>
    response.json().then(data => ({
        data: data,
    })).then(res => {
        try {
            JsonArr = res.data;
            render(JsonArr);
        } catch {
            JsonArr = [];
        }
    }));

let $content_table = document.querySelector('.content-table')

function render(array) {
    $content_table.innerHTML = '<thead class="align-top">\n' +
        '<tr>\n' +

        '<th scope="col">Регистрационный номер</th>\n' +
        '<th scope="col">Бренд</th>\n' +
        '<th scope="col">Год выпуска</th>\n' +
        '<th scope="col">Цвет</th>\n' +
        '<th scope="col">ФИО владельца</th>\n' +
        '<th scope="col">Адрес владельца</th>\n' +

        '</tr>\n' +
        '</thead>';
    for (let i = 0; i < array.length; i++) {
        $content_table.innerHTML += '<tbody><tr><td>' +

            array[i][KEY_REGISTRATION_NUMBER] + '</td><td>' +
            array[i][KEY_BRAND] + '</td><td>' +
            array[i][KEY_RELEASE_DATE] + '</td><td>' +
            array[i][KEY_COLOR] + '</td><td>' +
            array[i][KEY_OWNER_FULL_NAME] + '</td><td>' +
            array[i][KEY_OWNER_ADDRESS] + '</td>' +

            '</tr></tbody>';
    }
}

let $searchBrand = document.querySelector('#search-brand');
$searchBrand.addEventListener('input', function () {
    let result = [];
    document.querySelector('#search-color').value = '';
    document.querySelector('#search-registration-number').value = '';

    for (let i = 0; i < JsonArr.length; i++) {
        if (JsonArr[i][KEY_BRAND].toLowerCase().includes($searchBrand.value.toLowerCase())) {
            result.push(JsonArr[i]);
        }
    }
    render(result);
})

let $searchColor = document.querySelector('#search-color');
$searchColor.addEventListener('input', function () {
    let result = [];
    document.querySelector('#search-brand').value = '';
    document.querySelector('#search-registration-number').value = '';

    for (let i = 0; i < JsonArr.length; i++) {
        if (JsonArr[i][KEY_COLOR].toLowerCase().includes($searchColor.value.toLowerCase())) {
            result.push(JsonArr[i]);
        }
    }
    render(result);
})

let $searchRegistrationNumber = document.querySelector('#search-registration-number');
$searchRegistrationNumber.addEventListener('input', function () {
    let result = [];
    document.querySelector('#search-brand').value = '';
    document.querySelector('#search-color').value = '';

    for (let i = 0; i < JsonArr.length; i++) {
        if (JsonArr[i][KEY_REGISTRATION_NUMBER].toLowerCase().includes($searchRegistrationNumber.value.toLowerCase())) {
            result.push(JsonArr[i]);
        }
    }
    render(result);
})

document.querySelector('#modal-add-send').addEventListener('click', function () {

    let result = {
        registrationNumber: document.querySelector('#modal-input-registration-number').value,
        brand: document.querySelector('#modal-input-brand').value,
        releaseDate: Number(document.querySelector('#modal-input-release-date').value),
        color: document.querySelector('#modal-input-color').value,
        ownerFullName: document.querySelector('#modal-input-owner-full-name').value,
        ownerAddress: document.querySelector('#modal-input-owner-address').value,
    };

    fetch(HOST + "add", {
        method: 'POST',
        body: JSON.stringify(result),
    }).then(response =>
        response.json().then(data => ({
            data: data,
        })).then(res => {
            if (res.data["added_successfully"] === true) {

                JsonArr.push(result);
                render(JsonArr);
                alert("Автомобиль успешно добавлен");

                const addModalWrapper = document.querySelector('#add-modal');
                const addModal = bootstrap.Modal.getInstance(addModalWrapper);
                addModal.hide();

                document.querySelector('#modal-input-registration-number').value = "";
                document.querySelector('#modal-input-brand').value = "";
                document.querySelector('#modal-input-release-date').value = "";
                document.querySelector('#modal-input-color').value = "";
                document.querySelector('#modal-input-owner-full-name').value = "";
                document.querySelector('#modal-input-owner-address').value = "";

            } else {
                alert("Введены неправильные данные")
            }
        }));
})


let editId = -1;
document.querySelector('#edit-element-button').addEventListener('click', function () {
    let carFound = false;
    let carRegistrationNumber = document.querySelector('#edit-element').value;
    for (let i = 0; i < JsonArr.length; i++) {
        if (JsonArr[i][KEY_REGISTRATION_NUMBER] === carRegistrationNumber) {

            let editModalWrapper = document.querySelector('#edit-modal');
            let editModal = new bootstrap.Modal(editModalWrapper);
            editModal.show();

            editId = i;
            carFound = true;

            document.querySelector('#modal-input-registration-number-edit').value = JsonArr[i][KEY_REGISTRATION_NUMBER];
            document.querySelector('#modal-input-brand-edit').value = JsonArr[i][KEY_BRAND];
            document.querySelector('#modal-input-release-date-edit').value = JsonArr[i][KEY_RELEASE_DATE];
            document.querySelector('#modal-input-color-edit').value = JsonArr[i][KEY_COLOR];
            document.querySelector('#modal-input-owner-full-name-edit').value = JsonArr[i][KEY_OWNER_FULL_NAME];
            document.querySelector('#modal-input-owner-address-edit').value = JsonArr[i][KEY_OWNER_ADDRESS];

            break;
        }
    }

    if (carFound === false) {
        alert("Авто с таким регистрационным номером не найдено");
    }
})

document.querySelector('#modal-edit-send').addEventListener('click', function () {

    let result = {
        registrationNumber: document.querySelector('#modal-input-registration-number-edit').value,
        brand: document.querySelector('#modal-input-brand-edit').value,
        releaseDate: Number(document.querySelector('#modal-input-release-date-edit').value),
        color: document.querySelector('#modal-input-color-edit').value,
        ownerFullName: document.querySelector('#modal-input-owner-full-name-edit').value,
        ownerAddress: document.querySelector('#modal-input-owner-address-edit').value,
    };

    let editData = {
        id: editId,
        car: result
    }

    console.log(editData);

    fetch(HOST + "edit", {
        method: 'POST',
        body: JSON.stringify(editData),
    }).then(response =>
        response.json().then(data => ({
            data: data,
        })).then(res => {
            if (JSON.stringify(res.data) === '{"edited_successfully":true}') {

                JsonArr[editId] = result;
                render(JsonArr);

                alert("Успешно отредактировано");

                const editModalWrapper = document.querySelector('#edit-modal');
                const editModal = bootstrap.Modal.getInstance(editModalWrapper);
                editModal.hide();

                document.querySelector('#modal-input-registration-number-edit').value = "";
                document.querySelector('#modal-input-brand-edit').value = "";
                document.querySelector('#modal-input-release-date-edit').value = "";
                document.querySelector('#modal-input-color-edit').value = "";
                document.querySelector('#modal-input-owner-full-name-edit').value = "";
                document.querySelector('#modal-input-owner-address-edit').value = "";
            } else {
                alert("Введены неправильные данные при редактировании")
            }
        }));

})


let deleteId = -1;
document.querySelector('#delete-element-button').addEventListener('click', function () {
    let carDeleteFound = false;
    let carDeleteRegistrationNumber = document.querySelector('#delete-element').value;
    for (let i = 0; i < JsonArr.length; i++) {
        if (JsonArr[i][KEY_REGISTRATION_NUMBER] === carDeleteRegistrationNumber) {

            deleteId = i;
            carDeleteFound = true;

            break;
        }
    }
    if (carDeleteFound === false) {
        alert("Авто с таким регистрационным номером не найдено");
    } else {
        let result = [];
        for (i = 0; i < JsonArr.length; i++) {
            if (JsonArr[i][KEY_REGISTRATION_NUMBER] !== carDeleteRegistrationNumber) {
                result.push(JsonArr[i]);
            }
        }

        fetch(HOST + "delete", {
            method: 'POST',
            body: JSON.stringify(result),
        }).then(response =>
            response.json().then(data => ({
                data: data,
            })).then(res => {
                if (JSON.stringify(res.data) === '{"deleted_successfully":true}') {
                    alert('Удалено успешно');
                    JsonArr = result;
                    render(JsonArr);
                } else {
                    alert("Ошибка при удалении")
                }
            }));

    }
})

