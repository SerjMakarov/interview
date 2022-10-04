<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../css/main.css">
    <title>Опрос</title>
</head>
<body>
    <div id="interview" class="interview_content">
        <div class="interview_logo">
            <img src="../img/logo.svg" alt="logo">
        </div>
        <div class="interview">
            <div class="interview__title">
                <h1>Экран приветствия</h1>
                <img src="../img/minus.svg" alt="minus">
            </div>
            <form class="interview-form" action="">
                <div class="interview-form__element">
                    <label for="log_in">Не понял как войти</label>
                    <input type="checkbox" id="log_in" name="log_in" value="">
                </div>
                <div class="interview-form__element">
                    <label for="login">Не понял как зарегестрироваться</label>
                    <input type="checkbox" id="login" name="login" value="">
                </div>
                <div class="interview-form__element">
                    <label for="skip_step">Не понял как пропустить этот шаг</label>
                    <input type="checkbox" id="skip_step" name="skip_step" value="">
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
        <div class="interview interview_collapse-form_disabled">
            <div class="interview__title">
                <h1>Экран приветствия</h1>
                <img src="../img/plus.svg" alt="plus">
            </div>
        </div>
    </div>
</body>
</html>