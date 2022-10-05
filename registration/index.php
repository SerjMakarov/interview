<?php
$up = '../';
include $_SERVER['DOCUMENT_ROOT'].'/header.php'
?>
<div class="registration">
    <div class="registration__logo">
        <img src="../img/logo.svg" alt="logo">
    </div>
    <div>
        <h3 class="registration__title">Опрос по приложению</h3>
    </div>
    <div>
        <p class="registration__text">
            Просим вас <a href="#">скачать приложение</a> для Android или iPhone, зарегистрироваться и пройти опрос.
            Это необходимо для того, чтобы выявить слабые места и сделать наш продукт лучше.
        </p>
    </div>
    <form class="registration__form">
        <input v-model="version_os" type="text" placeholder="Версия OS*" @input="getValue">
        <input v-model="device_model" type="text" placeholder="Модель телефона*" @input="getValue">
        <input v-model="surname" type="text" placeholder="Фамилия*" @input="getValue">
        <input v-model="name" type="text" placeholder="Имя*" @input="getValue">
        <input v-model="tabel_number" type="text" placeholder="Табельный номер*" @input="getValue">
        <input v-model="apple_id" v-if="activeInputAppleID" type="text" placeholder="Apple ID*" @input="getValue">
        <input v-model="email" type="text" placeholder="Email" @input="getValue">
        <div class="registration__group-button">
            <button v-on:click="push($event)" class="registration__button_button_interview">Пройти опрос</button>
            <button class="registration__button_button_download">Скачать приложение</button>
        </div>
    </form>
</div>
<?php include $_SERVER['DOCUMENT_ROOT'].'/footer.php'?>
