<template>
    <Popup :message="fetchMessage" :open="isModalOpen" @close-modal="closeModal"/>
    <form class="signup-form" @submit.prevent="onSubmit">
        <h2>Sign up</h2>
        <input type="text" placeholder="First name" v-model="form.firstName">
        <span v-if="errors?.firstName" v-for="error in errors.firstName._errors">{{ error }}</span>
        <input type="text" placeholder="Last name" v-model="form.lastName">
        <input type="email" placeholder="Email" v-model="form.email">
        <input type="text" placeholder="Phone number" v-model="form.phoneNumber">
        <input type="password" placeholder="Password" v-model="form.password">
        <input type="password" placeholder="Confirm password" v-model="form.confirmPassword">
        <Button label="Submit" width="80%"/>
    </form>
</template>
<script setup lang="ts">
    import z from 'zod'
    const isModalOpen = ref(false)
    const fetchMessage = ref('')

    const formSchema = z.object({
        firstName: z.string().nonempty({message: 'Enter first name'}),
        lastName: z.string().nonempty({message: 'Enter last name'}),
        email: z.string().nonempty({message: 'Enter email address'}).email({message: 'Email address is not valid'}),
        phoneNumber: z.string().nonempty({message: 'Enter phone number'}),
        password: z.string().nonempty({message: 'Enter password'}),
        confirmPassword: z.string().nonempty({message: 'Confirm password'})
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"]
    })
    type formSchemaType = z.infer<typeof formSchema>
    const errors = ref<z.ZodFormattedError<formSchemaType> | null>(null)

    function onSubmit(e: Event) {
        console.log('event', e)
        const validSchema = formSchema.safeParse(form.value)
        if(!validSchema.success) {
            errors.value = validSchema.error.format()
        } else {
            errors.value = null
        }
    }

    const form = ref({
        id: Date.now(),
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    })
    const confirmPassword = ref('')

    async function addUser(event: Event) {
        event.preventDefault()
        await $fetch('/api/user', {
        method: 'POST',
        body: form.value
        })
        .then(res => fetchMessage.value = 'User is added successfully')
        .catch(err => fetchMessage.value = err.statusMessage)
        isModalOpen.value = true
        fetchMessage.value === 'User is added successfully' ? (form.value = {
        id: Date.now(),
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
        },
        confirmPassword.value = '') : null
    }

    function closeModal() {
        isModalOpen.value = false
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