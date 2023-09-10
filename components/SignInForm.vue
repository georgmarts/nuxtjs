<template>
    <form class="signup-form" @submit="logIn">
        <h2>Sign ip</h2>
        <input type="text" placeholder="Email" required v-model="form.email">
        <input type="text" placeholder="Password" required v-model="form.password">
        <Button :label="isPending ? 'Loading...' : 'Log in'" width="80%"/>
        <p>{{ signInStatus }}</p>
    </form>
</template>
<script setup lang="ts">
    const { data: session, status: signInStatus, signIn } = useAuth()
    const fetchStatus = ref('')
    const isPending = ref(false)
    const fetchResponse = ref()
    const form = ref({
        email: '',
        password: ''
    })

    function closeDialog() {
        fetchStatus.value = 'updated'
    }

    async function logIn(event: Event) {
        event.preventDefault()
        await signIn('credentials', {email: form.value.email, password: form.value.password, callbackUrl: '/'})
    }

</script>
<style lang="scss">
    .signup-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        width: 400px;
        height: max-content;
        margin: 70px auto;
        padding: 2rem 0;
        box-shadow: 0 0 3px -1px grey;
        background-color: white;
        input {
            padding: 1rem;
            font-size: 1rem;
            border: 0 solid lightgrey;
            outline: 1px solid lightgray;
            border-radius: .5rem;
            transition: outline ease-in-out 300ms;
            width: 80%;
            &:focus {
                outline: 1px darkcyan solid;
            }
        }
    }
</style>