<template>
    <Popup :message="fetchMessage" :open="isModalOpen" @close-modal="closeModal"/>
     <div class="profile" v-show="!isEditingMode && session?.user">
        <img src="/profile-photo.jpg" alt="">
        <div class="profile__body">
            <h2>{{ firstName }} {{ lastName }}</h2>
            <p>Email: {{ initialFormValues.email }}</p>
            <p>Phone number: {{ phoneNumber }}</p>
            <Button label="Edit profile" width="200px" @custom-function="toggleEditingMode"/>
            <Button label="Delete" width="200px" @custom-function="deleteUser"/>
        </div>
     </div>
     <div class="profile-form__container" v-show="isEditingMode">
        <form class="profile-form" @submit.prevent="onSubmit">
            <div class="profile-form__input-card">
                <label v-if="!errors.firstName" for="firstName">First name</label>
                <span v-else>{{ errors.firstName }}</span>
                <input type="text" placeholder="First name" v-model="firstName" name="firstName">
            </div>
            <div class="profile-form__input-card">
                <label v-if="!errors.lastName" for="lastName">Last name</label>
                <span v-else>{{ errors.lastName }}</span>
                <input type="text" placeholder="Last name" v-model="lastName" name="lastName">
            </div>
            <div class="profile-form__input-card">
                <label for="email">Email</label>
                <input type="email" placeholder="Email" v-model="initialFormValues.email" readonly name="email">
            </div>
            <div class="profile-form__input-card">
                <label v-if="!errors.phoneNumber" for="phoneNumber">Phone number</label>
                <span v-else>{{ errors.phoneNumber }}</span>
                <input type="text" placeholder="Phone number" v-model="phoneNumber" name="phoneNumber">
            </div>
            <div class="profile-form__input-card">
                <label for="password" v-if="!errors.password">New Password</label>
                <span v-else>{{ errors.password }}</span>
                <input type="password" placeholder="New password" v-model="password" name="newPassword">
            </div>
            <div class="profile-form__input-card">
                <label for="confirmPassword" v-if="!errors.confirmPassword">Confirm password</label>
                <span v-else>{{ errors.confirmPassword }}</span>
                <input type="password" placeholder="Repeat password" v-model="confirmPassword" name="confirmPassword">
            </div>
            <div class="profile-form__buttons">
                <Button label="Submit" width="150px"/>
                <Button label="Cancel" width="150px" @custom-function="discardChanges"/>
            </div>
        </form>
     </div>
</template>
<script setup lang="ts">

    import * as z from 'zod'
    import { useField, useForm } from 'vee-validate'
    import { toTypedSchema } from '@vee-validate/zod'

    const { data: session, signOut } = useAuth()
    const isModalOpen = ref(false)
    const fetchMessage = ref('')
    const { user } = useGetUser(session.value?.user.id)
    const isEditingMode = ref(false)

    const validationSchema = toTypedSchema(
        z.object({
        firstName: z.string({required_error: 'First name is required'}),
        lastName: z.string({required_error: 'Last name is required'}),
        phoneNumber: z.string({required_error: 'Phone number is required'}),
        password: z.string({required_error: 'Password is required'}).nonempty('New password is required'),
        confirmPassword: z.string({required_error: 'Password confirmation is required'}).nonempty('Confrimation is required')
        }).refine((data) => data.password === data.confirmPassword, {
            message: "Passwords don't match",
            path: ["confirmPassword"]
        })
    )

    const initialFormValues = ref({
        firstName: user.value?.firstName,
        lastName: user.value?.lastName,
        email: user.value?.email,
        phoneNumber: user.value?.phoneNumber,
        password: '',
        confirmPassword: ''
    })

    watch(user, () => {
        initialFormValues.value = {
        firstName: user.value?.firstName,
        lastName: user.value?.lastName,
        email: user.value?.email,
        phoneNumber: user.value?.phoneNumber,
        password: '',
        confirmPassword: ''
    }
    })

    const { handleSubmit, errors } = useForm({
        validationSchema,
        initialValues: initialFormValues
    })

    const { value: firstName } = useField('firstName')
    const { value: lastName } = useField('lastName')
    const { value: phoneNumber } = useField('phoneNumber')
    const { value: password } = useField('password')
    const { value: confirmPassword } = useField('confirmPassword')

    const onSubmit = handleSubmit(async (values, {resetForm}) => {
        await useEditUser({firstName: values.firstName, lastName: values.lastName, phoneNumber: values.phoneNumber, password: values.password, id: user.value?.id})
        isModalOpen.value = true
        fetchMessage.value = 'User information is successfully updated!'
        isEditingMode.value = false
        resetForm()
    })

    function discardChanges() {
        isEditingMode.value = false
        
    }

    function closeModal() {
        isModalOpen.value = false
    }

    function toggleEditingMode() {
        isEditingMode.value = true
    }

    async function deleteUser() {
        await useDeleteUser(session.value?.user.id)
        signOut()
    }

</script>
<style lang="scss">
    @use '../assets/scss/colors';
    @import '../assets/scss/mixins';
    .profile {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        justify-content: center;
        margin: 100px auto;
        font-size: 1.1rem;
        gap: 1rem;
        @include shadow;
        background-color: white;
        padding: 2rem;
        overflow: hidden;
        width: 70vw;
        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        h2 {
            margin: 0;
        }
        &__body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 1rem;
            margin-left: 5%;
        }
        p {
            margin: 0;
        }
        button {
            margin-top: 0;
        }
        @media screen and (max-width: 768px) {
            font-size: 1rem;
        }
    }
    .profile-form__container {
        width: 400px;
        margin: 70px auto;
        padding: 2rem;
        @include shadow;
        background-color: white;
    }
    .profile-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1.2rem;
        &__input-card {
            display: flex;
            flex-direction: column;
            gap: .5rem;
            width: 80%;
        }
        label {
            font-size: .875rem; 
            color: colors.$black;
        }
        input {
            padding: 1rem;
            font-size: 1rem;
            border: 0 solid lightgrey;
            outline: 1px solid lightgray;
            border-radius: .5rem;
            transition: outline ease-in-out 300ms;
            &:focus {
                outline: 1px darkcyan solid;
            }
        }
        span {
            font-size: .875rem; 
            color: red; 
        }
        &__buttons {
            display: flex;
            gap: .5rem;
        }
    }
</style>