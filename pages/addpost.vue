<template>
        <Popup :message='fetchMessage' :open="isModalOpen" @close-dialog="closeDialog"/>
        <form class='add-post-card' @submit="addPost">
            <h1>Write new post</h1>
            <input type="text" placeholder="Title" v-model="title">
            <textarea type="text" placeholder="Text" v-model="body"/>
            <div class="add-post-card__buttons">
                <Button label="Add post" width="150px"/>
                <Button label="Discard changes" width="150px" v-show="title.length > 0 || body.length > 0" @custom-function="emptyInputs"/>
                <NuxtLink to="/posts" style="all: unset"><Button label="Go back" width="150px"/></NuxtLink>
            </div>
        </form>
</template>

<script setup lang="ts">
    const title = ref('')
    const body = ref('')
    const currentDate = ref(new Date().toISOString().slice(0, 19).replace('T', ' '))   
    const fetchMessage = ref('')
    const isModalOpen = ref(false)

    function closeDialog() {
        isModalOpen.value = false
    }

    function emptyInputs() {
        title.value = ''
        body.value = ''
    }

    async function addPost() {
        await useAddPost({id: Date.now(), title: title.value, body: body.value, createdAt: currentDate.value})
        fetchMessage.value = 'Post is added successfully'
        isModalOpen.value = true
        emptyInputs()
    }

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
        // button {
        //     all: unset;
        //     width: max-content;
        //     padding: 0.5rem 2rem;
        //     background-color: colors.$black;
        //     color: white;
        //     cursor: pointer;
        //     border-radius: .5rem;
        // }
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
    }
</style>
