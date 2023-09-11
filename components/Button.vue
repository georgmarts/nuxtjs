<template>
    <button class="custom-button" @click="$emit('customFunction')" :style="buttonStyle" :disabled="isPending">{{ label }}</button>
</template>
<script setup lang="ts">
    const props = defineProps({
        label: String,
        width: String,
        isPending: Boolean
    })
    const buttonStyle = reactive({
        width: props.width
    })
    const emit = defineEmits(['customFunction'])
</script>
<style lang="scss">
    @use '../assets/scss/colors';
        .custom-button {
            all: unset;
            width: max-content;
            padding: 0.5rem 0;
            background-color: colors.$black;
            color: white;
            cursor: pointer;
            border-radius: .5rem;
            font-size: 1rem;
            text-align: center;
        }
</style>