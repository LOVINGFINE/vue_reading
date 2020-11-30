<template>
    <div class="find_detail">
        <div class="top">
            <span class="icon-search top_icon" @touchend="getData(word)"></span>
            <input type="text" v-model="word" class="search_word">
            <router-link class="back_link" to="/find">取消</router-link>
        </div>
        <div class="search_body">
            <div class="body_top">
                <span class="rec">当前有{{num}}条搜索结果</span>
                <span class="filter_res">筛选<i class=""></i></span>
            </div>
            <div class="methods"></div>
            <div class="books_body" :style="'height:'+h+'px'">
            <router-link
            tag="div"
            :to="'/book_detail?id='+item._id"
            class="book_link"
            v-for="item in books"
            :key="item._id">
                <img :src="'http://statics.zhuishushenqi.com'+item.cover" class="link_img">
                <div class="book_message">
                    <p class="book_name text">{{item.title}}</p>
                    <span class="book_author">{{item.author}} · {{item.cat}} · 连载 · {{item.wordCount | opWord(item.wordCount)}}</span>
                    <i class="book_info text_d">{{item.shortIntro}}</i>
                </div>
            </router-link>                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            h:'',
          word:'',
          num:0,
          books:[]
        }
    },
    filters:{
        opWord(word){
             return parseInt(word/1000)>0?parseInt(word/1000)+'万字':word+'字'
        }
    },
    methods:{
        getData(word){
            this.$axios.get(`https://novel.juhe.im/search?keyword=${word}`).then(res=>{
                console.log(res.data);
                this.books = res.data.books
                this.num = res.data.total   
            })
        }
    },
    created(){
        this.$store.state.flog = false
        this.word = this.$route.query.words
        this.getData(this.$route.query.words)
    },
    mounted(){
        this.h = window.screen.availHeight - 120
    }
}
</script>

<style scoped lang="scss">

   .find_detail {
       width: 100%;
       .top {
           width: 100%;
           height: 45px;
           box-sizing: border-box;
           position: relative;
           border-bottom: 1px solid rgb(212, 212, 212);
           .back_link {
               font-size: 16px;
               color: rgb(138, 2, 2);
               position: absolute;
               right: 25px;
               top: 50%;
               transform: translateY(-50%);
           }
           .top_icon {
               font-size: 22px;
               color: rgb(185, 184, 184);
               position: absolute;
               top: 50%;
               transform: translateY(-50%);
               left: 8%;
           }
           .search_word {
               outline: none;
               border: none;
               width: 60%;
               height: 25px;
               font-size: 16px;
               position: absolute;
               top: 50%;
               left: 50%;
               transform: translate(-50%,-50%);
           }
       }
       .body_top {
           width: 100%;
           height: 35px;
           padding-top: 5px;
           box-sizing: border-box;
           .rec {
               display: inline-block;
               width: 40%;
               height: 30px;
               line-height: 30px;
               font-size: 14px;
               color: rgb(144, 144, 144);
               margin-left: 10%;
           }
           .filter_res {
               float: right;
               margin-right: 35px;
               width: 80px;
               height: 25px;
               font-size: 14px;
               color: #333;
               line-height: 25px;
               padding-left: 8px;
               box-sizing: border-box;
               background-color: rgb(240, 240, 240);
           }
       }
       .search_body {
           width: 100%;
           .methods {
            width: 100%;
               height: 40px;
               background-color: #444;
           }
           .books_body {
               width: 100%;
               height: 40px;
               overflow: auto;
               background-color: rgb(245, 245, 245);
               .book_link {
                   width: 90%;
                   color: #333;
                   margin: 15px auto 0;
                   padding: 12px 0;
                   box-sizing: border-box;
                   height: 115px;
                   border-bottom: 1px solid rgb(219, 219, 219);
                   position: relative;
                   .link_img {
                       height: 100%;
                       width: 70px;
                       box-shadow: -2px 2px 2px rgb(194, 194, 194);
                   }
                   .book_message {
                       float: right;
                       width: 75%;
                       height: 66px;
                       box-sizing: border-box;
                       .book_name {
                           font-size: 16px;
                           line-height: 24px;
                           color: rgb(15, 15, 15);
                       }
                       .book_author {
                           display: block;
                           width: 100%;
                           line-height: 24px;
                           font-size: 14px;
                           color: rgb(92, 91, 91);
                       }
                       .book_info {
                           font-size: 13px;
                           font-style: normal;
                           color: rgb(32, 32, 32);
                           line-height: 21px;
                       }
                       
                   }
               }
           
           }
        }
   }
</style>