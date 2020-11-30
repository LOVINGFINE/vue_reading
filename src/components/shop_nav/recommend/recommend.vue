<template>
    <div class="container" :style="'height:'+(this.$store.state.height-120)+'px'">
       <div class="banner">
           <mt-swipe :auto="3000" :speed="700">
                <mt-swipe-item class="banner_item" v-for="item in banners" :key="item._id">
                    <router-link :to="'/book_detail?id='+item._id" tag="div" class="banner_link">
                    <img :src="'http://statics.zhuishushenqi.com'+item.cover" alt="">
                    <div class="banner_mess text">
                        {{item.title}}
                        <span class="banner_author">
                            {{item.author}}/著
                        </span>
                    </div>
                    <p class="banner_text">
                         {{item.shortIntro}}
                    </p>                        
                    </router-link>
                </mt-swipe-item>
           </mt-swipe>
       </div>
       <div class="class_nav">
           <a class="class_nav_link" @touchstart="setGender(0)">
           <span class="class_nav_icon icon-mars"></span>
           男生
           </a>
           <div class="class_nav_link" @touchstart="setGender(1)">
           <span class="class_nav_icon icon-venus"></span>
           女生</div>
           <div class="class_nav_link" @touchstart="setGender(2)">
           <span class="class_nav_icon icon-leaf"></span>
           出版</div>
           <div class="class_nav_link" @touchstart="setGender(-1)">
           <span class="class_nav_icon icon-th-list"></span>
           更多</div>
       </div>
       <div class="main">
           <div class="main_content">
               <div class="box_title">
                    <h2>推荐书籍</h2>
               </div>
               <div class="box_books clear">
                   <router-link  :to="'/book_detail?id='+item._id" class="books_item" v-for="item in booksList" :key="item._id">
                       <img :src="'http://statics.zhuishushenqi.com'+item.cover" alt="">
                       <span class="text">{{item.title}}</span>
                   </router-link>
               </div>
               <div class="box_title">
                    <h2>推荐漫画</h2>
               </div>
               <div class="box_books clear">
                   <router-link  :to="'/picdetail?id='+item._id" class="books_item" v-for="item in picList" :key="item._id">
                       <img :src="'http://statics.zhuishushenqi.com'+item.cover" alt="">
                       <span class="text">{{item.title}}</span>
                   </router-link>
               </div>
               <div class="box_title">
                    <h2>其他推荐</h2>
               </div>
               <div class="box_books clear">
                   <router-link  :to="'/?id='+item._id" class="books_item" v-for="item in moreList" :key="item._id">
                       <img :src="'http://statics.zhuishushenqi.com'+item.cover" alt="">
                       <span class="text">{{item.title}}</span>
                   </router-link>
               </div>
           </div>
       </div>
    </div>
</template>
<script>
import { get } from 'http'
export default {
    data(){
        return {
         images:'',
         booksList:[],
         picList:[],
         moreList:[],
         banners:[]
        }
    },
    methods:{
        getBanner(tag){ 
                // 获取最热榜单，渲染banner
                let banner = null 
                if(tag===0){
                    banner = JSON.parse(window.localStorage.getItem('rank_male')).hot.ranking.books
                }else {
                    banner = JSON.parse(window.localStorage.getItem('rank_female')).hot.ranking.books
                } 
                for(var i = 8;i<15;i++){
                     this.banners.push(banner[i])
                } 
        },
        getRecommend(tag){
            let books = null
            // 漫画推荐 
            let pic = JSON.parse(window.localStorage.getItem('rank_pic')).end.ranking.books
            // 其他推荐
            let more = JSON.parse(window.localStorage.getItem('rank_pub')).new.ranking.books
            this.moreList= more
            if(tag==0){
                books = JSON.parse(window.localStorage.getItem('rank_male')).hot.ranking.books
            }else {
                books = JSON.parse(window.localStorage.getItem('rank_female')).hot.ranking.books
            }
            for(var i = 0;i<9;i++){
                this.booksList.push(books[i])
                this.picList.push(pic[i])
            } 
        },
        setGender(tag){
            console.log(tag); 
           this.getBanner(tag)
        //    this.getRecommend(tag) 
        }
    },
    created(){
           this.$store.state.flog = true
           this.getBanner(0)
           this.getRecommend(0)     
        },
        mounted(){
            
        }
}
</script>

<style scoped lang="scss">
    .container {
        padding: 0;
        margin: 0;
        width: 100%;
        .banner {
            width: 100%;
            height: 175px;
            position: relative;
            .banner_link {
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
            .mint-swipe {
                width: 100%;
                height: 100%;
                background-color: #fff;
            .mint-swipe-item {
                width: 100%;
                padding: 15px 25px;
                box-sizing: border-box;
                background-color: #fff;
                height: 100%;
                position: absolute;
                img {
                    width: 110px;
                    height: 140px;
                    border: 1px solid rgb(192, 191, 191);
                    box-shadow: -2px 2px 5px rgb(100, 100, 100);
                    box-sizing: border-box;
                    position: absolute;
                }
                .banner_mess {
                    margin-left: 40%;
                    width: 60%;
                    height: 75px;
                    color: rgb(39, 38, 38);
                    line-height: 75px;
                    font-size: 18px;
                    border-bottom: 1px solid #999;
                    position: relative;
                    .banner_author {
                       font-size: 14px;
                       line-height: 14px;
                       position: absolute;
                       bottom: 10px;
                       right: 18px;
                       color: rgb(17, 24, 119);
                    }
                }
                .banner_text {
                    margin-left: 40%;
                    width: 60%;
                    height: 56px;
                    line-height: 28px;
                    font-size: 14px;
                    color: rgb(94, 93, 93);
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    word-wrap: break-word;
                }
            }
                .is-active {
                    z-index: 30;
                }                
            }
        }
        .class_nav {
            width: 100%;
            height: 75px;
            display: flex;
            border-bottom:1px solid #999;
            .class_nav_link {
                flex: 1;
                text-align: center;
                font-size: 14px;
                padding-top: 10px;
                color: rgb(90, 90, 90);
                .class_nav_icon {
                    font-size: 30px;
                    display: block;
                    margin-bottom: 7px;
                }
            }
        }
        .main {
            width: 100%;
            padding: 15px 0 55px;
            background-color: rgb(231, 229, 229);
            .main_content {
                width: 95%;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 6px 6px 0 0;
                .box_title {
                    width: 95%;
                    height: 45px;
                    line-height: 45px;
                    margin: 0 auto;
                    box-sizing: border-box;
                    border-bottom: 1px solid rgb(187, 185, 185);
                    h2 {
                        font-size: 20px;
                        font-weight: 300;
                        color: rgb(134, 23, 23);
                    }
                }
                .box_books {
                    width: 100%;
                    .books_item {
                        width: 33%;
                        float: left;
                        height: 195px;
                        position: relative;
                        img {
                            width: 80%;
                            height: 60%;
                            border: 1px solid rgba(190, 189, 189, 0.6);
                            box-sizing: border-box;
                            box-shadow: 2px 2px 5px #999;
                            display: block;
                            margin: 20px auto 0;
                            position: absolute;
                            left: 50%;
                            transform: translateX(-50%);
                            z-index: 3;
                        }
                        img:hover {
                            width: 100%;
                            height: 80%;
                            transition: all 0.3s linear;  
                        }
                        span {
                            display: block;
                            color: rgb(65, 64, 64);
                            width: 80px;
                            font-size: 14px;
                            position: absolute;
                            bottom: 5px;
                            text-align: center;
                            line-height: 32px;
                            left: 50%;
                            transform: translateX(-50%);
                        }
                    }
                }
            }
        }

    }
</style>