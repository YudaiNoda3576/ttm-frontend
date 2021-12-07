<template>
    <div>
        <v-main>
            <v-card :tile="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs" elevation="2" class="mx-auto fill-width" flat max-width="540" height="300">
                <div class="pt-6">
                    <v-card-title>ログイン</v-card-title>
                    <div class="forms">
                        <v-text-field v-model="emailAddress" :rules="[emailRules.required, emailRules.regex]" autofocus dense height="48px" outlined placeholder="メールアドレスを入力してください"></v-text-field>
                        <v-text-field v-model="password" :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" :rules="[passwordRules.required]" :type="passwordShow ? 'text' : 'password'" dense height="48px" name="input-password" outlined placeholder="パスワードを入力してください" @click:append="passwordShow = !passwordShow"></v-text-field>
                    </div>
                    <div v-if="hasError" class="error--text">
                        ログインに失敗しました。
                    </div>
                    <v-btn @click="login" color="#7b68ee">ログイン</v-btn>
                </div>
            </v-card>
        </v-main>
    </div>
</template>
  
<script>
import {mapState} from 'vuex'
export default {
    name: 'Login',
    data() {
        return {
            emailAddress: '',
            password: '',
            emailRules: {
                required: value =>
                    !!value || 'メールアドレスは必須です',
                regex: value =>
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                        value
                    ) || 'メールアドレスの形式が違います'
            },
            passwordShow: false,
            passwordRules: {
                required: value =>
                    !!value || 'パスワードは必須です',
            },
            hasError: false
        };
    },
    methods: {
        login() {
            this.$store.dispatch('auth/login', {
                emailAddress: this.emailAddress,
                password: this.password,

            });
        }
    },
    computed: mapState({
        isLogedIn: state => state.auth.emailAddress,
        isError: state => state.auth.error
    }),
    watch: {
        isLogedIn: function() {
            this.$router.push('/home')
        },
        isError: function() {
            this.hasError = true
        }
    },
};
</script>

<style scoped>
.fill-width {
    top: 50%;
    text-align: center;
}

.error--text {
    color: red !important;
}

.forms {
    width: 80%;
    margin:0 auto;
}
</style>