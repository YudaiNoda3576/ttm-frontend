<template>
    <div>
        <v-main>
            <v-card :tile="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs" class="mx-auto fill-width" flat max-width="540">
                <div class="pt-6">
                    <div>
                        <v-text-field v-model="emailAddress" :rules="[emailRules.required, emailRules.regex]" autofocus dense height="48px" outlined placeholder="メールアドレスを入力してください"></v-text-field>
    
                        <v-text-field v-model="password" :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" :rules="[passwordRules.required]" :type="passwordShow ? 'text' : 'password'" dense height="48px" name="input-password" outlined placeholder="パスワードを入力してください" @click:append="passwordShow = !passwordShow"></v-text-field>
                    </div>
                    <v-btn @click="login">ログイン</v-btn>
                </div>
            </v-card>
        </v-main>
    </div>
</template>
  
<script>
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
            }
        };
    },
    methods: {
        login() {
            this.$store.dispatch('auth/login', {
                emailAddress: this.emailAddress,
                password: this.password
            });
            // this.$router.push('/home').catch(err => console.log(`エラー：${err}`));
        }
    },
    computed: {
        isLogedIn() {
            return this.$store.state.emailAddress
        }
    },
    watch: {
        isLogedIn() {
            this.$router.push('/home').catch(err => console.log(`エラー：${err}`));
        }
    }
};
</script>

<style scoped>
.fill-width {
    top: 100%;
    left: 31%;
    text-align: center;
}

.error--text {
    color: red !important;
}
</style>