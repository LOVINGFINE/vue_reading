<template>
    <div class="container">
        <div class="top">
            <router-link to="/shop" class="top_icon icon-chevron-thin-left" tag="div">
            </router-link>
            <span class="more"></span>
        </div>
        <div :class="['message_bgc',bgcImg]">
        <div class="book_message">
            <img :src="message.cover">
            <div class="message">
                <span class="name">{{message.title}}</span>
                <span class="author">作者: {{message.author}}</span>
                <span class="longIntro">{{message.longIntro}}</span>
            </div>
        </div>
        <div class="message_bottom">
            <router-link 
            class="message_book_tags" 
            :to="'/find_detail?words='+item" 
            v-for="item in message.tags"
            :key="item._id">{{item}}</router-link>
        </div>
        </div>
        <div class="mess_main">
            <p class="info">版权说明:{{message.copyrightDesc}}
            {{message.copyrightInfo}}
            </p>
            <div class="book_detail">
                <div class="detail_item">{{message.wordCount | opWord(message.wordCount)}}<i class="boxW_info">连载</i></div>
                <div class="detail_item">{{message.retentionRatio}}<i class="boxW_info">评分</i></div>
               <div class="detail_item">{{message.latelyFollower | opFans(message.latelyFollower)}}<i class="boxW_info">关注数</i></div>
            </div>
            <router-link :to="'/booklist/chapters?id='+id+'&old='+old_id" class="book_list">
                目录
                <span class="list_icon icon-chevron-thin-right"></span>
                <span class="icon-view-list list_img_icon"></span>
                <span class="update">最近更新: {{message.updated | opDate(message.updated)}}</span>
            </router-link>
        </div>
        <div class="comments">
            <div class="comment_title">
                <span class="comment_icon icon-coffee"></span>
                书友评论
                <span class="comment_this  boxH_info">有话想说</span>
            </div>
            <div class="comment_class">长评:</div>
            <div class="comment_item" v-for="(item,i) in comments_1" :key="item._id" v-show="i<3">
                <img :src="'http://statics.zhuishushenqi.com'+item.author.avatar">
                <div class="nickname">{{item.author.nickname}}</div>
                <p class="comment_text">{{item.content}}</p>
                <div class="comment_method">
                    <span class="comment_time">{{item.updated | opDate(item.updated)}}</span>
                    <router-link to="" class="comment_new">
                        <span class="icon-bubble new_icon"></span>
                        {{item.commentCount}}
                    </router-link>
                    <span class="good">
                        <i class="icon-heart good_icon"></i>
                        {{item.likeCount}}
                    </span>
                </div>
            </div>
            <div class="comment_class">短评:</div>
            <div class="comment_item" v-for="(item,i) in comments_2" :key="item._id" v-show="i<3">
                <img :src="'http://statics.zhuishushenqi.com'+item.author.avatar">
                <div class="nickname">{{item.author.nickname}}</div>
                <p class="comment_text">{{item.content}}</p>
                <div class="comment_method">
                    <span class="comment_time">{{item.updated | opDate(item.updated)}}</span>
                    <router-link to="" class="comment_new">
                        <span class="icon-bubble new_icon"></span>
                        {{item.commentCount}}
                    </router-link>
                    <span class="good">
                        <i class="icon-heart good_icon"></i>
                        {{item.likeCount}}
                    </span>
                </div>
            </div>            
            <router-link to="" tag="div" class="get_moreComments">
                    共有{{sum}}条评论
            </router-link>
        </div>
        <div class="book_recommend">
            <div class="title">相关推荐</div>
            <a 
            :href="'/#/book_detail?id='+item._id" 
            class="item" 
            v-for="(item,i) in books" 
            :key="i"
            @click="changeMessage(item._id)">
                <img :src="'http://statics.zhuishushenqi.com'+item.cover" alt="">
                <div class="item_massage">
                    <span class="item_name">{{item.title}}</span>
                    <span class="item_author">作者:{{item.author}}</span>
                    <span class="shortIntro text">{{item.shortIntro}}</span>
                </div>
            </a>
        </div>
        <div class="bottom">
            <a href="" class="bottom_left"><span class="bottom_add icon-library_books"></span>加入书架</a>
            <router-link 
            :to="'/text?link='+link"
            class="read_book_link">
                <span class="read_book_icon icon-book-open"></span> 立即阅读
            </router-link>
        </div>           
    </div>
</template>
<script>
import { randomFill, randomBytes } from 'crypto'
export default {
    data(){
        return {
           bgcImg:null,
           id:'',
           old_id:'',
           link:'',
           router_url:'',
           message:{},
           books:[],
           comments_1:[],
           comments_2:[],
           com_1:null,
           com_2:null
        }
    },
    computed:{
        'sum':function(){
            return this.com_1 + this.com_2
        }
    },
    filters:{
        opDate:function(updated){
            if(updated===undefined){
                return '00'
            }
            let arr = updated.split(/[T\:\-]/g) || []
            return `${arr[0]}年${arr[1]}月${arr[2]}日${arr[3]}:${arr[4]}`
        },
        opWord:function(word){
             return parseInt(word/10000)+'万字'
        },
        opFans:function(num){
            return parseInt(num/10000)>0?parseInt(num/10000)+'万':num
        }
    },
    methods:{
        getInfo(id){
            this.old_id = id
            this.$axios.get(`https://novel.juhe.im/book-info/${id}`).then(res=>{
                console.log(res.data);
                res.data.cover = 'http://statics.zhuishushenqi.com'+res.data.cover
                this.message = res.data
            })
            this.$axios.get(`https://novel.juhe.im/recommend/${id}`).then(res=>{
                // console.log(res.data);
                this.books = res.data.books  
            })
            this.$axios.get(`https://novel.juhe.im/book-sources?view=summary&book=${id}`).then(res=>{
                 this.id = res.data[0]._id
                 this.getChapters(this.id) 
            })
        },
        getComments(id){
            this.$axios.get(`https://novel.juhe.im/book/reviews?book=${id}`).then(res=>{
                // console.log(res.data);
                this.comments_1 = res.data.reviews
                this.com_1 = res.data.reviews.length 
            })
            this.$axios.get(`https://novel.juhe.im/book/short-reviews?book=${id}`).then(res=>{
                // console.log(res.data);
                this.comments_2 = res.data.docs
                this.com_2 = res.data.docs.length 
            })
        },
        getChapters(id){
            this.$axios.get(`https://novel.juhe.im/book-chapters/${id}`).then(res=>{
                // console.log(res.data);
                this.list = res.data.chapters
                window.localStorage.setItem('chapters',JSON.stringify(res.data.chapters))  
            })   
        },
        changeMessage(id){
            document.body.scrollTop = 0
            console.log(document.body.scrollTop);
            
            this.old_id = id
            this.getInfo(id)
            this.getComments(id)
            this.getChapters(id) 
        }
    },
    created(){
        this.$store.state.flog = false
        this.getInfo(this.$route.query.id)
        this.getComments(this.$route.query.id)
        let img = parseInt(Math.round(Math.random()*5)+1)
        console.log(img);
        this.bgcImg = `bgc-${img}`
    }
}
</script>

<style scoped lang="scss">
  .container {
      width: 100%;
      padding-bottom: 55px;
      background-color: rgb(241, 241, 241);
      .top {
          width: 100%;
          height: 45px;
          padding: 0 15px;
          background-color: rgb(255, 255, 255);
          position: fixed;
          z-index: 300;
          top: 0;
          border-bottom: 1px solid #999;
          box-sizing: border-box;
          font-size: 18px;
          color: #333; 
          line-height: 45px;
          .top_icon {
              display: block;
              position: relative;
              font-size: 20px;
              color: rgb(129, 5, 5);
              line-height: 45px;  
          }
      }
      .message_bgc {
            width: 100%;
            height: 231px;
            margin-top: 45px;
            .message_bottom {
                width: 100%;
                height: 60px;
                background-color: rgba(8, 8, 8, 0.4);
                padding: 0 25px;
                .message_book_tags {
                    float: left;
                    padding: 3px 10px;
                    background-color: rgba(252, 248, 248, 0.2);
                    font-size: 14px;
                    border-radius: 9px;
                    color: #fff;
                    margin: 0 15px 5px 0;
                }
            }
        }
      .bgc-1 {
         background: url(../../lib/images/bgc-1.jpg) no-repeat;
      }
      .bgc-2 {
         background: url(../../lib/images/bgc-2.jpg) no-repeat;
      }
      .bgc-3 {
         background: url(../../lib/images/bgc-3.jpg) no-repeat;
      }
      .bgc-4 {
         background: url(../../lib/images/bgc-4.jpg) no-repeat;
      }
      .bgc-5 {
         background: url(../../lib/images/bgc-5.jpg) no-repeat;
      }
      .bgc-6 {
         background: url(../../lib/images/bgc-6.jpg) no-repeat;
      }         
      .book_message {
          width: 100%;
          height: 171px;
          position: relative;
          padding: 20px 15px 20px 15px;
          background-color: rgba(8, 8, 8, 0.4);
          box-sizing: border-box;
          img {
              width: 100px;
              height: 120px;
              border: 1px solid rgb(190, 189, 189);
              box-sizing: border-box;
          }
          .message {
              float: right;
              width: 220px;
              height: 100%;
              .name {
                  color:rgb(249, 249, 250);
                  font-size: 18px;
                  display: block;
                  height: 35px;
                  line-height: 35px;
                  width: 100%;
              }
              .author {
                  color:rgb(244, 244, 245);
                  font-size: 15px;
                  display: block;
                  height: 35px;
                  line-height: 35px;
                  width: 100%;
              }
              .longIntro {
                  font-size: 14px;
                  color: rgb(224, 222, 222);
                  line-height: 25px;
                  width: 100%;
                  word-break: break-all;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 3;
                  overflow: hidden;                  
              }
                 
          }
      }
                            
      .mess_main {
          width: 100%;
          background-color: #fff;
          .book_list {
              display: block;
              color: #333;
              font-size: 18px;
              line-height: 35px;
              width: 70%;
              height: 45px;
              line-height: 45px;
              margin: 15px auto 0;
              padding-left: 35px;
              border-bottom: 1px solid #999;
              position: relative;
              .list_img_icon {
                  font-size: 22px;
                  position: absolute;
                  left: 5px;
                  top: 50%;
                  transform: translateY(-50%);
              }
              .list_icon {
                  position: absolute;
                  right: 5px;
                  color: rgb(9, 17, 133);
                  top: 50%;
                  font-size: 20px;
                  transform: translateY(-50%);                  
              }
              .update {
                  position: absolute;
                  font-size: 12px;
                  color: #999;
                  left: 30%;
                  top: 0;
              }
          }
          .info {
            display: block;
            width: 100%;
            padding: 15px 15px;
            box-sizing: border-box;
            color: rgb(37, 37, 37);
            font-size: 12px;
            background-color: #fff;
            border-top: 1px solid rgb(189, 187, 187);
        }
        .book_detail {
          width: 80%;
          height: 45px;
          line-height: 24px;
          display: flex;
          margin: 0 auto;
          box-sizing: border-box;
          border-bottom: #999 1px dashed;
          background-color: #fff;
          .detail_item {
              flex: 1;
              text-align: center;
              font-size: 12px;
              line-height: 24px;
              color: #333;
              position: relative;
              .boxW_info {
                  font-style: normal;
                  font-size: 10px;
                  font-weight: 300;
                  color: rgb(36, 10, 10);
                  bottom: 2px;
              }
          }
        }
      }
      .comments {
          width: 95%;
          margin: 0 auto 60px;
          background-color: #fff;
          border-radius: 7px 7px 0 0;
          box-sizing: border-box;
          box-shadow: -2px 2px 5px rgb(211, 209, 209);
          position: relative;
          .get_moreComments {
              position: absolute;
              bottom: -43px;
              width: 160px;
              height: 26px;
              border-radius: 10px;
              left: 50%;
              transform: translateX(-50%);
              line-height: 26px;
              text-align: center;
              background-color: rgb(200, 200, 200);
              font-size: 14px;
              color: #333;
          }
          .comment_class {
              width: 100%;
              font-size: 14px;
              color: rgb(5, 40, 199);
              line-height: 35px;
              padding-left: 25px;
              box-sizing: border-box;
          }
          .comment_title {
              width: 100%;
              height: 45px;
              line-height: 45px;
              position: relative;
              padding-left: 45px;
              margin-top: 20px;
              box-sizing: border-box;
              font-size: 16px;
              border-bottom: 1px solid rgb(202, 202, 202);
              span {
                  position: absolute;
              }
              .comment_icon {
                  font-size: 22px;
                  color: rgb(5, 123, 170);
                  height: 45px;
                  line-height: 45px;
                  left: 12px;
              }
              .comment_this {
                  font-size: 14px;
                  padding: 0 10px;
                  line-height: 24px;
                  background-color: rgb(230, 2, 2);
                  color: rgb(255, 255, 255);
                  border-radius: 12px;
                  right: 10px;
              }
          }
          .comment_item {
              width: 100%;
              padding: 15px 12px 0 47px;
              box-sizing: border-box;
              position: relative;
              img {
                  width: 30px;
                  height: 30px;
                  position: absolute;
                  left: 12px;
                  border-radius: 50%;
              }
              .nickname {
                  line-height: 25px;
                  color: rgb(136, 135, 135);
              }
              .comment_text {
                  font-size: 14px;
                  color: #333;
                  width: 100%;
                  height: 87px;
                  line-height: 29px;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 3;
                  overflow: hidden;
                  word-wrap: break-word; 
              }
              .comment_method {
                  width: 100%;
                  height: 30px;
                  position: relative;
                  .comment_time {
                       float: left;
                       height: 100%;
                       width: 50%;
                       line-height: 30px;
                       color: #333;
                       font-size: 14px; 
                  }
                  .comment_new {
                        float: left;
                        width: 25%;
                        height: 30px;
                        text-align: center;
                        line-height: 30px;
                        color: rgb(1, 100, 100);
                        position: relative;
                      .new_icon {
                         font-size: 18px;
                         position: absolute;
                         top: 50%;
                         transform: translateY(-50%);
                         left: 5px;                        
                      }
                  }
                  .good {
                        float: left;
                        width: 25%;
                        height: 30px;
                        text-align: center;
                        line-height: 30px;
                        position: relative;                       
                      .good_icon {
                         font-size: 18px;
                         position: absolute;
                         color: rgb(136, 1, 1);
                         top: 50%;
                         transform: translateY(-50%);
                         left: 5px;  
                      }
                  }
              }
          }
      }
        .book_recommend {
            width: 100%;
            padding: 15px;
            box-sizing: border-box;
            background-color: #fff;
            .title {
                width: 100%;
                box-sizing: border-box;
                height: 35px;
                font-size: 18px;
                line-height: 35px;
                padding-left: 20px;
                margin-bottom: 20px;
                border-bottom: 1px #999 dashed;
            }
            .item {
                display: block;
                width: 100%;
                height: 100px;
                padding: 0 30px;
                margin: 15px 0;
                box-sizing: border-box;
                color: #333;
                img {
                    width: 80px;
                    height: 100px;
                    float: left;
               }
               .item_massage {
                   float: right;
                   width: 140px;
                   height: 100px;
                   margin-right: 30px;
                   .item_name {
                       display: block;
                       width: 100%;
                       height: 35px;
                       line-height: 35px;
                       color: rgb(97, 96, 96);
                       font-size: 16px;
                   }
                   .item_author {
                       font-size: 14px;
                       color: rgb(65, 64, 64);
                       width: 100%;
                       height: 30px;
                       line-height: 30px;
                   }
                   .shortIntro {
                       display: block;
                       width: 100%;
                       color: rgb(82, 81, 81);
                       font-size: 14px;
                       line-height: 35px;
                   }
               }
               
            }
            
        }
        .bottom {

            width: 100%;
            height: 45px;
            position: fixed;
            bottom: -1px;
            display: flex;
            border-top: rgb(224, 224, 224) 1px solid;
            background-color: #fff;
            .bottom_left {
                flex: 1;
                width: 50%;
                height: 45px;
                color: #333;
                font-size: 16px;
                text-align: center;
                line-height: 45px;
                position: relative;
                .bottom_add {
                    position: absolute;
                    font-size: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 20%;
                }
            }
            .read_book_link {
                flex: 1;
                width: 50%;
                height: 45px;
                color: rgb(94, 1, 1);
                font-size: 16px;
                text-align: center;
                line-height: 45px;
                box-sizing: border-box;
                position: relative;
                .read_book_icon {
                    position: absolute;
                    font-size: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 20%;
                }
            }
        }
  }
</style>