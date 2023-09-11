<template>
    <div class="footer">
        <div class="footer__wrapper">
            <div class="footer__column">
                <h3>Link title</h3>
                <a href="">Link 1</a>
                <a href="">Link 2</a>
                <a href="">Link 3</a>
            </div>
            <div class="footer__column">
                <h3>Link title</h3>
                <a href="">Link 1</a>
                <a href="">Link 2</a>
                <a href="">Link 3</a>
            </div>
            <div class="footer__column">
                <h3>Link title</h3>
                <a href="">Link 1</a>
                <a href="">Link 2</a>
                <a href="">Link 3</a>
            </div>
            <div class="footer__column">
                <h3>Link title</h3>
                <a href="">Link 1</a>
                <a href="">Link 2</a>
                <a href="">Link 3</a>
            </div>
        </div>
    </div>
</template>
<script lang="ts">

</script>
<style lang="scss">
@use '../assets/scss/colors';
    .footer {
        margin: 0 auto;
        width: 100vw;
        height: max-content;
        background-color: colors.$black;
        padding: 3rem 10rem;
        &__wrapper {
            display: flex;
            justify-content:space-between;
        }
        &__column {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        h3 {
            margin: 0;
            color: white;
        }
        a {
            all: unset;
            color: white;
            opacity: .7;
            cursor: pointer;
            transition: all ease-in-out 300ms;
            &:hover {
                opacity: 1;
            }
        }
    }
</style>