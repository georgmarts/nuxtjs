<template>
        <Popup :message='fetchMessage' :open="isModalOpen" @close-modal="closeDialog"/>
        <form class='add-post-card' @submit.prevent="addPost">
            <h1>Write new post</h1>
            <input type="text" placeholder="Title" v-model="title" name="title">
            <span>{{ errors.title }}</span>
            <Field as="textarea" placeholder="Text" v-model="body" name="body"/>
            <span>{{ errors.body }}</span>
            <div class="add-post-card__buttons">
                <Button label="Add post" width="150px"/>
                <NuxtLink to="/posts" style="all: unset"><Button label="Go back" width="150px"/></NuxtLink>
            </div>
        </form>
</template>

<script setup lang="ts">
    import * as z from 'zod'
    import { useField, useForm, Field } from 'vee-validate'
    import { toTypedSchema } from '@vee-validate/zod'

    const currentDate = ref(new Date().toISOString().slice(0, 19).replace('T', ' '))   
    const fetchMessage = ref('')
    const isModalOpen = ref(false)

    const validationSchema = toTypedSchema(
        z.object({
        title: z.string({required_error: 'Title is required'}),
        body: z.string({required_error: 'Text is required'}),
        })
    )
    const { handleSubmit, errors } = useForm({
        validationSchema
    })

    const { value: title } = useField('title')
    const { value: body } = useField('body')

    function closeDialog() {
        isModalOpen.value = false
    }

    const addPost = handleSubmit(async (values, {resetForm}) => {
        const { response } = await useAddPost({id: Date.now(), title: values.title, body: values.body, createdAt: currentDate.value})
        fetchMessage.value = (await response).message
        fetchMessage.value === 'Post is added successfully' && navigateTo('/posts')
        isModalOpen.value = true
        resetForm()
    })

</script>

<style lang="scss">
    @use '../assets/scss/colors';
    @import '../assets/scss/mixins';
    .add-post-card {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        height: 100vh;
        width: 60vw;
        padding: 5rem 0;
        margin: 0 auto;
        textarea {
            height: 500px;
            width: 100% !important;
            font-size: 1rem;
            font-family: Arial, Helvetica, sans-serif;
            padding: 1rem;
            border: 1px solid lightgray;
            @include shadow;
            &:focus {
                outline: none;
                border: 1px solid colors.$black;
            }
        }
        input {
            padding: 1rem;
            font-size: 1rem;
            border: 1px solid lightgray;
            @include shadow;
            &:focus {
                outline: none;
                border: 1px solid colors.$black;
            }
        }
        h1, h2, p {
            margin: 0;
        }
        &__time {
            display: grid;
            grid-template-columns: repeat(auto-fit, 250px);
            justify-content: space-between;
            text-transform: capitalize;
        }
        &__buttons {
            display: flex;
            gap: 1rem;
        }
        span {
            transform: translateX(.5rem) translateY(-.5rem);
            color: red;
            font-size: .875rem;
        }
    }
</style>