<template>
    <div style="position: relative;">
    <swiper-container
    :slidesPerView = 1
    :navigation = "{
            nextEl: '.next',
            prevEl: '.prev'
    }"
    :pagination = "{
            el: '.swiper-pagination-bullets',
            clickable: true
    }"
    :loop="true"
    class="swiper"
    >
        <swiper-slide v-for="image in images" class="swiper-slide">
            <img :src="`${image}`" alt="">
        </swiper-slide>
    </swiper-container>
    <span class="pagination-btn prev">&#60;</span>
    <span class="pagination-btn next">&#62;</span>
    <span class="swiper-pagination-bullets"></span>
    </div>
</template>

<script setup lang="ts">
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
register()


// Customize your swiper below. It is type-safe. You can also put parameters inside 'swiper-container' in the template. There it is not type-safe

// onMounted(() =>  {
//     const swiper = new Swiper('.swiper', {
//         slidesPerView: 1,
//         pagination: {
//             el: '.swiper-pagination-bullets',
//             clickable: true
//         },
//         navigation: {
//             nextEl: '.next',
//             prevEl: '.prev'
//         },
//         loop: true,
//     })
// })

  const images = [
    '/furniture.jpg',
    '/furniture.jpg',
    '/furniture.jpg'
  ]

</script>

<style lang="scss">
    .swiper {
        width: 100%;
        height: 400px;
    }

    .swiper-slide {
        img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        }
    }

    .pagination-btn {
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        z-index: 1;
        height: max-content;
        font-size: 3rem;
        color: white;
        opacity: .8;
        cursor: pointer;
        &:hover {
            opacity: 1;
        }
    }

    .prev {
        left: 1rem;

    }

    .next {
        right: 1rem;
    }

    .swiper-pagination-bullets {
        position: absolute;
        margin: auto;
        bottom: 1rem;
        left: 0;
        right: 0;
        z-index: 1;
        cursor: pointer;
        text-align: center;
    } 

    .swiper-pagination-bullet {
        background-color: white;
    }

</style>

