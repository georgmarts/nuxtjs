<template>
        <Popup :open="isModalOpen" :message="fetchMessage" @close-modal="closeDialog"/>
        <div class='edit-post-card__loading' v-show="pending">
            <div class='edit-post-card__loading--img loading-animation'></div>
            <div class='edit-post-card__loading--title loading-animation'></div>
            <div class='edit-post-card__loading--time loading-animation'></div>
            <div class='edit-post-card__loading--text loading-animation'></div>
            <div class='edit-post-card__loading--text loading-animation'></div>
            <div class='edit-post-card__loading--text loading-animation'></div>
            <div class='edit-post-card__loading--text loading-animation'></div>
            <div class='edit-post-card__loading--text loading-animation'></div>
            <div class='edit-post-card__loading--button loading-animation'></div>
        </div>
        <div class='edit-post-card' v-show="!isEditingMode && !pending">
            <img src="/post-image.jpg" alt="">
            <h2>{{ post?.title }}</h2>
            <p>{{ post?.updatedAt }}</p>
            <p>{{ post?.body }}</p>
            <Button v-show="session?.user" label="Edit post" width="150px" @custom-function="handleEditMode"/>
        </div>
        <form class='edit-post-card' @submit.prevent="updatePost" v-show="isEditingMode && !pending">
            <h1>Edit post</h1>
            <input type="text" v-model="title">
            <textarea type="text" v-model="body"/>
            <div class="edit-post-card__buttons">
                <Button label="Save" width="150px"/>
                <Button label="Delete" width="150px" @custom-function="deletePost"/>
                <Button label="Cancel" width="150px" @custom-function="discardChanges"/>
            </div>
        </form>

</template>

<script setup lang="ts">
    const { data: session } = useAuth()
    const route = useRoute()    
    const { post, pending, error } = useGetPost(Number(route.params.id))
    const title = ref(post?.value?.title)
    const body = ref(post?.value?.body)
    const currentDate = ref(new Date().toISOString().slice(0, 19).replace('T', ' '))   
    const isEditingMode = ref(false)
    const isModalOpen = ref(false)
    const fetchMessage = ref()
    
    watch(post, () => {
        title.value = post?.value?.title
        body.value = post?.value?.body
    })

    onMounted(() => {
        if(error.value) navigateTo('/posts')
    })

    function openDialog() {
        isModalOpen.value = true
    }

    function closeDialog() {
        isModalOpen.value = false
        fetchMessage.value = ''
    }

    function handleEditMode() {
        isEditingMode.value = !isEditingMode.value
    }

    async function updatePost() {
       const {response } = await useUpdatePost({id: Number(route.params.id), title: title.value, body: body.value, updatedAt: currentDate.value})
       fetchMessage.value = response.message
       openDialog()
       handleEditMode()
    }

    function discardChanges() {
        title.value = post?.value?.title
        body.value = post?.value?.body
        isEditingMode.value = false
    }

    async function deletePost() {
        const {response} = await useDeletePost(post?.value?.id)
        fetchMessage.value = response.message
        navigateTo('/posts') 
    }

</script>

<style lang="scss">
@use '../../assets/scss/colors';
@import '../../assets/scss/mixins.scss';
    .edit-post-card, .edit-post-card__loading  {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 80vw;
        padding: 3rem;
        margin: 100px auto 50px auto;
        background: white;
        @include shadow;
        textarea {
            width: 100% !important;
            height: 500px;
            font-size: 1rem;
            font-family: Arial, Helvetica, sans-serif;
            padding: 1rem;
            border: 1px solid lightgray;
            @include shadow;
            &:focus {
                outline: none;
                border: 2px solid colors.$black;
            }
        }
        img {
            object-fit: cover;
            width: 100%;
            height: 30vh;
            overflow: hidden;
        }
        input {
            padding: 1rem;
            font-size: 1rem;
            border: 1px solid lightgray;
            @include shadow;
            &:focus {
                outline: none;
                border: 2px solid colors.$black;
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
            gap: .5rem;
        }
    }
    
    .edit-post-card__loading {
        background-color: lightgray;
        &--img {
            width: 100%;
            height: 30vh;
            background-color: colors.$gray;
        }
        &--title, &--time, &--text, &--button {
            position: relative;
            overflow: hidden;
            width: 50%;
            height: 2.5rem;
            background-color: colors.$gray;
        }
        &--time {
            width: 150px;
            height: 2rem;
        }
        &--text {
            width: 100%;
            height: 2rem;
        }
        &--button {
            width: 150px;
        }
    }

</style>
