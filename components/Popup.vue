<template>
        <dialog :open="open" id="dialogId">
            <span class="dialog-close-icon" @click="$emit('closeModal')">&#x2715</span>
            <p>{{ message }}</p>
        </dialog>
</template>

<script setup lang="ts">

    const props = defineProps({
        message: String,
        open: Boolean,
    })
    const emit = defineEmits(['closeModal'])

</script>

<style lang="scss">
    @use '../assets/scss/colors';
    @import '../assets/scss/mixins.scss';
    dialog {
        display: block;
        position: fixed;
        top: -100px;
        padding: 20px 40px;
        @include shadow;
        border-radius: .5rem;
        position: fixed;
        transition: all ease-in-out 300ms;
        border: 2px solid colors.$black
    }

    dialog[open] {
        @extend dialog;
        top: 70px;
    }

    .dialog-close-icon {
        position: absolute;
        top: .5rem;
        right: .7rem;
        font-size: 1rem;
        cursor: pointer;
    }

</style>