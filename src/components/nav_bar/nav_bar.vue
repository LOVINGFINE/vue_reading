<template>
    <div>
        <div class="nav_bar" v-show="this.$store.state.flog">
            <router-link class="nav_link" to="/mybooks" active-class="link_active">
                <span class="nav_link_icon icon-book"></span>
                书架    
            </router-link>
            <router-link class="nav_link" to="/shop" active-class="link_active">
                <span class="nav_link_icon icon-books"></span>
                书库
            </router-link>
            <router-link class="nav_link" to="/find" active-class="link_active">
                <span class="nav_link_icon icon-picasa"></span>
                发现
            </router-link>
            <router-link class="nav_link" to="/myhome" active-class="link_active">
                <span class="nav_link_icon icon-user"></span>
                我的
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name:'Mynavbar',
    data(){
        return {
            
        }
    },
    methods:{
         
    },
    watch:{
        "$route":function(){
            // if(this.$route.path == '/find'||'/myhome'||'/mybooks'||'/shop/recommend'){
            //     this.flog = true
            // }
            // this.flog = false
            // console.log(this.flog);
        }
    }
}
</script>

<style scoped lang="scss">
.nav_bar {
    border-top: 1px solid #999;
    width: 100%;
    height: 55px;
    position: fixed;
    bottom: 0;
    display: flex;
    background-color: #fff;
    z-index: 1000;
}
.nav_link {
    display: block;
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: rgb(90, 90, 90);
}
.nav_link_icon {
    display: block;
    line-height: 35px;
    font-size: 24px;
}
.link_active {
    color: rgb(168, 5, 5);
}
</style>