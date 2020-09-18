<template>
    <div>
        123
       <van-divider @click="toLogin">去登录</van-divider>
    </div>
</template>
<script>
export default {
    methods:{
        toLogin(){
            this.$refs.replace('/userLogin')
        }
    }
}
</script>