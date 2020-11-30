<template>
    <div class="class_detail clear">
        <div class="class_detail_top">
            <router-link :to="'/class_books/'+back_tag" class="go_back icon-chevron-thin-left"></router-link>
            {{msg}}
            <div 
            class="search_this icon-search">
            </div>
        </div>
        <div class="list_title">推荐</div>
        <div class="show_box clear">
            <router-link :to="'/book_detail?id='+item._id" class="show_list_link" v-for="item in list" :key="item._id">
            <img :src="'http://statics.zhuishushenqi.com'+item.cover" class="link_img">
            <div class="book_mess">
                <span class="book book_name">{{item.title}}</span>
                <span class="book tag">{{item.author}} · {{item.majorCate}} · {{item.minorCate}}</span>
                <span class="book book_info">更新:{{item.lastChapter}}</span>
            </div>
            </router-link>
        </div>
        <div class="list_title">更多 · 共{{number}}部 <span id="more" class="icon-angle-right"></span> </div>
        <div class="show_box_more clear">
            <router-link :to="'/book_detail?id='+item._id" class="list_link_more" v-for="item in list_more" :key="item._id">
            <img :src="'http://statics.zhuishushenqi.com'+item.cover" class="link_img_more">
            <div class="more_book_mess">
                <span class="more_book book_name_more">{{item.title}}</span>
                <span class="more_book nickname">{{item.author}}</span>
            </div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
           msg:'',
           list:[],
           list_more:[],
           back_tag:'',
           number:null
        }
    },
    filter:{
        opaDate:function(str){
            
        }
    },
    methods:{
        getData(major,gender){
            this.$axios.get(`https://novel.juhe.im/category-info?gender=${gender}&type=hot&major=${major}&start=2&limit=23`).then(res=>{
                console.log(res.data);
                this.number = res.data.total
                this.list = res.data.books.slice(0,5)
                this.list_more = res.data.books.slice(5)
            })
        }
    },
    created(){
        this.msg = this.$route.query.mojar
        this.back_tag = this.$route.query.gender 
        this.getData(this.$route.query.mojar,this.$route.query.gender)
    }
}
</script>

<style scoped lang="scss">
.class_detail {
    width: 100%;
    .class_detail_top {
        width: 100%;
        height: 45px;
        line-height: 45px;
        font-size: 18px;
        color: #333;
        text-align: center;
        position: fixed;
        background-color: #fff;
        z-index: 30;
        .go_back {
           position: absolute;
           top: 50%;
           left: 12px;
           transform: translateY(-50%);
           font-size: 20px;
           color: rgb(173, 3, 3);
        }
        .search_this {
            font-size: 20px;
            line-height: 45px;
            position: absolute;
            right: 20px;
            top: 0;
            color: #333;
        }

    }
    .list_title {
        width: 95%;
        margin: 45px auto 0;
        font-size: 16px;
        padding-left: 15px;
        box-sizing: border-box;
        color: rgb(124, 124, 124);
        line-height: 35px;
        height: 35px;
        position: relative;
        #more {
            position: absolute;
            font-size: 30px;
            right: 15px;
            color: rgb(5, 79, 163);
            top: 50%;
            transform: translateY(-50%);
        }
    }
    .show_box {
        width: 95%;
        margin: 5px auto;
        .show_list_link {
            display: block;
            width: 100%;
            margin-bottom: 15px;
            padding: 15px;
            box-sizing: border-box;
            height: 130px;
            color:#333;
            border-bottom: rgb(218, 218, 218) 1px solid;
            position: relative;
            .link_img {
                height: 95%;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 15px;
            }
            .book_mess {
                width: 65%;
                height: 100%;
                margin-left: 35%;
                .book {
                    display: block;
                    width: 100%;
                    line-height: 25px;
                }
                .book_name {
                    color: rgb(19, 18, 18);
                    font-size: 16px;
                }
                .book_tag {
                    font-size: 14px;
                    color: rgb(90, 89, 89);
                }
                .book_info {
                    font-size: 14px;
                    color: rgb(90, 89, 89);
                }

            }

        }
    }
    .show_box_more {
        width: 95%;
        margin: 0 auto;
        .list_link_more {
            width: 50%;
            height: 95px;
            padding: 5px;
            float: left;
            box-sizing: border-box;
            margin-bottom: 15px;
            position: relative;
            .link_img_more {
            position: absolute;
            height: 70%;
            top: 50%;
            transform: translateY(-50%);
            left: 10px;
            }
            .more_book_mess {
                margin-top: 15px;
            width: 60%;
            height: 100%;
            margin-left: 40%;
            .more_book {
                display: block;
                width: 100%;
                line-height: 25px;
                font-size: 14px;
            }
            .book_name_more {
                color: #333;
            }
            .nickname {
                color: rgb(112, 110, 110);
            }
        } 
     }
        
    }
}
</style>