<template>
    <div class="booklists" :style="'height:'+(this.$store.state.height-120)+'px'">
       <div class="booklists_title">
           <h3 class="title_hot">本周最热 · 共{{hot_list.total}}个书单</h3>
           <span class="get_more icon-angle-right"></span>
       </div>
       <div class="booklists_body">
           <router-link 
           class="body_item" 
           :to="'/reclist_detail?id='+item._id" 
           tag="div" 
           v-for="item in hot_list.list" 
           :key="item._id">
               <i class="item_name">书单</i>
               <p class="item_title">{{item.title}}</p>
               <div class="item_desc">{{item.desc}}</div>
               <div class="item_author"> · {{item.author}}</div>
               <span class="item_book_num">
                   <p class="book_icon icon-book2"></p>
                   包含{{item.bookCount}}本书籍
               </span>
               <span class="item_coll">
                   <p class="item_coll_icon icon-star-o"></p>
                   共有{{item.collectorCount}}人收藏
               </span> 
           </router-link>
       </div>
       <div class="booklists_title">
           <h3 class="title_new">最新发布 · 共{{new_list.total}}个书单</h3>
           <span class="get_more icon-angle-right"></span>
       </div>
       <div class="booklists_body">
           <router-link 
           class="body_item" 
           :to="'/reclist_detail?id='+item._id" 
           tag="div" 
           v-for="item in new_list.list" 
           :key="item._id">
               <i class="item_name">书单</i>
               <p class="item_title">{{item.title}}</p>
               <div class="item_desc">{{item.desc}}</div>
               <div class="item_author"> · {{item.author}}</div>
               <span class="item_book_num">
                   <p class="book_icon icon-book2"></p>
                   包含{{item.bookCount}}本书籍
               </span>
               <span class="item_coll">
                   <p class="item_coll_icon icon-star-o"></p>
                   共有{{item.collectorCount}}人收藏
               </span>                
           </router-link>
       </div>       
       <div class="booklists_title">
           <h3 class="title_more">最多收藏 · 共{{more_list.total}}个书单</h3>
           <span class="get_more icon-angle-right"></span>
       </div>
       <div class="booklists_body">
           <router-link 
           class="body_item" 
           :to="'/reclist_detail?id='+item._id" 
           tag="div" 
           v-for="item in more_list.list" 
           :key="item._id">
               <i class="item_name">书单</i>
               <p class="item_title">{{item.title}}</p>
               <div class="item_desc">{{item.desc}}</div>
               <div class="item_author"> · {{item.author}}</div>
               <span class="item_book_num">
                   <p class="book_icon icon-book2"></p>
                   包含{{item.bookCount}}本书籍
               </span>
               <span class="item_coll">
                   <p class="item_coll_icon icon-star-o"></p>
                   共有{{item.collectorCount}}人收藏
               </span>               
           </router-link>
       </div>       
    </div>
</template>
<script>
export default {
    data(){
        return {
            hot_list:{},
            new_list:{},
            more_list:{}
        }
    },
    methods:{
       getInfo(){
           let data = JSON.parse(window.localStorage.getItem('booklists_male'))

           console.log(data);
           
           this.hot_list = {total:data.hot.total,list:data.hot.bookLists.slice(0,7)}
           this.new_list = {total:data.new.total,list:data.new.bookLists.slice(0,12)} 
           this.more_list = {total:data.more.total,list:data.more.bookLists.slice(0,10)}
       }
    },
    created(){
        this.getInfo()
    },
    mounted(){

    }
}
</script>

<style scoped lang="scss">
.booklists {
    width: 100%;
    overflow: auto;
    padding-bottom: 55px;
    box-sizing: border-box;
     background-color: rgb(245, 245, 245);
    .booklists_title {
        width: 100%;
        height: 45px;
        padding-left: 20px;
        box-sizing: border-box;
        line-height: 45px;
        font-size: 13px;
        position: relative;
        .get_more {
            position: absolute;
            font-size: 28px;
            right: 25px;
            top: 50%;
            transform: translateY(-50%);
            color: rgb(20, 3, 248);
        }
        .title_hot {
            color: rgb(124, 2, 2); 
        }
        .title_new {
            color: rgb(3, 109, 11); 
        }
        .title_more {
            color: rgb(141, 42, 3); 
        }
    }
    .booklists_body {
        width: 100%;
        .body_item {
            width: 90%;
            padding: 0 20px;
            border-radius: 6px;
            box-shadow: -2px 2px 2px rgb(189, 189, 189);
            box-sizing: border-box;
            margin: 5px auto 8px;
            position: relative;
            color: #333;
            padding-bottom: 45px;
            background-color: #fff;
            .item_name {
                display: block;
                width: 100%;
                line-height: 25px;
                font-size: 13px;
                color: rgb(109, 109, 109);
                font-style: normal;
                
            }
            .item_title {
                display: block;
                box-sizing: border-box;
                font-size: 14px;
                color: rgb(28, 12, 250);
            }
            .item_author {
                display: block;
                box-sizing: border-box;
                font-size: 12px;
                line-height: 12px;
                padding-left: 20px;
                margin: 8px 0;
                color: rgb(1, 106, 167);
                box-sizing: border-box;
            }
            .item_desc {
                display: block;
                box-sizing: border-box;
                word-break: break-all;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;  
            }
            .item_book_num {
                display: block;
                box-sizing: border-box;
                width: 50%;
                position: absolute;
                bottom: 20px;
                height: 25px;
                line-height: 25px;
                padding-left: 25px;
                box-sizing: border-box;
                .book_icon {
                    font-size: 18px;
                    color: rgb(153, 14, 1);
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 0;
                }
            }
            .item_coll {
                display: block;
                box-sizing: border-box;
                width: 50%;
                position: absolute;
                bottom: 20px;
                height: 25px;
                line-height: 25px;
                right: 0;
                padding-left: 25px;
                box-sizing: border-box;
                .item_coll_icon {
                    display: block;
                    box-sizing: border-box;
                    position: absolute;
                    font-size: 18px;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 0;
                    color: rgb(156, 2, 2);
                }
            }
        }
    }
}

</style>