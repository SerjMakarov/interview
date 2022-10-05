<?php
$up = '../';
include $_SERVER['DOCUMENT_ROOT'].'/header.php'
?>
<div class="interview_content">
    <div class="interview_logo">
        <img src="../img/logo.svg" alt="logo">
    </div>
    <div class="interview" v-for="box in boxs" :key="box.id">
        <div class="interview__title" v-bind:class="{interview__title_margin_null: box.isActive}">
            <h1>{{box.title}}</h1>
            <img v-if="box.isDeactivate" @click="hiddenBox(box.id)" src="../img/minus.svg" alt="minus">
            <img v-if="box.isActive" @click="hiddenBox(box.id)" src="../img/plus.svg" alt="plus">
        </div>
        <form class="interview-form " v-bind:class="{hidden: box.isActive}">
            <div v-for="request in box.requests">
                <div class="interview-form__element">
                    <label for="checkbox">{{request.req}}</label>
                    <input type="checkbox" id="checkbox" @click="checkBox(request.id)">
                </div>
                <input v-if="request.checked" class="interview-form__text-input">
            </div>
            <textarea class="interview-form__message" placeholder="Введите комментарий или пожелание" name="message" id="" cols="50" rows="5"></textarea>
            <div class="interview-group-button">
<!--                    <label for="button_file">-->
<!--                        <span class="interview-group-button__btn_button-file_alias">Добавить скрин или видео</span>-->
<!--                    </label>-->
<!--                    <input class="interview-group-button__btn_button_hidden" type="file" id="button_file">-->
                <label for="button_next">
                    <span class="interview-group-button__btn_button-next_alias">Дальше</span>
                </label>
                <input class="interview-group-button__btn_button_hidden" type="button" id="button_next">
            </div>
        </form>
    </div>
</div>
<?php include $_SERVER['DOCUMENT_ROOT'].'/footer.php'?>
