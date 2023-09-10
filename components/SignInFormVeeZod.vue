<template>
    <form class="signin-form" @submit.prevent="onSubmit">
        <Popup :open="isModalOpen" :message="fetchMessage" @close-modal="closeModal" />
        <h2>Sign in</h2>
        <div class="signin-form__input-card">
            <input type="text" placeholder="Email" v-model="email">
            <span>{{ errors.email }}</span>
        </div>
        <div class="signin-form__input-card">
            <input type="text" placeholder="Password" v-model="password">
            <span>{{ errors.password }}</span>
        </div>
        <Button label="Log in" width="80%"/>
        <p class="signin-form__signup-link"><span>Don't have an account.</span><a href="/signup">Sign up</a></p>
    </form>
</template>
<script setup lang="ts">

    import * as z from 'zod'
    import { useField, useForm } from 'vee-validate'
    import { toTypedSchema } from '@vee-validate/zod'

    const { data: session, status: signInStatus, signIn, signOut } = useAuth()
    const isModalOpen = ref(false)
    const fetchMessage = ref()

    const validationSchema = toTypedSchema(
        z.object({
        email: z.string({required_error: 'Email is required'}).email({message: 'Email address is not valid'}),
        password: z.string({required_error: 'Password is required'}),
        })
    )
    const { handleSubmit, errors } = useForm({
        validationSchema
    })
    const { value: email } = useField('email')
    const { value: password } = useField('password')

    function closeModal() {
        isModalOpen.value = false
    }

    const onSubmit = handleSubmit(async (values) => {
        await signIn('credentials', {email: values.email, password: values.password, callbackUrl: '/'})
        if(!session.value?.user) {
            fetchMessage.value = 'Email or password is not correct. Try again'
        } else {
            fetchMessage.value = 'Logged in successfully'
        }
        isModalOpen.value = true
    })

</script>
<style lang="scss">
    @use '../assets/scss/colors';
    .signin-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        width: 400px;
        height: max-content;
        margin: 100px auto;
        padding: 2rem 0;
        box-shadow: 1px 1px 2px -1px rgba(0, 0, 0, 0.719);
        background-color: white;
        border-radius: 1rem;
        &__input-card{
            display: flex;
            flex-direction: column;
            gap: .5rem;
            width: 80%;
        }
        span {
            margin-left: 5px;
            color: red;
            font-size: .875rem;
        }
        input {
            padding: 1rem;
            font-size: 1rem;
            border: 0 solid lightgrey;
            outline: 1px solid lightgray;
            border-radius: .5rem;
            transition: outline ease-in-out 300ms;
            width: 100%;
            &:focus {
                outline: 1px solid colors.$black;
            }
        }
        a {
            all: unset;
            cursor: pointer;
            color: black;
            transition: all ease-in-out 300ms;
            font-weight: 600;
            &:hover {
                text-decoration: underline;
            }
        }
        &__signup-link {
            display: flex;
            gap: .5rem;
            span {
                all: unset;
            }
        }
    }
</style>