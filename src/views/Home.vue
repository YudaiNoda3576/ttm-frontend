<template>
    <div>
        <h1>Home画面です</h1>
        <router-link to="/about">about</router-link>
        <p>API取得値：{{ text }}</p>
        <v-btn @click="logout" color="#7b68ee">ログアウト</v-btn>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'HomeView',
    data(){
        return{
            text: null,
        }
    },
    created() {
        this.getApi();
    },
    props: {

    },
    methods: {
        getApi() {
            const _this = this;
            this.$axios.get('/home')
            .then(response => {
                _this.text = response.data
            })
            .catch(error => {
                _this.text = error
            })
        },
        logout() {
            this.$store.dispatch('auth/logout')
        }
    },
    computed: mapState({
        isLogout: state => state.auth.emailAddress
    }),
    watch: {
        isLogout: function(){
            this.$router.push('/');
        }
    }

}
</script>
