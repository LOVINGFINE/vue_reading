<template>
    <div>
        <div class="show_title">全部{{total}}部</div>
              <router-link :to="'/class_detail?gender=male&mojar='+item.name" class="show_link" v-for="item in male" :key="item._id">
              <img :src="'http://statics.zhuishushenqi.com'+item.bookCover[0]" class="class_img">
              <span class="class_name">{{item.name}}</span>
              <i class="books_num">{{item.bookCount}}部</i>
              </router-link>
    </div>
</template>
<script>
import { parse } from 'path';
export default {
    data(){
        return {
           male:[],
           total:null
        }
    },
    methods:{
         getData(){
             let data = JSON.parse(window.localStorage.getItem('data_f'))
             this.male = data.male
             let sum = null
             data.male.forEach(ele => {
                 sum = sum + parseInt(ele.bookCount)
             });
             this.total = sum
         }
    },
    created(){
        this.getData()
    }
}
</script>

<style scoped lang="scss">
    .class_show {
               flex: 9;
               padding: 12px;
               box-sizing: border-box;
               .show_title {
                   width: 100%;
                   font-size: 13px;
                   color: rgb(80, 79, 79);
                   line-height: 35px;
                   height: 35px;
               }
               .show_link {
                   width: 50%;
                   height: 65px;
                   position: relative;
                   float: left;
                   color: #333;
                   margin-bottom: 12px;
                   .class_img {
                       height: 50px;
                       width: 41px;
                       border: 1px solid rgb(209, 208, 208);
                       box-shadow: 2px 2px 2px rgb(226, 226, 226);
                       position: absolute;
                       top: 50%;
                       transform: translateY(-50%);
                   }
                   .class_name {
                       font-size: 14px;
                       margin-left: 40%;
                       display: block;
                       line-height: 30px;
                       margin-top: 5px;
                   }
                   .books_num {
                       font-style: normal;
                       font-size: 12px;
                       display: block;
                       color: rgb(128, 126, 126);
                       margin-left: 40%;
                   }
               }
           }
</style>