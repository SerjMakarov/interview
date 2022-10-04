<?php include $_SERVER['DOCUMENT_ROOT'].'/header.php'?>
    <div class="device">
        <div class="device__logo">
            <img src="img/logo.svg" alt="logo">
        </div>
        <div>
            <h3 class="device__title">Выберите устройство</h3>
        </div>
        <form class="device__form" action="">
            <div class="device__group-button">
                <button v-on:click="redirect($event, 'android')" class="device__button_button_android">Android <img src="img/icons8-android-os-32.svg" alt=""></button>
                <button v-on:click="redirect($event, 'apple')" class="device__button_button_apple">Apple <img src="img/icons8-apple-logo.svg" alt=""></button>
            </div>
        </form>
    </div>
<?php include $_SERVER['DOCUMENT_ROOT'].'/footer.php'?>
