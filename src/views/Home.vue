<template>
    <div>
        <h1>Home画面です</h1>
        <p>API取得値：{{ text }}</p>
       
    </div>
</template>

<script>
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
       
    },

}
</script>
