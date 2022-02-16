<template>
    <v-btn @click="logout" :color="color" :block="true">
        <v-icon left>
          mdi-logout
        </v-icon>
        ログアウト
    </v-btn>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'LogoutBtn',

    props: {
        color: {
            type: String,
            default: 'primary',
        },
    },

    methods: {
        logout() {
            this.$store.dispatch('auth/logout')
        }
    },

    computed: mapState({
        isLogout: state => state.auth.state.emailAddress
    }),
    watch: {
        isLogout: function() {
            this.$router.push('/');
        }
    }
}
</script>
