<template>
        <div class="post-card-loading">
            <div class="post-card-loading__img loading-animation"></div>
            <div class="post-card-loading__title loading-animation"></div>
            <div class="post-card-loading__body loading-animation"></div>
            <div class="post-card-loading__btn loading-animation"></div>
        </div>
</template>
<script setup lang="ts">

</script>
<style lang="scss">
@use '../assets/scss/colors';
@import '../assets/scss/mixins';
    .post-card-loading {
            position: relative;
            @include shadow;
            background-color: lightgray;
            overflow: hidden;
            height: 300px;
        &__img {
            width: 100%;
            height: 50%;
            background-color: colors.$gray;
        }
        &__title, &__body, &__btn {
            margin: 1rem;
            width: 90%;
            height: 2rem;
            background-color: colors.$gray;
        }
        &__btn {
            width: 90px;
            border-radius: .5rem;
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