<template>
    <Popup :message="fetchMessage" :open="isModalOpen" @close-modal="closeModal"/>
    <div class="signup-form__container">
        <form class="signup-form" @submit.prevent="onSubmit">
            <h2>Sign up</h2>
            <input type="text" placeholder="First name" v-model="firstName">
            <span>{{ errors.firstName }}</span>
            <input type="text" placeholder="Last name" v-model="lastName">
            <span>{{ errors.lastName }}</span>
            <input type="email" placeholder="Email" v-model="email">
            <span>{{ errors.email }}</span>
            <input type="text" placeholder="Phone number" v-model="phoneNumber">
            <span>{{ errors.phoneNumber }}</span>
            <input type="password" placeholder="Password" v-model="password">
            <span>{{ errors.password }}</span>
            <input type="password" placeholder="Confirm password" v-model="confirmPassword">
            <span>{{ errors.confirmPassword }}</span>
            <Button label="Submit" width="100%"/>
        </form>
    </div>
</template>
<script setup lang="ts">

    import * as z from 'zod'
    import { useField, useForm } from 'vee-validate'
    import { toTypedSchema } from '@vee-validate/zod'

    const isModalOpen = ref(false)
    const fetchMessage = ref('')

    const validationSchema = toTypedSchema(
        z.object({
        firstName: z.string({required_error: 'First name is required'}),
        lastName: z.string({required_error: 'Last name is required'}),
        email: z.string({required_error: 'Email is required'}).email({message: 'Email address is not valid'}),
        phoneNumber: z.string({required_error: 'Phone number is required'}),
        password: z.string({required_error: 'Password is required'}),
        confirmPassword: z.string({required_error: 'Password confirmation is required'})
        }).refine((data) => data.password === data.confirmPassword, {
            message: "Passwords don't match",
            path: ["confirmPassword"]
        })
    )

    const { handleSubmit, errors } = useForm({
        validationSchema
    })

    const { value: firstName } = useField('firstName')
    const { value: lastName } = useField('lastName')
    const { value: email } = useField('email')
    const { value: phoneNumber } = useField('phoneNumber')
    const { value: password } = useField('password')
    const { value: confirmPassword } = useField('confirmPassword')

    const onSubmit = handleSubmit(async (values, {resetForm}) => {
        console.log(values)
        await $fetch('/api/user', {
        method: 'POST',
        body: {id: Date.now(), firstName: values.firstName, lastName: values.lastName, email: values.email, phoneNumber: values.phoneNumber, password: values.password}
        })
        .then(res => fetchMessage.value = 'User is added successfully')
        .catch(err => fetchMessage.value = err.statusMessage)
        isModalOpen.value = true
        resetForm()
        await navigateTo('/signin')
    })

    function closeModal() {
        isModalOpen.value = false
    }

</script>
<style lang="scss">
@use '../assets/scss/colors';
@import '../assets/scss/mixins';
    .signup-form__container {
        display: flex;
        justify-content: center;
        width: 400px;
        margin: 100px auto;
        background-color: white;
        padding: 2rem 0;
        @include shadow;
    }
    .signup-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1.2rem;
        height: max-content;
        width: 80%;
        h2 {
            align-self: center;
        }
        input {
            padding: 1rem;
            font-size: 1rem;
            border: 0 solid lightgrey;
            outline: 1px solid lightgray;
            border-radius: .5rem;
            transition: outline ease-in-out 300ms;
            &:focus {
                outline: 1px solid colors.$black;
            }
        }
        span {
            color: red;
            font-size: .875rem;
            margin-top: -10px;
            margin-left: 10px;
        }
        button {
            align-self: center;
            font-size: large;
        }
    }
</style>