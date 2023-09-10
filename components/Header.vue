<template>
    <div class="header">
        <div class="header__links">
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/posts">Posts</NuxtLink>
            <!-- <a href="/about">About</a> -->
            <NuxtLink to="/profile" v-if="session?.user">Profile</NuxtLink>
            <NuxtLink to="" v-if="session?.user" @click="signOut()">Sign out</NuxtLink>
            <NuxtLink to="/signin" v-else>Sign in</NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">

    const { data: session, status, signOut } = useAuth()

</script>

<style lang="scss">
    @use '../assets/scss/colors';
    .header {
        position: fixed;
        margin: 0 auto;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 50px;
        background-color: colors.$black;
        color: white;
        z-index: 2;

        &__links {
            display: flex;
            align-items: center;
            width: 80vw;
            height: 100%;
            margin: 0 auto;
            color: white;
            font-size: 1rem;
            text-transform: uppercase;
            a {
                all: unset;
                display: grid;
                place-items: center;
                padding: 0 1rem;
                cursor: pointer;
                height: 100%;
                transition: all ease-in-out 300ms;
                &:hover {
                    background-color: white;
                    color: colors.$black;
                }
            }
        }
    }

</style>