<template>
    <div class="app_container">
        <transition>
            <router-view></router-view>
        </transition>
        <Mynavbar></Mynavbar>
    </div>
</template>
<script>
export default {
    data(){
        return {
          list:{}
        }
    },
    methods:{
        getInfo(){
            this.$axios.get('https://novel.juhe.im/categories').then(res=>{
                
                window.localStorage.setItem('data_f',JSON.stringify(res.data))
            })
            this.$axios.get('https://novel.juhe.im/sub-categories').then(res=>{
                window.localStorage.setItem('data_s',JSON.stringify(res.data))
            })

            this.$axios.get('https://novel.juhe.im/rank-category').then(res=>{
                   window.localStorage.setItem('ranking',JSON.stringify(res.data)) 
            });
            let male = [
                this.$axios.get('https://novel.juhe.im/rank/54d42d92321052167dfb75e3'),
                this.$axios.get('https://novel.juhe.im/rank/5a6844aafc84c2b8efaa6b6e'),
                this.$axios.get('https://novel.juhe.im/rank/5a6844f8fc84c2b8efaa8bc5')
            ]
            let female = [
                this.$axios.get('https://novel.juhe.im/rank/54d43437d47d13ff21cad58b'),
                this.$axios.get('https://novel.juhe.im/rank/5a684551fc84c2b8efaab179'),
                this.$axios.get('https://novel.juhe.im/rank/5a684515fc84c2b8efaa9875')
            ]
            let picture = [
                this.$axios.get('https://novel.juhe.im/rank/5a322ef4fc84c2b8efaa8335'),
                this.$axios.get('https://novel.juhe.im/rank/5a68296bfc84c2b8ef9efdb0'),
                this.$axios.get('https://novel.juhe.im/rank/5a39ca59fc84c2b8ef82e96c')
            ]
            let pub = [
                this.$axios.get('https://novel.juhe.im/rank/5a323096fc84c2b8efab2482'),
                this.$axios.get('https://novel.juhe.im/rank/5a39d435fc84c2b8ef884798'),
                this.$axios.get('https://novel.juhe.im/rank/5a39d453fc84c2b8ef885812')
            ]

            let data_m = {}
            let data_f = {}
            let data_p = {}
            let data_pub = {}
                this.$axios.all(male).then(this.$axios.spread((a,b,c)=>{
                   data_m = {hot:a.data,good:b.data,more:c.data}
                   window.localStorage.setItem('rank_male',JSON.stringify(data_m)) 
            }))
           
               this.$axios.all(female).then(this.$axios.spread((a,b,c)=>{
                  data_f = {hot:a.data,good:b.data,more:c.data}
                   window.localStorage.setItem('rank_female',JSON.stringify(data_f)) 
            }))
            this.$axios.all(picture).then(this.$axios.spread((a,b,c)=>{
                   data_p = {hot:a.data,sale:b.data,end:c.data}
                   window.localStorage.setItem('rank_pic',JSON.stringify(data_p)) 
            }))
            this.$axios.all(pub).then(this.$axios.spread((a,b,c)=>{
                   data_pub = {hot:a.data,sale:b.data,new:c.data}
                   window.localStorage.setItem('rank_pub',JSON.stringify(data_pub)) 
            }))
               
        }
    },
    created(){
        this.getInfo()
         
    },
    mounted(){
        this.$store.state.height = window.screen.availHeight       
    }

}
</script>

<style lang="css" scoped>
.app_container {
    overflow-x: hidden;
    overflow-y:auto;
    width: 100%;
    position: relative;
}
.v-enter {
    opacity: 0;
    transform: translateX(100%);
    position: absolute;
}

.v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
}
.v-enter-active {
    transition: all 0.5s ease;
}
/* ::-webkit-scrollbar {
width: 0px;
}

::-webkit-scrollbar-track {
background-color: none;
}

::-webkit-scrollbar-thumb {
background-color: none;
}

::-webkit-scrollbar-thumb:hover {
background-color: none;
}

::-webkit-scrollbar-thumb:active {
background-color: none;
} */

</style>
