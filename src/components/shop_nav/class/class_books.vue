<template>
  <div class="class_books">
      <div class="class_top">
          <router-link to="/shop" class="class_back icon-chevron-thin-left"></router-link>
          分类
          <a href="" class="all_link icon-grid"></a>
      </div>
      <div class="class_main" :style="'height:'+(this.$store.state.height-45)+'px'">
          <div class="class_nav" :style="'height:'+(this.$store.state.height-45)+'px'">
              <router-link class="nav-item" tag="div" to="/class_books/male">男生</router-link>
              <router-link class="nav-item" tag="div" to="/class_books/female">女生</router-link>
              <router-link class="nav-item" tag="div" to="/class_books/class_picture">漫画</router-link>
              <router-link class="nav-item" tag="div" to="/class_books/class_more">其它</router-link>
          </div>
          <transition>
              <router-view class="class_show"></router-view>
          </transition>
      </div>
  </div>
</template>
<script>
export default {
    data(){
        return {
           male:[],
           female:[],
           press:[],
           magic:[]
        }
    },

    methods:{
       getInfo(){
               let data = JSON.parse(window.localStorage.getItem('data_f'))
               this.male = data.male
               this.female = data.female
               this.press = data.press
               this.magic = data.picture     
       }
    },
    created(){
        this.$store.state.flog = false
        this.getInfo()
    },
    mounted(){
    }
}
</script>

<style scoped lang="scss">
   .class_books {
       width: 100%;
       .class_top {
           position: fixed;
           top: 0;
           width: 100%;
           height: 45px;
           line-height: 45px;
           font-size: 18px;
           text-align: center;
           background-color: #fff;
           color: #333;
           z-index: 600;
           border-bottom: 1px solid rgb(224, 224, 224);
           a {
               position: absolute;
               top: 50%;
               transform: translateY(-50%);
               color: rgb(146, 6, 6);
           }
           .class_back {
               left: 12px;
               font-size: 20px;
           }
           .all_link {
               right: 15px;
               font-size: 24px;
           }
       }
       .class_main {
           width: 100%;
           margin-top: 45px;
           display: flex;
           .class_nav {
               flex: 3;
               height: 550px;
               border-right: 1px solid rgb(194, 193, 193);
               .nav-item {
                   width: 100%;
                   height: 35px;
                   font-size: 15px;
                   text-align: center;
                   line-height: 35px;
               }
           }
       }
   }
   .router-link-active {
       border-left: 2px solid rgb(179, 3, 3);
       color: rgb(172, 4, 4);
   }
   .v-enter {
    opacity: 0;
    transform: translateX(100%);
    position: absolute;
    right: 0;
    z-index: 300;
  }
  .v-leave-to {
    opacity: 0;
    transform: translateX(100%);
    position: absolute;
    right: 0;
  }
  .v-enter-active {
      transition: all .3s linear;
  }
</style>