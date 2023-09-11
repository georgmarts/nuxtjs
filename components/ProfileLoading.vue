<template>
    <div class="profile-loading">
        <div class="profile-loading__img loading-animation"></div>
        <div class="profile-loading__body">
            <div class="profile-loading__body--title loading-animation"></div>
            <div class="profile-loading__body--text loading-animation"></div>
            <div class="profile-loading__body--text loading-animation"></div>
            <div class="profile-loading__body--btn loading-animation"></div>
            <div class="profile-loading__body--btn loading-animation"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
</script>
<style lang="scss">
@use '../assets/scss/colors';
@import '../assets/scss/mixins';
    .profile-loading {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        justify-content: center;
        margin: 100px auto;
        gap: 2rem;
        @include shadow;
        background-color: lightgray;
        padding: 2rem;
        overflow: hidden;
        width: 70vw; 
        &__img {
            position: relative;
            overflow: hidden;
            width: 100%;
            height: 100%;
            min-height: 200px;
            background-color: colors.$gray;
        }
        &__body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 1rem;
            &--title, &--text, &--btn {
                position: relative;
                overflow: hidden;
                width: 70%;
                height: 3rem;
                background-color: colors.$gray;
            }
            &--text {
                height: 2rem;
            }
            &--btn {
                width: 200px;
                height: 2.5rem;
                border-radius: .5rem;
            }
        }
    }

    .loading-animation::after {
        display: block;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .2), transparent);
        transform: translateX(-100%);
        animation: loading 1.5s infinite;
    }

    @keyframes loading {
        100% {
            transform: translateX(100%);
        }
    }
</style>